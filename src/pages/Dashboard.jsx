import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { VOCABULARY, ALPHABET_CARDS } from '../data/vocabulary.js'
import { VNP_SENTENCES } from '../data/sentences.js'
import { MODULES } from '../data/modules.js'
import { useSpeech } from '../hooks/useSpeech'
import './Dashboard.css'

const ALL_ITEMS = [...ALPHABET_CARDS, ...VOCABULARY, ...VNP_SENTENCES]

// ── Dictionary search index (built once) ─────────────────────────────────────
const DICT_INDEX = VOCABULARY.map(v => ({
  ...v,
  _search: [v.devanagari, v.iast, v.english, v.pos || '', v.gender || ''].join(' ').toLowerCase(),
}))

function searchDict(q) {
  if (!q || !q.trim()) return []
  const terms = q.trim().toLowerCase().split(/\s+/)
  return DICT_INDEX.filter(v => terms.every(t => v._search.includes(t))).slice(0, 40)
}

// ── POS badge colour map ──────────────────────────────────────────────────────
const POS_COLOUR = {
  noun: 'var(--gold)',
  verb: 'var(--teal, #3a9e8a)',
  adj:  '#a78bfa',
  adv:  '#f59e0b',
  pronoun: '#60a5fa',
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
function DictionarySearch() {
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
    setResults(searchDict(q))
  }, [])

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
    inputRef.current?.focus()
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
                <div
                  key={word.id}
                  className="dict-result-row"
                >
                  <span className="dict-result-deva">{word.devanagari}</span>
                  <span className="dict-result-iast">{word.iast}</span>
                  <span className="dict-result-english">{word.english}</span>
                  {word.pos && (
                    <span className="dict-result-pos" style={{ color: POS_COLOUR[word.pos] || 'var(--text-muted)' }}>
                      {word.pos}
                    </span>
                  )}
                  <button
                    className={`dict-result-listen ${isThisPlaying ? 'dict-result-listen--playing' : ''}`}
                    onClick={(e) => handleListen(e, word)}
                    title={isThisPlaying ? 'Stop' : 'Pronounce'}
                    aria-label={isThisPlaying ? 'Stop pronunciation' : `Pronounce ${word.devanagari}`}
                  >
                    {isThisPlaying
                      ? <span className="dict-listen-bars">
                          <span/><span/><span/>
                        </span>
                      : <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                          <polygon points="2,1 11,6 2,11"/>
                        </svg>
                    }
                  </button>
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


export default function Dashboard() {
  const { progress, getDueItems, getWeakConcepts } = useProgress()
  const dueItems     = useMemo(() => getDueItems(ALL_ITEMS), [getDueItems])
  const weakConcepts = useMemo(() => getWeakConcepts(), [getWeakConcepts])

  const avgAccuracy = useMemo(() => {
    const items = Object.values(progress.srs).filter(d => d.totalAttempts > 0)
    if (!items.length) return 0
    return Math.round(items.reduce((s, d) => s + d.correctAttempts / d.totalAttempts, 0) / items.length * 100)
  }, [progress.srs])

  return (
    <div className="dash-page anim-fade-up">

      {/* ── Hero strip ─────────────────────────────────────────────────── */}
      <div className="dash-hero">
        <div className="dash-hero-text">
          <span className="greeting-deva">नमस्ते</span>
          <div className="greeting-sub">Your Sanskrit journey continues</div>
        </div>
        <div className="dash-hero-xp">
          <div className="dash-xp-val">{progress.xp}</div>
          <div className="dash-xp-label">Total XP</div>
        </div>
      </div>


      {/* ── Dictionary search ──────────────────────────────────────────── */}
      <div className="dash-section-label" style={{ marginTop: '0.25rem' }}>
        <span style={{ marginRight: '0.4rem' }}>📖</span> Dictionary
      </div>
      <DictionarySearch />

      {/* ── 3-stat strip ───────────────────────────────────────────────── */}
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat-val">{progress.streakDays ?? 0}</div>
          <div className="dash-stat-label">🔥 Streak</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val">{dueItems.length}</div>
          <div className="dash-stat-label">📋 Due</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val">{avgAccuracy}%</div>
          <div className="dash-stat-label">🎯 Accuracy</div>
        </div>
      </div>

      {/* ── Study now ──────────────────────────────────────────────────── */}
      <div className="dash-section-label">Study Now</div>
      <div className="quick-actions">
        <Link to="/flashcards" className="action-btn action-primary">
          <span className="action-icon">◈</span>
          <div className="action-text">
            <div className="action-label">Flashcards</div>
            <div className="action-sub">{dueItems.length} due today</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
        <Link to="/story" className="action-btn">
          <span className="action-icon">◑</span>
          <div className="action-text">
            <div className="action-label">Stories</div>
            <div className="action-sub">Read with word-by-word translation</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
        <Link to="/drill" className="action-btn">
          <span className="action-icon">⚡</span>
          <div className="action-text">
            <div className="action-label">Sentence Drill</div>
            <div className="action-sub">Verb · noun · pronoun patterns</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
        <Link to="/fill" className="action-btn">
          <span className="action-icon">✏️</span>
          <div className="action-text">
            <div className="action-label">Fill in Blanks</div>
            <div className="action-sub">Grammar practice</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
        <Link to="/gita" className="action-btn">
          <span className="action-icon">🪷</span>
          <div className="action-text">
            <div className="action-label">Bhagavad Gītā</div>
            <div className="action-sub">All 701 verses · browse or drill</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
        <Link to="/upanishads" className="action-btn">
          <span className="action-icon">🕉️</span>
          <div className="action-text">
            <div className="action-label">Upaniṣads</div>
            <div className="action-sub">Īśā · Kaṭha · Muṇḍaka — 201 verses</div>
          </div>
          <span className="action-chevron">›</span>
        </Link>
      </div>

      {/* ── Curriculum modules ─────────────────────────────────────────── */}
      <div className="dash-section-label">Curriculum</div>
      <div className="modules-grid">
        {MODULES.map(m => {
          const hasRoute = m.route && m.route.startsWith('/module/')
          const inner = (
            <>
              <div className="module-card-top">
                <span className="module-icon">{m.icon || '📖'}</span>
                <span className={`pill pill-${m.level}`}>{m.level}</span>
              </div>
              <div className="module-name">{m.label}</div>
              {m.description && <div className="module-desc">{m.description}</div>}
              <div className="module-items">{m.items} items</div>
              {hasRoute && <div className="module-arrow">›</div>}
            </>
          )
          return hasRoute
            ? <Link key={m.id} to={m.route} className="module-card clickable">{inner}</Link>
            : <div key={m.id} className="module-card">{inner}</div>
        })}
      </div>

      {/* ── Weak areas ─────────────────────────────────────────────────── */}
      {weakConcepts.length > 0 && (
        <>
          <div className="dash-section-label">Needs Work</div>
          <div className="weak-list">
            {weakConcepts.slice(0,5).map(c => (
              <div key={c.id} className="weak-item">
                <div className="weak-label">{c.id}</div>
                <div className="weak-bar">
                  <div className="progress-bar-track" style={{flex:1}}>
                    <div className="progress-bar-fill" style={{
                      width:`${c.accuracy}%`,
                      background: c.accuracy < 50 ? 'var(--terracotta)' : 'var(--gold-dim)'
                    }} />
                  </div>
                  <span className="weak-pct">{c.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
