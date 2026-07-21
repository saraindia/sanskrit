import { AMARAHASA_STORIES_2 } from './amarahasa_stories.js'
import { AMARAHASA_GROUP_A } from './amarahasa_group_a.js'
import { AMARAHASA_GROUP_C } from './amarahasa_group_c.js'
import { AMARAHASA_GROUP_D } from './amarahasa_group_d.js'
import { PANCHATANTRA_FULL } from './panchatantra_stories.js'

export const STORIES = [
  {
    id: 'story-01',
    title: 'रामः वने',
    titleIast: 'Rāmaḥ Vane',
    titleEnglish: 'Rama in the Forest',
    level: 'beginner',
    description: 'A simple tale of Rama who leaves his village, meets a teacher in the forest, receives a gift, and returns home.',
    sentences: [
      {
        id: 'st1-s1',
        words: [
          { devanagari: 'रामः',    iast: 'rāmaḥ',    english: 'Rama',           grammar: 'proper noun, nom. sg.' },
          { devanagari: 'ग्रामे',  iast: 'grāme',    english: 'in the village', grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',   iast: 'vasati',   english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama lives in the village.',
        vocabIds: ['v-001', 'v-017'],
      },
      {
        id: 'st1-s2',
        words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'He',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'प्रातः',  iast: 'prātaḥ',   english: 'in the morning', grammar: 'indeclinable' },
          { devanagari: 'वने',    iast: 'vane',     english: 'to the forest',  grammar: 'noun, loc. sg.' },
          { devanagari: 'गच्छति',iast: 'gacchati', english: 'goes',           grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He goes to the forest in the morning.',
        vocabIds: ['v-013', 'v-006', 'v-002'],
      },
      {
        id: 'st1-s3',
        words: [
          { devanagari: 'वने',    iast: 'vane',     english: 'In the forest',  grammar: 'noun, loc. sg.' },
          { devanagari: 'एकः',    iast: 'ekaḥ',     english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'गुरुः',  iast: 'guruḥ',    english: 'teacher',        grammar: 'noun, nom. sg.' },
          { devanagari: 'तिष्ठति',iast: 'tiṣṭhati', english: 'stands / is',    grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'In the forest, a teacher stands.',
        vocabIds: ['v-006', 'v-019'],
      },
      {
        id: 'st1-s4',
        words: [
          { devanagari: 'गुरुः',   iast: 'guruḥ',    english: 'The teacher',   grammar: 'noun, nom. sg.' },
          { devanagari: 'पुस्तकं', iast: 'pustakaṃ', english: 'a book',        grammar: 'noun, acc. sg.' },
          { devanagari: 'पठति',   iast: 'paṭhati',  english: 'reads',         grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The teacher reads a book.',
        vocabIds: ['v-019', 'v-018'],
      },
      {
        id: 'st1-s5',
        words: [
          { devanagari: 'रामः',   iast: 'rāmaḥ',   english: 'Rama',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'गुरुं',  iast: 'guruṃ',   english: 'the teacher',   grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',iast: 'paśyati', english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama sees the teacher.',
        vocabIds: ['v-001', 'v-019', 'v-009'],
      },
      {
        id: 'st1-s6',
        words: [
          { devanagari: 'रामः',  iast: 'rāmaḥ',  english: 'Rama',           grammar: 'proper noun, nom. sg.' },
          { devanagari: 'गुरवे', iast: 'gurave', english: 'to the teacher', grammar: 'noun, dat. sg.' },
          { devanagari: 'नमति', iast: 'namati', english: 'bows',           grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama bows to the teacher.',
        vocabIds: ['v-001', 'v-019'],
      },
      {
        id: 'st1-s7',
        words: [
          { devanagari: 'गुरुः',  iast: 'guruḥ',   english: 'The teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'रामाय', iast: 'rāmāya', english: 'to Rama',     grammar: 'proper noun, dat. sg.' },
          { devanagari: 'फलं',   iast: 'phalaṃ',  english: 'a fruit',    grammar: 'noun, acc. sg.' },
          { devanagari: 'ददाति', iast: 'dadāti',  english: 'gives',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The teacher gives a fruit to Rama.',
        vocabIds: ['v-019', 'v-001', 'v-003'],
      },
      {
        id: 'st1-s8',
        words: [
          { devanagari: 'रामः',  iast: 'rāmaḥ',  english: 'Rama',      grammar: 'proper noun, nom. sg.' },
          { devanagari: 'फलं',   iast: 'phalaṃ', english: 'the fruit', grammar: 'noun, acc. sg.' },
          { devanagari: 'खादति',iast: 'khādati',english: 'eats',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama eats the fruit.',
        vocabIds: ['v-001', 'v-003', 'v-008'],
      },
      {
        id: 'st1-s9',
        words: [
          { devanagari: 'सः',    iast: 'saḥ',    english: 'He',       grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलं',   iast: 'jalaṃ',  english: 'water',    grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबति',iast: 'pibati', english: 'drinks',   grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He drinks water.',
        vocabIds: ['v-013', 'v-005'],
      },
      {
        id: 'st1-s10',
        words: [
          { devanagari: 'रामः',   iast: 'rāmaḥ',  english: 'Rama',           grammar: 'proper noun, nom. sg.' },
          { devanagari: 'ग्रामं', iast: 'grāmaṃ', english: 'to the village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',iast: 'gacchati',english: 'goes',           grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama goes to the village.',
        vocabIds: ['v-001', 'v-017', 'v-002'],
      },
    ],
  },

  // ── Story 2 ──────────────────────────────────────────────────────────────
  {
    id: 'story-02',
    title: 'कः एषः?',
    titleIast: 'Kaḥ Eṣaḥ?',
    titleEnglish: 'Who Is This?',
    level: 'beginner',
    description: 'A short dialogue of pointing and asking — Who is this? What is that? — using demonstratives and simple question words.',
    sentences: [
      {
        id: 'st2-s1',
        words: [
          { devanagari: 'एषः',  iast: 'eṣaḥ',  english: 'this (m)',  grammar: 'pronoun, nom. sg.' },
          { devanagari: 'कः',   iast: 'kaḥ',   english: 'who?',      grammar: 'interrogative, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',        grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Who is this?',
        vocabIds: ['v-021', 'v-025', 'v-028'],
      },
      {
        id: 'st2-s2',
        words: [
          { devanagari: 'एषः',   iast: 'eṣaḥ',  english: 'This (m)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'रामः',  iast: 'rāmaḥ', english: 'Rama',     grammar: 'proper noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',       grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'This is Rama.',
        vocabIds: ['v-021', 'v-001', 'v-028'],
      },
      {
        id: 'st2-s3',
        words: [
          { devanagari: 'एषा',  iast: 'eṣā',  english: 'this (f)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'का',   iast: 'kā',   english: 'who? (f)', grammar: 'interrogative, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Who is this (woman)?',
        vocabIds: ['v-022', 'v-026', 'v-028'],
      },
      {
        id: 'st2-s4',
        words: [
          { devanagari: 'एषा',   iast: 'eṣā',  english: 'This (f)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'बाला',  iast: 'bālā', english: 'a girl',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',       grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'This is a girl.',
        vocabIds: ['v-022', 'v-041', 'v-028'],
      },
      {
        id: 'st2-s5',
        words: [
          { devanagari: 'एतत्', iast: 'etat', english: 'this (n)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किम्', iast: 'kim',  english: 'what?',    grammar: 'interrogative, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'What is this?',
        vocabIds: ['v-023', 'v-027', 'v-028'],
      },
      {
        id: 'st2-s6',
        words: [
          { devanagari: 'एतत्',     iast: 'etat',     english: 'This (n)',  grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पुस्तकम्', iast: 'pustakam', english: 'a book',    grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',        grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'This is a book.',
        vocabIds: ['v-023', 'v-018', 'v-028'],
      },
      {
        id: 'st2-s7',
        words: [
          { devanagari: 'तत्',  iast: 'tat',  english: 'that (n)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किम्', iast: 'kim',  english: 'what?',    grammar: 'interrogative, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'What is that?',
        vocabIds: ['v-024', 'v-027', 'v-028'],
      },
      {
        id: 'st2-s8',
        words: [
          { devanagari: 'तत्',   iast: 'tat',   english: 'That (n)', grammar: 'pronoun, nom. sg.' },
          { devanagari: 'द्वारम्',iast: 'dvāram',english: 'a door',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',       grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'That is a door.',
        vocabIds: ['v-024', 'v-037', 'v-028'],
      },
      {
        id: 'st2-s9',
        words: [
          { devanagari: 'एतत्', iast: 'etat', english: 'this',    grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',  iast: 'kiṃ',  english: 'what',    grammar: 'interrogative' },
          { devanagari: 'फलम्', iast: 'phalam',english: 'fruit',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'What fruit is this?',
        vocabIds: ['v-023', 'v-027', 'v-003', 'v-028'],
      },
      {
        id: 'st2-s10',
        words: [
          { devanagari: 'एतत्',  iast: 'etat',  english: 'This',     grammar: 'pronoun, nom. sg.' },
          { devanagari: 'आम्रम्',iast: 'āmram', english: 'a mango',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',       grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'This is a mango.',
        vocabIds: ['v-023', 'v-040', 'v-028'],
      },
    ],
  },

  // ── Story 3 ──────────────────────────────────────────────────────────────
  {
    id: 'story-03',
    title: 'गुरुः कुत्र अस्ति?',
    titleIast: 'Guruḥ Kutra Asti?',
    titleEnglish: 'Where Is the Teacher?',
    level: 'beginner',
    description: 'A boy searches for his teacher — learning here, there, where, and everywhere along the way.',
    sentences: [
      {
        id: 'st3-s1',
        words: [
          { devanagari: 'बालः',   iast: 'bālaḥ',  english: 'The boy',    grammar: 'noun, nom. sg.' },
          { devanagari: 'गुरुम्',  iast: 'gurum',  english: 'the teacher',grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति', iast: 'paśyati', english: 'seeks / sees',grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The boy looks for the teacher.',
        vocabIds: ['v-007', 'v-019', 'v-009'],
      },
      {
        id: 'st3-s2',
        words: [
          { devanagari: 'गुरुः',  iast: 'guruḥ', english: 'The teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र', iast: 'kutra',  english: 'where?',      grammar: 'interrogative adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Where is the teacher?',
        vocabIds: ['v-019', 'v-030', 'v-028'],
      },
      {
        id: 'st3-s3',
        words: [
          { devanagari: 'सः',    iast: 'saḥ',   english: 'He',      grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अत्र', iast: 'atra',  english: 'here',    grammar: 'adverb' },
          { devanagari: 'नास्ति',iast: 'nāsti', english: 'is not', grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He is not here.',
        vocabIds: ['v-013', 'v-031', 'v-029'],
      },
      {
        id: 'st3-s4',
        words: [
          { devanagari: 'सः',      iast: 'saḥ',     english: 'He',      grammar: 'pronoun, nom. sg.' },
          { devanagari: 'तत्र',   iast: 'tatra',   english: 'there',   grammar: 'adverb' },
          { devanagari: 'तिष्ठति',iast: 'tiṣṭhati',english: 'stands',  grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He stands there.',
        vocabIds: ['v-013', 'v-032', 'v-044'],
      },
      {
        id: 'st3-s5',
        words: [
          { devanagari: 'बालः',   iast: 'bālaḥ',   english: 'The boy', grammar: 'noun, nom. sg.' },
          { devanagari: 'तत्र',  iast: 'tatra',   english: 'there',   grammar: 'adverb' },
          { devanagari: 'गच्छति',iast: 'gacchati', english: 'goes',    grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The boy goes there.',
        vocabIds: ['v-007', 'v-032', 'v-002'],
      },
      {
        id: 'st3-s6',
        words: [
          { devanagari: 'गुरुः', iast: 'guruḥ', english: 'The teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',  iast: 'vane',  english: 'in the forest',grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',           grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The teacher is in the forest.',
        vocabIds: ['v-019', 'v-006', 'v-028'],
      },
      {
        id: 'st3-s7',
        words: [
          { devanagari: 'वने',     iast: 'vane',    english: 'In the forest', grammar: 'noun, loc. sg.' },
          { devanagari: 'वृक्षाः', iast: 'vṛkṣāḥ', english: 'trees (pl)',    grammar: 'noun, nom. pl.' },
          { devanagari: 'सर्वत्र',iast: 'sarvatra',english: 'everywhere',    grammar: 'adverb' },
          { devanagari: 'सन्ति',  iast: 'santi',   english: 'are (pl)',      grammar: 'verb, pres. 3pl.' },
        ],
        translation: 'Trees are everywhere in the forest.',
        vocabIds: ['v-006', 'v-039', 'v-033'],
      },
      {
        id: 'st3-s8',
        words: [
          { devanagari: 'बालः',   iast: 'bālaḥ',  english: 'The boy',    grammar: 'noun, nom. sg.' },
          { devanagari: 'गुरुम्',  iast: 'gurum',  english: 'the teacher',grammar: 'noun, acc. sg.' },
          { devanagari: 'अत्र',  iast: 'atra',   english: 'here',       grammar: 'adverb' },
          { devanagari: 'पश्यति',iast: 'paśyati', english: 'sees',       grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The boy sees the teacher here.',
        vocabIds: ['v-007', 'v-019', 'v-031', 'v-009'],
      },
      {
        id: 'st3-s9',
        words: [
          { devanagari: 'बालः',  iast: 'bālaḥ', english: 'The boy',      grammar: 'noun, nom. sg.' },
          { devanagari: 'गुरवे',iast: 'gurave',english: 'to the teacher', grammar: 'noun, dat. sg.' },
          { devanagari: 'नमति', iast: 'namati',english: 'bows',          grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The boy bows to the teacher.',
        vocabIds: ['v-007', 'v-019'],
      },
      {
        id: 'st3-s10',
        words: [
          { devanagari: 'गुरुः',   iast: 'guruḥ',  english: 'The teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'बालाय',  iast: 'bālāya', english: 'to the boy',  grammar: 'noun, dat. sg.' },
          { devanagari: 'पुस्तकम्',iast: 'pustakam',english: 'a book',     grammar: 'noun, acc. sg.' },
          { devanagari: 'ददाति', iast: 'dadāti', english: 'gives',        grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'The teacher gives a book to the boy.',
        vocabIds: ['v-019', 'v-007', 'v-018'],
      },
    ],
  },

  // ── Story 4 ──────────────────────────────────────────────────────────────
  {
    id: 'story-04',
    title: 'किं खादसि?',
    titleIast: 'Kiṃ Khādasi?',
    titleEnglish: 'What Do You Eat?',
    level: 'beginner',
    description: 'A friendly exchange about food and water — practising "what do you…?", yes/no questions with vā, and negation with na.',
    sentences: [
      {
        id: 'st4-s1',
        words: [
          { devanagari: 'त्वं',   iast: 'tvaṃ',    english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',    iast: 'kiṃ',     english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'खादसि', iast: 'khādasi', english: 'eat (2sg)',   grammar: 'verb, pres. 2sg.' },
        ],
        translation: 'What do you eat?',
        vocabIds: ['v-012', 'v-027'],
      },
      {
        id: 'st4-s2',
        words: [
          { devanagari: 'अहं',    iast: 'ahaṃ',    english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'फलं',   iast: 'phalaṃ',  english: 'fruit',       grammar: 'noun, acc. sg.' },
          { devanagari: 'खादामि',iast: 'khādāmi', english: 'eat (1sg)',   grammar: 'verb, pres. 1sg.' },
        ],
        translation: 'I eat fruit.',
        vocabIds: ['v-011', 'v-003'],
      },
      {
        id: 'st4-s3',
        words: [
          { devanagari: 'एतत्', iast: 'etat',   english: 'this',    grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',  iast: 'kiṃ',    english: 'what',    grammar: 'interrogative' },
          { devanagari: 'फलम्', iast: 'phalam', english: 'fruit',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'What fruit is this?',
        vocabIds: ['v-023', 'v-027', 'v-003', 'v-028'],
      },
      {
        id: 'st4-s4',
        words: [
          { devanagari: 'एतत्',  iast: 'etat',  english: 'This',    grammar: 'pronoun, nom. sg.' },
          { devanagari: 'आम्रम्',iast: 'āmram', english: 'a mango', grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'This is a mango.',
        vocabIds: ['v-023', 'v-040', 'v-028'],
      },
      {
        id: 'st4-s5',
        words: [
          { devanagari: 'त्वम्',  iast: 'tvam',    english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'आम्रं',  iast: 'āmraṃ',  english: 'mango',       grammar: 'noun, acc. sg.' },
          { devanagari: 'खादसि', iast: 'khādasi', english: 'eat (2sg)',   grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',    iast: 'vā',      english: 'or? / ?',     grammar: 'question particle' },
        ],
        translation: 'Do you eat mango?',
        vocabIds: ['v-012', 'v-040', 'v-035'],
      },
      {
        id: 'st4-s6',
        words: [
          { devanagari: 'अहम्',   iast: 'aham',    english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'आम्रं',  iast: 'āmraṃ',  english: 'mango',       grammar: 'noun, acc. sg.' },
          { devanagari: 'न',      iast: 'na',      english: 'not',         grammar: 'negation particle' },
          { devanagari: 'खादामि',iast: 'khādāmi', english: 'eat (1sg)',   grammar: 'verb, pres. 1sg.' },
        ],
        translation: 'I do not eat mango.',
        vocabIds: ['v-011', 'v-040', 'v-036'],
      },
      {
        id: 'st4-s7',
        words: [
          { devanagari: 'गृहे',  iast: 'gṛhe',  english: 'in the house', grammar: 'noun, loc. sg.' },
          { devanagari: 'जलम्',  iast: 'jalam', english: 'water',        grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति', iast: 'asti',  english: 'is',           grammar: 'verb, pres. 3sg.' },
          { devanagari: 'वा',   iast: 'vā',    english: '?',            grammar: 'question particle' },
        ],
        translation: 'Is there water in the house?',
        vocabIds: ['v-038', 'v-005', 'v-028', 'v-035'],
      },
      {
        id: 'st4-s8',
        words: [
          { devanagari: 'गृहे',  iast: 'gṛhe',  english: 'In the house', grammar: 'noun, loc. sg.' },
          { devanagari: 'जलम्',  iast: 'jalam', english: 'water',        grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',           grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'There is water in the house.',
        vocabIds: ['v-038', 'v-005', 'v-028'],
      },
      {
        id: 'st4-s9',
        words: [
          { devanagari: 'अहं',   iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलं',   iast: 'jalaṃ',  english: 'water',       grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबामि',iast: 'pibāmi', english: 'drink (1sg)', grammar: 'verb, pres. 1sg.' },
        ],
        translation: 'I drink water.',
        vocabIds: ['v-011', 'v-005', 'v-046'],
      },
      {
        id: 'st4-s10',
        words: [
          { devanagari: 'मार्गे', iast: 'mārge', english: 'on the path', grammar: 'noun, loc. sg.' },
          { devanagari: 'जलं',   iast: 'jalaṃ', english: 'water',       grammar: 'noun, nom. sg.' },
          { devanagari: 'नास्ति',iast: 'nāsti', english: 'is not',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'There is no water on the path.',
        vocabIds: ['v-042', 'v-005', 'v-029'],
      },
    ],
  },

  // ── Story 5 ──────────────────────────────────────────────────────────────
  {
    id: 'story-05',
    title: 'सः किं करोति?',
    titleIast: 'Saḥ Kiṃ Karoti?',
    titleEnglish: 'What Does He Do?',
    level: 'beginner',
    description: 'Observe Rama\'s day and ask questions about it — What does he do? Does he go? Where does he go? — building natural question fluency.',
    sentences: [
      {
        id: 'st5-s1',
        words: [
          { devanagari: 'रामः',  iast: 'rāmaḥ',  english: 'Rama',        grammar: 'proper noun, nom. sg.' },
          { devanagari: 'किं',   iast: 'kiṃ',    english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'करोति',iast: 'karoti', english: 'does (3sg)',  grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'What does Rama do?',
        vocabIds: ['v-001', 'v-027', 'v-048'],
      },
      {
        id: 'st5-s2',
        words: [
          { devanagari: 'सः',     iast: 'saḥ',     english: 'He',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामं',iast: 'grāmaṃ', english: 'to the village',grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',iast: 'gacchati',english: 'goes (3sg)',   grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He goes to the village.',
        vocabIds: ['v-013', 'v-017', 'v-002'],
      },
      {
        id: 'st5-s3',
        words: [
          { devanagari: 'सः',     iast: 'saḥ',     english: 'He',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'कुत्र', iast: 'kutra',   english: 'where?',    grammar: 'interrogative adverb' },
          { devanagari: 'गच्छति',iast: 'gacchati',english: 'goes',      grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Where does he go?',
        vocabIds: ['v-013', 'v-030', 'v-002'],
      },
      {
        id: 'st5-s4',
        words: [
          { devanagari: 'सः',    iast: 'saḥ',   english: 'He',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'गुरुं', iast: 'guruṃ', english: 'the teacher',  grammar: 'noun, acc. sg.' },
          { devanagari: 'जानाति',iast: 'jānāti',english: 'knows (3sg)', grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He knows the teacher.',
        vocabIds: ['v-013', 'v-019', 'v-045'],
      },
      {
        id: 'st5-s5',
        words: [
          { devanagari: 'त्वम्',  iast: 'tvam',    english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'रामं',  iast: 'rāmaṃ',  english: 'Rama',         grammar: 'proper noun, acc. sg.' },
          { devanagari: 'जानासि',iast: 'jānāsi', english: 'know (2sg)',  grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',    iast: 'vā',      english: '?',           grammar: 'question particle' },
        ],
        translation: 'Do you know Rama?',
        vocabIds: ['v-012', 'v-001', 'v-035'],
      },
      {
        id: 'st5-s6',
        words: [
          { devanagari: 'अहम्',  iast: 'aham',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'रामं',  iast: 'rāmaṃ', english: 'Rama',        grammar: 'proper noun, acc. sg.' },
          { devanagari: 'न',     iast: 'na',     english: 'not',         grammar: 'negation particle' },
          { devanagari: 'जानामि',iast: 'jānāmi', english: 'know (1sg)', grammar: 'verb, pres. 1sg.' },
        ],
        translation: 'I do not know Rama.',
        vocabIds: ['v-011', 'v-001', 'v-036'],
      },
      {
        id: 'st5-s7',
        words: [
          { devanagari: 'रामः',   iast: 'rāmaḥ',  english: 'Rama',         grammar: 'proper noun, nom. sg.' },
          { devanagari: 'ग्रामे',iast: 'grāme',  english: 'in the village',grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति', iast: 'asti',   english: 'is',           grammar: 'verb, pres. 3sg.' },
          { devanagari: 'वा',    iast: 'vā',     english: '?',            grammar: 'question particle' },
        ],
        translation: 'Is Rama in the village?',
        vocabIds: ['v-001', 'v-017', 'v-028', 'v-035'],
      },
      {
        id: 'st5-s8',
        words: [
          { devanagari: 'रामः',   iast: 'rāmaḥ',  english: 'Rama',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'ग्रामे',iast: 'grāme',  english: 'in the village', grammar: 'noun, loc. sg.' },
          { devanagari: 'न',      iast: 'na',     english: 'not',           grammar: 'negation particle' },
          { devanagari: 'अस्ति', iast: 'asti',   english: 'is',            grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'Rama is not in the village.',
        vocabIds: ['v-001', 'v-017', 'v-036', 'v-028'],
      },
      {
        id: 'st5-s9',
        words: [
          { devanagari: 'सः',     iast: 'saḥ',    english: 'He',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अन्यत्र',iast: 'anyatra',english: 'elsewhere',    grammar: 'adverb' },
          { devanagari: 'तिष्ठति',iast: 'tiṣṭhati',english: 'stands / is', grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He is elsewhere.',
        vocabIds: ['v-013', 'v-034', 'v-044'],
      },
      {
        id: 'st5-s10',
        words: [
          { devanagari: 'सः',    iast: 'saḥ',    english: 'He',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'वने',  iast: 'vane',   english: 'in the forest',grammar: 'noun, loc. sg.' },
          { devanagari: 'सर्वत्र',iast: 'sarvatra',english: 'everywhere',grammar: 'adverb' },
          { devanagari: 'गच्छति',iast: 'gacchati',english: 'goes',     grammar: 'verb, pres. 3sg.' },
        ],
        translation: 'He goes everywhere in the forest.',
        vocabIds: ['v-013', 'v-006', 'v-033', 'v-002'],
      },
    ],
  },
  // ── Dialogue Story 6 ─────────────────────────────────────────────────────
  {
    id: 'story-06', type: 'dialogue',
    title: 'यात्री च चालकः', titleIast: 'Yātrī ca Cālakaḥ',
    titleEnglish: 'Passenger & Driver',
    level: 'beginner',
    description: 'A passenger stops a taxi driver on the road and asks about the village route.',
    roles: [
      { id: 'A', label: 'यात्री', labelEn: 'Passenger' },
      { id: 'B', label: 'चालकः', labelEn: 'Driver' },
    ],
    sentences: [
      { id: 'dl6-1', speaker: 'A', words: [
          { devanagari: 'भोः',    iast: 'bhoḥ',   english: 'Hey!',        grammar: 'exclamation' },
          { devanagari: 'त्वं',   iast: 'tvaṃ',   english: 'you',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'चालकः', iast: 'cālakaḥ',english: 'a driver',    grammar: 'noun, nom. sg.' },
          { devanagari: 'असि',   iast: 'asi',    english: 'are (2sg)',   grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',    iast: 'vā',     english: '?',           grammar: 'question particle' },
        ], translation: 'Hey, are you a driver?', vocabIds: ['v-049','v-012','v-061','v-057','v-035'] },
      { id: 'dl6-2', speaker: 'B', words: [
          { devanagari: 'आम',    iast: 'āma',    english: 'Yes',         grammar: 'particle' },
          { devanagari: 'अहं',   iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'चालकः',iast: 'cālakaḥ',english: 'a driver',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्मि',iast: 'asmi',   english: 'am (1sg)',   grammar: 'verb, pres. 1sg.' },
        ], translation: 'Yes, I am a driver.', vocabIds: ['v-050','v-011','v-061','v-056'] },
      { id: 'dl6-3', speaker: 'A', words: [
          { devanagari: 'त्वं',   iast: 'tvaṃ',    english: 'You',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामं',iast: 'grāmaṃ', english: 'to the village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छसि',iast: 'gacchasi',english: 'go (2sg)',  grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',    iast: 'vā',      english: '?',          grammar: 'question particle' },
        ], translation: 'Are you going to the village?', vocabIds: ['v-012','v-017','v-035'] },
      { id: 'dl6-4', speaker: 'B', words: [
          { devanagari: 'आम',     iast: 'āma',    english: 'Yes',         grammar: 'particle' },
          { devanagari: 'अहं',    iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामं', iast: 'grāmaṃ', english: 'to village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छामि',iast: 'gacchāmi',english: 'go (1sg)', grammar: 'verb, pres. 1sg.' },
        ], translation: 'Yes, I am going to the village.', vocabIds: ['v-050','v-011','v-017'] },
      { id: 'dl6-5', speaker: 'A', words: [
          { devanagari: 'अहम्',   iast: 'aham',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अपि',   iast: 'api',    english: 'also',        grammar: 'particle' },
          { devanagari: 'ग्रामं', iast: 'grāmaṃ', english: 'to village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छामि',iast: 'gacchāmi',english: 'go (1sg)', grammar: 'verb, pres. 1sg.' },
        ], translation: 'I also go to the village.', vocabIds: ['v-011','v-055','v-017'] },
      { id: 'dl6-6', speaker: 'B', words: [
          { devanagari: 'ग्रामः',iast: 'grāmaḥ', english: 'The village', grammar: 'noun, nom. sg.' },
          { devanagari: 'दूरे',  iast: 'dūre',   english: 'far',         grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
          { devanagari: 'वा',   iast: 'vā',     english: '?',           grammar: 'question particle' },
        ], translation: 'Is the village far?', vocabIds: ['v-017','v-053','v-028','v-035'] },
      { id: 'dl6-7', speaker: 'A', words: [
          { devanagari: 'न',      iast: 'na',     english: 'No',          grammar: 'negation' },
          { devanagari: 'ग्रामः',iast: 'grāmaḥ', english: 'the village', grammar: 'noun, nom. sg.' },
          { devanagari: 'समीपे', iast: 'samīpe', english: 'near',        grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'No, the village is near.', vocabIds: ['v-036','v-017','v-054','v-028'] },
      { id: 'dl6-8', speaker: 'B', words: [
          { devanagari: 'मार्गः',iast: 'mārgaḥ', english: 'The road',   grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र', iast: 'kutra',  english: 'where?',      grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Where is the road?', vocabIds: ['v-042','v-030','v-028'] },
      { id: 'dl6-9', speaker: 'A', words: [
          { devanagari: 'मार्गः',iast: 'mārgaḥ', english: 'The road',   grammar: 'noun, nom. sg.' },
          { devanagari: 'तत्र', iast: 'tatra',  english: 'there',       grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The road is there.', vocabIds: ['v-042','v-032','v-028'] },
      { id: 'dl6-10', speaker: 'B', words: [
          { devanagari: 'धन्यवादः',iast: 'dhanyavādaḥ', english: 'Thank you', grammar: 'phrase' },
        ], translation: 'Thank you.', vocabIds: ['v-051'] },
    ],
  },

  // ── Dialogue Story 7 ─────────────────────────────────────────────────────
  {
    id: 'story-07', type: 'dialogue',
    title: 'शिष्यः च गुरुः', titleIast: 'Śiṣyaḥ ca Guruḥ',
    titleEnglish: 'Student & Teacher',
    level: 'beginner',
    description: 'A student asks the teacher about a book and Sanskrit, and the teacher offers to teach.',
    roles: [
      { id: 'A', label: 'शिष्यः', labelEn: 'Student' },
      { id: 'B', label: 'गुरुः',   labelEn: 'Teacher' },
    ],
    sentences: [
      { id: 'dl7-1', speaker: 'A', words: [
          { devanagari: 'गुरो',      iast: 'guro',     english: 'Teacher! (voc)', grammar: 'noun, voc. sg.' },
          { devanagari: 'एतत्',      iast: 'etat',     english: 'this',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',       iast: 'kiṃ',      english: 'what',           grammar: 'interrogative' },
          { devanagari: 'पुस्तकम्',  iast: 'pustakam', english: 'book',           grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',    iast: 'asti',     english: 'is',             grammar: 'verb, pres. 3sg.' },
        ], translation: 'Teacher, what book is this?', vocabIds: ['v-019','v-023','v-027','v-018','v-028'] },
      { id: 'dl7-2', speaker: 'B', words: [
          { devanagari: 'एतत्',      iast: 'etat',      english: 'This',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'संस्कृत-',  iast: 'saṃskṛta-', english: 'Sanskrit',      grammar: 'adj. prefix' },
          { devanagari: 'पुस्तकम्',  iast: 'pustakam',  english: 'book',          grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',    iast: 'asti',      english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'This is a Sanskrit book.', vocabIds: ['v-023','v-018','v-028'] },
      { id: 'dl7-3', speaker: 'A', words: [
          { devanagari: 'त्वं',      iast: 'tvaṃ',    english: 'You',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'संस्कृतं', iast: 'saṃskṛtaṃ',english: 'Sanskrit',      grammar: 'noun, acc. sg.' },
          { devanagari: 'जानासि',   iast: 'jānāsi',  english: 'know (2sg)',     grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',       iast: 'vā',      english: '?',             grammar: 'question particle' },
        ], translation: 'Do you know Sanskrit?', vocabIds: ['v-012','v-035'] },
      { id: 'dl7-4', speaker: 'B', words: [
          { devanagari: 'आम',       iast: 'āma',    english: 'Yes',           grammar: 'particle' },
          { devanagari: 'अहं',      iast: 'ahaṃ',   english: 'I',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'संस्कृतं',iast: 'saṃskṛtaṃ',english: 'Sanskrit',    grammar: 'noun, acc. sg.' },
          { devanagari: 'जानामि',  iast: 'jānāmi', english: 'know (1sg)',    grammar: 'verb, pres. 1sg.' },
        ], translation: 'Yes, I know Sanskrit.', vocabIds: ['v-050','v-011','v-045'] },
      { id: 'dl7-5', speaker: 'A', words: [
          { devanagari: 'अहं',      iast: 'ahaṃ',    english: 'I',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'संस्कृतं',iast: 'saṃskṛtaṃ',english: 'Sanskrit',   grammar: 'noun, acc. sg.' },
          { devanagari: 'न',        iast: 'na',      english: 'not',          grammar: 'negation' },
          { devanagari: 'जानामि',  iast: 'jānāmi',  english: 'know (1sg)',   grammar: 'verb, pres. 1sg.' },
        ], translation: 'I do not know Sanskrit.', vocabIds: ['v-011','v-036','v-045'] },
      { id: 'dl7-6', speaker: 'B', words: [
          { devanagari: 'अहं',      iast: 'ahaṃ',      english: 'I',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'त्वां',    iast: 'tvāṃ',      english: 'you (acc)',   grammar: 'pronoun, acc. sg.' },
          { devanagari: 'पाठयामि', iast: 'pāṭhayāmi', english: 'will teach', grammar: 'verb, causative 1sg.' },
        ], translation: 'I will teach you.', vocabIds: ['v-011','v-012'] },
      { id: 'dl7-7', speaker: 'A', words: [
          { devanagari: 'त्वं',    iast: 'tvaṃ',    english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',    iast: 'kiṃ',     english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'पठसि', iast: 'paṭhasi', english: 'read (2sg)', grammar: 'verb, pres. 2sg.' },
        ], translation: 'What do you read?', vocabIds: ['v-012','v-027','v-047'] },
      { id: 'dl7-8', speaker: 'B', words: [
          { devanagari: 'अहं',    iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पुस्तकं',iast: 'pustakaṃ',english: 'a book',   grammar: 'noun, acc. sg.' },
          { devanagari: 'पठामि', iast: 'paṭhāmi',english: 'read (1sg)', grammar: 'verb, pres. 1sg.' },
        ], translation: 'I read a book.', vocabIds: ['v-011','v-018','v-047'] },
      { id: 'dl7-9', speaker: 'A', words: [
          { devanagari: 'पुस्तकं',iast: 'pustakaṃ',english: 'The book',  grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र', iast: 'kutra',  english: 'where?',      grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Where is the book?', vocabIds: ['v-018','v-030','v-028'] },
      { id: 'dl7-10', speaker: 'B', words: [
          { devanagari: 'पुस्तकम्',iast: 'pustakam',english: 'The book', grammar: 'noun, nom. sg.' },
          { devanagari: 'अत्र',   iast: 'atra',   english: 'here',       grammar: 'adverb' },
          { devanagari: 'अस्ति', iast: 'asti',   english: 'is',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The book is here.', vocabIds: ['v-018','v-031','v-028'] },
    ],
  },

  // ── Dialogue Story 8 ─────────────────────────────────────────────────────
  {
    id: 'story-08', type: 'dialogue',
    title: 'पथिकः च अपरिचितः', titleIast: 'Pathikaḥ ca Aparicitaḥ',
    titleEnglish: 'Traveler & Stranger',
    level: 'beginner',
    description: 'A traveler on the road stops a stranger to ask for directions to the village.',
    roles: [
      { id: 'A', label: 'पथिकः',      labelEn: 'Traveler' },
      { id: 'B', label: 'अपरिचितः',   labelEn: 'Stranger' },
    ],
    sentences: [
      { id: 'dl8-1', speaker: 'A', words: [
          { devanagari: 'भोः',    iast: 'bhoḥ',   english: 'Excuse me!', grammar: 'exclamation' },
          { devanagari: 'ग्रामः',iast: 'grāmaḥ', english: 'the village',grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र', iast: 'kutra',  english: 'where?',      grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Excuse me, where is the village?', vocabIds: ['v-049','v-017','v-030','v-028'] },
      { id: 'dl8-2', speaker: 'B', words: [
          { devanagari: 'कः',     iast: 'kaḥ',    english: 'which?',     grammar: 'interrogative, nom. sg.' },
          { devanagari: 'ग्रामः',iast: 'grāmaḥ', english: 'village',    grammar: 'noun, nom. sg.' },
        ], translation: 'Which village?', vocabIds: ['v-025','v-017'] },
      { id: 'dl8-3', speaker: 'A', words: [
          { devanagari: 'रामस्य',iast: 'rāmasya', english: "Rama's",     grammar: 'proper noun, gen. sg.' },
          { devanagari: 'ग्रामः',iast: 'grāmaḥ',  english: 'village',   grammar: 'noun, nom. sg.' },
        ], translation: "Rama's village.", vocabIds: ['v-001','v-017'] },
      { id: 'dl8-4', speaker: 'B', words: [
          { devanagari: 'सः',     iast: 'saḥ',    english: 'That',       grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामः',iast: 'grāmaḥ', english: 'village',    grammar: 'noun, nom. sg.' },
          { devanagari: 'दूरे',  iast: 'dūre',   english: 'far',        grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'That village is far.', vocabIds: ['v-013','v-017','v-053','v-028'] },
      { id: 'dl8-5', speaker: 'A', words: [
          { devanagari: 'मार्गः',iast: 'mārgaḥ', english: 'The road',   grammar: 'noun, nom. sg.' },
          { devanagari: 'कः',   iast: 'kaḥ',    english: 'which?',      grammar: 'interrogative' },
        ], translation: 'Which is the road?', vocabIds: ['v-042','v-025'] },
      { id: 'dl8-6', speaker: 'B', words: [
          { devanagari: 'मार्गः',iast: 'mārgaḥ', english: 'The road',   grammar: 'noun, nom. sg.' },
          { devanagari: 'तत्र', iast: 'tatra',  english: 'there',       grammar: 'adverb' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The road is there.', vocabIds: ['v-042','v-032','v-028'] },
      { id: 'dl8-7', speaker: 'A', words: [
          { devanagari: 'वने',   iast: 'vane',   english: 'In the forest',grammar: 'noun, loc. sg.' },
          { devanagari: 'सिंहः',iast: 'siṃhaḥ', english: 'a lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',   english: 'is',          grammar: 'verb, pres. 3sg.' },
          { devanagari: 'वा',   iast: 'vā',     english: '?',           grammar: 'question particle' },
        ], translation: 'Is there a lion in the forest?', vocabIds: ['v-006','v-043','v-028','v-035'] },
      { id: 'dl8-8', speaker: 'B', words: [
          { devanagari: 'न',     iast: 'na',     english: 'No',          grammar: 'negation' },
          { devanagari: 'वने',   iast: 'vane',   english: 'in the forest',grammar: 'noun, loc. sg.' },
          { devanagari: 'सिंहः',iast: 'siṃhaḥ', english: 'lion',        grammar: 'noun, nom. sg.' },
          { devanagari: 'नास्ति',iast: 'nāsti',  english: 'is not',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'No, there is no lion in the forest.', vocabIds: ['v-036','v-006','v-043','v-029'] },
      { id: 'dl8-9', speaker: 'A', words: [
          { devanagari: 'धन्यवादः',iast: 'dhanyavādaḥ', english: 'Thank you', grammar: 'phrase' },
        ], translation: 'Thank you.', vocabIds: ['v-051'] },
      { id: 'dl8-10', speaker: 'B', words: [
          { devanagari: 'शुभम्', iast: 'śubham', english: 'Good / Safe journey', grammar: 'adj.' },
          { devanagari: 'अस्तु', iast: 'astu',   english: 'may it be',           grammar: 'verb, optative 3sg.' },
        ], translation: 'May it be well (safe journey).', vocabIds: ['v-063'] },
    ],
  },

  // ── Dialogue Story 9 ─────────────────────────────────────────────────────
  {
    id: 'story-09', type: 'dialogue',
    title: 'वार्तालापः', titleIast: 'Vārtālāpaḥ',
    titleEnglish: 'A Phone Call',
    level: 'beginner',
    description: 'Rama and Sita speak on the phone — asking names, where each person is, and what they are doing.',
    roles: [
      { id: 'A', label: 'रामः',  labelEn: 'Rama (man)' },
      { id: 'B', label: 'सीता', labelEn: 'Sita (woman)' },
    ],
    sentences: [
      { id: 'dl9-1', speaker: 'A', words: [
          { devanagari: 'भोः',  iast: 'bhoḥ',  english: 'Hello!',       grammar: 'exclamation' },
          { devanagari: 'त्वं', iast: 'tvaṃ',  english: 'you',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'का',   iast: 'kā',    english: 'who? (f)',     grammar: 'interrogative, nom. sg.' },
          { devanagari: 'असि', iast: 'asi',   english: 'are (2sg)',    grammar: 'verb, pres. 2sg.' },
        ], translation: 'Hello, who are you?', vocabIds: ['v-049','v-012','v-026','v-057'] },
      { id: 'dl9-2', speaker: 'B', words: [
          { devanagari: 'अहं',   iast: 'ahaṃ',  english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'सीता', iast: 'sītā',  english: 'Sita',        grammar: 'proper noun, nom. sg.' },
          { devanagari: 'अस्मि',iast: 'asmi',  english: 'am (1sg)',    grammar: 'verb, pres. 1sg.' },
          { devanagari: 'त्वं', iast: 'tvaṃ',  english: 'you',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'कः',   iast: 'kaḥ',   english: 'who? (m)',    grammar: 'interrogative, nom. sg.' },
          { devanagari: 'असि',  iast: 'asi',   english: 'are',         grammar: 'verb, pres. 2sg.' },
        ], translation: 'I am Sita. Who are you?', vocabIds: ['v-011','v-062','v-056','v-012','v-025','v-057'] },
      { id: 'dl9-3', speaker: 'A', words: [
          { devanagari: 'अहं',   iast: 'ahaṃ',  english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'रामः', iast: 'rāmaḥ', english: 'Rama',        grammar: 'proper noun, nom. sg.' },
          { devanagari: 'अस्मि',iast: 'asmi',  english: 'am (1sg)',    grammar: 'verb, pres. 1sg.' },
        ], translation: 'I am Rama.', vocabIds: ['v-011','v-001','v-056'] },
      { id: 'dl9-4', speaker: 'B', words: [
          { devanagari: 'राम',   iast: 'rāma',   english: 'Rama! (voc)', grammar: 'proper noun, voc. sg.' },
          { devanagari: 'त्वं',  iast: 'tvaṃ',   english: 'you',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'कुत्र',iast: 'kutra',  english: 'where?',      grammar: 'adverb' },
          { devanagari: 'असि',  iast: 'asi',    english: 'are (2sg)',   grammar: 'verb, pres. 2sg.' },
        ], translation: 'Rama, where are you?', vocabIds: ['v-001','v-012','v-030','v-057'] },
      { id: 'dl9-5', speaker: 'A', words: [
          { devanagari: 'अहं',   iast: 'ahaṃ',  english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामे',iast: 'grāme', english: 'in the village',grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्मि',iast: 'asmi',  english: 'am (1sg)',    grammar: 'verb, pres. 1sg.' },
        ], translation: 'I am in the village.', vocabIds: ['v-011','v-017','v-056'] },
      { id: 'dl9-6', speaker: 'B', words: [
          { devanagari: 'त्वं',   iast: 'tvaṃ',   english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',    iast: 'kiṃ',    english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'करोसि', iast: 'karosi', english: 'do (2sg)',    grammar: 'verb, pres. 2sg.' },
        ], translation: 'What are you doing?', vocabIds: ['v-012','v-027','v-048'] },
      { id: 'dl9-7', speaker: 'A', words: [
          { devanagari: 'अहं',    iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पुस्तकं',iast: 'pustakaṃ',english: 'a book',    grammar: 'noun, acc. sg.' },
          { devanagari: 'पठामि', iast: 'paṭhāmi', english: 'read (1sg)', grammar: 'verb, pres. 1sg.' },
        ], translation: 'I am reading a book.', vocabIds: ['v-011','v-018','v-047'] },
      { id: 'dl9-8', speaker: 'B', words: [
          { devanagari: 'त्वं',    iast: 'tvaṃ',    english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामं', iast: 'grāmaṃ',  english: 'to the village',grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छसि',iast: 'gacchasi', english: 'go (2sg)',    grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',     iast: 'vā',      english: '?',           grammar: 'question particle' },
        ], translation: 'Are you going to the village?', vocabIds: ['v-012','v-017','v-035'] },
      { id: 'dl9-9', speaker: 'A', words: [
          { devanagari: 'आम',      iast: 'āma',    english: 'Yes',         grammar: 'particle' },
          { devanagari: 'अहं',     iast: 'ahaṃ',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामं',  iast: 'grāmaṃ', english: 'to village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छामि',iast: 'gacchāmi',english: 'go (1sg)',   grammar: 'verb, pres. 1sg.' },
        ], translation: 'Yes, I am going to the village.', vocabIds: ['v-050','v-011','v-017'] },
      { id: 'dl9-10', speaker: 'B', words: [
          { devanagari: 'शुभम्',  iast: 'śubham', english: 'Good',       grammar: 'adj.' },
          { devanagari: 'अस्तु',  iast: 'astu',   english: 'may it be',  grammar: 'verb, optative 3sg.' },
          { devanagari: 'धन्यवादः',iast: 'dhanyavādaḥ',english: 'thank you', grammar: 'phrase' },
        ], translation: 'Take care, thank you.', vocabIds: ['v-063','v-051'] },
    ],
  },

  // ── Dialogue Story 10 ────────────────────────────────────────────────────
  {
    id: 'story-10', type: 'dialogue',
    title: 'द्वौ मित्रे', titleIast: 'Dvau Mitre',
    titleEnglish: 'Two Friends',
    level: 'beginner',
    description: 'Two friends run into each other and talk about what they eat and drink — casual conversation with vā, na, and asti.',
    roles: [
      { id: 'A', label: 'मित्रम् १', labelEn: 'Friend 1' },
      { id: 'B', label: 'मित्रम् २', labelEn: 'Friend 2' },
    ],
    sentences: [
      { id: 'dl10-1', speaker: 'A', words: [
          { devanagari: 'भोः',   iast: 'bhoḥ',  english: 'Hey!',         grammar: 'exclamation' },
          { devanagari: 'मित्र', iast: 'mitra', english: 'friend (voc)', grammar: 'noun, voc. sg.' },
          { devanagari: 'त्वम्', iast: 'tvam',  english: 'you',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अत्र', iast: 'atra',  english: 'here',         grammar: 'adverb' },
          { devanagari: 'असि',  iast: 'asi',   english: 'are',          grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',   iast: 'vā',    english: '?',            grammar: 'question particle' },
        ], translation: 'Hey friend, are you here?', vocabIds: ['v-049','v-060','v-012','v-031','v-057','v-035'] },
      { id: 'dl10-2', speaker: 'B', words: [
          { devanagari: 'आम',    iast: 'āma',   english: 'Yes',          grammar: 'particle' },
          { devanagari: 'अहम्',  iast: 'aham',  english: 'I',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अत्र', iast: 'atra',  english: 'here',         grammar: 'adverb' },
          { devanagari: 'अस्मि',iast: 'asmi',  english: 'am',           grammar: 'verb, pres. 1sg.' },
          { devanagari: 'त्वम्', iast: 'tvam',  english: 'you',          grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अपि',  iast: 'api',   english: 'also',         grammar: 'particle' },
          { devanagari: 'अत्र', iast: 'atra',  english: 'here',         grammar: 'adverb' },
          { devanagari: 'असि',  iast: 'asi',   english: 'are',          grammar: 'verb, pres. 2sg.' },
        ], translation: 'Yes, I am here. You are also here!', vocabIds: ['v-050','v-011','v-031','v-056','v-012','v-055','v-057'] },
      { id: 'dl10-3', speaker: 'A', words: [
          { devanagari: 'त्वं',   iast: 'tvaṃ',   english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किं',    iast: 'kiṃ',    english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'खादसि', iast: 'khādasi', english: 'eat (2sg)',  grammar: 'verb, pres. 2sg.' },
        ], translation: 'What are you eating?', vocabIds: ['v-012','v-027'] },
      { id: 'dl10-4', speaker: 'B', words: [
          { devanagari: 'अहं',    iast: 'ahaṃ',    english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'फलं',   iast: 'phalaṃ',  english: 'fruit',       grammar: 'noun, acc. sg.' },
          { devanagari: 'खादामि',iast: 'khādāmi', english: 'eat (1sg)',  grammar: 'verb, pres. 1sg.' },
          { devanagari: 'त्वम्',  iast: 'tvam',    english: 'you',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अपि',   iast: 'api',     english: 'also',        grammar: 'particle' },
          { devanagari: 'खादसि', iast: 'khādasi', english: 'eat (2sg)?', grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',    iast: 'vā',      english: '?',           grammar: 'question particle' },
        ], translation: 'I am eating fruit. Are you eating too?', vocabIds: ['v-011','v-003','v-012','v-055','v-035'] },
      { id: 'dl10-5', speaker: 'A', words: [
          { devanagari: 'आम',     iast: 'āma',    english: 'Yes',         grammar: 'particle' },
          { devanagari: 'अहम्',   iast: 'aham',   english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'आम्रं',  iast: 'āmraṃ',  english: 'mango',       grammar: 'noun, acc. sg.' },
          { devanagari: 'खादामि',iast: 'khādāmi', english: 'eat (1sg)',  grammar: 'verb, pres. 1sg.' },
        ], translation: 'Yes, I am eating mango.', vocabIds: ['v-050','v-011','v-040'] },
      { id: 'dl10-6', speaker: 'B', words: [
          { devanagari: 'त्वं',   iast: 'tvaṃ',  english: 'You',         grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलं',   iast: 'jalaṃ', english: 'water',       grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबसि',iast: 'pibasi',english: 'drink (2sg)', grammar: 'verb, pres. 2sg.' },
          { devanagari: 'वा',   iast: 'vā',    english: '?',           grammar: 'question particle' },
        ], translation: 'Are you drinking water?', vocabIds: ['v-012','v-005','v-046','v-035'] },
      { id: 'dl10-7', speaker: 'A', words: [
          { devanagari: 'न',      iast: 'na',    english: 'No',          grammar: 'negation' },
          { devanagari: 'अहं',   iast: 'ahaṃ',  english: 'I',           grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलं',   iast: 'jalaṃ', english: 'water',       grammar: 'noun, acc. sg.' },
          { devanagari: 'न',     iast: 'na',    english: 'not',         grammar: 'negation' },
          { devanagari: 'पिबामि',iast: 'pibāmi',english: 'drink (1sg)',grammar: 'verb, pres. 1sg.' },
        ], translation: 'No, I am not drinking water.', vocabIds: ['v-036','v-011','v-005','v-046'] },
      { id: 'dl10-8', speaker: 'B', words: [
          { devanagari: 'एतत्', iast: 'etat', english: 'This',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'किम्', iast: 'kim',  english: 'what?',       grammar: 'interrogative' },
          { devanagari: 'अस्ति',iast: 'asti', english: 'is',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'What is this?', vocabIds: ['v-023','v-027','v-028'] },
      { id: 'dl10-9', speaker: 'A', words: [
          { devanagari: 'एतत्', iast: 'etat',  english: 'This',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'फलम्', iast: 'phalam', english: 'a fruit',    grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',iast: 'asti',  english: 'is',          grammar: 'verb, pres. 3sg.' },
          { devanagari: 'खाद',  iast: 'khāda', english: 'eat! (imp)', grammar: 'verb, impv. 2sg.' },
        ], translation: 'This is a fruit. Eat!', vocabIds: ['v-023','v-003','v-028'] },
      { id: 'dl10-10', speaker: 'B', words: [
          { devanagari: 'धन्यवादः',iast: 'dhanyavādaḥ', english: 'Thank you', grammar: 'phrase' },
          { devanagari: 'मित्र',   iast: 'mitra',        english: 'friend',    grammar: 'noun, voc. sg.' },
        ], translation: 'Thank you, friend!', vocabIds: ['v-051','v-060'] },
    ],
  },
]

// ── 6 New illustrated stories ───────────────────────────────────────────────
const NEW_STORIES = [
  {
    id: 'story-11', type: 'story', level: 'beginner',
    illustration: '🚌🛣️🌳',
    title: 'बस-यात्रा', titleEnglish: 'Bus Journey',
    description: 'Rama travels by bus to his village, using location words and questions.',
    sentences: [
      { id: 'bs11-1', words: [
          { devanagari: 'रामः',     iast: 'rāmaḥ',    english: 'Rama',       grammar: 'noun, nom. sg.' },
          { devanagari: 'स्थानके', iast: 'sthānake', english: 'at the stop', grammar: 'noun, loc. sg.' },
          { devanagari: 'तिष्ठति',iast: 'tiṣṭhati', english: 'stands',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama stands at the bus stop.', vocabIds: ['v-001','v-069','v-044'] },
      { id: 'bs11-2', words: [
          { devanagari: 'बसः',    iast: 'basaḥ',    english: 'the bus',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अत्र',   iast: 'atra',     english: 'here',      grammar: 'adverb' },
          { devanagari: 'आगच्छति',iast: 'āgacchati',english: 'arrives',   grammar: 'verb, pres. 3sg.' },
        ], translation: 'The bus arrives here.', vocabIds: ['v-065','v-031','v-087'] },
      { id: 'bs11-3', words: [
          { devanagari: 'रामः',    iast: 'rāmaḥ',   english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'बसे',     iast: 'base',    english: 'in the bus', grammar: 'noun, loc. sg.' },
          { devanagari: 'उपविशति',iast: 'upaviśati',english: 'sits down', grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama sits down in the bus.', vocabIds: ['v-001','v-065','v-085'] },
      { id: 'bs11-4', words: [
          { devanagari: 'चालकः', iast: 'cālakaḥ', english: 'the driver', grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र',  iast: 'kutra',   english: 'where?',    grammar: 'adverb' },
          { devanagari: 'गच्छति',iast: 'gacchati',  english: 'goes',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'Where does the driver go?', vocabIds: ['v-061','v-030','v-002'] },
      { id: 'bs11-5', words: [
          { devanagari: 'सः',     iast: 'saḥ',     english: 'He',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'ग्रामम्',iast: 'grāmam',  english: 'to the village', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',iast: 'gacchati', english: 'goes',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'He goes to the village.', vocabIds: ['v-013','v-017','v-002'] },
      { id: 'bs11-6', words: [
          { devanagari: 'यात्री', iast: 'yātrī',   english: 'the passenger', grammar: 'noun, nom. sg.' },
          { devanagari: 'टिकटम्',iast: 'ṭikaṭam', english: 'a ticket',  grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',iast: 'paśyati',  english: 'sees',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The passenger looks at the ticket.', vocabIds: ['v-070','v-068','v-009'] },
      { id: 'bs11-7', words: [
          { devanagari: 'वने',    iast: 'vane',    english: 'in the forest', grammar: 'noun, loc. sg.' },
          { devanagari: 'वृक्षाः',iast: 'vṛkṣāḥ', english: 'trees (are)', grammar: 'noun, nom. pl.' },
          { devanagari: 'सन्ति', iast: 'santi',   english: 'exist',      grammar: 'verb, pres. 3pl.' },
        ], translation: 'There are trees in the forest.', vocabIds: ['v-006','v-039'] },
      { id: 'bs11-8', words: [
          { devanagari: 'बालः',   iast: 'bālaḥ',  english: 'the boy',   grammar: 'noun, nom. sg.' },
          { devanagari: 'जलम्',   iast: 'jalam',  english: 'water',     grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबति', iast: 'pibati',  english: 'drinks',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The boy drinks water.', vocabIds: ['v-007','v-005','v-046'] },
      { id: 'bs11-9', words: [
          { devanagari: 'ग्रामः', iast: 'grāmaḥ', english: 'the village', grammar: 'noun, nom. sg.' },
          { devanagari: 'दूरे',   iast: 'dūre',   english: 'far away',  grammar: 'adverb' },
          { devanagari: 'नास्ति',iast: 'nāsti',   english: 'is not',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The village is not far.', vocabIds: ['v-017','v-053','v-029'] },
      { id: 'bs11-10', words: [
          { devanagari: 'रामः',   iast: 'rāmaḥ',  english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'गृहम्',  iast: 'gṛham',  english: 'home',      grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',iast: 'gacchati', english: 'goes',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama goes home.', vocabIds: ['v-001','v-038','v-002'] },
    ],
  },

  {
    id: 'story-12', type: 'story', level: 'beginner',
    illustration: '✈️🌤️🌍',
    title: 'विमान-यात्रा', titleEnglish: 'Airplane Journey',
    description: 'Sita flies in an airplane through the blue sky to a distant land.',
    sentences: [
      { id: 'vj12-1', words: [
          { devanagari: 'सीता',    iast: 'sītā',    english: 'Sita',       grammar: 'noun, nom. sg.' },
          { devanagari: 'विमाने',  iast: 'vimāne',  english: 'in the airplane', grammar: 'noun, loc. sg.' },
          { devanagari: 'उपविशति',iast: 'upaviśati',english: 'sits down', grammar: 'verb, pres. 3sg.' },
        ], translation: 'Sita sits down in the airplane.', vocabIds: ['v-062','v-066','v-085'] },
      { id: 'vj12-2', words: [
          { devanagari: 'विमानम्', iast: 'vimānam', english: 'the airplane', grammar: 'noun, nom. sg.' },
          { devanagari: 'आकाशे',   iast: 'ākāśe',   english: 'in the sky',  grammar: 'noun, loc. sg.' },
          { devanagari: 'उड्डयति',iast: 'uḍḍayati', english: 'flies',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The airplane flies in the sky.', vocabIds: ['v-066','v-067','v-086'] },
      { id: 'vj12-3', words: [
          { devanagari: 'आकाशः',   iast: 'ākāśaḥ',  english: 'the sky',   grammar: 'noun, nom. sg.' },
          { devanagari: 'सुन्दरः', iast: 'sundaraḥ', english: 'beautiful', grammar: 'adj., nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The sky is beautiful.', vocabIds: ['v-067','v-083','v-028'] },
      { id: 'vj12-4', words: [
          { devanagari: 'सीता',   iast: 'sītā',    english: 'Sita',       grammar: 'noun, nom. sg.' },
          { devanagari: 'बाहिर',  iast: 'bāhira',  english: 'outside',    grammar: 'adverb' },
          { devanagari: 'पश्यति',iast: 'paśyati',  english: 'looks',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'Sita looks outside.', vocabIds: ['v-062','v-009'] },
      { id: 'vj12-5', words: [
          { devanagari: 'सा',     iast: 'sā',      english: 'she',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलम्',   iast: 'jalam',   english: 'water',      grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबति', iast: 'pibati',   english: 'drinks',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'She drinks water.', vocabIds: ['v-014','v-005','v-046'] },
      { id: 'vj12-6', words: [
          { devanagari: 'विमानम्',iast: 'vimānam', english: 'the airplane', grammar: 'noun, nom. sg.' },
          { devanagari: 'तत्र',   iast: 'tatra',   english: 'there',       grammar: 'adverb' },
          { devanagari: 'गच्छति',iast: 'gacchati',  english: 'goes',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The airplane goes there.', vocabIds: ['v-066','v-032','v-002'] },
      { id: 'vj12-7', words: [
          { devanagari: 'यात्री', iast: 'yātrī',   english: 'the passenger', grammar: 'noun, nom. sg.' },
          { devanagari: 'पुस्तकम्',iast: 'pustakam', english: 'a book',   grammar: 'noun, acc. sg.' },
          { devanagari: 'पठति',  iast: 'paṭhati',  english: 'reads',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The passenger reads a book.', vocabIds: ['v-070','v-018','v-047'] },
      { id: 'vj12-8', words: [
          { devanagari: 'मार्गः',  iast: 'mārgaḥ',  english: 'the path',  grammar: 'noun, nom. sg.' },
          { devanagari: 'दूरे',    iast: 'dūre',    english: 'far away',  grammar: 'adverb' },
          { devanagari: 'अस्ति',  iast: 'asti',    english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The road is far away.', vocabIds: ['v-042','v-053','v-028'] },
      { id: 'vj12-9', words: [
          { devanagari: 'विमानम्',iast: 'vimānam', english: 'the airplane', grammar: 'noun, nom. sg.' },
          { devanagari: 'भूमौ',   iast: 'bhūmau',  english: 'on the ground', grammar: 'noun, loc. sg.' },
          { devanagari: 'अवतरति',iast: 'avatarati', english: 'lands',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'The airplane lands on the ground.', vocabIds: ['v-066','v-088'] },
      { id: 'vj12-10', words: [
          { devanagari: 'सीता',    iast: 'sītā',    english: 'Sita',      grammar: 'noun, nom. sg.' },
          { devanagari: 'धन्यवादः',iast: 'dhanyavādaḥ',english: 'thanks', grammar: 'phrase' },
          { devanagari: 'वदति',   iast: 'vadati',  english: 'says',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'Sita says thank you.', vocabIds: ['v-062','v-051','v-010'] },
    ],
  },

  {
    id: 'story-13', type: 'story', level: 'beginner',
    illustration: '📺📰🌏',
    title: 'दूरदर्शन-समाचारः', titleEnglish: 'TV News',
    description: 'Rama watches the evening news on television and learns what is happening.',
    sentences: [
      { id: 'tv13-1', words: [
          { devanagari: 'रामः',       iast: 'rāmaḥ',      english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'दूरदर्शनम्',iast: 'dūradarśanam',english: 'the television', grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',     iast: 'paśyati',    english: 'watches',   grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama watches the television.', vocabIds: ['v-001','v-071','v-009'] },
      { id: 'tv13-2', words: [
          { devanagari: 'समाचारः',   iast: 'samācāraḥ',  english: 'the news',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अत्र',       iast: 'atra',       english: 'here',      grammar: 'adverb' },
          { devanagari: 'आगच्छति',   iast: 'āgacchati',  english: 'comes on',  grammar: 'verb, pres. 3sg.' },
        ], translation: 'The news comes on.', vocabIds: ['v-072','v-031','v-087'] },
      { id: 'tv13-3', words: [
          { devanagari: 'वार्तिकः',  iast: 'vārtikaḥ',  english: 'the anchor', grammar: 'noun, nom. sg.' },
          { devanagari: 'वदति',      iast: 'vadati',     english: 'speaks',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The news anchor speaks.', vocabIds: ['v-010'] },
      { id: 'tv13-4', words: [
          { devanagari: 'किम्',      iast: 'kim',        english: 'what',      grammar: 'pronoun, nom. sg.' },
          { devanagari: 'समाचारः',   iast: 'samācāraḥ',  english: 'the news',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',       english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'What is the news?', vocabIds: ['v-027','v-072','v-028'] },
      { id: 'tv13-5', words: [
          { devanagari: 'रामः',      iast: 'rāmaḥ',     english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'समाचारम्',  iast: 'samācāram', english: 'the news',  grammar: 'noun, acc. sg.' },
          { devanagari: 'शृणोति',    iast: 'śṛṇoti',    english: 'listens to', grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama listens to the news.', vocabIds: ['v-001','v-072','v-084'] },
      { id: 'tv13-6', words: [
          { devanagari: 'बालः',      iast: 'bālaḥ',     english: 'the boy',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अपि',       iast: 'api',        english: 'also',      grammar: 'particle' },
          { devanagari: 'पश्यति',    iast: 'paśyati',   english: 'watches',   grammar: 'verb, pres. 3sg.' },
        ], translation: 'The boy also watches.', vocabIds: ['v-007','v-055','v-009'] },
      { id: 'tv13-7', words: [
          { devanagari: 'समाचारः',   iast: 'samācāraḥ', english: 'the news',  grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र',      iast: 'kutra',     english: 'where?',    grammar: 'adverb' },
          { devanagari: 'अस्ति',     iast: 'asti',      english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'Where is the news?', vocabIds: ['v-072','v-030','v-028'] },
      { id: 'tv13-8', words: [
          { devanagari: 'दूरदर्शने',iast: 'dūradarśane',english: 'on TV',    grammar: 'noun, loc. sg.' },
          { devanagari: 'समाचारः',   iast: 'samācāraḥ', english: 'the news', grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',      english: 'is',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'The news is on television.', vocabIds: ['v-071','v-072','v-028'] },
      { id: 'tv13-9', words: [
          { devanagari: 'गुरुः',     iast: 'guruḥ',     english: 'the teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'समाचारम्',  iast: 'samācāram', english: 'the news',   grammar: 'noun, acc. sg.' },
          { devanagari: 'जानाति',    iast: 'jānāti',    english: 'knows',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The teacher knows the news.', vocabIds: ['v-019','v-072','v-045'] },
      { id: 'tv13-10', words: [
          { devanagari: 'समाचारः',   iast: 'samācāraḥ', english: 'the news',  grammar: 'noun, nom. sg.' },
          { devanagari: 'शुभम्',     iast: 'śubham',    english: 'good',      grammar: 'adj.' },
          { devanagari: 'अस्ति',     iast: 'asti',      english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The news is good.', vocabIds: ['v-072','v-063','v-028'] },
    ],
  },

  {
    id: 'story-14', type: 'story', level: 'beginner',
    illustration: '📻🎵🌟',
    title: 'आकाशवाणी-कार्यक्रमः', titleEnglish: 'Radio Program',
    description: 'Rama tunes in to the radio and hears a beautiful story from a teacher.',
    sentences: [
      { id: 'rd14-1', words: [
          { devanagari: 'रामः',      iast: 'rāmaḥ',     english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'आकाशवाणीम्',iast: 'ākāśavāṇīm',english: 'the radio', grammar: 'noun, acc. sg.' },
          { devanagari: 'शृणोति',    iast: 'śṛṇoti',    english: 'listens to', grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama listens to the radio.', vocabIds: ['v-001','v-073','v-084'] },
      { id: 'rd14-2', words: [
          { devanagari: 'आकाशवाणी',  iast: 'ākāśavāṇī', english: 'the radio', grammar: 'noun, nom. sg.' },
          { devanagari: 'सुन्दरा',   iast: 'sundarā',   english: 'beautiful', grammar: 'adj., nom. sg. f.' },
          { devanagari: 'अस्ति',     iast: 'asti',      english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The radio program is beautiful.', vocabIds: ['v-073','v-083','v-028'] },
      { id: 'rd14-3', words: [
          { devanagari: 'कः',        iast: 'kaḥ',       english: 'who?',      grammar: 'pronoun, nom. sg.' },
          { devanagari: 'वदति',      iast: 'vadati',    english: 'speaks',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'Who speaks?', vocabIds: ['v-025','v-010'] },
      { id: 'rd14-4', words: [
          { devanagari: 'गुरुः',     iast: 'guruḥ',     english: 'the teacher', grammar: 'noun, nom. sg.' },
          { devanagari: 'कथाम्',     iast: 'kathām',    english: 'a story',   grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',      iast: 'vadati',    english: 'tells',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'The teacher tells a story.', vocabIds: ['v-019','v-074','v-010'] },
      { id: 'rd14-5', words: [
          { devanagari: 'बालः',      iast: 'bālaḥ',     english: 'the child', grammar: 'noun, nom. sg.' },
          { devanagari: 'कथाम्',     iast: 'kathām',    english: 'the story', grammar: 'noun, acc. sg.' },
          { devanagari: 'शृणोति',    iast: 'śṛṇoti',   english: 'listens to', grammar: 'verb, pres. 3sg.' },
        ], translation: 'The child listens to the story.', vocabIds: ['v-007','v-074','v-084'] },
      { id: 'rd14-6', words: [
          { devanagari: 'कथा',       iast: 'kathā',     english: 'the story', grammar: 'noun, nom. sg.' },
          { devanagari: 'कुत्र',      iast: 'kutra',    english: 'where?',    grammar: 'adverb' },
          { devanagari: 'अस्ति',     iast: 'asti',     english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'Where is the story?', vocabIds: ['v-074','v-030','v-028'] },
      { id: 'rd14-7', words: [
          { devanagari: 'कथा',       iast: 'kathā',     english: 'the story', grammar: 'noun, nom. sg.' },
          { devanagari: 'आकाशवाणौ',  iast: 'ākāśavāṇau',english: 'on the radio', grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',     english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The story is on the radio.', vocabIds: ['v-074','v-073','v-028'] },
      { id: 'rd14-8', words: [
          { devanagari: 'कथा',       iast: 'kathā',    english: 'the story', grammar: 'noun, nom. sg.' },
          { devanagari: 'सुन्दरा',   iast: 'sundarā',  english: 'beautiful', grammar: 'adj., nom. sg. f.' },
          { devanagari: 'अस्ति',     iast: 'asti',     english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The story is beautiful.', vocabIds: ['v-074','v-083','v-028'] },
      { id: 'rd14-9', words: [
          { devanagari: 'वार्ता',     iast: 'vārtā',   english: 'the talk',  grammar: 'noun, nom. sg.' },
          { devanagari: 'सर्वत्र',    iast: 'sarvatra',english: 'everywhere', grammar: 'adverb' },
          { devanagari: 'अस्ति',     iast: 'asti',    english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The broadcast is everywhere.', vocabIds: ['v-081','v-033','v-028'] },
      { id: 'rd14-10', words: [
          { devanagari: 'रामः',      iast: 'rāmaḥ',   english: 'Rama',      grammar: 'noun, nom. sg.' },
          { devanagari: 'धन्यवादः',  iast: 'dhanyavādaḥ',english: 'thanks', grammar: 'phrase' },
          { devanagari: 'वदति',      iast: 'vadati',  english: 'says',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rama says thank you.', vocabIds: ['v-001','v-051','v-010'] },
    ],
  },

  {
    id: 'story-15', type: 'story', level: 'beginner',
    illustration: '🌙⭐📖',
    title: 'बाल-कथा-समयः', titleEnglish: 'Bedtime Story',
    description: 'At night, Mother tells her child a tale of a brave king who walks into the forest.',
    sentences: [
      { id: 'bc15-1', words: [
          { devanagari: 'रात्रिः',   iast: 'rātriḥ',  english: 'night',     grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',    english: 'is (it is)', grammar: 'verb, pres. 3sg.' },
        ], translation: 'It is night.', vocabIds: ['v-076','v-028'] },
      { id: 'bc15-2', words: [
          { devanagari: 'बालः',      iast: 'bālaḥ',  english: 'the child', grammar: 'noun, nom. sg.' },
          { devanagari: 'गृहे',      iast: 'gṛhe',   english: 'at home',   grammar: 'noun, loc. sg.' },
          { devanagari: 'तिष्ठति',  iast: 'tiṣṭhati',english: 'stays',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The child stays at home.', vocabIds: ['v-007','v-038','v-044'] },
      { id: 'bc15-3', words: [
          { devanagari: 'माता',      iast: 'mātā',   english: 'mother',    grammar: 'noun, nom. sg.' },
          { devanagari: 'कथाम्',     iast: 'kathām', english: 'a story',   grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',      iast: 'vadati', english: 'tells',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'Mother tells a story.', vocabIds: ['v-080','v-074','v-010'] },
      { id: 'bc15-4', words: [
          { devanagari: 'एकः',       iast: 'ekaḥ',   english: 'a / one',   grammar: 'numeral, nom. sg.' },
          { devanagari: 'राजा',      iast: 'rājā',   english: 'king',      grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',   english: 'there is',  grammar: 'verb, pres. 3sg.' },
        ], translation: 'There is a king.', vocabIds: ['v-075','v-028'] },
      { id: 'bc15-5', words: [
          { devanagari: 'राजा',      iast: 'rājā',   english: 'the king',  grammar: 'noun, nom. sg.' },
          { devanagari: 'वनम्',      iast: 'vanam',  english: 'the forest', grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',    iast: 'gacchati',english: 'goes to',  grammar: 'verb, pres. 3sg.' },
        ], translation: 'The king goes to the forest.', vocabIds: ['v-075','v-006','v-002'] },
      { id: 'bc15-6', words: [
          { devanagari: 'वने',       iast: 'vane',   english: 'in the forest', grammar: 'noun, loc. sg.' },
          { devanagari: 'सिंहः',     iast: 'siṃhaḥ', english: 'a lion',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',     iast: 'asti',   english: 'is',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'There is a lion in the forest.', vocabIds: ['v-006','v-043','v-028'] },
      { id: 'bc15-7', words: [
          { devanagari: 'राजा',      iast: 'rājā',   english: 'the king',  grammar: 'noun, nom. sg.' },
          { devanagari: 'सिंहम्',    iast: 'siṃham', english: 'the lion',  grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',    iast: 'paśyati',english: 'sees',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The king sees the lion.', vocabIds: ['v-075','v-043','v-009'] },
      { id: 'bc15-8', words: [
          { devanagari: 'सः',        iast: 'saḥ',    english: 'he',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'न',         iast: 'na',     english: 'does not',  grammar: 'particle, negation' },
          { devanagari: 'गच्छति',    iast: 'gacchati',english: 'flee/go',  grammar: 'verb, pres. 3sg.' },
        ], translation: 'He does not flee.', vocabIds: ['v-013','v-036','v-002'] },
      { id: 'bc15-9', words: [
          { devanagari: 'राजा',      iast: 'rājā',   english: 'the king',  grammar: 'noun, nom. sg.' },
          { devanagari: 'गृहम्',     iast: 'gṛham',  english: 'home',      grammar: 'noun, acc. sg.' },
          { devanagari: 'गच्छति',    iast: 'gacchati',english: 'goes',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'The king goes home.', vocabIds: ['v-075','v-038','v-002'] },
      { id: 'bc15-10', words: [
          { devanagari: 'बालः',      iast: 'bālaḥ',  english: 'the child', grammar: 'noun, nom. sg.' },
          { devanagari: 'कथाम्',     iast: 'kathām', english: 'the story', grammar: 'noun, acc. sg.' },
          { devanagari: 'शृणोति',    iast: 'śṛṇoti', english: 'listens to', grammar: 'verb, pres. 3sg.' },
        ], translation: 'The child listens to the story.', vocabIds: ['v-007','v-074','v-084'] },
    ],
  },

  {
    id: 'story-16', type: 'story', level: 'beginner',
    illustration: '🦊🌾⭐',
    title: 'नीति-कथा', titleEnglish: 'A Moral Story',
    description: 'A thirsty jackal and a kind farmer teach us that kindness is found everywhere.',
    sentences: [
      { id: 'nk16-1', words: [
          { devanagari: 'एकः',       iast: 'ekaḥ',    english: 'one / a',   grammar: 'numeral, nom. sg.' },
          { devanagari: 'कृषकः',     iast: 'kṛṣakaḥ', english: 'farmer',    grammar: 'noun, nom. sg.' },
          { devanagari: 'क्षेत्रे',  iast: 'kṣetre',  english: 'in the field', grammar: 'noun, loc. sg.' },
          { devanagari: 'तिष्ठति',  iast: 'tiṣṭhati', english: 'works/stands', grammar: 'verb, pres. 3sg.' },
        ], translation: 'A farmer stands in the field.', vocabIds: ['v-078','v-079','v-044'] },
      { id: 'nk16-2', words: [
          { devanagari: 'एकः',       iast: 'ekaḥ',    english: 'one / a',   grammar: 'numeral, nom. sg.' },
          { devanagari: 'शृगालः',    iast: 'śṛgālaḥ', english: 'jackal',    grammar: 'noun, nom. sg.' },
          { devanagari: 'आगच्छति',   iast: 'āgacchati',english: 'comes',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'A jackal comes.', vocabIds: ['v-077','v-087'] },
      { id: 'nk16-3', words: [
          { devanagari: 'शृगालः',    iast: 'śṛgālaḥ', english: 'the jackal', grammar: 'noun, nom. sg.' },
          { devanagari: 'क्षेत्रे',  iast: 'kṣetre',  english: 'in the field', grammar: 'noun, loc. sg.' },
          { devanagari: 'तिष्ठति',  iast: 'tiṣṭhati', english: 'stands',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The jackal stands in the field.', vocabIds: ['v-077','v-079','v-044'] },
      { id: 'nk16-4', words: [
          { devanagari: 'कृषकः',     iast: 'kṛṣakaḥ', english: 'the farmer', grammar: 'noun, nom. sg.' },
          { devanagari: 'शृगालम्',   iast: 'śṛgālam', english: 'the jackal', grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',    iast: 'paśyati',  english: 'sees',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The farmer sees the jackal.', vocabIds: ['v-078','v-077','v-009'] },
      { id: 'nk16-5', words: [
          { devanagari: 'सः',        iast: 'saḥ',     english: 'he',        grammar: 'pronoun, nom. sg.' },
          { devanagari: 'वदति',      iast: 'vadati',  english: 'says',      grammar: 'verb, pres. 3sg.' },
          { devanagari: '"भोः!"',    iast: '"bhoḥ!"', english: '"Hey!"',    grammar: 'particle, exclamation' },
        ], translation: 'He says, "Hey!"', vocabIds: ['v-013','v-010','v-049'] },
      { id: 'nk16-6', words: [
          { devanagari: 'शृगालः',    iast: 'śṛgālaḥ', english: 'the jackal', grammar: 'noun, nom. sg.' },
          { devanagari: 'जलम्',      iast: 'jalam',   english: 'water',     grammar: 'noun, acc. sg.' },
          { devanagari: 'न',         iast: 'na',      english: 'does not (have)', grammar: 'particle, neg.' },
          { devanagari: 'जानाति',    iast: 'jānāti',  english: 'know (where)', grammar: 'verb, pres. 3sg.' },
        ], translation: 'The jackal does not know (where) water is.', vocabIds: ['v-077','v-005','v-036','v-045'] },
      { id: 'nk16-7', words: [
          { devanagari: 'कृषकः',     iast: 'kṛṣakaḥ', english: 'the farmer', grammar: 'noun, nom. sg.' },
          { devanagari: 'जलस्य',     iast: 'jalasya', english: 'of water',   grammar: 'noun, gen. sg.' },
          { devanagari: 'समीपे',     iast: 'samīpe',  english: 'near',      grammar: 'adverb' },
          { devanagari: 'गच्छति',    iast: 'gacchati',english: 'goes',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The farmer goes near the water.', vocabIds: ['v-078','v-005','v-054','v-002'] },
      { id: 'nk16-8', words: [
          { devanagari: 'शृगालः',    iast: 'śṛgālaḥ', english: 'the jackal', grammar: 'noun, nom. sg.' },
          { devanagari: 'जलम्',      iast: 'jalam',   english: 'water',     grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबति',     iast: 'pibati',  english: 'drinks',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The jackal drinks water.', vocabIds: ['v-077','v-005','v-046'] },
      { id: 'nk16-9', words: [
          { devanagari: 'शृगालः',    iast: 'śṛgālaḥ', english: 'the jackal', grammar: 'noun, nom. sg.' },
          { devanagari: 'धन्यवादः',  iast: 'dhanyavādaḥ',english: 'thank you', grammar: 'phrase' },
          { devanagari: 'वदति',      iast: 'vadati',  english: 'says',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The jackal says thank you.', vocabIds: ['v-077','v-051','v-010'] },
      { id: 'nk16-10', words: [
          { devanagari: 'सत्यम्',    iast: 'satyam',  english: 'truth',     grammar: 'noun, nom. sg.' },
          { devanagari: '—',         iast: '—',       english: '—',         grammar: '' },
          { devanagari: 'मित्रम्',   iast: 'mitram',  english: 'friendship', grammar: 'noun, nom. sg.' },
          { devanagari: 'सर्वत्र',   iast: 'sarvatra',english: 'is everywhere', grammar: 'adverb' },
          { devanagari: 'अस्ति',     iast: 'asti',    english: '!',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'Truth — friendship is everywhere!', vocabIds: ['v-082','v-060','v-033','v-028'] },
    ],
  },

  // ── Moral Story 17 — The Thirsty Crow (Panchatantra) ────────────────────
  {
    id: 'story-17', type: 'story', category: 'moral', level: 'beginner',
    title: 'पिपासितः काकः',
    titleEnglish: 'The Thirsty Crow',
    description: 'A thirsty crow uses intelligence to drink water — wisdom beats brute force.',
    moral: 'Where strength fails, intelligence succeeds. A clever mind finds a way even when circumstances seem impossible.',
    sentences: [
      { id: 'ms17-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'काकः',    iast: 'kākaḥ',    english: 'crow',          grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',     iast: 'vane',     english: 'in the forest', grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',    iast: 'vasati',   english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'A crow lives in the forest.', vocabIds: ['v-089','v-006'] },
      { id: 'ms17-2', words: [
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'पिपासा',  iast: 'pipāsā',   english: 'thirst',        grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'He is thirsty.', vocabIds: ['v-090','v-028'] },
      { id: 'ms17-3', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'एकं',     iast: 'ekaṃ',     english: 'a / one',       grammar: 'numeral, acc. sg.' },
          { devanagari: 'घटं',     iast: 'ghaṭaṃ',   english: 'pot',           grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',  iast: 'paśyati',  english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'He sees a pot.', vocabIds: ['v-013','v-091','v-009'] },
      { id: 'ms17-4', words: [
          { devanagari: 'घटे',     iast: 'ghaṭe',    english: 'in the pot',    grammar: 'noun, loc. sg.' },
          { devanagari: 'अल्पं',   iast: 'alpaṃ',    english: 'a little',      grammar: 'adj, acc. sg.' },
          { devanagari: 'जलं',     iast: 'jalaṃ',    english: 'water',         grammar: 'noun, acc. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'There is a little water in the pot.', vocabIds: ['v-091','v-005','v-028'] },
      { id: 'ms17-5', words: [
          { devanagari: 'काकः',    iast: 'kākaḥ',    english: 'the crow',      grammar: 'noun, nom. sg.' },
          { devanagari: 'पाषाणान्',iast: 'pāṣāṇān',  english: 'stones',        grammar: 'noun, acc. pl.' },
          { devanagari: 'क्षिपति', iast: 'kṣipati',  english: 'drops',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crow drops stones.', vocabIds: ['v-089','v-092','v-093'] },
      { id: 'ms17-6', words: [
          { devanagari: 'जलं',     iast: 'jalaṃ',    english: 'the water',     grammar: 'noun, nom. sg.' },
          { devanagari: 'उच्चैः',  iast: 'uccaiḥ',   english: 'upward',        grammar: 'adverb' },
          { devanagari: 'आगच्छति', iast: 'āgacchati',english: 'comes',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The water rises upward.', vocabIds: ['v-005','v-094','v-087'] },
      { id: 'ms17-7', words: [
          { devanagari: 'काकः',    iast: 'kākaḥ',    english: 'the crow',      grammar: 'noun, nom. sg.' },
          { devanagari: 'जलं',     iast: 'jalaṃ',    english: 'water',         grammar: 'noun, acc. sg.' },
          { devanagari: 'पिबति',   iast: 'pibati',   english: 'drinks',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crow drinks water.', vocabIds: ['v-089','v-005','v-046'] },
      { id: 'ms17-8', words: [
          { devanagari: 'बुद्धिः', iast: 'buddhiḥ',  english: 'intelligence',  grammar: 'noun, nom. sg.' },
          { devanagari: 'बलात्',   iast: 'balāt',    english: 'than strength', grammar: 'noun, abl. sg.' },
          { devanagari: 'श्रेष्ठा',iast: 'śreṣṭhā',  english: 'better',        grammar: 'adj, nom. sg. f.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Intelligence is better than strength.', vocabIds: ['v-096','v-097','v-028'] },
    ],
  },

  // ── Moral Story 18 — The Lion and the Mouse ─────────────────────────────
  {
    id: 'story-18', type: 'story', category: 'moral', level: 'beginner',
    title: 'सिंहः मूषकश्च',
    titleEnglish: 'The Lion and the Mouse',
    description: 'A tiny mouse saves a mighty lion — even the small can repay kindness.',
    moral: 'No act of kindness is ever wasted. Even the smallest creature can repay a debt of compassion when the time comes.',
    sentences: [
      { id: 'ms18-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'सिंहः',   iast: 'siṃhaḥ',   english: 'lion',          grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',     iast: 'vane',     english: 'in the forest', grammar: 'noun, loc. sg.' },
          { devanagari: 'स्वपिति', iast: 'svapiti',  english: 'sleeps',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'A lion sleeps in the forest.', vocabIds: ['v-098','v-006'] },
      { id: 'ms18-2', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'मूषकः',   iast: 'mūṣakaḥ',  english: 'mouse',         grammar: 'noun, nom. sg.' },
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his/its',       grammar: 'pronoun, gen. sg.' },
          { devanagari: 'उपरि',    iast: 'upari',    english: 'over / on top', grammar: 'adverb' },
          { devanagari: 'धावति',   iast: 'dhāvati',  english: 'runs',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A mouse runs over him.', vocabIds: ['v-099'] },
      { id: 'ms18-3', words: [
          { devanagari: 'सिंहः',   iast: 'siṃhaḥ',   english: 'the lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'जागर्ति', iast: 'jāgarti',  english: 'wakes up',      grammar: 'verb, pres. 3sg.' },
          { devanagari: 'मूषकं',   iast: 'mūṣakaṃ',  english: 'the mouse',     grammar: 'noun, acc. sg.' },
          { devanagari: 'गृह्णाति',iast: 'gṛhṇāti',  english: 'seizes / grabs',grammar: 'verb, pres. 3sg.' },
        ], translation: 'The lion wakes up and seizes the mouse.', vocabIds: ['v-098','v-099'] },
      { id: 'ms18-4', words: [
          { devanagari: 'मूषकः',   iast: 'mūṣakaḥ',  english: 'the mouse',     grammar: 'noun, nom. sg.' },
          { devanagari: 'क्षमां',  iast: 'kṣamāṃ',   english: 'forgiveness',   grammar: 'noun, acc. sg.' },
          { devanagari: 'याचते',   iast: 'yācate',   english: 'begs / asks for',grammar: 'verb, pres. 3sg.' },
        ], translation: 'The mouse begs for forgiveness.', vocabIds: ['v-099','v-137'] },
      { id: 'ms18-5', words: [
          { devanagari: 'सिंहः',   iast: 'siṃhaḥ',   english: 'the lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'दयालुः',  iast: 'dayāluḥ',  english: 'kind',          grammar: 'adj, nom. sg.' },
          { devanagari: 'मूषकं',   iast: 'mūṣakaṃ',  english: 'the mouse',     grammar: 'noun, acc. sg.' },
          { devanagari: 'मुञ्चति', iast: 'muñcati',  english: 'releases',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The kind lion releases the mouse.', vocabIds: ['v-098','v-136','v-099','v-101'] },
      { id: 'ms18-6', words: [
          { devanagari: 'एकदा',    iast: 'ekadā',    english: 'one day',       grammar: 'adverb' },
          { devanagari: 'सिंहः',   iast: 'siṃhaḥ',   english: 'the lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'जाले',    iast: 'jāle',     english: 'in a net',      grammar: 'noun, loc. sg.' },
          { devanagari: 'पतति',    iast: 'patati',   english: 'falls',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'One day the lion falls into a net.', vocabIds: ['v-098','v-100','v-125'] },
      { id: 'ms18-7', words: [
          { devanagari: 'मूषकः',   iast: 'mūṣakaḥ',  english: 'the mouse',     grammar: 'noun, nom. sg.' },
          { devanagari: 'जालं',    iast: 'jālaṃ',    english: 'the net',       grammar: 'noun, acc. sg.' },
          { devanagari: 'कर्तयति', iast: 'kartayati', english: 'cuts',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The mouse cuts the net.', vocabIds: ['v-099','v-100'] },
      { id: 'ms18-8', words: [
          { devanagari: 'सिंहः',   iast: 'siṃhaḥ',   english: 'the lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'मुक्तः',  iast: 'muktaḥ',   english: 'free / liberated',grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'becomes',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'The lion becomes free.', vocabIds: ['v-098'] },
      { id: 'ms18-9', words: [
          { devanagari: 'परोपकारः',iast: 'paropakāraḥ',english: 'helping others',grammar: 'noun, nom. sg.' },
          { devanagari: 'सर्वदा',  iast: 'sarvadā',  english: 'always',        grammar: 'adverb' },
          { devanagari: 'शुभः',    iast: 'śubhaḥ',   english: 'auspicious / good',grammar: 'adj, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Helping others is always good.', vocabIds: ['v-119','v-028'] },
    ],
  },

  // ── Moral Story 19 — The Tortoise and the Hare ──────────────────────────
  {
    id: 'story-19', type: 'story', category: 'moral', level: 'beginner',
    title: 'कूर्मः शश्च',
    titleEnglish: 'The Tortoise and the Hare',
    description: 'Slow and steady wins the race — patience triumphs over arrogance.',
    moral: 'Consistency and patience overcome talent wasted on arrogance. Slow, steady effort always crosses the finish line.',
    sentences: [
      { id: 'ms19-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'कूर्मः',  iast: 'kūrmaḥ',   english: 'tortoise',      grammar: 'noun, nom. sg.' },
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'शशः',     iast: 'śaśaḥ',    english: 'hare / rabbit', grammar: 'noun, nom. sg.' },
          { devanagari: 'च',       iast: 'ca',       english: 'and',           grammar: 'particle' },
        ], translation: 'A tortoise and a hare.', vocabIds: ['v-103'] },
      { id: 'ms19-2', words: [
          { devanagari: 'शशः',     iast: 'śaśaḥ',    english: 'the hare',      grammar: 'noun, nom. sg.' },
          { devanagari: 'अहंकारी', iast: 'ahaṃkārī', english: 'proud / arrogant',grammar: 'adj, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hare is arrogant.', vocabIds: ['v-115','v-028'] },
      { id: 'ms19-3', words: [
          { devanagari: 'कूर्मः',  iast: 'kūrmaḥ',   english: 'the tortoise',  grammar: 'noun, nom. sg.' },
          { devanagari: 'शनैः',    iast: 'śanaiḥ',   english: 'slowly',        grammar: 'adverb' },
          { devanagari: 'शनैः',    iast: 'śanaiḥ',   english: 'slowly',        grammar: 'adverb' },
          { devanagari: 'गच्छति',  iast: 'gacchati', english: 'goes',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The tortoise goes slowly, slowly.', vocabIds: ['v-103','v-104','v-002'] },
      { id: 'ms19-4', words: [
          { devanagari: 'शशः',     iast: 'śaśaḥ',    english: 'the hare',      grammar: 'noun, nom. sg.' },
          { devanagari: 'शीघ्रं',  iast: 'śīghraṃ',  english: 'fast',          grammar: 'adverb' },
          { devanagari: 'धावति',   iast: 'dhāvati',  english: 'runs',          grammar: 'verb, pres. 3sg.' },
          { devanagari: 'स्वपिति', iast: 'svapiti',  english: 'sleeps',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hare runs fast then sleeps.', vocabIds: ['v-105'] },
      { id: 'ms19-5', words: [
          { devanagari: 'कूर्मः',  iast: 'kūrmaḥ',   english: 'the tortoise',  grammar: 'noun, nom. sg.' },
          { devanagari: 'न',       iast: 'na',       english: 'not',           grammar: 'particle' },
          { devanagari: 'विरमति', iast: 'virati',    english: 'stops',         grammar: 'verb, pres. 3sg.' },
          { devanagari: 'अग्रे',   iast: 'agre',     english: 'forward',       grammar: 'adverb' },
          { devanagari: 'गच्छति',  iast: 'gacchati', english: 'goes',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The tortoise does not stop, goes forward.', vocabIds: ['v-103','v-036','v-002'] },
      { id: 'ms19-6', words: [
          { devanagari: 'कूर्मः',  iast: 'kūrmaḥ',   english: 'the tortoise',  grammar: 'noun, nom. sg.' },
          { devanagari: 'प्रथमः', iast: 'prathamaḥ', english: 'first',         grammar: 'adj, nom. sg.' },
          { devanagari: 'आगच्छति',iast: 'āgacchati', english: 'arrives',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'The tortoise arrives first.', vocabIds: ['v-103','v-087'] },
      { id: 'ms19-7', words: [
          { devanagari: 'जयः',     iast: 'jayaḥ',    english: 'victory',       grammar: 'noun, nom. sg.' },
          { devanagari: 'नम्रस्य',iast: 'namrasya',  english: 'of the humble', grammar: 'adj, gen. sg.' },
          { devanagari: 'भवति',   iast: 'bhavati',   english: 'is / belongs to',grammar: 'verb, pres. 3sg.' },
        ], translation: 'Victory belongs to the humble.', vocabIds: ['v-106','v-116'] },
    ],
  },

  // ── Moral Story 20 — The Greedy Merchant ────────────────────────────────
  {
    id: 'story-20', type: 'story', category: 'moral', level: 'intermediate',
    title: 'लोभी व्यापारी',
    titleEnglish: 'The Greedy Merchant',
    description: 'A wealthy merchant loses everything through greed — contentment is true wealth.',
    moral: 'Greed is the root of all ruin. One who is never satisfied with what they have will eventually lose everything.',
    sentences: [
      { id: 'ms20-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'व्यापारी',iast: 'vyāpārī',  english: 'merchant',      grammar: 'noun, nom. sg.' },
          { devanagari: 'नगरे',    iast: 'nagare',   english: 'in the city',   grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',    iast: 'vasati',   english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'A merchant lives in the city.', vocabIds: ['v-107'] },
      { id: 'ms20-2', words: [
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'बहु',     iast: 'bahu',     english: 'much / many',   grammar: 'adj' },
          { devanagari: 'धनं',     iast: 'dhanaṃ',   english: 'wealth',        grammar: 'noun, acc. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'He has much wealth.', vocabIds: ['v-108','v-028'] },
      { id: 'ms20-3', words: [
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'मनसि',    iast: 'manasi',   english: 'in mind',       grammar: 'noun, loc. sg.' },
          { devanagari: 'लोभः',    iast: 'lobhaḥ',   english: 'greed',         grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Greed is in his mind.', vocabIds: ['v-109','v-028'] },
      { id: 'ms20-4', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'अधिकं',  iast: 'adhikaṃ',  english: 'more',          grammar: 'adj, acc. sg.' },
          { devanagari: 'धनं',     iast: 'dhanaṃ',   english: 'wealth',        grammar: 'noun, acc. sg.' },
          { devanagari: 'इच्छति', iast: 'icchati',   english: 'desires / wants',grammar: 'verb, pres. 3sg.' },
        ], translation: 'He desires more and more wealth.', vocabIds: ['v-013','v-108'] },
      { id: 'ms20-5', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'असत्यं',  iast: 'asatyaṃ',  english: 'untruth',       grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'speaks',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'He speaks untruth.', vocabIds: ['v-013','v-130','v-010'] },
      { id: 'ms20-6', words: [
          { devanagari: 'जनाः',    iast: 'janāḥ',    english: 'people',        grammar: 'noun, nom. pl.' },
          { devanagari: 'तं',      iast: 'taṃ',      english: 'him',           grammar: 'pronoun, acc. sg.' },
          { devanagari: 'न',       iast: 'na',       english: 'not',           grammar: 'particle' },
          { devanagari: 'विश्वसन्ति',iast: 'viśvasanti',english: 'trust',      grammar: 'verb, pres. 3pl.' },
        ], translation: 'People do not trust him.', vocabIds: ['v-140','v-036'] },
      { id: 'ms20-7', words: [
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'धनस्य',  iast: 'dhanasya', english: 'of wealth',     grammar: 'noun, gen. sg.' },
          { devanagari: 'नाशः',    iast: 'nāśaḥ',    english: 'ruin',          grammar: 'noun, nom. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'happens',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'His wealth is ruined.', vocabIds: ['v-108','v-110'] },
      { id: 'ms20-8', words: [
          { devanagari: 'लोभः',    iast: 'lobhaḥ',   english: 'greed',         grammar: 'noun, nom. sg.' },
          { devanagari: 'नाशस्य', iast: 'nāśasya',  english: 'of ruin',       grammar: 'noun, gen. sg.' },
          { devanagari: 'मूलम्',   iast: 'mūlam',    english: 'root / cause',  grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Greed is the root of ruin.', vocabIds: ['v-109','v-110','v-028'] },
    ],
  },

  // ── Moral Story 21 — The Caged Bird ─────────────────────────────────────
  {
    id: 'story-21', type: 'story', category: 'moral', level: 'intermediate',
    title: 'पञ्जरे खगः',
    titleEnglish: 'The Bird in the Cage',
    description: 'A free bird warns a caged bird — freedom is the greatest treasure.',
    moral: 'Freedom and righteousness are the true riches of life. No amount of comfort or security is worth the loss of one\'s freedom.',
    sentences: [
      { id: 'ms21-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'खगः',     iast: 'khagaḥ',   english: 'bird',          grammar: 'noun, nom. sg.' },
          { devanagari: 'पञ्जरे',  iast: 'pañjare',  english: 'in the cage',   grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'A bird is in the cage.', vocabIds: ['v-111','v-112','v-028'] },
      { id: 'ms21-2', words: [
          { devanagari: 'अपरः',    iast: 'aparaḥ',   english: 'another',       grammar: 'adj, nom. sg.' },
          { devanagari: 'खगः',     iast: 'khagaḥ',   english: 'bird',          grammar: 'noun, nom. sg.' },
          { devanagari: 'स्वतन्त्रः',iast: 'svantantraḥ',english: 'free',      grammar: 'adj, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Another bird is free.', vocabIds: ['v-111','v-113','v-028'] },
      { id: 'ms21-3', words: [
          { devanagari: 'स्वतन्त्रः',iast: 'svantantraḥ',english: 'the free one',grammar: 'adj, nom. sg.' },
          { devanagari: 'खगः',     iast: 'khagaḥ',   english: 'bird',          grammar: 'noun, nom. sg.' },
          { devanagari: 'पञ्जरस्थं',iast: 'pañjarasthaṃ',english: 'the caged', grammar: 'adj, acc. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'tells',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The free bird tells the caged one.', vocabIds: ['v-111','v-112','v-010'] },
      { id: 'ms21-4', words: [
          { devanagari: '"स्वातन्त्र्यं',iast: '"svātantryaṃ',english: '"Freedom',grammar: 'noun, nom. sg.' },
          { devanagari: 'महत्',    iast: 'mahat',    english: 'great',         grammar: 'adj, nom. sg. n.' },
          { devanagari: 'धनम्"',   iast: 'dhanam"',  english: 'treasure"',     grammar: 'noun, nom. sg.' },
        ], translation: '"Freedom is the greatest treasure."', vocabIds: ['v-108'] },
      { id: 'ms21-5', words: [
          { devanagari: 'पञ्जरे',  iast: 'pañjare',  english: 'in a cage',     grammar: 'noun, loc. sg.' },
          { devanagari: 'धनम्',    iast: 'dhanam',   english: 'wealth',        grammar: 'noun, nom. sg.' },
          { devanagari: 'नास्ति',  iast: 'nāsti',    english: 'is not',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'In a cage there is no wealth.', vocabIds: ['v-112','v-108','v-029'] },
      { id: 'ms21-6', words: [
          { devanagari: 'धर्मेण',  iast: 'dharmeṇa', english: 'by righteousness',grammar: 'noun, inst. sg.' },
          { devanagari: 'जीवनं',   iast: 'jīvanaṃ',  english: 'life',          grammar: 'noun, acc. sg.' },
          { devanagari: 'सुन्दरं', iast: 'sundaraṃ',  english: 'beautiful',    grammar: 'adj, acc. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'becomes',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'Life becomes beautiful through righteousness.', vocabIds: ['v-114','v-083'] },
    ],
  },

  // ── Moral Story 22 — Truth Always Wins ──────────────────────────────────
  {
    id: 'story-22', type: 'story', category: 'moral', level: 'beginner',
    title: 'सत्यमेव जयते',
    titleEnglish: 'Truth Alone Wins',
    description: 'A young boy speaks truth despite fear and is rewarded — truth is the highest dharma.',
    moral: 'Truth is the highest virtue. Even when it is difficult and frightening, speaking truth always leads to honour and reward.',
    sentences: [
      { id: 'ms22-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'बालकः',   iast: 'bālakaḥ',  english: 'boy',           grammar: 'noun, nom. sg.' },
          { devanagari: 'ग्रामे',  iast: 'grāme',    english: 'in the village',grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',    iast: 'vasati',   english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'A boy lives in the village.', vocabIds: ['v-121','v-017'] },
      { id: 'ms22-2', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'सदा',     iast: 'sadā',     english: 'always',        grammar: 'adverb' },
          { devanagari: 'सत्यं',   iast: 'satyaṃ',   english: 'truth',         grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'speaks',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'He always speaks truth.', vocabIds: ['v-013','v-129','v-010'] },
      { id: 'ms22-3', words: [
          { devanagari: 'एकदा',    iast: 'ekadā',    english: 'one day',       grammar: 'adverb' },
          { devanagari: 'राजा',    iast: 'rājā',     english: 'king',          grammar: 'noun, nom. sg.' },
          { devanagari: 'तं',      iast: 'taṃ',      english: 'him',           grammar: 'pronoun, acc. sg.' },
          { devanagari: 'पृच्छति', iast: 'pṛcchati', english: 'asks',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'One day a king asks him.', vocabIds: [] },
      { id: 'ms22-4', words: [
          { devanagari: '"किं',    iast: '"kiṃ',     english: '"What',         grammar: 'pronoun, nom. sg. n.' },
          { devanagari: 'चोरः',    iast: 'coraḥ',    english: 'thief',         grammar: 'noun, nom. sg.' },
          { devanagari: 'अत्र',    iast: 'atra',     english: 'here',          grammar: 'adverb' },
          { devanagari: 'आगच्छत्?"',iast: 'āgacchat?"',english: 'came?"',     grammar: 'verb, past 3sg.' },
        ], translation: '"Did a thief come here?"', vocabIds: ['v-128','v-031','v-087'] },
      { id: 'ms22-5', words: [
          { devanagari: 'बालकः',   iast: 'bālakaḥ',  english: 'the boy',       grammar: 'noun, nom. sg.' },
          { devanagari: 'भीतः',    iast: 'bhītaḥ',   english: 'afraid',        grammar: 'adj, nom. sg.' },
          { devanagari: 'अपि',     iast: 'api',      english: 'even',          grammar: 'particle' },
          { devanagari: 'सत्यं',   iast: 'satyaṃ',   english: 'truth',         grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'speaks',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'Even afraid, the boy speaks truth.', vocabIds: ['v-121','v-055','v-129','v-010'] },
      { id: 'ms22-6', words: [
          { devanagari: 'राजा',    iast: 'rājā',     english: 'the king',      grammar: 'noun, nom. sg.' },
          { devanagari: 'तं',      iast: 'taṃ',      english: 'him',           grammar: 'pronoun, acc. sg.' },
          { devanagari: 'पुरस्करोति',iast: 'puraskāroti',english: 'honours / rewards',grammar: 'verb, pres. 3sg.' },
        ], translation: 'The king honours him.', vocabIds: [] },
      { id: 'ms22-7', words: [
          { devanagari: 'सत्यम्',  iast: 'satyam',   english: 'truth',         grammar: 'noun, nom. sg.' },
          { devanagari: 'एव',      iast: 'eva',      english: 'alone',         grammar: 'particle' },
          { devanagari: 'जयते',    iast: 'jayate',   english: 'wins',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Truth alone wins.', vocabIds: ['v-129','v-106'] },
    ],
  },

  // ── Moral Story 23 — The Humble Student ─────────────────────────────────
  {
    id: 'story-23', type: 'story', category: 'moral', level: 'beginner',
    title: 'विनयशील शिष्यः',
    titleEnglish: 'The Humble Student',
    description: 'A humble student earns his teacher\'s highest blessing — humility opens all doors.',
    moral: 'Humility is the foundation of all learning. A humble heart receives knowledge, blessing, and respect that arrogance can never earn.',
    sentences: [
      { id: 'ms23-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'शिष्यः',  iast: 'śiṣyaḥ',   english: 'student',       grammar: 'noun, nom. sg.' },
          { devanagari: 'गुरुकुले', iast: 'gurukule', english: 'at the gurukul', grammar: 'noun, loc. sg.' },
          { devanagari: 'पठति',    iast: 'paṭhati',  english: 'studies',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'A student studies at the gurukul.', vocabIds: ['v-020','v-047'] },
      { id: 'ms23-2', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'नम्रः',   iast: 'namraḥ',   english: 'humble',        grammar: 'adj, nom. sg.' },
          { devanagari: 'दयालुः',  iast: 'dayāluḥ',  english: 'kind',          grammar: 'adj, nom. sg.' },
          { devanagari: 'च',       iast: 'ca',       english: 'and',           grammar: 'particle' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'He is humble and kind.', vocabIds: ['v-013','v-116','v-136','v-028'] },
      { id: 'ms23-3', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'गुरवे',   iast: 'gurave',   english: 'to the teacher',grammar: 'noun, dat. sg.' },
          { devanagari: 'प्रतिदिनं',iast: 'pratidinaṃ',english: 'every day',   grammar: 'adverb' },
          { devanagari: 'नमति',    iast: 'namati',   english: 'bows',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'He bows to the teacher every day.', vocabIds: ['v-013','v-019'] },
      { id: 'ms23-4', words: [
          { devanagari: 'अन्ये',   iast: 'anye',     english: 'other',         grammar: 'adj, nom. pl.' },
          { devanagari: 'शिष्याः', iast: 'śiṣyāḥ',   english: 'students',      grammar: 'noun, nom. pl.' },
          { devanagari: 'अहंकारिणः',iast: 'ahaṃkāriṇaḥ',english: 'arrogant', grammar: 'adj, nom. pl.' },
          { devanagari: 'सन्ति',   iast: 'santi',    english: 'are',           grammar: 'verb, pres. 3pl.' },
        ], translation: 'Other students are arrogant.', vocabIds: ['v-020','v-115'] },
      { id: 'ms23-5', words: [
          { devanagari: 'गुरुः',   iast: 'guruḥ',    english: 'the teacher',   grammar: 'noun, nom. sg.' },
          { devanagari: 'नम्रं',   iast: 'namraṃ',   english: 'the humble one',grammar: 'adj, acc. sg.' },
          { devanagari: 'शिष्यं',  iast: 'śiṣyaṃ',   english: 'student',       grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',  iast: 'paśyati',  english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The teacher sees the humble student.', vocabIds: ['v-019','v-116','v-020','v-009'] },
      { id: 'ms23-6', words: [
          { devanagari: 'गुरुः',   iast: 'guruḥ',    english: 'the teacher',   grammar: 'noun, nom. sg.' },
          { devanagari: 'तस्मै',   iast: 'tasmai',   english: 'to him',        grammar: 'pronoun, dat. sg.' },
          { devanagari: 'आशीर्वादं',iast: 'āśīrvādaṃ',english: 'blessing',    grammar: 'noun, acc. sg.' },
          { devanagari: 'ददाति',   iast: 'dadāti',   english: 'gives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The teacher gives him his blessing.', vocabIds: ['v-019'] },
      { id: 'ms23-7', words: [
          { devanagari: 'विनयः',   iast: 'vinayaḥ',  english: 'humility',      grammar: 'noun, nom. sg.' },
          { devanagari: 'सर्वस्य', iast: 'sarvasya', english: 'of all things', grammar: 'pronoun, gen. sg.' },
          { devanagari: 'मूलम्',   iast: 'mūlam',    english: 'root / foundation',grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'Humility is the foundation of everything.', vocabIds: ['v-116','v-028'] },
    ],
  },

  // ── Moral Story 24 — The Angry King ─────────────────────────────────────
  {
    id: 'story-24', type: 'story', category: 'moral', level: 'intermediate',
    title: 'क्रोधी राजा',
    titleEnglish: 'The Angry King',
    description: 'A wise minister tames the king\'s anger with a gentle word — peace conquers wrath.',
    moral: 'Anger destroys what patience builds. A wise leader listens, forgives, and rules with peace — for from anger comes sorrow, from peace comes joy.',
    sentences: [
      { id: 'ms24-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'राजा',    iast: 'rājā',     english: 'king',          grammar: 'noun, nom. sg.' },
          { devanagari: 'नगरे',    iast: 'nagare',   english: 'in the city',   grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',    iast: 'vasati',   english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'A king lives in the city.', vocabIds: [] },
      { id: 'ms24-2', words: [
          { devanagari: 'तस्य',    iast: 'tasya',    english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'क्रोधः',  iast: 'krodhaḥ',  english: 'anger',         grammar: 'noun, nom. sg.' },
          { devanagari: 'अतिशयः', iast: 'atiśayaḥ', english: 'excessive',     grammar: 'adj, nom. sg.' },
          { devanagari: 'अस्ति',   iast: 'asti',     english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'His anger is excessive.', vocabIds: ['v-138','v-028'] },
      { id: 'ms24-3', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'क्रुद्धः',iast: 'kruddhaḥ', english: 'angry',         grammar: 'adj, nom. sg.' },
          { devanagari: 'सर्वान्', iast: 'sarvān',   english: 'everyone',      grammar: 'pronoun, acc. pl.' },
          { devanagari: 'दण्डयति', iast: 'daṇḍayati',english: 'punishes',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'Angry, he punishes everyone.', vocabIds: ['v-013','v-138'] },
      { id: 'ms24-4', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'बुद्धिमान्',iast: 'buddhimān',english: 'wise',        grammar: 'adj, nom. sg.' },
          { devanagari: 'मन्त्री',  iast: 'mantrī',   english: 'minister',      grammar: 'noun, nom. sg.' },
          { devanagari: 'शान्तिं',  iast: 'śāntiṃ',   english: 'peace',         grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'speaks of',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'A wise minister speaks of peace.', vocabIds: ['v-096','v-139','v-010'] },
      { id: 'ms24-5', words: [
          { devanagari: '"क्षमया"', iast: '"kṣamayā"',english: '"By forgiveness"',grammar: 'noun, inst. sg.' },
          { devanagari: 'राज्यं',   iast: 'rājyaṃ',  english: 'kingdom',       grammar: 'noun, nom. sg.' },
          { devanagari: 'सुखं',     iast: 'sukhaṃ',   english: 'happy',         grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'becomes',       grammar: 'verb, pres. 3sg.' },
        ], translation: '"By forgiveness the kingdom becomes happy."', vocabIds: ['v-137','v-118'] },
      { id: 'ms24-6', words: [
          { devanagari: 'राजा',    iast: 'rājā',     english: 'the king',      grammar: 'noun, nom. sg.' },
          { devanagari: 'शृणोति',  iast: 'śṛṇoti',   english: 'listens',       grammar: 'verb, pres. 3sg.' },
          { devanagari: 'क्रोधं',  iast: 'krodhaṃ',  english: 'anger',         grammar: 'noun, acc. sg.' },
          { devanagari: 'त्यजति',  iast: 'tyajati',  english: 'abandons',      grammar: 'verb, pres. 3sg.' },
        ], translation: 'The king listens and abandons anger.', vocabIds: ['v-084','v-138'] },
      { id: 'ms24-7', words: [
          { devanagari: 'क्रोधात्', iast: 'krodhāt',  english: 'from anger',    grammar: 'noun, abl. sg.' },
          { devanagari: 'दुःखं',    iast: 'duḥkhaṃ',  english: 'sorrow',        grammar: 'noun, nom. sg.' },
          { devanagari: 'शान्त्या',  iast: 'śāntyā',   english: 'from peace',   grammar: 'noun, inst. sg.' },
          { devanagari: 'सुखं',     iast: 'sukhaṃ',   english: 'happiness',     grammar: 'noun, nom. sg.' },
        ], translation: 'From anger comes sorrow; from peace comes happiness.', vocabIds: ['v-138','v-117','v-139','v-118'] },
    ],
  },

  // ── Moral Story 25 — The Kind Old Man ───────────────────────────────────
  {
    id: 'story-25', type: 'story', category: 'moral', level: 'beginner',
    title: 'दयालुः वृद्धः',
    titleEnglish: 'The Kind Old Man',
    description: 'An old man plants trees he will never sit under — selfless action is true virtue.',
    moral: 'Selfless service is the highest purpose of life. We live not only for ourselves, but for the good of those who come after us.',
    sentences: [
      { id: 'ms25-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'वृद्धः',  iast: 'vṛddhaḥ',  english: 'old man',       grammar: 'noun, nom. sg.' },
          { devanagari: 'ग्रामे',  iast: 'grāme',    english: 'in the village',grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',    iast: 'vasati',   english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'An old man lives in the village.', vocabIds: ['v-120','v-017'] },
      { id: 'ms25-2', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'प्रतिदिनं',iast: 'pratidinaṃ',english: 'every day',   grammar: 'adverb' },
          { devanagari: 'वृक्षान्',iast: 'vṛkṣān',   english: 'trees',         grammar: 'noun, acc. pl.' },
          { devanagari: 'रोपयति',  iast: 'ropayati', english: 'plants',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'He plants trees every day.', vocabIds: ['v-013','v-039'] },
      { id: 'ms25-3', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'बालकः',   iast: 'bālakaḥ',  english: 'boy',           grammar: 'noun, nom. sg.' },
          { devanagari: 'तं',      iast: 'taṃ',      english: 'him',           grammar: 'pronoun, acc. sg.' },
          { devanagari: 'पृच्छति', iast: 'pṛcchati', english: 'asks',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A boy asks him.', vocabIds: ['v-121'] },
      { id: 'ms25-4', words: [
          { devanagari: '"किमर्थं', iast: '"kimarthaṃ',english: '"Why',         grammar: 'pronoun, acc. sg.' },
          { devanagari: 'वृक्षान्',iast: 'vṛkṣān',   english: 'trees',         grammar: 'noun, acc. pl.' },
          { devanagari: 'रोपयसि?"',iast: 'ropayasi?"',english: 'do you plant?"',grammar: 'verb, pres. 2sg.' },
        ], translation: '"Why do you plant trees?"', vocabIds: ['v-039'] },
      { id: 'ms25-5', words: [
          { devanagari: 'वृद्धः',  iast: 'vṛddhaḥ',  english: 'the old man',   grammar: 'noun, nom. sg.' },
          { devanagari: 'वदति',    iast: 'vadati',   english: 'says',          grammar: 'verb, pres. 3sg.' },
          { devanagari: '"परोपकाराय"',iast: '"paropakārāya"',english: '"For helping others"',grammar: 'noun, dat. sg.' },
        ], translation: 'The old man says "For helping others."', vocabIds: ['v-120','v-010','v-119'] },
      { id: 'ms25-6', words: [
          { devanagari: 'परिश्रमः',iast: 'pariśramaḥ',english: 'hard work',    grammar: 'noun, nom. sg.' },
          { devanagari: 'परोपकारः',iast: 'paropakāraḥ',english: 'helping others',grammar: 'noun, nom. sg.' },
          { devanagari: 'च',       iast: 'ca',       english: 'and',           grammar: 'particle' },
          { devanagari: 'जीवनस्य', iast: 'jīvanasya',english: 'of life',       grammar: 'noun, gen. sg.' },
          { devanagari: 'सारः',    iast: 'sāraḥ',    english: 'essence',       grammar: 'noun, nom. sg.' },
        ], translation: 'Hard work and helping others are the essence of life.', vocabIds: ['v-134','v-119'] },
    ],
  },

  // ── Moral Story 26 — The River and the Boy ──────────────────────────────
  {
    id: 'story-26', type: 'story', category: 'moral', level: 'beginner',
    title: 'नदी बालकश्च',
    titleEnglish: 'The River and the Boy',
    description: 'A boy falls into a river but is saved by a stranger — one good deed returns tenfold.',
    moral: 'A single good deed can save a life. When we act with courage and compassion for others, goodness multiplies and the world is made better.',
    sentences: [
      { id: 'ms26-1', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'बालकः',   iast: 'bālakaḥ',  english: 'boy',           grammar: 'noun, nom. sg.' },
          { devanagari: 'नदीतटे',  iast: 'nadītaṭe', english: 'on the river bank',grammar: 'noun, loc. sg.' },
          { devanagari: 'क्रीडति', iast: 'krīḍati',  english: 'plays',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'A boy plays on the river bank.', vocabIds: ['v-121','v-123'] },
      { id: 'ms26-2', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'नद्यां',  iast: 'nadyāṃ',   english: 'into the river',grammar: 'noun, loc. sg.' },
          { devanagari: 'पतति',    iast: 'patati',   english: 'falls',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'He falls into the river.', vocabIds: ['v-013','v-123','v-125'] },
      { id: 'ms26-3', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'सहायः',   iast: 'sahāyaḥ',  english: 'helper',        grammar: 'noun, nom. sg.' },
          { devanagari: 'तं',      iast: 'taṃ',      english: 'him',           grammar: 'pronoun, acc. sg.' },
          { devanagari: 'पश्यति',  iast: 'paśyati',  english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A helper sees him.', vocabIds: ['v-122','v-009'] },
      { id: 'ms26-4', words: [
          { devanagari: 'सः',      iast: 'saḥ',      english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'नदीं',    iast: 'nadīṃ',    english: 'the river',     grammar: 'noun, acc. sg.' },
          { devanagari: 'तरति',    iast: 'tarati',   english: 'crosses / swims',grammar: 'verb, pres. 3sg.' },
          { devanagari: 'बालकं',   iast: 'bālakaṃ',  english: 'the boy',       grammar: 'noun, acc. sg.' },
          { devanagari: 'रक्षति',  iast: 'rakṣati',  english: 'saves',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'He swims and saves the boy.', vocabIds: ['v-123','v-124','v-121','v-127'] },
      { id: 'ms26-5', words: [
          { devanagari: 'बालकः',   iast: 'bālakaḥ',  english: 'the boy',       grammar: 'noun, nom. sg.' },
          { devanagari: 'उत्तिष्ठति',iast: 'uttiṣṭhati',english: 'rises up',   grammar: 'verb, pres. 3sg.' },
          { devanagari: 'सुखी',    iast: 'sukhī',    english: 'happy',         grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'becomes',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'The boy rises and becomes happy.', vocabIds: ['v-121','v-126','v-118'] },
      { id: 'ms26-6', words: [
          { devanagari: 'सत्कार्यं',iast: 'satkāryaṃ',english: 'good deed',    grammar: 'noun, nom. sg.' },
          { devanagari: 'सत्कार्येण',iast: 'satkāryeṇa',english: 'by good deed',grammar: 'noun, inst. sg.' },
          { devanagari: 'फलति',    iast: 'phalati',  english: 'bears fruit',   grammar: 'verb, pres. 3sg.' },
        ], translation: 'A good deed bears fruit through good deeds.', vocabIds: ['v-133','v-135'] },
    ],
  },

  // ── Moral Story 27 — Hard Work Bears Fruit ──────────────────────────────
  {
    id: 'story-27', type: 'story', category: 'moral', level: 'intermediate',
    title: 'परिश्रमस्य फलम्',
    titleEnglish: 'The Fruit of Hard Work',
    description: 'A lazy and a diligent student take the same exam — effort always bears fruit.',
    moral: 'Effort is never wasted. The fruit of hard work is always sweet, while laziness brings only regret. Success belongs to those who persist.',
    sentences: [
      { id: 'ms27-1', words: [
          { devanagari: 'द्वौ',     iast: 'dvau',     english: 'two',           grammar: 'numeral, nom. pl.' },
          { devanagari: 'शिष्यौ',  iast: 'śiṣyau',   english: 'students',      grammar: 'noun, nom. du.' },
          { devanagari: 'गुरुकुले', iast: 'gurukule', english: 'at gurukul',    grammar: 'noun, loc. sg.' },
          { devanagari: 'सन्ति',    iast: 'santi',    english: 'are',           grammar: 'verb, pres. 3pl.' },
        ], translation: 'Two students are at the gurukul.', vocabIds: ['v-020'] },
      { id: 'ms27-2', words: [
          { devanagari: 'एकः',     iast: 'ekaḥ',     english: 'one',           grammar: 'numeral, nom. sg.' },
          { devanagari: 'परिश्रमेण',iast: 'pariśrameṇa',english: 'with effort',grammar: 'noun, inst. sg.' },
          { devanagari: 'पठति',    iast: 'paṭhati',  english: 'studies',       grammar: 'verb, pres. 3sg.' },
        ], translation: 'One studies with effort.', vocabIds: ['v-134','v-047'] },
      { id: 'ms27-3', words: [
          { devanagari: 'अपरः',    iast: 'aparaḥ',   english: 'the other',     grammar: 'adj, nom. sg.' },
          { devanagari: 'आलस्येन', iast: 'ālasyena', english: 'with laziness', grammar: 'noun, inst. sg.' },
          { devanagari: 'स्वपिति', iast: 'svapiti',  english: 'sleeps',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The other sleeps lazily.', vocabIds: [] },
      { id: 'ms27-4', words: [
          { devanagari: 'परीक्षायां',iast: 'parīkṣāyāṃ',english: 'in the exam',grammar: 'noun, loc. sg.' },
          { devanagari: 'परिश्रमी', iast: 'pariśramī',english: 'the hard worker',grammar: 'adj, nom. sg.' },
          { devanagari: 'जयति',    iast: 'jayati',   english: 'wins',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hard worker wins in the exam.', vocabIds: ['v-134','v-106'] },
      { id: 'ms27-5', words: [
          { devanagari: 'आलसी',    iast: 'ālasī',    english: 'the lazy one',  grammar: 'adj, nom. sg.' },
          { devanagari: 'दुःखं',   iast: 'duḥkhaṃ',  english: 'sorrow',        grammar: 'noun, acc. sg.' },
          { devanagari: 'अनुभवति',iast: 'anubhavati',english: 'experiences',   grammar: 'verb, pres. 3sg.' },
        ], translation: 'The lazy one experiences sorrow.', vocabIds: ['v-117'] },
      { id: 'ms27-6', words: [
          { devanagari: 'परिश्रमस्य',iast: 'pariśramasya',english: 'of hard work',grammar: 'noun, gen. sg.' },
          { devanagari: 'फलं',     iast: 'phalaṃ',   english: 'result',        grammar: 'noun, nom. sg.' },
          { devanagari: 'मधुरं',   iast: 'madhuraṃ', english: 'sweet',         grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',    iast: 'bhavati',  english: 'is',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'The result of hard work is sweet.', vocabIds: ['v-134','v-135','v-131'] },
    ],
  },

  // ── Panchatantra Story 28 — The Monkey and the Crocodile ─────────────────
  {
    id: 'story-28', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'मर्कटः ग्राहश्च',
    titleEnglish: 'The Monkey and the Crocodile',
    description: 'A crocodile befriends a monkey to steal his heart for his wife — but wit saves the day.',
    moral: 'Keep your wits about you even among friends. True friendship is built on trust, not deceit; and a quick mind is the greatest shield against betrayal.',
    sentences: [
      { id: 'pt28-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'मर्कटः',   iast: 'markaṭaḥ',  english: 'monkey',         grammar: 'noun, nom. sg.' },
          { devanagari: 'नदीतटे',   iast: 'nadītaṭe',  english: 'on the riverbank', grammar: 'noun, loc. sg.' },
          { devanagari: 'वृक्षे',   iast: 'vṛkṣe',     english: 'on a tree',      grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A monkey lives on a tree by the riverbank.', vocabIds: ['v-141','v-123','v-039'] },
      { id: 'pt28-2', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'ग्राहः',   iast: 'grāhaḥ',    english: 'crocodile',      grammar: 'noun, nom. sg.' },
          { devanagari: 'तस्य',     iast: 'tasya',     english: 'his',            grammar: 'pronoun, gen. sg.' },
          { devanagari: 'मित्रं',   iast: 'mitraṃ',    english: 'friend',         grammar: 'noun, acc. sg.' },
          { devanagari: 'भवति',     iast: 'bhavati',   english: 'becomes',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'A crocodile becomes his friend.', vocabIds: ['v-142','v-148'] },
      { id: 'pt28-3', words: [
          { devanagari: 'ग्राहस्य', iast: 'grāhasya',  english: "the crocodile's", grammar: 'noun, gen. sg.' },
          { devanagari: 'भार्या',   iast: 'bhāryā',    english: 'wife',           grammar: 'noun, nom. sg.' },
          { devanagari: 'मर्कटस्य',iast: 'markaṭasya', english: "the monkey's",  grammar: 'noun, gen. sg.' },
          { devanagari: 'हृदयं',    iast: 'hṛdayaṃ',   english: 'heart',          grammar: 'noun, acc. sg.' },
          { devanagari: 'इच्छति',  iast: 'icchati',   english: 'desires',        grammar: 'verb, pres. 3sg.' },
        ], translation: "The crocodile's wife desires the monkey's heart.", vocabIds: ['v-142','v-151','v-141','v-152'] },
      { id: 'pt28-4', words: [
          { devanagari: 'ग्राहः',   iast: 'grāhaḥ',    english: 'the crocodile',  grammar: 'noun, nom. sg.' },
          { devanagari: 'मर्कटं',   iast: 'markaṭaṃ',  english: 'the monkey',     grammar: 'noun, acc. sg.' },
          { devanagari: 'नद्याः',   iast: 'nadyāḥ',    english: 'of the river',   grammar: 'noun, gen. sg.' },
          { devanagari: 'पारं',     iast: 'pāraṃ',     english: 'to the other side', grammar: 'noun, acc. sg.' },
          { devanagari: 'नयति',     iast: 'nayati',    english: 'leads / carries', grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crocodile carries the monkey across the river.', vocabIds: ['v-142','v-141','v-123'] },
      { id: 'pt28-5', words: [
          { devanagari: 'जले',      iast: 'jale',      english: 'in the water',   grammar: 'noun, loc. sg.' },
          { devanagari: 'ग्राहः',   iast: 'grāhaḥ',    english: 'the crocodile',  grammar: 'noun, nom. sg.' },
          { devanagari: 'सत्यं',    iast: 'satyaṃ',    english: 'the truth',      grammar: 'noun, acc. sg.' },
          { devanagari: 'वदति',     iast: 'vadati',    english: 'tells',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'In the water the crocodile tells the truth.', vocabIds: ['v-142','v-129','v-010'] },
      { id: 'pt28-6', words: [
          { devanagari: 'मर्कटः',   iast: 'markaṭaḥ',  english: 'the monkey',     grammar: 'noun, nom. sg.' },
          { devanagari: 'चतुरः',    iast: 'caturaḥ',   english: 'clever',         grammar: 'adj, nom. sg.' },
          { devanagari: 'अस्ति',    iast: 'asti',      english: 'is',             grammar: 'verb, pres. 3sg.' },
        ], translation: 'The monkey is clever.', vocabIds: ['v-141','v-150','v-028'] },
      { id: 'pt28-7', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'वदति',     iast: 'vadati',    english: 'says',           grammar: 'verb, pres. 3sg.' },
          { devanagari: '"मम',      iast: '"mama',     english: '"my',            grammar: 'pronoun, gen. sg.' },
          { devanagari: 'हृदयं',    iast: 'hṛdayaṃ',   english: 'heart',          grammar: 'noun, nom. sg.' },
          { devanagari: 'वृक्षे',   iast: 'vṛkṣe',     english: 'on the tree',    grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति"',   iast: 'asti"',     english: 'is"',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'He says "My heart is on the tree."', vocabIds: ['v-152','v-039','v-028'] },
      { id: 'pt28-8', words: [
          { devanagari: 'ग्राहः',   iast: 'grāhaḥ',    english: 'the crocodile',  grammar: 'noun, nom. sg.' },
          { devanagari: 'वृक्षं',   iast: 'vṛkṣaṃ',    english: 'to the tree',    grammar: 'noun, acc. sg.' },
          { devanagari: 'प्रति',    iast: 'prati',     english: 'towards',        grammar: 'postposition' },
          { devanagari: 'गच्छति',   iast: 'gacchati',  english: 'goes',           grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crocodile goes back towards the tree.', vocabIds: ['v-142','v-039','v-002'] },
      { id: 'pt28-9', words: [
          { devanagari: 'मर्कटः',   iast: 'markaṭaḥ',  english: 'the monkey',     grammar: 'noun, nom. sg.' },
          { devanagari: 'वृक्षे',   iast: 'vṛkṣe',     english: 'onto the tree',  grammar: 'noun, loc. sg.' },
          { devanagari: 'उत्तिष्ठति',iast: 'uttiṣṭhati',english: 'leaps up',      grammar: 'verb, pres. 3sg.' },
          { devanagari: 'सुरक्षितः',iast: 'surakṣitaḥ',english: 'safe',          grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',     iast: 'bhavati',   english: 'becomes',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The monkey leaps onto the tree and becomes safe.', vocabIds: ['v-141','v-039','v-126','v-127'] },
      { id: 'pt28-10', words: [
          { devanagari: 'चतुरः',    iast: 'caturaḥ',   english: 'the clever one', grammar: 'adj, nom. sg.' },
          { devanagari: 'शत्रोः',   iast: 'śatroḥ',    english: "from the enemy's", grammar: 'noun, gen. sg.' },
          { devanagari: 'जालात्',   iast: 'jālāt',     english: 'from the snare', grammar: 'noun, abl. sg.' },
          { devanagari: 'मुच्यते',  iast: 'mucyate',   english: 'is freed',       grammar: 'verb, pres. pass. 3sg.' },
        ], translation: 'The clever one is freed from the enemy\'s snare.', vocabIds: ['v-150','v-149','v-100'] },
    ],
  },

  // ── Panchatantra Story 29 — The Blue Jackal ───────────────────────────────
  {
    id: 'story-29', type: 'story', category: 'panchatantra', level: 'beginner',
    title: 'नीलः श्रृगालः',
    titleEnglish: 'The Blue Jackal',
    description: 'A jackal falls into a dye-vat and turns blue — he fools every animal until his true nature gives him away.',
    moral: 'Deceit may fool others for a time, but one\'s true nature cannot be hidden forever. False pretence always collapses under its own weight.',
    sentences: [
      { id: 'pt29-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'jackal',         grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',      iast: 'vane',      english: 'in the forest',  grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A jackal lives in the forest.', vocabIds: ['v-143','v-006'] },
      { id: 'pt29-2', words: [
          { devanagari: 'एकदा',     iast: 'ekadā',     english: 'one day',        grammar: 'adverb' },
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'नगरे',     iast: 'nagare',    english: 'in the town',    grammar: 'noun, loc. sg.' },
          { devanagari: 'रञ्जनपात्रे', iast: 'rañjanapātre', english: 'into a dye-vat', grammar: 'noun, loc. sg.' },
          { devanagari: 'पतति',     iast: 'patati',    english: 'falls',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'One day he falls into a dye-vat in the town.', vocabIds: ['v-143','v-154','v-125'] },
      { id: 'pt29-3', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'नीलः',     iast: 'nīlaḥ',     english: 'blue',           grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',     iast: 'bhavati',   english: 'becomes',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'He becomes blue.', vocabIds: ['v-143','v-154'] },
      { id: 'pt29-4', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'वनं',      iast: 'vanaṃ',     english: 'to the forest',  grammar: 'noun, acc. sg.' },
          { devanagari: 'प्रति',    iast: 'prati',     english: 'towards',        grammar: 'postposition' },
          { devanagari: 'गच्छति',   iast: 'gacchati',  english: 'goes',           grammar: 'verb, pres. 3sg.' },
        ], translation: 'He goes back to the forest.', vocabIds: ['v-006','v-002'] },
      { id: 'pt29-5', words: [
          { devanagari: 'सर्वे',    iast: 'sarve',     english: 'all',            grammar: 'adj, nom. pl.' },
          { devanagari: 'पशवः',     iast: 'paśavaḥ',   english: 'animals',        grammar: 'noun, nom. pl.' },
          { devanagari: 'तं',       iast: 'taṃ',       english: 'him',            grammar: 'pronoun, acc. sg.' },
          { devanagari: 'न',        iast: 'na',        english: 'not',            grammar: 'particle' },
          { devanagari: 'जानन्ति',  iast: 'jānanti',   english: 'recognise',      grammar: 'verb, pres. 3pl.' },
        ], translation: 'All the animals do not recognise him.', vocabIds: ['v-153','v-036'] },
      { id: 'pt29-6', words: [
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'the jackal',     grammar: 'noun, nom. sg.' },
          { devanagari: 'वदति',     iast: 'vadati',    english: 'says',           grammar: 'verb, pres. 3sg.' },
          { devanagari: '"अहं',     iast: '"ahaṃ',     english: '"I',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'देवः',     iast: 'devaḥ',     english: 'god / divine',   grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्मि"',   iast: 'asmi"',     english: 'am"',            grammar: 'verb, pres. 1sg.' },
        ], translation: 'The jackal says "I am a god."', vocabIds: ['v-143','v-010','v-028'] },
      { id: 'pt29-7', words: [
          { devanagari: 'पशवः',     iast: 'paśavaḥ',   english: 'the animals',    grammar: 'noun, nom. pl.' },
          { devanagari: 'तस्मै',    iast: 'tasmai',    english: 'to him',         grammar: 'pronoun, dat. sg.' },
          { devanagari: 'नमन्ति',   iast: 'namanti',   english: 'bow',            grammar: 'verb, pres. 3pl.' },
        ], translation: 'The animals bow to him.', vocabIds: ['v-153'] },
      { id: 'pt29-8', words: [
          { devanagari: 'एकदा',     iast: 'ekadā',     english: 'one day',        grammar: 'adverb' },
          { devanagari: 'अन्ये',    iast: 'anye',      english: 'other',          grammar: 'adj, nom. pl.' },
          { devanagari: 'श्रृगालाः',iast: 'śṛgālāḥ',  english: 'jackals',        grammar: 'noun, nom. pl.' },
          { devanagari: 'उच्चैः',   iast: 'uccaiḥ',    english: 'loudly',         grammar: 'adverb' },
          { devanagari: 'रोदन्ति',  iast: 'rodanti',   english: 'howl',           grammar: 'verb, pres. 3pl.' },
        ], translation: 'One day other jackals howl loudly.', vocabIds: ['v-143','v-094'] },
      { id: 'pt29-9', words: [
          { devanagari: 'नीलः',     iast: 'nīlaḥ',     english: 'the blue one',   grammar: 'adj, nom. sg.' },
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'jackal',         grammar: 'noun, nom. sg.' },
          { devanagari: 'अपि',      iast: 'api',       english: 'also',           grammar: 'particle' },
          { devanagari: 'उच्चैः',   iast: 'uccaiḥ',    english: 'loudly',         grammar: 'adverb' },
          { devanagari: 'रोदति',    iast: 'rodati',    english: 'howls',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The blue jackal also howls loudly.', vocabIds: ['v-143','v-094'] },
      { id: 'pt29-10', words: [
          { devanagari: 'सर्वे',    iast: 'sarve',     english: 'all',            grammar: 'adj, nom. pl.' },
          { devanagari: 'पशवः',     iast: 'paśavaḥ',   english: 'animals',        grammar: 'noun, nom. pl.' },
          { devanagari: 'जानन्ति',  iast: 'jānanti',   english: 'recognise',      grammar: 'verb, pres. 3pl.' },
          { devanagari: 'असत्यं',   iast: 'asatyaṃ',   english: 'falsehood',      grammar: 'noun, nom. sg.' },
          { devanagari: 'प्रकाशते',iast: 'prakāśate', english: 'comes to light',  grammar: 'verb, pres. 3sg.' },
        ], translation: 'All animals recognise him — falsehood always comes to light.', vocabIds: ['v-153','v-130'] },
    ],
  },

  // ── Panchatantra Story 30 — The Clever Hare and the Lion ─────────────────
  {
    id: 'story-30', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'शशकः सिंहश्च',
    titleEnglish: 'The Clever Hare and the Lion',
    description: 'A clever hare tricks a cruel lion into fighting his own reflection in a well — freeing all the animals.',
    moral: 'Intelligence conquers brute force. A single clever act done with courage can free many from the tyranny of the powerful.',
    sentences: [
      { id: 'pt30-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'क्रूरः',   iast: 'krūraḥ',    english: 'cruel',          grammar: 'adj, nom. sg.' },
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'lion',           grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',      iast: 'vane',      english: 'in the forest',  grammar: 'noun, loc. sg.' },
          { devanagari: 'सर्वान्',  iast: 'sarvān',    english: 'all',            grammar: 'adj, acc. pl.' },
          { devanagari: 'पशून्',    iast: 'paśūn',     english: 'animals',        grammar: 'noun, acc. pl.' },
          { devanagari: 'हन्ति',    iast: 'hanti',     english: 'kills',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A cruel lion kills all the animals in the forest.', vocabIds: ['v-098','v-006','v-153'] },
      { id: 'pt30-2', words: [
          { devanagari: 'पशवः',     iast: 'paśavaḥ',   english: 'the animals',    grammar: 'noun, nom. pl.' },
          { devanagari: 'सिंहाय',   iast: 'siṃhāya',   english: 'to the lion',    grammar: 'noun, dat. sg.' },
          { devanagari: 'प्रतिदिनं',iast: 'pratidinaṃ',english: 'every day',      grammar: 'adverb' },
          { devanagari: 'एकं',      iast: 'ekaṃ',      english: 'one',            grammar: 'numeral, acc. sg.' },
          { devanagari: 'पशुं',     iast: 'paśuṃ',     english: 'animal',         grammar: 'noun, acc. sg.' },
          { devanagari: 'प्रेषयन्ति',iast: 'preṣayanti',english: 'send',         grammar: 'verb, pres. 3pl.' },
        ], translation: 'The animals send one animal to the lion every day.', vocabIds: ['v-153','v-098'] },
      { id: 'pt30-3', words: [
          { devanagari: 'एकदा',     iast: 'ekadā',     english: 'one day',        grammar: 'adverb' },
          { devanagari: 'एकस्य',    iast: 'ekasya',    english: 'of a',           grammar: 'numeral, gen. sg.' },
          { devanagari: 'चतुरस्य', iast: 'caturasya',  english: 'clever',         grammar: 'adj, gen. sg.' },
          { devanagari: 'शशकस्य',  iast: 'śaśakasya',  english: "hare's",        grammar: 'noun, gen. sg.' },
          { devanagari: 'पालः',     iast: 'pālaḥ',     english: 'turn',           grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',    iast: 'asti',      english: 'is',             grammar: 'verb, pres. 3sg.' },
        ], translation: "One day it is a clever hare's turn.", vocabIds: ['v-144','v-150'] },
      { id: 'pt30-4', words: [
          { devanagari: 'शशकः',     iast: 'śaśakaḥ',   english: 'the hare',       grammar: 'noun, nom. sg.' },
          { devanagari: 'विलम्बेन', iast: 'vilambena',  english: 'with delay',     grammar: 'noun, inst. sg.' },
          { devanagari: 'सिंहस्य',  iast: 'siṃhasya',   english: "the lion's",    grammar: 'noun, gen. sg.' },
          { devanagari: 'समीपं',    iast: 'samīpaṃ',    english: 'near / to',      grammar: 'adverb' },
          { devanagari: 'गच्छति',   iast: 'gacchati',  english: 'goes',           grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hare goes to the lion deliberately late.', vocabIds: ['v-144','v-160','v-098','v-002'] },
      { id: 'pt30-5', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'क्रुद्धः', iast: 'kruddhaḥ',  english: 'angry',          grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',     iast: 'bhavati',   english: 'becomes',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The lion becomes angry.', vocabIds: ['v-098','v-138'] },
      { id: 'pt30-6', words: [
          { devanagari: 'शशकः',     iast: 'śaśakaḥ',   english: 'the hare',       grammar: 'noun, nom. sg.' },
          { devanagari: 'वदति',     iast: 'vadati',    english: 'says',           grammar: 'verb, pres. 3sg.' },
          { devanagari: '"अपरः',    iast: '"aparaḥ',   english: '"another',       grammar: 'adj, nom. sg.' },
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'lion',           grammar: 'noun, nom. sg.' },
          { devanagari: 'कूपे',     iast: 'kūpe',      english: 'in the well',    grammar: 'noun, loc. sg.' },
          { devanagari: 'अस्ति"',   iast: 'asti"',     english: 'is"',            grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hare says "Another lion is in the well."', vocabIds: ['v-144','v-098','v-145'] },
      { id: 'pt30-7', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'कूपं',     iast: 'kūpaṃ',     english: 'the well',       grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',   iast: 'paśyati',   english: 'looks into',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'The lion looks into the well.', vocabIds: ['v-098','v-145','v-009'] },
      { id: 'pt30-8', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'स्वस्य',   iast: 'svasya',    english: 'his own',        grammar: 'pronoun, gen. sg.' },
          { devanagari: 'प्रतिबिम्बं',iast: 'pratibimbaṃ', english: 'reflection', grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',   iast: 'paśyati',   english: 'sees',           grammar: 'verb, pres. 3sg.' },
        ], translation: 'He sees his own reflection.', vocabIds: ['v-098','v-146','v-009'] },
      { id: 'pt30-9', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'क्रुद्धः', iast: 'kruddhaḥ',  english: 'enraged',        grammar: 'adj, nom. sg.' },
          { devanagari: 'कूपे',     iast: 'kūpe',      english: 'into the well',  grammar: 'noun, loc. sg.' },
          { devanagari: 'पतति',     iast: 'patati',    english: 'falls',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Enraged, the lion falls into the well.', vocabIds: ['v-098','v-145','v-125'] },
      { id: 'pt30-10', words: [
          { devanagari: 'शशकः',     iast: 'śaśakaḥ',   english: 'the hare',       grammar: 'noun, nom. sg.' },
          { devanagari: 'सर्वान्',  iast: 'sarvān',    english: 'all',            grammar: 'adj, acc. pl.' },
          { devanagari: 'पशून्',    iast: 'paśūn',     english: 'animals',        grammar: 'noun, acc. pl.' },
          { devanagari: 'रक्षति',   iast: 'rakṣati',   english: 'saves',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The hare saves all the animals.', vocabIds: ['v-144','v-153','v-127'] },
    ],
  },

  // ── Panchatantra Story 31 — The Crow and the Serpent ─────────────────────
  {
    id: 'story-31', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'काकः सर्पश्च',
    titleEnglish: 'The Crow and the Serpent',
    description: 'A serpent devours a crow\'s eggs every season — a clever plan using a stolen jewel finally destroys the enemy.',
    moral: 'When strength is no match for an enemy, use wisdom and strategy. A well-laid plan, even by the weak, can overcome the mightiest foe.',
    sentences: [
      { id: 'pt31-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'crow',           grammar: 'noun, nom. sg.' },
          { devanagari: 'वृक्षे',   iast: 'vṛkṣe',     english: 'on a tree',      grammar: 'noun, loc. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A crow lives on a tree.', vocabIds: ['v-089','v-039'] },
      { id: 'pt31-2', words: [
          { devanagari: 'तस्य',     iast: 'tasya',     english: 'its',            grammar: 'pronoun, gen. sg.' },
          { devanagari: 'वृक्षस्य',iast: 'vṛkṣasya',  english: "the tree's",     grammar: 'noun, gen. sg.' },
          { devanagari: 'मूले',     iast: 'mūle',      english: 'at the root',    grammar: 'noun, loc. sg.' },
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'सर्पः',    iast: 'sarpaḥ',    english: 'serpent',        grammar: 'noun, nom. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A serpent lives at the root of the tree.', vocabIds: ['v-039','v-147'] },
      { id: 'pt31-3', words: [
          { devanagari: 'सर्पः',    iast: 'sarpaḥ',    english: 'the serpent',    grammar: 'noun, nom. sg.' },
          { devanagari: 'काकस्य',   iast: 'kākasya',   english: "the crow's",     grammar: 'noun, gen. sg.' },
          { devanagari: 'अण्डानि',  iast: 'aṇḍāni',    english: 'eggs',           grammar: 'noun, acc. pl.' },
          { devanagari: 'खादति',    iast: 'khādati',   english: 'eats / devours', grammar: 'verb, pres. 3sg.' },
        ], translation: 'The serpent devours the crow\'s eggs.', vocabIds: ['v-089','v-147'] },
      { id: 'pt31-4', words: [
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'the crow',       grammar: 'noun, nom. sg.' },
          { devanagari: 'दुःखितः', iast: 'duḥkhitaḥ', english: 'sorrowful',      grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',     iast: 'bhavati',   english: 'becomes',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crow becomes sorrowful.', vocabIds: ['v-089','v-117'] },
      { id: 'pt31-5', words: [
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'the crow',       grammar: 'noun, nom. sg.' },
          { devanagari: 'एकं',      iast: 'ekaṃ',      english: 'a / one',        grammar: 'numeral, acc. sg.' },
          { devanagari: 'राज्ञः',   iast: 'rājñaḥ',    english: "the king's",     grammar: 'noun, gen. sg.' },
          { devanagari: 'आभूषणं',  iast: 'ābhūṣaṇaṃ', english: 'jewel',          grammar: 'noun, acc. sg.' },
          { devanagari: 'नयति',     iast: 'nayati',    english: 'carries off',    grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crow carries off a jewel belonging to the king.', vocabIds: ['v-089','v-155'] },
      { id: 'pt31-6', words: [
          { devanagari: 'राज्ञः',   iast: 'rājñaḥ',    english: "the king's",     grammar: 'noun, gen. sg.' },
          { devanagari: 'भृत्याः',  iast: 'bhṛtyāḥ',   english: 'servants',       grammar: 'noun, nom. pl.' },
          { devanagari: 'आभूषणम्', iast: 'ābhūṣaṇam',  english: 'the jewel',      grammar: 'noun, acc. sg.' },
          { devanagari: 'अन्विष्यन्ति',iast: 'anviṣyanti',english: 'search for',  grammar: 'verb, pres. 3pl.' },
        ], translation: 'The king\'s servants search for the jewel.', vocabIds: ['v-155'] },
      { id: 'pt31-7', words: [
          { devanagari: 'ते',       iast: 'te',        english: 'they',           grammar: 'pronoun, nom. pl.' },
          { devanagari: 'सर्पस्य',  iast: 'sarpassya',  english: "the serpent's", grammar: 'noun, gen. sg.' },
          { devanagari: 'बिलं',     iast: 'bilaṃ',     english: 'burrow / hole',  grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यन्ति', iast: 'paśyanti',  english: 'find / see',     grammar: 'verb, pres. 3pl.' },
        ], translation: 'They find the serpent\'s burrow.', vocabIds: ['v-147','v-156','v-009'] },
      { id: 'pt31-8', words: [
          { devanagari: 'ते',       iast: 'te',        english: 'they',           grammar: 'pronoun, nom. pl.' },
          { devanagari: 'सर्पं',    iast: 'sarpaṃ',    english: 'the serpent',    grammar: 'noun, acc. sg.' },
          { devanagari: 'मारयन्ति', iast: 'mārayanti', english: 'kill',           grammar: 'verb, pres. 3pl.' },
        ], translation: 'They kill the serpent.', vocabIds: ['v-147'] },
      { id: 'pt31-9', words: [
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'the crow',       grammar: 'noun, nom. sg.' },
          { devanagari: 'सुखेन',    iast: 'sukhena',   english: 'happily',        grammar: 'noun, inst. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The crow lives happily.', vocabIds: ['v-089','v-118'] },
      { id: 'pt31-10', words: [
          { devanagari: 'बुद्धिः',  iast: 'buddhiḥ',   english: 'intelligence',   grammar: 'noun, nom. sg.' },
          { devanagari: 'शत्रुं',   iast: 'śatruṃ',    english: 'the enemy',      grammar: 'noun, acc. sg.' },
          { devanagari: 'जयति',     iast: 'jayati',    english: 'defeats',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'Intelligence defeats the enemy.', vocabIds: ['v-096','v-149','v-106'] },
    ],
  },

  // ── Panchatantra Story 32 — The Brahmin and the Ungrateful Lion ───────────
  {
    id: 'story-32', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'ब्राह्मणः सिंहश्च',
    titleEnglish: 'The Brahmin and the Ungrateful Lion',
    description: 'A Brahmin frees a lion from a cage — the lion turns on him, but a clever jackal saves him by ruse.',
    moral: 'Not everyone repays kindness with kindness. A compassionate person must also be discerning — and help should be sought from the truly wise.',
    sentences: [
      { id: 'pt32-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'ब्राह्मणः',iast: 'brāhmaṇaḥ', english: 'brahmin',        grammar: 'noun, nom. sg.' },
          { devanagari: 'वने',      iast: 'vane',      english: 'in the forest',  grammar: 'noun, loc. sg.' },
          { devanagari: 'गच्छति',   iast: 'gacchati',  english: 'walks',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'A Brahmin walks in the forest.', vocabIds: ['v-006','v-002'] },
      { id: 'pt32-2', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',             grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पञ्जरे',   iast: 'pañjare',   english: 'in a cage',      grammar: 'noun, loc. sg.' },
          { devanagari: 'बद्धं',    iast: 'baddhaṃ',   english: 'trapped',        grammar: 'adj, acc. sg.' },
          { devanagari: 'सिंहं',    iast: 'siṃhaṃ',    english: 'a lion',         grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',   iast: 'paśyati',   english: 'sees',           grammar: 'verb, pres. 3sg.' },
        ], translation: 'He sees a lion trapped in a cage.', vocabIds: ['v-159','v-098','v-009'] },
      { id: 'pt32-3', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'वदति',     iast: 'vadati',    english: 'says',           grammar: 'verb, pres. 3sg.' },
          { devanagari: '"हे',      iast: '"he',       english: '"O',             grammar: 'interjection' },
          { devanagari: 'ब्राह्मण', iast: 'brāhmaṇa', english: 'Brahmin',        grammar: 'noun, voc. sg.' },
          { devanagari: 'मां',      iast: 'māṃ',       english: 'me',             grammar: 'pronoun, acc. sg.' },
          { devanagari: 'मुञ्च"',   iast: 'muñca"',    english: 'release"',       grammar: 'verb, impv. 2sg.' },
        ], translation: '"O Brahmin, release me."', vocabIds: ['v-098','v-101'] },
      { id: 'pt32-4', words: [
          { devanagari: 'ब्राह्मणः',iast: 'brāhmaṇaḥ', english: 'the Brahmin',    grammar: 'noun, nom. sg.' },
          { devanagari: 'दयालुः',   iast: 'dayāluḥ',   english: 'kind',           grammar: 'adj, nom. sg.' },
          { devanagari: 'पञ्जरं',   iast: 'pañjaraṃ',  english: 'the cage',       grammar: 'noun, acc. sg.' },
          { devanagari: 'उद्घाटयति',iast: 'udghāṭayati',english: 'opens',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The kind Brahmin opens the cage.', vocabIds: ['v-136','v-159'] },
      { id: 'pt32-5', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'मुक्तः',   iast: 'muktaḥ',    english: 'freed',          grammar: 'adj, nom. sg.' },
          { devanagari: 'ब्राह्मणं',iast: 'brāhmaṇaṃ', english: 'the Brahmin',    grammar: 'noun, acc. sg.' },
          { devanagari: 'खादितुम्', iast: 'khāditum',  english: 'to eat',         grammar: 'verb, inf.' },
          { devanagari: 'इच्छति',  iast: 'icchati',    english: 'desires',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'Freed, the lion wants to eat the Brahmin.', vocabIds: ['v-098','v-136'] },
      { id: 'pt32-6', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',        grammar: 'numeral, nom. sg.' },
          { devanagari: 'चतुरः',    iast: 'caturaḥ',   english: 'clever',         grammar: 'adj, nom. sg.' },
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'jackal',         grammar: 'noun, nom. sg.' },
          { devanagari: 'तत्र',     iast: 'tatra',     english: 'there',          grammar: 'adverb' },
          { devanagari: 'आगच्छति', iast: 'āgacchati',  english: 'arrives',        grammar: 'verb, pres. 3sg.' },
        ], translation: 'A clever jackal arrives there.', vocabIds: ['v-150','v-143','v-087'] },
      { id: 'pt32-7', words: [
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'the jackal',     grammar: 'noun, nom. sg.' },
          { devanagari: 'पृच्छति',  iast: 'pṛcchati',  english: 'asks',           grammar: 'verb, pres. 3sg.' },
          { devanagari: '"सिंहः',   iast: '"siṃhaḥ',   english: '"the lion',      grammar: 'noun, nom. sg.' },
          { devanagari: 'पञ्जरे',   iast: 'pañjare',   english: 'in the cage',    grammar: 'noun, loc. sg.' },
          { devanagari: 'कथं',      iast: 'kathaṃ',    english: 'how',            grammar: 'adverb' },
          { devanagari: 'आसीत्?"', iast: 'āsīt?"',    english: 'was?"',          grammar: 'verb, imperf. 3sg.' },
        ], translation: '"How was the lion in the cage?"', vocabIds: ['v-143','v-098','v-159'] },
      { id: 'pt32-8', words: [
          { devanagari: 'सिंहः',    iast: 'siṃhaḥ',    english: 'the lion',       grammar: 'noun, nom. sg.' },
          { devanagari: 'दर्शयन्',  iast: 'darśayan',  english: 'showing',        grammar: 'verb, part.' },
          { devanagari: 'पञ्जरे',   iast: 'pañjare',   english: 'into the cage',  grammar: 'noun, loc. sg.' },
          { devanagari: 'प्रविशति', iast: 'praviśati', english: 'enters',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'Demonstrating, the lion enters the cage.', vocabIds: ['v-098','v-159'] },
      { id: 'pt32-9', words: [
          { devanagari: 'श्रृगालः', iast: 'śṛgālaḥ',  english: 'the jackal',     grammar: 'noun, nom. sg.' },
          { devanagari: 'पञ्जरं',   iast: 'pañjaraṃ',  english: 'the cage',       grammar: 'noun, acc. sg.' },
          { devanagari: 'बन्दति',   iast: 'bandati',   english: 'locks shut',     grammar: 'verb, pres. 3sg.' },
        ], translation: 'The jackal locks the cage shut.', vocabIds: ['v-143','v-159'] },
      { id: 'pt32-10', words: [
          { devanagari: 'उपकारस्य',iast: 'upakārasya', english: 'of a good deed', grammar: 'noun, gen. sg.' },
          { devanagari: 'अपकारः',  iast: 'apakāraḥ',  english: 'ingratitude',    grammar: 'noun, nom. sg.' },
          { devanagari: 'महत्',     iast: 'mahat',     english: 'great',          grammar: 'adj, nom. sg. n.' },
          { devanagari: 'पापम्',    iast: 'pāpam',     english: 'sin',            grammar: 'noun, nom. sg.' },
          { devanagari: 'अस्ति',    iast: 'asti',      english: 'is',             grammar: 'verb, pres. 3sg.' },
        ], translation: 'Repaying a good deed with harm is the greatest sin.', vocabIds: ['v-157','v-158','v-028'] },
    ],
  },
]

// Merge new stories into STORIES array (export already defined above)
STORIES.push(...NEW_STORIES)

// ── Amarahasa graded readers (CC0) ──────────────────────────────────────────
const AMARAHASA_STORIES = [
  {
    id: 'story-33', type: 'story', category: 'amarahasa', level: 'beginner',
    title: 'बुद्धः कः?', titleIast: 'Buddhaḥ Kaḥ?', titleEnglish: 'Who Is the Buddha?',
    description: 'A gentle introduction to the Buddha and his family through simple questions and answers.',
    moral: 'The son of a great king chose a greater path.',
    sentences: [
      { id: 'am33-1', words: [
          { devanagari: 'बुद्धः',    iast: 'buddhaḥ',    english: 'the Buddha',    grammar: 'proper noun, nom. sg.' },
          { devanagari: 'भिक्षुः',  iast: 'bhikṣuḥ',   english: 'a monk',        grammar: 'noun, nom. sg.' },
        ], translation: 'The Buddha is a monk.', vocabIds: [] },
      { id: 'am33-2', words: [
          { devanagari: 'बुद्धः',    iast: 'buddhaḥ',    english: 'the Buddha',    grammar: 'proper noun, nom. sg.' },
          { devanagari: 'महान्',     iast: 'mahān',      english: 'great',         grammar: 'adj, nom. sg.' },
        ], translation: 'The Buddha is great.', vocabIds: [] },
      { id: 'am33-3', words: [
          { devanagari: 'बुद्धः',    iast: 'buddhaḥ',    english: 'the Buddha',    grammar: 'proper noun, nom. sg.' },
          { devanagari: 'महान्',     iast: 'mahān',      english: 'great',         grammar: 'adj, nom. sg.' },
          { devanagari: 'भिक्षुः',  iast: 'bhikṣuḥ',   english: 'monk',          grammar: 'noun, nom. sg.' },
        ], translation: 'The Buddha is a great monk.', vocabIds: [] },
      { id: 'am33-4', words: [
          { devanagari: 'शुद्धोदनः', iast: 'śuddhodanaḥ', english: 'Śuddhodana',  grammar: 'proper noun, nom. sg.' },
          { devanagari: 'राजा',     iast: 'rājā',       english: 'a king',        grammar: 'noun, nom. sg.' },
        ], translation: 'Śuddhodana is a king.', vocabIds: [] },
      { id: 'am33-5', words: [
          { devanagari: 'शुद्धोदनः', iast: 'śuddhodanaḥ', english: 'Śuddhodana',  grammar: 'proper noun, nom. sg.' },
          { devanagari: 'महान्',     iast: 'mahān',      english: 'great',         grammar: 'adj, nom. sg.' },
          { devanagari: 'राजा',     iast: 'rājā',       english: 'king',          grammar: 'noun, nom. sg.' },
        ], translation: 'Śuddhodana is a great king.', vocabIds: [] },
      { id: 'am33-6', words: [
          { devanagari: 'बुद्धः',    iast: 'buddhaḥ',    english: 'the Buddha',    grammar: 'proper noun, nom. sg.' },
          { devanagari: 'शुद्धोदनस्य', iast: 'śuddhodanasya', english: 'of Śuddhodana', grammar: 'noun, gen. sg.' },
          { devanagari: 'पुत्रः',    iast: 'putraḥ',    english: 'son',           grammar: 'noun, nom. sg.' },
        ], translation: 'The Buddha is the son of Śuddhodana.', vocabIds: [] },
      { id: 'am33-7', words: [
          { devanagari: 'बुद्धः',    iast: 'buddhaḥ',    english: 'the Buddha',    grammar: 'proper noun, nom. sg.' },
          { devanagari: 'राज्ञः',    iast: 'rājñaḥ',    english: 'of the king',   grammar: 'noun, gen. sg.' },
          { devanagari: 'पुत्रः',    iast: 'putraḥ',    english: 'son',           grammar: 'noun, nom. sg.' },
        ], translation: 'The Buddha is the son of the king.', vocabIds: [] },
    ],
  },
  {
    id: 'story-34', type: 'story', category: 'amarahasa', level: 'beginner',
    title: 'संजयः सुखी न', titleIast: 'Saṃjayaḥ Sukhī Na', titleEnglish: 'Saṃjaya Is Not Happy',
    description: 'Young Saṃjaya wants something. What does he want? Can he get it?',
    moral: 'Knowing what we truly want is the first step to happiness.',
    sentences: [
      { id: 'am34-1', words: [
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'बालः',     iast: 'bālaḥ',     english: 'a boy',         grammar: 'noun, nom. sg.' },
        ], translation: 'Saṃjaya is a boy.', vocabIds: [] },
      { id: 'am34-2', words: [
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'सुखी',     iast: 'sukhī',     english: 'happy',         grammar: 'adj, nom. sg.' },
          { devanagari: 'न',        iast: 'na',         english: 'not',           grammar: 'particle, negation' },
        ], translation: 'Saṃjaya is not happy.', vocabIds: [] },
      { id: 'am34-3', words: [
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'किम्',     iast: 'kim',        english: 'what',          grammar: 'pronoun, acc. sg. n.' },
          { devanagari: 'इच्छति',   iast: 'icchati',   english: 'wants',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'What does Saṃjaya want?', vocabIds: [] },
      { id: 'am34-4', words: [
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'क्रीडितुम्', iast: 'krīḍitum', english: 'to play',      grammar: 'verb, infinitive' },
          { devanagari: 'इच्छति',   iast: 'icchati',   english: 'wants',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'Saṃjaya wants to play.', vocabIds: [] },
      { id: 'am34-5', words: [
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'वानरम्',   iast: 'vānaram',   english: 'a monkey',      grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',   iast: 'paśyati',   english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'Saṃjaya sees a monkey.', vocabIds: [] },
      { id: 'am34-6', words: [
          { devanagari: 'वानरः',    iast: 'vānaraḥ',   english: 'the monkey',    grammar: 'noun, nom. sg.' },
          { devanagari: 'अपि',      iast: 'api',        english: 'also',          grammar: 'particle' },
          { devanagari: 'क्रीडति',  iast: 'krīḍati',   english: 'plays',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The monkey also plays.', vocabIds: [] },
      { id: 'am34-7', words: [
          { devanagari: 'इदानीम्',  iast: 'idānīm',    english: 'now',           grammar: 'adverb' },
          { devanagari: 'संजयः',    iast: 'saṃjayaḥ',  english: 'Saṃjaya',       grammar: 'proper noun, nom. sg.' },
          { devanagari: 'सुखी',     iast: 'sukhī',     english: 'happy',         grammar: 'adj, nom. sg.' },
        ], translation: 'Now Saṃjaya is happy.', vocabIds: [] },
    ],
  },
  {
    id: 'story-35', type: 'story', category: 'amarahasa', level: 'beginner',
    title: 'हरिणी शुकं पश्यति', titleIast: 'Hariṇī Śukaṃ Paśyati', titleEnglish: 'The Doe Sees the Parrot',
    description: 'A young doe notices a parrot that is unhappy. The parrot longs to fly free.',
    moral: 'Freedom is dearer than comfort.',
    sentences: [
      { id: 'am35-1', words: [
          { devanagari: 'हरिणी',    iast: 'hariṇī',    english: 'the doe',       grammar: 'noun, nom. sg. f.' },
          { devanagari: 'बाला',     iast: 'bālā',      english: 'young',         grammar: 'adj, nom. sg. f.' },
        ], translation: 'The doe is young.', vocabIds: [] },
      { id: 'am35-2', words: [
          { devanagari: 'हरिणी',    iast: 'hariṇī',    english: 'the doe',       grammar: 'noun, nom. sg. f.' },
          { devanagari: 'सुखिनी',   iast: 'sukhinī',   english: 'happy',         grammar: 'adj, nom. sg. f.' },
          { devanagari: 'बाला',     iast: 'bālā',      english: 'young',         grammar: 'adj, nom. sg. f.' },
        ], translation: 'The doe is a happy, young deer.', vocabIds: [] },
      { id: 'am35-3', words: [
          { devanagari: 'हरिणी',    iast: 'hariṇī',    english: 'the doe',       grammar: 'noun, nom. sg. f.' },
          { devanagari: 'शुकम्',    iast: 'śukam',     english: 'a parrot',      grammar: 'noun, acc. sg.' },
          { devanagari: 'पश्यति',   iast: 'paśyati',   english: 'sees',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The doe sees a parrot.', vocabIds: [] },
      { id: 'am35-4', words: [
          { devanagari: 'शुकः',     iast: 'śukaḥ',     english: 'the parrot',    grammar: 'noun, nom. sg.' },
          { devanagari: 'सुखी',     iast: 'sukhī',     english: 'happy',         grammar: 'adj, nom. sg.' },
          { devanagari: 'न',        iast: 'na',         english: 'not',           grammar: 'particle, negation' },
        ], translation: 'The parrot is not happy.', vocabIds: [] },
      { id: 'am35-5', words: [
          { devanagari: 'शुकः',     iast: 'śukaḥ',     english: 'the parrot',    grammar: 'noun, nom. sg.' },
          { devanagari: 'किम्',     iast: 'kim',        english: 'what',          grammar: 'pronoun, acc. sg. n.' },
          { devanagari: 'इच्छति',   iast: 'icchati',   english: 'wants',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'What does the parrot want?', vocabIds: [] },
      { id: 'am35-6', words: [
          { devanagari: 'शुकः',     iast: 'śukaḥ',     english: 'the parrot',    grammar: 'noun, nom. sg.' },
          { devanagari: 'गन्तुम्',  iast: 'gantum',    english: 'to go',         grammar: 'verb, infinitive' },
          { devanagari: 'इच्छति',   iast: 'icchati',   english: 'wants',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'The parrot wants to go.', vocabIds: [] },
      { id: 'am35-7', words: [
          { devanagari: 'शुकः',     iast: 'śukaḥ',     english: 'the parrot',    grammar: 'noun, nom. sg.' },
          { devanagari: 'गच्छति',   iast: 'gacchati',  english: 'goes',          grammar: 'verb, pres. 3sg.' },
        ], translation: 'The parrot goes — it flies free!', vocabIds: [] },
    ],
  },
  {
    id: 'story-36', type: 'story', category: 'amarahasa', level: 'beginner',
    title: 'रामः कः?', titleIast: 'Rāmaḥ Kaḥ?', titleEnglish: 'Who Is Rāma?',
    description: 'Simple sentences introduce Rāma, his family, and his city Ayodhyā.',
    moral: 'Duty, family, and virtue are the marks of a true hero.',
    sentences: [
      { id: 'am36-1', words: [
          { devanagari: 'रामः',     iast: 'rāmaḥ',     english: 'Rāma',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'राजकुमारः', iast: 'rājakumāraḥ', english: 'a prince',  grammar: 'noun, nom. sg.' },
        ], translation: 'Rāma is a prince.', vocabIds: ['v-001'] },
      { id: 'am36-2', words: [
          { devanagari: 'रामः',     iast: 'rāmaḥ',     english: 'Rāma',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'महान्',    iast: 'mahān',     english: 'great',         grammar: 'adj, nom. sg.' },
          { devanagari: 'राजकुमारः', iast: 'rājakumāraḥ', english: 'prince',    grammar: 'noun, nom. sg.' },
        ], translation: 'Rāma is a great prince.', vocabIds: ['v-001'] },
      { id: 'am36-3', words: [
          { devanagari: 'दशरथः',    iast: 'daśarathaḥ', english: 'Daśaratha',   grammar: 'proper noun, nom. sg.' },
          { devanagari: 'रामस्य',   iast: 'rāmasya',   english: "Rāma's",       grammar: 'proper noun, gen. sg.' },
          { devanagari: 'पिता',     iast: 'pitā',      english: 'father',        grammar: 'noun, nom. sg.' },
        ], translation: 'Daśaratha is Rāma\'s father.', vocabIds: ['v-001'] },
      { id: 'am36-4', words: [
          { devanagari: 'दशरथः',    iast: 'daśarathaḥ', english: 'Daśaratha',   grammar: 'proper noun, nom. sg.' },
          { devanagari: 'महान्',    iast: 'mahān',     english: 'great',         grammar: 'adj, nom. sg.' },
          { devanagari: 'राजा',     iast: 'rājā',      english: 'king',          grammar: 'noun, nom. sg.' },
        ], translation: 'Daśaratha is a great king.', vocabIds: [] },
      { id: 'am36-5', words: [
          { devanagari: 'रामः',     iast: 'rāmaḥ',     english: 'Rāma',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'अयोध्यायाम्', iast: 'ayodhyāyām', english: 'in Ayodhyā', grammar: 'proper noun, loc. sg.' },
          { devanagari: 'वसति',     iast: 'vasati',    english: 'lives',         grammar: 'verb, pres. 3sg.' },
        ], translation: 'Rāma lives in Ayodhyā.', vocabIds: ['v-001'] },
      { id: 'am36-6', words: [
          { devanagari: 'सीता',     iast: 'sītā',      english: 'Sītā',          grammar: 'proper noun, nom. sg. f.' },
          { devanagari: 'रामस्य',   iast: 'rāmasya',   english: "Rāma's",       grammar: 'proper noun, gen. sg.' },
          { devanagari: 'पत्नी',    iast: 'patnī',     english: 'wife',          grammar: 'noun, nom. sg. f.' },
        ], translation: 'Sītā is Rāma\'s wife.', vocabIds: ['v-001'] },
      { id: 'am36-7', words: [
          { devanagari: 'रामः',     iast: 'rāmaḥ',     english: 'Rāma',          grammar: 'proper noun, nom. sg.' },
          { devanagari: 'सुखी',     iast: 'sukhī',     english: 'happy',         grammar: 'adj, nom. sg.' },
          { devanagari: 'धर्मशीलः', iast: 'dharmaśīlaḥ', english: 'virtuous',   grammar: 'adj, nom. sg.' },
        ], translation: 'Rāma is happy and virtuous.', vocabIds: ['v-001'] },
    ],
  },
]

// ── More Pañcatantra classics ────────────────────────────────────────────────
const PANCHATANTRA_STORIES_2 = [
  {
    id: 'story-37', type: 'story', category: 'panchatantra', level: 'beginner',
    title: 'पिपासित-काकः', titleIast: 'Pipāsita-kākaḥ', titleEnglish: 'The Thirsty Crow (Classical)',
    description: 'A thirsty crow finds a pot with a little water at the bottom. Unable to reach it, the crow uses stones to raise the water level.',
    moral: 'Ingenuity and persistence overcome adversity.',
    sentences: [
      { id: 'pt37-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'crow',          grammar: 'noun, nom. sg.' },
          { devanagari: 'पिपासितः', iast: 'pipāsitaḥ', english: 'thirsty',       grammar: 'adj, nom. sg.' },
          { devanagari: 'आसीत्',    iast: 'āsīt',      english: 'was',           grammar: 'verb, impf. 3sg.' },
        ], translation: 'There was a thirsty crow.', vocabIds: [] },
      { id: 'pt37-2', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'जलम्',     iast: 'jalam',     english: 'water',         grammar: 'noun, acc. sg.' },
          { devanagari: 'अमार्गत्', iast: 'amārgat',   english: 'sought',        grammar: 'verb, impf. 3sg.' },
        ], translation: 'He searched for water.', vocabIds: [] },
      { id: 'pt37-3', words: [
          { devanagari: 'एकं',      iast: 'ekaṃ',      english: 'one / a',       grammar: 'numeral, acc. sg.' },
          { devanagari: 'कुम्भम्',  iast: 'kumbham',   english: 'pot',           grammar: 'noun, acc. sg.' },
          { devanagari: 'अपश्यत्',  iast: 'apaśyat',   english: 'saw',           grammar: 'verb, impf. 3sg.' },
        ], translation: 'He saw a pot.', vocabIds: [] },
      { id: 'pt37-4', words: [
          { devanagari: 'कुम्भे',   iast: 'kumbhe',    english: 'in the pot',    grammar: 'noun, loc. sg.' },
          { devanagari: 'स्वल्पम्', iast: 'svalpam',   english: 'a little',      grammar: 'adj, nom. sg. n.' },
          { devanagari: 'जलम्',     iast: 'jalam',     english: 'water',         grammar: 'noun, nom. sg.' },
          { devanagari: 'आसीत्',    iast: 'āsīt',      english: 'was',           grammar: 'verb, impf. 3sg.' },
        ], translation: 'In the pot there was only a little water.', vocabIds: [] },
      { id: 'pt37-5', words: [
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'the crow',      grammar: 'noun, nom. sg.' },
          { devanagari: 'पाषाणान्', iast: 'pāṣāṇān',  english: 'stones',        grammar: 'noun, acc. pl.' },
          { devanagari: 'आनयत्',    iast: 'ānayat',    english: 'brought',       grammar: 'verb, impf. 3sg.' },
        ], translation: 'The crow brought stones.', vocabIds: [] },
      { id: 'pt37-6', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पाषाणान्', iast: 'pāṣāṇān',  english: 'stones',        grammar: 'noun, acc. pl.' },
          { devanagari: 'कुम्भे',   iast: 'kumbhe',    english: 'into the pot',  grammar: 'noun, loc. sg.' },
          { devanagari: 'अक्षिपत्', iast: 'akṣipat',   english: 'dropped',       grammar: 'verb, impf. 3sg.' },
        ], translation: 'He dropped the stones into the pot.', vocabIds: [] },
      { id: 'pt37-7', words: [
          { devanagari: 'जलम्',     iast: 'jalam',     english: 'the water',     grammar: 'noun, nom. sg.' },
          { devanagari: 'उपरि',     iast: 'upari',     english: 'upward',        grammar: 'adverb' },
          { devanagari: 'आगच्छत्',  iast: 'āgacchat',  english: 'came',          grammar: 'verb, impf. 3sg.' },
        ], translation: 'The water rose upward.', vocabIds: [] },
      { id: 'pt37-8', words: [
          { devanagari: 'काकः',     iast: 'kākaḥ',     english: 'the crow',      grammar: 'noun, nom. sg.' },
          { devanagari: 'जलम्',     iast: 'jalam',     english: 'the water',     grammar: 'noun, acc. sg.' },
          { devanagari: 'अपिबत्',   iast: 'apibat',    english: 'drank',         grammar: 'verb, impf. 3sg.' },
        ], translation: 'The crow drank the water.', vocabIds: [] },
      { id: 'pt37-9', words: [
          { devanagari: 'बुद्धिः',  iast: 'buddhiḥ',   english: 'intelligence',  grammar: 'noun, nom. sg. f.' },
          { devanagari: 'बलात्',    iast: 'balāt',     english: 'than strength', grammar: 'noun, abl. sg.' },
          { devanagari: 'श्रेयसी',  iast: 'śreyasī',   english: 'greater',       grammar: 'adj, nom. sg. f.' },
        ], translation: 'Intelligence is greater than strength.', vocabIds: [] },
    ],
  },
  {
    id: 'story-38', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'ब्राह्मण-स्वप्नः', titleIast: 'Brāhmaṇa-svapnaḥ', titleEnglish: 'The Brahmin\'s Dream',
    description: 'A poor Brahmin receives a pot of barley flour and begins to daydream about all the wealth he will gain — only to ruin it all with a kick in his sleep.',
    moral: 'Do not count your chickens before they hatch. Act wisely; do not live only in dreams.',
    sentences: [
      { id: 'pt38-1', words: [
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'a / one',       grammar: 'numeral, nom. sg.' },
          { devanagari: 'दरिद्रः',  iast: 'daridraḥ',  english: 'poor',          grammar: 'adj, nom. sg.' },
          { devanagari: 'ब्राह्मणः', iast: 'brāhmaṇaḥ', english: 'Brahmin',      grammar: 'noun, nom. sg.' },
          { devanagari: 'आसीत्',    iast: 'āsīt',      english: 'was',           grammar: 'verb, impf. 3sg.' },
        ], translation: 'There was a poor Brahmin.', vocabIds: [] },
      { id: 'pt38-2', words: [
          { devanagari: 'तस्य',     iast: 'tasya',     english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'गृहे',     iast: 'gṛhe',      english: 'at home',       grammar: 'noun, loc. sg.' },
          { devanagari: 'एकः',      iast: 'ekaḥ',      english: 'one',           grammar: 'numeral, nom. sg.' },
          { devanagari: 'घटः',      iast: 'ghaṭaḥ',   english: 'pot',           grammar: 'noun, nom. sg.' },
          { devanagari: 'यवचूर्णेन', iast: 'yavacūrṇena', english: 'with barley flour', grammar: 'noun, inst. sg.' },
          { devanagari: 'पूर्णः',   iast: 'pūrṇaḥ',   english: 'full',          grammar: 'adj, nom. sg.' },
          { devanagari: 'आसीत्',    iast: 'āsīt',      english: 'was',           grammar: 'verb, impf. 3sg.' },
        ], translation: 'At his house was a pot full of barley flour.', vocabIds: [] },
      { id: 'pt38-3', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'घटम्',     iast: 'ghaṭam',    english: 'the pot',       grammar: 'noun, acc. sg.' },
          { devanagari: 'विक्रीय',  iast: 'vikrīya',   english: 'selling',       grammar: 'verb, absol.' },
          { devanagari: 'धनम्',     iast: 'dhanam',    english: 'money',         grammar: 'noun, acc. sg.' },
          { devanagari: 'लभिष्यामि', iast: 'labhiṣyāmi', english: 'I shall gain', grammar: 'verb, fut. 1sg.' },
        ], translation: '"By selling this pot, I shall gain money."', vocabIds: [] },
      { id: 'pt38-4', words: [
          { devanagari: 'तेन',      iast: 'tena',      english: 'with that',     grammar: 'pronoun, inst. sg.' },
          { devanagari: 'धनेन',     iast: 'dhanena',   english: 'money',         grammar: 'noun, inst. sg.' },
          { devanagari: 'अजाः',     iast: 'ajāḥ',      english: 'goats',         grammar: 'noun, acc. pl.' },
          { devanagari: 'क्रेष्यामि', iast: 'kreṣyāmi', english: 'I will buy',   grammar: 'verb, fut. 1sg.' },
        ], translation: '"With that money I will buy goats."', vocabIds: [] },
      { id: 'pt38-5', words: [
          { devanagari: 'अजाभिः',   iast: 'ajābhiḥ',   english: 'from the goats', grammar: 'noun, inst. pl.' },
          { devanagari: 'गाः',      iast: 'gāḥ',       english: 'cows',          grammar: 'noun, acc. pl.' },
          { devanagari: 'क्रेष्यामि', iast: 'kreṣyāmi', english: 'I will buy',   grammar: 'verb, fut. 1sg.' },
        ], translation: '"From the profit of the goats I will buy cows."', vocabIds: [] },
      { id: 'pt38-6', words: [
          { devanagari: 'ततः',      iast: 'tataḥ',     english: 'then',          grammar: 'adverb' },
          { devanagari: 'राजपुत्री', iast: 'rājaputrī', english: 'a princess',   grammar: 'noun, acc. sg. f.' },
          { devanagari: 'विवाहिष्यामि', iast: 'vivāhiṣyāmi', english: 'I will marry', grammar: 'verb, fut. 1sg.' },
        ], translation: '"Then I will marry a princess."', vocabIds: [] },
      { id: 'pt38-7', words: [
          { devanagari: 'अस्माकम्', iast: 'asmākam',   english: 'our',           grammar: 'pronoun, gen. pl.' },
          { devanagari: 'पुत्रः',   iast: 'putraḥ',    english: 'son',           grammar: 'noun, nom. sg.' },
          { devanagari: 'भविष्यति', iast: 'bhaviṣyati', english: 'will be born', grammar: 'verb, fut. 3sg.' },
        ], translation: '"We will have a son."', vocabIds: [] },
      { id: 'pt38-8', words: [
          { devanagari: 'सः',       iast: 'saḥ',       english: 'he',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'स्वप्नेषु', iast: 'svapneṣu',  english: 'in dreams',     grammar: 'noun, loc. pl.' },
          { devanagari: 'पादम्',    iast: 'pādam',     english: 'a foot',        grammar: 'noun, acc. sg.' },
          { devanagari: 'अप्रेरयत्', iast: 'aprerayat', english: 'kicked out',   grammar: 'verb, impf. 3sg.' },
        ], translation: 'Lost in dreams, he kicked out his foot.', vocabIds: [] },
      { id: 'pt38-9', words: [
          { devanagari: 'घटः',      iast: 'ghaṭaḥ',   english: 'the pot',       grammar: 'noun, nom. sg.' },
          { devanagari: 'भूमौ',     iast: 'bhūmau',    english: 'on the ground', grammar: 'noun, loc. sg.' },
          { devanagari: 'पपात',     iast: 'papāta',    english: 'fell',          grammar: 'verb, perf. 3sg.' },
          { devanagari: 'भग्नः',    iast: 'bhagnaḥ',   english: 'broken',        grammar: 'adj, nom. sg.' },
          { devanagari: 'च',        iast: 'ca',         english: 'and',           grammar: 'particle' },
        ], translation: 'The pot fell to the ground and shattered.', vocabIds: [] },
      { id: 'pt38-10', words: [
          { devanagari: 'स्वप्नः',  iast: 'svapnaḥ',   english: 'the dream',     grammar: 'noun, nom. sg.' },
          { devanagari: 'विनष्टः',  iast: 'vinaṣṭaḥ',  english: 'was destroyed', grammar: 'adj, nom. sg.' },
        ], translation: 'The dream was destroyed.', vocabIds: [] },
    ],
  },
  {
    id: 'story-39', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'सिंहः जीवितः', titleIast: 'Siṃhaḥ Jīvitaḥ', titleEnglish: 'The Lion Brought Back to Life',
    description: 'Four Brahmin friends journey together. Three are book-learned but lack common sense; the fourth is wise but uneducated. They bring a dead lion to life with their learning — with fatal results for three of them.',
    moral: 'Bookish knowledge without common sense leads to ruin.',
    sentences: [
      { id: 'pt39-1', words: [
          { devanagari: 'चत्वारः',  iast: 'catvāraḥ',  english: 'four',          grammar: 'numeral, nom. pl.' },
          { devanagari: 'ब्राह्मणाः', iast: 'brāhmaṇāḥ', english: 'Brahmins',   grammar: 'noun, nom. pl.' },
          { devanagari: 'मित्राणि',  iast: 'mitrāṇi',   english: 'friends',      grammar: 'noun, nom. pl.' },
          { devanagari: 'आसन्',      iast: 'āsan',       english: 'were',         grammar: 'verb, impf. 3pl.' },
        ], translation: 'Four Brahmins were friends.', vocabIds: [] },
      { id: 'pt39-2', words: [
          { devanagari: 'त्रयः',    iast: 'trayaḥ',    english: 'three',         grammar: 'numeral, nom. pl.' },
          { devanagari: 'शास्त्रज्ञाः', iast: 'śāstrajñāḥ', english: 'learned in scripture', grammar: 'adj, nom. pl.' },
          { devanagari: 'किन्तु',    iast: 'kintu',     english: 'but',           grammar: 'particle' },
          { devanagari: 'निर्बुद्धयः', iast: 'nirbuddhayaḥ', english: 'foolish', grammar: 'adj, nom. pl.' },
          { devanagari: 'आसन्',      iast: 'āsan',       english: 'were',         grammar: 'verb, impf. 3pl.' },
        ], translation: 'Three were learned in scripture but lacked common sense.', vocabIds: [] },
      { id: 'pt39-3', words: [
          { devanagari: 'चतुर्थः',  iast: 'caturthaḥ',  english: 'the fourth',   grammar: 'numeral, nom. sg.' },
          { devanagari: 'सुबुद्धिः', iast: 'subuddhiḥ',  english: 'wise',         grammar: 'adj, nom. sg.' },
          { devanagari: 'किन्तु',    iast: 'kintu',      english: 'but',          grammar: 'particle' },
          { devanagari: 'अशिक्षितः', iast: 'aśikṣitaḥ', english: 'uneducated',   grammar: 'adj, nom. sg.' },
          { devanagari: 'आसीत्',    iast: 'āsīt',       english: 'was',          grammar: 'verb, impf. 3sg.' },
        ], translation: 'The fourth was wise but uneducated.', vocabIds: [] },
      { id: 'pt39-4', words: [
          { devanagari: 'मार्गे',    iast: 'mārge',     english: 'on the road',   grammar: 'noun, loc. sg.' },
          { devanagari: 'एकः',       iast: 'ekaḥ',      english: 'a',            grammar: 'numeral, nom. sg.' },
          { devanagari: 'मृतः',      iast: 'mṛtaḥ',    english: 'dead',          grammar: 'adj, nom. sg.' },
          { devanagari: 'सिंहः',     iast: 'siṃhaḥ',   english: 'lion',          grammar: 'noun, nom. sg.' },
          { devanagari: 'आसीत्',     iast: 'āsīt',      english: 'was',          grammar: 'verb, impf. 3sg.' },
        ], translation: 'On the road lay a dead lion.', vocabIds: [] },
      { id: 'pt39-5', words: [
          { devanagari: 'प्रथमः',    iast: 'prathamaḥ', english: 'the first',    grammar: 'numeral, nom. sg.' },
          { devanagari: 'अस्थीनि',   iast: 'asthīni',   english: 'the bones',    grammar: 'noun, acc. pl.' },
          { devanagari: 'संयोजयत्',  iast: 'saṃyojayat', english: 'assembled',   grammar: 'verb, impf. 3sg.' },
        ], translation: 'The first assembled the bones.', vocabIds: [] },
      { id: 'pt39-6', words: [
          { devanagari: 'द्वितीयः',  iast: 'dvitīyaḥ',  english: 'the second',   grammar: 'numeral, nom. sg.' },
          { devanagari: 'त्वचम्',    iast: 'tvacam',     english: 'skin',         grammar: 'noun, acc. sg.' },
          { devanagari: 'मांसम्',    iast: 'māṃsam',    english: 'flesh',        grammar: 'noun, acc. sg.' },
          { devanagari: 'च',         iast: 'ca',          english: 'and',         grammar: 'particle' },
          { devanagari: 'अयोजयत्',   iast: 'ayojayat',   english: 'attached',    grammar: 'verb, impf. 3sg.' },
        ], translation: 'The second attached skin and flesh.', vocabIds: [] },
      { id: 'pt39-7', words: [
          { devanagari: 'सुबुद्धिः', iast: 'subuddhiḥ',  english: 'the wise one', grammar: 'proper noun, nom. sg.' },
          { devanagari: 'अवदत्',     iast: 'avadat',     english: 'said',         grammar: 'verb, impf. 3sg.' },
          { devanagari: 'मा',        iast: 'mā',          english: 'do not',      grammar: 'particle, prohib.' },
          { devanagari: 'जीवयत',     iast: 'jīvayata',   english: 'bring to life', grammar: 'verb, imper. 2pl.' },
          { devanagari: 'एनम्',      iast: 'enam',       english: 'this one',     grammar: 'pronoun, acc. sg.' },
        ], translation: 'The wise one said, "Do not bring this one to life."', vocabIds: [] },
      { id: 'pt39-8', words: [
          { devanagari: 'तृतीयः',    iast: 'tṛtīyaḥ',   english: 'the third',    grammar: 'numeral, nom. sg.' },
          { devanagari: 'तस्य',      iast: 'tasya',      english: 'his',          grammar: 'pronoun, gen. sg.' },
          { devanagari: 'वचनम्',     iast: 'vacanam',    english: 'words',        grammar: 'noun, acc. sg.' },
          { devanagari: 'अतिक्रम्य', iast: 'atikramya',  english: 'ignoring',     grammar: 'verb, absol.' },
          { devanagari: 'जीवम्',     iast: 'jīvam',     english: 'life',         grammar: 'noun, acc. sg.' },
          { devanagari: 'दत्तवान्',  iast: 'dattavān',   english: 'gave',        grammar: 'verb, perf. part.' },
        ], translation: 'The third, ignoring his words, gave the lion life.', vocabIds: [] },
      { id: 'pt39-9', words: [
          { devanagari: 'सिंहः',     iast: 'siṃhaḥ',    english: 'the lion',     grammar: 'noun, nom. sg.' },
          { devanagari: 'उत्थाय',    iast: 'utthāya',   english: 'rising up',    grammar: 'verb, absol.' },
          { devanagari: 'त्रीन्',    iast: 'trīn',      english: 'the three',    grammar: 'numeral, acc. pl.' },
          { devanagari: 'अमारयत्',   iast: 'amārayat',  english: 'killed',       grammar: 'verb, impf. 3sg.' },
        ], translation: 'The lion rose up and killed the three.', vocabIds: [] },
      { id: 'pt39-10', words: [
          { devanagari: 'व्यावहारिकी', iast: 'vyāvahārikī', english: 'practical', grammar: 'adj, nom. sg. f.' },
          { devanagari: 'बुद्धिः',   iast: 'buddhiḥ',   english: 'wisdom',       grammar: 'noun, nom. sg. f.' },
          { devanagari: 'शास्त्रज्ञानात्', iast: 'śāstrajñānāt', english: 'than scriptural knowledge', grammar: 'noun, abl. sg.' },
          { devanagari: 'श्रेयसी',   iast: 'śreyasī',   english: 'better',       grammar: 'adj, nom. sg. f.' },
        ], translation: 'Practical wisdom is better than scriptural knowledge alone.', vocabIds: [] },
    ],
  },
  {
    id: 'story-40', type: 'story', category: 'panchatantra', level: 'intermediate',
    title: 'पञ्चतन्त्रम् — उपोद्घातः', titleIast: 'Pañcatantram — Upoghātaḥ', titleEnglish: 'The Panchatantra — Introduction',
    description: 'The framing story of the Pañcatantra: King Amaraśakti of Mahilāropya has three foolish sons. He commissions the sage Viṣṇuśarman to make them wise through stories.',
    moral: 'Whoever reads or hears the Pañcatantra becomes wise.',
    sentences: [
      { id: 'pt40-1', words: [
          { devanagari: 'अस्ति',     iast: 'asti',      english: 'there is',      grammar: 'verb, pres. 3sg.' },
          { devanagari: 'महिलारोप्यम्', iast: 'mahilāropyam', english: 'Mahilāropya', grammar: 'proper noun, nom. sg.' },
          { devanagari: 'नाम',       iast: 'nāma',      english: 'named',         grammar: 'adverb' },
          { devanagari: 'नगरम्',     iast: 'nagaram',   english: 'city',          grammar: 'noun, nom. sg.' },
        ], translation: 'There is a city named Mahilāropya.', vocabIds: [] },
      { id: 'pt40-2', words: [
          { devanagari: 'तत्र',      iast: 'tatra',     english: 'there',         grammar: 'adverb' },
          { devanagari: 'अमरशक्तिः', iast: 'amaraśaktiḥ', english: 'Amaraśakti', grammar: 'proper noun, nom. sg.' },
          { devanagari: 'नाम',       iast: 'nāma',      english: 'named',         grammar: 'adverb' },
          { devanagari: 'राजा',      iast: 'rājā',      english: 'king',          grammar: 'noun, nom. sg.' },
          { devanagari: 'बभूव',      iast: 'babhūva',   english: 'lived',         grammar: 'verb, perf. 3sg.' },
        ], translation: 'In it lived a king named Amaraśakti.', vocabIds: [] },
      { id: 'pt40-3', words: [
          { devanagari: 'तस्य',      iast: 'tasya',     english: 'his',           grammar: 'pronoun, gen. sg.' },
          { devanagari: 'त्रयः',     iast: 'trayaḥ',   english: 'three',         grammar: 'numeral, nom. pl.' },
          { devanagari: 'मूर्खाः',   iast: 'mūrkhāḥ',  english: 'foolish',       grammar: 'adj, nom. pl.' },
          { devanagari: 'पुत्राः',   iast: 'putrāḥ',   english: 'sons',          grammar: 'noun, nom. pl.' },
          { devanagari: 'बभूवुः',    iast: 'babhūvuḥ',  english: 'were',         grammar: 'verb, perf. 3pl.' },
        ], translation: 'He had three foolish sons.', vocabIds: [] },
      { id: 'pt40-4', words: [
          { devanagari: 'राजा',      iast: 'rājā',      english: 'the king',      grammar: 'noun, nom. sg.' },
          { devanagari: 'चिन्तितः',  iast: 'cintitaḥ',  english: 'troubled',     grammar: 'adj, nom. sg.' },
          { devanagari: 'आसीत्',     iast: 'āsīt',      english: 'was',          grammar: 'verb, impf. 3sg.' },
        ], translation: 'The king was troubled.', vocabIds: [] },
      { id: 'pt40-5', words: [
          { devanagari: 'विष्णुशर्मा', iast: 'viṣṇuśarmā', english: 'Viṣṇuśarman', grammar: 'proper noun, nom. sg.' },
          { devanagari: 'नाम',        iast: 'nāma',     english: 'named',        grammar: 'adverb' },
          { devanagari: 'महापण्डितः', iast: 'mahāpaṇḍitaḥ', english: 'great scholar', grammar: 'noun, nom. sg.' },
          { devanagari: 'आगत्य',      iast: 'āgatya',   english: 'coming',       grammar: 'verb, absol.' },
          { devanagari: 'अवदत्',      iast: 'avadat',   english: 'said',         grammar: 'verb, impf. 3sg.' },
        ], translation: 'A great scholar named Viṣṇuśarman came and spoke.', vocabIds: [] },
      { id: 'pt40-6', words: [
          { devanagari: 'अहम्',       iast: 'aham',     english: 'I',            grammar: 'pronoun, nom. sg.' },
          { devanagari: 'तव',         iast: 'tava',     english: 'your',         grammar: 'pronoun, gen. sg.' },
          { devanagari: 'पुत्रान्',   iast: 'putrān',   english: 'sons',         grammar: 'noun, acc. pl.' },
          { devanagari: 'बुद्धिमतः',  iast: 'buddhimataḥ', english: 'wise',      grammar: 'adj, acc. pl.' },
          { devanagari: 'करिष्यामि',  iast: 'kariṣyāmi', english: 'I will make', grammar: 'verb, fut. 1sg.' },
        ], translation: '"I will make your sons wise."', vocabIds: [] },
      { id: 'pt40-7', words: [
          { devanagari: 'यः',         iast: 'yaḥ',      english: 'whoever',      grammar: 'pronoun, nom. sg.' },
          { devanagari: 'पञ्चतन्त्रम्', iast: 'pañcatantram', english: 'the Pañcatantra', grammar: 'proper noun, acc. sg.' },
          { devanagari: 'पठति',       iast: 'paṭhati',  english: 'reads',        grammar: 'verb, pres. 3sg.' },
          { devanagari: 'शृणोति',     iast: 'śṛṇoti',   english: 'or hears',     grammar: 'verb, pres. 3sg.' },
          { devanagari: 'वा',         iast: 'vā',        english: 'or',          grammar: 'particle' },
        ], translation: 'Whoever reads or hears the Pañcatantra —', vocabIds: [] },
      { id: 'pt40-8', words: [
          { devanagari: 'सः',         iast: 'saḥ',      english: 'that person',  grammar: 'pronoun, nom. sg.' },
          { devanagari: 'बुद्धिमान्', iast: 'buddhimān', english: 'wise',        grammar: 'adj, nom. sg.' },
          { devanagari: 'भवति',       iast: 'bhavati',  english: 'becomes',      grammar: 'verb, pres. 3sg.' },
        ], translation: '— that person becomes wise.', vocabIds: [] },
    ],
  },
]

STORIES.push(...AMARAHASA_STORIES)
STORIES.push(...PANCHATANTRA_STORIES_2)
STORIES.push(...AMARAHASA_STORIES_2)
STORIES.push(...AMARAHASA_GROUP_A)
STORIES.push(...AMARAHASA_GROUP_C)
STORIES.push(...AMARAHASA_GROUP_D)
STORIES.push(...PANCHATANTRA_FULL)

// ── Bhagavad Gita — key verses ───────────────────────────────────────────────
