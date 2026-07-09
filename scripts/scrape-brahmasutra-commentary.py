#!/usr/bin/env python3
"""
Scrape Shankara's Brahmasutra commentary from wisdomlib.org
(Vireshwarananda translation, 1936 — public domain)
Follows next-page links and maps commentary to sutra refs.
"""
import re, json, time, sys, os
import urllib.request

BASE = 'https://www.wisdomlib.org'
START = '/hinduism/book/brahma-sutras/d/doc62761.html'
OUT   = os.path.join(os.path.dirname(__file__), '..', 'public', 'content', 'upanishads',
                     'brahmasutra-commentary.json')

def fetch(path):
    url = BASE + path
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode('utf-8')

def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s).strip()

def parse_page(html):
    """Return list of {ref, commentary} dicts found on this page."""
    paras = re.findall(r'<p[^>]*>(.*?)</p>', html, re.DOTALL)
    clean = [strip_tags(p).strip() for p in paras]
    clean = [c for c in clean if c]

    results = []
    i = 0
    while i < len(clean):
        # Look for "Brahma-Sutra X.X.X" marker
        m = re.match(r'Brahma[- ]Sutra\s+(\d+\.\d+\.\d+)', clean[i], re.IGNORECASE)
        if m:
            ref = m.group(1)
            # Skip: ref line, devanagari, iast, word-meanings, translation
            # Collect commentary paragraphs until next sutra marker or end
            j = i + 1
            comm_paras = []
            # Skip the first few fixed lines (deva, iast, word-meanings, translation)
            # They are identified by being short or matching known patterns
            skip_count = 0
            while j < len(clean):
                s = clean[j]
                # Next sutra marker → stop
                if re.match(r'Brahma[- ]Sutra\s+\d+\.\d+\.\d+', s, re.IGNORECASE):
                    break
                # Skip devanagari / iast line (contains ॥ or || or just Sanskrit chars)
                if skip_count < 4 and ('॥' in s or '||' in s or
                    re.match(r'^[a-zA-Zāīūṛṝḷṃṁḥśṣṭḍṇñḻḹ\s\|]+$', s)):
                    skip_count += 1
                    j += 1
                    continue
                # Skip word-meanings line (pattern: "word—meaning; word—meaning")
                if skip_count < 4 and re.search(r'\w—\w', s):
                    skip_count += 1
                    j += 1
                    continue
                # Skip the translation line (first substantial English sentence after skip)
                if skip_count < 4 and not comm_paras:
                    skip_count += 1
                    j += 1
                    continue
                # Stop at footer noise
                if any(x in s for x in ['Article published', 'humbly request', "Let's make",
                                          'Patreon', 'donation', 'ISBN']):
                    break
                if len(s) > 30:
                    comm_paras.append(s)
                j += 1
            if comm_paras:
                results.append({'ref': ref, 'commentary': '\n\n'.join(comm_paras)})
            i = j
        else:
            i += 1
    return results

def get_next(html):
    # Look for next page link
    m = re.search(r'href="(/hinduism/book/brahma-sutras/d/doc(\d+)\.html)"[^>]*>\s*(?:Next|next|→|›|>>)',
                  html, re.IGNORECASE)
    if m:
        return m.group(1)
    # Also try by finding all doc links and picking the highest-numbered one that appears after current
    return None

def get_all_next_links(html):
    """Find the 'next' navigation link more reliably."""
    # Find navigation area — look for next link in context
    # wisdomlib uses text like "Next ›" or arrow links
    patterns = [
        r'href="(/hinduism/book/brahma-sutras/d/doc\d+\.html)"[^>]*>\s*(?:Next|next)',
        r'(?:Next|next)[^<]*<[^>]*href="(/hinduism/book/brahma-sutras/d/doc\d+\.html)"',
    ]
    for pat in patterns:
        m = re.search(pat, html, re.IGNORECASE)
        if m:
            return m.group(1)

    # Fallback: find all doc links and find the one in a "next" context
    # Look for the navigation div
    nav_section = re.search(r'(?:pagination|nav|next)[^<]{0,200}(/hinduism/book/brahma-sutras/d/doc\d+\.html)',
                            html, re.IGNORECASE | re.DOTALL)
    if nav_section:
        return nav_section.group(1)

    return None

def main():
    commentary = {}  # ref → commentary text
    path = START
    page_num = 0
    visited = set()

    print("Scraping Shankara's Brahmasutra commentary from wisdomlib.org...")
    print("This will take a few minutes (rate-limited to 1 req/sec)...")

    while path and path not in visited:
        visited.add(path)
        page_num += 1
        try:
            html = fetch(path)
        except Exception as e:
            print(f"  Error fetching {path}: {e}", file=sys.stderr)
            break

        results = parse_page(html)
        for r in results:
            if r['ref'] not in commentary:
                commentary[r['ref']] = r['commentary']

        # Find next page
        next_path = get_all_next_links(html)

        if page_num % 20 == 0 or results:
            refs = [r['ref'] for r in results]
            print(f"  Page {page_num:3d}: {path.split('/')[-1]} → {refs if refs else '(no sutras found)'}")

        if not next_path:
            # Try to find next from all links on page
            all_docs = re.findall(r'href="(/hinduism/book/brahma-sutras/d/doc(\d+)\.html)"', html)
            if all_docs:
                nums = [(int(n), p) for p, n in all_docs]
                # Get current doc num
                cur = re.search(r'doc(\d+)\.html', path)
                if cur:
                    cur_num = int(cur.group(1))
                    higher = [(n, p) for n, p in nums if n > cur_num]
                    if higher:
                        _, next_path = min(higher)

        path = next_path
        time.sleep(0.8)  # polite rate limit

    print(f"\nScraped {len(commentary)} sutra commentaries across {page_num} pages.")

    # Save
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(commentary, f, ensure_ascii=False, indent=2)
    print(f"Saved → {OUT}")

if __name__ == '__main__':
    main()
