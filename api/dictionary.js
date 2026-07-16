// Vercel serverless function — Sanskrit dictionary via Claude Haiku.
// POST /api/dictionary  { word: "गज" | "elephant" | "gaja" }
//
// Flow:
//   1. Race-guard: check GitHub shared dict for this word first
//   2. If found → return immediately (no Claude call)
//   3. If not → call Claude Haiku to generate word + 10 sentences
//   4. Write result to GitHub (word file, category index, global index)
//   5. Return result

const GITHUB_TOKEN  = process.env.GITHUB_DICT_TOKEN
const GITHUB_REPO   = 'saraindia/sanskrit'
const GITHUB_BRANCH = 'main'
const GH_API        = `https://api.github.com/repos/${GITHUB_REPO}/contents`
const GH_RAW        = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`

const CATEGORIES = [
  'animals', 'birds', 'body-parts', 'celebrations', 'clothes', 'colors',
  'emotions', 'flowers', 'food', 'fruits', 'furniture', 'greetings', 'home',
  'insects', 'jewellery', 'learning', 'math', 'nature', 'numbers', 'occupations',
  'people', 'philosophy', 'places', 'relationships', 'religion', 'science',
  'seasons', 'sports', 'technology', 'time', 'tools', 'transportation',
  'trees-plants', 'vegetables', 'yoga', 'miscellaneous',
]

// ── GitHub helpers ────────────────────────────────────────────────────────────

async function ghGet(path, token) {
  const res = await fetch(`${GH_API}/${path}`, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub GET /${path}: HTTP ${res.status}`)
  const file = await res.json()
  return { sha: file.sha, content: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) }
}

async function ghPut(path, content, sha, message, token) {
  const body = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2) + '\n').toString('base64'),
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {})
  }
  const res = await fetch(`${GH_API}/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub PUT /${path}: HTTP ${res.status} — ${err.slice(0, 300)}`)
  }
}

// Read-modify-write with one retry on conflict (sha mismatch)
async function ghUpdate(path, updateFn, message, token) {
  let file = await ghGet(path, token)
  try {
    await ghPut(path, updateFn(file?.content ?? null), file?.sha ?? null, message, token)
  } catch (e) {
    if (/40[89]|422/.test(e.message)) {
      file = await ghGet(path, token)
      await ghPut(path, updateFn(file?.content ?? null), file?.sha ?? null, message, token)
    } else throw e
  }
}

// Check GitHub shared dictionary — uses authenticated Contents API to bypass
// CDN cache delay, preventing duplicate Claude calls for the same word.
async function checkGitHub(word, token) {
  try {
    // Authenticated API gives the latest committed content immediately
    const indexFile = token ? await ghGet('dictionary/_words.json', token) : null
    let index = indexFile?.content ?? null

    if (!index) {
      // Fallback to raw CDN (no token configured)
      const res = await fetch(`${GH_RAW}/dictionary/_words.json`, { headers: { 'Cache-Control': 'no-cache' } })
      if (!res.ok) return null
      index = await res.json()
    }

    const q    = word.trim()
    const qLow = q.toLowerCase()

    if (index[qLow]) {
      const { category } = index[qLow]
      const f = token ? await ghGet(`dictionary/${category}/${qLow}.json`, token) : null
      if (f) return { ...f.content, fromGitHub: true }
      const r = await fetch(`${GH_RAW}/dictionary/${category}/${qLow}.json`)
      if (r.ok) return { ...(await r.json()), fromGitHub: true }
    }
    for (const [slug, meta] of Object.entries(index)) {
      if (meta.word === q || meta.meaning?.toLowerCase() === qLow) {
        const f = token ? await ghGet(`dictionary/${meta.category}/${slug}.json`, token) : null
        if (f) return { ...f.content, fromGitHub: true }
        const r = await fetch(`${GH_RAW}/dictionary/${meta.category}/${slug}.json`)
        if (r.ok) return { ...(await r.json()), fromGitHub: true }
      }
    }
    return null
  } catch { return null }
}

// Write a newly-generated word to three files in GitHub
async function writeToGitHub(slug, category, wordData, token) {
  if (!token) { console.warn('[dictionary] GITHUB_DICT_TOKEN not set — skipping GitHub write'); return }
  try {
    // 1. Word file (create; if 422 conflict, update with sha)
    await ghPut(`dictionary/${category}/${slug}.json`, wordData, null, `dict: add ${slug} (${category})`, token)
      .catch(async (e) => {
        if (e.message.includes('422')) {
          const f = await ghGet(`dictionary/${category}/${slug}.json`, token)
          await ghPut(`dictionary/${category}/${slug}.json`, wordData, f?.sha, `dict: update ${slug}`, token)
        } else throw e
      })

    // 2. Category index
    await ghUpdate(
      `dictionary/${category}/_category.json`,
      (cur) => {
        const list = Array.isArray(cur) ? cur : []
        return list.includes(slug) ? list : [...list, slug].sort()
      },
      `dict: index ${slug} → ${category}`,
      token
    )

    // 3. Global word index
    await ghUpdate(
      `dictionary/_words.json`,
      (cur) => ({ ...(cur || {}), [slug]: { category, word: wordData.word, meaning: wordData.meaning, transliteration: wordData.transliteration || slug } }),
      `dict: global index ← ${slug}`,
      token
    )
  } catch (e) {
    console.error('[dictionary] GitHub write failed (non-fatal):', e.message)
  }
}

// ── Claude prompt ─────────────────────────────────────────────────────────────

function buildPrompt(word) {
  return `You are a Sanskrit language expert. Generate structured data for the Sanskrit word or phrase: "${word}"

Return ONLY a valid JSON object — no markdown, no code fences, no commentary:
{
  "word": "<exact devanagari as provided or corrected>",
  "transliteration": "<IAST romanization, all lowercase, e.g. gaja>",
  "slug": "<same as transliteration but spaces become hyphens, no special chars>",
  "meaning": "<concise English meaning, 1-4 words>",
  "meaningExtended": "<fuller English definition, 1-2 sentences>",
  "gender": "masculine|feminine|neuter|indeclinable",
  "wordType": "noun|verb|adjective|adverb|pronoun|indeclinable",
  "category": "<best fit from: ${CATEGORIES.join(', ')}>",
  "imageQuery": "<1-2 English words for finding a photo of this concept>",
  "sentences": [
    {
      "id": 1,
      "devanagari": "<sentence in Devanagari script>",
      "transliteration": "<full IAST transliteration of the sentence>",
      "english": "<natural English translation>",
      "vachan": "eka|dvi|bahu",
      "linga": "pullinga|striling|napumsaka",
      "kaal": "vartaman|bhoota|bhavishy",
      "type": "statement|question|conversation"
    }
  ]
}

Generate exactly 10 sentences: 3 statements (one per tense), 2 questions, 2 conversational, 1 dual vachan, 1 plural vachan, 1 poetic/philosophical. Use inflected forms naturally.`
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  const { word } = req.body || {}
  if (!word?.trim()) return res.status(400).json({ error: 'word is required' })

  const apiKey   = process.env.ANTHROPIC_API_KEY
  const ghToken  = process.env.GITHUB_DICT_TOKEN

  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })

  // Race guard: check GitHub via authenticated API (bypasses CDN cache delay)
  const existing = await checkGitHub(word.trim(), ghToken)
  if (existing) return res.status(200).json(existing)

  // Generate via Claude
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: buildPrompt(word.trim()) }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(502).json({ error: `Claude API error (${response.status})`, detail: err })
    }

    const data = await response.json()
    if (data.type === 'error') {
      return res.status(502).json({ error: `Claude: ${data.error?.message || 'unknown error'}` })
    }

    const raw = data.content?.[0]?.text || ''
    if (!raw) return res.status(502).json({ error: 'Claude returned empty response' })

    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      return res.status(502).json({ error: 'Invalid JSON from Claude', raw: raw.slice(0, 500) })
    }

    const slug     = (parsed.slug || parsed.transliteration || 'unknown').toLowerCase().replace(/\s+/g, '-')
    const category = CATEGORIES.includes(parsed.category) ? parsed.category : 'miscellaneous'
    const wordData = { ...parsed, slug, category, generatedAt: new Date().toISOString() }

    // Write to GitHub (await so Vercel doesn't kill the process before it completes)
    await writeToGitHub(slug, category, wordData, ghToken)

    return res.status(200).json(wordData)
  } catch (err) {
    console.error('[dictionary] Unexpected error:', err)
    return res.status(500).json({ error: err.message })
  }
}
