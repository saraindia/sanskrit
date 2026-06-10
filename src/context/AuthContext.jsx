// AuthContext — local-first authentication
// All data lives in localStorage on the device. No server, no network.
// Each user profile gets its own isolated progress namespace.

import React, { createContext, useContext, useState, useCallback } from 'react'
import { setItem, getItem, removeItem } from '../utils/storage'

const USERS_KEY      = 'sl_users_v1'
const SESSION_KEY    = 'sl_session_v1'
const REMEMBERED_KEY = 'sl_remembered_v1'

// ── Helpers ───────────────────────────────────────────────────────────────────
async function sha256(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    let h = 0
    for (let i = 0; i < text.length; i++) h = Math.imul(31, h) + text.charCodeAt(i) | 0
    return Math.abs(h).toString(16).padStart(8, '0')
  }
}

function randomId() {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function loadUsers()    { try { return JSON.parse(getItem(USERS_KEY) || '[]') } catch { return [] } }
function saveUsers(u)   { setItem(USERS_KEY, JSON.stringify(u)) }
function loadSession()  { try { return JSON.parse(getItem(SESSION_KEY)) } catch { return null } }
function saveSession(s) { setItem(SESSION_KEY, JSON.stringify(s)) }
function clearSession() { removeItem(SESSION_KEY) }

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = loadSession()
    if (!session) return null
    const users = loadUsers()
    const found = users.find(u => u.id === session.userId)
    return found
      ? { id: found.id, displayName: found.displayName, username: found.username, initial: found.displayName[0].toUpperCase() }
      : null
  })

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ displayName, username, password, remember = true }) => {
    const users = loadUsers()
    const norm = username.trim().toLowerCase()
    if (users.find(u => u.username === norm)) {
      return { ok: false, error: 'That username is already taken on this device. Try another.' }
    }
    const salt = randomId()
    const passwordHash = await sha256(salt + password)
    const newUser = { id: randomId(), displayName: displayName.trim(), username: norm, passwordHash, salt, createdAt: Date.now() }
    saveUsers([...users, newUser])

    const sessionUser = { id: newUser.id, displayName: newUser.displayName, username: newUser.username, initial: newUser.displayName[0].toUpperCase() }
    if (remember) saveSession({ userId: newUser.id })
    setUser(sessionUser)
    return { ok: true }
  }, [])

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ username, password, remember = true }) => {
    const users = loadUsers()
    const norm = username.trim().toLowerCase()
    const found = users.find(u => u.username === norm)
    if (!found) return { ok: false, error: 'Username not found. Check your username or create a new account.' }

    const hash = await sha256(found.salt + password)
    if (hash !== found.passwordHash) return { ok: false, error: 'Incorrect password.' }

    const sessionUser = { id: found.id, displayName: found.displayName, username: found.username, initial: found.displayName[0].toUpperCase() }
    if (remember) {
      saveSession({ userId: found.id })
      // Save credentials so the login form pre-fills after a manual logout
      setItem(REMEMBERED_KEY, JSON.stringify({ username: norm, password }))
    } else {
      removeItem(REMEMBERED_KEY)
    }
    setUser(sessionUser)
    return { ok: true }
  }, [])

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    // Carry the user's current theme + a11y prefs over to the guest key so
    // the login screen inherits them instead of reverting to the default.
    if (user?.id) {
      const theme = getItem(`sl_theme_${user.id}`)
      const a11y  = getItem(`sl_a11y_${user.id}`)
      if (theme) setItem('sl_theme_guest', theme)
      if (a11y  !== null) setItem('sl_a11y_guest', a11y)
    }
    clearSession()
    setUser(null)
  }, [user])

  const progressKey = user ? `sl_progress_${user.id}` : null

  // Remembered credentials for pre-filling the login form after logout
  const remembered = (() => {
    try { return JSON.parse(getItem(REMEMBERED_KEY)) } catch { return null }
  })()

  return (
    <AuthContext.Provider value={{ user, login, register, logout, progressKey, remembered }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
