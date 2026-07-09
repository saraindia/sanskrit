import React from 'react'
import { Link } from 'react-router-dom'
import { BHAGAVAD_GITA } from '../data/sacred.js'
import './Hub.css'

const ITEMS = [
  {
    to:    '/gita',
    icon:  '🪷',
    label: 'Bhagavad Gītā',
    sub:   'The song of the Lord — Krishna & Arjuna',
    meta:  `18 chapters · ${BHAGAVAD_GITA.length} verses`,
    level: 'advanced',
  },
  {
    to:    '/upanishads',
    icon:  '🕉️',
    label: 'Upaniṣads',
    sub:   'Principal texts with word-by-word commentary',
    meta:  'Īśa · Kena · Kaṭha · Muṇḍaka and more',
    level: 'advanced',
  },
  {
    to:    '/upanishads?text=brahmasutra',
    icon:  '📿',
    label: 'Brahmasūtras',
    sub:   'Vedānta Sūtras of Bādarāyaṇa — systematising the Upaniṣads',
    meta:  '4 adhyāyas · 510 sūtras · Thibaut translation',
    level: 'advanced',
  },
]

export default function TextsHub() {
  return (
    <div className="hub-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Sacred Texts</h1>
        <p className="page-subtitle">Choose a text to study</p>
      </div>
      <div className="hub-list">
        {ITEMS.map(item => (
          <Link key={item.to} to={item.to} className="hub-item hub-item--large">
            <span className="hub-item-icon hub-item-icon--lg">{item.icon}</span>
            <div className="hub-item-text">
              <div className="hub-item-label">{item.label}</div>
              <div className="hub-item-sub">{item.sub}</div>
              <div className="hub-item-count">{item.meta}</div>
            </div>
            <span className={`pill pill-${item.level}`}>{item.level}</span>
            <span className="hub-item-chevron">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
