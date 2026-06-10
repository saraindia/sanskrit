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

// Install — skipWaiting immediately so new SW activates without user action.
// This means every new Vercel deploy is applied the next time the user opens
// or focuses the app (no manual "Update" tap required).
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())   // ← activate immediately
  )
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
