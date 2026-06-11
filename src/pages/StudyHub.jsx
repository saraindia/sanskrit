import React from 'react'
import { Link } from 'react-router-dom'
import { useVocabularyData, useSentenceData } from '../hooks/useData'
import './Hub.css'

const ITEMS = [
  {
    to:    '/flashcards',
    icon:  '🗂️',
    label: 'Flashcards',
    sub:   'Script · vocabulary · SRS review',
    level: 'beginner',
  },
  {
    to:    '/drill',
    icon:  '⚡',
    label: 'Sentence Drill',
    sub:   'Verb · noun · pronoun patterns',
    level: 'intermediate',
  },
  {
    to:    '/fill',
    icon:  '✏️',
    label: 'Fill in the Blanks',
    sub:   'Grammar & vocabulary practice',
    level: 'intermediate',
  },
  {
    to:    '/match',
    icon:  '🔡',
    label: 'Match Pairs',
    sub:   'Sanskrit ↔ English matching',
    level: 'beginner',
  },
]

export default function StudyHub() {
  const vocabData = useVocabularyData()
  const sentData  = useSentenceData()
  const vocabCount = vocabData?.vocabulary?.length ?? '…'
  const sentCount  = (sentData?.vnp_sentences?.length ?? 0) + (sentData?.collated_sentences?.length ?? 0) || '…'
  const fillCount  = sentData?.fill_blanks?.length ?? '…'

  const counts = {
    '/flashcards': `${vocabData?.alphabet_cards?.length ?? 31} script + ${vocabCount} words`,
    '/drill':      `${sentCount} sentences`,
    '/fill':       `${fillCount} exercises`,
    '/match':      'Adaptive rounds',
  }

  return (
    <div className="hub-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Study</h1>
        <p className="page-subtitle">Choose a practice mode</p>
      </div>
      <div className="hub-list">
        {ITEMS.map(item => (
          <Link key={item.to} to={item.to} className="hub-item">
            <span className="hub-item-icon">{item.icon}</span>
            <div className="hub-item-text">
              <div className="hub-item-label">{item.label}</div>
              <div className="hub-item-sub">{item.sub}</div>
              <div className="hub-item-count">{counts[item.to]}</div>
            </div>
            <span className={`pill pill-${item.level}`}>{item.level}</span>
            <span className="hub-item-chevron">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
