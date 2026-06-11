import { BHAGAVAD_GITA, UPANISHAD_VERSES, YOGA_SUTRAS, GRAMMAR_LESSONS, SANDHI_RULES } from './sacred.js'

export const MODULES = [
  { id: 'beginner-script',       label: 'Devanāgarī Script',   level: 'beginner',     icon:'🔤', items: 31,   unlocked: true,  route:'/flashcards',        description:'Master the Devanāgarī alphabet — vowels, consonants, and conjunct letters.' },
  { id: 'beginner-vocab',        label: 'Core Vocabulary',     level: 'beginner',     icon:'📚', items: 1161, unlocked: true,  route:'/flashcards',        description:'Essential Sanskrit words with meanings, genders, and parts of speech.' },
  { id: 'beginner-vnp',          label: 'Verbs & Nouns Drill', level: 'beginner',     icon:'⚡', items: 150,  unlocked: true,  route:'/drill',             description:'Sentence patterns with verbs, nouns, and pronouns — the core of Sanskrit grammar.' },
  { id: 'intermediate-grammar',  label: 'Sanskrit Grammar',    level: 'intermediate', icon:'📐', items: GRAMMAR_LESSONS.length, unlocked: true,  route:'/module/intermediate-grammar',  description:'Cases, declensions, conjugations, and pronouns with tables and examples.' },
  { id: 'intermediate-sandhi',   label: 'Sandhi Rules',        level: 'intermediate', icon:'🔗', items: SANDHI_RULES.length,    unlocked: true,  route:'/module/intermediate-sandhi',   description:'Sound combination rules — the glue of Sanskrit sentences and compound words.' },
  { id: 'advanced-texts',        label: 'Bhagavad Gītā',       level: 'advanced',     icon:'🕉️', items: BHAGAVAD_GITA.length,   unlocked: true,  route:'/module/advanced-texts',        description:'Key verses from the Bhagavad Gita with word-by-word breakdown and commentary.' },
  { id: 'advanced-sutras',       label: 'Yoga Sūtras',         level: 'advanced',     icon:'🧘', items: YOGA_SUTRAS.length,     unlocked: true,  route:'/module/advanced-sutras',       description:'Patañjali\'s Yoga Sutras — the science of consciousness, from citta-vṛtti to kaivalya.' },
  { id: 'advanced-upanishads',   label: 'Upaniṣads',           level: 'advanced',     icon:'🌅', items: UPANISHAD_VERSES.length,unlocked: true,  route:'/module/advanced-upanishads',   description:'Mahāvākyas and key verses — the pinnacle of Vedic knowledge.' },
]
