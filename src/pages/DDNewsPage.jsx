import React, { useState, useEffect, useCallback } from 'react'
import './DDNewsPage.css'

const API_KEY      = import.meta.env.VITE_YT_API_KEY
const CHANNEL_ID   = 'UCYOv0QZr2B70Rkx_ZqIA84w' // News on Air Official
const MAX_RESULTS  = 20
const DAYS_BACK    = 5

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function DDNewsPage() {
  const [videos,   setVideos]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [active,   setActive]   = useState(null) // currently playing video id

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const published = daysAgo(DAYS_BACK)
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=Sanskrit&type=video&order=date&publishedAfter=${published}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
      const res  = await fetch(url)
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      setVideos(data.items || [])
      if (data.items?.length) setActive(data.items[0].id.videoId)
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
              {' '}· Last {DAYS_BACK} days
            </p>
          </div>
        </div>
        <button className="ddnews-refresh" onClick={fetchNews} title="Refresh">↻</button>
      </div>

      {loading && <div className="ddnews-state">Loading latest news…</div>}
      {error   && <div className="ddnews-state ddnews-error">⚠ {error}</div>}

      {!loading && !error && (
        <div className="ddnews-body">
          {/* Player */}
          {active && (
            <div className="ddnews-player-wrap">
              <iframe
                className="ddnews-player"
                src={`https://www.youtube.com/embed/${active}?autoplay=1`}
                title="DD News"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Video list */}
          <div className="ddnews-list">
            {videos.length === 0 && (
              <div className="ddnews-state">No videos found in the last {DAYS_BACK} days.</div>
            )}
            {videos.map(v => {
              const id    = v.id.videoId
              const snap  = v.snippet
              const isAct = id === active
              return (
                <button
                  key={id}
                  className={`ddnews-item${isAct ? ' active' : ''}`}
                  onClick={() => setActive(id)}
                >
                  <img
                    className="ddnews-thumb"
                    src={snap.thumbnails?.medium?.url}
                    alt={snap.title}
                    loading="lazy"
                  />
                  <div className="ddnews-item-info">
                    <p className="ddnews-item-title">{snap.title}</p>
                    <p className="ddnews-item-date">{fmtDate(snap.publishedAt)}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
