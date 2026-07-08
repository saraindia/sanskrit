import React, { createContext, useContext, useState, useCallback } from 'react'
import { setItem, getItem } from '../utils/storage'

const SoundContext = createContext(null)
const SOUND_KEY = 'sl_sounds_v1'

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    const saved = getItem(SOUND_KEY)
    return saved === null ? true : saved === 'true'
  })

  const setSoundEnabled = useCallback((v) => {
    setSoundEnabledState(v)
    setItem(SOUND_KEY, String(v))
  }, [])

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundContext() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSoundContext must be inside SoundProvider')
  return ctx
}
