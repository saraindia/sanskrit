// Per-word IndexedDB cache for the Dictionary feature.
// Each Sanskrit word gets its own record — never a monolithic blob.
// DB: sanskritly-dict  |  Store: words  |  Key: normalized word string

const DB_NAME    = 'sanskritly-dict'
const DB_VERSION = 1
const STORE      = 'words'

let _db = null

function openDB() {
  if (_db) return Promise.resolve(_db)
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'cacheKey' })
        store.createIndex('by_word', 'word', { unique: false })
        store.createIndex('by_cachedAt', 'cachedAt', { unique: false })
      }
    }
    req.onsuccess  = e => { _db = e.target.result; resolve(_db) }
    req.onerror    = e => reject(e.target.error)
  })
}

function normalizeKey(word) {
  return word.trim().toLowerCase()
}

export async function getCachedWord(word) {
  try {
    const db  = await openDB()
    const key = normalizeKey(word)
    return new Promise((resolve, reject) => {
      const tx  = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = e => resolve(e.target.result ?? null)
      req.onerror   = e => reject(e.target.error)
    })
  } catch { return null }
}

export async function setCachedWord(word, data) {
  try {
    const db  = await openDB()
    const key = normalizeKey(word)
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE, 'readwrite')
      const store = tx.objectStore(STORE)
      const entry = { ...data, cacheKey: key, cachedAt: Date.now() }
      const req   = store.put(entry)
      req.onsuccess = () => resolve(entry)
      req.onerror   = e => reject(e.target.error)
    })
  } catch { return null }
}

export async function getAllCachedWords() {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx   = db.transaction(STORE, 'readonly')
      const req  = tx.objectStore(STORE).getAll()
      req.onsuccess = e => resolve(e.target.result ?? [])
      req.onerror   = e => reject(e.target.error)
    })
  } catch { return [] }
}

export async function getCachedWordCount() {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx  = db.transaction(STORE, 'readonly')
      const req = tx.objectStore(STORE).count()
      req.onsuccess = e => resolve(e.target.result)
      req.onerror   = () => resolve(0)
    })
  } catch { return 0 }
}
