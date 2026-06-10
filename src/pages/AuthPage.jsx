import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPage.css'

export default function AuthPage() {
  const { login, register, remembered } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode]               = useState('login')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername]       = useState(remembered?.username || '')
  const [password, setPassword]       = useState(remembered?.password || '')
  const [confirm, setConfirm]         = useState('')
  const [remember, setRemember]       = useState(true)   // default ON
  const [showPass, setShowPass]       = useState(false)
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!displayName.trim())      return setError('Please enter a display name.')
      if (!username.trim())         return setError('Please choose a username.')
      if (/\s/.test(username))      return setError('Username cannot contain spaces.')
      if (password.length < 4)      return setError('Password must be at least 4 characters.')
      if (password !== confirm)     return setError('Passwords do not match.')
    } else {
      if (!username.trim())         return setError('Please enter your username.')
      if (!password)                return setError('Please enter your password.')
    }

    setLoading(true)
    const result = mode === 'register'
      ? await register({ displayName, username, password, remember })
      : await login({ username, password, remember })
    setLoading(false)

    if (!result.ok) setError(result.error)
    else navigate('/', { replace: true })
  }, [mode, displayName, username, password, confirm, remember, login, register])

  const switchMode = (m) => { setMode(m); setError(''); setPassword(''); setConfirm('') }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-circle auth-bg-c1" />
        <div className="auth-bg-circle auth-bg-c2" />
      </div>

      {/* Logo */}
      <div className="auth-logo">
        <span className="auth-logo-deva">ॐ</span>
        <span className="auth-logo-name">SANSKRITLY</span>
        <span className="auth-logo-sub">Learn Sanskrit</span>
      </div>

      {/* Card */}
      <div className="auth-card anim-fade-up">
        <div className="auth-tabs">
          <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => switchMode('login')} type="button">Sign In</button>
          <button className={`auth-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => switchMode('register')} type="button">Create Account</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">

          {/* Display name — register only */}
          {mode === 'register' && (
            <div className="auth-field">
              <label className="auth-label">Display name</label>
              <input
                className="auth-input"
                type="text"
                placeholder="e.g. Arjuna"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                autoComplete="name"
                autoCapitalize="words"
              />
              <span className="auth-field-hint">Shown in the app — can be anything</span>
            </div>
          )}

          {/* Username */}
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder={mode === 'register' ? 'Choose a username' : 'Your username'}
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
            {mode === 'register' && (
              <span className="auth-field-hint">No spaces — used to sign in</span>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label">
              Password
              {mode === 'register' && <span className="auth-label-hint"> (min. 4 characters)</span>}
            </label>
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={showPass ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Create a password' : 'Your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm password — register only */}
          {mode === 'register' && (
            <div className="auth-field">
              <label className="auth-label">Confirm password</label>
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          {/* Remember me */}
          <label className="auth-remember">
            <span className="auth-toggle-wrap">
              <input type="checkbox" className="auth-toggle-input" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <span className="auth-toggle-track"><span className="auth-toggle-thumb" /></span>
            </span>
            <span className="auth-remember-text">Stay signed in on this device</span>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? <span className="auth-spinner" />
              : mode === 'register' ? 'Create Account' : 'Sign In'
            }
          </button>
        </form>

        <p className="auth-footer-note">
          {mode === 'login'
            ? <button className="auth-link" type="button" onClick={() => switchMode('register')}>New here? Create account →</button>
            : <button className="auth-link" type="button" onClick={() => switchMode('login')}>Already have an account? Sign in →</button>
          }
        </p>

        <details className="auth-disclaimer">
          <summary className="auth-disclaimer-title">🔒 Data &amp; Privacy</summary>
          <p>All progress, scores and exercise results are saved in this browser's local storage — no account is created online.</p>
          <p className="auth-disclaimer-warning">⚠️ Switching device, browser, or clearing browser data will erase all progress. Keep practising on the same device.</p>
        </details>
      </div>
    </div>
  )
}
