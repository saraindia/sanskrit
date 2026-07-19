import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useVocabularyData, useSentenceData } from '../hooks/useData'
import { MODULES } from '../data/modules.js'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import { toIAST } from '../utils/transliterate.js'
import { getLevel, getNextLevel, getLevelProgress, getEarnedBadges, BADGES } from '../utils/levels.js'
import { BHAGAVAD_GITA } from '../data/sacred.js'
import { VOCABULARY } from '../data/vocabulary.js'
import { VNP_SENTENCES, COLLATED_SENTENCES } from '../data/sentences.js'
import './Dashboard.css'

function getDailyVerse() {
  const start = new Date('2024-01-01')
  const today = new Date()
  const day = Math.floor((today - start) / 86400000)
  return BHAGAVAD_GITA[day % BHAGAVAD_GITA.length]
}

const GITA_VERSE_COUNTS = [0,47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78]

function GitaChantPlayer() {
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState({ ch: 1, v: 1 })
  const stopRef  = useRef(false)
  const audioRef = useRef(null)

  const stop = useCallback(() => {
    stopRef.current = true
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    setPlaying(false)
  }, [])

  useEffect(() => () => stop(), [stop])

  const play = useCallback(async () => {
    if (playing) { stop(); return }
    stopRef.current = false
    setPlaying(true)
    const { getGitaAudioUrl } = await import('../utils/gitaAudio.js')
    let ch = 1, v = 1
    outer: while (ch <= 18) {
      const maxV = GITA_VERSE_COUNTS[ch]
      while (v <= maxV) {
        if (stopRef.current) break outer
        setCurrent({ ch, v })
        try {
          const url = await getGitaAudioUrl(ch, v)
          if (stopRef.current) break outer
          await new Promise((resolve) => {
            const audio = new Audio(url)
            audioRef.current = audio
            audio.onended = resolve
            audio.onerror = resolve
            audio.play().catch(resolve)
          })
          audioRef.current = null
        } catch { /* skip */ }
        v++
      }
      ch++; v = 1
    }
    if (!stopRef.current) setPlaying(false)
  }, [playing, stop])

  return (
    <div className="gita-chant-player">
      <div className="gita-chant-info">
        <span className="gita-chant-title">Bhagavad Gītā — Full Chant</span>
        {playing && <span className="gita-chant-ref">BG {current.ch}.{current.v}</span>}
      </div>
      <button className={`gita-chant-btn${playing ? ' playing' : ''}`} onClick={play}>
        {playing ? '◼ Stop' : '▶ Play Full Gita'}
      </button>
    </div>
  )
}

function ShlokaOfDay({ open, onToggle }) {
  const [loading, setLoading] = useState(false)
  const verse = useMemo(() => getDailyVerse(), [])
  const { playUrl, stop, isPlaying } = useSpeech()

  const handleListen = useCallback(async (e) => {
    e.stopPropagation()
    if (isPlaying) { stop(); return }
    setLoading(true)
    try {
      const { getGitaAudioUrl } = await import('../utils/gitaAudio.js')
      const url = await getGitaAudioUrl(verse.chapter, verse.verse)
      await playUrl(url)
    } catch { /* silently ignore */ }
    finally { setLoading(false) }
  }, [isPlaying, stop, playUrl, verse])

  if (!verse) return null
  return (
    <div className={`shloka-accord${open ? ' daily-card--open' : ''}`}>
      <button className="shloka-accord-hdr" onClick={onToggle}>
        <span className="shloka-accord-flame">🪷</span>
        <div className="shloka-accord-meta">
          <span className="shloka-accord-title">Shloka of the Day</span>
          <span className="shloka-accord-ref">Bhagavad Gītā {verse.chapter}.{verse.verse}</span>
        </div>
        <span className="shloka-accord-chevron">{open ? '▾' : '›'}</span>
      </button>
      {open && (
        <div className="shloka-accord-body">
          <div className="shloka-deva-row">
            <div className="shloka-deva">{verse.devanagari}</div>
            <button
              className={`shloka-listen-icon${isPlaying ? ' playing' : ''}${loading ? ' loading' : ''}`}
              onClick={handleListen}
              disabled={loading}
              title={loading ? 'Loading…' : isPlaying ? 'Stop' : 'Listen'}
            >
              {loading ? '…' : isPlaying ? '■' : <SpeakIcon size="16px" />}
            </button>
          </div>
          {verse.iast && <div className="shloka-iast">{verse.iast}</div>}
          <div className="shloka-translation">{verse.translation}</div>
          {verse.commentary && (
            <div className="shloka-commentary">{verse.commentary}</div>
          )}
          <Link to={`/gita?chapter=${verse.chapter}&verse=${verse.verse}`} className="shloka-link">
            Read in Bhagavad Gītā →
          </Link>
        </div>
      )}
    </div>
  )
}


// ── POS badge colour map ──────────────────────────────────────────────────────
const POS_COLOUR = {
  noun: 'var(--gold)',
  verb: 'var(--teal, #3a9e8a)',
  adj:  '#a78bfa',
  adv:  '#f59e0b',
  pronoun: '#60a5fa',
}

function getDailyWord() {
  const start = new Date('2024-01-01')
  const today = new Date()
  const day = Math.floor((today - start) / 86400000)
  return VOCABULARY[day % VOCABULARY.length]
}

function WordOfDay({ open, onToggle }) {
  const word = useMemo(() => getDailyWord(), [])
  const { speak, stop, isPlaying } = useSpeech()
  const navigate = useNavigate()

  const exampleSentence = useMemo(() => {
    if (!word) return null
    const allSentences = [...VNP_SENTENCES, ...COLLATED_SENTENCES]
    const root = word.devanagari.replace(/[ंःँ।॥]/g, '').trim()
    return (
      allSentences.find(s => s.devanagari.includes(root)) ||
      allSentences.find(s => s.english?.toLowerCase().includes(word.english.toLowerCase())) ||
      null
    )
  }, [word])

  const handleSeeInDict = useCallback((e) => {
    e.preventDefault()
    sessionStorage.setItem('dict-prefill', JSON.stringify({
      query: word.english,
      word: word.devanagari,
      meaning: word.english,
      transliteration: word.iast,
      wordType: word.pos,
      gender: word.gender,
      difficulty: word.level,
      category: word.pos,
    }))
    navigate(`/dictionary?q=${encodeURIComponent(word.english)}`)
  }, [word, navigate])

  const handleListen = useCallback((e) => {
    e.stopPropagation()
    if (isPlaying) { stop(); return }
    speak(word.devanagari)
  }, [isPlaying, stop, speak, word])

  if (!word) return null
  const posColour = POS_COLOUR[word.pos] || 'var(--text-muted)'
  return (
    <div className={`shloka-accord word-of-day-accord${open ? ' daily-card--open' : ''}`}>
      <button className="shloka-accord-hdr" onClick={onToggle}>
        <span className="shloka-accord-flame">{word.emoji || '✨'}</span>
        <div className="shloka-accord-meta">
          <span className="shloka-accord-title">Word of the Day</span>
          <span className="shloka-accord-ref" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{word.devanagari}</span>
        </div>
        <span className="shloka-accord-chevron">{open ? '▾' : '›'}</span>
      </button>
      {open && (
        <div className="shloka-accord-body">
          <div className="shloka-deva-row">
            <div className="shloka-deva" style={{ fontSize: '1.3rem' }}>{word.devanagari}</div>
            <button
              className={`shloka-listen-icon${isPlaying ? ' playing' : ''}`}
              onClick={handleListen}
              title={isPlaying ? 'Stop' : 'Listen'}
            >
              {isPlaying ? '■' : <SpeakIcon size="16px" />}
            </button>
          </div>
          {word.iast && <div className="shloka-iast">{word.iast}</div>}
          <div className="shloka-translation">{word.english}</div>
          {word.pos && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span className="dict-tag" style={{ color: posColour, borderColor: posColour }}>{word.pos}</span>
              {word.gender && <span className="dict-tag">{{ m: 'masc.', f: 'fem.', n: 'neut.' }[word.gender] || word.gender}</span>}
              {word.level && <span className="dict-tag">{word.level}</span>}
            </div>
          )}
          {exampleSentence && (
            <div className="wod-example">
              <div className="wod-example-sa">{exampleSentence.devanagari}</div>
              <div className="wod-example-en">{exampleSentence.english}</div>
            </div>
          )}
          <button className="shloka-link" onClick={handleSeeInDict}>See in Dictionary →</button>
        </div>
      )}
    </div>
  )
}

function searchDict(q, index) {
  if (!q || !q.trim() || !index) return []
  const terms = q.trim().toLowerCase().split(/\s+/)
  return index.filter(v => terms.every(t => v._search.includes(t))).slice(0, 40)
}

// ── Word detail popup ─────────────────────────────────────────────────────────
function WordPopup({ word, onClose, anchorRef }) {
  const { speak, isPlaying } = useSpeech()
  const popupRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) &&
          anchorRef?.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [onClose, anchorRef])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const posColour = POS_COLOUR[word.pos] || 'var(--text-muted)'
  const conceptList = (word.concepts || []).join(', ')

  return (
    <div className="dict-popup anim-fade-up" ref={popupRef} role="dialog" aria-label={word.english}>
      <button className="dict-popup-close" onClick={onClose} aria-label="Close">✕</button>

      {/* Main word display */}
      <div className="dict-popup-head">
        {word.emoji && <div className="dict-popup-emoji">{word.emoji}</div>}
        <div className="dict-popup-deva">{word.devanagari}</div>
        <div className="dict-popup-iast">{word.iast}</div>
      </div>

      {/* Listen button */}
      <button
        className={`dict-popup-listen ${isPlaying ? 'listening' : ''}`}
        onClick={() => speak(word.devanagari)}
        title="Pronounce"
      >
        {isPlaying
          ? <><span className="dict-listen-wave">▶</span> Playing…</>
          : <><svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg> Listen</>
        }
      </button>

      {/* Details grid */}
      <div className="dict-popup-details">
        <div className="dict-popup-english">{word.english}</div>
        <div className="dict-popup-tags">
          {word.pos && (
            <span className="dict-tag" style={{ color: posColour, borderColor: posColour }}>
              {word.pos}
            </span>
          )}
          {word.gender && (
            <span className="dict-tag">
              {{ m: 'masc.', f: 'fem.', n: 'neut.' }[word.gender] || word.gender}
            </span>
          )}
          {word.level && <span className="dict-tag">{word.level}</span>}
        </div>
        {conceptList && (
          <div className="dict-popup-concepts">
            <span className="dict-concepts-label">Grammar</span>
            <span className="dict-concepts-val">{conceptList}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Dictionary search widget ──────────────────────────────────────────────────
function DictionarySearch({ vocabulary }) {
  const dictIndex = React.useMemo(() => (vocabulary || []).map(v => ({
    ...v,
    _search: [v.devanagari, v.iast, v.english, v.pos || '', v.gender || ''].join(' ').toLowerCase(),
  })), [vocabulary])
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState([])
  const [playingId, setPlayingId] = useState(null)
  const inputRef = useRef(null)
  const { speak, stop, isPlaying } = useSpeech()

  // Clear playingId whenever TTS finishes
  useEffect(() => {
    if (!isPlaying) setPlayingId(null)
  }, [isPlaying])

  const handleChange = useCallback((e) => {
    const q = e.target.value
    setQuery(q)
    setResults(searchDict(q, dictIndex))
  }, [dictIndex])

  const handleListen = useCallback((e, word) => {
    e.stopPropagation()
    if (playingId === word.id) {
      stop()
      setPlayingId(null)
    } else {
      speak(word.devanagari)
      setPlayingId(word.id)
    }
  }, [playingId, speak, stop])

  const clear = useCallback(() => {
    setQuery(''); setResults([]); stop(); setPlayingId(null)
    inputRef.current?.blur()
  }, [stop])

  return (
    <div className="dict-widget">
      {/* Search bar */}
      <div className="dict-search-wrap">
        <span className="dict-search-icon">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="9" cy="9" r="6"/><line x1="14" y1="14" x2="19" y2="19"/>
          </svg>
        </span>
        <input
          ref={inputRef}
          className="dict-search-input"
          type="search"
          placeholder="Search Sanskrit… e.g. lion, siṃha, सिंह"
          value={query}
          onChange={handleChange}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        {query && (
          <button className="dict-search-clear" onClick={clear} aria-label="Clear">✕</button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="dict-results">
          <div className="dict-results-count">{results.length} word{results.length !== 1 ? 's' : ''} found</div>
          <div className="dict-result-list">
            {results.map(word => {
              const isThisPlaying = playingId === word.id
              return (
                <div key={word.id} className="dict-result-row">
                  <button
                    className={`dict-result-listen ${isThisPlaying ? 'dict-result-listen--playing' : ''}`}
                    onClick={(e) => handleListen(e, word)}
                    title={isThisPlaying ? 'Stop' : 'Pronounce'}
                    aria-label={isThisPlaying ? 'Stop pronunciation' : `Pronounce ${word.devanagari}`}
                  >
                    {isThisPlaying
                      ? <span className="dict-listen-bars"><span/><span/><span/></span>
                      : <SpeakIcon size="13px" />
                    }
                  </button>
                  <span className="dict-result-deva">{word.devanagari}</span>
                  <span className="dict-result-iast">{word.iast || toIAST(word.devanagari)}</span>
                  <span className="dict-result-english">{word.english}</span>
                  {word.pos && (
                    <span className="dict-result-pos" style={{ color: POS_COLOUR[word.pos] || 'var(--text-muted)' }}>
                      {word.pos}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="dict-no-results">No words found for <em>"{query}"</em></div>
      )}

    </div>
  )
}


const DASH_SECTIONS = (dueCount) => [
  { label: 'Learn', dev: 'शिक्षणम्', icon: '🎬', color: '#06b6d4',
    items: [
      { to: '/varnamala',  icon: '🎬', label: 'Varṇamālā Series',    sub: '25 episodes · Tattvam · Sanskrit sounds & script' },
      { to: '/alphabet',   icon: '🔤', label: 'Alphabet — Write & Hear', sub: 'Tap each letter · stroke animation · audio' },
      { to: '/course',     icon: '🎬', label: 'Sanskrit in 33 Days', sub: '5 weeks · 33 video lessons · by Ashok' },
      { to: '/dictionary', icon: '📖', label: 'Dictionary',          sub: '1,200+ words · meaning · grammar · examples' },
    ]
  },
  { label: 'Grammar', dev: 'व्याकरणम्', icon: '🔠', color: '#f59e0b',
    items: [
      { to: '/grammar', icon: '🔠', label: 'Learn Grammar', sub: 'Nouns · Verbs · Cases · Tenses' },
    ]
  },
  { label: 'Practice', dev: 'अभ्यासः', icon: '⚡', color: '#34d399',
    items: [
      { to: '/flashcards', icon: '🗂️', label: 'Flashcards',     sub: `${dueCount} due today` },
      { to: '/drill',      icon: '⚡',  label: 'Sentence Drill', sub: 'Verb · noun · pronoun' },
      { to: '/fill',       icon: '✏️',  label: 'Fill in Blanks', sub: 'Grammar & vocabulary' },
      { to: '/match',      icon: '🔡',  label: 'Match Pairs',    sub: 'Sanskrit ↔ English' },
    ]
  },
  { label: 'Advanced Practice', dev: 'विशेषाभ्यासः', icon: '🌟', color: '#f97316',
    items: [
      { to: '/story', icon: '📖', label: 'Stories', sub: 'Word-by-word translation' },
    ]
  },
  { label: 'Sacred Texts', dev: 'ग्रन्थाः', icon: '📜', color: '#60a5fa',
    items: [
      { to: '/gita',         icon: '🪷',  label: 'Bhagavad Gītā', sub: '701 verses' },
      { to: '/upanishads',   icon: '🕉️', label: 'Upaniṣads',     sub: 'Īśā · Kaṭha · Muṇḍaka' },
      { to: '/brahmasutras', icon: '📿',  label: 'Brahmasūtras',  sub: '4 adhyāyas · 510 sūtras' },
      { to: '/yogasutras',   icon: '🧘',  label: 'Yoga Sūtras',   sub: '4 pādas · 196 sūtras' },
    ]
  },
  { label: 'Listen', dev: 'श्रवणम्', icon: '🎧', color: '#a78bfa',
    items: [
      { to: '/podcast', icon: '🎧', label: 'Podcasts',       sub: 'Sanskrit audio' },
      { to: '/ddnews',  icon: '📻', label: 'Sanskrit Vārtā', sub: 'Daily news in Sanskrit' },
    ]
  },
]

function DashSections({ dueCount }) {
  const [open, setOpen] = useState(null)
  const sections = DASH_SECTIONS(dueCount)
  const headerRefs = useRef([])

  const toggle = (si) => {
    const opening = open !== si
    setOpen(opening ? si : null)
    if (opening) {
      setTimeout(() => {
        headerRefs.current[si]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  return (
    <div className="dash-accord-grid">
      {sections.map((sec, si) => {
        const isOpen = open === si
        return (
          <div key={si} className={`dash-accord-card${isOpen ? ' open' : ''}`}>
            <button
              ref={el => headerRefs.current[si] = el}
              className="dash-accord-hdr"
              onClick={() => toggle(si)}
            >
              <span className="dash-accord-icon">{sec.icon}</span>
              <div className="dash-accord-info">
                <div className="dash-accord-label">{sec.label}</div>
                <div className="dash-accord-dev">{sec.dev}</div>
              </div>
              <span className="dash-accord-count" style={{ color: sec.color, background: `${sec.color}22`, borderColor: `${sec.color}44` }}>{sec.items.length}</span>
              <span className="dash-accord-chevron">{isOpen ? '▾' : '›'}</span>
            </button>

            {isOpen && (
              <div className="dash-accord-body" style={{ '--sec-color': sec.color }}>
                {sec.items.map(item => (
                  <Link key={item.to} to={item.to} className="dash-accord-item">
                    <span className="dash-accord-step">{sec.items.indexOf(item) + 1}</span>
                    <div className="dash-accord-item-text">
                      <span className="dash-accord-item-label">{item.label}</span>
                      <span className="dash-accord-item-sub">{item.sub}</span>
                    </div>
                    <span className="dash-accord-item-chevron">›</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Dashboard() {
  const { progress, getDueItems, getWeakConcepts } = useProgress()
  const vocabData = useVocabularyData()
  const sentData  = useSentenceData()
  const allItems  = React.useMemo(() => [
    ...(vocabData?.alphabet_cards || []),
    ...(vocabData?.vocabulary     || []),
    ...(sentData?.vnp_sentences   || []),
  ], [vocabData, sentData])
  const dueItems     = useMemo(() => getDueItems(allItems), [getDueItems, allItems])
  const weakConcepts = useMemo(() => getWeakConcepts(), [getWeakConcepts])

  const avgAccuracy = useMemo(() => {
    const items = Object.values(progress.srs).filter(d => d.totalAttempts > 0)
    if (!items.length) return 0
    return Math.round(items.reduce((s, d) => s + d.correctAttempts / d.totalAttempts, 0) / items.length * 100)
  }, [progress.srs])

  const level      = useMemo(() => getLevel(progress.xp || 0), [progress.xp])
  const [whyOpen, setWhyOpen] = useState(false)
  const [dailyOpen, setDailyOpen] = useState(null) // 'shloka' | 'word' | null

  return (
    <div className="dash-page anim-fade-up">

      {/* ── Hero strip ─────────────────────────────────────────────────── */}
      <div className="dash-hero">
        <div className="dash-hero-text">
          <div className="dash-hero-greeting-row">
            <span className="greeting-deva">नमस्ते</span>
            <button className="why-btn" onClick={() => setWhyOpen(true)}>✦ Why Sanskritly?</button>
          </div>
          <div className="greeting-sub">Your Sanskrit journey continues</div>
        </div>
        <div className="dash-hero-level" style={{ '--level-color': level.color }}>
          <div className="dash-level-deva">{level.titleDeva}</div>
          <div className="dash-level-text">
            <div className="dash-level-title">{level.title}</div>
            <div className="dash-level-sub">{level.sub}</div>
          </div>
        </div>
      </div>

      {/* ── Why Sanskritly modal ────────────────────────────────────────── */}
      {whyOpen && (
        <div className="why-overlay" onClick={() => setWhyOpen(false)}>
          <div className="why-modal" onClick={e => e.stopPropagation()}>
            <div className="why-modal-header">
              <div>
                <p className="why-modal-eyebrow">संस्कृतम् · The Only App of Its Kind</p>
                <h2 className="why-modal-title">Why Sanskritly?</h2>
              </div>
              <button className="why-modal-close" onClick={() => setWhyOpen(false)}>✕</button>
            </div>

            <div className="why-features">

              <div className="why-feature">
                <span className="why-feat-icon">📖</span>
                <div>
                  <p className="why-feat-title">Sacred Texts — Word by Word</p>
                  <p className="why-feat-desc">Bhagavad Gītā (701 verses), 8 Upaniṣads, Brahmasūtras &amp; Yoga Sūtras — every verse with Devanagari, transliteration, and English. Not just translations — <em>understanding</em>.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">🔠</span>
                <div>
                  <p className="why-feat-title">Grammar from Absolute Zero</p>
                  <p className="why-feat-desc">A structured path from Pronouns → Conjugation → Nouns → Vibhakti → Tenses. Learn Sanskrit grammar the way Sanskrit scholars do — with context and progression, not rote lists.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">⚡</span>
                <div>
                  <p className="why-feat-title">1,200+ Words · 1,260+ Sentences</p>
                  <p className="why-feat-desc">A living vocabulary bank with spaced-repetition flashcards, sentence drills, fill-in-the-blank, and match-pairs — all in Sanskrit. Practice the way your brain actually learns.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">🎬</span>
                <div>
                  <p className="why-feat-title">Learn by Listening &amp; Watching</p>
                  <p className="why-feat-desc">Varṇamālā Series (25 episodes on Sanskrit sounds &amp; script by Tattvam), Sanskrit in 33 Days video course, and live Sanskrit news on Ākāśavāṇi radio — all in one place.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">🗣️</span>
                <div>
                  <p className="why-feat-title">Authentic Pronunciation from Day One</p>
                  <p className="why-feat-desc">Audio for sacred texts, Varṇamālā phonetics covering every varṇa including the rare ṛ, ḷ, anusvāra, visarga and their 8 modifications — the sounds no other app teaches.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">📻</span>
                <div>
                  <p className="why-feat-title">Live Sanskrit — Every Day</p>
                  <p className="why-feat-desc">Today's Ākāśavāṇi Sanskrit news bulletin, archived by day. Sanskrit is a living language — hear it spoken fluently in real broadcasts, not just recorded lessons.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-feat-icon">🌟</span>
                <div>
                  <p className="why-feat-title">No App in the World Does This</p>
                  <p className="why-feat-desc">Every other Sanskrit app is either a dictionary, a transliteration tool, or a children's alphabet app. Sanskritly is the first to combine grammar learning, sacred text study, pronunciation mastery, and daily listening in a single mobile experience.</p>
                </div>
              </div>

            </div>

            <div className="why-modal-footer">
              <p className="why-footer-text">🙏 Built with love for Sanskrit · For learners, scholars &amp; seekers</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Shloka & Word of the Day ──────────────────────────────────── */}
      <div className="daily-cards-row">
        <ShlokaOfDay open={dailyOpen === 'shloka'} onToggle={() => setDailyOpen(d => d === 'shloka' ? null : 'shloka')} />
        <WordOfDay   open={dailyOpen === 'word'}   onToggle={() => setDailyOpen(d => d === 'word'   ? null : 'word')} />
      </div>

      {/* ── Full Gita Chant ───────────────────────────────────────────── */}
      <div className="dash-section">
        <GitaChantPlayer />
      </div>

      {/* ── Section accordions ─────────────────────────────────────────── */}
      <DashSections dueCount={dueItems.length} />

    </div>
  )
}
