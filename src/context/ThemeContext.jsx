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
    id:      'midnight',
    label:   'Midnight',
    desc:    'Deep blue-black with cool silver tones',
    icon:    '🌌',
    preview: { bg: '#080c14', accent: '#6fa8dc', text: '#dde8f5', card: '#101828' },
  },
  {
    id:      'sepia',
    label:   'Sepia',
    desc:    'Warm parchment — easy on the eyes for long sessions',
    icon:    '📜',
    preview: { bg: '#2c1e0f', accent: '#d4872a', text: '#f5e8cc', card: '#3a2a18' },
  },
  {
    id:      'saffron',
    label:   'Saffron',
    desc:    'Vibrant saffron-orange inspired by temple colours',
    icon:    '🔆',
    preview: { bg: '#1a0e04', accent: '#e8821a', text: '#fde8c4', card: '#2a1808' },
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

  const [themeId, setThemeId] = useState(() => {
    const uid = user?.id
    return getItem(themeKey(uid)) || 'high-contrast'
  })
  const [largeText, setLargeText] = useState(() => {
    const uid = user?.id
    const saved = getItem(a11yKey(uid))
    return saved === null ? true : saved === 'true'  // default ON
  })

  // Re-read prefs when user changes
  useEffect(() => {
    const uid = user?.id
    const saved = getItem(themeKey(uid)) || 'high-contrast'
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
