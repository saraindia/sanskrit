// build-upanishads.mjs — generates per-text Upanishad JSON for the app.
//
// Sanskrit (public domain, ancient text):
//   - Isha + Katha: github.com/atmabodha/Vedanta_Datasets (Sanskrit column only)
//   - Mundaka: github.com/hrgupta/indian-scriptures (MIT)
// English translation (public domain):
//   - F. Max Müller, Sacred Books of the East vols 1 & 15 (1879/1884),
//     transcribed on en.wikisource.org, fetched via the MediaWiki API.
//
// Sources are downloaded once into scripts/source/upanishads/ (gitignored).
// Run:  node scripts/build-upanishads.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(__dirname, 'source', 'upanishads')
const OUT_DIR = path.join(__dirname, '..', 'public', 'content', 'upanishads')

const WIKI = 'https://en.wikisource.org/w/api.php?action=parse&format=json&prop=text&page='
const RAW = {
  'isha_muller.json':    WIKI + encodeURIComponent('Sacred Books of the East/Volume 1/Vâgasaneyi-samhitâ-upanishad'),
  'katha_muller.json':   WIKI + encodeURIComponent('Sacred Books of the East/Volume 15/Katha-upanishad'),
  'mundaka_muller.json': WIKI + encodeURIComponent('Sacred Books of the East/Volume 15/Mundaka-upanishad'),
  'isha_atmabodha.csv':  'https://raw.githubusercontent.com/atmabodha/Vedanta_Datasets/main/Upanishads/Upanishad_Isavasya.csv',
  'katha_atmabodha.csv': 'https://raw.githubusercontent.com/atmabodha/Vedanta_Datasets/main/Upanishads/Upanishad_Katha.csv',
  'mundaka_sanskrit.csv':'https://raw.githubusercontent.com/hrgupta/indian-scriptures/master/data/processed/upanishads/mundaka_upanishad.csv',
}

async function source(name) {
  const file = path.join(SRC, name)
  if (!fs.existsSync(file)) {
    console.log(`downloading ${name}…`)
    const res = await fetch(RAW[name])
    if (!res.ok) throw new Error(`fetch ${name}: ${res.status}`)
    fs.mkdirSync(SRC, { recursive: true })
    fs.writeFileSync(file, await res.text())
  }
  return fs.readFileSync(file, 'utf8')
}

// ── Müller translation extraction ─────────────────────────────────────────
// Inline tags are removed without a space so Müller's italicised letters
// ("Vâ<i>g</i>asravasa") rejoin into whole words; block tags become spaces.
function cleanWikiHtml(json) {
  let t = JSON.parse(json).parse.text['*']
  t = t.replace(/<style[\s\S]*?<\/style>/g, ' ')
  t = t.replace(/<sup[\s\S]*?<\/sup>/g, '')
  t = t.replace(/<\/?(i|b|em|strong|a|span|small)\b[^>]*>/g, '')
  t = t.replace(/<[^>]+>/g, ' ')
  t = t.replace(/&#160;|&nbsp;/g, ' ')
  t = t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
  t = t.replace(/[​‌‍﻿]/g, '')
  return t.replace(/\s+/g, ' ')
}

// Split numbered prose into sections on verse-number resets (… 12. 1. …).
// `jumps` whitelists known recension gaps, e.g. Katha valli 3 goes 14 → 18.
function parseMuller(html, { jumps = [] } = {}) {
  const text = cleanWikiHtml(html)
  const cands = [...text.matchAll(/(?<![\dA-Za-z.,;:§])(\d{1,2})\.\s/g)]
    .map(m => ({ pos: m.index, n: Number(m[1]), len: m[0].length }))
  const sections = []
  let cur = null
  let prev = 0
  for (let c = 0; c < cands.length; c++) {
    const { pos, n, len } = cands[c]
    const ok = n === prev + 1 || n === 1 ||
      jumps.some(([from, to]) => prev === from && n === to)
    if (!ok) continue
    if (n === 1) { cur = []; sections.push(cur) }
    if (!cur) continue
    const next = cands[c + 1]
    let end = next ? next.pos : text.length
    const foot = text.indexOf('Footnotes', pos)
    if (foot > 0 && foot < end) end = foot
    cur.push({ n, trans: text.slice(pos + len, end).trim() })
    prev = n
  }
  return sections
}

// ── Devanagari → IAST ─────────────────────────────────────────────────────
const IAST_VOWELS = { 'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au' }
const IAST_MATRAS = { 'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au' }
const IAST_CONS = {
  'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
  'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
  'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v',
  'श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḻ',
}
const IAST_MISC = { 'ं':'ṁ','ः':'ḥ','ँ':'m̐','ऽ':"'",'ॐ':'oṁ','।':'|','॥':'||','्':'' }

function devaToIast(dev) {
  let out = ''
  let pendingA = false
  for (const ch of dev) {
    if (IAST_CONS[ch]) {
      if (pendingA) out += 'a'
      out += IAST_CONS[ch]
      pendingA = true
    } else if (IAST_MATRAS[ch]) {
      out += IAST_MATRAS[ch]
      pendingA = false
    } else if (ch === '्') {
      pendingA = false
    } else if (IAST_VOWELS[ch]) {
      if (pendingA) out += 'a'
      out += IAST_VOWELS[ch]
      pendingA = false
    } else if (IAST_MISC[ch] !== undefined) {
      if (pendingA) { out += 'a'; pendingA = false }
      out += IAST_MISC[ch]
    } else if (/[०-९]/.test(ch)) {
      if (pendingA) { out += 'a'; pendingA = false }
      out += String.fromCharCode(ch.charCodeAt(0) - 0x0966 + 48)
    } else {
      if (pendingA) { out += 'a'; pendingA = false }
      out += ch
    }
  }
  if (pendingA) out += 'a'
  return out.replace(/[ \t]+/g, ' ').trim()
}

// ── CSV parsing (simple, quote-aware) ─────────────────────────────────────
function parseCsv(text) {
  const rows = []
  let row = [], field = '', inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQ = false
      else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = '' }
    else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  const head = rows.shift()
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])))
}

const tidyDev = s => s.split('\n').map(l => l.trim()).filter(Boolean).join('\n')

// ── Text definitions ──────────────────────────────────────────────────────
const TEXTS = [
  {
    id: 'isha',
    title: 'Īśā Upaniṣad',
    titleDeva: 'ईशोपनिषद्',
    titleEnglish: 'The Lord-pervaded world',
    veda: 'Śukla Yajurveda',
    async load() {
      const rows = parseCsv(await source('isha_atmabodha.csv'))
      const muller = parseMuller(await source('isha_muller.json')).slice(0, 1)
      if (muller.length !== 1 || muller[0].length !== 18) throw new Error(`isha: bad Müller parse ${muller.map(s => s.length)}`)
      if (rows.length !== 18) throw new Error(`isha: expected 18 Sanskrit verses, got ${rows.length}`)
      return rows.map((r, i) => ({
        ref: String(i + 1),
        sec: 'Īśā Upaniṣad',
        dev: tidyDev(r.Sanskrit),
        trans: muller[0][i].trans,
      }))
    },
  },
  {
    id: 'katha',
    title: 'Kaṭha Upaniṣad',
    titleDeva: 'कठोपनिषद्',
    titleEnglish: 'Nachiketa and Death',
    veda: 'Kṛṣṇa Yajurveda',
    async load() {
      const rows = parseCsv(await source('katha_atmabodha.csv'))
      // Müller's recension numbers valli 3 as …14, 18, 19, 20 and appends a
      // closing shanti mantra as valli 6 verse 19 — remap/drop to the
      // standard 17/18-verse numbering used by the Sanskrit text.
      const muller = parseMuller(await source('katha_muller.json'), { jumps: [[14, 18]] }).slice(0, 6)
      const expected = [29, 25, 17, 15, 15, 19]
      if (muller.length !== 6 || !muller.every((s, i) => s.length === expected[i]))
        throw new Error(`katha: bad Müller parse ${muller.map(s => s.length)}`)
      muller[5] = muller[5].slice(0, 18)
      const vallis = ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3']
      const out = []
      for (const r of rows) {
        const si = vallis.indexOf(r['Chapter/Valli'])
        const v = Number(r.Verse)
        if (si < 0 || !v) throw new Error(`katha: bad row ${r['Chapter/Valli']}.${r.Verse}`)
        const [adh, valli] = vallis[si].split('.')
        out.push({
          ref: `${vallis[si]}.${v}`,
          sec: `Adhyāya ${adh} · Vallī ${valli}`,
          dev: tidyDev(r.Sanskrit),
          trans: muller[si][v - 1].trans,
        })
      }
      if (out.length !== 119) throw new Error(`katha: expected 119 verses, got ${out.length}`)
      return out
    },
  },
  {
    id: 'mundaka',
    title: 'Muṇḍaka Upaniṣad',
    titleDeva: 'मुण्डकोपनिषद्',
    titleEnglish: 'The two kinds of knowledge',
    veda: 'Atharvaveda',
    async load() {
      const rows = parseCsv(await source('mundaka_sanskrit.csv'))
      const muller = parseMuller(await source('mundaka_muller.json')).slice(0, 6)
      const expected = [9, 13, 10, 11, 10, 11]
      if (muller.length !== 6 || !muller.every((s, i) => s.length === expected[i]))
        throw new Error(`mundaka: bad Müller parse ${muller.map(s => s.length)}`)
      const keys = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2']
      const out = []
      const seen = new Set()
      for (const r of rows) {
        const m = (r.number || r.mantra).match(/(\d+)\.(\d+)\.(\d+)/)
        if (!m) continue
        if (seen.has(m[0])) continue   // source CSV repeats 1.1.1 at the end
        seen.add(m[0])
        const key = `${m[1]}.${m[2]}`
        const si = keys.indexOf(key)
        const v = Number(m[3])
        if (si < 0) throw new Error(`mundaka: unexpected section ${key}`)
        const dev = tidyDev(r.mantra.replace(/।।\s*\d+\.\d+\.\d+\s*।।/g, '॥'))
        out.push({
          ref: `${key}.${v}`,
          sec: `Muṇḍaka ${m[1]} · Khaṇḍa ${m[2]}`,
          dev,
          trans: muller[si][v - 1].trans,
        })
      }
      if (out.length !== 64) throw new Error(`mundaka: expected 64 verses, got ${out.length}`)
      return out
    },
  },
]

fs.mkdirSync(OUT_DIR, { recursive: true })
const manifest = {
  sanskritSource: 'Vedanta_Datasets + indian-scriptures (ancient text, public domain)',
  translator: 'F. Max Müller, Sacred Books of the East (1879/1884, public domain)',
  texts: [],
}

for (const t of TEXTS) {
  const verses = await t.load()
  for (const v of verses) {
    if (!v.dev || !v.trans) throw new Error(`${t.id} ${v.ref}: missing text`)
    v.iast = devaToIast(v.dev)
  }
  const file = `${t.id}.json`
  fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify({
    id: t.id, title: t.title, titleDeva: t.titleDeva, titleEnglish: t.titleEnglish,
    veda: t.veda, verses,
  }))
  manifest.texts.push({ id: t.id, title: t.title, titleDeva: t.titleDeva, titleEnglish: t.titleEnglish, veda: t.veda, verses: verses.length, file })
  console.log(`${t.id}: ${verses.length} verses → ${file}`)
}

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest))
console.log('done:', manifest.texts.map(t => `${t.title} (${t.verses})`).join(', '))
