// ThemeContext — manages UI theme + accessibility preferences
// Theme class is applied to <html>. Large-text bumps base font size.
// Stored per-user in localStorage so each account has its own preference.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { setItem, getItem } from '../utils/storage'

export const THEMES = [
  {
    id:      'dark-gold',
    label:   'Dark Gold',
    desc:    'Classic — warm dark parchment with gold accents',
    icon:    '🌙',
    preview: { bg: '#0e0b08', accent: '#c9942a', text: '#f0e6d0', card: '#1a1410' },
  },
  {
    id:      'forest',
    label:   'Forest',
    desc:    'Deep green — calm, natural, easy on the eyes',
    icon:    '🌿',
    preview: { bg: '#060e0a', accent: '#34d399', text: '#ecfdf5', card: '#0a1a0f' },
  },
  {
    id:      'carbon',
    label:   'Carbon',
    desc:    'Neutral charcoal with amber — minimal and clean',
    icon:    '⬛',
    preview: { bg: '#0a0b0d', accent: '#fbbf24', text: '#f5f5f4', card: '#111214' },
  },
  {
    id:      'high-contrast',
    label:   'High Contrast',
    desc:    'Vision-friendly — maximum contrast, clear edges',
    icon:    '👁',
    preview: { bg: '#000000', accent: '#ffdd00', text: '#ffffff', card: '#111111' },
  },
  {
    id:      'light',
    label:   'Light Parchment',
    desc:    'Vision-friendly — bright cream background, dark text',
    icon:    '☀️',
    preview: { bg: '#f5efe4', accent: '#9a6a10', text: '#2a1a08', card: '#ede4d4' },
  },
]

const ThemeContext = createContext(null)

function themeKey(userId)  { return userId ? `sl_theme_${userId}`   : 'sl_theme_guest' }
function a11yKey(userId)   { return userId ? `sl_a11y_${userId}`    : 'sl_a11y_guest'  }

function applyTheme(themeId, largeText) {
  const html = document.documentElement
  // Remove all theme classes
  THEMES.forEach(t => html.classList.remove(`theme-${t.id}`))
  html.classList.remove('large-text')
  // Apply new
  html.classList.add(`theme-${themeId}`)
  if (largeText) html.classList.add('large-text')
}

export function ThemeProvider({ children }) {
  const { user } = useAuth()

  const VALID_IDS = new Set(THEMES.map(t => t.id))
  const [themeId, setThemeId] = useState(() => {
    const uid = user?.id
    const saved = getItem(themeKey(uid))
    return (saved && VALID_IDS.has(saved)) ? saved : 'dark-gold'
  })
  const [largeText, setLargeText] = useState(() => {
    const uid = user?.id
    const saved = getItem(a11yKey(uid))
    return saved === null ? true : saved === 'true'  // default ON
  })

  // Re-read prefs when user changes
  useEffect(() => {
    const uid = user?.id
    const rawTheme = getItem(themeKey(uid))
    const saved = (rawTheme && VALID_IDS.has(rawTheme)) ? rawTheme : 'dark-gold'
    const ltRaw = getItem(a11yKey(uid))
    const lt    = ltRaw === null ? true : ltRaw === 'true'  // default ON
    setThemeId(saved)
    setLargeText(lt)
  }, [user?.id])

  // Apply whenever either pref changes
  useEffect(() => {
    applyTheme(themeId, largeText)
  }, [themeId, largeText])

  const setTheme = useCallback((id) => {
    setThemeId(id)
    setItem(themeKey(user?.id), id)
  }, [user?.id])

  const toggleLargeText = useCallback(() => {
    setLargeText(v => {
      const next = !v
      setItem(a11yKey(user?.id), String(next))
      return next
    })
  }, [user?.id])

  return (
    <ThemeContext.Provider value={{ themeId, setTheme, largeText, toggleLargeText }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
