import React from 'react'
import { Link } from 'react-router-dom'
import { useVocabularyData, useSentenceData } from '../hooks/useData'
import { LESSONS } from '../data/grammar.js'
import './Hub.css'

export default function StudyHub() {
  const vocabData = useVocabularyData()
  const sentData  = useSentenceData()
  const vocabCount = vocabData?.vocabulary?.length ?? '…'
  const sentCount  = (sentData?.vnp_sentences?.length ?? 0) + (sentData?.collated_sentences?.length ?? 0) || '…'
  const fillCount  = sentData?.fill_blanks?.length ?? '…'

  const ITEMS = [
    { to: '/grammar',    icon: '🔠', label: 'Grammar',         dev: 'व्याकरणम्',    sub: `${LESSONS.length} lessons`,  color: '#f59e0b' },
    { to: '/flashcards', icon: '🗂️', label: 'Flashcards',    dev: 'स्मृतिकार्डाः', sub: `${vocabCount} words`,       color: '#60a5fa' },
    { to: '/drill',      icon: '⚡',  label: 'Sentence Drill',dev: 'वाक्याभ्यासः', sub: `${sentCount} sentences`,    color: '#34d399' },
    { to: '/fill',       icon: '✏️', label: 'Fill in Blanks', dev: 'रिक्तस्थानम्', sub: `${fillCount} exercises`,   color: '#ec4899' },
    { to: '/match',      icon: '🔡', label: 'Match Pairs',    dev: 'मेलनम्',       sub: 'Adaptive rounds',            color: '#a855f7' },
    { to: '/course',     icon: '🎬', label: 'Sanskrit in 33 Days', dev: 'संस्कृतम्', sub: '5 weeks · 33 lessons',  color: '#14b8a6' },
  ]

  return (
    <div className="hub-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Study</h1>
        <p className="page-subtitle">अभ्यासः · Choose a practice mode</p>
      </div>
      <div className="study-sq-grid">
        {ITEMS.map((item, i) => (
          <Link key={item.to} to={item.to} className="study-sq-card">
            <span className="study-sq-num" style={{ color: item.color, background: `${item.color}22`, borderColor: `${item.color}44` }}>{i + 1}</span>
            <span className="study-sq-icon">{item.icon}</span>
            <span className="study-sq-label">{item.label}</span>
            <span className="study-sq-dev">{item.dev}</span>
            <span className="study-sq-sub">{item.sub}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
