// ── Sanskritly Service Worker ─────────────────────────────────────────────────
// BUILD_TIMESTAMP is replaced at build time by vite.config.js so every
// Vercel deploy produces a byte-different sw.js — the browser detects the
// change and installs the new worker automatically.
const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__'
const CACHE_VERSION   = 'sanskritly-' + BUILD_TIMESTAMP

const ASSETS = [
  '/',
  '/index.html',
]

// Injected at build time: every built JS/CSS chunk, content JSON (Gita,
// Upanishads, commentary), icons and manifest — so all pages and texts work
// offline even if never opened. Entries are { u: url, r: content hash } so
// installs can copy unchanged files from the previous version's cache and
// download only what actually changed. In dev the placeholder fails to
// parse → [].
let PRECACHE = []
try { PRECACHE = JSON.parse('__PRECACHE_MANIFEST__') } catch {}
const MANIFEST_KEY = '/__precache-manifest__'

// Install — skipWaiting immediately so new SW activates without user action.
// This means every new Vercel deploy is applied the next time the user opens
// or focuses the app (no manual "Update" tap required).
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_VERSION)
      await cache.addAll(ASSETS)

      // The previous version's cache still exists during install (it's only
      // deleted on activate) — read its fingerprint manifest so unchanged
      // files can be copied over instead of re-downloaded.
      const oldKey = (await caches.keys()).find(k => k !== CACHE_VERSION && k.startsWith('sanskritly-'))
      const oldCache = oldKey ? await caches.open(oldKey) : null
      let oldRevs = {}
      try {
        const m = oldCache && await oldCache.match(MANIFEST_KEY)
        if (m) oldRevs = await m.json()
      } catch {}

      // Settle individually so one flaky file can't block install; anything
      // missed is picked up by runtime caching later.
      await Promise.allSettled(PRECACHE.map(async ({ u, r }) => {
        if (oldCache && oldRevs[u] === r) {
          const prev = await oldCache.match(u)
          if (prev) { await cache.put(u, prev); return }
        }
        await cache.add(u)
      }))

      const revs = Object.fromEntries(PRECACHE.map(({ u, r }) => [u, r]))
      await cache.put(MANIFEST_KEY, new Response(JSON.stringify(revs), {
        headers: { 'Content-Type': 'application/json' },
      }))
    } catch {}
    await self.skipWaiting()   // ← activate immediately
  })())
})

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// Message — keep SKIP_WAITING for any legacy path, also report version
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting()
  if (e.data?.type === 'GET_VERSION')  e.ports[0]?.postMessage({ version: CACHE_VERSION })
})

// Fetch — network-first for navigation, cache-first for static assets
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  if (!e.request.url.startsWith(self.location.origin)) return

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/index.html'))
    )
    return
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached
      return fetch(e.request).then(res => {
        if (res.ok && (
          e.request.url.includes('/assets/') ||
          e.request.url.includes('/content/') ||
          e.request.url.includes('fonts.google')
        )) {
          const clone = res.clone()
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone))
        }
        return res
      })
    })
  )
})
