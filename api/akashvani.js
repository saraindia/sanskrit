// Vercel serverless function — proxies daily Sanskrit news bulletins from newsonair.gov.in
// Bypasses CORS since the browser can't call their admin-ajax.php directly.
//
// GET /api/akashvani
// Returns JSON: { episodes: [{ title, date, audioUrl }], hasMore: false }

function guessSlot(url) {
  if (/065[0-9]|0[67][0-9]{2}/i.test(url)) return { title: 'Morning Bulletin', time: '06:55' }
  if (/182[0-9]|183[0-9]/i.test(url))       return { title: 'Evening Bulletin', time: '18:20' }
  return { title: 'News Bulletin', time: '' }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  try {
    const body = new URLSearchParams({
      action:   'filter_rnunsdaudio_bulletins',
      language: 'Sanskrit',
      page:     '1',
    })

    const response = await fetch('https://newsonair.gov.in/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/x-www-form-urlencoded',
        'X-Requested-With':'XMLHttpRequest',
        'Referer':         'https://newsonair.gov.in/rnu-nsd-audio-archive-search/',
        'User-Agent':      'Mozilla/5.0 (compatible; Sanskritly/1.0)',
      },
      body: body.toString(),
    })

    const html = await response.text()

    if (html.includes('No posts found')) {
      return res.status(200).json({ episodes: [], hasMore: false })
    }

    const episodes = []
    const liMatches = html.match(/<li class="col-lg-[^"]*"[^>]*>[\s\S]*?<\/li>/g) || []

    for (const li of liMatches) {
      const dateMatch = li.match(/<p[^>]*class="text-center[^"]*"[^>]*>([\s\S]*?)<\/p>/)
      const date      = dateMatch ? dateMatch[1].trim() : ''
      const srcMatch  = li.match(/<source src="([^"]+\.mp3)"/)
      const audioUrl  = srcMatch ? srcMatch[1] : null
      if (audioUrl) {
        const { title, time } = guessSlot(audioUrl)
        episodes.push({ title, time, date, audioUrl })
      }
    }

    res.status(200).json({ episodes, hasMore: false })
  } catch (err) {
    console.error('akashvani proxy error:', err)
    res.status(500).json({ error: 'Failed to fetch episodes', detail: err.message })
  }
}
