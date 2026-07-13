import React, { useState } from 'react'
import './VarnamalaPage.css'

const PLAYLIST_ID = 'PLFLFOfuyaIHvExkYbtlMM_mS1m5yRZtO2'

const VIDEOS = [
  { id: 'oQmoh-z-gGc', ep: 1,  title: 'Master the Sanskrit sounds',              sub: 'Introduction to Varṇamālā' },
  { id: 'ggvH7NMOLgE', ep: 2,  title: 'Learn to write the Devanagari script',    sub: 'Lipi — the script' },
  { id: '5I6tj35JTtU', ep: 3,  title: 'Sanskrit Vowels: The Pluta Svaras',       sub: 'Extended vowels explained' },
  { id: 'ukMPpQx4p8c', ep: 4,  title: 'Vedic Intonations of Vowels',             sub: 'Udātta · Anudātta · Svarita' },
  { id: 'uEFUZg5NoII', ep: 5,  title: 'The Sanskrit Consonants',                 sub: 'Vyañjana classification' },
  { id: 'QFBF8okMvV4', ep: 6,  title: 'Ayogavāha Explained',                     sub: 'Anusvāra · Visarga · more' },
  { id: 'UTOvQfty0l0', ep: 7,  title: 'Writing Sanskrit Consonants',             sub: 'Devanagari stroke order' },
  { id: '3aKT5cv1bpc', ep: 8,  title: 'Science of Sanskrit Sounds',              sub: 'Phonetic principles' },
  { id: 'iwVi7v4WlyY', ep: 9,  title: 'Proper Pronunciation of Nasal Sounds',   sub: 'Pañca-nāsikya varṇas' },
  { id: 'Dhzj08exVGg', ep: 10, title: 'Anusvāra vs Makāra',                      sub: 'A common confusion cleared' },
  { id: 'MfTjAHAZtnM', ep: 11, title: 'Karaṇam — Position of the Tongue',       sub: 'Articulation points' },
  { id: 'AiiMtFipaCM', ep: 12, title: 'Difference between श, ष and स',           sub: 'Three sibilants of Sanskrit' },
  { id: 'ZUUM8SxjPbc', ep: 13, title: 'Difference between ण and न',              sub: 'Retroflex vs dental na' },
  { id: 'AWCQ50K1FB0', ep: 14, title: 'Yamavarna',                               sub: 'Semi-vowel class explained' },
  { id: 'GBIGS4ogtTE', ep: 15, title: 'Number of Alphabets in Saṃskṛtam',       sub: 'Counting the varṇas' },
]

export default function VarnamalaPage() {
  const [active, setActive] = useState(null)

  const open  = (id) => setActive(id)
  const close = () => setActive(null)

  return (
    <div className="varna-page anim-fade-up">
      <div className="page-header">
        <h1 className="page-title">Varṇamālā Series</h1>
        <p className="page-subtitle">वर्णमाला · Sanskrit sounds &amp; script · 15 episodes · Tattvam</p>
      </div>

      <div className="varna-grid">
        {VIDEOS.map(v => (
          <button key={v.id} className="varna-card" onClick={() => open(v.id)}>
            <div className="varna-thumb-wrap">
              <img
                className="varna-thumb"
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.title}
                loading="lazy"
              />
              <span className="varna-play">▶</span>
              <span className="varna-ep">Ep {v.ep}</span>
            </div>
            <div className="varna-info">
              <p className="varna-title">{v.title}</p>
              <p className="varna-sub">{v.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <a
        className="varna-playlist-link"
        href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        ▶ Open full playlist on YouTube
      </a>

      {active && (
        <div className="varna-modal" onClick={close}>
          <div className="varna-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="varna-modal-close" onClick={close}>✕</button>
            <div className="varna-embed-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
                title="Sanskrit video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <p className="varna-modal-title">
              {VIDEOS.find(v => v.id === active)?.title}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
