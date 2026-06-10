// useInstallPrompt — detects platform and manages PWA install state
import { useState, useEffect, useCallback } from 'react'

const DISMISSED_KEY = 'sl_install_dismissed'
const INSTALLED_KEY = 'sl_install_done'

function getPlatform() {
  const ua = navigator.userAgent
  const isIOS     = /iPhone|iPod/.test(ua) && !window.MSStream
  const isIPad    = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /Android/.test(ua)
  const isMac     = /Macintosh/.test(ua) && navigator.maxTouchPoints === 0
  const isWindows = /Windows/.test(ua)
  const isLinux   = /Linux/.test(ua) && !isAndroid

  if (isIOS)     return 'ios'
  if (isIPad)    return 'ipad'
  if (isAndroid) return 'android'
  if (isMac)     return 'mac'
  if (isWindows) return 'windows'
  if (isLinux)   return 'linux'
  return 'desktop'
}

function isAlreadyInstalled() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    localStorage.getItem(INSTALLED_KEY) === 'true'
  )
}

export function useInstallPrompt() {
  const [platform]      = useState(getPlatform)
  const [nativePrompt, setNativePrompt] = useState(null)
  const [showPrompt, setShowPrompt]     = useState(false)
  const [installed, setInstalled]       = useState(isAlreadyInstalled)

  useEffect(() => {
    // Already installed or dismissed recently — don't show
    if (installed) return
    if (localStorage.getItem(DISMISSED_KEY)) return

    // Capture native install prompt (Android / Desktop Chrome/Edge)
    const handler = (e) => {
      e.preventDefault()
      setNativePrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Show after a short delay so the user sees the app first
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 2500)

    // If no native prompt fires (iOS/Safari), still show after delay
    // (iOS needs manual instructions)

    // Track when app is installed via native prompt
    window.addEventListener('appinstalled', () => {
      localStorage.setItem(INSTALLED_KEY, 'true')
      setInstalled(true)
      setShowPrompt(false)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      clearTimeout(timer)
    }
  }, [installed])

  // Trigger native prompt (Android/Desktop) or show instructions
  const install = useCallback(async () => {
    if (nativePrompt) {
      nativePrompt.prompt()
      const { outcome } = await nativePrompt.userChoice
      if (outcome === 'accepted') {
        localStorage.setItem(INSTALLED_KEY, 'true')
        setInstalled(true)
      }
      setNativePrompt(null)
      setShowPrompt(false)
    }
    // For iOS / no native prompt: modal stays open showing instructions
  }, [nativePrompt])

  const dismiss = useCallback((permanent = false) => {
    setShowPrompt(false)
    if (permanent) localStorage.setItem(DISMISSED_KEY, '1')
  }, [])

  return {
    showPrompt,
    platform,
    nativePrompt,   // truthy = native install available
    installed,
    install,
    dismiss,
  }
}
