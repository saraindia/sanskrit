// Vercel serverless function — serves dictionary/_words.json via authenticated
// GitHub Contents API, bypassing raw CDN cache delay.
// GET /api/dictionary-index

const GITHUB_TOKEN = process.env.GITHUB_DICT_TOKEN
const GITHUB_REPO  = 'saraindia/sanskrit-dict'
const GH_API       = `https://api.github.com/repos/${GITHUB_REPO}/contents`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET')    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const headers = { 'Accept': 'application/vnd.github.v3+json' }
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`

    const ghRes = await fetch(`${GH_API}/dictionary/_words.json`, { headers })

    if (ghRes.status === 404) return res.status(200).json({})
    if (!ghRes.ok) throw new Error(`GitHub API: HTTP ${ghRes.status}`)

    const file    = await ghRes.json()
    const content = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'))

    // Cache for 60s on CDN (short enough to be fresh, long enough to reduce load)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30')
    return res.status(200).json(content)
  } catch (err) {
    console.error('[dictionary-index] error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
