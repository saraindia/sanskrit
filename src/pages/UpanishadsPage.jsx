import React, { useState, useEffect, useCallback } from 'react'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import './GitaPage.css'

// Text JSON is fetched on demand and kept for the session
const cache = new Map()
async function loadJson(file) {
  if (cache.has(file)) return cache.get(file)
  const res = await fetch(`/content/upanishads/${file}`)
  if (!res.ok) throw new Error(`Could not load ${file}`)
  const data = await res.json()
  cache.set(file, data)
  return data
}

export default function UpanishadsPage() {
  const [manifest, setManifest] = useState(() => cache.get('manifest.json') || null)
  const [textId, setTextId]     = useSessionStorage('upan_text', '')   // '' = text list
  const [verseIdx, setVerseIdx] = useSessionStorage('upan_verse', 0)
  const [drill, setDrill]       = useSessionStorage('upan_drill', true)
  const [revealed, setRevealed] = useState(false)
  const [text, setText]         = useState(null)
  const [error, setError]       = useState(null)
  const { speak } = useSpeech()

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

  // Hide the answer again whenever the verse changes
  useEffect(() => { setRevealed(false) }, [textId, verseIdx])

  const openText = (id) => { setTextId(id); setVerseIdx(0) }

  const randomVerse = useCallback(async () => {
    if (!manifest) return
    const total = manifest.texts.reduce((s, t) => s + t.verses, 0)
    let n = Math.floor(Math.random() * total)
    for (const t of manifest.texts) {
      if (n < t.verses) { setTextId(t.id); setVerseIdx(n); return }
      n -= t.verses
    }
  }, [manifest, setTextId, setVerseIdx])

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
      <div className="page-header">
        <h1 className="page-title">Upaniṣads</h1>
        <p className="page-subtitle">{manifest.texts.length} texts · {manifest.texts.reduce((s,t)=>s+t.verses,0)} verses · Müller translation</p>
      </div>
      <div className="gita-toolbar">
        <button className="btn-primary" onClick={randomVerse}>🎲 Random verse</button>
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

  // ── Verse view ────────────────────────────────────────────────────────
  const idx = Math.min(verseIdx, text.verses.length - 1)
  const verse = text.verses[idx]
  const showAnswer = !drill || revealed
  const atStart = idx === 0
  const atEnd = idx === text.verses.length - 1

  // Group verse indices by section for the dropdown
  const groups = []
  text.verses.forEach((v, i) => {
    const last = groups[groups.length - 1]
    if (!last || last.sec !== v.sec) groups.push({ sec: v.sec, items: [[i, v.ref]] })
    else last.items.push([i, v.ref])
  })

  return (
    <div className="gita anim-fade-up">
      <div className="page-header">
        <button className="gita-back" onClick={() => setTextId('')}>← All Upaniṣads</button>
        <h1 className="page-title devanagari">{text.titleDeva}</h1>
        <p className="page-subtitle">{text.title} · {text.titleEnglish}</p>
      </div>

      <div className="gita-toolbar">
        <button className="gita-nav-btn" onClick={() => setVerseIdx(idx - 1)} disabled={atStart} aria-label="Previous verse">←</button>
        <select className="drill-select gita-verse-select" value={idx}
          onChange={e => setVerseIdx(Number(e.target.value))}>
          {groups.map(g => (
            <optgroup key={g.sec} label={g.sec}>
              {g.items.map(([i, ref]) => <option key={i} value={i}>Verse {ref}</option>)}
            </optgroup>
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
          <span className="pill pill-sacred">{text.title} {verse.ref}</span>
          <span className="pill pill-sacred" style={{marginLeft:'0.4rem'}}>{verse.sec}</span>
        </div>

        <div className="gita-deva devanagari">{verse.dev}</div>
        <button className="speak-btn gita-speak" title="Hear verse" onClick={() => speak(verse.dev)}><SpeakIcon /></button>
        <div className="gita-iast">{verse.iast}</div>

        {showAnswer ? (
          <div className="gita-answer anim-fade-up">
            <div className="gita-trans">{verse.trans}</div>
          </div>
        ) : (
          <button className="btn-primary gita-reveal" onClick={() => setRevealed(true)}>Reveal translation</button>
        )}

        <div className="gita-footer-nav">
          <button className="btn-ghost" onClick={() => setVerseIdx(idx - 1)} disabled={atStart}>← Previous</button>
          <button className="btn-primary" onClick={() => setVerseIdx(idx + 1)} disabled={atEnd}>Next verse →</button>
        </div>
      </div>
    </div>
  )
}
