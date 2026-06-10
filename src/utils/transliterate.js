// Devanagari → IAST transliteration
// Covers all standard Sanskrit characters

const VOWELS = {
  'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū',
  'ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au',
}
const MATRAS = {
  'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū',
  'ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au',
}
const CONSONANTS = {
  'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ',
  'च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
  'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ',
  'त':'t','थ':'th','द':'d','ध':'dh','न':'n',
  'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m',
  'य':'y','र':'r','ल':'l','व':'v',
  'श':'ś','ष':'ṣ','स':'s','ह':'h',
  'ळ':'ḷ','क्ष':'kṣ','ज्ञ':'jñ',
}
const SPECIAL = {
  'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'ʼ',
  '।':' |','॥':' ||','ॐ':'oṃ',
  '०':'0','१':'1','२':'2','३':'3','४':'4',
  '५':'5','६':'6','७':'7','८':'8','९':'9',
}
const VIRAMA = '्'

export function toIAST(text) {
  if (!text) return ''
  let result = ''
  const chars = [...text]  // handle multi-codepoint chars
  let i = 0
  while (i < chars.length) {
    const ch = chars[i]

    // Special: anusvara, visarga, etc.
    if (SPECIAL[ch] !== undefined) { result += SPECIAL[ch]; i++; continue }

    // Consonant cluster check (क्ष, ज्ञ)
    const two = ch + (chars[i+1]||'') + (chars[i+2]||'')
    if (i+2 < chars.length && CONSONANTS[ch + chars[i+1] + chars[i+2]]) {
      // 3-char cluster (rare)
    }
    const cluster2 = ch + (chars[i+1]||'')

    // Vowel (standalone)
    if (VOWELS[ch] !== undefined) { result += VOWELS[ch]; i++; continue }

    // Consonant
    if (CONSONANTS[ch] !== undefined) {
      result += CONSONANTS[ch]
      i++
      const next = chars[i]
      if (next === VIRAMA) {
        // halant — no vowel, skip virama
        i++
      } else if (next && MATRAS[next] !== undefined) {
        result += MATRAS[next]
        i++
      } else if (next && !CONSONANTS[next] && !VOWELS[next] && SPECIAL[next] === undefined && next !== VIRAMA) {
        // end of word / space — implicit 'a'
        result += 'a'
      } else {
        // followed by another consonant or end — implicit 'a'
        result += 'a'
      }
      continue
    }

    // Matra appearing without preceding consonant (shouldn't happen normally)
    if (MATRAS[ch] !== undefined) { result += MATRAS[ch]; i++; continue }

    // Pass through spaces, punctuation, ASCII
    result += ch
    i++
  }
  return result.replace(/\s+/g, ' ').trim()
}
