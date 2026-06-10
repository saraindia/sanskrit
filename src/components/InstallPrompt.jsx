import React, { useState } from 'react'
import './InstallPrompt.css'

// Per-platform instructions
const PLATFORM_INFO = {
  ios: {
    device:  'iPhone',
    icon:    '📱',
    browser: 'Safari',
    steps: [
      { icon: '⬆️', text: 'Tap the Share button at the bottom of Safari' },
      { icon: '➕', text: 'Scroll down and tap "Add to Home Screen"' },
      { icon: '✅', text: 'Tap "Add" — Sanskritly appears on your home screen' },
    ],
    note: 'Use Safari to install. Chrome/Firefox on iOS cannot install PWAs.',
  },
  ipad: {
    device:  'iPad',
    icon:    '📲',
    browser: 'Safari',
    steps: [
      { icon: '⬆️', text: 'Tap the Share button (top toolbar in Safari)' },
      { icon: '➕', text: 'Tap "Add to Home Screen"' },
      { icon: '✅', text: 'Tap "Add" — Sanskritly appears on your home screen' },
    ],
    note: 'Use Safari to install. Chrome/Firefox on iPad cannot install PWAs.',
  },
  android: {
    device:  'Android',
    icon:    '📱',
    browser: 'Chrome',
    steps: [
      { icon: '⚡', text: 'Tap "Install" below to add Sanskritly to your device' },
      { icon: '✅', text: 'Confirm in the popup — it installs like a native app' },
    ],
    note: null,
  },
  mac: {
    device:  'Mac',
    icon:    '💻',
    browser: 'Chrome / Safari',
    steps: [
      { icon: '⬇️', text: 'Click the install icon (⊕) in the browser address bar' },
      { icon: '✅', text: 'Click "Install" — Sanskritly opens as its own window' },
    ],
    note: 'Or use the Install button below if shown.',
  },
  windows: {
    device:  'Windows',
    icon:    '🖥️',
    browser: 'Chrome / Edge',
    steps: [
      { icon: '⬇️', text: 'Click the install icon (⊕) in the address bar' },
      { icon: '✅', text: 'Click "Install" — Sanskritly opens as its own app' },
    ],
    note: 'Or use the Install button below if shown.',
  },
  linux: {
    device:  'Desktop',
    icon:    '🖥️',
    browser: 'Chrome',
    steps: [
      { icon: '⬇️', text: 'Click the install icon (⊕) in the Chrome address bar' },
      { icon: '✅', text: 'Click "Install" in the popup' },
    ],
    note: null,
  },
  desktop: {
    device:  'Desktop',
    icon:    '🖥️',
    browser: 'Chrome / Edge',
    steps: [
      { icon: '⬇️', text: 'Click the install icon in the browser address bar' },
      { icon: '✅', text: 'Click "Install" to add Sanskritly as a desktop app' },
    ],
    note: null,
  },
}

export default function InstallPrompt({ platform, nativePrompt, install, dismiss }) {
  const [expanded, setExpanded] = useState(false)
  const info = PLATFORM_INFO[platform] || PLATFORM_INFO.desktop
  const canNativeInstall = !!nativePrompt

  return (
    <>
      {/* Backdrop */}
      <div className="ip-backdrop" onClick={() => dismiss(false)} />

      {/* Bottom sheet */}
      <div className="ip-sheet anim-fade-up">
        {/* Header */}
        <div className="ip-handle" />
        <div className="ip-header">
          <div className="ip-om">ॐ</div>
          <div className="ip-header-text">
            <div className="ip-title">Install Sanskritly</div>
            <div className="ip-subtitle">Add to your {info.device} for the best experience</div>
          </div>
          <button className="ip-close" onClick={() => dismiss(false)} aria-label="Close">✕</button>
        </div>

        {/* Benefits */}
        <div className="ip-benefits">
          <div className="ip-benefit"><span>⚡</span><span>Works offline</span></div>
          <div className="ip-benefit"><span>🔔</span><span>No browser chrome</span></div>
          <div className="ip-benefit"><span>📱</span><span>Native app feel</span></div>
          <div className="ip-benefit"><span>🔒</span><span>Your data stays local</span></div>
        </div>

        {/* Native install button (Android / Desktop) */}
        {canNativeInstall && (
          <button className="ip-install-btn" onClick={install}>
            {info.icon} Install on {info.device}
          </button>
        )}

        {/* Manual steps (iOS / Desktop fallback) */}
        {(!canNativeInstall || expanded) && (
          <div className="ip-steps">
            <div className="ip-steps-label">
              {canNativeInstall ? 'Or install manually:' : `How to install on ${info.device}:`}
            </div>
            {info.steps.map((s, i) => (
              <div key={i} className="ip-step">
                <span className="ip-step-icon">{s.icon}</span>
                <span className="ip-step-text">{s.text}</span>
              </div>
            ))}
            {info.note && (
              <div className="ip-note">ℹ️ {info.note}</div>
            )}
          </div>
        )}

        {canNativeInstall && !expanded && (
          <button className="ip-show-steps" onClick={() => setExpanded(true)}>
            Show manual steps ↓
          </button>
        )}

        {/* Footer */}
        <button className="ip-dismiss-link" onClick={() => dismiss(true)}>
          Not now — don't show again
        </button>
      </div>
    </>
  )
}
