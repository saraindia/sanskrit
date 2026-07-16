// Vercel serverless function — generates Sanskrit word data via Claude Haiku.
// POST /api/dictionary  { word: "गज" }
// Returns full word entry with 10 tagged sentences.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { word } = req.body || {}
  if (!word || !word.trim()) return res.status(400).json({ error: 'word is required' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })

  const prompt = `You are a Sanskrit language expert. Generate structured data for the Sanskrit word or phrase: "${word.trim()}"

Return ONLY a valid JSON object — no markdown, no code fences, no commentary:
{
  "word": "<exact devanagari as provided or corrected>",
  "transliteration": "<IAST romanization>",
  "meaning": "<concise English meaning, 1-4 words>",
  "meaningExtended": "<fuller English definition, 1-2 sentences>",
  "gender": "masculine|feminine|neuter|indeclinable",
  "wordType": "noun|verb|adjective|adverb|pronoun|indeclinable",
  "imageQuery": "<1-2 English words best for finding a photo of this concept, e.g. 'elephant forest'>",
  "sentences": [
    {
      "id": 1,
      "devanagari": "<sentence in Devanagari script>",
      "transliteration": "<full IAST transliteration of the sentence>",
      "english": "<natural English translation>",
      "vachan": "eka|dvi|bahu",
      "linga": "pullinga|striling|napumsaka",
      "kaal": "vartaman|bhoota|bhavishy",
      "type": "statement|question|conversation"
    }
  ]
}

Generate exactly 10 sentences with this distribution:
- 3 statements (one each: vartaman, bhoota, bhavishy)
- 2 questions (use question words like किम्, कः, कुत्र, कदा, कथम् etc.)
- 2 conversational lines (dialogue exchanges, use first/second person naturally)
- 1 sentence with dvi vachan
- 1 sentence with bahu vachan
- 1 sentence with an interesting context (proverb-style, poetic, or philosophical)
Use the word or its inflected forms naturally in each sentence. Sentences should feel alive and contextual, not mechanical.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[dictionary] Claude API error:', err)
      return res.status(502).json({ error: 'Claude API error', detail: err })
    }

    const data = await response.json()
    const raw = data.content?.[0]?.text || ''

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch (e) {
      console.error('[dictionary] JSON parse error:', e, '\nRaw:', raw)
      return res.status(502).json({ error: 'Invalid JSON from Claude', raw })
    }

    return res.status(200).json({ ...parsed, generatedAt: new Date().toISOString() })
  } catch (err) {
    console.error('[dictionary] Unexpected error:', err)
    return res.status(500).json({ error: err.message })
  }
}
