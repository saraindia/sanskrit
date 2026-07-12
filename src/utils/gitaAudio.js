// Verse counts per chapter (1-indexed, 18 chapters)
const CHAPTER_VERSE_COUNTS = [0, 47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]

const CHAPTER_OFFSETS = CHAPTER_VERSE_COUNTS.reduce((acc, n, i) => {
  acc.push((acc[i - 1] ?? 0) + (i === 0 ? 0 : CHAPTER_VERSE_COUNTS[i - 1]))
  return acc
}, [])

function rowOffset(chapter, verse) {
  return CHAPTER_OFFSETS[chapter] + (verse - 1)
}

// ── Local static MP3s (served from public/audio/gita/) ───────────────────────
function localUrl(chapter, verse) {
  return `/audio/gita/${chapter}_${verse}.mp3`
}

async function localExists(chapter, verse) {
  try {
    const res = await fetch(localUrl(chapter, verse), { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

// ── HuggingFace fallback ──────────────────────────────────────────────────────
const HF_API = 'https://datasets-server.huggingface.co/rows'
const DATASET = 'JDhruv14/Bhagavad-Gita_Audio'
const hfCache = new Map()
const TTL = 20 * 60 * 1000

async function hfUrl(chapter, verse) {
  const key = `${chapter}_${verse}`
  const cached = hfCache.get(key)
  if (cached && Date.now() - cached.fetchedAt < TTL) return cached.url

  const offset = rowOffset(chapter, verse)
  const url = `${HF_API}?dataset=${encodeURIComponent(DATASET)}&config=default&split=train&offset=${offset}&length=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HF API ${res.status}`)
  const data = await res.json()
  const audioUrl = data.rows?.[0]?.row?.audio?.[0]?.src
  if (!audioUrl) throw new Error('No audio in response')

  hfCache.set(key, { url: audioUrl, fetchedAt: Date.now() })
  return audioUrl
}

// ── Public API ────────────────────────────────────────────────────────────────
// Cache of known-local verses to avoid repeated HEAD requests
const localKnown = new Map()

export async function getGitaAudioUrl(chapter, verse) {
  const key = `${chapter}_${verse}`

  if (localKnown.has(key)) {
    return localKnown.get(key) ? localUrl(chapter, verse) : await hfUrl(chapter, verse)
  }

  const exists = await localExists(chapter, verse)
  localKnown.set(key, exists)
  return exists ? localUrl(chapter, verse) : await hfUrl(chapter, verse)
}
