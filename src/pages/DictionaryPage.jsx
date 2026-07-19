import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCachedWord, setCachedWord, getAllCachedWords } from '../utils/dictCache'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import HubBack from '../components/HubBack'
import './DictionaryPage.css'

// ── Image helpers ─────────────────────────────────────────────────────────────

const LS_IMG_KEY = 'dict-img-cache-v1'
let _imgCache = null

function getImgCache() {
  if (_imgCache) return _imgCache
  try { _imgCache = JSON.parse(localStorage.getItem(LS_IMG_KEY) || '{}') }
  catch { _imgCache = {} }
  return _imgCache
}

function saveImgCache() {
  try { localStorage.setItem(LS_IMG_KEY, JSON.stringify(_imgCache)) } catch {}
}

async function fetchWikiImage(imageQuery, meaning) {
  const cache = getImgCache()
  const cacheKey = imageQuery || meaning
  if (cacheKey && cache[cacheKey] !== undefined) return cache[cacheKey] || null

  // Wikipedia needs an exact article title. Try progressively simpler terms.
  const candidates = [
    imageQuery,                          // e.g. "sun celestial"
    imageQuery?.split(' ')[0],           // e.g. "sun"
    meaning?.split(',')[0]?.trim(),      // e.g. "river" from "river, stream"
  ].filter(Boolean)

  for (const term of [...new Set(candidates)]) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`)
      if (!res.ok) continue
      const data = await res.json()
      const img = data?.thumbnail?.source || data?.originalimage?.source
      if (img) {
        if (cacheKey) { cache[cacheKey] = img; saveImgCache() }
        return img
      }
    } catch { continue }
  }
  // Cache misses too so we don't re-query on every render
  if (cacheKey) { cache[cacheKey] = ''; saveImgCache() }
  return null
}

// ── GitHub shared dictionary (Layer 2 cache) ──────────────────────────────────

const DICT_RAW = 'https://raw.githubusercontent.com/saraindia/sanskrit-dict/main/dictionary'

// ── Kosha local index (Layer 3 cache) ────────────────────────────────────────

let _mwIndex      = null   // Devanagari key → entry
let _mwAsciiMap   = null   // ascii → Devanagari key
let _usableMap    = null   // inflected form → Devanagari key
let _mwLoading    = null   // in-flight Promise
let _sentences    = null   // Devanagari key → sentences[]
let _sentLoading  = null
let _mwSearchList = null   // flat array for autocomplete — built after MW index loads

async function loadMwIndex() {
  if (_mwIndex)   return
  if (_mwLoading) { await _mwLoading; return }
  _mwLoading = (async () => {
    try {
      const res = await fetch(`${DICT_RAW}/_mw-index.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      _mwIndex    = await res.json()
      _mwAsciiMap = {}
      _usableMap  = {}
      _mwSearchList = []
      for (const [key, e] of Object.entries(_mwIndex)) {
        if (!_mwAsciiMap[e.ascii]) _mwAsciiMap[e.ascii] = key
        _usableMap[key] = key
        if (e.usable) _usableMap[e.usable] = key
        // Pre-build a lowercase search string for fast autocomplete matching
        _mwSearchList.push({
          word: key,
          usable: e.usable || key,
          meaning: e.meaning || '',
          ascii: e.ascii || '',
          category: e.category || '',
          difficulty: e.difficulty || '',
          imageUrl: e.imageUrl || null,
          sampleSa: e.sampleSa || null,
          sampleEn: e.sampleEn || null,
          _search: `${(e.meaning || '').toLowerCase()} ${(e.ascii || '').toLowerCase()} ${key}`,
        })
      }
    } catch (e) {
      console.warn('[dict] MW index load failed:', e.message)
      _mwIndex = {}; _mwAsciiMap = {}; _mwSearchList = []
    }
  })()
  await _mwLoading
}

async function loadSentences() {
  if (_sentences)   return
  if (_sentLoading) { await _sentLoading; return }
  _sentLoading = (async () => {
    try {
      const res = await fetch('/dict-sentences.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      _sentences = await res.json()
    } catch (e) {
      console.warn('[dict] sentences bundle load failed:', e.message)
      _sentences = {}
    }
  })()
  await _sentLoading
}

function searchMwIndex(query) {
  if (!_mwIndex) return null
  const q = query.trim(); const qLow = q.toLowerCase()
  // Keyed by Devanagari. Try: direct, ASCII map, then scan.
  let devKey = null
  if (_mwIndex[q])       devKey = q
  else if (_mwAsciiMap?.[qLow]) devKey = _mwAsciiMap[qLow]
  else {
    const found = Object.entries(_mwIndex).find(([,e]) => e.ascii === qLow || e.meaning?.toLowerCase() === qLow)
    devKey = found?.[0] ?? null
  }
  if (!devKey) return null
  const entry = _mwIndex[devKey]
  const sentences = _sentences?.[devKey] || []
  return { ...entry, slug: entry.ascii || qLow, fromMW: true, sentences }
}

// For typed searches: fetch index via our API (authenticated, no CDN lag),
// then fetch the individual word file from raw CDN (immutable once written).
async function checkSharedDictionary(query) {
  try {
    const res = await fetch('/api/dictionary-index')
    if (!res.ok) return null
    const index = await res.json()
    const q    = query.trim()
    const qLow = q.toLowerCase()

    // Direct IAST slug match
    if (index[qLow]) {
      const { category } = index[qLow]
      const r = await fetch(`${DICT_RAW}/${category}/${qLow}.json`)
      if (r.ok) return r.json()
    }
    // Devanagari word or English meaning match
    for (const [slug, meta] of Object.entries(index)) {
      if (meta.word === q || meta.meaning?.toLowerCase() === qLow) {
        const r = await fetch(`${DICT_RAW}/${meta.category}/${slug}.json`)
        if (r.ok) return r.json()
      }
    }
    return null
  } catch { return null }
}

// For clicking a shared card: we already know category + slug, go direct.
async function fetchSharedWord(slug, category) {
  try {
    const r = await fetch(`${DICT_RAW}/${category}/${slug}.json`)
    if (r.ok) return r.json()
    return null
  } catch { return null }
}

// ── Sentence word tokenizer ───────────────────────────────────────────────────

// Strip leading/trailing Devanagari punctuation to get the bare word
function stripDevaPunct(t) {
  return t.replace(/^[।॥,.!?;:"'()\[\]०-९\s]+|[।॥,.!?;:"'()\[\]०-९\s]+$/g, '')
}

// Render Devanagari sentence text with dict-matched words as clickable spans
function DevaText({ text, onWordClick }) {
  if (!onWordClick || !_usableMap) return <>{text}</>
  // Split keeping delimiters so we can re-join without losing spaces/punctuation
  const tokens = text.split(/(\s+|[।॥,.!?;:"'()\[\]]+)/)
  return (
    <>
      {tokens.map((tok, i) => {
        const bare = stripDevaPunct(tok)
        const key  = bare && _usableMap[bare]
        if (key) {
          return (
            <button
              key={i}
              className="dict-sent-word-link"
              onClick={e => { e.stopPropagation(); onWordClick(key) }}
            >{tok}</button>
          )
        }
        return <span key={i}>{tok}</span>
      })}
    </>
  )
}

// ── Sentence card ─────────────────────────────────────────────────────────────

function SentenceCard({ sentence, index, onWordClick }) {
  const { speak, isPlaying, currentText } = useSpeech()
  const [open, setOpen] = useState(false)
  const isThisPlaying = isPlaying && currentText === sentence.devanagari

  const typeIcon = { statement: '💬', question: '❓', conversation: '🗣️' }
  const kaalLabel = { vartaman: 'Present', bhoota: 'Past', bhavishy: 'Future' }
  const vachanLabel = { eka: 'Sing.', dvi: 'Dual', bahu: 'Plur.' }

  return (
    <div className={`dict-sentence-card ${open ? 'open' : ''}`}>
      <div
        className="dict-sentence-trigger"
        onClick={() => setOpen(o => !o)}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)}
      >
        <span className="dict-sentence-num">{index + 1}</span>
        <span className="dict-sentence-type-icon" title={sentence.type}>{typeIcon[sentence.type] || '💬'}</span>
        <div className="dict-sentence-tags">
          {sentence.kaal && <span className="dict-tag dict-tag-kaal">{kaalLabel[sentence.kaal] || sentence.kaal}</span>}
          {sentence.vachan && <span className="dict-tag dict-tag-vachan">{vachanLabel[sentence.vachan] || sentence.vachan}</span>}
        </div>
        <div className="dict-sentence-deva-inline">
          <DevaText text={sentence.devanagari} onWordClick={onWordClick} />
        </div>
        <span className="dict-sentence-chevron">{open ? '▲' : '▼'}</span>
      </div>
      <div className="dict-sentence-body">
        <button
          className={`dict-speak-btn dict-speak-sentence ${isThisPlaying ? 'playing' : ''}`}
          onClick={e => { e.stopPropagation(); speak(sentence.devanagari) }}
          aria-label="Listen"
        >
          <SpeakIcon size="14px" /> <span>Listen</span>
        </button>
        <div className="dict-sentence-roman">{sentence.transliteration}</div>
        <div className="dict-sentence-english">{sentence.english}</div>
      </div>
    </div>
  )
}

// ── Word detail view ──────────────────────────────────────────────────────────

// source: 'device' | 'shared' | 'dictionary' | 'live'
function WordDetail({ entry, source, onBack, onGenerateSentences, onWordClick, loading: parentLoading, error: parentError, showHeader }) {
  const [image, setImage]           = useState(entry.imageUrl || null)
  const [imgLoading, setImgLoading] = useState(!entry.imageUrl)
  const { speak, isPlaying, currentText } = useSpeech()

  useEffect(() => {
    if (entry.imageUrl) { setImage(entry.imageUrl); setImgLoading(false); return }
    if (!entry.imageQuery) { setImgLoading(false); return }
    fetchWikiImage(entry.imageQuery, entry.meaning).then(url => {
      setImage(url)
      setImgLoading(false)
      if (url && entry.cacheKey) {
        setCachedWord(entry.cacheKey, { ...entry, imageUrl: url })
      }
    })
  }, [entry.imageUrl, entry.imageQuery])

  const sentences = entry.sentences || []

  const isWordPlaying = isPlaying && currentText === entry.word

  return (
    <div className="dict-detail">
      {showHeader && (
        <div className="dict-page-header dict-page-header--compact">
          <div className="dict-page-title-row">
            <h1 className="dict-page-title">शब्दकोशः</h1>
            <span className="dict-page-title-en">Sanskrit Dictionary</span>
          </div>
        </div>
      )}
      {/* Back */}
      <HubBack label="Dictionary" onClick={onBack} />

      {/* Word card */}
      <div className="dict-word-card">
        <div className="dict-word-card-image">
          {image && !imgLoading && <img src={image} alt={entry.meaning} />}
          {(imgLoading || !image) && <div className="dict-word-card-img-placeholder"><span>ॐ</span></div>}
        </div>
        <div className="dict-word-card-body">
          <div className="dict-word-card-en">{entry.meaning}</div>
          <div className="dict-word-card-headline">
            <span className="dict-word-card-dev">{entry.usable || entry.word}</span>
            <button
              className={`dict-speak-inline ${isWordPlaying ? 'playing' : ''}`}
              onClick={() => speak(entry.usable || entry.word)}
              aria-label="Pronounce"
            >
              <SpeakIcon size="13px" />
            </button>
          </div>
          <div className="dict-word-card-meta">
            {entry.usable && entry.usable !== entry.word && (
              <span className="dict-word-card-root-word">{entry.word}</span>
            )}
            {entry.gender && <span className="dict-word-card-gender">{entry.gender}</span>}
            {entry.wordType && <span className="dict-word-card-gender">{entry.wordType}</span>}
          </div>
          <div className="dict-word-card-chips">
            {entry.category && <span className="dict-wc-chip">{entry.category}</span>}
            {entry.difficulty && <span className={`dict-wc-chip dict-wc-diff-${entry.difficulty?.toLowerCase()}`}>{entry.difficulty}</span>}
          </div>
          {(entry.sampleSa || entry.sentences?.[0]) && (
            <div className="dict-word-card-quote">
              <p className="dict-wc-quote-sa">{entry.sampleSa || entry.sentences?.[0]?.devanagari}</p>
              <p className="dict-wc-quote-en">{entry.sampleEn || entry.sentences?.[0]?.english}</p>
            </div>
          )}
          {entry.meaningExtended && !entry.sampleSa && !entry.sentences?.[0] && (
            <p className="dict-wc-note">{entry.meaningExtended}</p>
          )}
          <div className="dict-word-card-source">
            {source === 'device'     && '📦 cached on device'}
            {source === 'shared'     && '🌐 community dictionary'}
            {source === 'dictionary' && '📖 kosha vocabulary'}
            {source === 'live'       && '✦ generated with Claude'}
          </div>
        </div>
      </div>

      {sentences.length > 0 && (
        <div className="dict-sentence-list">
          {sentences.map((s, i) => <SentenceCard key={s.id || i} sentence={s} index={i} onWordClick={onWordClick} />)}
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DictionaryPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery]           = useState(searchParams.get('q') || '')
  const [entry, setEntry]           = useState(null)
  const [entryFromPrefill, setEntryFromPrefill] = useState(false)
  const [source, setSource]         = useState('live') // 'device' | 'shared' | 'live'
  const [loading, setLoading]       = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [error, setError]           = useState(null)
  const [history, setHistory]       = useState([])
  const [sharedWords, setSharedWords] = useState([]) // from GitHub _words.json
  const [suggestions, setSuggestions] = useState([])
  const inputRef      = useRef(null)
  const inFlightRef   = useRef(null)
  const localWordsRef = useRef([])   // raw IndexedDB words (for sync logic)
  const sharedSlugsRef = useRef(null) // Set of slugs already in GitHub

  function syncLocalToGitHub() {
    const local = localWordsRef.current
    const sharedSlugs = sharedSlugsRef.current
    if (!local.length || !sharedSlugs) return

    // Find unique words in IndexedDB not yet in GitHub (by IAST slug)
    const toSync = new Map()
    for (const w of local) {
      const slug = w.slug || w.transliteration
      if (slug && !sharedSlugs.has(slug) && !toSync.has(slug) && w.sentences?.length) {
        toSync.set(slug, w)
      }
    }

    // Fire-and-forget — runs in background, doesn't block UI
    for (const wordData of toSync.values()) {
      fetch('/api/dictionary-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordData }),
      }).catch(() => {})
    }
  }

  useEffect(() => {
    loadMwIndex()    // start loading Kosha index in background
    loadSentences()  // start loading bundled sentences in background
    getAllCachedWords().then(words => {
      localWordsRef.current = words
      // Deduplicate by word (Devanagari) — keep most recently cached entry per word
      const seen = new Map()
      for (const w of words.sort((a, b) => (b.cachedAt || 0) - (a.cachedAt || 0))) {
        const key = w.word || w.cacheKey
        if (!seen.has(key)) seen.set(key, w)
      }
      setHistory([...seen.values()].slice(0, 20))
      syncLocalToGitHub()
    })
    // Load shared dictionary index via our API (uses authenticated GitHub API — no CDN lag)
    fetch('/api/dictionary-index')
      .then(r => r.ok ? r.json() : null)
      .then(index => {
        if (!index) return
        sharedSlugsRef.current = new Set(Object.keys(index))
        const words = Object.entries(index).map(([slug, meta]) => ({
          slug,
          word: meta.word,
          transliteration: meta.transliteration || slug,
          meaning: meta.meaning,
          category: meta.category,
        }))
        setSharedWords(words)
        syncLocalToGitHub()
      })
      .catch(() => {})
    // Auto-lookup if navigated with ?q=
    const initialQ = searchParams.get('q')
    if (initialQ) {
      setTimeout(() => lookupWord(initialQ), 100)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return }
    if (!_mwSearchList) { setSuggestions([]); return }
    const q = query.trim().toLowerCase()
    const matches = []
    for (const e of _mwSearchList) {
      if (e._search.includes(q)) {
        matches.push({ ...e, cacheKey: e.ascii || e.word, transliteration: e.ascii })
        if (matches.length >= 6) break
      }
    }
    setSuggestions(matches)
  }, [query])

  const lookupWord = useCallback(async (searchWord) => {
    const w = (searchWord || query).trim()
    if (!w) return
    // Prevent duplicate in-flight calls for the same word
    if (inFlightRef.current === w) return
    inFlightRef.current = w

    setError(null)
    setSuggestions([])

    // L1: IndexedDB device cache (instant)
    const cached = await getCachedWord(w)
    if (cached) {
      setEntry(cached)
      setSource('device')
      setLoading(false)
      inFlightRef.current = null
      return
    }

    // Use sessionStorage prefill as optimistic entry so the word card shows
    // immediately while we fetch sentences — avoids blank loading screen.
    let hasOptimisticEntry = false
    const prefillRaw = sessionStorage.getItem('dict-prefill')
    if (prefillRaw) {
      try {
        const prefill = JSON.parse(prefillRaw)
        if (prefill.query?.toLowerCase() === w.toLowerCase()) {
          sessionStorage.removeItem('dict-prefill')
          setEntry({ ...prefill, cacheKey: w.toLowerCase(), cachedAt: Date.now() })
          setEntryFromPrefill(true)
          setSource('device')
          hasOptimisticEntry = true
        }
      } catch {}
    }

    setLoading(true)
    if (!hasOptimisticEntry) setEntry(null)
    setLoadingMsg('Checking shared dictionary…')

    try {
      // L2: GitHub shared dictionary (no API cost)
      const shared = await checkSharedDictionary(w)
      if (shared) {
        let imageUrl = shared.imageUrl || null
        if (!imageUrl && shared.imageQuery) imageUrl = await fetchWikiImage(shared.imageQuery, shared.meaning)
        const withImage = { ...shared, imageUrl }
        // Save to L1 under both the typed query and the IAST slug
        await setCachedWord(w, withImage)
        if (shared.slug && shared.slug !== w.toLowerCase()) await setCachedWord(shared.slug, withImage)
        setEntry(withImage)
        setSource('shared')

        setHistory(prev => [withImage, ...prev.filter(x => x.word !== withImage.word)].slice(0, 20))
        setLoading(false)
        return
      }

      // L3: Kosha local index — sentences from bundle if available
      await loadSentences()
      const mwResult = searchMwIndex(w)
      if (mwResult) {
        const withImage = { ...mwResult, imageUrl: mwResult.imageUrl || null }
        setEntry(withImage)
        // If we have bundled sentences, treat as 'shared' so filters/sentences show
        setSource(mwResult.sentences?.length ? 'shared' : 'dictionary')
        setLoading(false)
        inFlightRef.current = null
        return
      }

      // L4: Claude API (generates + writes to GitHub)
      setLoadingMsg('Generating with Claude AI…')
      const res = await fetch('/api/dictionary', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ word: w }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const data = await res.json()

      let imageUrl = data.imageUrl || null
      if (!imageUrl && data.imageQuery) imageUrl = await fetchWikiImage(data.imageQuery, data.meaning)
      const withImage = { ...data, imageUrl }

      await setCachedWord(w, withImage)
      if (data.slug && data.slug !== w.toLowerCase()) await setCachedWord(data.slug, withImage)
      setEntry(withImage)
      setSource('live')
      setHistory(prev => [withImage, ...prev.filter(x => x.word !== withImage.word)].slice(0, 20))
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      inFlightRef.current = null
    }
  }, [query])

  async function generateSentences() {
    if (!entry) return
    const w = entry.word || query
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dictionary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: w }),
      })
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || `HTTP ${res.status}`) }
      const data = await res.json()
      let imageUrl = data.imageUrl || entry.imageUrl || null
      if (!imageUrl && data.imageQuery) imageUrl = await fetchWikiImage(data.imageQuery, data.meaning)
      const withImage = { ...data, imageUrl }
      await setCachedWord(w, withImage)
      if (data.slug && data.slug !== w.toLowerCase()) await setCachedWord(data.slug, withImage)
      setEntry(withImage)
      setSource('live')
      setHistory(prev => [withImage, ...prev.filter(x => x.word !== withImage.word)].slice(0, 20))
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    lookupWord()
  }

  function handleHistory(item) {
    setQuery(item.word || item.cacheKey)
    setEntry(item)
    setSource('device')
  }

  async function handleSharedWord(item) {
    const w = item.word
    setQuery(w)
    setError(null)
    setSuggestions([])

    // L1: device cache
    const cached = await getCachedWord(w)
    if (cached) { setEntry(cached); setSource('device'); return }

    // L2: direct fetch using known category + slug (no index lookup needed)
    setLoading(true)
    setEntry(null)
    try {
      const data = await fetchSharedWord(item.slug, item.category)
      if (data) {
        let imageUrl = data.imageUrl || null
        if (!imageUrl && data.imageQuery) imageUrl = await fetchWikiImage(data.imageQuery, data.meaning)
        const withImage = { ...data, imageUrl }
        await setCachedWord(w, withImage)
        if (item.slug !== w.toLowerCase()) await setCachedWord(item.slug, withImage)
        setEntry(withImage)
        setSource('shared')

        setHistory(prev => [withImage, ...prev.filter(x => x.word !== withImage.word)].slice(0, 20))
        return
      }
      // Fallback: full lookup (generates via Claude if truly missing)
      await lookupWord(w)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (entry) {
    return (
      <div className="dict-page">
        <WordDetail entry={entry} source={source} onBack={() => { setEntry(null); setQuery(''); setEntryFromPrefill(false) }} onGenerateSentences={generateSentences} onWordClick={w => { setQuery(w); lookupWord(w) }} loading={loading} error={error} showHeader={entryFromPrefill} />
      </div>
    )
  }

  return (
    <div className="dict-page">
      {/* Header */}
      <div className="dict-page-header">
        <div className="dict-page-title-row">
          <h1 className="dict-page-title">शब्दकोशः</h1>
          <span className="dict-page-title-en">Sanskrit Dictionary</span>
        </div>
        <p className="dict-page-sub">
          Look up any Sanskrit word to see its meaning, grammar, and 10 example sentences — questions, conversations, tenses, and more.
        </p>
      </div>

      {/* Search */}
      <form className="dict-search-form" onSubmit={handleSubmit}>
        <div className="dict-search-wrap">
          <input
            ref={inputRef}
            className="dict-search-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Sanskrit or English…  e.g. गज, gaja, or forest"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {query && (
            <button type="button" className="dict-search-clear" onClick={() => { setQuery(''); setSuggestions([]); inputRef.current?.focus() }}>✕</button>
          )}
        </div>
        <button type="submit" className="dict-search-btn" disabled={!query.trim() || loading}>
          {loading ? <span className="dict-search-spinner" /> : 'Search'}
        </button>

        {/* Autocomplete suggestions from cache */}
        {suggestions.length > 0 && (
          <div className="dict-suggestions">
            {suggestions.map(s => (
              <button
                key={s.cacheKey}
                type="button"
                className="dict-suggestion-item"
                onClick={() => { setQuery(s.word || s.cacheKey); lookupWord(s.word || s.cacheKey) }}
              >
                <span className="dict-sug-deva">{s.word}</span>
                <span className="dict-sug-roman">{s.transliteration}</span>
                <span className="dict-sug-meaning">{s.meaning}</span>
                <span className="dict-sug-cached">📦</span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Loading state */}
      {loading && (
        <div className="dict-loading">
          <div className="dict-loading-badge">
            <span className="dict-loading-icon">✦</span>
            <div>
              <div className="dict-loading-title">{loadingMsg || 'Looking up…'}</div>
              <div className="dict-loading-sub">{loadingMsg?.includes('Claude') ? 'Generating meaning, grammar, and 10 example sentences' : 'Searching the Sanskrit dictionary'}</div>
            </div>
          </div>
          <div className="dict-loading-dots"><span /><span /><span /></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="dict-error">
          <span>⚠</span> {error}
        </div>
      )}

    </div>
  )
}
