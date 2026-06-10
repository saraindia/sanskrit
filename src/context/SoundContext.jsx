// SoundContext — manages sound effects enabled/disabled preference per user
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { setItem, getItem } from '../utils/storage'

const SoundContext = createContext(null)

function soundKey(userId) { return `sl_sounds_${userId || 'guest'}` }

export function SoundProvider({ children }) {
  const { user } = useAuth()

  const [soundEnabled, setSoundEnabledState] = useState(() => {
    const saved = getItem(soundKey(user?.id))
    return saved === null ? true : saved === 'true'   // default ON
  })

  // Re-read when user changes (login/logout)
  useEffect(() => {
    const saved = getItem(soundKey(user?.id))
    setSoundEnabledState(saved === null ? true : saved === 'true')
  }, [user?.id])

  const setSoundEnabled = useCallback((v) => {
    setSoundEnabledState(v)
    setItem(soundKey(user?.id), String(v))
  }, [user?.id])

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
