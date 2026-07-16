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

function dictionaryDevPlugin(env) {
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
            const body = Buffer.concat(chunks).toString('utf8')
            const { word } = JSON.parse(body || '{}')
            if (!word?.trim()) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'word is required' })) }

            const apiKey = env.ANTHROPIC_API_KEY
            if (!apiKey) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env' })) }

            const prompt = `You are a Sanskrit language expert. Generate structured data for the Sanskrit word or phrase: "${word.trim()}"

Return ONLY a valid JSON object — no markdown, no code fences, no commentary:
{
  "word": "<exact devanagari as provided or corrected>",
  "transliteration": "<IAST romanization>",
  "meaning": "<concise English meaning, 1-4 words>",
  "meaningExtended": "<fuller English definition, 1-2 sentences>",
  "gender": "masculine|feminine|neuter|indeclinable",
  "wordType": "noun|verb|adjective|adverb|pronoun|indeclinable",
  "imageQuery": "<1-2 English words best for finding a photo of this concept>",
  "sentences": [
    {
      "id": 1,
      "devanagari": "<sentence in Devanagari script>",
      "transliteration": "<full IAST transliteration>",
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
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
              },
              body: JSON.stringify({
                model: 'claude-haiku-4-5',
                max_tokens: 2048,
                messages: [{ role: 'user', content: prompt }],
              }),
            })

            if (!response.ok) {
              const errText = await response.text()
              res.statusCode = 502
              return res.end(JSON.stringify({ error: `Anthropic API error (${response.status}): ${errText}` }))
            }
            const data = await response.json()
            if (data.type === 'error') {
              res.statusCode = 502
              return res.end(JSON.stringify({ error: `Anthropic API: ${data.error?.message || 'unknown error'}` }))
            }
            const raw = data.content?.[0]?.text || ''
            if (!raw) {
              res.statusCode = 502
              return res.end(JSON.stringify({ error: 'Claude returned an empty response', detail: JSON.stringify(data) }))
            }
            const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
            const parsed = JSON.parse(cleaned)
            res.end(JSON.stringify({ ...parsed, generatedAt: new Date().toISOString() }))
          } catch (err) {
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
    plugins: [react(), swTimestampPlugin(), akashvaniDevPlugin(), ddNewsDevPlugin(), dictionaryDevPlugin(env)],
    base: "./",   // required for Capacitor native builds
    server: { port: 3000 }
  }
})
