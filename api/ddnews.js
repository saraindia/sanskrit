// Vercel serverless function — fetches DD News Sanskrit videos via YouTube RSS (no API key needed).
// YouTube RSS is free and not quota-limited; only the Data API costs quota.
//
// GET /api/ddnews
// Returns JSON: { videos: [{ videoId, title, date }] }

const CHANNEL_ID = 'UCYOv0QZr2B70Rkx_ZqIA84w' // News on Air Official
const RSS_URL    = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

function parseRSS(xml) {
  const entries = []
  const entryRx = /<entry>([\s\S]*?)<\/entry>/g
  let m
  while ((m = entryRx.exec(xml)) !== null) {
    const block = m[1]
    const idMatch    = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
    const titleMatch = block.match(/<title>([^<]+)<\/title>/)
    const dateMatch  = block.match(/<published>([^<]+)<\/published>/)
    if (!idMatch) continue
    entries.push({
      videoId: idMatch[1].trim(),
      title:   titleMatch ? titleMatch[1].trim() : '',
      date:    dateMatch  ? dateMatch[1].trim()  : '',
    })
  }
  return entries
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  try {
    const response = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Sanskritly/1.0)' },
    })
    if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`)
    const xml = await response.text()

    const all     = parseRSS(xml)
    const sanskrit = all.filter(v => /sanskrit/i.test(v.title))

    res.status(200).json({ videos: sanskrit })
  } catch (err) {
    console.error('ddnews proxy error:', err)
    res.status(500).json({ error: 'Failed to fetch DD News feed', detail: err.message })
  }
}
