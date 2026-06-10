/**
 * storage.js — Dual-write localStorage + IndexedDB
 *
 * iOS/WebKit aggressively evicts localStorage when a PWA's service worker is
 * updated. IndexedDB is far more durable under the same conditions.
 *
 * Strategy:
 *   - setItem   → write to localStorage (sync) AND IndexedDB (async backup)
 *   - getItem   → read from localStorage; if missing, try IndexedDB restore
 *   - removeItem → remove from both
 *   - restoreAllFromBackup → call once at app start; if localStorage appears
 *     empty, copy every key from IndexedDB back in so the app boots correctly
 *     even after an eviction event.
 */

const DB_NAME    = 'sanskritly-backup'
const DB_VERSION = 1
const STORE_NAME = 'keyval'

// ── IndexedDB helpers ─────────────────────────────────────────────────────────

let _dbPromise = null

function openDB() {
  if (_dbPromise) return _dbPromise
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    req.onsuccess  = e => resolve(e.target.result)
    req.onerror    = e => { _dbPromise = null; reject(e.target.error) }
  })
  return _dbPromise
}

async function idbSet(key, value) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req   = store.put(value, key)
      req.onsuccess = () => resolve()
      req.onerror   = e => reject(e.target.error)
    })
  } catch (err) {
    // IDB unavailable — swallow, localStorage is still written
    console.warn('[storage] idbSet failed', err)
  }
}

async function idbGet(key) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req   = store.get(key)
      req.onsuccess = e => resolve(e.target.result ?? null)
      req.onerror   = e => reject(e.target.error)
    })
  } catch {
    return null
  }
}

async function idbDelete(key) {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      store.delete(key)
      tx.oncomplete = () => resolve()
      tx.onerror    = () => resolve() // non-fatal
    })
  } catch {
    // swallow
  }
}

async function idbGetAll() {
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx      = db.transaction(STORE_NAME, 'readonly')
      const store   = tx.objectStore(STORE_NAME)
      const result  = {}
      const reqKeys = store.getAllKeys()
      reqKeys.onsuccess = e => {
        const keys     = e.target.result
        const reqVals  = store.getAll()
        reqVals.onsuccess = ev => {
          ev.target.result.forEach((v, i) => { result[keys[i]] = v })
          resolve(result)
        }
        reqVals.onerror = () => resolve(result)
      }
      reqKeys.onerror = () => resolve(result)
    })
  } catch {
    return {}
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * setItem — synchronously writes to localStorage, then async-writes to IDB.
 * Value should be a string (same contract as localStorage.setItem).
 */
export function setItem(key, value) {
  try { localStorage.setItem(key, value) } catch {}
  idbSet(key, value) // fire-and-forget
}

/**
 * getItem — reads from localStorage. Returns string or null (localStorage API).
 * Does NOT fall back to IDB here because this is sync; use restoreAllFromBackup
 * at startup so IDB data is already in localStorage by the time components mount.
 */
export function getItem(key) {
  try { return localStorage.getItem(key) } catch { return null }
}

/**
 * removeItem — removes from both localStorage and IDB.
 */
export function removeItem(key) {
  try { localStorage.removeItem(key) } catch {}
  idbDelete(key) // fire-and-forget
}

/**
 * restoreAllFromBackup — call once before React mounts (in main.jsx).
 *
 * Checks if the localStorage keys Sanskritly needs are present. If they
 * appear to have been wiped (common after a WebKit/iOS SW update), we copy
 * everything from IndexedDB back into localStorage before React boots, so
 * the app sees its data on the very first render.
 *
 * The heuristic: if `sl_users_v1` is absent, assume localStorage was evicted.
 */
export async function restoreAllFromBackup() {
  try {
    const usersPresent = localStorage.getItem('sl_users_v1')
    if (usersPresent) return // nothing evicted, fast path

    const backup = await idbGetAll()
    if (!Object.keys(backup).length) return // no backup either — first install

    console.log('[storage] localStorage eviction detected — restoring from IndexedDB backup')
    Object.entries(backup).forEach(([key, value]) => {
      try { localStorage.setItem(key, value) } catch {}
    })
  } catch (err) {
    console.warn('[storage] restoreAllFromBackup failed', err)
  }
}
