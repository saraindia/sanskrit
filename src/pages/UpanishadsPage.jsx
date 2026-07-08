import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import { ClickableVerse } from '../components/ClickableSentence'
import { useVocabularyData } from '../hooks/useData'
import { usePurchase } from '../context/PurchaseContext'
import './GitaPage.css'

const COMMENTARY_LABELS = {
  advaita_vedanta:   { label: 'Advaita Vedānta',   subtitle: 'Śaṅkara' },
  vishishtadvaita:   { label: 'Viśiṣṭādvaita',     subtitle: 'Rāmānuja' },
  dvaita_vedanta:    { label: 'Dvaita Vedānta',     subtitle: 'Madhva' },
  integral_advaita:  { label: 'Integral Advaita',   subtitle: 'Aurobindo' },
  integral_yoga:     { label: 'Integral Yoga',      subtitle: 'Aurobindo' },
  modern_vedanta:    { label: 'Modern Vedānta',     subtitle: 'Vivekānanda / Sarvapriyananda' },
  universalist:      { label: 'Universalist',       subtitle: 'Neo-Vedānta' },
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
async function loadJson(file) {
  if (cache.has(file)) return cache.get(file)
  const res = await fetch(`/content/upanishads/${file}`, file === 'manifest.json' ? { cache: 'no-store' } : undefined)
  if (!res.ok) throw new Error(`Could not load ${file}`)
  const raw = await res.text()
  const data = JSON.parse(raw.replace(/,(\s*[}\]])/g, '$1'))
  if (file !== 'manifest.json') cache.set(file, data)
  return data
}

export default function UpanishadsPage() {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
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

  useEffect(() => {
    loadJson('manifest.json').then(setManifest).catch(e => setError(e.message))
  }, [])

  useEffect(() => {
    if (!textId) { setText(null); return }
    let live = true
    loadJson(`${textId}.json`)
      .then(d => { if (live) setText(d) })
      .catch(e => { if (live) setError(e.message) })
    return () => { live = false }
  }, [textId])

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

  const openText = (id, textIdx) => {
    if (!isPro && textIdx >= FREE_LIMITS.UPAN_FREE_TEXT) { showPaywall(); return }
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

  if (error) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Upaniṣads</h1></div>
      <div className="card" style={{padding:'2rem',textAlign:'center'}}>
        <p style={{color:'var(--text-secondary)'}}>{error}</p>
      </div>
    </div>
  )

  if (!manifest) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Upaniṣads</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Text picker ───────────────────────────────────────────────────────
  if (!textId) return (
    <div className="gita anim-fade-up">
      <HubBack to="/texts" label="Sacred Texts" />
      <div className="page-header">
        <h1 className="page-title">Upaniṣads</h1>
        <p className="page-subtitle">{manifest.texts.length} texts · {manifest.texts.reduce((s,t)=>s+t.verses,0)} verses · Müller translation</p>
      </div>
      <div className="gita-toolbar">
        <button className="gita-nav-btn" title="Random verse" onClick={randomVerse}>🎲 Random verse</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode — hide translations</span>
        </label>
      </div>
      <div className="gita-chapters">
        {manifest.texts.map((t, i) => {
          const locked = !isPro && i >= FREE_LIMITS.UPAN_FREE_TEXT
          return (
            <button key={t.id}
              className={`gita-ch-card card ${locked ? 'gita-ch-locked' : ''}`}
              onClick={() => openText(t.id, i)}
              style={locked ? { opacity: 0.55 } : undefined}
            >
              <span className="gita-ch-num">{t.veda}</span>
              <span className="gita-ch-name devanagari">{t.titleDeva}</span>
              <span className="gita-ch-eng">{t.title} — {t.titleEnglish}</span>
              <span className="gita-ch-count">{locked ? '🔒' : `${t.verses} verses`}</span>
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
      <button className="gita-back" onClick={() => setTextId('')}>← All Upaniṣads</button>
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
      <div className="gita-chapters">
        {adhyayas.map((adh, i) => {
          const av = text.verses.filter(v => v.adh === adh)
          const nSecs = new Set(av.map(v => v.sec)).size
          const locked = !isPro && i >= FREE_LIMITS.UPAN_FREE_ADHYAYA
          return (
            <button key={adh}
              className={`gita-ch-card card ${locked ? 'gita-ch-locked' : ''}`}
              onClick={() => openAdhyaya(adh, i)}
              style={locked ? { opacity: 0.55 } : undefined}
            >
              <span className="gita-ch-num">{locked ? '🔒' : `${nSecs} khaṇḍas · ${av.length} verses`}</span>
              <span className="gita-ch-eng">{adh}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  // ── Khaṇḍa / section picker ──────────────────────────────────────────
  if (!sectionId) return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => hasAdhyayas ? setAdhId('') : setTextId('')}>
        ← {hasAdhyayas ? `${text.title} adhyāyas` : 'All Upaniṣads'}
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
      <div className="gita-chapters">
        {sections.map((sec, i) => {
          const count = text.verses.filter(v => v.sec === sec).length
          const locked = !isPro && !hasAdhyayas && i >= FREE_LIMITS.UPAN_FREE_ADHYAYA
          return (
            <button key={sec}
              className={`gita-ch-card card ${locked ? 'gita-ch-locked' : ''}`}
              onClick={() => openSection(sec, i)}
              style={locked ? { opacity: 0.55 } : undefined}
            >
              <span className="gita-ch-num">{locked ? '🔒' : `${hasAdhyayas ? 'Khaṇḍa' : 'Section'} ${i + 1} · ${count} verses`}</span>
              <span className="gita-ch-eng">{sec}</span>
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
  const atStart    = idx === 0
  const atEnd      = idx === sectionVerses.length - 1

  return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => setSectionId('')}>
        ← {hasAdhyayas ? `${adhId} khaṇḍas` : `${text.title} chapters`}
      </button>
      <div className="page-header">
        <h1 className="page-title devanagari">{text.titleDeva}</h1>
        <p className="page-subtitle">{sectionId}</p>
      </div>

      <div className="gita-toolbar">
        <button className="gita-nav-btn" onClick={() => setVerseIdx(idx - 1)} disabled={atStart} aria-label="Previous verse">←</button>
        <select className="gita-verse-select" value={idx}
          onChange={e => setVerseIdx(Number(e.target.value))}>
          {sectionVerses.map((v, i) => (
            <option key={i} value={i}>Verse {v.ref}</option>
          ))}
        </select>
        <button className="gita-nav-btn" onClick={() => setVerseIdx(idx + 1)} disabled={atEnd} aria-label="Next verse">→</button>
        <button className="gita-nav-btn" onClick={randomVerse} title="Random verse">🎲</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>

      <div className="card gita-verse-card">
        <div className="gita-verse-tags">
          <span className="pill pill-sacred">{text.title}</span>
          <span className="pill pill-sacred" style={{marginLeft:'0.4rem'}}>Verse {verse.ref}</span>
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
          <button className="btn-ghost" onClick={() => setVerseIdx(idx - 1)} disabled={atStart}>← Previous</button>
          {atEnd
            ? <button className="btn-primary" onClick={() => setSectionId('')}>Back to chapters →</button>
            : <button className="btn-primary" onClick={() => setVerseIdx(idx + 1)}>Next verse →</button>
          }
        </div>
      </div>
    </div>
  )
}
