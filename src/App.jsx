import React, { useEffect, useCallback, Suspense, lazy } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
// Dashboard loads eagerly — it's the first screen everyone sees
import Dashboard from './pages/Dashboard'
// All other pages load lazily — their JS + data only downloads when first visited
const Flashcards    = lazy(() => import('./pages/Flashcards'))
const DrillSentences= lazy(() => import('./pages/DrillSentences'))
const FillBlanks    = lazy(() => import('./pages/FillBlanks'))
const Progress      = lazy(() => import('./pages/Progress'))
const StorySession  = lazy(() => import('./pages/StorySession'))
const PodcastPage   = lazy(() => import('./pages/PodcastPage'))
const ModulePage    = lazy(() => import('./pages/ModulePage'))
const ProfilePage   = lazy(() => import('./pages/ProfilePage'))
const GitaPage      = lazy(() => import('./pages/GitaPage'))
const UpanishadsPage= lazy(() => import('./pages/UpanishadsPage'))
import AuthPage from './pages/AuthPage'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { SoundProvider } from './context/SoundContext'
import { useSoundEffects } from './hooks/useSoundEffects'
import { useProgress } from './hooks/useProgress'
import { usePWAUpdate } from './hooks/usePWAUpdate'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import InstallPrompt from './components/InstallPrompt'
import ScrollToTop from './components/ScrollToTop'
import './styles/app.css'

const TABS = [
  { to: '/',          label: 'Home',    icon: '🏠', end: true },
  { to: '/flashcards',label: 'Cards',   icon: '🗂️'           },
  { to: '/story',     label: 'Stories', icon: '📖'           },
  { to: '/drill',     label: 'Drill',   icon: '⚡'           },
  { to: '/gita',      label: 'Gītā',    icon: '🪷'           },
  { to: '/upanishads',label: 'Upaniṣad',icon: '🕉️'           },
  { to: '/progress',  label: 'Progress',icon: '📈'           },
  { to: '/podcast',   label: 'Listen',  icon: '🎧'           },
]

// ── Logged-in app shell ───────────────────────────────────────────────────────
function AppShell() {
  const { user, logout, progressKey } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const { progress } = useProgress(progressKey)
  const { updateReady, updateApp, dismiss: dismissUpdate } = usePWAUpdate()

  // Profile hint — shown on login, then randomly every 45–120s
  const [showHint, setShowHint] = React.useState(true)
  const dismissHint = React.useCallback(() => setShowHint(false), [])

  React.useEffect(() => {
    if (!showHint) return
    const t = setTimeout(dismissHint, 4000)
    return () => clearTimeout(t)
  }, [showHint, dismissHint])

  React.useEffect(() => {
    let timer
    const scheduleNext = () => {
      const delay = (45 + Math.random() * 75) * 1000  // 45–120s
      timer = setTimeout(() => { setShowHint(true); scheduleNext() }, delay)
    }
    scheduleNext()
    return () => clearTimeout(timer)
  }, [])
  const { play } = useSoundEffects()

  // Scroll to top of the content area on every route change
  useEffect(() => {
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const streak    = progress?.streakDays || 0
  const onProfile = location.pathname === '/profile'

  // Global tap sound — fires for every button/link/interactive element click
  // Excludes speak-btn (TTS) to avoid collision with voice playback
  useEffect(() => {
    const onDown = (e) => {
      const el = e.target.closest(
        'button:not(.speak-btn):not(.engine-toggle-btn), a, [role="button"], select, .tab-item, .filter-btn, .theme-card, .action-btn, .module-card'
      )
      if (el) play('tap')
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [play])

  // Nav sound on route change
  const prevPath = React.useRef(location.pathname)
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      play('nav')
      prevPath.current = location.pathname
    }
  }, [location.pathname, play])

  return (
    <div className="app-shell">
      {/* ── Top header ───────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="app-header-logo">
          <span className="app-header-deva">संस्कृतम्</span>
          <span className="app-header-name">SANSKRITLY</span>
        </div>
        <div className="app-header-right">
          {streak > 0 && <div className="app-header-streak">🔥 {streak}</div>}
          <div className="avatar-hint-wrap" onClick={dismissHint}>
            <button
              className={`app-header-avatar ${onProfile ? 'active' : ''}`}
              onClick={() => navigate(onProfile ? '/' : '/profile')}
              aria-label="Profile & Settings"
            >
              {user.initial}
            </button>
            <div className={`avatar-hint ${showHint ? 'avatar-hint-visible' : ''}`}>
              <span className="avatar-hint-text">Profile</span>
              <span className="avatar-hint-finger">👆</span>
            </div>
          </div>
          <button className="app-header-logout" onClick={logout} aria-label="Sign out" title="Sign out">
            ⎋
          </button>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────────── */}
      <main className="main-content">
        <Suspense fallback={<div className="page-loading"><span className="page-loading-om">ॐ</span></div>}>
        <Routes>
          <Route path="/"           element={<Dashboard />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/drill"      element={<DrillSentences />} />
          <Route path="/fill"       element={<FillBlanks />} />
          <Route path="/gita"       element={<GitaPage />} />
          <Route path="/upanishads" element={<UpanishadsPage />} />
          <Route path="/story"      element={<StorySession />} />
          <Route path="/progress"   element={<Progress />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/profile"    element={<ProfilePage />} />
          <Route path="/podcast"    element={<PodcastPage />} />
        </Routes>
        </Suspense>
      </main>

      <ScrollToTop />

      {/* ── Bottom tab bar (mobile) / Left sidebar (desktop) ────────── */}
      <nav className="bottom-nav">
        {/* Desktop-only brand block */}
        <div className="sidebar-brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="sidebar-brand-om">ॐ</span>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-deva">संस्कृतम्</span>
            <span className="sidebar-brand-name">SANSKRITLY</span>
          </div>
        </div>

        {/* Nav links — on mobile these are direct flex children; on desktop wrapped */}
        <div className="sidebar-links">
          {TABS.map(t => (
            <NavLink key={t.to} to={t.to} end={t.end}
              className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
            >
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Desktop-only user footer */}
        <div className="sidebar-foot">
          <button
            className={`sidebar-avatar-btn ${onProfile ? 'active' : ''}`}
            onClick={() => navigate(onProfile ? '/' : '/profile')}
            aria-label="Profile & Settings"
          >
            {user.initial}
          </button>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.displayName}</div>
            {streak > 0 && <div className="sidebar-user-streak">🔥 {streak} day streak</div>}
          </div>
          <button className="sidebar-logout-btn" onClick={logout} aria-label="Sign out" title="Sign out">⎋</button>
        </div>
      </nav>

      {/* ── App update banner ────────────────────────────────────────── */}
      {updateReady && (
        <div className="update-banner">
          <span className="update-banner-icon">🕉️</span>
          <div className="update-banner-text">
            <div className="update-banner-title">Update available</div>
            <div className="update-banner-sub">A new version of Sanskritly is ready</div>
          </div>
          <button className="update-banner-btn" onClick={updateApp}>Update</button>
          <button className="install-banner-dismiss" onClick={dismissUpdate}>✕</button>
        </div>
      )}
    </div>
  )
}

// ── Root — login gate + single install prompt ─────────────────────────────────
function AppRoot() {
  const { user } = useAuth()
  const { showPrompt, platform, nativePrompt, install, dismiss } = useInstallPrompt()

  return (
    <>
      {user
        ? <ThemeProvider><SoundProvider><AppShell /></SoundProvider></ThemeProvider>
        : (
          <ThemeProvider>
            <div className="app-shell">
              <main className="main-content"><AuthPage /></main>
            </div>
          </ThemeProvider>
        )
      }

      {/* Install prompt shown on both login screen and inside app */}
      {showPrompt && (
        <InstallPrompt
          platform={platform}
          nativePrompt={nativePrompt}
          install={install}
          dismiss={dismiss}
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoot />
      <SpeedInsights />
      <Analytics />
    </AuthProvider>
  )
}
