import React, { useState, useEffect, useCallback } from 'react'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import { ClickableVerse } from '../components/ClickableSentence'
import { useVocabularyData } from '../hooks/useData'
import { usePurchase } from '../context/PurchaseContext'
import './GitaPage.css'

// Chapter JSON is fetched on demand and kept for the session
const cache = new Map()
async function loadJson(file) {
  if (cache.has(file)) return cache.get(file)
  const res = await fetch(`/content/gita/${file}`)
  if (!res.ok) throw new Error(`Could not load ${file}`)
  const data = await res.json()
  cache.set(file, data)
  return data
}

const chapterFile = n => `ch${String(n).padStart(2, '0')}.json`

export default function GitaPage() {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
  const [manifest, setManifest]     = useState(() => cache.get('manifest.json') || null)
  const [chapterNum, setChapterNum] = useSessionStorage('gita_chapter', 0)  // 0 = chapter list
  const [verseNum, setVerseNum]     = useSessionStorage('gita_verse', 1)
  const [drill, setDrill]           = useSessionStorage('gita_drill', true)
  const [revealed, setRevealed]     = useState(false)
  const [chapter, setChapter]       = useState(null)
  const [error, setError]           = useState(null)
  const [commOpen, setCommOpen]     = useSessionStorage('gita_comm_open', false)
  const [commAuthor, setCommAuthor] = useSessionStorage('gita_comm_author', 'sivananda')
  const [commentary, setCommentary] = useState(null)
  const { speak, speakLines, stop, isPlaying } = useSpeech()
  const [activeLine, setActiveLine] = useState(-1)
  const vocabData = useVocabularyData()

  const handleVerseSpeak = useCallback((dev) => {
    if (isPlaying) { stop(); setActiveLine(-1); return }
    speakLines(dev, { onLine: setActiveLine, onDone: () => setActiveLine(-1) })
  }, [isPlaying, stop, speakLines])

  useEffect(() => {
    loadJson('manifest.json').then(setManifest).catch(e => setError(e.message))
  }, [])

  useEffect(() => {
    if (!chapterNum) { setChapter(null); return }
    let live = true
    loadJson(chapterFile(chapterNum))
      .then(d => { if (live) setChapter(d) })
      .catch(e => { if (live) setError(e.message) })
    return () => { live = false }
  }, [chapterNum])

  // Hide the answer and stop playback when the verse changes
  useEffect(() => { setRevealed(false); stop(); setActiveLine(-1) }, [chapterNum, verseNum]) // eslint-disable-line react-hooks/exhaustive-deps

  // Commentary loads per chapter, only once the panel has been opened
  useEffect(() => {
    if (!commOpen || !chapterNum) return
    let live = true
    loadJson(`commentary/${chapterFile(chapterNum)}`)
      .then(d => { if (live) setCommentary(d) })
      .catch(() => { if (live) setCommentary(null) })
    return () => { live = false }
  }, [commOpen, chapterNum])

  const openChapter = (n) => {
    if (!isPro && n > FREE_LIMITS.GITA_FREE_CHAPTER) { showPaywall(); return }
    setChapterNum(n); setVerseNum(1)
  }

  const goTo = useCallback((ch, v) => { setChapterNum(ch); setVerseNum(v) }, [setChapterNum, setVerseNum])

  const next = useCallback(() => {
    if (!chapter || !manifest) return
    if (verseNum < chapter.verses.length) return setVerseNum(verseNum + 1)
    // End of chapter — block free users from advancing beyond the free chapter
    if (!isPro && chapterNum >= FREE_LIMITS.GITA_FREE_CHAPTER) { showPaywall(); return }
    if (chapterNum < manifest.chapters.length) goTo(chapterNum + 1, 1)
  }, [chapter, manifest, chapterNum, verseNum, goTo, setVerseNum, isPro, showPaywall, FREE_LIMITS])

  const prev = useCallback(() => {
    if (!manifest) return
    if (verseNum > 1) return setVerseNum(verseNum - 1)
    if (chapterNum > 1) {
      const prevCh = manifest.chapters[chapterNum - 2]
      goTo(chapterNum - 1, prevCh.verses)
    }
  }, [manifest, chapterNum, verseNum, goTo, setVerseNum])

  const randomVerse = useCallback(() => {
    if (!manifest) return
    const chapters = isPro
      ? manifest.chapters
      : manifest.chapters.slice(0, FREE_LIMITS.GITA_FREE_CHAPTER)
    const total = chapters.reduce((s, c) => s + c.verses, 0)
    let n = Math.floor(Math.random() * total)
    for (const c of chapters) {
      if (n < c.verses) return goTo(c.chapter, n + 1)
      n -= c.verses
    }
  }, [manifest, goTo, isPro, FREE_LIMITS])

  if (error) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Bhagavad Gītā</h1></div>
      <div className="card" style={{padding:'2rem',textAlign:'center'}}>
        <p style={{color:'var(--text-secondary)'}}>{error}</p>
      </div>
    </div>
  )

  if (!manifest) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Bhagavad Gītā</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Chapter picker ────────────────────────────────────────────────────
  if (!chapterNum) return (
    <div className="gita anim-fade-up">
      <HubBack to="/texts" label="Sacred Texts" />
      <div className="page-header">
        <h1 className="page-title">Bhagavad Gītā</h1>
        <p className="page-subtitle">18 chapters · 701 verses · word by word</p>
      </div>
      <div className="gita-toolbar">
        <button className="gita-nav-btn" title="Random verse" onClick={randomVerse}>🎲 Random verse</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode — hide translations</span>
        </label>
      </div>
      <div className="gita-chapters">
        {manifest.chapters.map(c => {
          const locked = !isPro && c.chapter > FREE_LIMITS.GITA_FREE_CHAPTER
          return (
            <button key={c.chapter}
              className={`gita-ch-card card ${locked ? 'gita-ch-locked' : ''}`}
              onClick={() => openChapter(c.chapter)}
              style={locked ? { opacity: 0.55 } : undefined}
            >
              <span className="gita-ch-num">{c.chapter}</span>
              <span className="gita-ch-name devanagari">{c.name}</span>
              <span className="gita-ch-eng">{c.nameEnglish}</span>
              <span className="gita-ch-count">{locked ? '🔒' : `${c.verses} verses`}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  if (!chapter || chapter.chapter !== chapterNum) return (
    <div className="gita anim-fade-up">
      <div className="page-header"><h1 className="page-title">Bhagavad Gītā</h1></div>
      <div className="card gita-loading">Loading chapter {chapterNum}…</div>
    </div>
  )

  // ── Verse view ────────────────────────────────────────────────────────
  const verse = chapter.verses.find(v => v.v === verseNum) || chapter.verses[0]
  const showAnswer = !drill || revealed
  const atStart = chapterNum === 1 && verse.v === 1
  const atEnd = chapterNum === manifest.chapters.length && verse.v === chapter.verses.length

  return (
    <div className="gita anim-fade-up">
      <button className="gita-back" onClick={() => setChapterNum(0)}>← All chapters</button>
      <div className="page-header">
        <h1 className="page-title devanagari">{chapter.name}</h1>
        <p className="page-subtitle">Chapter {chapter.chapter} · {chapter.nameEnglish}</p>
      </div>

      <div className="gita-toolbar">
        <button className="gita-nav-btn" onClick={prev} disabled={atStart} aria-label="Previous verse">←</button>
        <select className="gita-verse-select" value={verse.v}
          onChange={e => setVerseNum(Number(e.target.value))}>
          {chapter.verses.map(v => <option key={v.v} value={v.v}>Verse {v.v} of {chapter.verses.length}</option>)}
        </select>
        <button className="gita-nav-btn" onClick={next} disabled={atEnd} aria-label="Next verse">→</button>
        <button className="gita-nav-btn" onClick={randomVerse} title="Random verse">🎲</button>
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>

      <div className="card gita-verse-card">
        <div className="gita-verse-tags">
          <span className="pill pill-sacred">BG {chapter.chapter}.{verse.v}</span>
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
            {verse.words.length > 0 && (
              <div className="gita-words">
                {verse.words.map((wm, i) => (
                  <button key={i} className="gita-word" title="Listen"
                    onClick={() => speak(wm.d || wm.w)}>
                    <span className="gita-word-deva devanagari">{wm.d}<span className="gita-word-ear">🔊</span></span>
                    <span className="gita-word-sa">{wm.w}</span>
                    <span className="gita-word-en">{wm.m}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="gita-comm">
              <button className="gita-comm-toggle" onClick={() => setCommOpen(o => !o)}>
                {commOpen ? '▾' : '▸'} Commentary
              </button>
              {commOpen && (() => {
                if (!commentary || commentary.chapter !== chapter.chapter)
                  return <div className="gita-comm-loading">Loading commentary…</div>
                const entry = commentary.verses[String(verse.v)]
                const avail = commentary.authors.filter(a => entry?.[a.key])
                if (!avail.length) return <div className="gita-comm-loading">No commentary for this verse.</div>
                const active = avail.find(a => a.key === commAuthor) || avail[0]
                return (
                  <div className="gita-comm-body anim-fade-up">
                    <div className="gita-comm-authors">
                      {avail.map(a => (
                        <button key={a.key}
                          className={`filter-btn ${a.key === active.key ? 'active' : ''}`}
                          onClick={() => setCommAuthor(a.key)}>{a.name}</button>
                      ))}
                    </div>
                    <div className={`gita-comm-text ${active.lang === 'sanskrit' ? 'devanagari' : ''}`}>
                      {entry[active.key]}
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        ) : (
          <button className="btn-primary gita-reveal" onClick={() => setRevealed(true)}>Reveal translation</button>
        )}

        <div className="gita-footer-nav">
          <button className="btn-ghost" onClick={prev} disabled={atStart}>← Previous</button>
          <button className="btn-primary" onClick={next} disabled={atEnd}>Next verse →</button>
        </div>
      </div>
    </div>
  )
}
