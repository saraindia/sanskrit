import React, { useState, useEffect, useCallback } from 'react'
import './PodcastPage.css'

const API_BASE = (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())
  ? 'https://sanskritly.vercel.app'
  : ''

// ─── Module-level singletons — survive tab navigation ───────────────────────
const _audio = typeof window !== 'undefined' ? new Audio() : null

let _cachedEpisodes    = []
let _cachedHasMore     = true
let _cachedCurrentIdx  = null
let _cachedPlaying     = false
let _cachedCurrentTime = 0
let _cachedDuration    = 0
let _cachedProgress    = 0

// ─── SVG icons ───────────────────────────────────────────────────────────────
function PlayIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <polygon points="2,1 11,6 2,11" />
    </svg>
  )
}
function PauseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="2" y="1" width="3" height="10" rx="1" />
      <rect x="7" y="1" width="3" height="10" rx="1" />
    </svg>
  )
}
function RadioIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
      <path d="M6.5 13.5a5 5 0 0 1 0-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M13.5 13.5a5 5 0 0 0 0-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M3.5 16.5a9 9 0 0 1 0-13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M16.5 16.5a9 9 0 0 0 0-13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function dayFromDateStr(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-IN', { weekday: 'short' })
}

function shortDate(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function fmtTime(s) {
  if (!isFinite(s)) return '0:00'
  const m   = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ─── Episode card ─────────────────────────────────────────────────────────────
function EpCard({ ep, idx, active, playing, onPress }) {
  const day  = dayFromDateStr(ep.date)
  const date = shortDate(ep.date)
  return (
    <button
      className={`pod-card ${active ? 'pod-card-active' : ''}`}
      onClick={onPress}
      aria-label={`${active && playing ? 'Pause' : 'Play'} ${ep.title}`}
    >
      <div className={`pod-card-btn ${active && playing ? 'pod-card-btn-playing' : ''}`}>
        {active && playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </div>
      <div className="pod-card-day">{day || '—'}</div>
      <div className="pod-card-date">{date}</div>
      {ep.time && <div className="pod-card-time">{ep.time}</div>}
      {active && playing && <div className="pod-card-wave"><span/><span/><span/><span/></div>}
    </button>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PodcastPage() {
  const [episodes,   setEpisodes]   = useState(_cachedEpisodes)
  const [loading,    setLoading]    = useState(_cachedEpisodes.length === 0)
  const [error,      setError]      = useState(null)

  const [currentIdx,  setCurrentIdx]  = useState(_cachedCurrentIdx)
  const [playing,     setPlaying]     = useState(_cachedPlaying)
  const [currentTime, setCurrentTime] = useState(_cachedCurrentTime)
  const [duration,    setDuration]    = useState(_cachedDuration)
  const [progress,    setProgress]    = useState(_cachedProgress)

  const fetchEpisodes = useCallback(async () => {
    try {
      const res  = await fetch(`${API_BASE}/api/akashvani`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      _cachedEpisodes = data.episodes
      _cachedHasMore  = data.hasMore
      setEpisodes(data.episodes)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (_cachedEpisodes.length === 0) fetchEpisodes()
  }, [fetchEpisodes])

  useEffect(() => {
    if (!_audio) return

    if (_cachedCurrentIdx !== null && _cachedCurrentTime > 0) {
      const ep = _cachedEpisodes[_cachedCurrentIdx]
      if (ep && _audio.src !== ep.audioUrl) {
        _audio.src = ep.audioUrl
        _audio.load()
      }
      const restoreTime = () => { _audio.currentTime = _cachedCurrentTime }
      _audio.addEventListener('loadedmetadata', restoreTime, { once: true })
    }

    const onTimeUpdate = () => {
      const ct  = _audio.currentTime
      const dur = _audio.duration || 0
      const prog = dur ? ct / dur : 0
      _cachedCurrentTime = ct
      _cachedDuration    = dur
      _cachedProgress    = prog
      setCurrentTime(ct)
      setDuration(dur)
      setProgress(prog)
    }
    const onEnded = () => {
      _cachedPlaying = false
      setPlaying(false)
      setCurrentIdx(i => {
        const next = (i ?? 0) + 1
        if (next < _cachedEpisodes.length) {
          setTimeout(() => startEpisode(next), 300)
          return next
        }
        return i
      })
    }
    const onPlay  = () => { _cachedPlaying = true;  setPlaying(true)  }
    const onPause = () => { _cachedPlaying = false; setPlaying(false) }

    _audio.addEventListener('timeupdate', onTimeUpdate)
    _audio.addEventListener('ended',      onEnded)
    _audio.addEventListener('play',       onPlay)
    _audio.addEventListener('pause',      onPause)

    return () => {
      if (!_audio.paused) _audio.pause()
      _cachedPlaying = false
      setPlaying(false)
      _audio.removeEventListener('timeupdate', onTimeUpdate)
      _audio.removeEventListener('ended',      onEnded)
      _audio.removeEventListener('play',       onPlay)
      _audio.removeEventListener('pause',      onPause)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startEpisode = (idx) => {
    const ep = _cachedEpisodes[idx]
    if (!ep || !_audio) return
    _cachedCurrentIdx  = idx
    _cachedCurrentTime = 0
    _cachedProgress    = 0
    setCurrentIdx(idx)
    setCurrentTime(0)
    setProgress(0)
    _audio.src = ep.audioUrl
    _audio.load()
    _audio.play().catch(console.error)
  }

  const togglePlay = () => {
    if (!_audio) return
    if (_audio.paused) _audio.play().catch(console.error)
    else _audio.pause()
  }

  const seek = (e) => {
    if (!_audio || !_audio.duration) return
    const rect  = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    _audio.currentTime = ratio * _audio.duration
  }

  const activeEp = currentIdx !== null ? episodes[currentIdx] : null

  return (
    <div className="podcast-page anim-fade-up">
      {/* Header */}
      <div className="page-header podcast-header">
        <div className="podcast-header-title">
          <RadioIcon />
          <div>
            <h1 className="page-title">Sanskrit News</h1>
            <p className="page-subtitle">संस्कृत वार्ता · AIR / Akashvani</p>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="podcast-loading">
          <div className="podcast-spinner" />
          <span>Loading…</span>
        </div>
      )}
      {error && (
        <div className="podcast-error">
          <p>Could not load: {error}</p>
          <button className="btn-ghost" onClick={() => { setError(null); setLoading(true); fetchEpisodes() }}>Retry</button>
        </div>
      )}
      {!loading && !error && episodes.length === 0 && (
        <div className="podcast-empty">No episodes found at this time.</div>
      )}

      {/* Bulletins grid */}
      {episodes.length > 0 && (
        <div className="pod-section">
          <div className="pod-section-hdr">
            <span className="pod-section-title">Daily Bulletins</span>
            <span className="pod-section-badge pod-section-badge-short">~5 min</span>
          </div>
          <div className="pod-grid">
            {episodes.map((ep, idx) => (
              <EpCard key={ep.audioUrl} ep={ep} idx={idx}
                active={idx === currentIdx} playing={playing}
                onPress={() => idx === currentIdx ? togglePlay() : startEpisode(idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sticky mini-player — appears when something is active */}
      {activeEp && (
        <div className="pod-player">
          <div className="pod-player-info">
            <div className="pod-player-title">{activeEp.title}</div>
            <div className="pod-player-sub">
              {dayFromDateStr(activeEp.date)} · {shortDate(activeEp.date)}
              {activeEp.time ? ` · ${activeEp.time}` : ''}
            </div>
          </div>
          <div className="pod-player-mid">
            <div className="pod-player-seek" onClick={seek}>
              <div className="pod-player-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="pod-player-time">{fmtTime(currentTime)} / {fmtTime(duration)}</div>
          </div>
          <button className="pod-player-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
        </div>
      )}
    </div>
  )
}
