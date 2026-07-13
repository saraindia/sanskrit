import React, { useState, useRef } from 'react'
import './VarnamalaPage.css'

const PLAYLIST_ID = 'PLFLFOfuyaIHvExkYbtlMM_mS1m5yRZtO2'

const GROUPS = [
  {
    label: 'Sounds & Script',
    sub: 'Foundations · Ep 1–5',
    videos: [
      { id: 'oQmoh-z-gGc',  ep: 1,  title: 'Master the Sanskrit sounds',                sub: 'Introduction to Varṇamālā' },
      { id: 'ggvH7NMOLgE',  ep: 2,  title: 'Learn to write the Devanagari script',      sub: 'Lipi — the script' },
      { id: '5I6tj35JTtU',  ep: 3,  title: 'Sanskrit Vowels: The Pluta Svaras',         sub: 'Extended vowels explained' },
      { id: 'ukMPpQx4p8c',  ep: 4,  title: 'Vedic Intonations of Vowels',               sub: 'Udātta · Anudātta · Svarita' },
      { id: 'uEFUZg5NoII',  ep: 5,  title: 'The Sanskrit Consonants',                   sub: 'Vyañjana classification' },
    ],
  },
  {
    label: 'Special Characters',
    sub: 'Ayogavāha & Nasals · Ep 6–10',
    videos: [
      { id: 'QFBF8okMvV4',  ep: 6,  title: 'Ayogavāha Explained',                       sub: 'Anusvāra · Visarga · more' },
      { id: 'UTOvQfty0l0',  ep: 7,  title: 'Writing Sanskrit Consonants',               sub: 'Devanagari stroke order' },
      { id: '3aKT5cv1bpc',  ep: 8,  title: 'Science of Sanskrit Sounds',                sub: 'Phonetic principles' },
      { id: 'iwVi7v4WlyY',  ep: 9,  title: 'Proper Pronunciation of Nasal Sounds',      sub: 'Pañca-nāsikya varṇas' },
      { id: 'Dhzj08exVGg',  ep: 10, title: 'Anusvāra vs Makāra',                        sub: 'A common confusion cleared' },
    ],
  },
  {
    label: 'Articulation',
    sub: 'Tongue position & distinctions · Ep 11–15',
    videos: [
      { id: 'MfTjAHAZtnM',  ep: 11, title: 'Karaṇam — Position of the Tongue',         sub: 'Articulation points' },
      { id: 'AiiMtFipaCM',  ep: 12, title: 'Difference between श, ष and स',             sub: 'Three sibilants of Sanskrit' },
      { id: 'ZUUM8SxjPbc',  ep: 13, title: 'Difference between ण and न',                sub: 'Retroflex vs dental na' },
      { id: 'AWCQ50K1FB0',  ep: 14, title: 'Yamavarna',                                 sub: 'Semi-vowel class explained' },
      { id: 'GBIGS4ogtTE',  ep: 15, title: 'Number of Alphabets in Saṃskṛtam',         sub: 'Counting the varṇas' },
    ],
  },
  {
    label: 'Visarga & Combinations',
    sub: 'Advanced sounds · Ep 16–20',
    videos: [
      { id: '5d3EA2qCghs',  ep: 16, title: 'How to Pronounce Saṃskṛtam Correctly',     sub: 'Common mispronunciations fixed' },
      { id: 'bwy7YWAFH5M',  ep: 17, title: 'Consonant + Vowel Combinations',            sub: 'Pūrṇākṣaraṇi — full letters' },
      { id: 'kjhNYgGbksk',  ep: 18, title: 'Visarga Pronunciation in Sanskrit',         sub: 'The breath sound explained' },
      { id: 'QYpVUqQcJ_8',  ep: 19, title: 'How to Pronounce BRAHMA',                   sub: 'Sanskrit pronunciations you need' },
      { id: '14yoCuTle6A',  ep: 20, title: 'Visarga — 8 Modifications',                 sub: 'Jashtvam, Visarjaniya & more' },
    ],
  },
  {
    label: 'Sound Mastery',
    sub: 'Subtle & rare sounds · Ep 21–25',
    videos: [
      { id: 'ZYoAWjSo3Bc',  ep: 21, title: 'Avagraha in Sanskrit',                      sub: 'The S-shaped symbol mastered' },
      { id: 'p6a3bbmjM20',  ep: 22, title: 'Cracking the Code of कृ',                   sub: 'Sanskrit sound mastery' },
      { id: 'jVv4lT9dTIY',  ep: 23, title: 'Common Errors: Mastering द्य',              sub: 'Subtle sound distinctions' },
      { id: '-Mp1RODg9Mo',  ep: 24, title: 'Correct Pronunciation of ऌ',                sub: 'Unlocking ViṣṇuSahasranāma' },
      { id: 'nO6ZM4-1pyM',  ep: 25, title: 'How to Pronounce ज्ञ Correctly',            sub: 'jña — the most debated sound' },
    ],
  },
]

const ALL_VIDEOS = GROUPS.flatMap(g => g.videos)

export default function VarnamalaPage() {
  const [active, setActive] = useState(null)
  const [openGroups, setOpenGroups] = useState({ 0: true })
  const playerRef = useRef(null)

  const play = (id) => {
    setActive(id)
    setTimeout(() => {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const toggleGroup = (i) => setOpenGroups(prev => ({ ...prev, [i]: !prev[i] }))

  const activeVideo = ALL_VIDEOS.find(v => v.id === active)

  return (
    <div className="varna-page anim-fade-up">

      {/* ── Inline player ── */}
      <div ref={playerRef} className={`varna-player ${active ? 'varna-player--active' : ''}`}>
        {active && (
          <>
            <div className="varna-embed-wrap">
              <iframe
                key={active}
                src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0&cc_load_policy=0`}
                title={activeVideo?.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="varna-player-meta">
              <div>
                <p className="varna-player-title">{activeVideo?.title}</p>
                <p className="varna-player-sub">Ep {activeVideo?.ep} · {activeVideo?.sub}</p>
              </div>
              <button className="varna-player-close" onClick={() => setActive(null)}>✕ Close</button>
            </div>
          </>
        )}
      </div>

      <div className="page-header">
        <h1 className="page-title">Varṇamālā Series</h1>
        <p className="page-subtitle">वर्णमाला · Sanskrit sounds &amp; script · 25 episodes · Tattvam</p>
      </div>

      {/* ── Grouped accordion ── */}
      {GROUPS.map((group, gi) => (
        <div key={gi} className="varna-group">
          <button className="varna-group-header" onClick={() => toggleGroup(gi)}>
            <div className="varna-group-info">
              <span className="varna-group-label">{group.label}</span>
              <span className="varna-group-sub">{group.sub}</span>
            </div>
            <span className={`varna-group-chevron ${openGroups[gi] ? 'varna-group-chevron--open' : ''}`}>›</span>
          </button>
          {openGroups[gi] && (
            <div className="varna-grid">
              {group.videos.map(v => (
                <button
                  key={v.id}
                  className={`varna-card ${active === v.id ? 'varna-card--active' : ''}`}
                  onClick={() => play(v.id)}
                >
                  <div className="varna-thumb-wrap">
                    <img
                      className="varna-thumb"
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                      alt={v.title}
                      loading="lazy"
                    />
                    <span className="varna-play">{active === v.id ? '◼' : '▶'}</span>
                    <span className="varna-ep">Ep {v.ep}</span>
                  </div>
                  <div className="varna-info">
                    <p className="varna-title">{v.title}</p>
                    <p className="varna-sub">{v.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── Support & disclaimer ── */}
      <div className="varna-support">
        <p className="varna-support-title">🙏 Support Tattvam</p>
        <p className="varna-support-desc">
          This series is created by <strong>Shubha</strong>, a native Sanskrit speaker and teacher, through the <strong>Tattvam</strong> channel. If this series has helped your Sanskrit learning journey, consider supporting her work.
        </p>
        <div className="varna-support-btns">
          <a className="varna-donate-btn varna-donate-btn--razorpay" href="https://rzp.io/l/8H3kAnHJZj" target="_blank" rel="noopener noreferrer">
            🇮🇳 Donate (India)
          </a>
          <a className="varna-donate-btn varna-donate-btn--paypal" href="https://www.paypal.com/paypalme/tattvam" target="_blank" rel="noopener noreferrer">
            🌍 Donate via PayPal
          </a>
        </div>
        <p className="varna-disclaimer">
          Videos are embedded from the official <a href="https://www.youtube.com/@tattvam" target="_blank" rel="noopener noreferrer">Tattvam YouTube channel</a>. All content belongs to Tattvam · <a href="https://www.tattvam.org" target="_blank" rel="noopener noreferrer">tattvam.org</a>. Sanskritly is not affiliated with Tattvam. · <a href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`} target="_blank" rel="noopener noreferrer">▶ Open full playlist on YouTube</a>
        </p>
      </div>
    </div>
  )
}
