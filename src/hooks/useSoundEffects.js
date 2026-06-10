// useSoundEffects — Web Audio API tone synthesis, no external files needed
import { useCallback } from 'react'
import { useSoundContext } from '../context/SoundContext'

// Single shared AudioContext (lazy-created on first user interaction)
let _ac = null

function getAc() {
  if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)()
  if (_ac.state === 'suspended') _ac.resume()
  return _ac
}

function tone({ freq = 440, freqEnd = null, type = 'sine', vol = 0.09, dur = 0.08 } = {}) {
  try {
    const ac = getAc()
    const t  = ac.currentTime
    const osc  = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (freqEnd) osc.frequency.linearRampToValueAtTime(freqEnd, t + dur)
    gain.gain.setValueAtTime(0.001, t)
    gain.gain.linearRampToValueAtTime(vol, t + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  } catch (e) { /* AudioContext blocked in some environments — silent fail */ }
}

// ── Sound definitions ─────────────────────────────────────────────────────────
export const SOUNDS = {
  // Soft tap for every button press
  tap: () => tone({ freq: 780, dur: 0.04, vol: 0.055 }),

  // Card flip (rising swish)
  flip: () => tone({ freq: 480, freqEnd: 680, dur: 0.13, vol: 0.08 }),

  // Answer reveal (bright chime)
  reveal: () => tone({ freq: 600, freqEnd: 920, dur: 0.16, vol: 0.1 }),

  // Three-note success chord on Next
  success: () => {
    tone({ freq: 523, dur: 0.1,  vol: 0.10 })                  // C5
    setTimeout(() => tone({ freq: 659, dur: 0.1,  vol: 0.10 }), 95)  // E5
    setTimeout(() => tone({ freq: 784, dur: 0.18, vol: 0.10 }), 190) // G5
  },

  // Gentle blip for tab/nav changes
  nav: () => tone({ freq: 500, dur: 0.055, vol: 0.05 }),

  // Toggle on
  toggleOn:  () => tone({ freq: 620, freqEnd: 740, dur: 0.09, vol: 0.07 }),

  // Toggle off
  toggleOff: () => tone({ freq: 740, freqEnd: 480, dur: 0.09, vol: 0.07 }),

  // Dismiss / close
  dismiss: () => tone({ freq: 340, freqEnd: 240, dur: 0.1, vol: 0.06 }),

  // Correct answer — warm two-note chime rising (C5 → E5 → G5 sparkle)
  correct: () => {
    tone({ freq: 523, type: 'sine',    dur: 0.12, vol: 0.11 })               // C5
    setTimeout(() => tone({ freq: 659, type: 'sine',    dur: 0.12, vol: 0.11 }), 110) // E5
    setTimeout(() => tone({ freq: 1047, type: 'sine',   dur: 0.22, vol: 0.09 }), 210) // C6 sparkle
  },

  // Wrong answer — two low descending thuds, slightly dissonant
  wrong: () => {
    tone({ freq: 220, freqEnd: 160, type: 'triangle', dur: 0.18, vol: 0.13 })
    setTimeout(() => tone({ freq: 185, freqEnd: 130, type: 'triangle', dur: 0.22, vol: 0.10 }), 160)
  },
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useSoundEffects() {
  const { soundEnabled } = useSoundContext()

  const play = useCallback((name) => {
    if (!soundEnabled) return
    SOUNDS[name]?.()
  }, [soundEnabled])

  return { play }
}
