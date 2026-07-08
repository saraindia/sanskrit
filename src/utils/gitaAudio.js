// Verse counts per chapter (1-indexed, 18 chapters)
const CHAPTER_VERSE_COUNTS = [0, 47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]

// Cumulative offsets: offset[C] = total verses before chapter C
const CHAPTER_OFFSETS = CHAPTER_VERSE_COUNTS.reduce((acc, n, i) => {
  acc.push((acc[i - 1] ?? 0) + (i === 0 ? 0 : CHAPTER_VERSE_COUNTS[i - 1]))
  return acc
}, [])

function rowOffset(chapter, verse) {
  return CHAPTER_OFFSETS[chapter] + (verse - 1)
}

const HF_API = 'https://datasets-server.huggingface.co/rows'
const DATASET = 'JDhruv14/Bhagavad-Gita_Audio'

// In-memory cache: "chapter_verse" → { url, fetchedAt }
const cache = new Map()
const TTL = 20 * 60 * 1000 // 20 min — well within HF's signed-URL expiry

export async function getGitaAudioUrl(chapter, verse) {
  const key = `${chapter}_${verse}`
  const cached = cache.get(key)
  if (cached && Date.now() - cached.fetchedAt < TTL) return cached.url

  const offset = rowOffset(chapter, verse)
  const url = `${HF_API}?dataset=${encodeURIComponent(DATASET)}&config=default&split=train&offset=${offset}&length=1`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HF API ${res.status}`)
  const data = await res.json()
  const audioUrl = data.rows?.[0]?.row?.audio?.[0]?.src
  if (!audioUrl) throw new Error('No audio in response')

  cache.set(key, { url: audioUrl, fetchedAt: Date.now() })
  return audioUrl
}
