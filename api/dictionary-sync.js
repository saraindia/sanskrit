// Vercel serverless function — writes a pre-generated word entry to GitHub.
// POST /api/dictionary-sync  { wordData: { word, transliteration, slug, category, meaning, sentences, ... } }
// No Claude call — only used to sync words already generated (from IndexedDB) to the shared GitHub dict.

const GITHUB_TOKEN  = process.env.GITHUB_DICT_TOKEN
const GITHUB_REPO   = 'saraindia/sanskrit'
const GITHUB_BRANCH = 'main'
const GH_API        = `https://api.github.com/repos/${GITHUB_REPO}/contents`

const CATEGORIES = [
  'animals', 'birds', 'body-parts', 'celebrations', 'clothes', 'colors',
  'emotions', 'flowers', 'food', 'fruits', 'furniture', 'greetings', 'home',
  'insects', 'jewellery', 'learning', 'math', 'nature', 'numbers', 'occupations',
  'people', 'philosophy', 'places', 'relationships', 'religion', 'science',
  'seasons', 'sports', 'technology', 'time', 'tools', 'transportation',
  'trees-plants', 'vegetables', 'yoga', 'miscellaneous',
]

async function ghGet(path) {
  const res = await fetch(`${GH_API}/${path}`, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub GET /${path}: HTTP ${res.status}`)
  const file = await res.json()
  return { sha: file.sha, content: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) }
}

async function ghPut(path, content, sha, message) {
  const body = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2) + '\n').toString('base64'),
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {})
  }
  const res = await fetch(`${GH_API}/${path}`, {
    method: 'PUT',
    headers: { 'Authorization': `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT /${path}: HTTP ${res.status} — ${err.slice(0, 200)}`)
  }
}

async function ghUpdate(path, updateFn, message) {
  let file = await ghGet(path)
  try {
    await ghPut(path, updateFn(file?.content ?? null), file?.sha ?? null, message)
  } catch (e) {
    if (/40[89]|422/.test(e.message)) {
      file = await ghGet(path)
      await ghPut(path, updateFn(file?.content ?? null), file?.sha ?? null, message)
    } else throw e
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  if (!GITHUB_TOKEN) return res.status(500).json({ error: 'GITHUB_DICT_TOKEN not configured' })

  const { wordData } = req.body || {}

  // Basic validation — must have the essential fields
  if (!wordData?.word || !wordData?.transliteration || !Array.isArray(wordData?.sentences) || wordData.sentences.length === 0) {
    return res.status(400).json({ error: 'wordData must include word, transliteration, and sentences[]' })
  }

  const slug     = (wordData.slug || wordData.transliteration).toLowerCase().replace(/\s+/g, '-')
  const category = CATEGORIES.includes(wordData.category) ? wordData.category : 'miscellaneous'
  const wordEntry = { ...wordData, slug, category }

  // Skip if already in GitHub (check authenticated API, no CDN delay)
  const existing = await ghGet(`dictionary/${category}/${slug}.json`)
  if (existing) return res.status(200).json({ ok: true, skipped: true, reason: 'already in shared dictionary' })

  try {
    // Write word file
    await ghPut(`dictionary/${category}/${slug}.json`, wordEntry, null, `dict: sync ${slug} (${category})`)
      .catch(async (e) => {
        if (e.message.includes('422') || e.message.includes('409')) {
          // File exists — update with current sha
          const f = await ghGet(`dictionary/${category}/${slug}.json`)
          if (f) return // Already there, skip
          await ghPut(`dictionary/${category}/${slug}.json`, wordEntry, f?.sha, `dict: sync ${slug}`)
        } else throw e
      })

    // Update category index
    await ghUpdate(
      `dictionary/${category}/_category.json`,
      (cur) => { const l = Array.isArray(cur) ? cur : []; return l.includes(slug) ? l : [...l, slug].sort() },
      `dict: index ${slug} → ${category}`
    )

    // Update global index
    await ghUpdate(
      `dictionary/_words.json`,
      (cur) => ({ ...(cur || {}), [slug]: { category, word: wordEntry.word, meaning: wordEntry.meaning, transliteration: wordEntry.transliteration || slug } }),
      `dict: global index ← ${slug}`
    )

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[dictionary-sync] error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
