import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin: post-process the output sw.js —
//  1. replace __BUILD_TIMESTAMP__ with the build time so every deploy produces
//     a byte-different SW file (browser auto-installs the new worker)
//  2. replace __PRECACHE_MANIFEST__ with the full list of built assets and
//     content JSON so the whole app works offline, including pages and
//     texts the user has never opened.
function swTimestampPlugin() {
  return {
    name: 'sw-timestamp',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const swPath = path.join(distDir, 'sw.js')
      if (!fs.existsSync(swPath)) return

      // Each entry carries a content fingerprint so the SW can tell which
      // files actually changed since the previous deploy and reuse the rest
      // from the old cache instead of re-downloading them.
      const precache = []
      const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) { walk(full); continue }
          const rel = '/' + path.relative(distDir, full).split(path.sep).join('/')
          if (rel === '/sw.js' || rel === '/index.html') continue
          if (/\.(js|css|json|png|svg|woff2?)$/.test(rel)) {
            const rev = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex').slice(0, 12)
            precache.push({ u: rel, r: rev })
          }
        }
      }
      walk(distDir)

      const ts = Date.now().toString()
      const src = fs.readFileSync(swPath, 'utf8')
      fs.writeFileSync(swPath, src
        .replace(/__BUILD_TIMESTAMP__/g, ts)
        .replace(/'__PRECACHE_MANIFEST__'/g, JSON.stringify(JSON.stringify(precache))))
      console.log(`[sw-timestamp] stamped sw.js → ${ts}, precache: ${precache.length} files`)
    }
  }
}

// Plugin: dev middleware that mimics the /api/akashvani Vercel serverless function.
// In production Vercel executes api/akashvani.js server-side; locally Vite would
// just serve the file as text, so we intercept the route here instead.
function akashvaniDevPlugin() {
  return {
    name: 'akashvani-dev',
    configureServer(server) {
      server.middlewares.use('/api/akashvani', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')

        try {
          // Parse ?page= from query string
          const url = new URL(req.url, 'http://localhost')
          const page = parseInt(url.searchParams.get('page')) || 1

          const body = new URLSearchParams({
            action:   'filter_rnunsdaudio_bulletins',
            language: 'Sanskrit',
            page:     '1',
          })

          const upstream = await fetch('https://newsonair.gov.in/wp-admin/admin-ajax.php', {
            method: 'POST',
            headers: {
              'Content-Type':     'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest',
              'Referer':          'https://newsonair.gov.in/rnu-nsd-audio-archive-search/',
              'User-Agent':       'Mozilla/5.0 (compatible; Sanskritly/1.0)',
            },
            body: body.toString(),
          })

          const html = await upstream.text()

          if (html.includes('No posts found')) {
            return res.end(JSON.stringify({ episodes: [], hasMore: false }))
          }

          const episodes = []
          const liMatches = html.match(/<li class="col-lg-[^"]*"[^>]*>[\s\S]*?<\/li>/g) || []

          const guessSlot = (url) => {
            if (/065[0-9]|0[67][0-9]{2}/i.test(url)) return { title: 'Morning Bulletin', time: '06:55' }
            if (/182[0-9]|183[0-9]/i.test(url))       return { title: 'Evening Bulletin', time: '18:20' }
            return { title: 'News Bulletin', time: '' }
          }

          for (const li of liMatches) {
            const dateMatch = li.match(/<p[^>]*class="text-center[^"]*"[^>]*>([\s\S]*?)<\/p>/)
            const date = dateMatch ? dateMatch[1].trim() : ''
            const srcMatch = li.match(/<source src="([^"]+\.mp3)"/)
            const audioUrl = srcMatch ? srcMatch[1] : null
            if (audioUrl) {
              const { title, time } = guessSlot(audioUrl)
              episodes.push({ title, time, date, audioUrl })
            }
          }

          res.end(JSON.stringify({ episodes, hasMore: false }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to fetch episodes', detail: err.message }))
        }
      })
    }
  }
}

function ddNewsDevPlugin() {
  const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCYOv0QZr2B70Rkx_ZqIA84w'

  function parseRSS(xml) {
    const entries = []
    const entryRe = /<entry>([\s\S]*?)<\/entry>/g
    let m
    while ((m = entryRe.exec(xml)) !== null) {
      const block   = m[1]
      const videoId = (block.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1]
      const title   = (block.match(/<title>(.*?)<\/title>/)           || [])[1]
      const date    = (block.match(/<published>(.*?)<\/published>/)   || [])[1]
      if (videoId && title) entries.push({ videoId, title, date: date || '' })
    }
    return entries
  }

  return {
    name: 'ddnews-dev',
    configureServer(server) {
      server.middlewares.use('/api/ddnews', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        try {
          const upstream = await fetch(RSS_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Sanskritly/1.0)' }
          })
          const xml      = await upstream.text()
          const videos   = parseRSS(xml).filter(v => /sanskrit/i.test(v.title))
          res.end(JSON.stringify({ videos }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Failed to fetch DD News RSS', detail: err.message }))
        }
      })
    }
  }
}

function dictionaryIndexDevPlugin(env) {
  const GITHUB_REPO = 'saraindia/sanskrit'
  const GH_API      = `https://api.github.com/repos/${GITHUB_REPO}/contents`

  return {
    name: 'dictionary-index-dev',
    configureServer(server) {
      server.middlewares.use('/api/dictionary-index', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (req.method === 'OPTIONS') { res.statusCode = 200; return res.end() }
        if (req.method !== 'GET') { res.statusCode = 405; return res.end(JSON.stringify({ error: 'Method not allowed' })) }

        const ghToken = env.GITHUB_DICT_TOKEN
        try {
          const headers = { 'Accept': 'application/vnd.github.v3+json' }
          if (ghToken) headers['Authorization'] = `token ${ghToken}`

          const ghRes = await fetch(`${GH_API}/dictionary/_words.json`, { headers })
          if (ghRes.status === 404) return res.end(JSON.stringify({}))
          if (!ghRes.ok) throw new Error(`GitHub API: HTTP ${ghRes.status}`)

          const file    = await ghRes.json()
          const content = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'))
          res.end(JSON.stringify(content))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    }
  }
}

function dictionarySyncDevPlugin(env) {
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
      headers: { 'Authorization': `token ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github.v3+json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`GitHub PUT /${path}: HTTP ${res.status} — ${err.slice(0, 200)}`)
    }
  }

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

  return {
    name: 'dictionary-sync-dev',
    configureServer(server) {
      server.middlewares.use('/api/dictionary-sync', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (req.method === 'OPTIONS') { res.statusCode = 200; return res.end() }
        if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ error: 'Method not allowed' })) }

        const ghToken = env.GITHUB_DICT_TOKEN
        if (!ghToken) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'GITHUB_DICT_TOKEN not set' })) }

        const chunks = []
        req.on('data', chunk => chunks.push(chunk))
        req.on('end', async () => {
          try {
            const { wordData } = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
            if (!wordData?.word || !wordData?.transliteration || !Array.isArray(wordData?.sentences) || !wordData.sentences.length) {
              res.statusCode = 400
              return res.end(JSON.stringify({ error: 'wordData must include word, transliteration, and sentences[]' }))
            }

            const slug     = (wordData.slug || wordData.transliteration).toLowerCase().replace(/\s+/g, '-')
            const category = CATEGORIES.includes(wordData.category) ? wordData.category : 'miscellaneous'
            const wordEntry = { ...wordData, slug, category }

            // Skip if already exists
            const existing = await ghGet(`dictionary/${category}/${slug}.json`, ghToken)
            if (existing) return res.end(JSON.stringify({ ok: true, skipped: true }))

            await ghPut(`dictionary/${category}/${slug}.json`, wordEntry, null, `dict: sync ${slug} (${category})`, ghToken)
              .catch(async (e) => {
                if (e.message.includes('422') || e.message.includes('409')) {
                  const f = await ghGet(`dictionary/${category}/${slug}.json`, ghToken)
                  if (f) return // Already there, nothing to do
                  await ghPut(`dictionary/${category}/${slug}.json`, wordEntry, f?.sha, `dict: sync ${slug}`, ghToken)
                } else throw e
              })

            await ghUpdate(
              `dictionary/${category}/_category.json`,
              (cur) => { const l = Array.isArray(cur) ? cur : []; return l.includes(slug) ? l : [...l, slug].sort() },
              `dict: index ${slug} → ${category}`, ghToken
            )
            await ghUpdate(
              `dictionary/_words.json`,
              (cur) => ({ ...(cur || {}), [slug]: { category, word: wordEntry.word, meaning: wordEntry.meaning, transliteration: wordEntry.transliteration || slug } }),
              `dict: global index ← ${slug}`, ghToken
            )

            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            console.error('[dict-sync-dev] error:', err.message)
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}

function dictionaryDevPlugin(env) {
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

  // Use authenticated Contents API (bypasses CDN cache) when token is available
  async function checkGitHub(word, token) {
    try {
      // Prefer authenticated API (no CDN delay) to avoid duplicate Claude calls
      const indexFile = token ? await ghGet('dictionary/_words.json', token) : null
      let index = indexFile?.content ?? null

      if (!index) {
        // Fallback: raw CDN (may be stale by up to 5 min)
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

  async function writeToGitHub(slug, category, wordData, token) {
    if (!token) { console.warn('[dict-dev] GITHUB_DICT_TOKEN not set — skipping GitHub write'); return }
    try {
      await ghPut(`dictionary/${category}/${slug}.json`, wordData, null, `dict: add ${slug} (${category})`, token)
        .catch(async (e) => {
          if (e.message.includes('422')) {
            const f = await ghGet(`dictionary/${category}/${slug}.json`, token)
            await ghPut(`dictionary/${category}/${slug}.json`, wordData, f?.sha, `dict: update ${slug}`, token)
          } else throw e
        })
      await ghUpdate(
        `dictionary/${category}/_category.json`,
        (cur) => { const l = Array.isArray(cur) ? cur : []; return l.includes(slug) ? l : [...l, slug].sort() },
        `dict: index ${slug} → ${category}`, token
      )
      await ghUpdate(
        `dictionary/_words.json`,
        (cur) => ({ ...(cur || {}), [slug]: { category, word: wordData.word, meaning: wordData.meaning, transliteration: wordData.transliteration || slug } }),
        `dict: global index ← ${slug}`, token
      )
    } catch (e) {
      console.error('[dict-dev] GitHub write failed (non-fatal):', e.message)
    }
  }

  // In-process deduplication: if two requests arrive for the same word before
  // the first Claude call completes, the second awaits the first's result.
  const inProgress = new Map() // slug → Promise<wordData>

  return {
    name: 'dictionary-dev',
    configureServer(server) {
      server.middlewares.use('/api/dictionary', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (req.method === 'OPTIONS') { res.statusCode = 200; return res.end() }
        if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ error: 'Method not allowed' })) }

        const chunks = []
        req.on('data', chunk => chunks.push(chunk))
        req.on('end', async () => {
          try {
            const body    = Buffer.concat(chunks).toString('utf8')
            const { word } = JSON.parse(body || '{}')
            if (!word?.trim()) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'word is required' })) }

            const apiKey  = env.ANTHROPIC_API_KEY
            const ghToken = env.GITHUB_DICT_TOKEN
            if (!apiKey) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env' })) }

            // Race guard: check GitHub via authenticated API (no CDN delay)
            const existing = await checkGitHub(word.trim(), ghToken)
            if (existing) return res.end(JSON.stringify(existing))

            // In-process deduplication: if a request for this word is already
            // in-flight, wait for it instead of making a second Claude call
            const wordKey = word.trim().toLowerCase()
            if (inProgress.has(wordKey)) {
              try {
                const result = await inProgress.get(wordKey)
                return res.end(JSON.stringify(result))
              } catch {
                // First request failed — let this one try again
              }
            }

            let resolveInProgress, rejectInProgress
            const pendingPromise = new Promise((resolve, reject) => {
              resolveInProgress = resolve
              rejectInProgress  = reject
            })
            inProgress.set(wordKey, pendingPromise)

            const prompt = `You are a Sanskrit language expert. Generate structured data for the Sanskrit word or phrase: "${word.trim()}"

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
  "imageQuery": "<1-2 English words best for finding a photo of this concept>",
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

            const response = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
              body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 2048, messages: [{ role: 'user', content: prompt }] }),
            })

            if (!response.ok) {
              const errText = await response.text()
              res.statusCode = 502
              return res.end(JSON.stringify({ error: `Claude API error (${response.status}): ${errText}` }))
            }
            const data = await response.json()
            if (data.type === 'error') {
              res.statusCode = 502
              return res.end(JSON.stringify({ error: `Claude: ${data.error?.message || 'unknown error'}` }))
            }
            const raw = data.content?.[0]?.text || ''
            if (!raw) { res.statusCode = 502; return res.end(JSON.stringify({ error: 'Claude returned empty response' })) }

            const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
            let parsed
            try { parsed = JSON.parse(cleaned) }
            catch { res.statusCode = 502; return res.end(JSON.stringify({ error: 'Invalid JSON from Claude', raw: raw.slice(0, 500) })) }

            const slug     = (parsed.slug || parsed.transliteration || 'unknown').toLowerCase().replace(/\s+/g, '-')
            const category = CATEGORIES.includes(parsed.category) ? parsed.category : 'miscellaneous'
            const wordData = { ...parsed, slug, category, generatedAt: new Date().toISOString() }

            await writeToGitHub(slug, category, wordData, ghToken)
            resolveInProgress(wordData)
            inProgress.delete(wordKey)
            res.end(JSON.stringify(wordData))
          } catch (err) {
            rejectInProgress?.(err)
            inProgress.delete(wordKey)
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), swTimestampPlugin(), akashvaniDevPlugin(), ddNewsDevPlugin(), dictionaryIndexDevPlugin(env), dictionarySyncDevPlugin(env), dictionaryDevPlugin(env)],
    base: "./",   // required for Capacitor native builds
    server: { port: 3000 }
  }
})
