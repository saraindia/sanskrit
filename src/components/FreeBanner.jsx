import React from 'react'
import { usePurchase } from '../context/PurchaseContext'
import './FreeBanner.css'

export default function FreeBanner({ current, limit, total, noun = 'items' }) {
  const { isPro, isChecking, showPaywall } = usePurchase()
  if (isPro || isChecking) return null

  return (
    <button className="free-banner" onClick={showPaywall}>
      <span className="free-banner-lock">🔒</span>
      <span className="free-banner-text">
        Free preview: <strong>{limit} {noun}</strong> of {total} · Tap to unlock all
      </span>
      <span className="free-banner-cta">Unlock →</span>
    </button>
  )
}
