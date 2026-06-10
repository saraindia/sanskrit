import React, { useState, useMemo, useCallback } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { FILL_BLANKS } from '../data/sentences.js'
import { GRAMMAR_CONCEPTS } from '../data/vocabulary.js'
import { toIAST } from '../utils/transliterate.js'
import { freshOrder } from '../utils/freshOrder.js'
import ClickableSentence from '../components/ClickableSentence'
import SpeakIcon from '../components/SpeakIcon'
import './FillBlanks.css'

export default function FillBlanks() {
  const { recordAnswer, progress } = useProgress()
  const [currentIdx, setCurrentIdx]   = useState(0)
  const [selected, setSelected]       = useState(null)
  const [confirmed, setConfirmed]     = useState(false)
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 })
  const [done, setDone]               = useState(false)
  const [levelFilter, setLevelFilter] = useState('all')
  const [round, setRound]             = useState(0)   // bumping forces a new question order

  // Unseen questions first, then least-recently-seen; recomputed each round
  const questions = useMemo(() => {
    const list = levelFilter === 'all' ? FILL_BLANKS : FILL_BLANKS.filter(q => q.level === levelFilter)
    return freshOrder(list, progress.srs)
  }, [levelFilter, round]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = questions[currentIdx]
  const { speak } = useSpeech()
  const { play } = useSoundEffects()

  const handleSelect = (opt) => {
    if (confirmed) return
    setSelected(opt)
  }

  const handleConfirm = useCallback(() => {
    if (!selected || !q) return
    const correct = selected === q.blank
    recordAnswer(q.id, correct ? 4 : 1, q.concepts || [])
    setSessionStats(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    setConfirmed(true)
    // Play correct/wrong sound, then speak the correct answer
    if (correct) {
      play('correct')
      setTimeout(() => speak(q.blank), 600)
    } else {
      play('wrong')
      setTimeout(() => speak(q.blank), 700)
    }
  }, [selected, q, recordAnswer, play, speak])

  const handleNext = useCallback(() => {
    setSelected(null)
    setConfirmed(false)
    if (currentIdx + 1 >= questions.length) setDone(true)
    else setCurrentIdx(i => i + 1)
  }, [currentIdx, questions.length])

  const restart = () => { setCurrentIdx(0); setSelected(null); setConfirmed(false); setDone(false); setSessionStats({ correct: 0, total: 0 }); setRound(r => r + 1) }

  if (questions.length === 0) return (
    <div className="fillblanks anim-fade-up">
      <div className="page-header"><h1 className="page-title">Fill in the Blanks</h1></div>
      <div className="card" style={{padding:'2rem',textAlign:'center'}}><p style={{color:'var(--text-secondary)'}}>No questions for this filter.</p></div>
    </div>
  )

  if (done) return (
    <div className="fillblanks anim-fade-up">
      <div className="page-header"><h1 className="page-title">Round complete!</h1></div>
      <div className="card" style={{textAlign:'center',padding:'3rem',maxWidth:'400px',margin:'0 auto'}}>
        <div style={{fontFamily:'var(--font-display)',fontSize:'2.5rem',color:'var(--gold)'}}>{sessionStats.correct}/{sessionStats.total}</div>
        <p style={{color:'var(--text-secondary)',margin:'0.5rem 0 1.5rem'}}>Correct answers</p>
        <button className="btn-primary" onClick={restart}>Try again</button>
      </div>
    </div>
  )

  const parts = q.template.split('_____')
  const isCorrect = confirmed && selected === q.blank
  const isWrong   = confirmed && selected !== q.blank

  // Transliteration helpers
  const sentenceIast = confirmed
    ? toIAST(q.template.replace('_____', q.blank))
    : toIAST(parts[0]) + (selected ? toIAST(selected) : '…') + toIAST(parts[1])

  return (
    <div className="fillblanks anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Fill in the Blanks</h1>
        <p className="page-subtitle">{currentIdx + 1} of {questions.length} · {sessionStats.correct} correct</p>
      </div>

      {/* Level filter */}
      <div className="fb-filters">
        {['all','beginner','intermediate','advanced'].map(l => (
          <button key={l} className={`filter-btn ${levelFilter===l?'active':''}`} onClick={()=>{setLevelFilter(l);restart()}}>{l}</button>
        ))}
      </div>

      {/* Progress */}
      <div className="progress-bar-track" style={{marginBottom:'1.5rem'}}>
        <div className="progress-bar-fill" style={{width:`${(currentIdx/questions.length)*100}%`}} />
      </div>

      {/* Question card */}
      <div className="fb-card card">
        <div className={`pill pill-${q.level}`} style={{marginBottom:'1rem',display:'inline-flex'}}>{q.level}</div>

        {/* Sentence with blank — after confirm, show full clickable sentence */}
        {confirmed ? (
          <div className="fb-sentence-wrap">
            <div className="fb-sentence devanagari" style={{display:'flex',alignItems:'center',gap:'0.75rem',flexWrap:'wrap'}}>
              <ClickableSentence text={q.template.replace('_____', q.blank)} />
              <button className="speak-btn" title="Hear sentence" onClick={() => speak(q.template.replace('_____', q.blank))}><SpeakIcon /></button>
            </div>
            <div className="fb-iast">{sentenceIast}</div>
          </div>
        ) : (
          <div className="fb-sentence-wrap">
            <div className="fb-sentence devanagari" style={{display:'flex',alignItems:'center',gap:'0.75rem',flexWrap:'wrap'}}>
              <button className="speak-btn" title="Hear sentence" onClick={() => speak(q.template.replace('_____', q.blank))}><SpeakIcon /></button>
              {parts[0]}
              <span className={`fb-blank ${selected ? 'filled' : ''}`}>
                {selected || '_____'}
              </span>
              {parts[1]}
            </div>
            <div className="fb-iast">{sentenceIast}</div>
          </div>
        )}

        <div className="fb-hint">{q.hint}</div>

        {/* Options */}
        <div className="fb-options">
          {q.options.map(opt => {
            let cls = 'fb-option'
            if (confirmed) {
              if (opt === q.blank) cls += ' option-correct'
              else if (opt === selected) cls += ' option-wrong'
            } else if (opt === selected) {
              cls += ' option-selected'
            }
            return (
              <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
                <span className="fb-option-deva devanagari">{opt}</span>
                <span className="fb-option-iast">{toIAST(opt)}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {confirmed && (
          <div className={`fb-feedback anim-fade-up ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
            {isCorrect ? '✓ Correct!' : `✗ Correct answer: ${q.blank}`}
            <div className="fb-concepts">
              {q.concepts?.map(c => <span key={c} className="concept-pill">{GRAMMAR_CONCEPTS[c]?.label || c}</span>)}
            </div>
          </div>
        )}

        {/* Action button */}
        <div style={{marginTop:'1.5rem'}}>
          {!confirmed
            ? <button className="btn-primary" onClick={handleConfirm} disabled={!selected}>Check answer</button>
            : <button className="btn-primary" onClick={handleNext}>Next →</button>
          }
        </div>
      </div>
    </div>
  )
}
