import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSpeech } from '../hooks/useSpeech'
import { toIAST } from '../utils/transliterate.js'
import './ClickableSentence.css'

function lookupWord(raw, vocabulary) {
  const word = raw.replace(/[।॥.,!?]/g, '').trim()
  if (!word || !vocabulary) return null
  let entry = vocabulary.find(v => v.devanagari === word)
  if (entry) return entry
  entry = vocabulary.find(v => word.startsWith(v.devanagari) && v.devanagari.length >= 2)
  if (entry) return entry
  entry = vocabulary.find(v => v.devanagari.startsWith(word) && word.length >= 2)
  return entry || null
}

function WordChip({ token, vocabulary, onClose, activeToken, setActiveToken }) {
  const { speak } = useSpeech()
  const ref = useRef(null)
  const isActive = activeToken === token.key

  const entry = lookupWord(token.word, vocabulary)
  const isPunctuation = /^[।॥.,!? ]+$/.test(token.word)

  const handleClick = useCallback(() => {
    if (isPunctuation) return
    speak(token.word)
    setActiveToken(isActive ? null : token.key)
  }, [isPunctuation, isActive, token, speak, setActiveToken])

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
          <span className="tooltip-iast">{entry?.iast || toIAST(token.word.replace(/[।॥.,!?]/g, ''))}</span>
          {entry ? (
            <>
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

export default function ClickableSentence({ text, vocabulary, className = '' }) {
  const [activeToken, setActiveToken] = useState(null)
  const tokens = text.trim().split(/\s+/).map((w, i) => ({ word: w, key: i }))

  return (
    <span className={`clickable-sentence ${className}`}>
      {tokens.map((token, i) => (
        <React.Fragment key={token.key}>
          <WordChip token={token} vocabulary={vocabulary} activeToken={activeToken} setActiveToken={setActiveToken} />
          {i < tokens.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  )
}
