import React, { useState, useEffect, useRef, useCallback } from 'react'
import { VOCABULARY } from '../data/vocabulary.js'
import { useSpeech } from '../hooks/useSpeech'
import './ClickableSentence.css'

// Build a lookup: try exact match, then prefix match on devanagari stem
function lookupWord(raw) {
  // Strip punctuation: ।,।,.
  const word = raw.replace(/[।॥.,!?]/g, '').trim()
  if (!word) return null

  // Exact match
  let entry = VOCABULARY.find(v => v.devanagari === word)
  if (entry) return entry

  // Prefix match — vocab stem appears at the start of the inflected form
  // e.g. राम matches रामः, रामं; गच्छति exact; बाल matches बालः, बालं, बाले
  entry = VOCABULARY.find(v => word.startsWith(v.devanagari) && v.devanagari.length >= 2)
  if (entry) return entry

  // Reverse: word is a prefix of vocab entry (for short stems)
  entry = VOCABULARY.find(v => v.devanagari.startsWith(word) && word.length >= 2)
  return entry || null
}

function WordChip({ token, onClose, activeToken, setActiveToken }) {
  const { speak } = useSpeech()
  const ref = useRef(null)
  const isActive = activeToken === token.key

  const entry = lookupWord(token.word)
  const isPunctuation = /^[।॥.,!? ]+$/.test(token.word)

  const handleClick = useCallback(() => {
    if (isPunctuation) return
    speak(token.word)
    setActiveToken(isActive ? null : token.key)
  }, [isPunctuation, isActive, token, speak, setActiveToken])

  // Close on outside click
  useEffect(() => {
    if (!isActive) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActiveToken(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isActive, setActiveToken])

  if (isPunctuation) return <span className="word-punct">{token.word}</span>

  return (
    <span className={`word-chip ${isActive ? 'active' : ''} ${entry ? 'has-meaning' : ''}`}
      ref={ref} onClick={handleClick}>
      {token.word}
      {isActive && (
        <span className="word-tooltip" onClick={e => e.stopPropagation()}>
          <span className="tooltip-word">{token.word}</span>
          {entry ? (
            <>
              <span className="tooltip-iast">{entry.iast}</span>
              <span className="tooltip-english">{entry.english}</span>
              {entry.pos && <span className="tooltip-pos">{entry.pos}</span>}
            </>
          ) : (
            <span className="tooltip-english" style={{opacity:0.6}}>tap to hear</span>
          )}
        </span>
      )}
    </span>
  )
}

export default function ClickableSentence({ text, className = '' }) {
  const [activeToken, setActiveToken] = useState(null)

  // Split on spaces, keep punctuation attached to preceding word
  const tokens = text.trim().split(/\s+/).map((w, i) => ({ word: w, key: i }))

  return (
    <span className={`clickable-sentence ${className}`}>
      {tokens.map((token, i) => (
        <React.Fragment key={token.key}>
          <WordChip
            token={token}
            activeToken={activeToken}
            setActiveToken={setActiveToken}
          />
          {i < tokens.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  )
}
