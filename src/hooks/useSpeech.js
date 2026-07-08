import { useCallback, useRef, useState, useEffect } from 'react'

// ── Cache voices once loaded ──────────────────────────────────────────────────
let _cachedVoices = []
function loadVoices() {
  const v = window.speechSynthesis?.getVoices() || []
  if (v.length) _cachedVoices = v
  return _cachedVoices
}
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    _cachedVoices = window.speechSynthesis.getVoices()
  })
  // Trigger initial load
  loadVoices()
}

// ── Pick the best available voice for Sanskrit / Hindi ───────────────────────
function getBestVoice() {
  const voices = loadVoices()
  return (
    voices.find(v => v.name === 'Lekha' && v.lang === 'hi-IN') ||
    voices.find(v => v.name.includes('Lekha'))                  ||
    voices.find(v => v.lang === 'hi-IN' && v.localService)      ||  // prefer on-device hi-IN (less robotic)
    voices.find(v => v.lang === 'hi-IN')                        ||
    voices.find(v => v.lang.startsWith('hi'))                   ||
    voices.find(v => v.lang.startsWith('sa'))                   ||
    voices.find(v => v.lang === 'en-IN' && v.localService)      ||
    voices.find(v => v.lang === 'en-IN')                        ||
    null
  )
}

// ── Web Speech utterance ──────────────────────────────────────────────────────
// rate 0.65: slower feels more deliberate; pitch 0.92: slightly warmer/less synthetic
function makeUtterance(text, rate = 0.65) {
  const u = new SpeechSynthesisUtterance(text)
  u.rate  = rate
  u.pitch = 0.92
  u.volume = 1
  const voice = getBestVoice()
  if (voice) { u.voice = voice; u.lang = voice.lang }
  else        { u.lang = 'hi-IN' }
  return u
}

// ── Google Neural TTS (undocumented endpoint — may be blocked) ───────────────
const GTTS = (text, lang = 'hi') =>
  `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`

// ─────────────────────────────────────────────────────────────────────────────
export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [useGoogle, setUseGoogle] = useState(false)   // Web Speech is primary — more reliable
  const audioRef   = useRef(null)
  const stoppedRef = useRef(false)
  const uttRef     = useRef(null)

  // Refresh voice cache after mount (voices may not be ready immediately)
  useEffect(() => {
    const t = setTimeout(loadVoices, 500)
    return () => clearTimeout(t)
  }, [])

  // Stop any in-progress speech when the component using this hook unmounts
  // (e.g. user switches tab while a story is being read aloud)
  useEffect(() => {
    return () => {
      stoppedRef.current = true
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
      window.speechSynthesis?.cancel()
      uttRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Stop everything ────────────────────────────────────────────────────────
  const stop = useCallback(() => {
    stoppedRef.current = true
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    window.speechSynthesis?.cancel()
    uttRef.current = null
    setIsPlaying(false)
    setActiveIdx(-1)
  }, [])

  // ── Web Speech single speak ────────────────────────────────────────────────
  const webSpeak = useCallback((text, rate) => {
    return new Promise((resolve) => {
      window.speechSynthesis.cancel()
      const u = makeUtterance(text, rate)
      uttRef.current = u
      u.onend   = () => { uttRef.current = null; resolve() }
      u.onerror = () => { uttRef.current = null; resolve() }
      window.speechSynthesis.speak(u)
    })
  }, [])

  // ── Google TTS audio clip ──────────────────────────────────────────────────
  const playGTTS = useCallback((text) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audioRef.current = audio
      audio.crossOrigin = 'anonymous'
      audio.src = GTTS(text)
      audio.onended = resolve
      audio.onerror = reject
      audio.onabort = reject
      audio.play().catch(reject)
    })
  }, [])

  // ── Speak one text (single word / phrase) ─────────────────────────────────
  const speak = useCallback(async (text) => {
    if (!text) return
    stop()
    stoppedRef.current = false
    setIsPlaying(true)
    try {
      if (useGoogle) {
        try        { await playGTTS(text) }
        catch      { await webSpeak(text) }   // fallback
      } else {
        await webSpeak(text)
      }
    } catch { /* silent */ }
    finally { setIsPlaying(false) }
  }, [stop, playGTTS, webSpeak, useGoogle])

  // ── Verse playback: split on daṇḍa, speak pāda by pāda ───────────────────
  const speakLines = useCallback(async (text, { onLine, onDone } = {}) => {
    const lines = text.split(/[।॥\n]+/).map(s => s.trim()).filter(Boolean)
    if (!lines.length) return
    stop()
    stoppedRef.current = false
    setIsPlaying(true)
    for (let i = 0; i < lines.length; i++) {
      if (stoppedRef.current) break
      onLine?.(i)
      try {
        if (useGoogle) {
          try   { await playGTTS(lines[i]) }
          catch { await webSpeak(lines[i], 0.55) }
        } else {
          await webSpeak(lines[i], 0.55)
        }
      } catch { /* skip */ }
      if (!stoppedRef.current) await new Promise(r => setTimeout(r, 450))
    }
    if (!stoppedRef.current) { onDone?.(); onLine?.(-1) }
    setIsPlaying(false)
  }, [stop, playGTTS, webSpeak, useGoogle])

  // ── Sequence playback ──────────────────────────────────────────────────────
  const speakSequence = useCallback(async (texts, { onProgress, onDone } = {}) => {
    if (!texts?.length) return
    stop()
    stoppedRef.current = false
    setIsPlaying(true)

    for (let i = 0; i < texts.length; i++) {
      if (stoppedRef.current) break
      setActiveIdx(i)
      onProgress?.(i)

      try {
        if (useGoogle) {
          try   { await playGTTS(texts[i]) }
          catch { await webSpeak(texts[i]) }
        } else {
          await webSpeak(texts[i])
        }
      } catch { /* skip */ }

      if (!stoppedRef.current) await new Promise(r => setTimeout(r, 300))
    }

    if (!stoppedRef.current) { onDone?.(); setActiveIdx(-1) }
    setIsPlaying(false)
  }, [stop, playGTTS, webSpeak, useGoogle])

  // ── Pause / Resume ─────────────────────────────────────────────────────────
  const pause = useCallback(() => {
    audioRef.current?.pause()
    window.speechSynthesis?.pause()
    setIsPlaying(false)
  }, [])

  const resume = useCallback(() => {
    audioRef.current?.play()
    window.speechSynthesis?.resume()
    setIsPlaying(true)
  }, [])

  // ── Toggle engine ──────────────────────────────────────────────────────────
  const toggleEngine = useCallback(() => { stop(); setUseGoogle(v => !v) }, [stop])

  return {
    speak, speakLines, speakSequence, stop, pause, resume,
    isPlaying, activeIdx,
    useGoogle, toggleEngine,
  }
}
