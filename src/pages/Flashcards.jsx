import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useVirtualizer } from '@tanstack/react-virtual'
import WellDoneToast from '../components/WellDoneToast'
import { useVocabularyData } from '../hooks/useData'
import { freshOrder } from '../utils/freshOrder.js'
import ClickableSentence from '../components/ClickableSentence'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import { toIAST } from '../utils/transliterate.js'
import './Flashcards.css'


// ── Virtualised browse list ───────────────────────────────────────────────────
function BrowseList({ cards, onStudy }) {
  const { speak } = useSpeech()
  const { getItemAccuracy } = useProgress()
  const [search, setSearch] = useState('')
  const parentRef = useRef(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return cards
    return cards.filter(c =>
      c.devanagari?.includes(search.trim()) ||
      c.iast?.toLowerCase().includes(q) ||
      c.english?.toLowerCase().includes(q)
    )
  }, [cards, search])

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 8,
  })

  return (
    <div className="fc-browse">
      <div className="fc-browse-header">
        <button className="fc-browse-back-btn" onClick={onStudy}>← Study</button>
        <input
          className="fc-browse-search"
          type="search"
          placeholder="Search devanagari, IAST, English…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoCorrect="off" autoCapitalize="none" spellCheck={false}
        />
        <span className="fc-browse-count">{filtered.length} cards</span>
      </div>

      <div ref={parentRef} className="fc-browse-scroll">
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {virtualizer.getVirtualItems().map(vRow => {
            const card = filtered[vRow.index]
            const acc  = getItemAccuracy(card.id)
            const accColor = acc === null ? 'var(--text-muted)'
                           : acc >= 70   ? 'var(--teal)'
                           : acc >= 40   ? 'var(--gold-dim)'
                           : 'var(--terracotta)'
            return (
              <div
                key={card.id}
                className="fc-browse-row"
                style={{
                  position: 'absolute',
                  top: vRow.start,
                  left: 0, right: 0,
                  height: vRow.size,
                }}
              >
                <button
                  className="fc-browse-speak speak-btn"
                  onClick={() => speak(card.devanagari)}
                  title="Hear pronunciation"
                >
                  <SpeakIcon />
                </button>
                <span className="fc-browse-deva devanagari">{card.devanagari}</span>
                <span className="fc-browse-iast">{card.iast || toIAST(card.devanagari || '')}</span>
                <span className="fc-browse-english">{card.english}</span>
                {acc !== null && (
                  <span className="fc-browse-acc" style={{ color: accColor }}>{acc}%</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default function Flashcards() {
  const vocabData     = useVocabularyData()
  const alphabetCards = vocabData?.alphabet_cards || []
  const vocabulary    = vocabData?.vocabulary     || []
  const allCards  = React.useMemo(() => [...alphabetCards, ...vocabulary], [alphabetCards, vocabulary])
  const cardById  = React.useMemo(() => Object.fromEntries(allCards.map(c => [c.id, c])), [allCards])
  const { getDueItems, recordAnswer, getItemAccuracy, progress } = useProgress()

  // Browse mode — shows the full virtualised card list
  const [browseMode, setBrowseMode] = useState(false)

  // Persist filter / deckType / position / stats across tab switches
  const [filter,       setFilter]       = useSessionStorage('fc_filter',      'due')
  const [deckType,     setDeckType]     = useSessionStorage('fc_deckType',    'all')
  const [currentIdx,   setCurrentIdx]   = useSessionStorage('fc_idx',         0)
  const [sessionDone,  setSessionDone]  = useSessionStorage('fc_done',        false)
  const [sessionStats, setSessionStats] = useSessionStorage('fc_stats',       { correct: 0, total: 0 })
  // Persist the shuffled deck order so re-mounting shows the same card
  const [shuffledIds,  setShuffledIds]  = useSessionStorage('fc_shuffledIds', [])

  const [flipped, setFlipped] = useState(false)   // intentionally ephemeral
  const [round, setRound]     = useState(0)       // bumping forces a fresh deck

  const sourceCards = deckType === 'alphabet' ? alphabetCards
                    : deckType === 'vocab'    ? vocabulary
                    : allCards

  // Build the deck; for 'all' re-use the saved shuffle so the card doesn't jump
  const deck = useMemo(() => {
    if (filter === 'due')  return getDueItems(sourceCards)
    if (filter === 'weak') return sourceCards.filter(c => {
      const acc = getItemAccuracy(c.id)
      return acc !== null && acc < 70
    })
    // filter === 'all' — try to restore the saved shuffle
    if (shuffledIds.length > 0) {
      const restored = shuffledIds.map(id => cardById[id]).filter(Boolean)
      // If the restored deck matches the current source, use it
      if (restored.length === Math.min(sourceCards.length, 30)) return restored
    }
    // Fresh deck — unseen cards first, then least-recently-seen
    const fresh = freshOrder(sourceCards, progress.srs).slice(0, 30)
    setShuffledIds(fresh.map(c => c.id))
    return fresh
  }, [allCards, filter, deckType, round]) // eslint-disable-line react-hooks/exhaustive-deps

  const card = deck[currentIdx]
  const { speak, useGoogle, toggleEngine } = useSpeech()
  const { play } = useSoundEffects()
  const [showToast, setShowToast] = useState(false)

  // Auto-read when answer is revealed
  useEffect(() => {
    if (flipped && card?.devanagari) {
      play('reveal')
      speak(card.devanagari)
    }
  }, [flipped, card?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFlip = () => {
    play('flip')
    setFlipped(f => !f)
  }

  const handleNext = useCallback(() => {
    if (!card) return
    recordAnswer(card.id, 4, card.concepts || [])
    setSessionStats(s => ({ correct: s.correct + 1, total: s.total + 1 }))
    play('success')
    setShowToast(true)
    setFlipped(false)
    setTimeout(() => {
      if (currentIdx + 1 >= deck.length) setSessionDone(true)
      else setCurrentIdx(i => i + 1)
    }, 180)
  }, [card, currentIdx, deck.length, recordAnswer, play])

  const restart = () => {
    setCurrentIdx(0)
    setFlipped(false)
    setSessionDone(false)
    setSessionStats({ correct: 0, total: 0 })
    setShuffledIds([])   // drop the saved order
    setRound(r => r + 1) // recompute the deck with fresh cards
  }

  // Browse mode — full virtualised vocabulary list
  if (browseMode) {
    return (
      <div className="flashcards anim-fade-up">
        <div className="page-header">
          <h1 className="page-title">Browse Cards</h1>
          <p className="page-subtitle">{sourceCards.length} cards · scroll to explore</p>
        </div>
        <BrowseList cards={sourceCards} onStudy={() => setBrowseMode(false)} />
      </div>
    )
  }

  if (!vocabData) return (
    <div className="flashcards anim-fade-up">
      <div className="page-header"><h1 className="page-title">Flashcards</h1></div>
      <div className="card" style={{textAlign:'center',padding:'3rem'}}>
        <p style={{color:'var(--text-secondary)'}}>Loading…</p>
      </div>
    </div>
  )

  if (deck.length === 0) return (
    <div className="flashcards anim-fade-up">
      <div className="page-header"><h1 className="page-title">Flashcards</h1></div>
      <div className="card" style={{textAlign:'center',padding:'3rem'}}>
        <p style={{color:'var(--text-secondary)',marginBottom:'1rem'}}>No cards due for review right now.</p>
        <button className="btn-ghost" onClick={() => setFilter('all')}>Study all cards anyway</button>
      </div>
    </div>
  )

  if (sessionDone) return (
    <div className="flashcards anim-fade-up">
      <div className="page-header"><h1 className="page-title">Session complete</h1></div>
      <div className="session-result card">
        <div className="result-score">{sessionStats.correct}/{sessionStats.total}</div>
        <div className="result-label">Correct answers</div>
        <div className="result-pct">{Math.round(sessionStats.correct/sessionStats.total*100)}% accuracy</div>
        <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',marginTop:'1.5rem'}}>
          <button className="btn-primary" onClick={restart}>Study again</button>
          <button className="btn-ghost" onClick={() => { setFilter('weak'); restart() }}>Review weak only</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flashcards anim-fade-up">
      <WellDoneToast show={showToast} onHide={() => setShowToast(false)} />
      <HubBack to="/study" label="Study" />
      <div className="page-header">
        <h1 className="page-title">Flashcards</h1>
        <p className="page-subtitle">{currentIdx + 1} of {deck.length} · {sessionStats.correct} correct so far</p>
      </div>

      {/* Controls */}
      <div className="fc-controls">
        <div className="fc-filter">
          {['due','all','weak'].map(f => (
            <button key={f} className={`filter-btn ${filter===f?'active':''}`} onClick={()=>{setFilter(f);restart()}}>{f}</button>
          ))}
        </div>
        <div className="fc-filter">
          {['all','alphabet','vocab'].map(d => (
            <button key={d} className={`filter-btn ${deckType===d?'active':''}`} onClick={()=>{setDeckType(d);restart()}}>{d}</button>
          ))}
        </div>
        <button className="filter-btn fc-browse-toggle" onClick={() => setBrowseMode(true)} title="Browse all cards">
          Browse all
        </button>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-track" style={{marginBottom:'1.5rem'}}>
        <div className="progress-bar-fill" style={{width:`${((currentIdx)/deck.length)*100}%`}} />
      </div>

      {/* Card */}
      <div className={`fc-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="fc-card-inner">
          <div className="fc-front">
            <div className="fc-deva-row">
              <div className="fc-deva devanagari"><ClickableSentence vocabulary={vocabulary} text={card?.devanagari || ''} /></div>
              <button className="speak-btn" title="Hear pronunciation"
                onClick={e => { e.stopPropagation(); speak(card?.devanagari) }}><SpeakIcon /></button>
            </div>
            <div className="fc-iast">{card?.iast || (card?.devanagari ? toIAST(card.devanagari) : '')}</div>
            {card?.type && <span className={`pill ${card.level ? 'pill-'+card.level : 'pill-beginner'}`}>{card.type}</span>}
            <button className="engine-toggle-btn" title={useGoogle ? 'Google Neural TTS (click to switch)' : 'System voice (click to switch)'}
              onClick={e => { e.stopPropagation(); toggleEngine() }}>
              {useGoogle ? '🌐' : '💻'}
            </button>
            <div className="fc-hint">tap to reveal</div>
          </div>
          <div className="fc-back">
            <div className="fc-english">{card?.english}</div>
            {card?.gender && <div className="fc-meta">{card.gender === 'm' ? 'masculine' : card.gender === 'f' ? 'feminine' : 'neuter'}</div>}
            {card?.pos && <div className="fc-meta">{card.pos}</div>}
            <div className="fc-deva-small devanagari">{card?.devanagari}</div>
          </div>
        </div>
      </div>

      {/* Next button — shown after flip */}
      {flipped && (
        <div className="fc-next-wrap anim-fade-up">
          <button className="btn-primary" onClick={handleNext}>
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
