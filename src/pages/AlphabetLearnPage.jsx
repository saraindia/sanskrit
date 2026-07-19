import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { ALPHABET_CARDS } from '../data/vocabulary.js'
import { STROKE_PATHS } from '../data/alphabetStrokes.js'
import { useSpeech } from '../hooks/useSpeech.js'
import './AlphabetLearnPage.css'

// Derive stroke count & tip from STROKE_PATHS automatically
function buildHints() {
  const tips = {
    'a-01': 'Loop body → right bar → headline',
    'a-02': 'Body loop → inner stem → outer stem → headline',
    'a-03': 'Body arc → headline',
    'a-04': 'Body arc → headline → right hook',
    'a-05': 'Teardrop body → headline',
    'a-06': 'Teardrop body → headline → lower hook',
    'a-07': 'Main curve → headline',
    'a-08': 'Main curve → left mark → right mark → headline',
    'a-09': 'Left arc → right stem → headline',
    'a-10': 'Left arc → middle stem → outer stem → headline',
    'a-11': 'Left stem → upper arm → lower curve → headline',
    'a-12': 'Oval body → middle bar → headline',
    'a-13': 'Sweeping curve → headline',
    'a-14': 'Body curve → right stem → headline',
    'a-15': 'C-shape with tail → headline',
    'a-16': 'Crossbar → right body curve → headline',
    'a-17': 'Left arc → right stem → headline',
    'a-18': 'Right arc → left stem → headline',
    'a-19': 'Left stem → diagonal → right stem → headline',
    'a-20': 'Left stem → P-bowl → headline',
    'a-21': 'Left stem → right loop → headline',
    'a-22': 'Left stem → right body curve → headline',
    'a-23': 'Rolling curve → headline',
    'a-24': 'Left stem → upper bow → lower bow → headline',
    'a-25': 'Upper arc → lower arc → headline',
    'a-26': 'Upper hook → lower body → headline',
    'a-27': 'Outer curve → inner descender → headline',
    'a-28': 'Oval body → upper arch → headline',
    'a-29': 'Vertical → left arm → headline',
    'a-30': 'Single dot (circle)',
    'a-31': 'Upper dot → lower dot',
  }
  const hints = {}
  for (const [id, paths] of Object.entries(STROKE_PATHS)) {
    hints[id] = { count: paths.length, tip: tips[id] || '' }
  }
  return hints
}
const STROKE_HINTS = buildHints()

// Example words for each letter
const EXAMPLES = {
  'a-01': { word: 'अग्नि',    iast: 'agni',      meaning: 'fire' },
  'a-02': { word: 'आकाश',    iast: 'ākāśa',     meaning: 'sky' },
  'a-03': { word: 'इन्द्र',   iast: 'indra',     meaning: 'Indra (king of gods)' },
  'a-04': { word: 'ईश्वर',    iast: 'īśvara',    meaning: 'God / Lord' },
  'a-05': { word: 'उपनिषद्', iast: 'upaniṣad',  meaning: 'Upanishad' },
  'a-06': { word: 'ऊर्जा',   iast: 'ūrjā',      meaning: 'energy' },
  'a-07': { word: 'एक',      iast: 'eka',        meaning: 'one' },
  'a-08': { word: 'ऐश्वर्य', iast: 'aiśvarya',  meaning: 'divine glory' },
  'a-09': { word: 'ओम्',     iast: 'om',         meaning: 'sacred syllable' },
  'a-10': { word: 'औषध',    iast: 'auṣadha',    meaning: 'medicine' },
  'a-11': { word: 'कमल',     iast: 'kamala',     meaning: 'lotus' },
  'a-12': { word: 'खग',      iast: 'khaga',      meaning: 'bird (sky-goer)' },
  'a-13': { word: 'गुरु',    iast: 'guru',       meaning: 'teacher' },
  'a-14': { word: 'घर',      iast: 'ghara',      meaning: 'house' },
  'a-15': { word: 'चन्द्र',  iast: 'candra',     meaning: 'moon' },
  'a-16': { word: 'जल',      iast: 'jala',       meaning: 'water' },
  'a-17': { word: 'तारा',    iast: 'tārā',       meaning: 'star' },
  'a-18': { word: 'दीप',     iast: 'dīpa',       meaning: 'lamp / light' },
  'a-19': { word: 'नम',      iast: 'nama',       meaning: 'name / bow' },
  'a-20': { word: 'पुष्प',   iast: 'puṣpa',      meaning: 'flower' },
  'a-21': { word: 'मन',      iast: 'mana',       meaning: 'mind' },
  'a-22': { word: 'योग',     iast: 'yoga',       meaning: 'union / practice' },
  'a-23': { word: 'राम',     iast: 'rāma',       meaning: 'Rama' },
  'a-24': { word: 'वन',      iast: 'vana',       meaning: 'forest' },
  'a-25': { word: 'सत्य',    iast: 'satya',      meaning: 'truth' },
  'a-26': { word: 'हस्त',    iast: 'hasta',      meaning: 'hand' },
  'a-27': { word: 'शान्ति',  iast: 'śānti',      meaning: 'peace' },
  'a-28': { word: 'षट्',     iast: 'ṣaṭ',        meaning: 'six' },
  'a-29': { word: 'लक्ष्मी', iast: 'lakṣmī',     meaning: 'Lakshmi (goddess)' },
  'a-30': { word: 'संस्कृत', iast: 'saṃskṛta',   meaning: 'Sanskrit' },
  'a-31': { word: 'नमः',     iast: 'namaḥ',      meaning: 'salutation' },
}

const TABS = [
  { key: 'vowel',     label: 'Vowels',     labelSa: 'स्वर' },
  { key: 'consonant', label: 'Consonants', labelSa: 'व्यञ्जन' },
  { key: 'special',   label: 'Special',    labelSa: 'विशेष' },
]

// Per-stroke animation durations
const STROKE_DUR_MS  = 650  // ms to draw each stroke
const STROKE_GAP_MS  = 120  // pause between strokes

// ── Stroke animation component ────────────────────────────────────────────────
function StrokeAnimation({ card, animKey, onAnimEnd }) {
  const strokes = STROKE_PATHS[card.id] || []
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setDone(false)
    if (!strokes.length) { onAnimEnd?.(); return }
    const total = (strokes.length - 1) * (STROKE_DUR_MS + STROKE_GAP_MS) + STROKE_DUR_MS
    timerRef.current = setTimeout(() => { setDone(true); onAnimEnd?.() }, total + 100)
    return () => clearTimeout(timerRef.current)
  }, [animKey]) // eslint-disable-line

  return (
    <svg viewBox="0 0 100 110" className="char-svg" aria-hidden>
      {/* Devanagari practice lines */}
      <line x1="8" y1="28" x2="92" y2="28" stroke="rgba(255,221,0,0.35)" strokeWidth="0.8"/>
      <line x1="8" y1="82" x2="92" y2="82" stroke="rgba(255,221,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>

      {/* Ghost character — shows target shape while drawing */}
      <text x="50" y="82" textAnchor="middle"
            fontFamily="'Noto Sans Devanagari', serif"
            fontSize="68"
            fill={done ? 'transparent' : 'rgba(255,221,0,0.07)'}>
        {card.devanagari}
      </text>

      {/* Animated stroke paths, one per stroke */}
      {strokes.map((d, i) => {
        const delay = i * (STROKE_DUR_MS + STROKE_GAP_MS)
        return (
          <path
            key={`${animKey}-${i}`}
            d={d}
            fill="none"
            stroke="var(--gold, #ffdd00)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{
              strokeDasharray: 1,
              animation: `stroke-draw ${STROKE_DUR_MS}ms ease ${delay}ms both`,
            }}
          />
        )
      })}

      {/* Final character — fades in when all strokes complete */}
      {done && (
        <text x="50" y="82" textAnchor="middle"
              fontFamily="'Noto Sans Devanagari', serif"
              fontSize="68"
              fill="var(--text-primary, #fff)"
              style={{ animation: 'fade-in-char 0.4s ease forwards' }}>
          {card.devanagari}
        </text>
      )}

      {/* Stroke-number start-point indicators */}
      {!done && strokes.map((d, i) => {
        // Parse first M command to get start point
        const m = d.match(/^M\s*([\d.]+)[,\s]([\d.]+)/)
        if (!m) return null
        const sx = parseFloat(m[1]), sy = parseFloat(m[2])
        const delay = i * (STROKE_DUR_MS + STROKE_GAP_MS)
        return (
          <g key={`dot-${animKey}-${i}`}
             style={{ animation: `fade-in-char 0.2s ease ${delay}ms both` }}>
            <circle cx={sx} cy={sy} r="5.5"
                    fill="var(--gold, #ffdd00)" opacity="0.9"/>
            <text x={sx} y={sy + 3.5} textAnchor="middle"
                  fill="#000" fontSize="6" fontFamily="sans-serif" fontWeight="bold">
              {i + 1}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Letter detail modal ───────────────────────────────────────────────────────
function LetterModal({ card, onClose, onPrev, onNext }) {
  const [animKey, setAnimKey] = useState(0)
  const [animDone, setAnimDone] = useState(false)
  const { speak, speaking } = useSpeech()
  const hint = STROKE_HINTS[card.id]
  const ex   = EXAMPLES[card.id]

  const handlePlay = useCallback(() => {
    setAnimKey(k => k + 1)
    setAnimDone(false)
    speak(card.devanagari)
  }, [card.devanagari, speak])

  // Auto-play on open
  useEffect(() => {
    const t = setTimeout(handlePlay, 200)
    return () => clearTimeout(t)
  }, [card.id]) // eslint-disable-line

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  onNext()
      if (e.key === 'ArrowLeft')   onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNext, onPrev])

  const content = (
    <div className="letter-modal-backdrop" onClick={onClose}>
      <div className="letter-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-nav modal-nav--prev" onClick={onPrev} aria-label="Previous">‹</div>
        <div className="modal-nav modal-nav--next" onClick={onNext} aria-label="Next">›</div>

        <div className="modal-char-area">
          <StrokeAnimation
            card={card}
            animKey={animKey}
            onAnimEnd={() => setAnimDone(true)}
          />
        </div>

        <div className="modal-meta">
          <div className="modal-iast">{card.iast}</div>
          <div className="modal-name">{card.english}</div>
          <div className="modal-type-badge">{card.type}</div>
        </div>

        {hint && (
          <div className="modal-stroke-info">
            <span className="stroke-count">{hint.count} strokes</span>
            <span className="stroke-tip">{hint.tip}</span>
          </div>
        )}

        {ex && animDone && (
          <div className="modal-example">
            <span className="ex-word">{ex.word}</span>
            <span className="ex-iast">{ex.iast}</span>
            <span className="ex-meaning">{ex.meaning}</span>
          </div>
        )}

        <div className="modal-actions">
          <button
            className={`btn-listen ${speaking ? 'btn-listen--active' : ''}`}
            onClick={() => speak(card.devanagari)}
          >
            {speaking ? '🔊' : '🔉'} Listen
          </button>
          <button className="btn-replay" onClick={handlePlay}>
            ↺ Replay
          </button>
        </div>
      </div>
    </div>
  )
  return createPortal(content, document.body)
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AlphabetLearnPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('vowel')
  const [selected, setSelected] = useState(null)

  const visible   = ALPHABET_CARDS.filter(c => c.type === tab)
  const selIdx    = selected ? visible.findIndex(c => c.id === selected.id) : -1

  const handlePrev = useCallback(() => {
    if (selIdx > 0) setSelected(visible[selIdx - 1])
  }, [selIdx, visible])

  const handleNext = useCallback(() => {
    if (selIdx < visible.length - 1) setSelected(visible[selIdx + 1])
  }, [selIdx, visible])

  return (
    <div className="alpha-page">
      <header className="alpha-header">
        <button className="alpha-back" onClick={() => navigate(-1)} aria-label="Back">‹</button>
        <div className="alpha-title">
          <h1>अक्षरमाला</h1>
          <span>Learn the Alphabet</span>
        </div>
      </header>

      <nav className="alpha-tabs">
        {TABS.map(t => (
          <button key={t.key}
            className={`alpha-tab ${tab === t.key ? 'alpha-tab--active' : ''}`}
            onClick={() => setTab(t.key)}>
            <span className="tab-sa">{t.labelSa}</span>
            <span className="tab-en">{t.label}</span>
          </button>
        ))}
      </nav>

      <p className="alpha-hint">Tap a letter to see how it's written and hear its sound.</p>

      <div className={`alpha-grid alpha-grid--${tab}`}>
        {visible.map(card => (
          <button key={card.id} className="alpha-card"
            onClick={() => setSelected(card)}
            aria-label={`${card.devanagari} — ${card.iast}`}>
            <span className="alpha-card-char">{card.devanagari}</span>
            <span className="alpha-card-iast">{card.iast}</span>
          </button>
        ))}
      </div>

      {selected && (
        <LetterModal
          card={selected}
          onClose={() => setSelected(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
