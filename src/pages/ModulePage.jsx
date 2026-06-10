import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  GRAMMAR_LESSONS, SANDHI_RULES, BHAGAVAD_GITA, YOGA_SUTRAS, UPANISHAD_VERSES
} from '../data/sacred.js'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import './ModulePage.css'

// ── Word-by-word interlinear token ───────────────────────────────────────────
function WordToken({ word }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className={`mp-word-token ${open ? 'active' : ''}`}
      onClick={() => setOpen(v => !v)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <span className="mp-word-tooltip">
          <div className="mp-tooltip-iast">{word.iast}</div>
          <div className="mp-tooltip-english">{word.english}</div>
          {word.grammar && <div className="mp-tooltip-grammar">{word.grammar}</div>}
        </span>
      )}
      <span className="mp-word-deva">{word.devanagari}</span>
      <span className="mp-word-gloss">{word.english?.split('(')[0].trim()}</span>
    </span>
  )
}

// ── Scripture verse card (Gita / Upanishads / Yoga Sutras) ───────────────────
function VerseCard({ verse, index, isPlaying, onSpeak }) {
  const [expanded, setExpanded] = useState(false)

  const chapterLabel = verse.chapter !== undefined
    ? `Chapter ${verse.chapter}, Verse ${verse.verse}`
    : verse.pada !== undefined
    ? `Pāda ${verse.pada}, Sūtra ${verse.sutra}`
    : verse.source

  return (
    <div className={`mp-verse-card anim-fade-up ${isPlaying ? 'verse-playing' : ''}`}
         style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="mp-verse-header">
        <span className="mp-verse-ref">{chapterLabel}</span>
        {verse.source && !verse.chapter && !verse.pada && (
          <span className="mp-verse-source">{verse.source}</span>
        )}
        <span className={`pill pill-${verse.level}`}>{verse.level}</span>
        <button className="mp-speak-btn" onClick={() => onSpeak(verse)} title="Listen"><SpeakIcon /></button>
        <button
          className={`mp-expand-btn ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(v => !v)}
        >{expanded ? '▲' : '▼'}</button>
      </div>

      <div className="mp-verse-deva">{verse.devanagari}</div>
      <div className="mp-verse-iast">{verse.iast}</div>
      <div className="mp-verse-translation">{verse.translation}</div>

      {expanded && (
        <>
          {verse.commentary && (
            <div className="mp-verse-commentary">
              <span className="mp-commentary-label">Commentary:</span> {verse.commentary}
            </div>
          )}
          {verse.words?.length > 0 && (
            <div className="mp-word-breakdown">
              <div className="mp-breakdown-label">Word by word:</div>
              <div className="mp-interlinear-row">
                {verse.words.map((w, i) => <WordToken key={i} word={w} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Grammar section ──────────────────────────────────────────────────────────
function GrammarTable({ headers, rows }) {
  return (
    <div className="mp-table-wrap">
      <table className="mp-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GrammarLessonCard({ lesson, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  return (
    <div className="mp-gram-card anim-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="mp-gram-header" onClick={() => setExpanded(v => !v)}>
        <span className="mp-gram-title">{lesson.title}</span>
        <span className={`pill pill-${lesson.level}`}>{lesson.level}</span>
        <span className="mp-expand-indicator">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mp-gram-body">
          <p className="mp-gram-intro">{lesson.intro}</p>
          {lesson.table && <GrammarTable headers={lesson.table.headers} rows={lesson.table.rows} />}
          {lesson.examples?.length > 0 && (
            <div className="mp-gram-examples">
              <div className="mp-examples-label">Examples:</div>
              {lesson.examples.map((ex, i) => (
                <div key={i} className="mp-example-row">
                  <span className="mp-ex-deva">{ex.devanagari}</span>
                  <span className="mp-ex-iast">{ex.iast}</span>
                  <span className="mp-ex-en">{ex.english}</span>
                  {ex.note && <span className="mp-ex-note">{ex.note}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Sandhi rules section ──────────────────────────────────────────────────────
function SandhiCard({ rule, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  return (
    <div className="mp-sandhi-card anim-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="mp-sandhi-header" onClick={() => setExpanded(v => !v)}>
        <span className="mp-sandhi-category">{rule.category}</span>
        <span className="mp-sandhi-rule">{rule.rule}</span>
        <span className={`pill pill-${rule.level}`}>{rule.level}</span>
        <span className="mp-expand-indicator">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mp-sandhi-body">
          <p className="mp-sandhi-desc">{rule.description}</p>
          <div className="mp-sandhi-examples">
            {rule.examples.map((ex, i) => (
              <div key={i} className="mp-sandhi-ex-row">
                <span className="mp-sandhi-before">{ex.before}</span>
                <span className="mp-sandhi-arrow">→</span>
                <span className="mp-sandhi-after">{ex.after}</span>
                <span className="mp-sandhi-meaning">"{ex.meaning}"</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Module page layouts ───────────────────────────────────────────────────────
const MODULE_META = {
  'intermediate-grammar': {
    title: 'Sanskrit Grammar', icon: '📐', subtitle: 'Cases, Declensions, Conjugations & Pronouns',
    data: GRAMMAR_LESSONS, type: 'grammar',
  },
  'intermediate-sandhi': {
    title: 'Sandhi Rules', icon: '🔗', subtitle: 'Sound combination rules in Sanskrit',
    data: SANDHI_RULES, type: 'sandhi',
  },
  'advanced-texts': {
    title: 'Bhagavad Gītā', icon: '🕉️', subtitle: 'Key verses with word-by-word breakdown',
    data: BHAGAVAD_GITA, type: 'scripture',
  },
  'advanced-sutras': {
    title: 'Yoga Sūtras', icon: '🧘', subtitle: "Patañjali's Yoga Sutras — the science of consciousness",
    data: YOGA_SUTRAS, type: 'scripture',
  },
  'advanced-upanishads': {
    title: 'Upaniṣads', icon: '🌅', subtitle: 'Mahāvākyas and key verses from the Upanishads',
    data: UPANISHAD_VERSES, type: 'scripture',
  },
}

export default function ModulePage() {
  const { id } = useParams()
  const meta = MODULE_META[id]
  const { speak, isPlaying, useGoogle, toggleEngine } = useSpeech()
  const [playingId, setPlayingId] = useState(null)

  if (!meta) {
    return (
      <div className="mp-page">
        <div className="page-header">
          <div className="page-title">Module not found</div>
        </div>
        <Link to="/" className="btn-ghost">← Back to Dashboard</Link>
      </div>
    )
  }

  const handleSpeakVerse = async (verse) => {
    setPlayingId(verse.id)
    await speak(verse.devanagari)
    setPlayingId(null)
  }

  return (
    <div className="mp-page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" className="mp-back-btn">← Dashboard</Link>
        </div>
        <div className="page-title">
          <span className="mp-page-icon">{meta.icon}</span> {meta.title}
        </div>
        <div className="page-subtitle">{meta.subtitle}</div>
      </div>

      {/* Engine toggle for scripture pages */}
      {meta.type === 'scripture' && (
        <div className="mp-audio-bar">
          <span className="mp-audio-hint">Click <SpeakIcon /> on any verse to hear it in Sanskrit</span>
          <button
            className={`audio-btn audio-engine ${useGoogle ? 'engine-google' : 'engine-system'}`}
            onClick={toggleEngine}
          >
            {useGoogle ? '🌐 Google' : '💻 System'}
          </button>
        </div>
      )}

      <div className="mp-content">
        {meta.type === 'grammar' && meta.data.map((lesson, i) => (
          <GrammarLessonCard key={lesson.id} lesson={lesson} index={i} />
        ))}

        {meta.type === 'sandhi' && meta.data.map((rule, i) => (
          <SandhiCard key={rule.id} rule={rule} index={i} />
        ))}

        {meta.type === 'scripture' && meta.data.map((verse, i) => (
          <VerseCard
            key={verse.id} verse={verse} index={i}
            isPlaying={playingId === verse.id}
            onSpeak={handleSpeakVerse}
          />
        ))}
      </div>
    </div>
  )
}
