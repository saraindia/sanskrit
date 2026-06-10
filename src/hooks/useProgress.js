// useProgress.js — central progress store backed by localStorage + IndexedDB
// storageKey is injected by the caller (namespaced per user via AuthContext)
import { useState, useEffect, useCallback } from 'react'
import { setItem, getItem } from '../utils/storage'

const LEGACY_KEY = 'sanskritly_progress_v1'  // kept for migration reference

const defaultState = {
  // SRS: keyed by item id → { easeFactor, interval, nextDue, streak, totalAttempts, correctAttempts, lastSeen }
  srs: {},
  // Grammar concept accuracy: keyed by conceptId → { attempts, correct, lastAttempt, flagged }
  concepts: {},
  // Session history: array of { date, duration, itemsReviewed, score, conceptsTouched }
  sessions: [],
  // Unlocked modules
  unlockedModules: ['beginner-script', 'beginner-vocab'],
  // Overall level
  level: 'beginner',
  // Streak
  streakDays: 0,
  lastStudyDate: null,
  // Total XP
  xp: 0,
}

// SM-2 spaced repetition algorithm
export function sm2(item, quality) {
  // quality: 0=blackout, 1=wrong, 2=wrong-easy, 3=correct-hard, 4=correct, 5=perfect
  const ef = Math.max(1.3, (item.easeFactor || 2.5) + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  let interval
  if (quality < 3) {
    interval = 1
  } else if ((item.streak || 0) === 0) {
    interval = 1
  } else if ((item.streak || 0) === 1) {
    interval = 6
  } else {
    interval = Math.round((item.interval || 1) * ef)
  }
  const nextDue = Date.now() + interval * 24 * 60 * 60 * 1000
  return {
    easeFactor: ef,
    interval,
    nextDue,
    streak: quality >= 3 ? (item.streak || 0) + 1 : 0,
  }
}

export function useProgress(storageKey) {
  const key = storageKey || LEGACY_KEY

  const [progress, setProgress] = useState(() => {
    try {
      // Try user-namespaced key first, then legacy key for migration
      const stored = getItem(key) || (key !== LEGACY_KEY ? getItem(LEGACY_KEY) : null)
      if (stored) return { ...defaultState, ...JSON.parse(stored) }
    } catch {}
    return defaultState
  })

  // Re-load when the user switches (key changes)
  useEffect(() => {
    try {
      const stored = getItem(key)
      setProgress(stored ? { ...defaultState, ...JSON.parse(stored) } : defaultState)
    } catch {
      setProgress(defaultState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Persist on every change
  useEffect(() => {
    if (!key) return
    try { setItem(key, JSON.stringify(progress)) } catch {}
  }, [progress, key])

  // Record an answer to an SRS item
  const recordAnswer = useCallback((itemId, quality, conceptIds = []) => {
    setProgress(prev => {
      const existing = prev.srs[itemId] || {}
      const updated = sm2(existing, quality)
      const newSrs = { ...prev.srs, [itemId]: { ...existing, ...updated, lastSeen: Date.now(), totalAttempts: (existing.totalAttempts || 0) + 1, correctAttempts: (existing.correctAttempts || 0) + (quality >= 3 ? 1 : 0) } }

      // Update concept accuracy
      const newConcepts = { ...prev.concepts }
      conceptIds.forEach(cid => {
        const c = newConcepts[cid] || { attempts: 0, correct: 0 }
        newConcepts[cid] = {
          ...c,
          attempts: c.attempts + 1,
          correct: c.correct + (quality >= 3 ? 1 : 0),
          lastAttempt: Date.now(),
          // Flag as weak if accuracy drops below 70% over last 10
          flagged: c.attempts >= 5 && (c.correct / c.attempts) < 0.70,
        }
      })

      return { ...prev, srs: newSrs, concepts: newConcepts, xp: prev.xp + (quality >= 3 ? 10 : 2) }
    })
  }, [])

  // Get items due for review now
  const getDueItems = useCallback((allItems) => {
    const now = Date.now()
    return allItems.filter(item => {
      const srsData = progress.srs[item.id]
      if (!srsData) return true // never seen
      return srsData.nextDue <= now
    }).sort((a, b) => {
      const aData = progress.srs[a.id]
      const bData = progress.srs[b.id]
      if (!aData) return -1
      if (!bData) return 1
      return aData.nextDue - bData.nextDue
    })
  }, [progress.srs])

  // Get weak concepts (flagged or accuracy < 70%)
  const getWeakConcepts = useCallback(() => {
    return Object.entries(progress.concepts)
      .filter(([, c]) => c.flagged || (c.attempts >= 5 && c.correct / c.attempts < 0.70))
      .map(([id, c]) => ({ id, accuracy: c.attempts ? Math.round(c.correct / c.attempts * 100) : 0, attempts: c.attempts }))
      .sort((a, b) => a.accuracy - b.accuracy)
  }, [progress.concepts])

  // Save a session
  const saveSession = useCallback((sessionData) => {
    setProgress(prev => {
      const today = new Date().toDateString()
      const streakDays = prev.lastStudyDate === new Date(Date.now() - 86400000).toDateString()
        ? prev.streakDays + 1
        : prev.lastStudyDate === today ? prev.streakDays : 1
      return {
        ...prev,
        sessions: [...prev.sessions.slice(-99), { ...sessionData, date: Date.now() }],
        streakDays,
        lastStudyDate: today,
      }
    })
  }, [])

  // Unlock a module
  const unlockModule = useCallback((moduleId) => {
    setProgress(prev => ({
      ...prev,
      unlockedModules: prev.unlockedModules.includes(moduleId)
        ? prev.unlockedModules
        : [...prev.unlockedModules, moduleId],
    }))
  }, [])

  // Reset all progress
  const resetProgress = useCallback(() => setProgress(defaultState), [])

  // Get item accuracy
  const getItemAccuracy = useCallback((itemId) => {
    const d = progress.srs[itemId]
    if (!d || !d.totalAttempts) return null
    return Math.round(d.correctAttempts / d.totalAttempts * 100)
  }, [progress.srs])

  return {
    progress,
    recordAnswer,
    getDueItems,
    getWeakConcepts,
    saveSession,
    unlockModule,
    resetProgress,
    getItemAccuracy,
  }
}
