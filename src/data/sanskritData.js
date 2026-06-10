// Barrel re-export — pages now import directly from sub-files for best tree-shaking.
// This file kept for any legacy imports.
export { GRAMMAR_CONCEPTS, ALPHABET_CARDS, VOCABULARY, VOCAB_MAP } from './vocabulary.js'
export { VNP_SENTENCES, FILL_BLANKS }                               from './sentences.js'
export { STORIES }                                                   from './stories.js'
export { BHAGAVAD_GITA, UPANISHAD_VERSES, YOGA_SUTRAS,
         GRAMMAR_LESSONS, SANDHI_RULES }                            from './sacred.js'
export { MODULES }                                                   from './modules.js'
