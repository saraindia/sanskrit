// Async loader for vocabulary and sentence data served from /content/data/.
// Data is fetched once and held in memory for the session.

const cache = {}

async function loadJson(name) {
  if (cache[name]) return cache[name]
  const res = await fetch(`/content/data/${name}.json`)
  if (!res.ok) throw new Error(`Failed to load ${name}`)
  cache[name] = await res.json()
  return cache[name]
}

export async function loadVocabulary() {
  return loadJson('vocabulary')
}

export async function loadSentences() {
  return loadJson('sentences')
}
