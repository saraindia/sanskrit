import React, { useState, useEffect, useCallback } from 'react'
import { useUserProgress as useProgress } from '../hooks/useUserProgress'
import { usePurchase } from '../context/PurchaseContext'
import { useSpeech } from '../hooks/useSpeech'
import { useSoundEffects } from '../hooks/useSoundEffects'
import { useSessionStorage } from '../hooks/useSessionStorage'
import WellDoneToast from '../components/WellDoneToast'
import { useVocabularyData } from '../hooks/useData'
import { freshOrder, freeOrder } from '../utils/freshOrder.js'
import FreeBanner from '../components/FreeBanner'
import { setItem, getItem } from '../utils/storage'
import HubBack from '../components/HubBack'
import './MatchPairs.css'

const ROUND_SIZE = 5

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export default function MatchPairs() {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
  const vocabData = useVocabularyData()
  const vocabulary = vocabData?.vocabulary || []
  const wordById   = React.useMemo(() => Object.fromEntries(vocabulary.map(w => [w.id, w])), [vocabulary])
  const { recordAnswer, progress } = useProgress()
  const { speak } = useSpeech()
  const { play } = useSoundEffects()

  const storeKey = 'sl_match_v1'

  const [game, setGame]             = useState(null)  // { sa: [ids], en: [ids], matched: [ids], round }
  const [selected, setSelected]     = useState(null)  // { side, id }
  const [wrongPair, setWrongPair]   = useState(null)  // { saId, enId }
  const [justMatched, setJustMatched] = useState(null)
  const [showToast, setShowToast]   = useState(false)
  const [stats, setStats]           = useSessionStorage('match_stats', { pairs: 0, misses: 0 })

  const persist = useCallback((g) => {
    try { setItem(storeKey, JSON.stringify(g)) } catch {}
  }, [storeKey])

  const dealRound = useCallback((roundNum) => {
    // Free users: fixed pool so the same words appear each session
    const pool = isPro ? freshOrder(vocabulary, progress.srs) : freeOrder(vocabulary)
    const words = pool.slice(roundNum * ROUND_SIZE, roundNum * ROUND_SIZE + ROUND_SIZE).length === ROUND_SIZE
      ? pool.slice(roundNum * ROUND_SIZE, roundNum * ROUND_SIZE + ROUND_SIZE)
      : pool.slice(0, ROUND_SIZE)  // fallback to first chunk if pool is small
    const g = {
      sa: shuffle(words).map(w => w.id),
      en: shuffle(words).map(w => w.id),
      matched: [],
      round: roundNum,
    }
    setGame(g)
    persist(g)
  }, [vocabulary, progress.srs, persist, isPro]) // eslint-disable-line react-hooks/exhaustive-deps

  // Restore an unfinished round, otherwise deal a fresh one — wait for vocab to load
  useEffect(() => {
    if (!vocabData) return
    setSelected(null); setWrongPair(null); setJustMatched(null)
    try {
      const saved = JSON.parse(getItem(storeKey) || 'null')
      if (
        saved &&
        saved.sa?.length === ROUND_SIZE &&
        saved.sa.every(id => wordById[id]) &&
        saved.matched.length < ROUND_SIZE
      ) {
        setGame(saved)
        return
      }
    } catch {}
    dealRound(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeKey, vocabData])

  const handleTap = useCallback((side, word) => {
    if (!game || game.matched.includes(word.id) || wrongPair || justMatched) return

    // Hear the Sanskrit word as soon as it's tapped
    if (side === 'sa') speak(word.devanagari)

    // First pick, same-side switch, or tap-again-to-deselect
    if (!selected || selected.side === side) {
      setSelected(selected?.id === word.id && selected.side === side ? null : { side, id: word.id })
      return
    }

    const partner = wordById[selected.id]
    if (selected.id === word.id) {
      // ── Correct pair — read out, flash, then grey out ──────────────────
      play('correct')
      speak(word.devanagari)
      setJustMatched(word.id)
      setSelected(null)
      recordAnswer(word.id, 4, word.concepts || [])
      setStats(s => ({ ...s, pairs: s.pairs + 1 }))
      const next = { ...game, matched: [...game.matched, word.id] }
      persist(next)   // saved immediately — leaving mid-round resumes from here
      const completesRound = next.matched.length === ROUND_SIZE
      setTimeout(() => {
        setJustMatched(null)
        setGame(next)
        if (completesRound) {
          play('success')
          setShowToast(true)
          const hitFreeLimit = !isPro && next.round + 1 >= FREE_LIMITS.MATCH_ROUNDS
          setTimeout(() => {
            if (hitFreeLimit) showPaywall()
            else dealRound(next.round + 1)
          }, 900)
        }
      }, 550)
    } else {
      // ── Wrong pair — flash red, read out, then revert ──────────────────
      play('wrong')
      const saWord = side === 'sa' ? word : partner
      speak(saWord.devanagari)
      setWrongPair({
        saId: side === 'sa' ? word.id : selected.id,
        enId: side === 'en' ? word.id : selected.id,
      })
      recordAnswer(saWord.id, 1, saWord.concepts || [])
      setStats(s => ({ ...s, misses: s.misses + 1 }))
      setTimeout(() => { setWrongPair(null); setSelected(null) }, 750)
    }
  }, [game, wrongPair, justMatched, selected, speak, play, recordAnswer, setStats, persist, dealRound])

  if (!game) return null

  const matched = game.matched
  const cardClass = (side, word) => {
    let c = 'mp-card'
    if (side === 'sa') c += ' devanagari mp-sa'
    if (matched.includes(word.id)) return c + ' mp-matched'
    if (justMatched === word.id) return c + ' mp-correct'
    if (wrongPair && ((side === 'sa' && wrongPair.saId === word.id) || (side === 'en' && wrongPair.enId === word.id)))
      return c + ' mp-wrong'
    if (selected && selected.side === side && selected.id === word.id) return c + ' mp-active'
    return c
  }

  const matchedCount = matched.length + (justMatched ? 1 : 0)
  const total = stats.pairs + stats.misses
  const accuracy = total ? Math.round((stats.pairs / total) * 100) : null

  return (
    <div className="matchpairs anim-fade-up">
      <WellDoneToast show={showToast} onHide={() => setShowToast(false)} />
      <HubBack to="/study" label="Study" />
      <div className="page-header">
        <h1 className="page-title">Matching Pairs</h1>
        <p className="page-subtitle">
          Tap the matching pairs · round {game.round + 1} of {Math.ceil(vocabulary.length / ROUND_SIZE)} · {vocabulary.length} words
          {accuracy !== null && <> · {stats.pairs} matched · {accuracy}% accuracy</>}
        </p>
      </div>

      <FreeBanner limit={FREE_LIMITS.MATCH_ROUNDS} total={Math.ceil(vocabulary.length / ROUND_SIZE)} noun="rounds" />

      <div className="progress-bar-track" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-bar-fill" style={{ width: `${(matchedCount / ROUND_SIZE) * 100}%` }} />
      </div>

      <div className="mp-grid">
        <div className="mp-col">
          {game.sa.map(id => wordById[id]).map(w => (
            <button key={w.id} className={cardClass('sa', w)}
              onClick={() => handleTap('sa', w)} disabled={matched.includes(w.id)}>
              {w.devanagari}
            </button>
          ))}
        </div>
        <div className="mp-col">
          {game.en.map(id => wordById[id]).map(w => (
            <button key={w.id} className={cardClass('en', w)}
              onClick={() => handleTap('en', w)} disabled={matched.includes(w.id)}>
              {w.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
