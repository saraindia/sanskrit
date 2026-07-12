import React, { useState, useEffect, useCallback } from 'react'
import './DDNewsPage.css'

const API_BASE = (typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())
  ? 'https://sanskritly.vercel.app'
  : ''

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function DDNewsPage() {
  const [videos,  setVideos]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [active,  setActive]  = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API_BASE}/api/ddnews`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setVideos(data.videos || [])
      if (data.videos?.length) setActive(data.videos[0].videoId)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNews() }, [fetchNews])

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
                src={`https://www.youtube.com/embed/${active}?autoplay=1`}
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
                  <p className="ddnews-item-title">{v.title}</p>
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
