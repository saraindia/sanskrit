import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import Breadcrumb from '../components/Breadcrumb'
import { ClickableVerse } from '../components/ClickableSentence'
import { useVocabularyData } from '../hooks/useData'
import { usePurchase } from '../context/PurchaseContext'
import { getRamayanaSargaAudioUrl, kandaHasChantAudio } from '../utils/ramayanaAudio'
import './RamayanaPage.css'

const KANDA_COLORS = ['#f97316','#ec4899','#22c55e','#06b6d4','#a855f7','#f59e0b']

const cache = new Map()
async function loadJson(path) {
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(`/content/ramayana/${path}`)
  if (!res.ok) throw new Error(`Could not load ${path}`)
  const data = await res.json()
  cache.set(path, data)
  return data
}

export default function RamayanaPage() {
  const { isPro: _isPro, isChecking, showPaywall, FREE_LIMITS } = usePurchase()
  const isPro = _isPro || isChecking
  const navigate = useNavigate()
  const [manifest, setManifest] = useState(null)
  const [kandaNum, setKandaNum] = useSessionStorage('ram_kanda', 0)   // 0 = kanda list
  const [sargaNum, setSargaNum] = useSessionStorage('ram_sarga', 0)   // 0 = sarga list
  const [verseNum, setVerseNum] = useSessionStorage('ram_verse', 1)
  const [drill, setDrill]       = useSessionStorage('ram_drill', true)
  const [revealed, setRevealed] = useState(false)
  const [sargaData, setSargaData] = useState(null)
  const [error, setError]       = useState(null)
  const [sargaAudioPlaying, setSargaAudioPlaying] = useState(false)
  const sargaAudioRef = useRef(null)
  const { speak, speakLines, isPlaying, stop } = useSpeech()
  const [activeLine, setActiveLine] = useState(-1)
  const [audioLoading, setAudioLoading] = useState(false)
  const cancelRef = useRef(false)
  const vocabData = useVocabularyData()

  useEffect(() => {
    loadJson('manifest.json').then(setManifest).catch(e => setError(e.message))
  }, [])

  useEffect(() => {
    if (!kandaNum || !sargaNum) { setSargaData(null); return }
    let live = true
    loadJson(`k${kandaNum}/s${String(sargaNum).padStart(3,'0')}.json`)
      .then(d => { if (live) setSargaData(d) })
      .catch(e => { if (live) setError(e.message) })
    return () => { live = false }
  }, [kandaNum, sargaNum])

  useEffect(() => {
    cancelRef.current = true
    setAudioLoading(false)
    setRevealed(false)
    stop()
    setActiveLine(-1)
  }, [kandaNum, sargaNum, verseNum]) // eslint-disable-line react-hooks/exhaustive-deps

  const stopSargaAudio = useCallback(() => {
    if (sargaAudioRef.current) { sargaAudioRef.current.pause(); sargaAudioRef.current = null }
    setSargaAudioPlaying(false)
  }, [])

  useEffect(() => () => stopSargaAudio(), [stopSargaAudio])

  const handleVerseSpeak = useCallback((dev) => {
    if (isPlaying || audioLoading) { stop(); setActiveLine(-1); return }
    cancelRef.current = false
    speakLines(dev, { onLine: setActiveLine, onDone: () => setActiveLine(-1) })
  }, [isPlaying, audioLoading, stop, speakLines])

  const playSargaChant = useCallback(() => {
    if (sargaAudioPlaying) { stopSargaAudio(); return }
    const url = getRamayanaSargaAudioUrl(kandaNum, sargaNum)
    if (!url) return
    const audio = new Audio(url)
    sargaAudioRef.current = audio
    audio.onended = () => { sargaAudioRef.current = null; setSargaAudioPlaying(false) }
    audio.onerror = () => { sargaAudioRef.current = null; setSargaAudioPlaying(false) }
    audio.play().then(() => setSargaAudioPlaying(true)).catch(() => setSargaAudioPlaying(false))
  }, [sargaAudioPlaying, kandaNum, sargaNum, stopSargaAudio])

  const openKanda = (n) => {
    if (!isPro && FREE_LIMITS.RAMAYANA_FREE_KANDA && n > FREE_LIMITS.RAMAYANA_FREE_KANDA) {
      showPaywall(); return
    }
    setKandaNum(n); setSargaNum(0); setVerseNum(1)
  }

  const openSarga = (n) => { setSargaNum(n); setVerseNum(1) }

  const next = useCallback(() => {
    if (!sargaData || !manifest) return
    if (verseNum < sargaData.verses.length) return setVerseNum(verseNum + 1)
    // Advance to next sarga
    const kanda = manifest.kandas.find(k => k.kanda === kandaNum)
    if (!kanda) return
    if (sargaNum < kanda.sargas) { setSargaNum(sargaNum + 1); setVerseNum(1); return }
    // Advance to next kanda
    const nextKanda = manifest.kandas.find(k => k.kanda === kandaNum + 1)
    if (nextKanda) { setKandaNum(kandaNum + 1); setSargaNum(1); setVerseNum(1) }
  }, [sargaData, manifest, kandaNum, sargaNum, verseNum, setKandaNum, setSargaNum, setVerseNum])

  const prev = useCallback(() => {
    if (verseNum > 1) return setVerseNum(verseNum - 1)
    if (sargaNum > 1) {
      setSargaNum(sargaNum - 1); setVerseNum(999) // will be clamped after load
    }
  }, [verseNum, sargaNum, setSargaNum, setVerseNum])

  // Clamp verseNum to valid range after sarga loads
  useEffect(() => {
    if (!sargaData) return
    if (verseNum > sargaData.verses.length) setVerseNum(sargaData.verses.length)
  }, [sargaData]) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return (
    <div className="ramayana anim-fade-up">
      <div className="page-header"><h1 className="page-title">Vālmīki Rāmāyaṇa</h1></div>
      <div className="card" style={{padding:'2rem',textAlign:'center'}}>
        <p style={{color:'var(--text-secondary)'}}>{error}</p>
      </div>
    </div>
  )

  if (!manifest) return (
    <div className="ramayana anim-fade-up">
      <div className="page-header"><h1 className="page-title">Vālmīki Rāmāyaṇa</h1></div>
      <div className="card gita-loading">Loading…</div>
    </div>
  )

  // ── Kāṇḍa picker ──────────────────────────────────────────────────────────
  if (!kandaNum) return (
    <div className="ramayana anim-fade-up">
      <Breadcrumb crumbs={[
        { label: 'Sacred Texts', onClick: () => navigate('/texts') },
        { label: 'Vālmīki Rāmāyaṇa' },
      ]} />
      <div className="page-header">
        <h1 className="page-title">Vālmīki Rāmāyaṇa</h1>
        <p className="page-subtitle">वाल्मीकिरामायणम् · 6 kāṇḍas · {manifest.kandas.reduce((s,k)=>s+k.verses,0).toLocaleString()} verses</p>
      </div>
      <div className="ram-kanda-grid">
        {manifest.kandas.map((k, i) => (
          <button key={k.kanda} className="ram-kanda-card" onClick={() => openKanda(k.kanda)}
            style={{ '--kcolor': KANDA_COLORS[i] }}>
            <span className="ram-kanda-num" style={{ color: KANDA_COLORS[i] }}>Kāṇḍa {k.kanda}</span>
            <span className="ram-kanda-dev devanagari">{k.name}</span>
            <span className="ram-kanda-iast">{k.nameIast}</span>
            <span className="ram-kanda-eng">{k.nameEnglish}</span>
            <span className="ram-kanda-sub">{k.sargas} sargas · {k.verses.toLocaleString()} verses</span>
          </button>
        ))}
      </div>
    </div>
  )

  const activeKanda = manifest.kandas.find(k => k.kanda === kandaNum)

  // ── Sarga picker ───────────────────────────────────────────────────────────
  if (!sargaNum) return (
    <div className="ramayana anim-fade-up">
      <Breadcrumb crumbs={[
        { label: 'Sacred Texts', onClick: () => navigate('/texts') },
        { label: 'Rāmāyaṇa', onClick: () => { setKandaNum(0) } },
        { label: activeKanda?.nameIast || `Kāṇḍa ${kandaNum}` },
      ]} />
      <div className="page-header">
        <h1 className="page-title devanagari">{activeKanda?.name}</h1>
        <p className="page-subtitle">{activeKanda?.nameEnglish} · {activeKanda?.sargas} sargas</p>
      </div>
      {kandaHasChantAudio(kandaNum) && (
        <div className="ram-kanda-chant-note">
          🎵 Vishwas Bhide parayana available for this kāṇḍa
        </div>
      )}
      <div className="ram-sarga-grid">
        {activeKanda?.sargas_list.map(s => (
          <button key={s.sarga} className="ram-sarga-card" onClick={() => openSarga(s.sarga)}>
            <span className="ram-sarga-num">Sarga {s.sarga}</span>
            <span className="ram-sarga-count">{s.verses} v</span>
          </button>
        ))}
      </div>
    </div>
  )

  if (!sargaData || sargaData.sarga !== sargaNum) return (
    <div className="ramayana anim-fade-up">
      <div className="page-header"><h1 className="page-title">Vālmīki Rāmāyaṇa</h1></div>
      <div className="card gita-loading">Loading sarga {sargaNum}…</div>
    </div>
  )

  // ── Verse view ─────────────────────────────────────────────────────────────
  const verse = sargaData.verses.find(v => v.v === verseNum) || sargaData.verses[0]
  const showAnswer = !drill || revealed
  const atStart = kandaNum === 1 && sargaNum === 1 && verse.v === 1
  const atEnd = kandaNum === manifest.kandas[manifest.kandas.length-1].kanda
    && sargaNum === activeKanda?.sargas
    && verse.v === sargaData.verses.length
  const hasChantAudio = kandaHasChantAudio(kandaNum)

  return (
    <div className="ramayana anim-fade-up">
      <Breadcrumb crumbs={[
        { label: 'Sacred Texts', onClick: () => navigate('/texts') },
        { label: 'Rāmāyaṇa', onClick: () => setKandaNum(0) },
        { label: activeKanda?.nameIast || `Kāṇḍa ${kandaNum}`, onClick: () => setSargaNum(0) },
        { label: `Sarga ${sargaNum}` },
      ]} />
      <div className="page-header">
        <h1 className="page-title devanagari">{activeKanda?.name}</h1>
        <p className="page-subtitle">Sarga {sargaNum} · {activeKanda?.nameEnglish}</p>
      </div>

      <div className="gita-toolbar">
        <button className="gita-nav-btn" onClick={prev} disabled={atStart} aria-label="Previous verse">←</button>
        <select className="gita-verse-select" value={verse.v}
          onChange={e => setVerseNum(Number(e.target.value))}>
          {sargaData.verses.map(v => (
            <option key={v.v} value={v.v}>Verse {v.v} of {sargaData.verses.length}</option>
          ))}
        </select>
        <button className="gita-nav-btn" onClick={next} disabled={atEnd} aria-label="Next verse">→</button>
        {hasChantAudio && (
          <button className={`gita-chant-btn${sargaAudioPlaying ? ' playing' : ''}`}
            onClick={playSargaChant} title="Play full sarga chant">
            {sargaAudioPlaying ? '◼ Stop' : '🎵 Sarga'}
          </button>
        )}
        <label className="weak-toggle">
          <input type="checkbox" checked={drill} onChange={e => setDrill(e.target.checked)} />
          <span>Drill mode</span>
        </label>
      </div>

      {sargaData.description && (
        <div className="ram-sarga-desc">{sargaData.description}</div>
      )}

      <div className="card gita-verse-card">
        <div className="gita-verse-tags">
          <span className="pill pill-sacred">VR {kandaNum}.{sargaNum}.{verse.v}</span>
          <button
            className={`speak-btn gita-speak${isPlaying ? ' playing' : ''}${audioLoading ? ' loading' : ''}`}
            title={isPlaying ? 'Stop' : 'Hear verse'}
            onClick={() => handleVerseSpeak(verse.dev)}
          >
            <SpeakIcon />
          </button>
        </div>

        <div className={`gita-deva devanagari${isPlaying ? ' verse-playing' : ''}`}>
          <ClickableVerse text={verse.dev} vocabulary={vocabData?.vocabulary} />
        </div>

        {showAnswer ? (
          <div className="gita-answer anim-fade-up">
            <div className="gita-trans">{verse.trans}</div>
            {verse.words?.length > 0 && (
              <div className="gita-words">
                {verse.words.map((wm, i) => (
                  <button key={i} className="gita-word" title="Listen"
                    onClick={() => speak(wm.d)}>
                    <span className="gita-word-deva devanagari">{wm.d}<span className="gita-word-ear">🔊</span></span>
                    <span className="gita-word-en">{wm.m}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button className="btn-primary gita-reveal" onClick={() => setRevealed(true)}>Reveal translation</button>
        )}

        <div className="gita-footer-nav">
          <button className="btn-ghost" onClick={prev} disabled={atStart}>← Previous</button>
          <button className="btn-primary" onClick={next} disabled={atEnd}>Next verse →</button>
        </div>
      </div>
    </div>
  )
}
