import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getCachedWord, setCachedWord, getAllCachedWords, getCachedWordCount } from '../utils/dictCache'
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

async function fetchWikiImage(query) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return data?.thumbnail?.source || data?.originalimage?.source || null
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

function WordDetail({ entry, fromCache, onBack }) {
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
    fetchWikiImage(entry.imageQuery).then(url => {
      setImage(url)
      setImgLoading(false)
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

      {/* Cache status badge */}
      <div className={`dict-cache-badge ${fromCache ? 'cached' : 'live'}`}>
        {fromCache ? (
          <>
            <span className="dict-cache-icon">📦</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">Cached result</span>
              <span className="dict-cache-sub">Saved from a previous Claude lookup — instant, no API call</span>
            </div>
          </>
        ) : (
          <>
            <span className="dict-cache-icon">✦</span>
            <div className="dict-cache-text">
              <span className="dict-cache-label">Built live with Claude</span>
              <span className="dict-cache-sub">First-time lookup — now saved to your dictionary forever</span>
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
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DictionaryPage() {
  const [query, setQuery]           = useState('')
  const [entry, setEntry]           = useState(null)
  const [fromCache, setFromCache]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [history, setHistory]       = useState([])
  const [wordCount, setWordCount]   = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    getCachedWordCount().then(setWordCount)
    getAllCachedWords().then(words => {
      setHistory(words.sort((a, b) => (b.cachedAt || 0) - (a.cachedAt || 0)).slice(0, 20))
    })
  }, [])

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return }
    const q = query.trim().toLowerCase()
    getAllCachedWords().then(words => {
      const matches = words.filter(w =>
        w.cacheKey?.includes(q) ||
        w.word?.includes(query.trim()) ||
        w.transliteration?.toLowerCase().includes(q) ||
        w.meaning?.toLowerCase().includes(q)
      ).slice(0, 6)
      setSuggestions(matches)
    })
  }, [query])

  const lookupWord = useCallback(async (searchWord) => {
    const w = (searchWord || query).trim()
    if (!w) return
    setError(null)
    setSuggestions([])

    // Check cache first
    const cached = await getCachedWord(w)
    if (cached) {
      setEntry(cached)
      setFromCache(true)
      setLoading(false)
      return
    }

    // Live fetch
    setLoading(true)
    setEntry(null)
    try {
      const res  = await fetch('/api/dictionary', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ word: w }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const data = await res.json()

      // Fetch Wikipedia image and store URL with entry so it's cached too
      let imageUrl = null
      if (data.imageQuery) {
        imageUrl = await fetchWikiImage(data.imageQuery)
      }
      const withImage = { ...data, imageUrl }

      await setCachedWord(w, withImage)
      setEntry(withImage)
      setFromCache(false)
      setWordCount(c => c + 1)
      setHistory(prev => [withImage, ...prev.filter(x => x.cacheKey !== withImage.cacheKey)].slice(0, 20))
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [query])

  function handleSubmit(e) {
    e.preventDefault()
    lookupWord()
  }

  function handleHistory(item) {
    setQuery(item.word || item.cacheKey)
    setEntry(item)
    setFromCache(true)
  }

  if (entry) {
    return (
      <div className="dict-page">
        <WordDetail entry={entry} fromCache={fromCache} onBack={() => { setEntry(null); setQuery('') }} />
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
        {wordCount > 0 && (
          <div className="dict-word-count">
            <span className="dict-word-count-icon">📦</span>
            {wordCount} word{wordCount !== 1 ? 's' : ''} cached in your dictionary
          </div>
        )}
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

      {/* Recent history */}
      {!loading && history.length > 0 && (
        <div className="dict-history">
          <div className="dict-history-title">Recent lookups</div>
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

      {/* Empty state */}
      {!loading && history.length === 0 && (
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
