export const VNP_SENTENCES = [
  // Noun + Verb (basic)
  { id: 's-001', devanagari: 'रामः गच्छति।',         iast: 'rāmaḥ gacchati.',      english: 'Rama goes.',              pattern: 'noun+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-002', devanagari: 'नरः खादति।',           iast: 'naraḥ khādati.',        english: 'The man eats.',           pattern: 'noun+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-003', devanagari: 'बालः वदति।',           iast: 'bālaḥ vadati.',         english: 'The boy speaks.',         pattern: 'noun+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-004', devanagari: 'गुरुः पठति।',          iast: 'guruḥ paṭhati.',        english: 'The teacher reads.',      pattern: 'noun+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  // Pronoun + Verb
  { id: 's-005', devanagari: 'अहं गच्छामि।',         iast: 'ahaṃ gacchāmi.',        english: 'I go.',                   pattern: 'pronoun+verb',     concepts: ['nom-sg','pres-1sg'], difficulty: 1, level: 'beginner' },
  { id: 's-006', devanagari: 'त्वं खादसि।',          iast: 'tvaṃ khādasi.',         english: 'You eat.',                pattern: 'pronoun+verb',     concepts: ['nom-sg','pres-2sg'], difficulty: 1, level: 'beginner' },
  { id: 's-007', devanagari: 'सः पश्यति।',           iast: 'saḥ paśyati.',          english: 'He sees.',                pattern: 'pronoun+verb',     concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-008', devanagari: 'सा वदति।',             iast: 'sā vadati.',            english: 'She speaks.',             pattern: 'pronoun+verb',     concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  // Noun + Object + Verb
  { id: 's-009', devanagari: 'रामः फलं खादति।',      iast: 'rāmaḥ phalaṃ khādati.', english: 'Rama eats a fruit.',      pattern: 'noun+obj+verb',    concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-010', devanagari: 'बालः पुस्तकं पठति।',  iast: 'bālaḥ pustakaṃ paṭhati.',english: 'The boy reads a book.',  pattern: 'noun+obj+verb',    concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-011', devanagari: 'गुरुः ग्रामं गच्छति।',iast: 'guruḥ grāmaṃ gacchati.',english: 'The teacher goes to the village.', pattern: 'noun+obj+verb', concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-012', devanagari: 'नरः जलं पिबति।',       iast: 'naraḥ jalaṃ pibati.',   english: 'The man drinks water.',   pattern: 'noun+obj+verb',    concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  // Pronoun + Object + Verb
  { id: 's-013', devanagari: 'अहं फलं खादामि।',      iast: 'ahaṃ phalaṃ khādāmi.',  english: 'I eat a fruit.',          pattern: 'pronoun+obj+verb', concepts: ['nom-sg','acc-sg','pres-1sg'], difficulty: 2, level: 'beginner' },
  { id: 's-014', devanagari: 'त्वं पुस्तकं पश्यसि।',iast: 'tvaṃ pustakaṃ paśyasi.',english: 'You see a book.',         pattern: 'pronoun+obj+verb', concepts: ['nom-sg','acc-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  { id: 's-015', devanagari: 'सः ग्रामं गच्छति।',   iast: 'saḥ grāmaṃ gacchati.',  english: 'He goes to the village.', pattern: 'pronoun+obj+verb', concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  // Pronoun + Noun + Verb (all three)
  { id: 's-016', devanagari: 'सः बालं पश्यति।',      iast: 'saḥ bālaṃ paśyati.',    english: 'He sees the boy.',        pattern: 'pronoun+noun+verb',concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-017', devanagari: 'अहं गुरुं नमामि।',    iast: 'ahaṃ guruṃ namāmi.',    english: 'I bow to the teacher.',   pattern: 'pronoun+noun+verb',concepts: ['nom-sg','acc-sg','pres-1sg'], difficulty: 2, level: 'beginner' },
  { id: 's-018', devanagari: 'त्वं रामं जानासि।',   iast: 'tvaṃ rāmaṃ jānāsi.',    english: 'You know Rama.',          pattern: 'pronoun+noun+verb',concepts: ['nom-sg','acc-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  // Dative pronoun
  { id: 's-019', devanagari: 'तस्मै फलं ददाति।',    iast: 'tasmai phalaṃ dadāti.',  english: 'He gives a fruit to him.',pattern: 'pronoun-dat+verb', concepts: ['dat-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-020', devanagari: 'मह्यं जलं देहि।',     iast: 'mahyaṃ jalaṃ dehi.',     english: 'Give water to me.',       pattern: 'pronoun-dat+verb', concepts: ['dat-sg','acc-sg'], difficulty: 3, level: 'intermediate' },
  // Locative
  { id: 's-021', devanagari: 'सः वने वसति।',         iast: 'saḥ vane vasati.',       english: 'He lives in the forest.', pattern: 'noun-loc+verb',    concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-022', devanagari: 'बालः ग्रामे खेलति।',  iast: 'bālaḥ grāme khelati.',   english: 'The boy plays in the village.', pattern: 'noun-loc+verb', concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  // Causative
  { id: 's-023', devanagari: 'गुरुः शिष्यं पाठयति।',iast: 'guruḥ śiṣyaṃ pāṭhayati.','english': 'The teacher makes the student read.', pattern: 'causative', concepts: ['nom-sg','acc-sg','causative'], difficulty: 4, level: 'advanced' },
  // Gita reference sentence (ch1)
  { id: 's-024', devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।', iast: 'dharmakṣetre kurukṣetre samavetā yuyutsavaḥ.', english: 'On the sacred field of Kurukshetra, gathered together desirous of battle.', pattern: 'gita', concepts: ['loc-sg','nom-sg'], difficulty: 5, level: 'advanced', source: 'Bhagavad Gita 1.1' },

  // ── saḥ / sā / tat + asti  (He is / She is / That is) ──────────────────
  { id: 's-025', devanagari: 'सः बालः अस्ति।',      iast: 'saḥ bālaḥ asti.',      english: 'He is a boy.',              pattern: 'saḥ+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-026', devanagari: 'सा बाला अस्ति।',      iast: 'sā bālā asti.',        english: 'She is a girl.',            pattern: 'sā+noun+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-027', devanagari: 'सः गुरुः अस्ति।',     iast: 'saḥ guruḥ asti.',      english: 'He is a teacher.',          pattern: 'saḥ+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-028', devanagari: 'तत् फलम् अस्ति।',     iast: 'tat phalam asti.',      english: 'That is a fruit.',          pattern: 'tat+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-029', devanagari: 'तत् पुस्तकम् अस्ति।', iast: 'tat pustakam asti.',    english: 'That is a book.',           pattern: 'tat+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },

  // ── eṣaḥ / eṣā / etat + asti  (This is …) ──────────────────────────────
  { id: 's-030', devanagari: 'एषः बालः अस्ति।',     iast: 'eṣaḥ bālaḥ asti.',     english: 'This is a boy.',            pattern: 'eṣaḥ+noun+asti', concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-031', devanagari: 'एषा बाला अस्ति।',     iast: 'eṣā bālā asti.',       english: 'This is a girl.',           pattern: 'eṣā+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-032', devanagari: 'एतत् द्वारम् अस्ति।', iast: 'etat dvāram asti.',     english: 'This is a door.',           pattern: 'etat+noun+asti', concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-033', devanagari: 'एतत् गृहम् अस्ति।',   iast: 'etat gṛham asti.',      english: 'This is a house.',          pattern: 'etat+noun+asti', concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-034', devanagari: 'एषः वृक्षः अस्ति।',   iast: 'eṣaḥ vṛkṣaḥ asti.',    english: 'This is a tree.',           pattern: 'eṣaḥ+noun+asti', concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },

  // ── Who is? (kaḥ / kā) ──────────────────────────────────────────────────
  { id: 's-035', devanagari: 'सः कः?',               iast: 'saḥ kaḥ?',             english: 'Who is he?',                pattern: 'who-m',          concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-036', devanagari: 'सा का?',               iast: 'sā kā?',               english: 'Who is she?',               pattern: 'who-f',          concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-037', devanagari: 'एषः कः?',              iast: 'eṣaḥ kaḥ?',            english: 'Who is this (m)?',          pattern: 'who-m',          concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-038', devanagari: 'एषा का?',              iast: 'eṣā kā?',              english: 'Who is this (f)?',          pattern: 'who-f',          concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-039', devanagari: 'सः कः अस्ति?',         iast: 'saḥ kaḥ asti?',        english: 'Who is he?',                pattern: 'who+asti',       concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-040', devanagari: 'सा का अस्ति?',         iast: 'sā kā asti?',          english: 'Who is she?',               pattern: 'who+asti',       concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── What fruit / what door — kim + noun ─────────────────────────────────
  { id: 's-041', devanagari: 'किं फलम्?',            iast: 'kiṃ phalam?',          english: 'What fruit?',               pattern: 'kim+noun',       concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-042', devanagari: 'किं द्वारम्?',          iast: 'kiṃ dvāram?',          english: 'What door?',                pattern: 'kim+noun',       concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-043', devanagari: 'किं पुस्तकम्?',        iast: 'kiṃ pustakam?',        english: 'What book?',                pattern: 'kim+noun',       concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-044', devanagari: 'कः नरः?',              iast: 'kaḥ naraḥ?',           english: 'Which man?',                pattern: 'ka+noun',        concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },
  { id: 's-045', devanagari: 'का बाला?',             iast: 'kā bālā?',             english: 'Which girl?',               pattern: 'kā+noun',        concepts: ['nom-sg'], difficulty: 1, level: 'beginner' },

  // ── Questions with kim (what does/do …?) ────────────────────────────────
  { id: 's-046', devanagari: 'त्वं किं खादसि?',      iast: 'tvaṃ kiṃ khādasi?',    english: 'What do you eat?',          pattern: 'kim-q+verb',     concepts: ['nom-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  { id: 's-047', devanagari: 'त्वं किं पश्यसि?',     iast: 'tvaṃ kiṃ paśyasi?',    english: 'What do you see?',          pattern: 'kim-q+verb',     concepts: ['nom-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  { id: 's-048', devanagari: 'सः किं करोति?',        iast: 'saḥ kiṃ karoti?',       english: 'What does he do?',          pattern: 'kim-q+verb',     concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-049', devanagari: 'सः किं वदति?',         iast: 'saḥ kiṃ vadati?',       english: 'What does he say?',         pattern: 'kim-q+verb',     concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── Yes/no questions with vā ─────────────────────────────────────────────
  { id: 's-050', devanagari: 'रामः गच्छति वा?',      iast: 'rāmaḥ gacchati vā?',   english: 'Does Rama go?',             pattern: 'vā-q',           concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-051', devanagari: 'त्वं खादसि वा?',       iast: 'tvaṃ khādasi vā?',      english: 'Do you eat?',               pattern: 'vā-q',           concepts: ['nom-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  { id: 's-052', devanagari: 'एतत् फलम् अस्ति वा?',  iast: 'etat phalam asti vā?',  english: 'Is this a fruit?',          pattern: 'vā-q+asti',      concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── Alternative questions with vā (… or …?) ─────────────────────────────
  { id: 's-053', devanagari: 'सः नरः वा बालः?',      iast: 'saḥ naraḥ vā bālaḥ?',  english: 'Is he a man or a boy?',     pattern: 'noun-vā-noun',   concepts: ['nom-sg'], difficulty: 2, level: 'beginner' },
  { id: 's-054', devanagari: 'एतत् फलं वा आम्रम्?',  iast: 'etat phalaṃ vā āmram?', english: 'Is this a fruit or a mango?', pattern: 'noun-vā-noun', concepts: ['nom-sg'], difficulty: 2, level: 'beginner' },

  // ── Negation with na ─────────────────────────────────────────────────────
  { id: 's-055', devanagari: 'रामः न गच्छति।',       iast: 'rāmaḥ na gacchati.',    english: 'Rama does not go.',         pattern: 'na+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-056', devanagari: 'अहं न खादामि।',        iast: 'ahaṃ na khādāmi.',      english: 'I do not eat.',             pattern: 'na+verb',        concepts: ['nom-sg','pres-1sg'], difficulty: 2, level: 'beginner' },
  { id: 's-057', devanagari: 'सः न वदति।',           iast: 'saḥ na vadati.',        english: 'He does not speak.',        pattern: 'na+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-058', devanagari: 'बालः न पठति।',         iast: 'bālaḥ na paṭhati.',     english: 'The boy does not read.',    pattern: 'na+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── asti / nāsti (is / is not) ────────────────────────────────────────────
  { id: 's-059', devanagari: 'रामः अत्र अस्ति।',     iast: 'rāmaḥ atra asti.',      english: 'Rama is here.',             pattern: 'asti',           concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-060', devanagari: 'ग्रामे नरः अस्ति।',    iast: 'grāme naraḥ asti.',     english: 'There is a man in the village.', pattern: 'asti+loc',  concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-061', devanagari: 'गृहे जलम् अस्ति।',     iast: 'gṛhe jalam asti.',      english: 'There is water in the house.', pattern: 'asti+loc',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-062', devanagari: 'वने सिंहः नास्ति।',    iast: 'vane siṃhaḥ nāsti.',    english: 'There is no lion in the forest.', pattern: 'nāsti+loc', concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-063', devanagari: 'पुस्तकम् अत्र नास्ति।',iast: 'pustakam atra nāsti.',  english: 'The book is not here.',     pattern: 'nāsti',          concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-064', devanagari: 'मार्गे जलं नास्ति।',   iast: 'mārge jalaṃ nāsti.',    english: 'There is no water on the path.', pattern: 'nāsti+loc', concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── kutra (where?) ────────────────────────────────────────────────────────
  { id: 's-065', devanagari: 'त्वं कुत्र गच्छसि?',   iast: 'tvaṃ kutra gacchasi?',  english: 'Where are you going?',      pattern: 'kutra+verb',     concepts: ['nom-sg','pres-2sg'], difficulty: 2, level: 'beginner' },
  { id: 's-066', devanagari: 'गुरुः कुत्र अस्ति?',   iast: 'guruḥ kutra asti?',     english: 'Where is the teacher?',     pattern: 'kutra+asti',     concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-067', devanagari: 'रामः कुत्र वसति?',     iast: 'rāmaḥ kutra vasati?',   english: 'Where does Rama live?',     pattern: 'kutra+verb',     concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-068', devanagari: 'पुस्तकं कुत्र अस्ति?', iast: 'pustakaṃ kutra asti?',  english: 'Where is the book?',        pattern: 'kutra+asti',     concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── tatra / atra  (there / here) ─────────────────────────────────────────
  { id: 's-069', devanagari: 'रामः तत्र अस्ति।',     iast: 'rāmaḥ tatra asti.',     english: 'Rama is there.',            pattern: 'tatra+asti',     concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-070', devanagari: 'गुरुः अत्र तिष्ठति।',  iast: 'guruḥ atra tiṣṭhati.',  english: 'The teacher stands here.',  pattern: 'atra+verb',      concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },

  // ── sarvatra / anyatra (everywhere / elsewhere) ───────────────────────────
  { id: 's-071', devanagari: 'जलं सर्वत्र अस्ति।',   iast: 'jalaṃ sarvatra asti.',  english: 'Water is everywhere.',      pattern: 'sarvatra+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-072', devanagari: 'वृक्षाः सर्वत्र सन्ति।',iast: 'vṛkṣāḥ sarvatra santi.',english: 'Trees are everywhere.',    pattern: 'sarvatra+verb',  concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-073', devanagari: 'बालः अन्यत्र गच्छति।', iast: 'bālaḥ anyatra gacchati.',english: 'The boy goes elsewhere.',   pattern: 'anyatra+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-074', devanagari: 'अहम् अन्यत्र वसामि।',  iast: 'aham anyatra vasāmi.',   english: 'I live elsewhere.',         pattern: 'anyatra+verb',   concepts: ['nom-sg','pres-1sg'], difficulty: 2, level: 'beginner' },

  // ── Animals (moral & Panchatantra vocab) ─────────────────────────────────
  { id: 's-075', devanagari: 'काकः वृक्षे वसति।',      iast: 'kākaḥ vṛkṣe vasati.',      english: 'The crow lives on the tree.',        pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-076', devanagari: 'सिंहः वने वसति।',        iast: 'siṃhaḥ vane vasati.',       english: 'The lion lives in the forest.',      pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-077', devanagari: 'मूषकः बिले वसति।',       iast: 'mūṣakaḥ bile vasati.',      english: 'The mouse lives in a burrow.',       pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-078', devanagari: 'कूर्मः जले वसति।',       iast: 'kūrmaḥ jale vasati.',       english: 'The tortoise lives in the water.',   pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-079', devanagari: 'मर्कटः वृक्षे वसति।',   iast: 'markaṭaḥ vṛkṣe vasati.',    english: 'The monkey lives on the tree.',      pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-080', devanagari: 'ग्राहः नद्यां वसति।',   iast: 'grāhaḥ nadyāṃ vasati.',     english: 'The crocodile lives in the river.',  pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-081', devanagari: 'सर्पः बिले वसति।',       iast: 'sarpaḥ bile vasati.',        english: 'The serpent lives in a burrow.',     pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-082', devanagari: 'श्रृगालः वने धावति।',   iast: 'śṛgālaḥ vane dhāvati.',     english: 'The jackal runs in the forest.',     pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-083', devanagari: 'शशकः शीघ्रं धावति।',   iast: 'śaśakaḥ śīghraṃ dhāvati.',  english: 'The hare runs fast.',               pattern: 'noun+adv+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-084', devanagari: 'कूर्मः शनैः गच्छति।',   iast: 'kūrmaḥ śanaiḥ gacchati.',   english: 'The tortoise goes slowly.',         pattern: 'noun+adv+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── Animals + objects ────────────────────────────────────────────────────
  { id: 's-085', devanagari: 'सिंहः मृगं हन्ति।',     iast: 'siṃhaḥ mṛgaṃ hanti.',      english: 'The lion kills the deer.',          pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-086', devanagari: 'काकः पाषाणं क्षिपति।',  iast: 'kākaḥ pāṣāṇaṃ kṣipati.',   english: 'The crow drops a stone.',           pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-087', devanagari: 'मूषकः जालं कर्तयति।',  iast: 'mūṣakaḥ jālaṃ kartayati.',  english: 'The mouse cuts the net.',           pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-088', devanagari: 'मर्कटः फलं खादति।',    iast: 'markaṭaḥ phalaṃ khādati.',   english: 'The monkey eats the fruit.',        pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-089', devanagari: 'खगः आकाशे पतति।',       iast: 'khagaḥ ākāśe patati.',       english: 'The bird falls in the sky.',        pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-090', devanagari: 'शशकः कूपं पश्यति।',    iast: 'śaśakaḥ kūpaṃ paśyati.',    english: 'The hare looks at the well.',       pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── Virtue & abstract nouns ───────────────────────────────────────────────
  { id: 's-091', devanagari: 'बुद्धिः श्रेष्ठा अस्ति।',  iast: 'buddhiḥ śreṣṭhā asti.',   english: 'Intelligence is supreme.',          pattern: 'noun+adj+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-092', devanagari: 'सत्यं श्रेष्ठं अस्ति।',    iast: 'satyaṃ śreṣṭhaṃ asti.',   english: 'Truth is supreme.',                 pattern: 'noun+adj+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-093', devanagari: 'धर्मः महान् अस्ति।',        iast: 'dharmaḥ mahān asti.',      english: 'Dharma is great.',                  pattern: 'noun+adj+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-094', devanagari: 'लोभः पापम् अस्ति।',         iast: 'lobhaḥ pāpam asti.',       english: 'Greed is a sin.',                   pattern: 'noun+noun+asti',  concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-095', devanagari: 'क्रोधः दुःखाय भवति।',       iast: 'krodhaḥ duḥkhāya bhavati.',english: 'Anger leads to sorrow.',           pattern: 'noun+dat+verb',   concepts: ['nom-sg','dat-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-096', devanagari: 'शान्तिः सुखाय भवति।',       iast: 'śāntiḥ sukhāya bhavati.',  english: 'Peace leads to happiness.',         pattern: 'noun+dat+verb',   concepts: ['nom-sg','dat-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-097', devanagari: 'विनयः ज्ञानाय भवति।',       iast: 'vinayaḥ jñānāya bhavati.', english: 'Humility leads to knowledge.',      pattern: 'noun+dat+verb',   concepts: ['nom-sg','dat-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-098', devanagari: 'परिश्रमः सफलं भवति।',       iast: 'pariśramaḥ saphalaṃ bhavati.', english: 'Hard work becomes fruitful.',   pattern: 'noun+adj+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Moral proverb patterns ────────────────────────────────────────────────
  { id: 's-099', devanagari: 'सत्यम् एव जयते।',           iast: 'satyam eva jayate.',       english: 'Truth alone wins.',                 pattern: 'eva+verb',        concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-100', devanagari: 'बुद्धिः बलात् श्रेष्ठा।',   iast: 'buddhiḥ balāt śreṣṭhā.',  english: 'Intelligence is better than strength.', pattern: 'abl-comparison', concepts: ['nom-sg','abl-sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-101', devanagari: 'असत्यं सदा प्रकाशते।',      iast: 'asatyaṃ sadā prakāśate.',  english: 'Falsehood always comes to light.',  pattern: 'noun+adv+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-102', devanagari: 'लोभः नाशस्य मूलम् अस्ति।', iast: 'lobhaḥ nāśasya mūlam asti.',english: 'Greed is the root of ruin.',       pattern: 'noun+gen+noun+asti',concepts: ['nom-sg','gen-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-103', devanagari: 'परिश्रमस्य फलं मधुरम्।',   iast: 'pariśramasya phalaṃ madhuram.', english: 'The fruit of effort is sweet.',  pattern: 'gen+noun+adj',    concepts: ['gen-sg','nom-sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-104', devanagari: 'क्षमया राज्यं सुखं भवति।',  iast: 'kṣamayā rājyaṃ sukhaṃ bhavati.', english: 'By forgiveness the kingdom becomes happy.', pattern: 'inst+noun+adj+verb', concepts: ['inst-sg','nom-sg','pres-3sg'], difficulty: 4, level: 'intermediate' },

  // ── Friend / enemy / trust ────────────────────────────────────────────────
  { id: 's-105', devanagari: 'सः मम मित्रम् अस्ति।',      iast: 'saḥ mama mitram asti.',     english: 'He is my friend.',                  pattern: 'pronoun+gen+noun+asti', concepts: ['nom-sg','gen-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-106', devanagari: 'सः मम शत्रुः अस्ति।',       iast: 'saḥ mama śatruḥ asti.',     english: 'He is my enemy.',                   pattern: 'pronoun+gen+noun+asti', concepts: ['nom-sg','gen-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-107', devanagari: 'जनाः तं न विश्वसन्ति।',     iast: 'janāḥ taṃ na viśvasanti.',  english: 'People do not trust him.',          pattern: 'na+verb',         concepts: ['nom-pl','acc-sg','pres-3pl'], difficulty: 3, level: 'intermediate' },
  { id: 's-108', devanagari: 'मित्रं सर्वदा रक्षति।',     iast: 'mitraṃ sarvadā rakṣati.',   english: 'A friend always protects.',         pattern: 'noun+adv+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-109', devanagari: 'चतुरः शत्रुं जयति।',        iast: 'caturaḥ śatruṃ jayati.',    english: 'The clever one defeats the enemy.', pattern: 'adj+obj+verb',    concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Helping / giving / saving ─────────────────────────────────────────────
  { id: 's-110', devanagari: 'सः तं रक्षति।',              iast: 'saḥ taṃ rakṣati.',          english: 'He saves him.',                     pattern: 'pronoun+obj+verb',concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-111', devanagari: 'सा तस्मै धनं ददाति।',        iast: 'sā tasmai dhanaṃ dadāti.',  english: 'She gives wealth to him.',          pattern: 'noun+dat+obj+verb',concepts: ['nom-sg','dat-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-112', devanagari: 'बालकः नद्यां तरति।',         iast: 'bālakaḥ nadyāṃ tarati.',    english: 'The boy swims across the river.',   pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-113', devanagari: 'वृद्धः प्रतिदिनं वृक्षान् रोपयति।', iast: 'vṛddhaḥ pratidinaṃ vṛkṣān ropayati.', english: 'The old man plants trees every day.', pattern: 'noun+adv+obj+verb', concepts: ['nom-sg','acc-pl','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-114', devanagari: 'शशकः सर्वान् पशून् रक्षति।', iast: 'śaśakaḥ sarvān paśūn rakṣati.', english: 'The hare saves all the animals.',  pattern: 'noun+obj-pl+verb',concepts: ['nom-sg','acc-pl','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Movement & location ───────────────────────────────────────────────────
  { id: 's-115', devanagari: 'काकः उच्चैः उड्डयते।',      iast: 'kākaḥ uccaiḥ uḍḍayate.',   english: 'The crow flies upward.',            pattern: 'noun+adv+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-116', devanagari: 'सिंहः कूपे पतति।',           iast: 'siṃhaḥ kūpe patati.',       english: 'The lion falls into the well.',     pattern: 'noun+loc+verb',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-117', devanagari: 'मर्कटः वृक्षात् पतति।',     iast: 'markaṭaḥ vṛkṣāt patati.',   english: 'The monkey falls from the tree.',   pattern: 'noun+abl+verb',   concepts: ['nom-sg','abl-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-118', devanagari: 'श्रृगालः वनात् नगरं गच्छति।',iast: 'śṛgālaḥ vanāt nagaraṃ gacchati.', english: 'The jackal goes from the forest to the town.', pattern: 'noun+abl+acc+verb', concepts: ['nom-sg','abl-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Seeing / knowing / saying (new verbs) ─────────────────────────────────
  { id: 's-119', devanagari: 'सिंहः स्वप्रतिबिम्बं पश्यति।', iast: 'siṃhaḥ svapratibimbaṃ paśyati.', english: 'The lion sees his own reflection.', pattern: 'noun+refl-obj+verb', concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-120', devanagari: 'ग्राहः असत्यं वदति।',         iast: 'grāhaḥ asatyaṃ vadati.',    english: 'The crocodile speaks untruth.',     pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-121', devanagari: 'बालकः सत्यं जानाति।',         iast: 'bālakaḥ satyaṃ jānāti.',    english: 'The boy knows the truth.',          pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-122', devanagari: 'शिष्यः गुरुं नमति।',          iast: 'śiṣyaḥ guruṃ namati.',      english: 'The student bows to the teacher.',  pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-123', devanagari: 'राजा मन्त्रिणं शृणोति।',      iast: 'rājā mantriṇaṃ śṛṇoti.',    english: 'The king listens to the minister.', pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Comparative & quality sentences ──────────────────────────────────────
  { id: 's-124', devanagari: 'सः चतुरः अस्ति।',            iast: 'saḥ caturaḥ asti.',          english: 'He is clever.',                     pattern: 'pronoun+adj+asti',concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-125', devanagari: 'सा दयालुः अस्ति।',           iast: 'sā dayāluḥ asti.',           english: 'She is kind.',                      pattern: 'pronoun+adj+asti',concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-126', devanagari: 'बालकः नम्रः अस्ति।',          iast: 'bālakaḥ namraḥ asti.',       english: 'The boy is humble.',                pattern: 'noun+adj+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-127', devanagari: 'राजा क्रुद्धः भवति।',         iast: 'rājā kruddhaḥ bhavati.',     english: 'The king becomes angry.',           pattern: 'noun+adj+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-128', devanagari: 'श्रृगालः नीलः भवति।',        iast: 'śṛgālaḥ nīlaḥ bhavati.',    english: 'The jackal becomes blue.',          pattern: 'noun+adj+verb',   concepts: ['nom-sg','pres-3sg'], difficulty: 2, level: 'beginner' },

  // ── Cages / traps / release ───────────────────────────────────────────────
  { id: 's-129', devanagari: 'सिंहः पञ्जरे अस्ति।',        iast: 'siṃhaḥ pañjare asti.',       english: 'The lion is in the cage.',          pattern: 'noun+loc+asti',   concepts: ['nom-sg','loc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-130', devanagari: 'ब्राह्मणः सिंहं मुञ्चति।',   iast: 'brāhmaṇaḥ siṃhaṃ muñcati.', english: 'The Brahmin releases the lion.',    pattern: 'noun+obj+verb',   concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 2, level: 'beginner' },
  { id: 's-131', devanagari: 'खगः पञ्जरात् मुच्यते।',      iast: 'khagaḥ pañjarāt mucyate.',   english: 'The bird is released from the cage.',pattern: 'noun+abl+pass-verb',concepts: ['nom-sg','abl-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-132', devanagari: 'मूषकः सिंहाय उपकरोति।',      iast: 'mūṣakaḥ siṃhāya upakaroti.',english: 'The mouse helps the lion.',         pattern: 'noun+dat+verb',   concepts: ['nom-sg','dat-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Plural forms (animals / people) ──────────────────────────────────────
  { id: 's-133', devanagari: 'पशवः वने सन्ति।',             iast: 'paśavaḥ vane santi.',        english: 'Animals are in the forest.',        pattern: 'noun-pl+loc+verb',concepts: ['nom-pl','loc-sg','pres-3pl'], difficulty: 2, level: 'beginner' },
  { id: 's-134', devanagari: 'जनाः ग्रामे वसन्ति।',         iast: 'janāḥ grāme vasanti.',       english: 'People live in the village.',       pattern: 'noun-pl+loc+verb',concepts: ['nom-pl','loc-sg','pres-3pl'], difficulty: 2, level: 'beginner' },
  { id: 's-135', devanagari: 'वृक्षाः वने सन्ति।',          iast: 'vṛkṣāḥ vane santi.',         english: 'Trees are in the forest.',          pattern: 'noun-pl+loc+verb',concepts: ['nom-pl','loc-sg','pres-3pl'], difficulty: 2, level: 'beginner' },
  { id: 's-136', devanagari: 'शिष्याः गुरुं नमन्ति।',       iast: 'śiṣyāḥ guruṃ namanti.',     english: 'Students bow to the teacher.',      pattern: 'noun-pl+obj+verb',concepts: ['nom-pl','acc-sg','pres-3pl'], difficulty: 2, level: 'beginner' },
  { id: 's-137', devanagari: 'भृत्याः आभूषणम् अन्विष्यन्ति।', iast: 'bhṛtyāḥ ābhūṣaṇam anviṣyanti.', english: 'Servants search for the jewel.', pattern: 'noun-pl+obj+verb',concepts: ['nom-pl','acc-sg','pres-3pl'], difficulty: 3, level: 'intermediate' },

  // ── Genitive possession ───────────────────────────────────────────────────
  { id: 's-138', devanagari: 'सिंहस्य बलं महत् अस्ति।',    iast: 'siṃhasya balaṃ mahat asti.',english: 'The lion\'s strength is great.',    pattern: 'gen+noun+adj+asti',concepts: ['gen-sg','nom-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-139', devanagari: 'ग्राहस्य भार्या क्रुद्धा अस्ति।', iast: 'grāhasya bhāryā kruddhā asti.', english: 'The crocodile\'s wife is angry.', pattern: 'gen+noun+adj+asti',concepts: ['gen-sg','nom-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-140', devanagari: 'काकस्य हृदयं वृक्षे नास्ति।', iast: 'kākasya hṛdayaṃ vṛkṣe nāsti.', english: 'The crow\'s heart is not on the tree.', pattern: 'gen+noun+loc+nāsti', concepts: ['gen-sg','nom-sg','loc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },
  { id: 's-141', devanagari: 'ब्राह्मणस्य दया महती अस्ति।', iast: 'brāhmaṇasya dayā mahatī asti.', english: 'The Brahmin\'s compassion is great.', pattern: 'gen+noun+adj+asti', concepts: ['gen-sg','nom-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Desire / fear / happiness ─────────────────────────────────────────────
  { id: 's-142', devanagari: 'सः सुखी भवति।',               iast: 'saḥ sukhī bhavati.',         english: 'He becomes happy.',                 pattern: 'pronoun+adj+verb',concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-143', devanagari: 'सा दुःखिता भवति।',            iast: 'sā duḥkhitā bhavati.',       english: 'She becomes sorrowful.',            pattern: 'pronoun+adj+verb',concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-144', devanagari: 'बालकः भीतः अस्ति।',           iast: 'bālakaḥ bhītaḥ asti.',       english: 'The boy is afraid.',                pattern: 'noun+adj+asti',   concepts: ['nom-sg','pres-3sg'], difficulty: 1, level: 'beginner' },
  { id: 's-145', devanagari: 'अहं सत्यं वक्तुम् इच्छामि।',  iast: 'ahaṃ satyaṃ vaktum icchāmi.',english: 'I want to speak the truth.',       pattern: 'inf+desire',      concepts: ['nom-sg','acc-sg','inf','pres-1sg'], difficulty: 4, level: 'advanced' },
  { id: 's-146', devanagari: 'सः स्वातन्त्र्यं इच्छति।',    iast: 'saḥ svātantryaṃ icchati.',  english: 'He desires freedom.',               pattern: 'pronoun+obj+verb',concepts: ['nom-sg','acc-sg','pres-3sg'], difficulty: 3, level: 'intermediate' },

  // ── Advanced: instrumental cause ─────────────────────────────────────────
  { id: 's-147', devanagari: 'बुद्ध्या सिंहः जितः।',        iast: 'buddhyā siṃhaḥ jitaḥ.',     english: 'By intelligence the lion is defeated.', pattern: 'inst-cause+pass',concepts: ['inst-sg','nom-sg'], difficulty: 4, level: 'advanced' },
  { id: 's-148', devanagari: 'लोभेन नाशः भवति।',            iast: 'lobhena nāśaḥ bhavati.',    english: 'Through greed, ruin comes.',        pattern: 'inst-cause+verb', concepts: ['inst-sg','nom-sg','pres-3sg'], difficulty: 4, level: 'advanced' },
  { id: 's-149', devanagari: 'परिश्रमेण विद्या लभ्यते।',    iast: 'pariśrameṇa vidyā labhyate.',english: 'Through effort, knowledge is gained.', pattern: 'inst-cause+pass',concepts: ['inst-sg','nom-sg','pres-3sg'], difficulty: 4, level: 'advanced' },
  { id: 's-150', devanagari: 'उपकारस्य अपकारः पापम् अस्ति।',iast: 'upakārasya apakāraḥ pāpam asti.', english: 'Ingratitude for a good deed is a sin.', pattern: 'gen+noun+noun+asti', concepts: ['gen-sg','nom-sg','pres-3sg'], difficulty: 4, level: 'advanced' },
]

// Fill-in-the-blank questions
export const FILL_BLANKS = [
  { id: 'f-001', template: 'रामः _____ ।',   blank: 'गच्छति', hint: 'Rama ___ (goes)',  options: ['गच्छति','खादति','पश्यति','वदति'], concepts: ['pres-3sg'], level: 'beginner' },
  { id: 'f-002', template: 'अहं _____ ।',    blank: 'गच्छामि',hint: 'I ___',           options: ['गच्छामि','गच्छसि','गच्छति','गच्छन्ति'], concepts: ['pres-1sg'], level: 'beginner' },
  { id: 'f-003', template: 'त्वं _____ ।',   blank: 'खादसि',  hint: 'You eat',         options: ['खादसि','खादामि','खादति','खादन्ति'], concepts: ['pres-2sg'], level: 'beginner' },
  { id: 'f-004', template: 'नरः फलं _____ ।',blank: 'खादति',  hint: 'The man eats ___',options: ['खादति','गच्छति','पश्यति','वदति'], concepts: ['pres-3sg','acc-sg'], level: 'beginner' },
  { id: 'f-005', template: 'सः ___ं पश्यति।',blank: 'बाल',    hint: '___ (the boy, acc)',options: ['बालं','बालः','बाले','बालाय'], concepts: ['acc-sg'], level: 'beginner' },
  { id: 'f-006', template: 'बालः _____ खेलति।', blank: 'ग्रामे', hint: 'The boy plays in the ___', options: ['ग्रामे','ग्रामं','ग्रामः','ग्रामात्'], concepts: ['loc-sg'], level: 'intermediate' },
  { id: 'f-007', template: 'तस्मै _____ ददाति।', blank: 'फलं', hint: 'Gives a fruit ___ to him', options: ['फलं','फलः','फले','फलाय'], concepts: ['dat-sg','acc-sg'], level: 'intermediate' },
  { id: 'f-008', template: 'गुरुः शिष्यं _____ ।', blank: 'पाठयति', hint: 'Teacher makes student ___', options: ['पाठयति','पठति','पाठते','पाठयन्ति'], concepts: ['causative'], level: 'advanced' },

  // ── More beginner: basic verbs & nominatives ─────────────────────────────
  { id: 'f-009', template: 'सीता _____ ।',         blank: 'हसति',   hint: 'Sita laughs',            options: ['हसति','हसामि','हससि','हसन्ति'],       concepts: ['pres-3sg'],          level: 'beginner' },
  { id: 'f-010', template: 'वयं _____ ।',          blank: 'पठामः',  hint: 'We read',                options: ['पठामः','पठामि','पठथ','पठन्ति'],       concepts: ['pres-1pl'],          level: 'beginner' },
  { id: 'f-011', template: 'युयं _____ ।',         blank: 'खेलथ',   hint: 'You (pl) play',          options: ['खेलथ','खेलामि','खेलति','खेलन्ति'],    concepts: ['pres-2pl'],          level: 'beginner' },
  { id: 'f-012', template: 'ते _____ ।',           blank: 'धावन्ति',hint: 'They run',               options: ['धावन्ति','धावति','धावामि','धावथ'],    concepts: ['pres-3pl'],          level: 'beginner' },
  { id: 'f-013', template: 'बालः _____ पिबति।',   blank: 'जलं',    hint: 'The boy drinks ___',     options: ['जलं','जलः','जले','जलात्'],             concepts: ['acc-sg'],            level: 'beginner' },
  { id: 'f-014', template: 'गजः _____ खादति।',    blank: 'फलानि',  hint: 'Elephant eats ___ (pl)', options: ['फलानि','फलं','फलः','फलाय'],            concepts: ['acc-pl'],            level: 'beginner' },
  { id: 'f-015', template: '_____ नमः।',           blank: 'गुरवे',  hint: 'Salutation ___ the teacher', options: ['गुरवे','गुरुः','गुरुं','गुरौ'],   concepts: ['dat-sg'],            level: 'beginner' },
  { id: 'f-016', template: 'सः _____ अस्ति।',     blank: 'बालः',   hint: 'He is a ___',            options: ['बालः','बालं','बाले','बालाय'],          concepts: ['nom-sg'],            level: 'beginner' },
  { id: 'f-017', template: 'अहं _____ वदामि।',    blank: 'सत्यं',  hint: 'I speak the ___',        options: ['सत्यं','सत्यः','सत्ये','सत्यात्'],    concepts: ['acc-sg'],            level: 'beginner' },
  { id: 'f-018', template: 'कः _____ ?',           blank: 'त्वम्', hint: 'Who ___ you?',            options: ['त्वम्','अहम्','सः','ते'],              concepts: ['nom-sg'],            level: 'beginner' },

  // ── Intermediate: cases, tense, pronouns ────────────────────────────────
  { id: 'f-019', template: 'रामः _____ गच्छति।',  blank: 'ग्रामं',  hint: 'Rama goes ___ the village (acc)', options: ['ग्रामं','ग्रामे','ग्रामाय','ग्रामात्'], concepts: ['acc-sg'],   level: 'intermediate' },
  { id: 'f-020', template: 'गुरोः _____ श्रृणोति।', blank: 'वाचं',hint: 'Hears the teacher\'s ___', options: ['वाचं','वाचः','वाचे','वाचा'],          concepts: ['acc-sg','gen-sg'],   level: 'intermediate' },
  { id: 'f-021', template: 'नदीं _____ तरति।',    blank: 'नरः',    hint: '___ crosses the river',   options: ['नरः','नरं','नरे','नराय'],              concepts: ['nom-sg'],            level: 'intermediate' },
  { id: 'f-022', template: 'सः _____ आगच्छति।',   blank: 'ग्रामात्', hint: 'He comes ___ the village (abl)', options: ['ग्रामात्','ग्रामं','ग्रामे','ग्रामाय'], concepts: ['abl-sg'], level: 'intermediate' },
  { id: 'f-023', template: 'माता _____ स्नेहं ददाति।', blank: 'पुत्राय', hint: 'Mother gives love ___ son (dat)', options: ['पुत्राय','पुत्रं','पुत्रः','पुत्रात्'], concepts: ['dat-sg'], level: 'intermediate' },
  { id: 'f-024', template: 'वृक्षस्य _____ पतति।', blank: 'पत्रं', hint: 'The ___ of the tree falls', options: ['पत्रं','पत्रः','पत्रे','पत्राय'],     concepts: ['gen-sg','nom-sg'],   level: 'intermediate' },
  { id: 'f-025', template: 'बालाः _____ क्रीडन्ति।', blank: 'क्षेत्रे', hint: 'Boys play in the ___', options: ['क्षेत्रे','क्षेत्रं','क्षेत्रात्','क्षेत्राय'], concepts: ['loc-sg'], level: 'intermediate' },
  { id: 'f-026', template: 'अहं तेन _____ लिखामि।', blank: 'लेखन्या', hint: 'I write with ___', options: ['लेखन्या','लेखनी','लेखनीं','लेखन्यै'],   concepts: ['inst-sg'],           level: 'intermediate' },
  { id: 'f-027', template: 'रामः कालिदासेन _____ ।', blank: 'वन्द्यते', hint: 'Rama is praised ___ Kalidasa', options: ['वन्द्यते','वन्दते','वन्दति','वन्द्यन्ते'], concepts: ['passive'], level: 'intermediate' },
  { id: 'f-028', template: 'कृष्णः _____ गायति।',  blank: 'मधुरं',  hint: 'Krishna sings ___',      options: ['मधुरं','मधुरः','मधुरे','मधुरात्'],    concepts: ['adverb'],            level: 'intermediate' },
  { id: 'f-029', template: 'सा _____ सुन्दरी।',    blank: 'अतिव',   hint: 'She is ___ beautiful',   options: ['अतिव','किञ्चित्','न','सर्वदा'],       concepts: ['adverb'],            level: 'intermediate' },
  { id: 'f-030', template: 'बालः _____ श्रान्तः।', blank: 'अतिव',   hint: 'Boy is ___ tired',       options: ['अतिव','न','सदा','कदाचित्'],            concepts: ['adverb'],            level: 'intermediate' },
  { id: 'f-031', template: 'जलं _____ वहति।',      blank: 'नदी',    hint: '___ carries water',      options: ['नदी','नदीं','नद्याः','नद्यां'],       concepts: ['nom-sg'],            level: 'intermediate' },
  { id: 'f-032', template: 'तस्याः _____ मधुरम्।', blank: 'स्वरः', hint: 'Her ___ is sweet',        options: ['स्वरः','स्वरं','स्वरे','स्वराय'],     concepts: ['nom-sg','gen-sg'],   level: 'intermediate' },

  // ── Past tense ────────────────────────────────────────────────────────────
  { id: 'f-033', template: 'रामः _____ ।',         blank: 'अगच्छत्', hint: 'Rama went (past)',       options: ['अगच्छत्','गच्छति','गमिष्यति','गच्छतु'], concepts: ['past-3sg'],        level: 'intermediate' },
  { id: 'f-034', template: 'अहं ग्रामं _____ ।',  blank: 'अगच्छम्', hint: 'I went to village',      options: ['अगच्छम्','गच्छामि','गमिष्यामि','गच्छेयम्'], concepts: ['past-1sg'],    level: 'intermediate' },
  { id: 'f-035', template: 'बालाः _____ ।',        blank: 'अखेलन्', hint: 'Boys played (past)',      options: ['अखेलन्','खेलन्ति','खेलिष्यन्ति','खेलेयुः'], concepts: ['past-3pl'],   level: 'intermediate' },

  // ── Future tense ──────────────────────────────────────────────────────────
  { id: 'f-036', template: 'सः श्वः _____ ।',     blank: 'गमिष्यति', hint: 'He will go tomorrow',   options: ['गमिष्यति','गच्छति','अगच्छत्','गच्छतु'], concepts: ['future-3sg'],     level: 'intermediate' },
  { id: 'f-037', template: 'अहं _____ पठिष्यामि।', blank: 'श्वः',   hint: '___ I will study',       options: ['श्वः','ह्यः','अधुना','सर्वदा'],       concepts: ['future-1sg'],        level: 'intermediate' },

  // ── Advanced: compounds, optative, imperatives ───────────────────────────
  { id: 'f-038', template: 'त्वं _____ ।',         blank: 'पठ',     hint: 'You read! (imperative)', options: ['पठ','पठसि','पठति','पठामि'],            concepts: ['imperative'],        level: 'advanced' },
  { id: 'f-039', template: 'सः सुखेन _____ ।',    blank: 'जीवेत्', hint: 'May he live happily (optative)', options: ['जीवेत्','जीवति','अजीवत्','जीविष्यति'], concepts: ['optative'], level: 'advanced' },
  { id: 'f-040', template: '_____ कार्यम्।',       blank: 'धर्मेण', hint: 'Act ___ righteousness',   options: ['धर्मेण','धर्मः','धर्मं','धर्माय'],    concepts: ['inst-sg'],           level: 'advanced' },
  { id: 'f-041', template: 'ज्ञानं _____ बलम्।',  blank: 'एव',     hint: 'Knowledge ___ is power',  options: ['एव','अपि','च','वा'],                  concepts: ['particle'],          level: 'advanced' },
  { id: 'f-042', template: 'राज्ञः _____ न क्षमते।', blank: 'क्रोधः', hint: '___\'s anger is not forgivable', options: ['क्रोधः','क्रोधं','क्रोधे','क्रोधाय'], concepts: ['gen-sg','nom-sg'], level: 'advanced' },
  { id: 'f-043', template: 'सत्यं _____ जयते।',   blank: 'एव',     hint: 'Truth ___ prevails',      options: ['एव','अपि','वा','च'],                  concepts: ['particle'],          level: 'advanced' },
  { id: 'f-044', template: 'योगः _____ कौशलम्।',  blank: 'कर्मसु', hint: 'Yoga is skill ___ actions', options: ['कर्मसु','कर्म','कर्मणः','कर्मणा'],  concepts: ['loc-pl'],            level: 'advanced' },
  { id: 'f-045', template: 'अहं _____ स्मि।',     blank: 'ब्रह्म', hint: 'I am ___',                options: ['ब्रह्म','ब्रह्मणः','ब्रह्मणे','ब्रह्मणा'], concepts: ['nom-sg'],     level: 'advanced' },
  { id: 'f-046', template: 'मनः _____ चञ्चलं अस्ति।', blank: 'अतिव', hint: 'Mind is ___ restless',  options: ['अतिव','किञ्चित्','न','सदा'],          concepts: ['adverb'],            level: 'advanced' },
  { id: 'f-047', template: 'सः _____ कृत्वा गच्छति।', blank: 'नमस्कारं', hint: 'He goes having done ___', options: ['नमस्कारं','नमस्कारः','नमस्काराय','नमस्कारे'], concepts: ['absolutive'], level: 'advanced' },
  { id: 'f-048', template: 'विद्या _____ विनाशयति।', blank: 'अज्ञानं', hint: 'Knowledge destroys ___', options: ['अज्ञानं','अज्ञानः','अज्ञाने','अज्ञानात्'], concepts: ['acc-sg'],    level: 'advanced' },
  { id: 'f-049', template: 'धर्मः _____ रक्षति।', blank: 'धार्मिकान्', hint: 'Dharma protects the ___', options: ['धार्मिकान्','धार्मिकः','धार्मिके','धार्मिकाय'], concepts: ['acc-pl'], level: 'advanced' },
  { id: 'f-050', template: 'सर्वे _____ भवन्तु।', blank: 'सुखिनः', hint: 'May all be ___',           options: ['सुखिनः','सुखं','सुखे','सुखिनाम्'],    concepts: ['optative','nom-pl'], level: 'advanced' },
]

// Story sessions — each sentence has word-by-word glosses for interlinear display
