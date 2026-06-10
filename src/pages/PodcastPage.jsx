import React, { useState, useEffect, useCallback } from 'react'
import './PodcastPage.css'

// ─── Module-level singletons — survive tab navigation ───────────────────────
// Audio element persists so playback continues / pauses across unmount/remount
const _audio = typeof window !== 'undefined' ? new Audio() : null

let _cachedEpisodes   = []
let _cachedHasMore    = true
let _cachedCurrentIdx = null
let _cachedPlaying    = false
let _cachedCurrentTime = 0
let _cachedDuration    = 0
let _cachedProgress    = 0

// ─── SVG icons ───────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <polygon points="2,1 11,6 2,11" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
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

// "9 June 2026" → "Monday"
function dayFromDateStr(str) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-IN', { weekday: 'long' })
}

function fmtTime(s) {
  if (!isFinite(s)) return '0:00'
  const m   = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PodcastPage() {
  const [episodes,    setEpisodes]    = useState(_cachedEpisodes)
  const [loading,     setLoading]     = useState(_cachedEpisodes.length === 0)
  const [error,       setError]       = useState(null)
  const [hasMore,     setHasMore]     = useState(_cachedHasMore)

  // Player state — initialised from module cache so it survives remount
  const [currentIdx,   setCurrentIdx]   = useState(_cachedCurrentIdx)
  const [playing,      setPlaying]      = useState(_cachedPlaying)
  const [currentTime,  setCurrentTime]  = useState(_cachedCurrentTime)
  const [duration,     setDuration]     = useState(_cachedDuration)
  const [progress,     setProgress]     = useState(_cachedProgress)

  // ── Fetch episodes ──────────────────────────────────────────────────────────
  const fetchEpisodes = useCallback(async () => {
    try {
      const res  = await fetch('/api/akashvani')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      _cachedEpisodes = data.episodes
      _cachedHasMore  = data.hasMore
      setEpisodes(data.episodes)
      setHasMore(data.hasMore)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (_cachedEpisodes.length === 0) fetchEpisodes()
  }, [fetchEpisodes])

  // ── Pause on unmount (tab switch), restore audio position on remount ─────────
  useEffect(() => {
    if (!_audio) return

    // Restore seek position from cache in case audio src was reset
    if (_cachedCurrentIdx !== null && _cachedCurrentTime > 0) {
      const ep = _cachedEpisodes[_cachedCurrentIdx]
      if (ep && _audio.src !== ep.audioUrl) {
        _audio.src = ep.audioUrl
        _audio.load()
      }
      // Seek once metadata is ready
      const restoreTime = () => { _audio.currentTime = _cachedCurrentTime }
      _audio.addEventListener('loadedmetadata', restoreTime, { once: true })
    }

    // Attach event listeners to the persistent audio element
    const onTimeUpdate = () => {
      const ct = _audio.currentTime
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
      // Pause on unmount so audio doesn't keep playing silently in background
      if (!_audio.paused) _audio.pause()
      _cachedPlaying = false
      setPlaying(false)

      _audio.removeEventListener('timeupdate', onTimeUpdate)
      _audio.removeEventListener('ended',      onEnded)
      _audio.removeEventListener('play',       onPlay)
      _audio.removeEventListener('pause',      onPause)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Play a new episode ──────────────────────────────────────────────────────
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

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="podcast-page anim-fade-up">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="page-header podcast-header">
        <div className="podcast-header-title">
          <RadioIcon />
          <div>
            <h1 className="page-title">Sanskrit News</h1>
            <p className="page-subtitle">संस्कृत वार्ता · Daily bulletin · AIR / Akashvani</p>
          </div>
        </div>
      </div>

      {/* ── Source info card ──────────────────────────────────────────────── */}
      <div className="podcast-source-card">
        <div className="podcast-source-logo">
          <img
            src="https://newsonair.gov.in/wp-content/uploads/2024/01/cropped-logo-192x192.png"
            alt="Akashvani / AIR logo"
            className="podcast-source-img"
          />
        </div>
        <div className="podcast-source-info">
          <div className="podcast-source-name">Akashvani · All India Radio</div>
          <div className="podcast-source-desc">
            Official daily Sanskrit news bulletins from Prasar Bharati's News Services Division.
            Broadcast at <strong>06:55</strong> &amp; <strong>18:20 IST</strong> every day.
          </div>
          <a
            className="podcast-source-link"
            href="https://newsonair.gov.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            newsonair.gov.in ↗
          </a>
        </div>
      </div>

      {/* ── States ────────────────────────────────────────────────────────── */}
      {loading && (
        <div className="podcast-loading">
          <div className="podcast-spinner" />
          <span>Loading episodes…</span>
        </div>
      )}
      {error && (
        <div className="podcast-error">
          <p>Could not load episodes: {error}</p>
          <button className="btn-ghost" onClick={() => { setError(null); setLoading(true); fetchEpisodes() }}>Retry</button>
        </div>
      )}
      {!loading && !error && episodes.length === 0 && (
        <div className="podcast-empty">No episodes found at this time.</div>
      )}

      {/* ── Episode list ──────────────────────────────────────────────────── */}
      <div className="podcast-list">
        {episodes.map((ep, idx) => {
          const active = idx === currentIdx
          return (
            <div
              key={ep.audioUrl}
              className={`podcast-episode ${active ? 'active' : ''}`}
              onClick={() => active ? togglePlay() : startEpisode(idx)}
            >
              <div className="podcast-ep-play">
                {active && playing ? <PauseIcon /> : <PlayIcon />}
              </div>
              <div className="podcast-ep-body">
                <div className="podcast-ep-top">
                  <div className="podcast-ep-info">
                    <div className="podcast-ep-title">
                      {ep.title}
                      {ep.time && <span className="podcast-ep-time">{dayFromDateStr(ep.date)} · {ep.time}</span>}
                    </div>
                    <div className="podcast-ep-date">{ep.date}</div>
                  </div>
                  {active && (
                    <div className="podcast-ep-badge">
                      {playing ? 'Playing' : 'Paused'}
                    </div>
                  )}
                </div>
                {active && (
                  <div className="podcast-ep-controls" onClick={e => e.stopPropagation()}>
                    <div className="podcast-seek" onClick={seek} role="slider" aria-label="Seek" aria-valuenow={Math.round(progress * 100)}>
                      <div className="podcast-seek-fill" style={{ width: `${progress * 100}%` }} />
                    </div>
                    <div className="podcast-time">{fmtTime(currentTime)}<span>/</span>{fmtTime(duration)}</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
