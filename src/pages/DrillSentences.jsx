import React, { useState, useMemo, useCallback } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useSessionStorage } from '../hooks/useSessionStorage'
import WellDoneToast from '../components/WellDoneToast'
import { useVocabularyData, useSentenceData } from '../hooks/useData'
import { freshOrder } from '../utils/freshOrder.js'
import { toIAST } from '../utils/transliterate.js'
import ClickableSentence from '../components/ClickableSentence'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import './DrillSentences.css'


const PATTERNS = [
  { id: 'all',              label: 'All patterns' },
  // Original VNP patterns
  { id: 'noun+verb',        label: 'Noun + verb' },
  { id: 'pronoun+verb',     label: 'Pronoun + verb' },
  { id: 'noun+obj+verb',    label: 'Noun + object + verb' },
  { id: 'pronoun+obj+verb', label: 'Pronoun + object + verb' },
  { id: 'pronoun+noun+verb',label: 'Pronoun + noun + verb' },
  { id: 'pronoun-dat+verb', label: 'Dative pronoun' },
  { id: 'noun-loc+verb',    label: 'Locative noun' },
  { id: 'causative',        label: 'Causative verbs' },
  // Collated patterns — Beginner Foundations
  { id: 'सः + noun',        label: 'सः + noun (He is…)' },
  { id: 'सा + noun',        label: 'सा + noun (She is…)' },
  { id: 'तत् + noun',       label: 'तत् + noun (That is…)' },
  { id: 'सः/सा + verb',     label: 'सः/सा + verb' },
  { id: 'noun + adjective + verb', label: 'Noun + adjective + verb' },
  { id: 'कः का किम्',       label: 'कः / का / किम् (who/what)' },
  { id: 'वा questions',     label: 'वा questions' },
  { id: 'अस्ति / नास्ति',   label: 'अस्ति / नास्ति' },
  // Pronouns with verbs
  { id: 'pronoun+verb: सः', label: 'सः + verb (He…)' },
  { id: 'pronoun+verb: सा', label: 'सा + verb (She…)' },
  { id: 'pronoun+verb: तत्',label: 'तत् + verb (It…)' },
  { id: 'pronoun+verb: एषः',label: 'एषः + verb (This m.)' },
  { id: 'pronoun+verb: एषा',label: 'एषा + verb (This f.)' },
  { id: 'pronoun+verb: एतत्',label: 'एतत् + verb (This n.)' },
  { id: 'pronoun+verb: कः', label: 'कः + verb (Who m.?)' },
  { id: 'pronoun+verb: का', label: 'का + verb (Who f.?)' },
  { id: 'pronoun+verb: किम्',label: 'किम् + verb (What?)' },
  { id: 'pronoun+verb: भवान्',label: 'भवान् + verb (polite m.)' },
  { id: 'pronoun+verb: भवती',label: 'भवती + verb (polite f.)' },
  // First/second person descriptive
  { id: 'descriptive: अहम्', label: 'अहम् descriptive (I am…)' },
  { id: 'descriptive: भवान्',label: 'भवान् descriptive (You m. are…)' },
  { id: 'descriptive: भवती',label: 'भवती descriptive (You f. are…)' },
  // करोति / करोतु
  { id: 'अहम् … करोमि',     label: 'अहम् … करोमि (I am doing…)' },
  { id: 'भवान् … करोतु',    label: 'भवान् … करोतु (You m. do…)' },
  { id: 'भवती … करोतु',    label: 'भवती … करोतु (You f. do…)' },
  { id: '3rd-person + imperative combinations', label: '3rd person imperatives' },
  // Singular / Plural
  { id: 'singular: masculine', label: 'Singular masculine' },
  { id: 'plural: masculine',   label: 'Plural masculine' },
  { id: 'singular: feminine',  label: 'Singular feminine' },
  { id: 'plural: feminine',    label: 'Plural feminine' },
  { id: 'singular: neuter',    label: 'Singular neuter' },
  { id: 'plural: neuter',      label: 'Plural neuter' },
  // षष्ठी Genitive
  { id: 'shashti (षष्ठी): masculine', label: 'षष्ठी masculine/neuter' },
  { id: 'shashti (षष्ठी): feminine',  label: 'षष्ठी feminine' },
  // Spatial avyayas
  { id: 'spatial: पुरतः (in front of)', label: 'पुरतः (in front of)' },
  { id: 'spatial: पृष्ठतः (behind)',    label: 'पृष्ठतः (behind)' },
  { id: 'spatial: दक्षिणतः (to the right of)', label: 'दक्षिणतः (right of)' },
  { id: 'spatial: वामतः (to the left of)',      label: 'वामतः (left of)' },
  { id: 'spatial: उपरि (above / on top of)',    label: 'उपरि (above)' },
  { id: 'spatial: अधः (below / under)',         label: 'अधः (below)' },
  // Locative adverbs
  { id: 'adverb: कुत्र (where?)',       label: 'कुत्र (where?)' },
  { id: 'adverb: अत्र (here)',          label: 'अत्र (here)' },
  { id: 'adverb: तत्र (there)',         label: 'तत्र (there)' },
  { id: 'adverb: सर्वत्र (everywhere)', label: 'सर्वत्र (everywhere)' },
  { id: 'adverb: अन्यत्र (somewhere else / elsewhere)', label: 'अन्यत्र (elsewhere)' },
  // Interrogatives
  { id: 'interrogative: कदा (when?)',   label: 'कदा (when?)' },
  { id: 'interrogative: कति (how many?)',label: 'कति (how many?)' },
]

const MODES = [
  { id: 'translate', label: 'Translate to English' },
  { id: 'identify',  label: 'Identify the pattern' },
  { id: 'listen',    label: 'Read aloud (recitation)' },
]

export default function DrillSentences() {
  const vocabData  = useVocabularyData()
  const sentData   = useSentenceData()
  const grammarConcepts = vocabData?.grammar_concepts || {}
  const allSentences = React.useMemo(() => [
    ...(sentData?.vnp_sentences      || []),
    ...(sentData?.collated_sentences || []),
  ], [sentData])
  const sentById = React.useMemo(() => Object.fromEntries(allSentences.map(s => [s.id, s])), [allSentences])
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
  const [patternTip, setPatternTip] = useState(true) // show on mount every visit

  const weakConcepts = useMemo(() => getWeakConcepts().map(c => c.id), [getWeakConcepts])

  // Auto-dismiss the pattern tip after 4 s
  React.useEffect(() => {
    if (!patternTip) return
    const t = setTimeout(() => setPatternTip(false), 4000)
    return () => clearTimeout(t)
  }, [patternTip])

  // Randomly re-surface the tip ~every 5 cards (30 % chance)
  React.useEffect(() => {
    if (currentIdx > 0 && currentIdx % 5 === 0 && Math.random() < 0.3) {
      setPatternTip(true)
    }
  }, [currentIdx])

  const sentences = useMemo(() => {
    // Filter first
    let list = allSentences
    if (pattern !== 'all') list = list.filter(s => s.pattern === pattern)
    if (weakOnly) list = list.filter(s => s.concepts?.some(c => weakConcepts.includes(c)))

    // Try to restore previously-saved shuffle for this exact filter set
    if (shuffledIds.length > 0) {
      const restored = shuffledIds.map(id => sentById[id]).filter(Boolean)
      // Only reuse if the restored set matches the current filtered list size
      const filteredIds = new Set(list.map(s => s.id))
      const valid = restored.filter(s => filteredIds.has(s.id))
      if (valid.length === list.length) return valid
    }

    // Fresh order — unseen sentences first, then least-recently-seen; save it
    const fresh = freshOrder(list, progress.srs)
    setShuffledIds(fresh.map(s => s.id))
    return fresh
  }, [allSentences, pattern, weakOnly, weakConcepts, round]) // eslint-disable-line react-hooks/exhaustive-deps

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

  if (!sentData) return (
    <div className="drill anim-fade-up">
      <div className="page-header"><h1 className="page-title">Sentence Drill</h1></div>
      <div className="card drill-loading">Loading…</div>
    </div>
  )

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
      <HubBack to="/study" label="Study" />
      <div className="page-header">
        <h1 className="page-title">Sentence Drill</h1>
        <p className="page-subtitle">Verb · noun · pronoun combinations</p>
      </div>

      {/* Controls */}
      <div className="drill-controls">
        <div className="control-group" style={{position:'relative'}}>
          <label className="control-label">Pattern</label>
          <select className="drill-select" value={pattern} onChange={e => { setPattern(e.target.value); setPatternTip(false); restart() }}>
            {PATTERNS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          {patternTip && (
            <div className="pattern-tip" onClick={() => setPatternTip(false)}>
              <span className="pattern-tip-arrow" />
              Filter by pattern to focus your practice — e.g. "Dative pronoun" or "षष्ठी"
            </div>
          )}
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
            <ClickableSentence vocabulary={vocabData?.vocabulary} text={sentence.devanagari} />
            <button className="speak-btn" title="Hear full sentence" onClick={() => speak(sentence.devanagari)}><SpeakIcon /></button>
          </div>
          <div className="sentence-iast">{sentence.iast || toIAST(sentence.devanagari)}</div>

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
                <button className="btn-primary" onClick={handleNext}>Next →</button>
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
