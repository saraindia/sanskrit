// build-gita.mjs — generates per-chapter Bhagavad Gita JSON for the app.
//
// Source: https://github.com/gita/gita (Unlicense / public domain).
// Downloads the raw data on first run into scripts/source/ (gitignored),
// then emits public/content/gita/manifest.json + ch01.json … ch18.json.
//
// Run:  node scripts/build-gita.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.join(__dirname, 'source')
const OUT_DIR = path.join(__dirname, '..', 'public', 'content', 'gita')
const BASE = 'https://raw.githubusercontent.com/gita/gita/main/data'
const TRANSLATOR = 'Swami Sivananda'

async function fetchSource(name) {
  const file = path.join(SOURCE_DIR, name)
  if (!fs.existsSync(file)) {
    console.log(`downloading ${name}…`)
    const res = await fetch(`${BASE}/${name}`)
    if (!res.ok) throw new Error(`fetch ${name}: ${res.status}`)
    fs.mkdirSync(SOURCE_DIR, { recursive: true })
    fs.writeFileSync(file, await res.text())
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

// Strip the trailing "।।1.1।।" verse marker and tidy whitespace
function cleanDevanagari(text) {
  return text
    .replace(/।।\s*\d+\.\d+\s*।।/g, '॥')
    .split('\n').map(l => l.trim()).filter(Boolean).join('\n')
}

function cleanIast(text) {
  return text.split('\n').map(l => l.trim()).filter(Boolean).join('\n')
}

// ── Transliteration → Devanagari (for per-word TTS) ──────────────────────
// The source uses a modified IAST (śh/ṣh, ch=c, chh=ch, ṛi=ṛ). Normalize to
// IAST, then convert syllable-by-syllable so the app's Hindi TTS voice can
// pronounce individual words.
const VOWELS = {
  a: ['अ', ''], ā: ['आ', 'ा'], i: ['इ', 'ि'], ī: ['ई', 'ी'], u: ['उ', 'ु'],
  ū: ['ऊ', 'ू'], ṛ: ['ऋ', 'ृ'], ṝ: ['ॠ', 'ॄ'], e: ['ए', 'े'], ai: ['ऐ', 'ै'],
  o: ['ओ', 'ो'], au: ['औ', 'ौ'],
}
const CONSONANTS = {
  kh: 'ख', gh: 'घ', ch: 'छ', jh: 'झ', ṭh: 'ठ', ḍh: 'ढ', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
  k: 'क', g: 'ग', ṅ: 'ङ', c: 'च', j: 'ज', ñ: 'ञ', ṭ: 'ट', ḍ: 'ड', ṇ: 'ण',
  t: 'त', d: 'द', n: 'न', p: 'प', b: 'ब', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व',
  ś: 'श', ṣ: 'ष', s: 'स', h: 'ह',
}
const MARKS = { 'ṁ': 'ं', 'ṃ': 'ं', 'ḥ': 'ः', "'": 'ऽ', '’': 'ऽ' }
const VIRAMA = '्'

function normalizeIast(s) {
  return s.normalize('NFC').toLowerCase()
    .replace(/chh/g, '\u0001')
    .replace(/śh/g, 'ś').replace(/ṣh/g, 'ṣ').replace(/sh/g, 'ś')
    .replace(/ch/g, 'c')
    .replace(/\u0001/g, 'ch')
    .replace(/ṛi/g, 'ṛ')
    .replace(/-/g, '')
}

function iastToDeva(word) {
  const s = normalizeIast(word)
  let out = ''
  let afterCons = false
  let i = 0
  while (i < s.length) {
    const two = s.slice(i, i + 2)
    const one = s[i]
    const vowel = VOWELS[two] || VOWELS[one]
    const vowelLen = VOWELS[two] ? 2 : 1
    const cons = CONSONANTS[two] || CONSONANTS[one]
    const consLen = CONSONANTS[two] ? 2 : 1
    if (cons && !(VOWELS[two] && consLen === 1)) {
      if (afterCons) out += VIRAMA
      out += cons
      afterCons = true
      i += consLen
    } else if (vowel) {
      out += afterCons ? vowel[1] : vowel[0]
      afterCons = false
      i += vowelLen
    } else if (MARKS[one]) {
      if (afterCons) { out += VIRAMA; afterCons = false }
      out += MARKS[one]
      i += 1
    } else if (one === ' ') {
      if (afterCons) { out += VIRAMA; afterCons = false }
      out += ' '
      i += 1
    } else {
      i += 1
    }
  }
  if (afterCons) out += VIRAMA
  return out
}

// "karma-ṇi—in duties; te—your" → [{ w, m, d }]
function parseWords(meanings) {
  if (!meanings) return []
  return meanings.split(';')
    .map(pair => {
      const [w, ...rest] = pair.split('—')
      const m = rest.join('—').trim()
      if (!w || !w.trim() || !m) return null
      const word = w.trim()
      return { w: word, m, d: iastToDeva(word) }
    })
    .filter(Boolean)
}

// ── Commentary: Sivananda (English) + the three classical ācāryas ─────────
const COMMENTARY_AUTHORS = [
  { key: 'sivananda', name: 'Swami Sivananda', lang: 'english',  source: 'Swami Sivananda' },
  { key: 'shankara',  name: 'Śaṅkarācārya',    lang: 'sanskrit', source: 'Sri Shankaracharya' },
  { key: 'ramanuja',  name: 'Rāmānujācārya',   lang: 'sanskrit', source: 'Sri Ramanujacharya' },
  { key: 'madhva',    name: 'Madhvācārya',     lang: 'sanskrit', source: 'Sri Madhavacharya' },
]

function cleanCommentary(text, lang) {
  let t = text.replace(/ /g, ' ')
  t = t.replace(/^।।\s*\d+\.\d+(\s*--\s*\d+\.\d+)?\s*।।\s*/, '')
  t = t.replace(/^\s*\d+\.\d+\s+/, '')
  if (lang === 'english') {
    // Sivananda entries are "word gloss…Commentary <prose>" with commas
    // OCR-mangled into "?" — keep the prose, restore commas before lowercase.
    // Entries without the marker are gloss-only (62 verses): no commentary.
    const i = t.search(/Commentary\s/)
    if (i < 0) return ''
    t = t.slice(i + 'Commentary'.length)
    t = t.replace(/\?\s*(?=[a-z])/g, ', ')
  }
  return t.replace(/\s+/g, ' ').trim()
}

const [verses, chapters, translations, commentaries] = await Promise.all([
  fetchSource('verse.json'),
  fetchSource('chapters.json'),
  fetchSource('translation.json'),
  fetchSource('commentary.json'),
])

const transByVerse = new Map(
  translations
    .filter(t => t.authorName === TRANSLATOR)
    .map(t => [t.verse_id, t.description.replace(/^।।\s*\d+\.\d+\s*।।\s*/, '').trim()])
)

fs.mkdirSync(OUT_DIR, { recursive: true })

let total = 0
const manifest = {
  source: 'github.com/gita/gita (public domain)',
  translator: TRANSLATOR,
  chapters: [],
}

for (const ch of chapters.sort((a, b) => a.chapter_number - b.chapter_number)) {
  const num = ch.chapter_number
  const chVerses = verses
    .filter(v => v.chapter_number === num)
    .sort((a, b) => a.verse_number - b.verse_number)
    .map(v => ({
      v: v.verse_number,
      dev: cleanDevanagari(v.text),
      iast: cleanIast(v.transliteration),
      trans: transByVerse.get(v.id) || '',
      words: parseWords(v.word_meanings),
    }))

  for (const v of chVerses) {
    if (!v.dev || !v.iast) throw new Error(`bg-${num}-${v.v}: missing text`)
    if (!v.trans) console.warn(`bg-${num}-${v.v}: missing translation`)
  }

  const out = {
    chapter: num,
    name: ch.name,
    nameIast: ch.name_transliterated,
    nameEnglish: ch.name_meaning,
    summary: ch.chapter_summary,
    verses: chVerses,
  }
  const file = `ch${String(num).padStart(2, '0')}.json`
  fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify(out))
  manifest.chapters.push({
    chapter: num,
    name: ch.name,
    nameIast: ch.name_transliterated,
    nameEnglish: ch.name_meaning,
    verses: chVerses.length,
    file,
  })
  total += chVerses.length
  console.log(`ch ${String(num).padStart(2)}: ${chVerses.length} verses → ${file}`)
}

// Per-chapter commentary files, fetched only when the panel is opened
const COMM_DIR = path.join(OUT_DIR, 'commentary')
fs.mkdirSync(COMM_DIR, { recursive: true })
const verseLoc = new Map(verses.map(v => [v.id, { ch: v.chapter_number, v: v.verse_number }]))
const byChapter = new Map()
let commCount = 0
for (const author of COMMENTARY_AUTHORS) {
  for (const e of commentaries) {
    if (e.authorName !== author.source) continue
    if (/did not comment on this sloka/i.test(e.description)) continue
    const loc = verseLoc.get(e.verse_id)
    if (!loc) continue
    const text = cleanCommentary(e.description, author.lang)
    if (!text) continue
    if (!byChapter.has(loc.ch)) byChapter.set(loc.ch, {})
    const chMap = byChapter.get(loc.ch)
    if (!chMap[loc.v]) chMap[loc.v] = {}
    chMap[loc.v][author.key] = text
    commCount++
  }
}
for (const [ch, versesMap] of [...byChapter.entries()].sort((a, b) => a[0] - b[0])) {
  const file = `ch${String(ch).padStart(2, '0')}.json`
  fs.writeFileSync(path.join(COMM_DIR, file), JSON.stringify({
    chapter: ch,
    authors: COMMENTARY_AUTHORS.map(({ key, name, lang }) => ({ key, name, lang })),
    verses: versesMap,
  }))
}
manifest.commentaryAuthors = COMMENTARY_AUTHORS.map(({ key, name, lang }) => ({ key, name, lang }))

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest))
console.log(`commentary: ${commCount} entries across ${byChapter.size} chapters`)
console.log(`done: ${total} verses across ${manifest.chapters.length} chapters`)
