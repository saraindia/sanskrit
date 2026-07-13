import React, { useState, useEffect, useCallback } from 'react'
import HubBack from '../components/HubBack'
import './SanskritCoursePage.css'

// ── Course data ───────────────────────────────────────────────────────────────
const WEEKS = [
  {
    week: 1,
    title: 'Foundations',
    titleDev: 'आधारः',
    desc: 'First words, basic greetings, simple sentences',
    color: '#f59e0b',
    days: [
      { day: 1,  id: 'giDplHSKeoE', title: 'Introduction — Speak Simple Sanskrit',    dur: '38:19' },
      { day: 2,  id: 'lUXJKJBmkWk', title: 'Greetings & Common Words',               dur: '30:11' },
      { day: 3,  id: 'zVEXFgiG4lA', title: 'Simple Sentences & Verbs',               dur: '27:02' },
      { day: 4,  id: 'mIUW97GY6_c', title: 'Nouns & Basic Pronouns',                 dur: '33:35' },
      { day: 5,  id: 'RT2S0bmzGW8', title: 'Questions & Answers',                    dur: '30:33' },
      { day: 6,  id: 'TIca_Q117Sw', title: 'Daily Conversation Practice',            dur: '31:36' },
      { day: 7,  id: 'n-TW_I8LO-c', title: 'Week 1 Review — Consolidation',         dur: '36:24' },
    ],
  },
  {
    week: 2,
    title: 'Building Sentences',
    titleDev: 'वाक्यनिर्माणम्',
    desc: 'Expand vocabulary, form complete sentences',
    color: '#34d399',
    days: [
      { day: 8,  id: '52qTfKgJ-ck', title: 'More Verbs — Present Tense',            dur: '34:15' },
      { day: 9,  id: 'JQpt7aSoe88', title: 'Adjectives & Descriptions',             dur: '45:49' },
      { day: 10, id: 'jKMiEjl9lZ0', title: 'Numbers & Counting',                    dur: '36:47' },
      { day: 11, id: 'RXD2AH060MY', title: 'Time, Days & Months',                   dur: '40:31' },
      { day: 12, id: 'lCDajs07zNk', title: 'Family & Relationships',                dur: '37:15' },
      { day: 13, id: 'F5axi98dhNY', title: 'Places & Directions',                   dur: '36:32' },
      { day: 14, id: 'ljbaq4xamVM', title: 'Week 2 Review — Story Practice',        dur: '35:52' },
    ],
  },
  {
    week: 3,
    title: 'Grammar Essentials',
    titleDev: 'व्याकरणम्',
    desc: 'Cases (vibhakti), past tense, more verb forms',
    color: '#60a5fa',
    days: [
      { day: 15, id: 'GEOvIrgoc6Q', title: 'Nominative & Accusative Cases',         dur: '29:01' },
      { day: 16, id: 'YoZddV_UM9E', title: 'Instrumental & Dative Cases',           dur: '22:38' },
      { day: 17, id: 'LAushV6Ky-0', title: 'Past Tense — Laṅ Lakāra',              dur: '34:59' },
      { day: 18, id: 'IelofQKeqo0', title: 'Future Tense — Lṛṭ Lakāra',           dur: '11:10' },
      { day: 19, id: 'uR3KwaMPOl8', title: 'Sandhi — Sound Combination Rules',      dur: '18:15' },
      { day: 20, id: '78lTpGo7iUM', title: 'Compound Words — Samāsa',              dur: '19:28' },
      { day: 21, id: 'thFK40FrAfM', title: 'Week 3 Review — Grammar in Context',   dur: '42:03' },
    ],
  },
  {
    week: 4,
    title: 'Advanced Forms',
    titleDev: 'उन्नतरूपाणि',
    desc: 'Dual, plural, ātmanepada verbs, more cases',
    color: '#a855f7',
    days: [
      { day: 22, id: 'MZt_bK2Wj8k', title: 'Genitive & Locative Cases',            dur: '21:15' },
      { day: 23, id: 'XG1E_jzm3F4', title: 'तव्यत् / अनीयर् — Obligation Forms', dur: '23:35' },
      { day: 24, id: 'gnn9cSjLDjo', title: 'द्वितीयाविभक्तिः · Ātmanepada',      dur: '33:01' },
      { day: 25, id: 'E1DJWiRXu0U', title: 'षष्ठीविभक्तिः · Verb Classification', dur: '31:43' },
      { day: 26, id: 'ivdAnaRRjWs', title: 'बहुवचनरूपाणि — Plural Forms',         dur: '32:48' },
      { day: 27, id: 'MdVPHOnZ8EQ', title: 'द्विवचनम् — Dual Number',             dur: '37:45' },
      { day: 28, id: 'BePhMYTbSjg', title: 'द्विवचनम् — Dual Pronouns',           dur: '21:38' },
    ],
  },
  {
    week: 5,
    title: 'Mastery',
    titleDev: 'निष्णातता',
    desc: 'Complete the series — avyaya, pratyaya, upasarga',
    color: '#ec4899',
    days: [
      { day: 29, id: 'pkn7qFK33TU', title: 'Dual Pronouns — Part 2',               dur: '28:47' },
      { day: 30, id: 'JueV4_XWcX8', title: 'द्विवचन — Verb Forms',                dur: '32:38' },
      { day: 31, id: 'eKjUhra3obg', title: 'आत्मनेपदिरूपाणि — Ātmanepada Forms', dur: '26:25' },
      { day: 32, id: 'OvlO1bmCass', title: 'रोचते · रोचन्ते — Special Verbs',     dur: '14:11' },
      { day: 33, id: 'puaM3oZZ3Cw', title: 'अव्ययम् · प्रत्ययः · उपसर्गः — Series End', dur: '32:41' },
    ],
  },
]

const ALL_DAYS = WEEKS.flatMap(w => w.days)
const STORAGE_KEY = 'sanskrit_course_done'

function loadDone() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) }
  catch { return new Set() }
}
function saveDone(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <polygon points="2,1 11,6 2,11" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2,6 5,9 10,3" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 3h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 3v15M7 7h1.5M7 10h1.5M7 13h1.5M12.5 7H14M12.5 10H14M12.5 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SanskritCoursePage() {
  const [done, setDone]         = useState(loadDone)
  const [activeDay, setActiveDay] = useState(null)   // day number currently playing
  const [openWeeks, setOpenWeeks] = useState(() => new Set())

  const total     = ALL_DAYS.length
  const doneCount = done.size
  const pct       = Math.round((doneCount / total) * 100)

  // Auto-open week of active day
  useEffect(() => {
    if (activeDay == null) return
    const week = WEEKS.find(w => w.days.some(d => d.day === activeDay))
    if (week) setOpenWeeks(prev => new Set([...prev, week.week]))
  }, [activeDay])

  const toggleDone = useCallback((day) => {
    setDone(prev => {
      const next = new Set(prev)
      next.has(day) ? next.delete(day) : next.add(day)
      saveDone(next)
      return next
    })
  }, [])

  const toggleWeek = useCallback((w) => {
    setOpenWeeks(prev => {
      const next = new Set(prev)
      next.has(w) ? next.delete(w) : next.add(w)
      return next
    })
  }, [])

  const activeDayObj = activeDay != null ? ALL_DAYS.find(d => d.day === activeDay) : null
  const activeWeek   = activeDay != null ? WEEKS.find(w => w.days.some(d => d.day === activeDay)) : null

  // Next unwatched lesson for "Continue" button
  const nextDay = ALL_DAYS.find(d => !done.has(d.day))

  return (
    <div className="course-page anim-fade-up">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <HubBack to="/study" label="Study" />

      <div className="course-header">
        <div className="course-header-icon"><BookIcon /></div>
        <div>
          <h1 className="course-title">Sanskrit in 33 Days</h1>
          <p className="course-subtitle">संस्कृतम् — Speak Simple Sanskrit · by Ashok</p>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────────── */}
      <div className="course-progress-card">
        <div className="course-progress-row">
          <span className="course-progress-label">{doneCount} of {total} lessons complete</span>
          <span className="course-progress-pct">{pct}%</span>
        </div>
        <div className="course-progress-bar">
          <div className="course-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="course-progress-weeks">
          {WEEKS.map(w => {
            const weekDone = w.days.filter(d => done.has(d.day)).length
            const weekPct  = Math.round((weekDone / w.days.length) * 100)
            return (
              <div key={w.week} className="course-week-pip" title={`Week ${w.week}: ${weekDone}/${w.days.length}`}>
                <div className="course-week-pip-fill" style={{ height: `${weekPct}%`, background: w.color }} />
              </div>
            )
          })}
        </div>
        {nextDay && (
          <button
            className="course-continue-btn"
            onClick={() => setActiveDay(nextDay.day)}
          >
            {doneCount === 0 ? '▶ Start Course' : `▶ Continue — Day ${nextDay.day}`}
          </button>
        )}
        {doneCount === total && (
          <div className="course-complete-badge">🎉 Course Complete! सम्पूर्णम्</div>
        )}
      </div>

      {/* ── Active player ─────────────────────────────────────────────────── */}
      {activeDayObj && (
        <div className="course-player-card" style={{ '--week-color': activeWeek?.color ?? '#f59e0b' }}>
          <div className="course-player-meta">
            <span className="course-player-week" style={{ color: activeWeek?.color }}>
              Week {activeWeek?.week} · {activeWeek?.title}
            </span>
            <span className="course-player-day">Day {activeDayObj.day} of {total}</span>
            <button className="course-player-close" onClick={() => setActiveDay(null)} aria-label="Close player">✕</button>
          </div>
          <div className="course-player-title">{activeDayObj.title}</div>
          <div className="course-video-wrap">
            <iframe
              key={activeDayObj.id}
              className="course-video"
              src={`https://www.youtube.com/embed/${activeDayObj.id}?autoplay=1&rel=0`}
              title={`Day ${activeDayObj.day}: ${activeDayObj.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="course-player-actions">
            <button
              className={`course-done-btn ${done.has(activeDayObj.day) ? 'done' : ''}`}
              onClick={() => toggleDone(activeDayObj.day)}
              style={done.has(activeDayObj.day) ? { background: activeWeek?.color, borderColor: activeWeek?.color } : { borderColor: activeWeek?.color, color: activeWeek?.color }}
            >
              <CheckIcon />
              {done.has(activeDayObj.day) ? 'Completed' : 'Mark as Done'}
            </button>
            {/* Next lesson */}
            {(() => {
              const idx  = ALL_DAYS.findIndex(d => d.day === activeDayObj.day)
              const next = ALL_DAYS[idx + 1]
              return next ? (
                <button className="course-next-btn" onClick={() => setActiveDay(next.day)}>
                  Next: Day {next.day} →
                </button>
              ) : null
            })()}
          </div>
        </div>
      )}

      {/* ── Week accordions ───────────────────────────────────────────────── */}
      <div className="course-weeks">
        {WEEKS.map(w => {
          const isOpen    = openWeeks.has(w.week)
          const weekDone  = w.days.filter(d => done.has(d.day)).length
          const allDone   = weekDone === w.days.length
          return (
            <div key={w.week} className="course-week-section" style={{ '--wc': w.color }}>
              <button className="course-week-hdr" onClick={() => toggleWeek(w.week)}>
                <span className="course-week-badge" style={{ background: `${w.color}22`, border: `1.5px solid ${w.color}55`, color: w.color }}>
                  {allDone ? <CheckIcon /> : `W${w.week}`}
                </span>
                <div className="course-week-info">
                  <span className="course-week-name" style={{ color: w.color }}>{w.title}</span>
                  <span className="course-week-dev devanagari">{w.titleDev}</span>
                  <span className="course-week-desc">{w.desc}</span>
                </div>
                <div className="course-week-right">
                  <span className="course-week-count">{weekDone}/{w.days.length}</span>
                  <span className="course-week-arrow" style={{ color: w.color }}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>

              {isOpen && (
                <div className="course-week-days">
                  {w.days.map(d => {
                    const isPlaying  = activeDay === d.day
                    const isDone     = done.has(d.day)
                    return (
                      <button
                        key={d.day}
                        className={`course-day-row ${isPlaying ? 'playing' : ''} ${isDone ? 'done' : ''}`}
                        style={isPlaying ? { background: `${w.color}15`, borderLeft: `3px solid ${w.color}` } : undefined}
                        onClick={() => setActiveDay(d.day)}
                      >
                        <span
                          className={`course-day-check ${isDone ? 'checked' : ''}`}
                          style={isDone ? { background: w.color, borderColor: w.color } : { borderColor: `${w.color}66` }}
                          onClick={e => { e.stopPropagation(); toggleDone(d.day) }}
                          role="checkbox"
                          aria-checked={isDone}
                          tabIndex={0}
                          onKeyDown={e => e.key === ' ' && (e.preventDefault(), e.stopPropagation(), toggleDone(d.day))}
                        >
                          {isDone && <CheckIcon />}
                        </span>
                        <span className="course-day-num" style={{ color: w.color }}>Day {d.day}</span>
                        <span className="course-day-title">{d.title}</span>
                        <span className="course-day-dur">{d.dur}</span>
                        <span className="course-day-play" style={{ color: isPlaying ? w.color : undefined }}>
                          {isPlaying ? '▶' : <PlayIcon />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="course-footer">
        <p>Course by <strong>Ashok</strong> · <a className="course-footer-link" href="https://www.youtube.com/@SanskritToday" target="_blank" rel="noopener noreferrer">Sanskrit.Today</a> · 36 original videos</p>
        <p>Videos are the intellectual property of their respective creators and are streamed directly from <strong>YouTube</strong>. Sanskritly does not host, copy, or redistribute this content. Viewing is subject to <a className="course-footer-link" href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</a> and the creator's rights.</p>
        <p style={{ marginTop: '0.5rem' }}>To support the creator, <a className="course-footer-link" href="https://www.youtube.com/playlist?list=PL8hlzSD3smGgf8BA3XcWMUlgB1tsoYyD-" target="_blank" rel="noopener noreferrer">visit the original playlist ↗</a></p>
      </div>
    </div>
  )
}
