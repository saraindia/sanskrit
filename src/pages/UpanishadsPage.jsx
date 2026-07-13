import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import { ClickableVerse } from '../components/ClickableSentence'
import { useVocabularyData } from '../hooks/useData'
import { usePurchase } from '../context/PurchaseContext'
import './GitaPage.css'
import './Hub.css'

const COMMENTARY_LABELS = {
  advaita_vedanta:   { label: 'Advaita Vedānta',   subtitle: 'Śaṅkara' },
  vishishtadvaita:   { label: 'Viśiṣṭādvaita',     subtitle: 'Rāmānuja' },
  dvaita_vedanta:    { label: 'Dvaita Vedānta',     subtitle: 'Madhva' },
  integral_advaita:  { label: 'Integral Advaita',   subtitle: 'Aurobindo' },
  integral_yoga:     { label: 'Integral Yoga',      subtitle: 'Aurobindo' },
  modern_vedanta:    { label: 'Modern Vedānta',     subtitle: 'Vivekānanda / Sarvapriyananda' },
  universalist:      { label: 'Universalist',       subtitle: 'Neo-Vedānta' },
  vivekananda:       { label: 'Rāja Yoga',          subtitle: 'Swami Vivekananda (1896)' },
  patanjali_vyasa:   { label: 'Vyāsa Bhāṣya',      subtitle: 'Classical commentary' },
}

function CommentaryPanel({ commentaries }) {
  const [open, setOpen] = useState(null)
  if (!commentaries) return null
  return (
    <div className="upan-commentaries">
      <div className="upan-comm-heading">Commentaries</div>
      {Object.entries(COMMENTARY_LABELS).map(([key, { label, subtitle }]) => {
        const body = commentaries[key]
        if (!body) return null
        const isOpen = open === key
        return (
          <div key={key} className={`upan-comm-item${isOpen ? ' upan-comm-open' : ''}`}>
            <button className="upan-comm-toggle" onClick={() => setOpen(isOpen ? null : key)}>
              <span className="upan-comm-label">{label}</span>
              <span className="upan-comm-sub">{subtitle}</span>
              <span className="upan-comm-arrow">{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && <div className="upan-comm-body">{body}</div>}
          </div>
        )
      })}
    </div>
  )
}

const cache = new Map()
async function loadJson(file, folder = 'upanishads') {
  const key = `${folder}/${file}`
  if (cache.has(key)) return cache.get(key)
  const res = await fetch(`/content/${folder}/${file}`, file === 'manifest.json' ? { cache: 'no-store' } : undefined)
  if (!res.ok) throw new Error(`Could not load ${file}`)
  const raw = await res.text()
  const data = JSON.parse(raw.replace(/,(\s*[}\]])/g, '$1'))
  if (file !== 'manifest.json') cache.set(key, data)
  return data
}

export default function UpanishadsPage() {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
  const [searchParams, setSearchParams] = useSearchParams()
  const location  = useLocation()
  const navigate  = useNavigate()
  const isBrahma  = location.pathname === '/brahmasutras'
  const isYoga    = location.pathname === '/yogasutras'
  const contentFolder = isYoga ? 'yogasutras' : 'upanishads'
  const [manifest, setManifest]   = useState(null)
  const [textId, setTextId]       = useSessionStorage('upan_text', '')
  const [adhId, setAdhId]         = useSessionStorage('upan_adh', '')
  const [sectionId, setSectionId] = useSessionStorage('upan_section', '')
  const [verseIdx, setVerseIdx]   = useSessionStorage('upan_verse', 0)
  const [drill, setDrill]         = useSessionStorage('upan_drill', true)
  const [revealed, setRevealed]   = useState(false)
  const [text, setText]           = useState(null)
  const [error, setError]         = useState(null)
  const { speak, speakLines, stop, isPlaying } = useSpeech()
  const [activeLine, setActiveLine] = useState(-1)
  const vocabData                 = useVocabularyData()

  const handleVerseSpeak = useCallback((dev) => {
    if (isPlaying) { stop(); setActiveLine(-1); return }
    speakLines(dev, { onLine: setActiveLine, onDone: () => setActiveLine(-1) })
  }, [isPlaying, stop, speakLines])

  // Track whether we should auto-jump to the first verse after loading
  const autoJumpRef = useRef(false)

  // On /brahmasutras or /yogasutras route, always load the correct single text
  useEffect(() => {
    if (isBrahma) {
      setTextId('brahmasutra'); setAdhId(''); setSectionId(''); setVerseIdx(0)
      return
    }
    if (isYoga) {
      // Always show the pāda picker on arrival — never auto-restore last pāda
      setTextId(''); setAdhId(''); setSectionId(''); setVerseIdx(0)
      return
    }
    // Clear any leftover brahmasutra/yoga state when arriving at /upanishads
    if (textId === 'brahmasutra' || textId?.startsWith('yogasutra-')) {
      setTextId(''); setAdhId(''); setSectionId(''); setVerseIdx(0)
      return
    }
    const t = searchParams.get('text')
    if (t) {
      autoJumpRef.current = true
      setTextId(t); setAdhId(''); setSectionId(''); setVerseIdx(0)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-jump to first adhyāya + section when coming from a direct link
  useEffect(() => {
    if (!autoJumpRef.current || !text || adhId || sectionId) return
    autoJumpRef.current = false
    const firstAdh = text.verses.find(v => v.adh)?.adh || ''
    const firstSec = text.verses.find(v => !firstAdh || v.adh === firstAdh)?.sec || ''
    if (firstSec) { setAdhId(firstAdh); setSectionId(firstSec); setVerseIdx(0) }
  }, [text, adhId, sectionId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadJson('manifest.json', contentFolder).then(setManifest).catch(e => setError(e.message))
  }, [contentFolder])

  useEffect(() => {
    if (!textId) { setText(null); return }
    // Guard against stale sessionStorage bleed-through before mount effect clears it
    if (textId.startsWith('yogasutra-') && !isYoga) { setText(null); return }
    if (textId === 'brahmasutra' && !isBrahma) { setText(null); return }
    let live = true
    loadJson(`${textId}.json`, contentFolder)
      .then(d => { if (live) setText(d) })
      .catch(e => { if (live) setError(e.message) })
    return () => { live = false }
  }, [textId, contentFolder, isYoga, isBrahma])

  useEffect(() => { setRevealed(false); stop(); setActiveLine(-1) }, [textId, sectionId, verseIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  // Unique adhyāyas (top level, only for texts that have them) in document order
  const adhyayas = useMemo(() => {
    if (!text) return []
    const seen = new Set()
    const result = []
    for (const v of text.verses) {
      if (v.adh && !seen.has(v.adh)) {
        seen.add(v.adh)
        result.push(v.adh)
      }
    }
    return result
  }, [text])
  const hasAdhyayas = adhyayas.length > 0

  // Unique sections in document order (within the chosen adhyāya, if any)
  const sections = useMemo(() => {
    if (!text) return []
    const seen = new Set()
    const result = []
    for (const v of text.verses) {
      if (hasAdhyayas && v.adh !== adhId) continue
      if (!seen.has(v.sec)) {
        seen.add(v.sec)
        result.push(v.sec)
      }
    }
    return result
  }, [text, hasAdhyayas, adhId])

  // Verses belonging to the currently-selected section
  const sectionVerses = useMemo(() => {
    if (!text || !sectionId) return []
    return text.verses.filter(v => v.sec === sectionId)
  }, [text, sectionId])

  // Flat ordered list of all sections across all adhyāyas (for cross-section navigation)
  const allSections = useMemo(() => {
    if (!text) return []
    const seen = new Set(); const result = []
    for (const v of text.verses) {
      const key = v.adh ? `${v.adh}||${v.sec}` : v.sec
      if (!seen.has(key)) { seen.add(key); result.push({ adh: v.adh || '', sec: v.sec, key }) }
    }
    return result
  }, [text])

  const openText = (id, textIdx) => {
    if (!isPro && textIdx >= FREE_LIMITS.UPAN_FREE_TEXT) { showPaywall(); return }
    if (isYoga) autoJumpRef.current = true
    setTextId(id); setAdhId(''); setSectionId(''); setVerseIdx(0)
  }
  const openAdhyaya = (adh, adhIdx) => {
    if (!isPro && adhIdx >= FREE_LIMITS.UPAN_FREE_ADHYAYA) { showPaywall(); return }
    setAdhId(adh); setSectionId(''); setVerseIdx(0)
  }
  const openSection = (sec, secIdx) => {
    // For texts without adhyāyas, lock sections beyond the first for free users
    if (!isPro && !hasAdhyayas && secIdx >= FREE_LIMITS.UPAN_FREE_ADHYAYA) { showPaywall(); return }
    setSectionId(sec); setVerseIdx(0)
  }

  const randomVerse = useCallback(() => {
    if (!manifest || !text) return
    // Free users: restrict to the currently-open text, free adhyāya/sections only
    const freeVerses = isPro
      ? text.verses
      : text.verses.filter(v => {
          if (hasAdhyayas) {
            const adhIdx = adhyayas.indexOf(v.adh)
            return adhIdx < FREE_LIMITS.UPAN_FREE_ADHYAYA
          }
          const secIdx = sections.indexOf(v.sec)
          return secIdx < FREE_LIMITS.UPAN_FREE_ADHYAYA
        })
    if (!freeVerses.length) return
    const v = freeVerses[Math.floor(Math.random() * freeVerses.length)]
    setAdhId(v.adh || '')
    setSectionId(v.sec)
    setVerseIdx(text.verses.filter(x => x.sec === v.sec).indexOf(v))
  }, [manifest, text, isPro, hasAdhyayas, adhyayas, sections, FREE_LIMITS, setAdhId, setSectionId, setVerseIdx])

  const earlyTitle = isBrahma ? 'Brahmasūtras' : isYoga ? 'Yoga Sūtras' : 'Upaniṣads'

  if (error) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">{earlyTitle}</h1></div>
      <div className="card" style={{padding:'2rem',textAlign:'center'}}>
        <p style={{color:'var(--text-secondary)'}}>{error}</p>
      </div>
    </div>
  )

  if (!manifest) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">{earlyTitle}</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Text picker ───────────────────────────────────────────────────────
  const UPAN_COLORS = ['#f59e0b','#a855f7','#22c55e','#3b82f6','#ec4899','#f97316','#14b8a6','#e11d48','#8b5cf6']
  const UPAN_ICONS  = { aitareya:'🌅', isha:'🕉️', kena:'💫', katha:'⚡', taittiriya:'🌿', mandukya:'🔔', mundaka:'🔥', chandogya:'🎶' }
  const YOGA_ICONS  = ['🧘', '🌿', '✨', '🕊️']

  const upanTexts = manifest.texts.filter(t => t.id !== 'brahmasutra' && !t.id.startsWith('yogasutra-'))
  const yogaTexts = manifest.texts.filter(t => t.id.startsWith('yogasutra-'))
  const pickerTexts = isYoga ? yogaTexts : upanTexts
  const pageTitle = isYoga ? 'Yoga Sūtras' : 'Upaniṣads'
  const pageSubtitle = isYoga
    ? `4 pādas · ${pickerTexts.reduce((s,t)=>s+t.verses,0)} sūtras · Swami Vivekananda · Patañjali`
    : `${pickerTexts.length} texts · ${pickerTexts.reduce((s,t)=>s+t.verses,0)} verses · Müller translation`

  if (!textId) return (
    <div className="gita anim-fade-up">
      <HubBack to="/texts" label="Sacred Texts" />
      <div className="page-header">
        <h1 className="page-title">{pageTitle}</h1>
        <p className="page-subtitle">{pageSubtitle}</p>
      </div>
      <div className="study-sq-grid">
        {pickerTexts.map((t, i) => {
          const locked = !isPro && i >= FREE_LIMITS.UPAN_FREE_TEXT
          const color  = UPAN_COLORS[i % UPAN_COLORS.length]
          const icon   = isYoga ? YOGA_ICONS[i] : (UPAN_ICONS[t.id] || '📜')
          const sub    = locked ? '🔒 Pro' : isYoga
            ? `${t.verses} sūtras · ${t.titleEnglish}`
            : `${t.verses} verses · ${t.titleEnglish || ''}`
          return (
            <button key={t.id}
              className="study-sq-card"
              onClick={() => openText(t.id, i)}
              style={{ opacity: locked ? 0.55 : 1, cursor: 'pointer' }}
            >
              <span className="study-sq-num" style={{ color, background: `${color}22`, borderColor: `${color}44` }}>{i + 1}</span>
              <span className="study-sq-icon">{icon}</span>
              <span className="study-sq-label">{t.title}</span>
              <span className="study-sq-dev">{t.titleDeva}</span>
              <span className="study-sq-sub">{sub}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  if (!text || text.id !== textId) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Upaniṣads</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Adhyāya picker (top level, for texts with chapters e.g. Chāndogya) ──
  if (hasAdhyayas && !adhId) return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => isBrahma ? navigate('/texts') : setTextId('')}>← {isBrahma ? 'Sacred Texts' : isYoga ? 'Yoga Sūtras' : 'All Upaniṣads'}</button>
      <div className="page-header">
        <h1 className="page-title devanagari">{text.titleDeva}</h1>
        <p className="page-subtitle">{text.title} · {text.titleEnglish}</p>
      </div>
      <div className="gita-toolbar">
        <button className="gita-nav-btn" title="Random verse" onClick={randomVerse}>🎲 Random verse</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>
      <div className="study-sq-grid">
        {adhyayas.map((adh, i) => {
          const av     = text.verses.filter(v => v.adh === adh)
          const nSecs  = new Set(av.map(v => v.sec)).size
          const locked = !isPro && i >= FREE_LIMITS.UPAN_FREE_ADHYAYA
          const color  = UPAN_COLORS[i % UPAN_COLORS.length]
          return (
            <button key={adh}
              className="study-sq-card"
              onClick={() => openAdhyaya(adh, i)}
              style={{ opacity: locked ? 0.55 : 1, cursor: 'pointer' }}
            >
              <span className="study-sq-num" style={{ color, background: `${color}22`, borderColor: `${color}44` }}>{i + 1}</span>
              <span className="study-sq-icon">📖</span>
              <span className="study-sq-label">{adh}</span>
              <span className="study-sq-sub">{locked ? '🔒 Pro' : `${nSecs} khaṇḍas · ${av.length} verses`}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  // ── Khaṇḍa / section picker ──────────────────────────────────────────
  if (!sectionId) return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => hasAdhyayas ? setAdhId('') : (isBrahma ? navigate('/texts') : setTextId(''))}>
        ← {hasAdhyayas ? `${text.title} adhyāyas` : (isBrahma ? 'Sacred Texts' : isYoga ? 'Yoga Sūtras' : 'All Upaniṣads')}
      </button>
      <div className="page-header">
        <h1 className="page-title devanagari">{text.titleDeva}</h1>
        <p className="page-subtitle">{text.title}{hasAdhyayas ? ` · ${adhId}` : ` · ${text.titleEnglish}`}</p>
      </div>
      <div className="gita-toolbar">
        <button className="gita-nav-btn" title="Random verse" onClick={randomVerse}>🎲 Random verse</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>
      <div className="study-sq-grid">
        {sections.map((sec, i) => {
          const count  = text.verses.filter(v => v.sec === sec).length
          const locked = !isPro && !hasAdhyayas && i >= FREE_LIMITS.UPAN_FREE_ADHYAYA
          const color  = UPAN_COLORS[i % UPAN_COLORS.length]
          return (
            <button key={sec}
              className="study-sq-card"
              onClick={() => openSection(sec, i)}
              style={{ opacity: locked ? 0.55 : 1, cursor: 'pointer' }}
            >
              <span className="study-sq-num" style={{ color, background: `${color}22`, borderColor: `${color}44` }}>{i + 1}</span>
              <span className="study-sq-icon">📜</span>
              <span className="study-sq-label">{sec}</span>
              <span className="study-sq-sub">{locked ? '🔒 Pro' : `${hasAdhyayas ? 'Khaṇḍa' : 'Section'} ${i + 1} · ${count} verses`}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  // ── Verse view ────────────────────────────────────────────────────────
  const idx      = Math.min(verseIdx, sectionVerses.length - 1)
  const verse    = sectionVerses[idx]
  if (!verse) return null
  const showAnswer = !drill || revealed

  const currentSecKey = verse.adh ? `${verse.adh}||${verse.sec}` : verse.sec

  const goToPrev = () => {
    if (idx > 0) { setVerseIdx(idx - 1); return }
    const ci = allSections.findIndex(s => s.key === currentSecKey)
    if (ci > 0) { const ps = allSections[ci - 1]; setAdhId(ps.adh); setSectionId(ps.sec); setVerseIdx(9999) }
  }
  const goToNext = () => {
    if (idx < sectionVerses.length - 1) { setVerseIdx(idx + 1); return }
    const ci = allSections.findIndex(s => s.key === currentSecKey)
    if (ci < allSections.length - 1) { const ns = allSections[ci + 1]; setAdhId(ns.adh); setSectionId(ns.sec); setVerseIdx(0) }
  }
  const atVeryStart = idx === 0 && allSections.findIndex(s => s.key === currentSecKey) === 0
  const atVeryEnd   = idx === sectionVerses.length - 1 && allSections.findIndex(s => s.key === currentSecKey) === allSections.length - 1

  return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => hasAdhyayas ? setAdhId('') : (isYoga ? setTextId('') : setSectionId(''))}>
        ← {hasAdhyayas ? `${text.title} adhyāyas` : (isYoga ? 'Yoga Sūtras' : text.title)}
      </button>
      <div className="page-header">
        <h1 className="page-title devanagari">{text.titleDeva}</h1>
        <p className="page-subtitle">{verse.adh ? `${verse.adh} · ` : ''}{sectionId}</p>
      </div>

      <div className="gita-toolbar">
        <button className="gita-nav-btn" onClick={goToPrev} disabled={atVeryStart} aria-label="Previous verse">←</button>
        <select className="gita-verse-select" value={currentSecKey}
          onChange={e => {
            const s = allSections.find(x => x.key === e.target.value)
            if (s) { setAdhId(s.adh); setSectionId(s.sec); setVerseIdx(0) }
          }}>
          {allSections.map(s => (
            <option key={s.key} value={s.key}>{s.adh ? `${s.adh} · ` : ''}{s.sec}</option>
          ))}
        </select>
        <select className="gita-verse-select" style={{maxWidth:'120px'}} value={idx}
          onChange={e => setVerseIdx(Number(e.target.value))}>
          {sectionVerses.map((v, i) => (
            <option key={i} value={i}>Sūtra {v.ref}</option>
          ))}
        </select>
        <button className="gita-nav-btn" onClick={goToNext} disabled={atVeryEnd} aria-label="Next verse">→</button>
        <button className="gita-nav-btn" onClick={randomVerse} title="Random verse">🎲</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>

      <div className="card gita-verse-card">
        <div className="gita-verse-tags">
          <span className="pill pill-sacred">{text.title}</span>
          <span className="pill pill-sacred" style={{marginLeft:'0.4rem'}}>Sūtra {verse.ref}</span>
          <button
            className={`speak-btn gita-speak${isPlaying ? ' playing' : ''}`}
            title={isPlaying ? 'Stop' : 'Hear verse'}
            onClick={() => handleVerseSpeak(verse.dev)}
          >
            <SpeakIcon />
          </button>
        </div>

        <div className={`gita-deva devanagari${isPlaying ? ' verse-playing' : ''}`}>
          <ClickableVerse text={verse.dev} vocabulary={vocabData?.vocabulary} />
        </div>
        <div className="gita-iast">{verse.iast}</div>

        {showAnswer ? (
          <div className="gita-answer anim-fade-up">
            <div className="gita-trans">{verse.trans}</div>
            <CommentaryPanel commentaries={verse.commentaries} />
          </div>
        ) : (
          <button className="btn-primary gita-reveal" onClick={() => setRevealed(true)}>Reveal translation</button>
        )}

        <div className="gita-footer-nav">
          <button className="btn-ghost" onClick={goToPrev} disabled={atVeryStart}>← Previous</button>
          <button className="btn-primary" onClick={goToNext} disabled={atVeryEnd}>Next →</button>
        </div>
      </div>
    </div>
  )
}
