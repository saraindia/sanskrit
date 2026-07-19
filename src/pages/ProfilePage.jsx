import React, { useState } from 'react'
import { usePurchase } from '../context/PurchaseContext'
import { useTheme, THEMES } from '../context/ThemeContext'
import { useSoundContext } from '../context/SoundContext'
import { useSoundEffects } from '../hooks/useSoundEffects'
import './ProfilePage.css'

export default function ProfilePage() {
  const { isPro, purchase, restorePurchases, purchasing, offerings, restoreMsg } = usePurchase()
  const { themeId, setTheme, largeText, toggleLargeText } = useTheme()
  const { soundEnabled, setSoundEnabled } = useSoundContext()
  const { play } = useSoundEffects()

  const pkg   = offerings?.availablePackages?.[0]
  const price = pkg?.product?.priceString ?? null

  const [whyOpen, setWhyOpen] = useState(false)

  const handleSoundToggle = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    if (next) setTimeout(() => play('toggleOn'), 50)
  }

  const WHY_FEATURES = [
    { icon: '📖', title: 'Sacred Texts — Word by Word',         desc: 'Bhagavad Gītā (701 verses), 8 Upaniṣads, Brahmasūtras & Yoga Sūtras — every verse with Devanagari, transliteration, and English. Not just translations — understanding.' },
    { icon: '🔠', title: 'Grammar from Absolute Zero',           desc: 'A structured path from Pronouns → Conjugation → Nouns → Vibhakti → Tenses. Learn Sanskrit grammar the way Sanskrit scholars do — with context and progression, not rote lists.' },
    { icon: '⚡', title: '1,200+ Words · 1,260+ Sentences',     desc: 'A living vocabulary bank with spaced-repetition flashcards, sentence drills, fill-in-the-blank, and match-pairs — all in Sanskrit. Practice the way your brain actually learns.' },
    { icon: '🎬', title: 'Learn by Listening & Watching',        desc: 'Varṇamālā Series (25 episodes on Sanskrit sounds & script by Tattvam), Sanskrit in 33 Days video course, and live Sanskrit news on Ākāśavāṇi radio — all in one place.' },
    { icon: '🗣️', title: 'Authentic Pronunciation from Day One', desc: 'Audio for sacred texts, Varṇamālā phonetics covering every varṇa including the rare ṛ, ḷ, anusvāra, visarga and their 8 modifications — the sounds no other app teaches.' },
    { icon: '📻', title: 'Live Sanskrit — Every Day',            desc: "Today's Ākāśavāṇi Sanskrit news bulletin, archived by day. Sanskrit is a living language — hear it spoken fluently in real broadcasts, not just recorded lessons." },
    { icon: '🌟', title: 'No App in the World Does This',        desc: "Every other Sanskrit app is either a dictionary, a transliteration tool, or a children's alphabet app. Sanskritly is the first to combine grammar learning, sacred text study, pronunciation mastery, and daily listening in a single mobile experience." },
  ]

  return (
    <div className="profile-page anim-fade-up">

      {/* ── Why Sanskritly accordion ───────────────────────────────────── */}
      <button className="why-accord-trigger" onClick={() => setWhyOpen(o => !o)}>
        <div className="why-accord-left">
          <span className="why-accord-eyebrow">संस्कृतम् · The Only App of Its Kind</span>
          <span className="why-accord-title">✦ Why Sanskritly?</span>
        </div>
        <span className="why-accord-chevron">{whyOpen ? '▲' : '▼'}</span>
      </button>

      {whyOpen && (
        <div className="why-accord-body">
          {WHY_FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="why-feature-row">
              <span className="why-feature-icon">{icon}</span>
              <div>
                <div className="why-feature-title">{title}</div>
                <div className="why-feature-desc">{desc}</div>
              </div>
            </div>
          ))}
          <div className="why-footer-note">🙏 Built with love for Sanskrit · For learners, scholars &amp; seekers</div>
        </div>
      )}

      {/* ── Access status ──────────────────────────────────────────────── */}
      {isPro ? (
        <div className="profile-pro-badge">
          <span className="profile-pro-icon">✦</span>
          <div>
            <div className="profile-pro-title">Full Access</div>
            <div className="profile-pro-sub">All content unlocked on this device</div>
          </div>
        </div>
      ) : (
        <div className="profile-upgrade-card">
          <div className="profile-upgrade-om">ॐ</div>
          <div className="profile-upgrade-title">Unlock Full Sanskritly</div>
          <div className="profile-upgrade-sub">One-time purchase · No subscription</div>
          <button
            className="profile-upgrade-btn"
            onClick={purchase}
            disabled={purchasing}
          >
            {purchasing ? 'Processing…' : price ? `Unlock for ${price}` : 'Unlock Full App'}
          </button>
          <button
            className="profile-restore-btn"
            onClick={restorePurchases}
            disabled={purchasing}
          >
            Restore purchase
          </button>
          {restoreMsg && <div className="profile-restore-msg">{restoreMsg}</div>}
        </div>
      )}

      {/* ── Theme picker ────────────────────────────────────────────────── */}
      <div className="profile-section-label">Appearance</div>
      <div className="theme-grid">
        {THEMES.map(t => (
          <button
            key={t.id}
            className={`theme-card ${themeId === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t.id)}
            aria-pressed={themeId === t.id}
          >
            <div className="theme-swatch" style={{ background: t.preview.bg }}>
              <div className="theme-swatch-bar"    style={{ background: t.preview.card }} />
              <div className="theme-swatch-accent" style={{ background: t.preview.accent }} />
              <div className="theme-swatch-text">
                <div className="theme-swatch-line"       style={{ background: t.preview.text, opacity: 0.9 }} />
                <div className="theme-swatch-line short" style={{ background: t.preview.text, opacity: 0.5 }} />
              </div>
              {themeId === t.id && <div className="theme-swatch-check">✓</div>}
            </div>
            <div className="theme-card-icon">{t.icon}</div>
            <div className="theme-card-name">{t.label}</div>
            <div className="theme-card-desc">{t.desc}</div>
          </button>
        ))}
      </div>

      {/* ── Accessibility & Sound ─────────────────────────────────────────── */}
      <div className="profile-section-label">Accessibility</div>
      <div className="profile-settings-group">
        <label className="profile-setting-row">
          <div className="profile-setting-info">
            <div className="profile-setting-title">Large Text</div>
            <div className="profile-setting-desc">Increase font size throughout the app</div>
          </div>
          <span className="profile-toggle-wrap">
            <input type="checkbox" className="profile-toggle-input" checked={largeText} onChange={toggleLargeText} />
            <span className="profile-toggle-track"><span className="profile-toggle-thumb" /></span>
          </span>
        </label>
        <div className="profile-setting-divider" />
        <label className="profile-setting-row">
          <div className="profile-setting-info">
            <div className="profile-setting-title">Sound Effects</div>
            <div className="profile-setting-desc">Tap, flip, reveal &amp; success tones on interactions</div>
          </div>
          <span className="profile-toggle-wrap">
            <input type="checkbox" className="profile-toggle-input" checked={soundEnabled} onChange={handleSoundToggle} />
            <span className="profile-toggle-track"><span className="profile-toggle-thumb" /></span>
          </span>
        </label>
      </div>

      {/* ── Storage info ──────────────────────────────────────────────────── */}
      <div className="profile-section-label">Data</div>
      <div className="profile-settings-group">
        <div className="profile-setting-row no-interact">
          <div className="profile-setting-info">
            <div className="profile-setting-title">Progress storage</div>
            <div className="profile-setting-desc">Saved privately on this device</div>
          </div>
          <span className="profile-setting-badge">🔒 Local</span>
        </div>
      </div>
      <div className="profile-footer">
        Sanskritly · संस्कृतम् · v1.0
      </div>
    </div>
  )
}
