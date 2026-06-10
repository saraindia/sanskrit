import React, { useState, useMemo, useCallback } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useSessionStorage } from '../hooks/useSessionStorage'
import WellDoneToast from '../components/WellDoneToast'
import { VNP_SENTENCES } from '../data/sentences.js'
import { GRAMMAR_CONCEPTS } from '../data/vocabulary.js'
import { freshOrder } from '../utils/freshOrder.js'
import ClickableSentence from '../components/ClickableSentence'
import SpeakIcon from '../components/SpeakIcon'
import './DrillSentences.css'

// Stable id→sentence lookup so we can restore the shuffled order
const SENT_BY_ID = Object.fromEntries(VNP_SENTENCES.map(s => [s.id, s]))

const PATTERNS = [
  { id: 'all',              label: 'All patterns' },
  { id: 'noun+verb',        label: 'Noun + verb' },
  { id: 'pronoun+verb',     label: 'Pronoun + verb' },
  { id: 'noun+obj+verb',    label: 'Noun + object + verb' },
  { id: 'pronoun+obj+verb', label: 'Pronoun + object + verb' },
  { id: 'pronoun+noun+verb',label: 'Pronoun + noun + verb' },
  { id: 'pronoun-dat+verb', label: 'Dative pronoun' },
  { id: 'noun-loc+verb',    label: 'Locative noun' },
  { id: 'causative',        label: 'Causative verbs' },
]

const MODES = [
  { id: 'translate', label: 'Translate to English' },
  { id: 'identify',  label: 'Identify the pattern' },
  { id: 'listen',    label: 'Read aloud (recitation)' },
]

export default function DrillSentences() {
  const { recordAnswer, getWeakConcepts, progress } = useProgress()

  // Persist session state across tab switches
  const [pattern,      setPattern]      = useSessionStorage('drill_pattern',     'all')
  const [mode,         setMode]         = useSessionStorage('drill_mode',        'translate')
  const [weakOnly,     setWeakOnly]     = useSessionStorage('drill_weakOnly',    false)
  const [currentIdx,   setCurrentIdx]   = useSessionStorage('drill_idx',         0)
  const [sessionStats, setSessionStats] = useSessionStorage('drill_stats',       { correct: 0, total: 0 })
  const [done,         setDone]         = useSessionStorage('drill_done',        false)
  // Save the shuffled order so the same sentence shows after a tab switch
  const [shuffledIds,  setShuffledIds]  = useSessionStorage('drill_shuffledIds', [])

  const [revealed, setRevealed] = useState(false)   // intentionally ephemeral
  const [round, setRound]       = useState(0)       // bumping forces a fresh question order

  const weakConcepts = useMemo(() => getWeakConcepts().map(c => c.id), [getWeakConcepts])

  const sentences = useMemo(() => {
    // Filter first
    let list = VNP_SENTENCES
    if (pattern !== 'all') list = list.filter(s => s.pattern === pattern)
    if (weakOnly) list = list.filter(s => s.concepts?.some(c => weakConcepts.includes(c)))

    // Try to restore previously-saved shuffle for this exact filter set
    if (shuffledIds.length > 0) {
      const restored = shuffledIds.map(id => SENT_BY_ID[id]).filter(Boolean)
      // Only reuse if the restored set matches the current filtered list size
      const filteredIds = new Set(list.map(s => s.id))
      const valid = restored.filter(s => filteredIds.has(s.id))
      if (valid.length === list.length) return valid
    }

    // Fresh order — unseen sentences first, then least-recently-seen; save it
    const fresh = freshOrder(list, progress.srs)
    setShuffledIds(fresh.map(s => s.id))
    return fresh
  }, [pattern, weakOnly, weakConcepts, round]) // eslint-disable-line react-hooks/exhaustive-deps

  const sentence = sentences[currentIdx]
  const { speak } = useSpeech()
  const { play } = useSoundEffects()
  const [showToast, setShowToast] = useState(false)

  const handleReveal = useCallback(() => {
    setRevealed(true)
    play('reveal')
    if (sentence?.devanagari) speak(sentence.devanagari)
  }, [sentence, speak, play])

  const handleNext = useCallback(() => {
    if (!sentence) return
    recordAnswer(sentence.id, 4, sentence.concepts || [])
    setSessionStats(s => ({ correct: s.correct + 1, total: s.total + 1 }))
    play('success')
    setShowToast(true)
    setRevealed(false)
    setTimeout(() => {
      if (currentIdx + 1 >= sentences.length) setDone(true)
      else setCurrentIdx(i => i + 1)
    }, 150)
  }, [sentence, currentIdx, sentences.length, recordAnswer, play])

  const restart = () => {
    setCurrentIdx(0)
    setRevealed(false)
    setDone(false)
    setSessionStats({ correct: 0, total: 0 })
    setShuffledIds([])   // drop the saved order
    setRound(r => r + 1) // recompute the deck with fresh questions
  }

  if (sentences.length === 0) return (
    <div className="drill anim-fade-up">
      <div className="page-header"><h1 className="page-title">Sentence Drill</h1></div>
      <div className="card" style={{textAlign:'center',padding:'3rem'}}>
        <p style={{color:'var(--text-secondary)'}}>No sentences match this filter. Try changing the pattern or turning off weak-only.</p>
      </div>
    </div>
  )

  if (done) return (
    <div className="drill anim-fade-up">
      <div className="page-header"><h1 className="page-title">Drill complete!</h1></div>
      <div className="card" style={{textAlign:'center',padding:'3rem',maxWidth:'400px',margin:'0 auto'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'2.5rem',color:'var(--gold)'}}>{sessionStats.correct}/{sessionStats.total}</div>
        <p style={{color:'var(--text-secondary)',margin:'0.5rem 0 1.5rem'}}>Sentences correct</p>
        <div style={{display:'flex',gap:'0.75rem',justifyContent:'center'}}>
          <button className="btn-primary" onClick={restart}>Drill again</button>
          <button className="btn-ghost" onClick={() => { setWeakOnly(true); restart() }}>Weak areas only</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="drill anim-fade-up">
      <WellDoneToast show={showToast} onHide={() => setShowToast(false)} />
      <div className="page-header">
        <h1 className="page-title">Sentence Drill</h1>
        <p className="page-subtitle">Verb · noun · pronoun combinations</p>
      </div>

      {/* Controls */}
      <div className="drill-controls">
        <div className="control-group">
          <label className="control-label">Pattern</label>
          <select className="drill-select" value={pattern} onChange={e => { setPattern(e.target.value); restart() }}>
            {PATTERNS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
        <div className="control-group">
          <label className="control-label">Mode</label>
          <select className="drill-select" value={mode} onChange={e => setMode(e.target.value)}>
            {MODES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </div>
        <label className="weak-toggle">
          <input type="checkbox" checked={weakOnly} onChange={e => { setWeakOnly(e.target.checked); restart() }} />
          <span>Weak areas only</span>
        </label>
      </div>

      {/* Progress */}
      <div className="drill-meta">
        <span>{currentIdx + 1} / {sentences.length}</span>
        <div className="progress-bar-track" style={{flex:1}}>
          <div className="progress-bar-fill" style={{width:`${(currentIdx/sentences.length)*100}%`}} />
        </div>
        <span>{sessionStats.correct} correct</span>
      </div>

      {/* Sentence card */}
      {sentence && (
        <div className="sentence-card card">
          {/* Tags */}
          <div className="sentence-tags">
            <span className={`pill pill-${sentence.level}`}>{sentence.level}</span>
            <span className="pill pill-sacred" style={{fontFamily:'var(--font-mono)',fontSize:'0.72rem'}}>{sentence.pattern}</span>
            {sentence.source && <span className="pill pill-sacred">{sentence.source}</span>}
          </div>

          {/* Main Sanskrit text — each word clickable */}
          <div className="sentence-deva devanagari" style={{display:'flex',alignItems:'center',gap:'0.75rem',flexWrap:'wrap'}}>
            <ClickableSentence text={sentence.devanagari} />
            <button className="speak-btn" title="Hear full sentence" onClick={() => speak(sentence.devanagari)}><SpeakIcon /></button>
          </div>
          <div className="sentence-iast">{sentence.iast}</div>

          {/* Mode-specific prompt */}
          <div className="drill-prompt">
            {mode === 'translate' && !revealed && <p className="prompt-text">What does this sentence mean?</p>}
            {mode === 'identify' && !revealed && <p className="prompt-text">Identify the grammatical pattern used.</p>}
            {mode === 'listen' && !revealed && <p className="prompt-text">Read this sentence aloud in Sanskrit.</p>}
          </div>

          {/* Answer */}
          {revealed ? (
            <div className="sentence-answer anim-fade-up">
              <div className="answer-english">{sentence.english}</div>
              <div className="rate-btns">
                <button className="fc-next-btn" onClick={handleNext}>Next →</button>
              </div>
            </div>
          ) : (
            <button className="btn-primary reveal-btn" onClick={handleReveal}>Reveal answer</button>
          )}
        </div>
      )}
    </div>
  )
}
