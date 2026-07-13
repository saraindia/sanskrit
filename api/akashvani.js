// Vercel serverless function — proxies daily Sanskrit news bulletins from newsonair.gov.in
// Bypasses CORS since the browser can't call their admin-ajax.php directly.
//
// GET /api/akashvani
// Returns JSON: { episodes: [{ title, date, audioUrl }], hasMore: false }

function guessSlot(url) {
  // Morning: any 06xx or 07xx block (e.g. 0655, _065_, T06, etc.)
  if (/[_\-T]?0[67]\d{2}/i.test(url)) return { title: 'Morning Bulletin', time: '06:55', duration: '~5 min' }
  // Evening: any 18xx or 19xx block
  if (/[_\-T]?1[89]\d{2}/i.test(url)) return { title: 'Evening Bulletin', time: '18:20', duration: '~5 min' }
  // Try broader morning/evening from path segments
  if (/morning|am[_\-]|_am/i.test(url))  return { title: 'Morning Bulletin', time: '06:55', duration: '~5 min' }
  if (/evening|pm[_\-]|_pm/i.test(url))  return { title: 'Evening Bulletin', time: '18:20', duration: '~5 min' }
  return { title: 'Sanskrit Bulletin', time: '', duration: '~5 min' }
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
        const { title, time, duration } = guessSlot(audioUrl)
        episodes.push({ title, time, duration, date, audioUrl })
      }
    }

    res.status(200).json({ episodes, hasMore: false })
  } catch (err) {
    console.error('akashvani proxy error:', err)
    res.status(500).json({ error: 'Failed to fetch episodes', detail: err.message })
  }
}
