import React, { useState, useCallback, useEffect } from 'react'
import { usePurchase } from '../context/PurchaseContext'
import { STORIES } from '../data/stories.js'
import { useVocabularyData } from '../hooks/useData'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import SpeakIcon from '../components/SpeakIcon'
import './StorySession.css'

// Persists the selected story across tab navigations (module scope survives unmount)
let _persistedStoryId = null

// Populated once async vocab data loads (see StorySession component)
let vocabById = {}
let vocabulary = []
let vocabMap   = {}

// Each story gets a flat string of every searchable token for fast matching

function buildSearchIndex(story) {
  const parts = [
    story.title,
    story.titleEnglish,
    story.description || '',
    story.moral || '',
  ]
  for (const s of story.sentences) {
    for (const w of s.words) {
      parts.push(w.devanagari, w.iast, w.english, w.grammar || '')
    }
    for (const vid of (s.vocabIds || [])) {
      const v = vocabById[vid]
      if (v) parts.push(v.devanagari, v.iast, v.english)
    }
    parts.push(s.translation || '')
  }
  return parts.join(' ').toLowerCase()
}

const STORY_INDEX = Object.fromEntries(
  STORIES.map(s => [s.id, buildSearchIndex(s)])
)

function storyMatchesQuery(story, q) {
  if (!q) return true
  const lower = q.toLowerCase().trim()
  if (!lower) return true
  // support space-separated multi-term AND matching
  return lower.split(/\s+/).every(term => STORY_INDEX[story.id]?.includes(term))
}

// Which sentences contain the query (for match summary)
function getMatchingSentences(story, q) {
  if (!q) return []
  const lower = q.toLowerCase().trim()
  if (!lower) return []
  const terms = lower.split(/\s+/)
  return story.sentences.filter(s => {
    const haystack = [
      s.words.map(w => `${w.devanagari} ${w.iast} ${w.english}`).join(' '),
      (s.vocabIds || []).map(vid => {
        const v = vocabById[vid]
        return v ? `${v.devanagari} ${v.iast} ${v.english}` : ''
      }).join(' '),
      s.translation,
    ].join(' ').toLowerCase()
    return terms.every(t => haystack.includes(t))
  })
}

// ── Interlinear word token ──────────────────────────────────────────────────
function WordToken({ word, onSpeak }) {
  const [open, setOpen] = useState(false)
  const emoji = vocabMap[word.devanagari]?.emoji
  return (
    <span
      className={`word-token ${open ? 'active' : ''}`}
      onClick={() => { setOpen(v => !v); onSpeak?.(word.devanagari) }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <span className="word-tooltip">
          {emoji && <div className="tooltip-emoji">{emoji}</div>}
          <div className="tooltip-iast">{word.iast}</div>
          <div className="tooltip-english">{word.english}</div>
          <div className="tooltip-grammar">{word.grammar}</div>
        </span>
      )}
      <span className="word-devanagari">{word.devanagari}</span>
      <span className="word-iast">{word.iast}</span>
      <span className="word-gloss">{word.english.split('(')[0].trim()}</span>
    </span>
  )
}

// ── Sentence block (story mode) ─────────────────────────────────────────────
function SentenceBlock({ sentence, index, active, onSpeak, onSpeakWord }) {
  return (
    <div
      className={`story-sentence-block anim-fade-up ${active ? 'sentence-active' : ''}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="sentence-number-row">
        <span className="sentence-number">Sentence {index + 1}</span>
        <button className="sentence-speak-btn" title="Read this sentence" onClick={onSpeak}><SpeakIcon /></button>
      </div>
      <div className="interlinear-row">
        {sentence.words.map((w, i) => <WordToken key={i} word={w} onSpeak={onSpeakWord} />)}
      </div>
      <div className="sentence-translation">
        <span className="translation-label">tr.</span>
        <span className="translation-text">{sentence.translation}</span>
      </div>
    </div>
  )
}

// ── Dialogue bubble (dialogue mode) ────────────────────────────────────────
function DialogueBubble({ sentence, roles, index, active, onSpeak, onSpeakWord }) {
  const role = roles.find(r => r.id === sentence.speaker)
  const side = sentence.speaker === 'A' ? 'left' : 'right'
  return (
    <div
      className={`dialogue-bubble dialogue-${side} anim-fade-up ${active ? 'sentence-active' : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className={`dialogue-avatar dialogue-avatar-${sentence.speaker}`}>
        <span className="avatar-deva">{role?.label?.split(' ')[0]}</span>
        <span className="avatar-en">{role?.labelEn}</span>
        <button className="avatar-speak-btn" title="Read line" onClick={onSpeak}><SpeakIcon /></button>
      </div>
      <div className="dialogue-content">
        <div className="interlinear-row">
          {sentence.words.map((w, i) => <WordToken key={i} word={w} onSpeak={onSpeakWord} />)}
        </div>
        <div className="sentence-translation">
          <span className="translation-label">tr.</span>
          <span className="translation-text">{sentence.translation}</span>
        </div>
      </div>
    </div>
  )
}

// ── Vocab quiz ──────────────────────────────────────────────────────────────
function buildQuizItems(story) {
  const vocabIdSet = new Set(story.sentences.flatMap(s => s.vocabIds))

  let items
  if (vocabIdSet.size > 0) {
    // linked vocab entries
    items = vocabulary.filter(v => vocabIdSet.has(v.id))
  } else {
    // derive from story words — deduplicate by devanagari, skip punctuation
    const seen = new Set()
    items = []
    for (const s of story.sentences) {
      for (const w of s.words) {
        const key = w.devanagari.replace(/[।॥""'"]/g, '').trim()
        if (!key || seen.has(key) || !w.english) continue
        seen.add(key)
        items.push({ id: key, devanagari: key, iast: w.iast, english: w.english, grammar: w.grammar })
      }
    }
    // shuffle and cap at 30 to keep the quiz manageable
    items = items.sort(() => Math.random() - 0.5).slice(0, 30)
  }

  const pool = vocabIdSet.size > 0
    ? vocabulary.filter(v => !vocabIdSet.has(v.id))
    : items  // use the story's own words as wrong-answer pool too

  return items.map(v => {
    const wrongs = pool.filter(x => x.id !== v.id).sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.english)
    const options = [...wrongs, v.english].sort(() => Math.random() - 0.5)
    return { vocab: v, options }
  })
}

function VocabPractice({ story, onClose }) {
  const [items]    = useState(() => buildQuizItems(story))
  const [idx, setIdx] = useState(0)
  // answers[i] = chosen option string, or null if unanswered
  const [answers, setAnswers] = useState(() => Array(buildQuizItems(story).length).fill(null))
  const [done, setDone] = useState(false)
  const { play } = useSoundEffects()
  const { speak } = useSpeech()

  const item     = items[idx]
  const selected = answers[idx]
  const isLast   = idx === items.length - 1
  const isFirst  = idx === 0
  const score    = answers.filter((a, i) => a === items[i]?.vocab.english).length
  const answered = answers.filter(Boolean).length

  const choose = useCallback((opt) => {
    if (answers[idx]) return          // already answered this card
    setAnswers(prev => {
      const next = [...prev]
      next[idx] = opt
      return next
    })
    if (opt === item.vocab.english) play('correct')
    else play('wrong')
    // Speak the Sanskrit word after a short pause so the sound effect plays first
    setTimeout(() => speak(item.vocab.devanagari), 320)
  }, [answers, idx, item, play, speak])

  const goNext = () => {
    if (isLast) { setDone(true); return }
    setIdx(i => i + 1)
  }

  const goPrev = () => {
    if (!isFirst) setIdx(i => i - 1)
  }

  const retry = () => {
    setAnswers(Array(items.length).fill(null))
    setIdx(0)
    setDone(false)
  }

  if (!items.length) return (
    <div className="vocab-done anim-fade-up">
      <div className="vocab-done-label">No vocabulary items linked to this story yet.</div>
      <button className="btn-ghost" onClick={onClose}>Back</button>
    </div>
  )

  if (done) return (
    <div className="vocab-done anim-fade-up">
      <div className="vocab-done-score">{score}/{items.length}</div>
      <div className="vocab-done-label">words correct from this story</div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={retry}>Retry</button>
        <button className="btn-ghost"   onClick={onClose}>Back to story</button>
      </div>
    </div>
  )

  const isCorrect = selected === item.vocab.english
  return (
    <div className="vocab-practice anim-fade-up">
      <div className="vocab-practice-header">
        <span className="vocab-practice-title">Vocabulary Practice</span>
        <span className="vocab-practice-progress">{idx + 1} / {items.length}</span>
      </div>
      <div className="progress-bar-track" style={{ marginBottom: '1.25rem', margin: '0 1.1rem 1.25rem' }}>
        <div className="progress-bar-fill" style={{ width: `${(answered / items.length) * 100}%` }} />
      </div>

      <div className="vocab-quiz-card">
        <div className="vocab-quiz-prompt">{item.vocab.devanagari}</div>
        <div className="vocab-quiz-iast">{item.vocab.iast}</div>
        <div className="vocab-quiz-options">
          {item.options.map(opt => {
            let cls = ''
            if (selected) cls = opt === item.vocab.english ? 'correct' : opt === selected ? 'wrong' : ''
            return (
              <button
                key={opt}
                className={`vocab-quiz-option ${cls}`}
                onClick={() => choose(opt)}
                disabled={!!selected}
              >
                {opt}
              </button>
            )
          })}
        </div>
        <div className="vocab-quiz-feedback">
          {selected && (isCorrect
            ? <span className="feedback-correct">✓ Correct!</span>
            : <span className="feedback-wrong">✗ {item.vocab.english}</span>
          )}
        </div>

        {/* Back / Next navigation */}
        <div className="vocab-quiz-nav">
          <button
            className="vocab-nav-btn vocab-nav-prev"
            onClick={goPrev}
            disabled={isFirst}
            aria-label="Previous word"
          >
            ‹ Back
          </button>
          <button
            className={`vocab-nav-btn vocab-nav-next ${selected ? 'vocab-nav-ready' : ''}`}
            onClick={goNext}
            disabled={!selected}
            aria-label={isLast ? 'See results' : 'Next word'}
          >
            {isLast ? 'Results' : 'Next'} ›
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Build sentence text for TTS (join word devanagari) ──────────────────────
function sentenceText(sentence) {
  return sentence.words.map(w => w.devanagari.replace(/["""'"]/g, '')).join(' ')
}

// ── Story Summary Card ───────────────────────────────────────────────────────
function StorySummaryCard({ story, onPlayAll, isPlaying, paused, onPause, onResume, onStop }) {
  const [expanded, setExpanded] = useState(false)

  const sentences = story.sentences.map((s, i) => ({
    deva: s.words.map(w => w.devanagari.replace(/["""'"]/g, '')).join(' '),
    iast: s.words.map(w => w.iast.replace(/["""'"]/g, '')).join(' '),
    translation: s.translation,
    isLast: i === story.sentences.length - 1,
  }))

  return (
    <div className="story-summary-card anim-fade-up">
      <div className="story-summary-header">
        <div className="story-summary-title-row">
          <span className="story-summary-icon">📖</span>
          <div>
            <div className="story-summary-title">{story.title}</div>
            <div className="story-summary-title-en">{story.titleEnglish}</div>
          </div>
        </div>
        {/* Listen controls */}
        <div className="story-summary-listen">
          {!isPlaying && !paused && (
            <button className="summary-listen-btn" onClick={onPlayAll}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>
              Listen
            </button>
          )}
          {isPlaying && !paused && (
            <>
              <button className="summary-listen-btn summary-listen-pause" onClick={onPause}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10"/><rect x="7" y="1" width="3" height="10"/></svg>
                Pause
              </button>
              <button className="summary-listen-btn summary-listen-stop" onClick={onStop}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>
              </button>
            </>
          )}
          {paused && (
            <>
              <button className="summary-listen-btn" onClick={onResume}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>
                Resume
              </button>
              <button className="summary-listen-btn summary-listen-stop" onClick={onStop}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Accordion toggle for Full Story */}
      <div
        className="story-summary-accordion-toggle"
        onClick={() => setExpanded(e => !e)}
      >
        <span className="story-summary-section-label" style={{margin: 0}}>Full Story</span>
        <span className="summary-accordion-chevron">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="story-summary-accordion">
          {sentences.map((s, i) => (
            <div key={i} className="summary-sentence-row">
              <span className="summary-accordion-num">{i + 1}</span>
              <div className="summary-accordion-deva">
                <div className="story-summary-deva-text">
                  {s.deva}{s.isLast ? ' ॥' : ' ।'}
                </div>
                <div className="story-summary-iast-text">{s.iast}</div>
                <div className="summary-sentence-translation">{s.translation}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Moral */}
      {story.moral && (
        <div className="story-summary-moral">
          <div className="story-summary-moral-label">
            <span className="story-summary-moral-icon">🪔</span> Moral of the Story
          </div>
          <div className="story-summary-moral-text">{story.moral}</div>
        </div>
      )}
    </div>
  )
}

// ── Story reader ─────────────────────────────────────────────────────────────
function StoryReader({ story, onBack }) {
  const [showPractice, setShowPractice]     = useState(false)
  const [readingIdx, setReadingIdx]         = useState(-1)  // -1 = not playing
  const [paused, setPaused]                 = useState(false)
  const { speak, speakSequence, stop, pause, resume, isPlaying, useGoogle, toggleEngine } = useSpeech()

  // Stop audio when user navigates away (component unmounts)
  useEffect(() => {
    return () => { stop() }
  }, [stop]) // eslint-disable-line react-hooks/exhaustive-deps

  const isDialogue  = story.type === 'dialogue'
  const totalWords  = story.sentences.flatMap(s => s.words).length
  const sentenceTexts = story.sentences.map(sentenceText)

  const handlePlayAll = () => {
    setPaused(false)
    speakSequence(sentenceTexts, {
      onProgress: (idx) => setReadingIdx(idx),
      onDone: () => { setReadingIdx(-1); setPaused(false) },
    })
  }

  const handlePause = () => {
    pause()
    setPaused(true)
  }

  const handleResume = () => {
    resume()
    setPaused(false)
  }

  const handleStop = () => {
    stop()
    setReadingIdx(-1)
    setPaused(false)
  }

  const handleSpeakOne = (idx) => {
    handleStop()
    speak(sentenceTexts[idx])
    setReadingIdx(idx)
    // clear highlight after ~3 s
    setTimeout(() => setReadingIdx(-1), 3000)
  }

  const handleBack = () => { handleStop(); onBack() }

  return (
    <div className="story-reader">
      <div className="story-reader-header">
        <button className="story-back-btn" onClick={handleBack}>← Stories</button>
        <span className={`pill pill-${story.level}`}>{story.level}</span>
      </div>
      <div className="story-title-card">
        <div className="story-title-deva">{story.title}</div>
        <div className="story-title-en">{story.titleEnglish}</div>
        <div className="story-desc">{story.description}</div>
      </div>

      {/* ── Audio controls bar ── */}
      <div className="story-audio-bar">
        {/* Play / Pause / Resume / Stop */}
        {!isPlaying && !paused && (
          <button className="audio-btn audio-play" onClick={handlePlayAll} title="Read story aloud">
            <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>
            Read Aloud
          </button>
        )}
        {isPlaying && !paused && (
          <>
            <button className="audio-btn audio-pause" onClick={handlePause} title="Pause">
              <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="3" height="10"/><rect x="7" y="1" width="3" height="10"/></svg>
              Pause
            </button>
            <button className="audio-btn audio-stop" onClick={handleStop} title="Stop">
              <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>
              Stop
            </button>
          </>
        )}
        {paused && (
          <>
            <button className="audio-btn audio-play" onClick={handleResume} title="Resume">
              <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>
              Resume
            </button>
            <button className="audio-btn audio-stop" onClick={handleStop} title="Stop">
              <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="8" height="8" rx="1"/></svg>
              Stop
            </button>
          </>
        )}

        {/* Progress badge */}
        {readingIdx >= 0 && (
          <span className="audio-progress">{readingIdx + 1}/{story.sentences.length}</span>
        )}

        {/* Engine toggle — pushed to the right */}
        <button
          className={`audio-btn audio-engine ${useGoogle ? 'engine-google' : 'engine-system'}`}
          onClick={toggleEngine}
          title={useGoogle ? 'Google Neural TTS — tap to switch' : 'System voice — tap to switch'}
        >
          {useGoogle
            ? <><svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="8"/><path d="M10 2 Q13 10 10 18"/><path d="M10 2 Q7 10 10 18"/><path d="M2 10 h16"/></svg> Neural</>
            : <><svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path d="M3 7.5h3l4-3v11l-4-3H3v-5z"/><path d="M13 7.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg> System</>
          }
        </button>
      </div>


      {isDialogue && story.roles && (
        <div className="dialogue-roles-legend">
          {story.roles.map(r => (
            <div key={r.id} className={`role-chip role-chip-${r.id}`}>
              <span className="role-chip-deva">{r.label}</span>
              <span className="role-chip-en">{r.labelEn}</span>
            </div>
          ))}
        </div>
      )}

      <div className={isDialogue ? 'dialogue-sentences' : 'story-sentences'}>
        {story.sentences.map((s, i) =>
          isDialogue
            ? <DialogueBubble
                key={s.id} sentence={s} roles={story.roles} index={i}
                active={readingIdx === i}
                onSpeak={() => handleSpeakOne(i)}
                onSpeakWord={(w) => speak(w)}
              />
            : <SentenceBlock
                key={s.id} sentence={s} index={i}
                active={readingIdx === i}
                onSpeak={() => handleSpeakOne(i)}
                onSpeakWord={(w) => speak(w)}
              />
        )}
      </div>

      {/* Story Summary Card — shown for moral & panchatantra stories */}
      {!isDialogue && (story.category === 'moral' || story.category === 'panchatantra' || story.category === 'amarahasa') && !showPractice && (
        <StorySummaryCard
          story={story}
          onPlayAll={handlePlayAll}
          isPlaying={isPlaying}
          paused={paused}
          onPause={handlePause}
          onResume={handleResume}
          onStop={handleStop}
        />
      )}

      {!showPractice && (
        <div className="story-complete-banner">
          <div className="story-complete-title">{isDialogue ? 'Conversation complete' : 'Story complete'}</div>
          <div className="story-complete-sub">
            {story.sentences.length} {isDialogue ? 'exchanges' : 'sentences'} · {totalWords} words
          </div>
          <div className="story-complete-actions">
            <button className="btn-primary" onClick={() => setShowPractice(true)}>Practice Vocabulary</button>
            <button className="btn-ghost"    onClick={handlePlayAll}><SpeakIcon /> Read Again</button>
            <button className="btn-ghost"    onClick={handleBack}>Choose Another</button>
          </div>
        </div>
      )}

      {showPractice && <VocabPractice story={story} onClose={() => setShowPractice(false)} />}
    </div>
  )
}

// ── Paginated section helper ─────────────────────────────────────────────────
const PAGE_SIZE = 3

function StorySection({ label, icon, subtitle, items, query, onSelect, totalCount, freeCount, onLocked }) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  useEffect(() => { setVisible(PAGE_SIZE) }, [query])

  const shown    = items.slice(0, visible)
  const hasMore  = visible < items.length
  const loadMore = () => setVisible(v => v + PAGE_SIZE)

  return (
    <>
      <div className={`story-section-label ${icon === '📜' ? 'story-section-moral' : icon === '🐘' ? 'story-section-panchatantra' : ''}`}
           style={{ marginTop: label === 'Stories' ? 0 : '2rem' }}>
        {icon && <span className="story-section-label-icon">{icon}</span>}
        {label}
        <span className="story-section-count">{totalCount ?? items.length}</span>
      </div>
      {subtitle && <div className="story-section-sub">{subtitle}</div>}
      <div className="story-list">
        {shown.map((s, i) => (
          <StoryCard
            key={s.id} story={s} query={query} onSelect={onSelect}
            locked={freeCount !== undefined && i >= freeCount}
            onLocked={onLocked}
          />
        ))}
      </div>
      {hasMore && (
        <button className="story-load-more" onClick={loadMore}>
          Show more ({items.length - visible} remaining)
        </button>
      )}
    </>
  )
}

// ── Story list ───────────────────────────────────────────────────────────────
function StoryList({ onSelect }) {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
  const [query, setQuery] = useState('')
  const q = query.trim()

  const applyFilter = useCallback((list) => list.filter(s => storyMatchesQuery(s, q)), [q])

  const stories      = applyFilter(STORIES.filter(s => s.type === 'story' && !s.category))
  const morals       = applyFilter(STORIES.filter(s => s.category === 'moral'))
  const panchatantra = applyFilter(STORIES.filter(s => s.category === 'panchatantra'))
  const amarahasa    = applyFilter(STORIES.filter(s => s.category === 'amarahasa'))
  const dialogues    = applyFilter(STORIES.filter(s => s.type === 'dialogue'))
  // Distribute the global free-story budget across sections in order so that
  // FREE_STORIES=1 means exactly 1 story total is free, not 1 per section.
  const budget = isPro ? Infinity : FREE_LIMITS.FREE_STORIES
  let rem = budget
  const allSections = [
    { key: 'stories',      items: stories,      label: 'Stories',        icon: null,  subtitle: null },
    { key: 'morals',       items: morals,        label: 'Moral Stories',  icon: '📜',  subtitle: 'Hitopadesha — values & character in Sanskrit' },
    { key: 'panchatantra', items: panchatantra,  label: 'Panchatantra',   icon: '🐘',  subtitle: 'Classic fables by Viṣṇuśarman — statecraft & wisdom' },
    { key: 'amarahasa',    items: amarahasa,     label: 'Amarahasa',      icon: '🪷',  subtitle: 'Graded readers — CC0 — from beginner to advanced' },
    { key: 'dialogues',    items: dialogues,     label: 'Conversations',  icon: null,  subtitle: null },
  ].map(sec => {
    const sectionFree = isPro ? undefined : Math.min(rem, sec.items.length)
    if (!isPro) rem = Math.max(0, rem - sec.items.length)
    return { ...sec, freeCount: sectionFree }
  })

  const totalResults = stories.length + morals.length + panchatantra.length + amarahasa.length + dialogues.length

  const totalCounts = {
    stories:      STORIES.filter(s => s.type === 'story' && !s.category).length,
    morals:       STORIES.filter(s => s.category === 'moral').length,
    panchatantra: STORIES.filter(s => s.category === 'panchatantra').length,
    amarahasa:    STORIES.filter(s => s.category === 'amarahasa').length,
    dialogues:    STORIES.filter(s => s.type === 'dialogue').length,
  }

  return (
    <div>
      {/* ── Search bar ── */}
      <div className="story-search-wrap">
        <span className="story-search-icon">⌕</span>
        <input
          className="story-search-input"
          type="search"
          placeholder="Search by word, meaning, IAST… e.g. siṃha, lion, क्रोध"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        {q && (
          <button className="story-search-clear" onClick={() => setQuery('')} aria-label="Clear">✕</button>
        )}
      </div>

      {/* ── Search results summary ── */}
      {q && (
        <div className="story-search-summary">
          {totalResults === 0
            ? <span className="story-search-none">No stories match <em>"{q}"</em></span>
            : <span><strong>{totalResults}</strong> {totalResults === 1 ? 'story' : 'stories'} match <em>"{q}"</em></span>
          }
        </div>
      )}

      {/* ── Sections — hidden when empty under search ── */}
      {allSections.map(sec => sec.items.length > 0 && (
        <StorySection
          key={sec.key}
          label={sec.label} icon={sec.icon} subtitle={sec.subtitle}
          items={sec.items} query={q} onSelect={onSelect}
          totalCount={totalCounts[sec.key]}
          freeCount={sec.freeCount} onLocked={showPaywall}
        />
      ))}
    </div>
  )
}

function StoryCard({ story, query, onSelect, locked, onLocked }) {
  const isDialogue = story.type === 'dialogue'
  const matches = query ? getMatchingSentences(story, query) : []

  return (
    <div className="story-card" onClick={() => locked ? onLocked() : onSelect(story)}
      style={locked ? { opacity: 0.55, position: 'relative' } : undefined}>
      <div className="story-card-deva">{story.title.split(' ')[0]}</div>
      <div className="story-card-info">
        <div className="story-card-title">{story.title} — {story.titleEnglish}</div>
        {isDialogue && story.roles && (
          <div className="story-card-roles">
            {story.roles.map(r => (
              <span key={r.id} className={`role-tag role-tag-${r.id}`}>{r.labelEn}</span>
            ))}
          </div>
        )}
        <div className="story-card-desc">{story.description}</div>

        {/* Match previews — shown when search is active */}
        {matches.length > 0 && (
          <div className="story-card-matches">
            <span className="story-card-match-label">
              {matches.length} sentence{matches.length > 1 ? 's' : ''} match
            </span>
            {matches.slice(0, 2).map(s => (
              <div key={s.id} className="story-card-match-row">
                <span className="story-card-match-deva">
                  {s.words.map(w => w.devanagari).join(' ')}
                </span>
                <span className="story-card-match-tr">{s.translation}</span>
              </div>
            ))}
            {matches.length > 2 && (
              <span className="story-card-match-more">+{matches.length - 2} more</span>
            )}
          </div>
        )}
      </div>
      {locked
        ? <span className="story-card-arrow" style={{fontSize:'1rem'}}>🔒</span>
        : <span className="story-card-arrow">›</span>
      }
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function StorySession() {
  const vocabData = useVocabularyData()

  // Populate module-level vocab references once async data arrives
  React.useEffect(() => {
    if (!vocabData) return
    vocabulary = vocabData.vocabulary || []
    vocabById  = Object.fromEntries(vocabulary.map(v => [v.id, v]))
    vocabMap   = Object.fromEntries(vocabulary.map(v => [v.devanagari, v]))
  }, [vocabData])

  // Restore previously selected story if user switched tabs and came back
  const [activeStory, setActiveStory] = useState(() =>
    _persistedStoryId ? (STORIES.find(s => s.id === _persistedStoryId) || null) : null
  )

  const handleSelect = useCallback((story) => {
    _persistedStoryId = story?.id || null
    setActiveStory(story)
    // Glide the scroll container to the top so the story title is the first thing seen
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBack = useCallback(() => {
    _persistedStoryId = null
    setActiveStory(null)
  }, [])

  return (
    <div className="story-page">
      <div className="page-header">
        <div className="page-title">Story Session</div>
        <div className="page-subtitle">
          {activeStory
            ? 'Click any word to see its meaning and grammar'
            : 'Read Sanskrit stories and conversations with word-by-word translations'}
        </div>
      </div>
      {activeStory
        ? <StoryReader story={activeStory} onBack={handleBack} />
        : <StoryList onSelect={handleSelect} />
      }
    </div>
  )
}
