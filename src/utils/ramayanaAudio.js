// Vishwas Bhide's Valmiki Ramayana Samhita parayana — sarga-level audio
// Source: archive.org (free/open access)
// Each file covers one sarga; TTS fallback via useSpeech for unsupported kandas.

const ARCHIVE_BASE = 'https://archive.org/download'

// Map kanda number → archive item ID and file naming pattern
const KANDA_ARCHIVE = {
  2: { item: 'Valmiki-Ramayana-Samhita-Ayodhyakanda', prefix: 'VR-Ayodhyakanda', pad: 3 },
  3: { item: 'Valmiki-Ramayana-Samhita-Aranyakanda',  prefix: 'VR-Aranyakanda',  pad: 2 },
  5: { item: 'Valmiki-Ramayana-Samhita-Sundarkanda',  prefix: 'VR-Sundarkanda',   pad: 2 },
  6: { item: 'Valmiki-Ramayana-Samhita-Yuddhakanda',  prefix: 'VR-Yuddhakanda',  pad: 3 },
}

function padded(n, pad) {
  return String(n).padStart(pad, '0')
}

// Returns null if no archive audio exists for this kanda (caller should TTS)
export function getRamayanaSargaAudioUrl(kanda, sarga) {
  const a = KANDA_ARCHIVE[kanda]
  if (!a) return null
  const filename = `${a.prefix}-${padded(sarga, a.pad)}.mp3`
  return `${ARCHIVE_BASE}/${a.item}/${filename}`
}

export function kandaHasChantAudio(kanda) {
  return kanda in KANDA_ARCHIVE
}
