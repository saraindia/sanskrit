import React, { useState, useEffect, useCallback } from 'react'
import './DDNewsPage.css'

const API_BASE = (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())
  ? 'https://sanskritly.vercel.app'
  : ''

// Module-level cache — survives tab navigation within the same session
let _cachedVideos = null

function fmtDate(iso) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  return `${date} · ${time}`
}

export default function DDNewsPage() {
  const [videos,  setVideos]  = useState(_cachedVideos || [])
  const [loading, setLoading] = useState(_cachedVideos === null)
  const [error,   setError]   = useState(null)
  const [active,  setActive]  = useState(_cachedVideos?.[0]?.videoId || null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API_BASE}/api/ddnews`)
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json'))
        throw new Error('Could not load Sanskrit Vārtā feed')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      _cachedVideos = data.videos || []
      setVideos(_cachedVideos)
      setActive(v => v ?? _cachedVideos[0]?.videoId ?? null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (_cachedVideos === null) fetchNews()
  }, [fetchNews])

  return (
    <div className="ddnews-page">
      <div className="ddnews-header">
        <div className="ddnews-title-row">
          <span className="ddnews-logo">📺</span>
          <div>
            <h1 className="ddnews-title">Sanskrit Vārtā</h1>
            <p className="ddnews-sub">
              संस्कृत वार्ता ·{' '}
              <a href="https://www.youtube.com/@NEWSONAIROFFICIAL" target="_blank" rel="noreferrer" className="ddnews-channel-link">
                News on Air Official ↗
              </a>
            </p>
          </div>
        </div>
        <button className="ddnews-refresh" onClick={fetchNews} title="Refresh">↻</button>
      </div>

      {loading && <div className="ddnews-state">Loading latest news…</div>}
      {error   && <div className="ddnews-state ddnews-error">⚠ {error}</div>}

      {!loading && !error && (
        <div className="ddnews-body">
          {active && (
            <div className="ddnews-player-wrap">
              <iframe
                className="ddnews-player"
                src={`https://www.youtube.com/embed/${active}`}
                title="Sanskrit Vārtā"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="ddnews-list">
            {videos.length === 0 && (
              <div className="ddnews-state">No Sanskrit videos found recently.</div>
            )}
            {videos.map(v => (
              <button
                key={v.videoId}
                className={`ddnews-item${v.videoId === active ? ' active' : ''}`}
                onClick={() => setActive(v.videoId)}
              >
                <img
                  className="ddnews-thumb"
                  src={`https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <div className="ddnews-item-info">
                  <p className="ddnews-item-title">{v.title.replace(/\s*[|l]\s*\d{1,2}\s+\w+\s+\d{4}\s*$/i, '').trim()}</p>
                  <p className="ddnews-item-date">{fmtDate(v.date)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
