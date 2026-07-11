// ThemeContext — manages UI theme + accessibility preferences
// Theme class is applied to <html>. Large-text bumps base font size.
// Stored per-user in localStorage so each account has its own preference.

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
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
    id:      'slate-ink',
    label:   'Slate Ink',
    desc:    'Cool dark blue-grey with warm gold — clean and editorial',
    icon:    '🖋',
    preview: { bg: '#0c0e14', accent: '#d4a843', text: '#dce5f2', card: '#111520' },
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

const THEME_KEY = 'sl_theme_v1'
const A11Y_KEY  = 'sl_a11y_v1'

function applyTheme(themeId, largeText) {
  const html = document.documentElement
  THEMES.forEach(t => html.classList.remove(`theme-${t.id}`))
  html.classList.remove('large-text')
  html.classList.add(`theme-${themeId}`)
  if (largeText) html.classList.add('large-text')
}

export function ThemeProvider({ children }) {
  const VALID_IDS = new Set(THEMES.map(t => t.id))
  const [themeId, setThemeId] = useState(() => {
    const saved = getItem(THEME_KEY)
    return (saved && VALID_IDS.has(saved)) ? saved : 'high-contrast'
  })
  const [largeText, setLargeText] = useState(() => {
    const saved = getItem(A11Y_KEY)
    return saved === null ? true : saved === 'true'
  })

  useEffect(() => {
    applyTheme(themeId, largeText)
  }, [themeId, largeText])

  const setTheme = useCallback((id) => {
    setThemeId(id)
    setItem(THEME_KEY, id)
  }, [])

  const toggleLargeText = useCallback(() => {
    setLargeText(v => {
      const next = !v
      setItem(A11Y_KEY, String(next))
      return next
    })
  }, [])

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
