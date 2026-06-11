import React, { useMemo } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useVocabularyData, useSentenceData } from '../hooks/useData'
import { STORIES } from '../data/stories.js'
import { BHAGAVAD_GITA, UPANISHAD_VERSES, YOGA_SUTRAS, GRAMMAR_LESSONS, SANDHI_RULES } from '../data/sacred.js'
import './Progress.css'


const CURRICULUM_STATIC = [
  { icon: '🔤', label: 'Devanāgarī Script',  count: 31,   unit: 'characters',  level: 'beginner',     desc: 'Letters, vowels & consonants' },
  { icon: '📖', label: 'Core Vocabulary',     count: 1161, unit: 'words',       level: 'beginner',     desc: 'Essential Sanskrit words with meanings' },
  { icon: '📜', label: 'Sacred Verses',       count: BHAGAVAD_GITA.length + UPANISHAD_VERSES.length + YOGA_SUTRAS.length, unit: 'verses', level: 'advanced', desc: 'Bhagavad Gītā, Upaniṣads & Yoga Sūtras' },
  { icon: '⚡', label: 'Sentence Drill',      count: 150,      unit: 'sentences',   level: 'intermediate', desc: 'Verb · noun · pronoun patterns' },
  { icon: '📚', label: 'Stories',             count: STORIES.length,            unit: 'stories',     level: 'beginner',     desc: 'Word-by-word reading with translation' },
  { icon: '✏️', label: 'Fill in the Blanks', count: 50,        unit: 'exercises',   level: 'intermediate', desc: 'Grammar & vocabulary practice' },
  { icon: '🔡', label: 'Grammar Lessons',    count: GRAMMAR_LESSONS.length,    unit: 'lessons',     level: 'intermediate', desc: 'Cases, declensions & verb forms' },
  { icon: '🔗', label: 'Sandhi Rules',       count: SANDHI_RULES.length,       unit: 'rules',       level: 'advanced',     desc: 'Sound-combination rules' },
]

const VERSE_WORDS = [...BHAGAVAD_GITA, ...UPANISHAD_VERSES, ...YOGA_SUTRAS]
  .reduce((n, v) => n + (v.words?.length || 0), 0)

export default function Progress() {
  const vocabData = useVocabularyData()
  const sentData  = useSentenceData()
  const vocabulary      = vocabData?.vocabulary      || []
  const alphabetCards   = vocabData?.alphabet_cards  || []
  const grammarConcepts = vocabData?.grammar_concepts || {}
  const vnpSentences    = sentData?.vnp_sentences    || []
  const allItems = [...alphabetCards, ...vocabulary, ...vnpSentences]
  const TOTAL_WORDS = vocabulary.length + VERSE_WORDS
  const CURRICULUM = CURRICULUM_STATIC
  const { progress, getWeakConcepts, getDueItems, resetProgress } = useProgress()

  const weakConcepts = useMemo(() => getWeakConcepts(), [getWeakConcepts])
  const dueItems = useMemo(() => getDueItems(allItems), [getDueItems, allItems]) // eslint-disable-line react-hooks/exhaustive-deps

  const srsStats = useMemo(() => {
    const items = Object.values(progress.srs)
    const reviewed = items.filter(d => d.totalAttempts > 0)
    const mastered = items.filter(d => d.streak >= 3)
    const avgAcc = reviewed.length
      ? Math.round(reviewed.reduce((s, d) => s + d.correctAttempts / d.totalAttempts, 0) / reviewed.length * 100)
      : 0
    return { reviewed: reviewed.length, mastered: mastered.length, avgAcc }
  }, [progress.srs])

  const conceptRows = useMemo(() => {
    return Object.entries(progress.concepts)
      .filter(([, c]) => c.attempts > 0)
      .map(([id, c]) => ({
        id,
        label: grammarConcepts[id]?.label || id,
        level: grammarConcepts[id]?.level || '—',
        accuracy: Math.round(c.correct / c.attempts * 100),
        attempts: c.attempts,
        flagged: c.flagged,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
  }, [progress.concepts])

  const recentSessions = useMemo(() => [...progress.sessions].reverse().slice(0, 10), [progress.sessions])

  return (
    <div className="prog-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Progress</h1>
        <p className="page-subtitle">Your learning profile and weak areas</p>
      </div>

      {/* ── What You'll Learn ──────────────────────────────────────────── */}
      <div className="prog-learn-section">
        <div className="prog-learn-header">
          <div className="prog-learn-title">What you'll learn</div>
          <div className="prog-learn-total">{TOTAL_WORDS}+ Sanskrit words &amp; terms</div>
        </div>
        <div className="prog-learn-grid">
          {CURRICULUM.map(c => (
            <div key={c.label} className="prog-learn-card">
              <div className="prog-learn-card-top">
                <span className="prog-learn-icon">{c.icon}</span>
                <span className={`pill pill-${c.level}`}>{c.level}</span>
              </div>
              <div className="prog-learn-count">{c.count} <span className="prog-learn-unit">{c.unit}</span></div>
              <div className="prog-learn-name">{c.label}</div>
              <div className="prog-learn-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid-4" style={{marginBottom:'1.5rem'}}>
        <div className="stat-card">
          <div className="stat-value">{srsStats.reviewed}</div>
          <div className="stat-label">Items seen</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{srsStats.mastered}</div>
          <div className="stat-label">Mastered (streak ≥3)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dueItems.length}</div>
          <div className="stat-label">Due now</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{srsStats.avgAcc}%</div>
          <div className="stat-label">Avg accuracy</div>
        </div>
      </div>

      <div className="prog-grid">
        {/* Concept accuracy table */}
        <div className="card">
          <h2 className="section-title">Grammar concept accuracy</h2>
          {conceptRows.length === 0
            ? <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',fontStyle:'italic'}}>No concept data yet — start drilling!</p>
            : (
              <div className="concept-table-wrap">
                <div className="concept-table">
                  <div className="ct-header">
                    <span>Concept</span><span>Level</span><span>Accuracy</span><span>Attempts</span>
                  </div>
                  {conceptRows.map(r => (
                    <div key={r.id} className={`ct-row ${r.flagged ? 'ct-flagged' : ''}`}>
                      <span className="ct-label">{r.label}</span>
                      <span className={`pill pill-${r.level}`}>{r.level}</span>
                      <span className="ct-acc">
                        <div className="progress-bar-track" style={{width:'80px',display:'inline-block'}}>
                          <div className="progress-bar-fill" style={{width:`${r.accuracy}%`, background: r.accuracy < 50 ? 'var(--terracotta)' : r.accuracy < 70 ? 'var(--gold-dim)' : 'var(--teal)'}} />
                        </div>
                        <span style={{fontSize:'0.78rem',color:'var(--text-secondary)',minWidth:'32px'}}>{r.accuracy}%</span>
                      </span>
                      <span className="ct-attempts">{r.attempts}</span>
                      {r.flagged && <span className="ct-flag">⚑ weak</span>}
                    </div>
                  ))}
                </div>
              </div>
          )}
        </div>

        {/* Weak concepts spotlight */}
        <div className="card">
          <h2 className="section-title">Areas needing attention</h2>
          {weakConcepts.length === 0
            ? <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',fontStyle:'italic'}}>No weak areas — great work!</p>
            : weakConcepts.slice(0,6).map(c => (
              <div key={c.id} className="weak-spotlight">
                <div className="ws-label">{grammarConcepts[c.id]?.label || c.id}</div>
                <div className="ws-bar">
                  <div className="progress-bar-track" style={{flex:1}}>
                    <div className="progress-bar-fill" style={{width:`${c.accuracy}%`, background:'var(--terracotta)'}} />
                  </div>
                  <span className="ws-pct">{c.accuracy}%</span>
                </div>
                <p className="ws-tip">Go to Drill → select "{grammarConcepts[c.id]?.label}" to practice</p>
              </div>
          ))}
        </div>

        {/* Session history */}
        <div className="card" style={{gridColumn:'1/-1'}}>
          <h2 className="section-title">Recent sessions</h2>
          {recentSessions.length === 0
            ? <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',fontStyle:'italic'}}>No sessions yet.</p>
            : (
              <div className="session-list">
                {recentSessions.map((s, i) => (
                  <div key={i} className="session-row">
                    <span className="sr-date">{new Date(s.date).toLocaleDateString()}</span>
                    <span className="sr-score">{s.correct}/{s.total}</span>
                    <div className="progress-bar-track" style={{flex:1,maxWidth:'200px'}}>
                      <div className="progress-bar-fill" style={{width:`${s.total ? Math.round(s.correct/s.total*100) : 0}%`}} />
                    </div>
                    <span className="sr-pct">{s.total ? Math.round(s.correct/s.total*100) : 0}%</span>
                  </div>
                ))}
              </div>
          )}
        </div>
      </div>

      {/* Reset */}
      <div style={{marginTop:'2rem',paddingTop:'1rem',borderTop:'1px solid var(--border)'}}>
        <button className="btn-ghost" style={{color:'var(--terracotta-dim)',borderColor:'var(--terracotta-dim)'}}
          onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress() }}>
          Reset all progress
        </button>
      </div>
    </div>
  )
}
