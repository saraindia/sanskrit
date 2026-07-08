import React from 'react'
import { usePurchase } from '../context/PurchaseContext'
import './PaywallModal.css'

const FEATURES = [
  { icon: '🗂️', text: 'Unlimited flashcard study sessions' },
  { icon: '⚡', text: 'Unlimited sentence drill practice' },
  { icon: '✏️', text: 'Unlimited fill-in-the-blank exercises' },
  { icon: '🔡', text: 'Unlimited match-pairs rounds' },
  { icon: '📖', text: 'All stories & dialogues' },
  { icon: '🪷', text: 'All 18 chapters of the Bhagavad Gītā' },
  { icon: '🕉️', text: 'Full Upaniṣad library' },
  { icon: '📈', text: 'Full SRS progress tracking' },
]

export default function PaywallModal() {
  const { paywallVisible, hidePaywall, purchase, restorePurchases, purchasing, offerings, restoreMsg } = usePurchase()

  if (!paywallVisible) return null

  // Price string from RevenueCat offering, or fallback
  const pkg   = offerings?.availablePackages?.[0]
  const price = pkg?.product?.priceString ?? null

  return (
    <div className="paywall-overlay" onClick={hidePaywall}>
      <div className="paywall-modal" onClick={e => e.stopPropagation()}>

        <button className="paywall-close" onClick={hidePaywall} aria-label="Close">✕</button>

        <div className="paywall-header">
          <div className="paywall-om">ॐ</div>
          <h2 className="paywall-title">Unlock Full Access</h2>
          <p className="paywall-subtitle">One-time purchase · No subscription ever</p>
        </div>

        <ul className="paywall-features">
          {FEATURES.map(f => (
            <li key={f.text} className="paywall-feature">
              <span className="paywall-feature-icon">{f.icon}</span>
              <span className="paywall-feature-text">{f.text}</span>
            </li>
          ))}
        </ul>

        <button
          className="paywall-cta"
          onClick={purchase}
          disabled={purchasing}
        >
          {purchasing ? 'Processing…' : price ? `Unlock for ${price}` : 'Unlock Full App'}
        </button>

        <button
          className="paywall-restore"
          onClick={restorePurchases}
          disabled={purchasing}
        >
          Restore purchase
        </button>

        {restoreMsg && <div className="paywall-restore-msg">{restoreMsg}</div>}

        <p className="paywall-legal">
          Payment processed via Apple App Store or Google Play. Your purchase is linked to your store account and works on all your devices.
        </p>
      </div>
    </div>
  )
}
