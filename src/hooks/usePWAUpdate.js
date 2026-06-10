// usePWAUpdate — detects new service workers and auto-reloads on update.
//
// Since sw.js now calls skipWaiting() automatically on install, the flow is:
//   1. registration.update() fetches sw.js from the server.
//   2. If byte-different (new deploy) → browser installs the new SW.
//   3. New SW calls skipWaiting() → triggers 'controllerchange'.
//   4. We reload the page → user gets the latest build.
//
// update() is triggered:
//   - On startup (once the SW registration is ready)
//   - Every time the page/tab becomes visible (user opens app from background)
//   - Every 30 minutes while the app is in the foreground

import { useEffect, useState, useCallback } from 'react'

export function usePWAUpdate() {
  const [updateReady, setUpdateReady] = useState(false)
  const [waitingSW,   setWaitingSW]   = useState(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let reg = null

    const trackInstalling = (sw) => {
      sw.addEventListener('statechange', () => {
        if (sw.state === 'installed' && navigator.serviceWorker.controller) {
          // New SW is waiting — since it calls skipWaiting itself, this path
          // is hit only if skipWaiting was already called (rare race).
          setWaitingSW(sw)
          setUpdateReady(true)
        }
      })
    }

    navigator.serviceWorker.ready.then(r => {
      reg = r

      // Check immediately on startup
      r.update().catch(() => {})

      if (r.waiting) {
        setWaitingSW(r.waiting)
        setUpdateReady(true)
      }
      if (r.installing) trackInstalling(r.installing)

      r.addEventListener('updatefound', () => {
        if (r.installing) trackInstalling(r.installing)
      })
    })

    // Re-check whenever the user brings the app to the foreground
    const onVisible = () => {
      if (document.visibilityState === 'visible' && reg) {
        reg.update().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisible)

    // Also poll every 30 minutes while active
    const interval = setInterval(() => {
      if (reg) reg.update().catch(() => {})
    }, 30 * 60 * 1000)

    // Auto-reload when the new SW takes over (skipWaiting already fired)
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    })

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(interval)
    }
  }, [])

  // Manual trigger kept for the update banner (legacy path)
  const updateApp = useCallback(() => {
    if (waitingSW) {
      waitingSW.postMessage({ type: 'SKIP_WAITING' })
    } else {
      window.location.reload()
    }
  }, [waitingSW])

  const dismiss = useCallback(() => setUpdateReady(false), [])

  return { updateReady, updateApp, dismiss }
}
