// XP levels, badges, and helper functions for the gamification system

export const LEVELS = [
  { min: 0,    title: 'Śiṣya',      titleDeva: 'शिष्य',     sub: 'Student',          color: '#a0a0a0' },
  { min: 100,  title: 'Jijñāsu',    titleDeva: 'जिज्ञासु',  sub: 'Seeker',           color: '#60a5fa' },
  { min: 300,  title: 'Abhyāsin',   titleDeva: 'अभ्यासिन्', sub: 'Practitioner',     color: '#34d399' },
  { min: 600,  title: 'Vidyārthin', titleDeva: 'विद्यार्थिन्', sub: 'Scholar',        color: '#a78bfa' },
  { min: 1000, title: 'Adhyāpaka',  titleDeva: 'अध्यापक',   sub: 'Teacher',          color: '#f59e0b' },
  { min: 1800, title: 'Paṇḍita',    titleDeva: 'पण्डित',    sub: 'Learned One',      color: '#f97316' },
  { min: 3000, title: 'Ācārya',     titleDeva: 'आचार्य',    sub: 'Master',           color: '#ef4444' },
  { min: 5000, title: 'Mahāpaṇḍita',titleDeva: 'महापण्डित', sub: 'Great Scholar',    color: '#c9942a' },
]

export function getLevel(xp) {
  let level = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.min) level = l
    else break
  }
  return level
}

export function getNextLevel(xp) {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].min) return LEVELS[i]
  }
  return null // max level
}

export function getLevelProgress(xp) {
  const current = getLevel(xp)
  const next = getNextLevel(xp)
  if (!next) return { pct: 100, xpInLevel: 0, xpNeeded: 0 }
  const xpInLevel = xp - current.min
  const xpNeeded = next.min - current.min
  return { pct: Math.round((xpInLevel / xpNeeded) * 100), xpInLevel, xpNeeded }
}

// Badge definitions — each has an id, label, icon, and unlock condition checked against progress
export const BADGES = [
  {
    id: 'first_word',
    icon: '🌱',
    label: 'First Word',
    desc: 'Reviewed your first flashcard',
    check: (p) => Object.keys(p.srs).length >= 1,
  },
  {
    id: 'ten_words',
    icon: '📚',
    label: 'Ten Words',
    desc: 'Reviewed 10 flashcards',
    check: (p) => Object.keys(p.srs).length >= 10,
  },
  {
    id: 'hundred_words',
    icon: '💯',
    label: 'Centum',
    desc: 'Reviewed 100 flashcards',
    check: (p) => Object.keys(p.srs).length >= 100,
  },
  {
    id: 'streak_3',
    icon: '🔥',
    label: '3-Day Streak',
    desc: 'Studied 3 days in a row',
    check: (p) => (p.streakDays || 0) >= 3,
  },
  {
    id: 'streak_7',
    icon: '⚡',
    label: 'Week Warrior',
    desc: 'Studied 7 days in a row',
    check: (p) => (p.streakDays || 0) >= 7,
  },
  {
    id: 'streak_30',
    icon: '🏆',
    label: 'Month Master',
    desc: 'Studied 30 days in a row',
    check: (p) => (p.streakDays || 0) >= 30,
  },
  {
    id: 'xp_100',
    icon: '⭐',
    label: 'Rising Star',
    desc: 'Earned 100 XP',
    check: (p) => (p.xp || 0) >= 100,
  },
  {
    id: 'xp_500',
    icon: '🌟',
    label: 'Bright Flame',
    desc: 'Earned 500 XP',
    check: (p) => (p.xp || 0) >= 500,
  },
  {
    id: 'xp_1000',
    icon: '💫',
    label: 'Thousand Rays',
    desc: 'Earned 1000 XP',
    check: (p) => (p.xp || 0) >= 1000,
  },
  {
    id: 'accuracy_90',
    icon: '🎯',
    label: 'Sharp Mind',
    desc: '90%+ accuracy across all reviews',
    check: (p) => {
      const items = Object.values(p.srs).filter(d => d.totalAttempts >= 5)
      if (items.length < 5) return false
      const avg = items.reduce((s, d) => s + d.correctAttempts / d.totalAttempts, 0) / items.length
      return avg >= 0.9
    },
  },
  {
    id: 'mastered_25',
    icon: '🧘',
    label: 'Dhāraṇā',
    desc: 'Mastered 25 items (streak ≥ 3)',
    check: (p) => Object.values(p.srs).filter(d => (d.streak || 0) >= 3).length >= 25,
  },
  {
    id: 'sessions_10',
    icon: '📿',
    label: 'Sādhana',
    desc: 'Completed 10 study sessions',
    check: (p) => (p.sessions?.length || 0) >= 10,
  },
]

export function getEarnedBadges(progress) {
  return BADGES.filter(b => b.check(progress))
}
