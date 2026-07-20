import React from 'react'
import { Link } from 'react-router-dom'
import { BHAGAVAD_GITA } from '../data/sacred.js'
import './Hub.css'

const ITEMS = [
  { to: '/gita',         icon: '🪷',  label: 'Bhagavad Gītā',      dev: 'भगवद्गीता',       sub: `18 chapters · ${BHAGAVAD_GITA.length} verses`,  color: '#f59e0b' },
  { to: '/ramayana',     icon: '🏹',  label: 'Vālmīki Rāmāyaṇa',  dev: 'वाल्मीकिरामायणम्', sub: '6 kāṇḍas · 19,730 verses',                     color: '#f97316' },
  { to: '/upanishads',   icon: '🕉️', label: 'Upaniṣads',          dev: 'उपनिषद्',          sub: 'Īśa · Kena · Kaṭha · Muṇḍaka',                 color: '#a855f7' },
  { to: '/brahmasutras', icon: '📿',  label: 'Brahmasūtras',       dev: 'ब्रह्मसूत्राणि',   sub: '4 adhyāyas · 510 sūtras',                       color: '#34d399' },
  { to: '/yogasutras',   icon: '🧘',  label: 'Yoga Sūtras',        dev: 'योगसूत्राणि',       sub: '4 pādas · 196 sūtras · Patañjali',              color: '#06b6d4' },
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
