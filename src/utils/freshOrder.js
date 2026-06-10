// freshOrder — order a question pool so the user always gets new material first.
// Items the user has never answered (no SRS record) come first, shuffled.
// Previously answered items follow, least recently seen first, so once the
// pool is exhausted the oldest material naturally cycles back in.
export function freshOrder(items, srs = {}) {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  const unseen = shuffled.filter(it => !srs[it.id])
  const seen = shuffled
    .filter(it => srs[it.id])
    .sort((a, b) => (srs[a.id].lastSeen || 0) - (srs[b.id].lastSeen || 0))
  return [...unseen, ...seen]
}
