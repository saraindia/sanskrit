import React, { useState, useEffect, useCallback, useRef } from 'react'
import './ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible]   = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const scrollElRef = useRef(null)

  // Find the scroll container once on mount
  useEffect(() => {
    const el = document.querySelector('.main-content')
    if (!el) return
    scrollElRef.current = el

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      setVisible(scrollTop > 160)
      setAtBottom(scrollTop + clientHeight >= scrollHeight - 40)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = useCallback(() => {
    scrollElRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goBottom = useCallback(() => {
    const el = scrollElRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  if (!visible) return null

  return (
    <div className="stt-wrap anim-fade-up">
      {/* Show ↓ only when NOT already at the bottom */}
      {!atBottom && (
        <button
          className="stt-btn stt-down"
          onClick={goBottom}
          aria-label="Scroll to bottom"
          title="Go to bottom"
        >
          ↓
        </button>
      )}
      <button
        className="stt-btn stt-up"
        onClick={goTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  )
}
