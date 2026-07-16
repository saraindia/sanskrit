import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getCachedWord, setCachedWord, getAllCachedWords } from '../utils/dictCache'
import { useSpeech } from '../hooks/useSpeech'
import SpeakIcon from '../components/SpeakIcon'
import './DictionaryPage.css'

// ── Filter config ─────────────────────────────────────────────────────────────

const VACHAN_OPTIONS = [
  { value: 'eka',  label: 'एकवचन',  sub: 'Singular' },
  { value: 'dvi',  label: 'द्विवचन', sub: 'Dual' },
  { value: 'bahu', label: 'बहुवचन', sub: 'Plural' },
]
const LINGA_OPTIONS = [
  { value: 'pullinga',  label: 'पुल्लिङ्ग',   sub: 'Masculine' },
  { value: 'striling',  label: 'स्त्रीलिङ्ग', sub: 'Feminine' },
  { value: 'napumsaka', label: 'नपुंसक',       sub: 'Neuter' },
]
const KAAL_OPTIONS = [
  { value: 'vartaman', label: 'वर्तमान', sub: 'Present' },
  { value: 'bhoota',   label: 'भूत',     sub: 'Past' },
  { value: 'bhavishy', label: 'भविष्य',  sub: 'Future' },
]
const TYPE_OPTIONS = [
  { value: 'statement',    label: 'वाक्य',      sub: 'Statement' },
  { value: 'question',     label: 'प्रश्न',     sub: 'Question' },
  { value: 'conversation', label: 'संवाद',       sub: 'Conversation' },
]

// ── Image helpers ─────────────────────────────────────────────────────────────

async function fetchWikiImage(imageQuery, meaning) {
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
      if (img) return img
    } catch { continue }
  }
  return null
}

// ── GitHub shared dictionary (Layer 2 cache) ──────────────────────────────────

const DICT_RAW = 'https://raw.githubusercontent.com/saraindia/sanskrit-dict/main/dictionary'

// ── Monier-Williams local index (Layer 3 cache) ───────────────────────────────

let _mwIndex    = null   // IAST key → entry
let _mwAsciiMap = null   // ascii → first IAST key (for fast lookup)
let _mwLoading  = null   // in-flight Promise

async function loadMwIndex() {
  if (_mwIndex)   return
  if (_mwLoading) { await _mwLoading; return }
  _mwLoading = (async () => {
    try {
      const res = await fetch(`${DICT_RAW}/_mw-index.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      _mwIndex    = await res.json()
      _mwAsciiMap = {}
      for (const [iast, e] of Object.entries(_mwIndex)) {
        if (!_mwAsciiMap[e.ascii]) _mwAsciiMap[e.ascii] = iast
      }
    } catch (e) {
      console.warn('[dict] MW index load failed:', e.message)
      _mwIndex = {}; _mwAsciiMap = {}
    }
  })()
  await _mwLoading
}

function searchMwIndex(query) {
  if (!_mwIndex) return null
  const q = query.trim(); const qLow = q.toLowerCase()
  const iast  = _mwIndex[qLow] ? qLow : _mwAsciiMap?.[qLow] ?? null
  const entry = iast ? _mwIndex[iast] : Object.values(_mwIndex).find(e => e.word === q)
  if (!entry) return null
  return { ...entry, slug: entry.ascii || iast, fromMW: true, sentences: [] }
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

// ── Filter chip component ─────────────────────────────────────────────────────

function FilterGroup({ label, options, selected, onToggle }) {
  return (
    <div className="dict-filter-group">
      <span className="dict-filter-label">{label}</span>
      <div className="dict-filter-chips">
        {options.map(opt => (
          <button
            key={opt.value}
            className={`dict-chip ${selected.has(opt.value) ? 'active' : ''}`}
            onClick={() => onToggle(opt.value)}
          >
            <span className="dict-chip-deva">{opt.label}</span>
            <span className="dict-chip-sub">{opt.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Sentence card ─────────────────────────────────────────────────────────────

function SentenceCard({ sentence, index }) {
  const { speak, isPlaying, currentText } = useSpeech()
  const isThisPlaying = isPlaying && currentText === sentence.devanagari

  const typeIcon = { statement: '💬', question: '❓', conversation: '🗣️' }
  const kaalLabel = { vartaman: 'Present', bhoota: 'Past', bhavishy: 'Future' }
  const vachanLabel = { eka: 'Sing.', dvi: 'Dual', bahu: 'Plur.' }

  return (
    <div className="dict-sentence-card">
      <div className="dict-sentence-header">
        <span className="dict-sentence-num">{index + 1}</span>
        <span className="dict-sentence-type-icon" title={sentence.type}>{typeIcon[sentence.type] || '💬'}</span>
        <div className="dict-sentence-tags">
          <span className="dict-tag dict-tag-kaal">{kaalLabel[sentence.kaal] || sentence.kaal}</span>
          <span className="dict-tag dict-tag-vachan">{vachanLabel[sentence.vachan] || sentence.vachan}</span>
        </div>
        <button
          className={`dict-speak-btn ${isThisPlaying ? 'playing' : ''}`}
          onClick={() => speak(sentence.devanagari)}
          aria-label="Listen"
        >
          <SpeakIcon size="14px" />
        </button>
      </div>
      <div className="dict-sentence-deva">{sentence.devanagari}</div>
      <div className="dict-sentence-roman">{sentence.transliteration}</div>
      <div className="dict-sentence-english">{sentence.english}</div>
    </div>
  )
}

// ── Word detail view ──────────────────────────────────────────────────────────

// source: 'device' | 'shared' | 'dictionary' | 'live'
function WordDetail({ entry, source, onBack, onGenerateSentences, loading: parentLoading, error: parentError }) {
  const [image, setImage]         = useState(entry.imageUrl || null)
  const [imgLoading, setImgLoading] = useState(!entry.imageUrl)
  const [vachan, setVachan]       = useState(new Set())
  const [linga, setLinga]         = useState(new Set())
  const [kaal, setKaal]           = useState(new Set())
  const [type, setType]           = useState(new Set())
  const { speak, isPlaying, currentText } = useSpeech()

  useEffect(() => {
    if (entry.imageUrl) { setImage(entry.imageUrl); setImgLoading(false); return }
    if (!entry.imageQuery) { setImgLoading(false); return }
    fetchWikiImage(entry.imageQuery, entry.meaning).then(url => {
      setImage(url)
      setImgLoading(false)
      // Backfill the image URL into IndexedDB so future loads are instant
      if (url && entry.cacheKey) {
        setCachedWord(entry.cacheKey, { ...entry, imageUrl: url })
      }
    })
  }, [entry.imageUrl, entry.imageQuery])

  function toggle(setter, value) {
    setter(prev => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }

  const filtered = (entry.sentences || []).filter(s => {
    if (vachan.size && !vachan.has(s.vachan)) return false
    if (linga.size  && !linga.has(s.linga))   return false
    if (kaal.size   && !kaal.has(s.kaal))      return false
    if (type.size   && !type.has(s.type))      return false
    return true
  })

  const isWordPlaying = isPlaying && currentText === entry.word

  return (
    <div className="dict-detail">
      {/* Back */}
      <button className="dict-back-btn" onClick={onBack}>← Back</button>

      {/* Source badge */}
      <div className={`dict-cache-badge ${source === 'device' ? 'cached' : source === 'shared' ? 'shared' : source === 'dictionary' ? 'dictionary' : 'live'}`}>
        {source === 'device' && (
          <>
            <span className="dict-cache-icon">📦</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">Cached on your device</span>
              <span className="dict-cache-sub">Saved from a previous lookup — instant, no API call</span>
            </div>
          </>
        )}
        {source === 'shared' && (
          <>
            <span className="dict-cache-icon">🌐</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">From shared dictionary</span>
              <span className="dict-cache-sub">Another user already looked this up — served from the community dictionary</span>
            </div>
          </>
        )}
        {source === 'dictionary' && (
          <>
            <span className="dict-cache-icon">📖</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">Monier-Williams Dictionary</span>
              <span className="dict-cache-sub">Classical Sanskrit dictionary — add example sentences with Claude below</span>
            </div>
          </>
        )}
        {source === 'live' && (
          <>
            <span className="dict-cache-icon">✦</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">Built live with Claude</span>
              <span className="dict-cache-sub">First-ever lookup — now in the shared dictionary for everyone</span>
            </div>
          </>
        )}
      </div>

      {/* Image hero */}
      <div className="dict-hero">
        {image && !imgLoading && (
          <img className="dict-hero-img" src={image} alt={entry.meaning} />
        )}
        {imgLoading && <div className="dict-hero-placeholder"><span className="dict-hero-om">ॐ</span></div>}
        {!image && !imgLoading && <div className="dict-hero-placeholder dict-hero-no-img"><span className="dict-hero-om">ॐ</span></div>}
        <div className="dict-hero-overlay">
          <div className="dict-hero-word">
            <span className="dict-hero-deva">{entry.word}</span>
            <button
              className={`dict-hero-speak ${isWordPlaying ? 'playing' : ''}`}
              onClick={() => speak(entry.word)}
              aria-label="Pronounce"
            >
              <SpeakIcon size="18px" />
            </button>
          </div>
          <div className="dict-hero-roman">{entry.transliteration}</div>
          <div className="dict-hero-meaning">{entry.meaning}</div>
        </div>
      </div>

      {/* Word metadata */}
      <div className="dict-meta-row">
        {entry.gender && <span className="dict-meta-chip">{entry.gender}</span>}
        {entry.wordType && <span className="dict-meta-chip">{entry.wordType}</span>}
      </div>
      {entry.meaningExtended && (
        <p className="dict-meaning-extended">{entry.meaningExtended}</p>
      )}

      {/* MW-only: no sentences yet */}
      {source === 'dictionary' ? (
        <div className="dict-generate-box">
          <div className="dict-generate-title">उदाहरण वाक्यानि</div>
          <p className="dict-generate-desc">
            Generate 10 example sentences with tenses, filters, and audio — powered by Claude AI.
          </p>
          {parentError && <div className="dict-error">{parentError}</div>}
          <button
            className="dict-generate-btn"
            onClick={onGenerateSentences}
            disabled={parentLoading}
          >
            {parentLoading ? 'Generating…' : '✦ Generate sentences with Claude'}
          </button>
        </div>
      ) : (
        <>
      {/* Filters */}
      <div className="dict-filters">
        <div className="dict-filters-title">Filter sentences</div>
        <FilterGroup label="वचन"  options={VACHAN_OPTIONS} selected={vachan} onToggle={v => toggle(setVachan, v)} />
        <FilterGroup label="लिङ्ग" options={LINGA_OPTIONS}  selected={linga}  onToggle={v => toggle(setLinga, v)} />
        <FilterGroup label="काल"  options={KAAL_OPTIONS}   selected={kaal}   onToggle={v => toggle(setKaal, v)} />
        <FilterGroup label="प्रकार" options={TYPE_OPTIONS}  selected={type}   onToggle={v => toggle(setType, v)} />
        {(vachan.size || linga.size || kaal.size || type.size) ? (
          <button className="dict-clear-filters" onClick={() => { setVachan(new Set()); setLinga(new Set()); setKaal(new Set()); setType(new Set()) }}>
            Clear all filters
          </button>
        ) : null}
      </div>

      {/* Sentences */}
      <div className="dict-sentences-header">
        <span className="dict-sentences-title">उदाहरण वाक्यानि</span>
        <span className="dict-sentences-count">{filtered.length} of {(entry.sentences || []).length}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="dict-no-results">
          <span>No sentences match these filters.</span>
          <button onClick={() => { setVachan(new Set()); setLinga(new Set()); setKaal(new Set()); setType(new Set()) }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="dict-sentence-list">
          {filtered.map((s, i) => <SentenceCard key={s.id || i} sentence={s} index={i} />)}
        </div>
      )}
        </>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DictionaryPage() {
  const [query, setQuery]           = useState('')
  const [entry, setEntry]           = useState(null)
  const [source, setSource]         = useState('live') // 'device' | 'shared' | 'live'
  const [loading, setLoading]       = useState(false)
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
    loadMwIndex() // start loading MW index in background
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
  }, [])

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return }
    const q = query.trim().toLowerCase()
    getAllCachedWords().then(words => {
      const seen = new Set()
      const matches = words.filter(w => {
        if (!( w.cacheKey?.includes(q) ||
               w.word?.includes(query.trim()) ||
               w.transliteration?.toLowerCase().includes(q) ||
               w.meaning?.toLowerCase().includes(q) )) return false
        const key = w.word || w.cacheKey
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).slice(0, 6)
      setSuggestions(matches)
    })
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

    setLoading(true)
    setEntry(null)

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

      // L3: Monier-Williams local index (free, instant — no sentences)
      const mwResult = searchMwIndex(w)
      if (mwResult) {
        let imageUrl = null
        if (mwResult.imageQuery) imageUrl = await fetchWikiImage(mwResult.imageQuery, mwResult.meaning)
        const withImage = { ...mwResult, imageUrl }
        setEntry(withImage)
        setSource('dictionary')
        setLoading(false)
        inFlightRef.current = null
        return
      }

      // L4: Claude API (generates + writes to GitHub)
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
        <WordDetail entry={entry} source={source} onBack={() => { setEntry(null); setQuery('') }} onGenerateSentences={generateSentences} loading={loading} error={error} />
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
        <div className="dict-word-count-row">
          {history.length > 0 && (
            <span className="dict-word-count"><span>📦</span> {history.length} on your device</span>
          )}
          {sharedWords.length > 0 && (
            <span className="dict-word-count shared"><span>🌐</span> {sharedWords.length} in shared dictionary</span>
          )}
        </div>
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
            placeholder="Type in Devanagari or Roman…  e.g. गज or gaja"
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
              <div className="dict-loading-title">Building live with Claude…</div>
              <div className="dict-loading-sub">Generating meaning, grammar, and 10 example sentences</div>
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

      {/* Local recent lookups */}
      {!loading && history.length > 0 && (
        <div className="dict-history">
          <div className="dict-history-title">📦 Your recent lookups</div>
          <div className="dict-history-grid">
            {history.map(item => (
              <button
                key={item.cacheKey}
                className="dict-history-card"
                onClick={() => handleHistory(item)}
              >
                <span className="dict-history-deva">{item.word}</span>
                <span className="dict-history-roman">{item.transliteration}</span>
                <span className="dict-history-meaning">{item.meaning}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shared dictionary from GitHub — visible on any device */}
      {!loading && sharedWords.length > 0 && (() => {
        const localSlugs = new Set(history.map(h => h.slug || h.transliteration || h.cacheKey))
        const unseen = sharedWords.filter(w => !localSlugs.has(w.slug))
        if (unseen.length === 0) return null
        return (
          <div className="dict-history">
            <div className="dict-history-title">🌐 Shared dictionary</div>
            <div className="dict-history-grid">
              {unseen.map(item => (
                <button
                  key={item.slug}
                  className="dict-history-card shared"
                  onClick={() => handleSharedWord(item)}
                >
                  <span className="dict-history-deva">{item.word}</span>
                  <span className="dict-history-roman">{item.transliteration}</span>
                  <span className="dict-history-meaning">{item.meaning}</span>
                </button>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Empty state — only when nothing local AND nothing shared */}
      {!loading && history.length === 0 && sharedWords.length === 0 && (
        <div className="dict-empty">
          <div className="dict-empty-icon">📖</div>
          <div className="dict-empty-title">Your dictionary is empty</div>
          <div className="dict-empty-sub">Search for a Sanskrit word above to build your personal dictionary. Every lookup is saved — search again and it loads instantly.</div>
          <div className="dict-sample-words">
            <span className="dict-sample-label">Try:</span>
            {['गज', 'नदी', 'सूर्य', 'पुस्तक', 'आकाश'].map(w => (
              <button key={w} className="dict-sample-word" onClick={() => { setQuery(w); lookupWord(w) }}>{w}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
