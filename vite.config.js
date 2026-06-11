import { defineConfig } from 'vite'
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

export default defineConfig({
  plugins: [react(), swTimestampPlugin(), akashvaniDevPlugin()],
  server: { port: 3000 }
})
