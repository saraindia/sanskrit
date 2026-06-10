// Thin wrapper around useState that persists to sessionStorage.
// State is cleared when the browser tab/session ends, not on tab switches.
import { useState, useCallback } from 'react'

export function useSessionStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setStored = useCallback((next) => {
    setValue(prev => {
      const val = typeof next === 'function' ? next(prev) : next
      try { sessionStorage.setItem(key, JSON.stringify(val)) } catch {}
      return val
    })
  }, [key])

  return [value, setStored]
}
