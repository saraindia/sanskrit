import React from 'react'
import { Link } from 'react-router-dom'
import { BHAGAVAD_GITA } from '../data/sacred.js'
import './Hub.css'

const ITEMS = [
  {
    to:    '/gita',
    icon:  '🪷',
    label: 'Bhagavad Gītā',
    dev:   'भगवद्गीता',
    sub:   `18 chapters · ${BHAGAVAD_GITA.length} verses`,
  },
  {
    to:    '/upanishads',
    icon:  '🕉️',
    label: 'Upaniṣads',
    dev:   'उपनिषद्',
    sub:   'Īśa · Kena · Kaṭha · Muṇḍaka',
  },
  {
    to:    '/upanishads?text=brahmasutra',
    icon:  '📿',
    label: 'Brahmasūtras',
    dev:   'ब्रह्मसूत्राणि',
    sub:   '4 adhyāyas · 510 sūtras',
  },
]

export default function TextsHub() {
  return (
    <div className="hub-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Sacred Texts</h1>
        <p className="page-subtitle">ग्रन्थाः · Choose a text to study</p>
      </div>
      <div className="study-sq-grid">
        {ITEMS.map((item, i) => (
          <Link key={item.to} to={item.to} className="study-sq-card">
            <span className="study-sq-num">{i + 1}</span>
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
