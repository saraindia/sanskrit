import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALPHABET_CARDS } from '../data/vocabulary.js'
import { useSpeech } from '../hooks/useSpeech.js'
import './AlphabetLearnPage.css'

// Stroke-order hints for vowels (start point markers and direction info)
const STROKE_HINTS = {
  'a-01': { count: 3, tip: 'Loop left body → right bar → top headline' },
  'a-02': { count: 4, tip: 'Like अ + right vertical hook' },
  'a-03': { count: 2, tip: 'Left body curve → top headline' },
  'a-04': { count: 3, tip: 'Like इ + right downward hook' },
  'a-05': { count: 2, tip: 'Left teardrop loop → top headline' },
  'a-06': { count: 3, tip: 'Like उ + extra bottom hook' },
  'a-07': { count: 2, tip: 'Curved body → top headline' },
  'a-08': { count: 3, tip: 'Like ए + upper right mark' },
  'a-09': { count: 3, tip: 'Left oval + right loop → headline' },
  'a-10': { count: 4, tip: 'Like ओ + upper right mark' },
  'a-11': { count: 3, tip: 'Right vertical → left angle arm → headline' },
  'a-13': { count: 2, tip: 'Single curved stroke → headline' },
  'a-19': { count: 3, tip: 'Left hook → right curve → headline' },
  'a-21': { count: 3, tip: 'Curved left loop → right vertical → headline' },
  'a-23': { count: 2, tip: 'Rolling curve downward → headline' },
  'a-26': { count: 3, tip: 'Upper hook left → lower hook right → headline' },
}

// Example words for each letter
const EXAMPLES = {
  'a-01': { word: 'अग्नि', iast: 'agni', meaning: 'fire' },
  'a-02': { word: 'आकाश', iast: 'ākāśa', meaning: 'sky' },
  'a-03': { word: 'इन्द्र', iast: 'indra', meaning: 'Indra (king of gods)' },
  'a-04': { word: 'ईश्वर', iast: 'īśvara', meaning: 'God / Lord' },
  'a-05': { word: 'उपनिषद्', iast: 'upaniṣad', meaning: 'Upanishad' },
  'a-06': { word: 'ऊर्जा', iast: 'ūrjā', meaning: 'energy' },
  'a-07': { word: 'एक', iast: 'eka', meaning: 'one' },
  'a-08': { word: 'ऐश्वर्य', iast: 'aiśvarya', meaning: 'divine glory' },
  'a-09': { word: 'ओम्', iast: 'om', meaning: 'sacred syllable' },
  'a-10': { word: 'औषध', iast: 'auṣadha', meaning: 'medicine' },
  'a-11': { word: 'कमल', iast: 'kamala', meaning: 'lotus' },
  'a-12': { word: 'खग', iast: 'khaga', meaning: 'bird (sky-goer)' },
  'a-13': { word: 'गुरु', iast: 'guru', meaning: 'teacher' },
  'a-14': { word: 'घर', iast: 'ghara', meaning: 'house' },
  'a-15': { word: 'चन्द्र', iast: 'candra', meaning: 'moon' },
  'a-16': { word: 'जल', iast: 'jala', meaning: 'water' },
  'a-17': { word: 'तारा', iast: 'tārā', meaning: 'star' },
  'a-18': { word: 'दीप', iast: 'dīpa', meaning: 'lamp / light' },
  'a-19': { word: 'नम', iast: 'nama', meaning: 'name / bow' },
  'a-20': { word: 'पुष्प', iast: 'puṣpa', meaning: 'flower' },
  'a-21': { word: 'मन', iast: 'mana', meaning: 'mind' },
  'a-22': { word: 'योग', iast: 'yoga', meaning: 'union / practice' },
  'a-23': { word: 'राम', iast: 'rāma', meaning: 'Rama' },
  'a-24': { word: 'वन', iast: 'vana', meaning: 'forest' },
  'a-25': { word: 'सत्य', iast: 'satya', meaning: 'truth' },
  'a-26': { word: 'हस्त', iast: 'hasta', meaning: 'hand' },
  'a-27': { word: 'शान्ति', iast: 'śānti', meaning: 'peace' },
  'a-28': { word: 'षट्', iast: 'ṣaṭ', meaning: 'six' },
  'a-29': { word: 'लक्ष्मी', iast: 'lakṣmī', meaning: 'Lakshmi (goddess)' },
  'a-30': { word: 'संस्कृत', iast: 'saṃskṛta', meaning: 'Sanskrit' },
  'a-31': { word: 'नमः', iast: 'namaḥ', meaning: 'salutation' },
}

const TABS = [
  { key: 'vowel',     label: 'Vowels',     labelSa: 'स्वर' },
  { key: 'consonant', label: 'Consonants', labelSa: 'व्यञ्जन' },
  { key: 'special',   label: 'Special',    labelSa: 'विशेष' },
]

// Stroke order arrow SVGs per character (start-point arrows as simple SVG)
function StrokeArrows({ id }) {
  // Simple numbered start-point indicators
  const arrows = {
    'a-01': [
      { x: 38, y: 52, label: '1' },
      { x: 62, y: 30, label: '2' },
      { x: 18, y: 30, label: '3' },
    ],
    'a-02': [
      { x: 35, y: 52, label: '1' },
      { x: 60, y: 30, label: '2' },
      { x: 75, y: 30, label: '3' },
      { x: 18, y: 30, label: '4' },
    ],
    'a-03': [
      { x: 42, y: 50, label: '1' },
      { x: 20, y: 30, label: '2' },
    ],
    'a-05': [
      { x: 50, y: 48, label: '1' },
      { x: 20, y: 30, label: '2' },
    ],
    'a-09': [
      { x: 38, y: 52, label: '1' },
      { x: 62, y: 48, label: '2' },
      { x: 18, y: 30, label: '3' },
    ],
  }
  const pts = arrows[id]
  if (!pts) return null

  return (
    <svg viewBox="0 0 100 100" className="stroke-arrows" aria-hidden>
      {pts.map(p => (
        <g key={p.label} transform={`translate(${p.x},${p.y})`}>
          <circle r="7" fill="var(--accent-gold, #c8a83c)" opacity="0.85"/>
          <text x="0" y="4" textAnchor="middle" fill="white"
                fontSize="8" fontFamily="sans-serif" fontWeight="bold">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function AnimatedChar({ char, playing, onAnimEnd }) {
  const svgRef = useRef(null)
  const textRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    if (!playing || !textRef.current) return
    // Compute perimeter length of the glyph outline via SVG stroke trick
    // We use a large dasharray so it covers any character length
    const el = textRef.current
    el.style.strokeDasharray = '3000'
    el.style.strokeDashoffset = '3000'
    el.style.fill = 'transparent'

    let start = null
    const duration = 2200 // ms

    function step(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      el.style.strokeDashoffset = String(3000 * (1 - progress))
      if (progress < 1) {
        animRef.current = requestAnimationFrame(step)
      } else {
        // Fade fill in
        el.style.transition = 'fill 0.4s ease'
        el.style.fill = 'var(--text-primary, #fff)'
        el.style.stroke = 'transparent'
        onAnimEnd?.()
      }
    }
    animRef.current = requestAnimationFrame(step)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [playing, char, onAnimEnd])

  return (
    <svg ref={svgRef} viewBox="0 0 100 110" className="char-svg" aria-hidden>
      {/* Ruled lines like a Devanagari practice sheet */}
      <line x1="10" y1="28" x2="90" y2="28" stroke="rgba(255,221,0,0.3)" strokeWidth="0.8"/>
      <line x1="10" y1="85" x2="90" y2="85" stroke="rgba(255,221,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
      {/* Ghost character */}
      <text x="50" y="82" textAnchor="middle"
            fontFamily="'Noto Sans Devanagari', serif"
            fontSize="68" fill="rgba(255,221,0,0.08)">
        {char}
      </text>
      {/* Animated character */}
      <text ref={textRef} x="50" y="82" textAnchor="middle"
            fontFamily="'Noto Sans Devanagari', serif"
            fontSize="68"
            fill={playing ? 'transparent' : 'var(--text-primary, #fff)'}
            stroke="var(--gold, #ffdd00)"
            strokeWidth="1.5"
            strokeDasharray="3000"
            strokeDashoffset={playing ? '3000' : '0'}>
        {char}
      </text>
    </svg>
  )
}

function LetterModal({ card, onClose, onPrev, onNext }) {
  const [animKey, setAnimKey] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [animDone, setAnimDone] = useState(false)
  const { speak, speaking } = useSpeech()
  const hint = STROKE_HINTS[card.id]
  const ex = EXAMPLES[card.id]

  const handlePlay = useCallback(() => {
    setAnimKey(k => k + 1)
    setAnimating(true)
    setAnimDone(false)
    speak(card.devanagari)
  }, [card.devanagari, speak])

  // Auto-play on open
  useEffect(() => {
    const t = setTimeout(handlePlay, 150)
    return () => clearTimeout(t)
  }, [card.id]) // eslint-disable-line

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNext, onPrev])

  return (
    <div className="letter-modal-backdrop" onClick={onClose}>
      <div className="letter-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-nav modal-nav--prev" onClick={onPrev} aria-label="Previous">‹</div>
        <div className="modal-nav modal-nav--next" onClick={onNext} aria-label="Next">›</div>

        <div className="modal-char-area">
          <AnimatedChar
            key={animKey}
            char={card.devanagari}
            playing={animating}
            onAnimEnd={() => { setAnimating(false); setAnimDone(true) }}
          />
          <StrokeArrows id={card.id} />
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
            aria-label="Listen"
          >
            {speaking ? '🔊' : '🔉'} Listen
          </button>
          <button className="btn-replay" onClick={handlePlay} aria-label="Replay animation">
            ↺ Replay
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AlphabetLearnPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('vowel')
  const [selected, setSelected] = useState(null)

  const filtered = ALPHABET_CARDS.filter(c => c.type === tab)
  const allVisible = ALPHABET_CARDS.filter(c => c.type === tab)

  const selectedIdx = selected ? allVisible.findIndex(c => c.id === selected.id) : -1

  const handlePrev = useCallback(() => {
    if (selectedIdx > 0) setSelected(allVisible[selectedIdx - 1])
  }, [selectedIdx, allVisible])

  const handleNext = useCallback(() => {
    if (selectedIdx < allVisible.length - 1) setSelected(allVisible[selectedIdx + 1])
  }, [selectedIdx, allVisible])

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
          <button
            key={t.key}
            className={`alpha-tab ${tab === t.key ? 'alpha-tab--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="tab-sa">{t.labelSa}</span>
            <span className="tab-en">{t.label}</span>
          </button>
        ))}
      </nav>

      <p className="alpha-hint">Tap a letter to see how it's written and hear its sound.</p>

      <div className={`alpha-grid alpha-grid--${tab}`}>
        {filtered.map(card => (
          <button
            key={card.id}
            className="alpha-card"
            onClick={() => setSelected(card)}
            aria-label={`${card.devanagari} — ${card.iast}`}
          >
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
