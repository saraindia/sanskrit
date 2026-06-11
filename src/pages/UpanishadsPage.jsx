import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
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
  const [manifest, setManifest]   = useState(null)
  const [textId, setTextId]       = useSessionStorage('upan_text', '')
  const [sectionId, setSectionId] = useSessionStorage('upan_section', '')
  const [verseIdx, setVerseIdx]   = useSessionStorage('upan_verse', 0)
  const [drill, setDrill]         = useSessionStorage('upan_drill', true)
  const [revealed, setRevealed]   = useState(false)
  const [text, setText]           = useState(null)
  const [error, setError]         = useState(null)
  const { speak }                 = useSpeech()

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

  useEffect(() => { setRevealed(false) }, [textId, sectionId, verseIdx])

  // Unique sections in document order
  const sections = useMemo(() => {
    if (!text) return []
    const seen = new Set()
    const result = []
    for (const v of text.verses) {
      if (!seen.has(v.sec)) {
        seen.add(v.sec)
        result.push(v.sec)
      }
    }
    return result
  }, [text])

  // Auto-advance to verse view when there is only one section
  useEffect(() => {
    if (text && sections.length === 1 && !sectionId) setSectionId(sections[0])
  }, [text, sections, sectionId, setSectionId])

  // Verses belonging to the currently-selected section
  const sectionVerses = useMemo(() => {
    if (!text || !sectionId) return []
    return text.verses.filter(v => v.sec === sectionId)
  }, [text, sectionId])

  const openText = (id) => { setTextId(id); setSectionId(''); setVerseIdx(0) }
  const openSection = (sec) => { setSectionId(sec); setVerseIdx(0) }

  const randomVerse = useCallback(() => {
    if (!manifest) return
    const total = manifest.texts.reduce((s, t) => s + t.verses, 0)
    let n = Math.floor(Math.random() * total)
    for (const t of manifest.texts) {
      if (n < t.verses) {
        loadJson(`${t.id}.json`).then(data => {
          const secs = [...new Set(data.verses.map(v => v.sec))]
          let rem = n
          for (const sec of secs) {
            const secV = data.verses.filter(v => v.sec === sec)
            if (rem < secV.length) {
              setTextId(t.id)
              setSectionId(sec)
              setVerseIdx(rem)
              return
            }
            rem -= secV.length
          }
        })
        return
      }
      n -= t.verses
    }
  }, [manifest, setTextId, setSectionId, setVerseIdx])

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
        {manifest.texts.map(t => (
          <button key={t.id} className="gita-ch-card card" onClick={() => openText(t.id)}>
            <span className="gita-ch-num">{t.veda}</span>
            <span className="gita-ch-name devanagari">{t.titleDeva}</span>
            <span className="gita-ch-eng">{t.title} — {t.titleEnglish}</span>
            <span className="gita-ch-count">{t.verses} verses</span>
          </button>
        ))}
      </div>
    </div>
  )

  if (!text || text.id !== textId) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Upaniṣads</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Chapter / section picker ──────────────────────────────────────────
  if (!sectionId) return (
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
        {sections.map((sec, i) => {
          const count = text.verses.filter(v => v.sec === sec).length
          return (
            <button key={sec} className="gita-ch-card card" onClick={() => openSection(sec)}>
              <span className="gita-ch-num">Section {i + 1} · {count} verses</span>
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
      <button className="gita-back" onClick={() => setSectionId('')}>← {text.title} chapters</button>
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
        </div>

        <div className="gita-deva devanagari">{verse.dev}</div>
        <button className="speak-btn gita-speak" title="Hear verse" onClick={() => speak(verse.dev)}><SpeakIcon /></button>
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
