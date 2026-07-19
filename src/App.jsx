import React, { useEffect, useCallback, Suspense, lazy } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
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
const MatchPairs    = lazy(() => import('./pages/MatchPairs'))
const StudyHub      = lazy(() => import('./pages/StudyHub'))
const TextsHub      = lazy(() => import('./pages/TextsHub'))
const GrammarPage   = lazy(() => import('./pages/GrammarPage'))
const DDNewsPage        = lazy(() => import('./pages/DDNewsPage'))
const SanskritCoursePage= lazy(() => import('./pages/SanskritCoursePage'))
const VarnamalaPage     = lazy(() => import('./pages/VarnamalaPage'))
const DictionaryPage    = lazy(() => import('./pages/DictionaryPage'))
const AlphabetLearnPage = lazy(() => import('./pages/AlphabetLearnPage'))
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { PurchaseProvider, usePurchase } from './context/PurchaseContext'
import { ThemeProvider } from './context/ThemeContext'
import { SoundProvider } from './context/SoundContext'
import { useSoundEffects } from './hooks/useSoundEffects'
import { useUserProgress as useProgress } from './hooks/useUserProgress'
import { usePWAUpdate } from './hooks/usePWAUpdate'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import InstallPrompt from './components/InstallPrompt'
import PaywallModal from './components/PaywallModal'
import ScrollToTop from './components/ScrollToTop'
import './styles/app.css'

const STUDY_ROUTES = ['/study', '/flashcards', '/drill', '/fill', '/match', '/grammar', '/grammar/pronouns', '/grammar/endings', '/grammar/verbs', '/grammar/nouns', '/grammar/vibhakti', '/grammar/tenses', '/grammar/explorer', '/grammar/questions', '/grammar/gender', '/course']
const TEXTS_ROUTES = ['/texts', '/gita', '/upanishads', '/brahmasutras', '/yogasutras']
const MORE_ROUTES  = ['/podcast', '/ddnews', '/dictionary']

const SIDEBAR_GROUPS = [
  { label: null, items: [{ to: '/', label: 'Home', icon: '🏠', end: true }] },
  { label: 'Grammar Path', items: [
    { to: '/grammar/pronouns',   label: '1 · Pronouns',         icon: '👤' },
    { to: '/grammar/verbs',      label: '2 · Conjugation',      icon: '📋' },
    { to: '/grammar/nouns',      label: '3 · Nouns & Gender',   icon: '📝' },
    { to: '/grammar/vibhakti',   label: '4 · Vibhakti · Cases', icon: '🏷️' },
    { to: '/grammar/tenses',     label: '5 · Tenses',           icon: '⏱️' },
    { to: '/grammar/explorer',   label: '↳ Conjugation Explorer', icon: '🔭' },
    { to: '/grammar/questions',  label: '↳ Question Explorer',  icon: '💬' },
    { to: '/grammar/gender',     label: '↳ Gender Explorer',    icon: '⚥'  },
  ]},
  { label: 'Practice', items: [
    { to: '/flashcards', label: 'Flashcards',     icon: '🗂️' },
    { to: '/drill',      label: 'Sentence Drill', icon: '⚡' },
    { to: '/fill',       label: 'Fill Blanks',    icon: '✏️' },
    { to: '/match',      label: 'Match Pairs',    icon: '🔡' },
  ]},
  { label: 'Read & Listen', items: [
    { to: '/texts',      label: 'Texts Hub',  icon: '📜' },
    { to: '/gita',       label: 'Gītā',       icon: '🪷' },
    { to: '/upanishads', label: 'Upaniṣad',   icon: '🕉️' },
    { to: '/story',      label: 'Stories',    icon: '📖' },
    { to: '/podcast',    label: 'Listen',     icon: '🎧' },
    { to: '/ddnews',      label: 'Skt Vārtā',  icon: '📺' },
    { to: '/dictionary',  label: 'Dictionary', icon: '📖' },
  ]},
]

function AppShell() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { progress } = useProgress()
  const { isPro, showPaywall } = usePurchase()
  const [moreOpen, setMoreOpen] = React.useState(false)
  const lastStudy = React.useRef('/study')
  const lastTexts = React.useRef('/texts')

  React.useEffect(() => {
    const p = location.pathname
    if (STUDY_ROUTES.includes(p)) lastStudy.current = p
    if (TEXTS_ROUTES.includes(p)) lastTexts.current = p
    setMoreOpen(false)
  }, [location.pathname])

  const isStudyActive = STUDY_ROUTES.includes(location.pathname)
  const isTextsActive = TEXTS_ROUTES.includes(location.pathname)
  const isMoreActive  = MORE_ROUTES.includes(location.pathname)
  const { updateReady, updateApp, dismiss: dismissUpdate } = usePWAUpdate()

  const { play } = useSoundEffects()

  useEffect(() => {
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const streak   = progress?.streakDays || 0
  const onProfile = location.pathname === '/profile'

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

  const prevPath = React.useRef(location.pathname)
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      play('nav')
      prevPath.current = location.pathname
      document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, play])

  return (
    <div className="app-shell">
      {/* ── Top header ───────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="app-header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="app-header-deva">संस्कृतम्</span>
          <span className="app-header-name">SANSKRITLY</span>
        </div>
        <div className="app-header-right">
          {streak > 0 && <div className="app-header-streak">🔥 {streak}</div>}
          {!isPro && (
            <button
              className="app-header-unlock"
              onClick={showPaywall}
              aria-label="Unlock full app"
            >
              ✦ Unlock
            </button>
          )}
          <button
            className={`app-header-avatar ${onProfile ? 'active' : ''}`}
            onClick={() => navigate(onProfile ? '/' : '/profile')}
            aria-label="Settings"
          >
            ⚙
          </button>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────────── */}
      <main className="main-content">
        <Suspense fallback={<div className="page-loading"><span className="page-loading-om">ॐ</span></div>}>
        <Routes>
          <Route path="/"           element={<Dashboard />} />
          <Route path="/study"      element={<StudyHub />} />
          <Route path="/grammar"                    element={<GrammarPage />} />
          <Route path="/grammar/tenses"             element={<GrammarPage />} />
          <Route path="/grammar/tenses/:lessonId"   element={<GrammarPage />} />
          <Route path="/grammar/:lessonId"           element={<GrammarPage />} />
          <Route path="/texts"      element={<TextsHub />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/drill"      element={<DrillSentences />} />
          <Route path="/fill"       element={<FillBlanks />} />
          <Route path="/gita"       element={<GitaPage />} />
          <Route path="/upanishads"   element={<UpanishadsPage />} />
          <Route path="/brahmasutras" element={<UpanishadsPage />} />
          <Route path="/yogasutras"   element={<UpanishadsPage />} />
          <Route path="/match"      element={<MatchPairs />} />
          <Route path="/story"      element={<StorySession />} />
          <Route path="/progress"   element={<Progress />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/profile"    element={<ProfilePage />} />
          <Route path="/podcast"    element={<PodcastPage />} />
          <Route path="/ddnews"    element={<DDNewsPage />} />
          <Route path="/course"      element={<SanskritCoursePage />} />
          <Route path="/varnamala"   element={<VarnamalaPage />} />
          <Route path="/alphabet"    element={<AlphabetLearnPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Routes>
        </Suspense>
      </main>

      <ScrollToTop />

      {/* ── Bottom tab bar (mobile) / Left sidebar (desktop) ────────── */}
      <nav className="bottom-nav">
        <div className="sidebar-brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="sidebar-brand-om">ॐ</span>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-deva">संस्कृतम्</span>
            <span className="sidebar-brand-name">SANSKRITLY</span>
          </div>
        </div>

        {/* Mobile: 5 primary tabs */}
        <div className="mobile-tabs">
          <NavLink to="/" end className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
            <div className="tab-icon-wrap">
              <svg className="tab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
            </div>
            <span className="tab-label">Home</span>
          </NavLink>
          <button className={`tab-item ${isStudyActive ? 'active' : ''}`}
            onClick={() => navigate(lastStudy.current)}>
            <div className="tab-icon-wrap">
              <svg className="tab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            </div>
            <span className="tab-label">Study</span>
          </button>
          <button className={`tab-item ${isTextsActive ? 'active' : ''}`}
            onClick={() => navigate(lastTexts.current)}>
            <div className="tab-icon-wrap">
              <svg className="tab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/><path d="M8 4V2M16 4V2"/><path d="M8 11h8M8 8h5"/></svg>
            </div>
            <span className="tab-label">Texts</span>
          </button>
          <NavLink to="/story" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
            <div className="tab-icon-wrap">
              <svg className="tab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
            </div>
            <span className="tab-label">Stories</span>
          </NavLink>
          <button className={`tab-item ${isMoreActive || moreOpen ? 'active' : ''}`}
            onClick={() => setMoreOpen(v => !v)}>
            <div className="tab-icon-wrap">
              <svg className="tab-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>
            </div>
            <span className="tab-label">More</span>
          </button>
        </div>

        {/* Desktop: full grouped sidebar links */}
        <div className="sidebar-links">
          {SIDEBAR_GROUPS.map((group, gi) => (
            <React.Fragment key={gi}>
              {group.label && <div className="sidebar-group-label">{group.label}</div>}
              {group.items.map(t => (
                <NavLink key={t.to} to={t.to} end={t.end}
                  className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                  <span className="tab-icon">{t.icon}</span>
                  <span className="tab-label">{t.label}</span>
                </NavLink>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop footer */}
        <div className="sidebar-foot">
          <button
            className={`sidebar-avatar-btn ${onProfile ? 'active' : ''}`}
            onClick={() => navigate(onProfile ? '/' : '/profile')}
            aria-label="Settings"
          >
            ⚙
          </button>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Sanskritly</div>
            {isPro
              ? <div className="sidebar-user-streak">✦ Full Access</div>
              : <button className="sidebar-unlock-btn" onClick={showPaywall}>✦ Unlock</button>
            }
          </div>
          {streak > 0 && (
            <div className="sidebar-streak-badge">🔥 {streak}</div>
          )}
        </div>
      </nav>

      {/* More sheet (mobile) */}
      {moreOpen && (
        <>
          <div className="more-overlay" onClick={() => setMoreOpen(false)} />
          <div className="more-sheet">
            <div className="more-sheet-title">More</div>
            <div className="more-sheet-grid">
              <NavLink to="/podcast" className="more-sheet-item" onClick={() => setMoreOpen(false)}>
                <span className="more-sheet-icon">🎧</span>
                <span className="more-sheet-label">Listen</span>
              </NavLink>
              <NavLink to="/ddnews" className="more-sheet-item" onClick={() => setMoreOpen(false)}>
                <span className="more-sheet-icon">📺</span>
                <span className="more-sheet-label">Skt Vārtā</span>
              </NavLink>
              <NavLink to="/dictionary" className="more-sheet-item" onClick={() => setMoreOpen(false)}>
                <span className="more-sheet-icon">📖</span>
                <span className="more-sheet-label">Dictionary</span>
              </NavLink>
            </div>
          </div>
        </>
      )}

      {/* App update banner */}
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

function AppRoot() {
  const { showPrompt, platform, nativePrompt, install, dismiss } = useInstallPrompt()

  return (
    <>
      <ThemeProvider>
        <SoundProvider>
          <AppShell />
        </SoundProvider>
      </ThemeProvider>

      <PaywallModal />

      {false && showPrompt && (
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
    <PurchaseProvider>
      <AppRoot />
      <SpeedInsights />
      <Analytics />
    </PurchaseProvider>
  )
}
