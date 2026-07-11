// Sanskrit Grammar lessons — structured, progressive learning

export const PRONOUNS = [
  { person: '3rd', en: 'he / she',  sg: { dev: 'सः / सा',   iast: 'saḥ / sā'  }, du: { dev: 'तौ / ते',   iast: 'tau / te'   }, pl: { dev: 'ते / ताः',  iast: 'te / tāḥ'  } },
  { person: '2nd', en: 'you',       sg: { dev: 'त्वम्',      iast: 'tvam'       }, du: { dev: 'युवाम्',    iast: 'yuvām'      }, pl: { dev: 'यूयम्',     iast: 'yūyam'     } },
  { person: '1st', en: 'I / we',    sg: { dev: 'अहम्',       iast: 'aham'       }, du: { dev: 'आवाम्',     iast: 'āvām'       }, pl: { dev: 'वयम्',      iast: 'vayam'     } },
]

export const ENDINGS = {
  present: [
    { person: '3rd', sg: '-ति  -ti', du: '-तः  -taḥ', pl: '-न्ति  -nti' },
    { person: '2nd', sg: '-सि  -si', du: '-थः  -thaḥ', pl: '-थ  -tha' },
    { person: '1st', sg: '-मि  -mi', du: '-वः  -vaḥ',  pl: '-मः  -maḥ' },
  ],
}

// Each verb: root, meaning, stem, and 9 conjugated forms
export const VERBS = [
  {
    id: 'path',
    root: '√पठ्',
    rootIast: '√paṭh',
    meaning: 'to read / study',
    stem: 'पठ',
    stemIast: 'paṭha',
    class: 1,
    forms: {
      // [dev, iast, english]
      p3sg: ['पठति',   'paṭhati',   'he/she reads'],
      p3du: ['पठतः',   'paṭhataḥ',  'they two read'],
      p3pl: ['पठन्ति',  'paṭhanti',  'they read'],
      p2sg: ['पठसि',   'paṭhasi',   'you read'],
      p2du: ['पठथः',   'paṭhathaḥ', 'you two read'],
      p2pl: ['पठथ',    'paṭhatha',  'you all read'],
      p1sg: ['पठामि',  'paṭhāmi',   'I read'],
      p1du: ['पठावः',  'paṭhāvaḥ',  'we two read'],
      p1pl: ['पठामः',  'paṭhāmaḥ',  'we read'],
    },
    negForms: {
      p3sg: ['न पठति',  'na paṭhati',  'he/she does not read'],
      p2sg: ['न पठसि',  'na paṭhasi',  'you do not read'],
      p1sg: ['न पठामि', 'na paṭhāmi',  'I do not read'],
      p3pl: ['न पठन्ति', 'na paṭhanti', 'they do not read'],
    },
  },
  {
    id: 'likh',
    root: '√लिख्',
    rootIast: '√likh',
    meaning: 'to write',
    stem: 'लिख',
    stemIast: 'likha',
    class: 1,
    forms: {
      p3sg: ['लिखति',  'likhati',   'he/she writes'],
      p3du: ['लिखतः',  'likhataḥ',  'they two write'],
      p3pl: ['लिखन्ति', 'likhanti',  'they write'],
      p2sg: ['लिखसि',  'likhasi',   'you write'],
      p2du: ['लिखथः',  'likhathaḥ', 'you two write'],
      p2pl: ['लिखथ',   'likhatha',  'you all write'],
      p1sg: ['लिखामि', 'likhāmi',   'I write'],
      p1du: ['लिखावः', 'likhāvaḥ',  'we two write'],
      p1pl: ['लिखामः', 'likhāmaḥ',  'we write'],
    },
    negForms: {
      p3sg: ['न लिखति',  'na likhati',  'he/she does not write'],
      p2sg: ['न लिखसि',  'na likhasi',  'you do not write'],
      p1sg: ['न लिखामि', 'na likhāmi',  'I do not write'],
      p3pl: ['न लिखन्ति', 'na likhanti', 'they do not write'],
    },
  },
  {
    id: 'vad',
    root: '√वद्',
    rootIast: '√vad',
    meaning: 'to speak / say',
    stem: 'वद',
    stemIast: 'vada',
    class: 1,
    forms: {
      p3sg: ['वदति',  'vadati',   'he/she speaks'],
      p3du: ['वदतः',  'vadataḥ',  'they two speak'],
      p3pl: ['वदन्ति', 'vadanti',  'they speak'],
      p2sg: ['वदसि',  'vadasi',   'you speak'],
      p2du: ['वदथः',  'vadathaḥ', 'you two speak'],
      p2pl: ['वदथ',   'vadatha',  'you all speak'],
      p1sg: ['वदामि', 'vadāmi',   'I speak'],
      p1du: ['वदावः', 'vadāvaḥ',  'we two speak'],
      p1pl: ['वदामः', 'vadāmaḥ',  'we speak'],
    },
    negForms: {
      p3sg: ['न वदति',  'na vadati',  'he/she does not speak'],
      p2sg: ['न वदसि',  'na vadasi',  'you do not speak'],
      p1sg: ['न वदामि', 'na vadāmi',  'I do not speak'],
      p3pl: ['न वदन्ति', 'na vadanti', 'they do not speak'],
    },
  },
  {
    id: 'gam',
    root: '√गम्',
    rootIast: '√gam',
    meaning: 'to go',
    stem: 'गच्छ',
    stemIast: 'gaccha',
    class: 1,
    note: 'Root √gam changes its stem to गच्छ (gaccha) in the present tense — a common irregularity.',
    forms: {
      p3sg: ['गच्छति',  'gacchati',   'he/she goes'],
      p3du: ['गच्छतः',  'gacchataḥ',  'they two go'],
      p3pl: ['गच्छन्ति', 'gacchanti',  'they go'],
      p2sg: ['गच्छसि',  'gacchasi',   'you go'],
      p2du: ['गच्छथः',  'gacchathaḥ', 'you two go'],
      p2pl: ['गच्छथ',   'gacchatha',  'you all go'],
      p1sg: ['गच्छामि', 'gacchāmi',   'I go'],
      p1du: ['गच्छावः', 'gacchāvaḥ',  'we two go'],
      p1pl: ['गच्छामः', 'gacchāmaḥ',  'we go'],
    },
    negForms: {
      p3sg: ['न गच्छति',  'na gacchati',  'he/she does not go'],
      p2sg: ['न गच्छसि',  'na gacchasi',  'you do not go'],
      p1sg: ['न गच्छामि', 'na gacchāmi',  'I do not go'],
      p3pl: ['न गच्छन्ति', 'na gacchanti', 'they do not go'],
    },
  },
  {
    id: 'khad',
    root: '√खाद्',
    rootIast: '√khād',
    meaning: 'to eat',
    stem: 'खाद',
    stemIast: 'khāda',
    class: 1,
    forms: {
      p3sg: ['खादति',  'khādati',   'he/she eats'],
      p3du: ['खादतः',  'khādataḥ',  'they two eat'],
      p3pl: ['खादन्ति', 'khādanti',  'they eat'],
      p2sg: ['खादसि',  'khādasi',   'you eat'],
      p2du: ['खादथः',  'khādathaḥ', 'you two eat'],
      p2pl: ['खादथ',   'khādatha',  'you all eat'],
      p1sg: ['खादामि', 'khādāmi',   'I eat'],
      p1du: ['खादावः', 'khādāvaḥ',  'we two eat'],
      p1pl: ['खादामः', 'khādāmaḥ',  'we eat'],
    },
    negForms: {
      p3sg: ['न खादति',  'na khādati',  'he/she does not eat'],
      p2sg: ['न खादसि',  'na khādasi',  'you do not eat'],
      p1sg: ['न खादामि', 'na khādāmi',  'I do not eat'],
      p3pl: ['न खादन्ति', 'na khādanti', 'they do not eat'],
    },
  },
  {
    id: 'pashya',
    root: '√दृश्',
    rootIast: '√dṛś',
    meaning: 'to see',
    stem: 'पश्य',
    stemIast: 'paśya',
    class: 1,
    note: 'Root √dṛś uses the stem पश्य (paśya) in present tense — memorise as a set pair.',
    forms: {
      p3sg: ['पश्यति',  'paśyati',   'he/she sees'],
      p3du: ['पश्यतः',  'paśyataḥ',  'they two see'],
      p3pl: ['पश्यन्ति', 'paśyanti',  'they see'],
      p2sg: ['पश्यसि',  'paśyasi',   'you see'],
      p2du: ['पश्यथः',  'paśyathaḥ', 'you two see'],
      p2pl: ['पश्यथ',   'paśyatha',  'you all see'],
      p1sg: ['पश्यामि', 'paśyāmi',   'I see'],
      p1du: ['पश्यावः', 'paśyāvaḥ',  'we two see'],
      p1pl: ['पश्यामः', 'paśyāmaḥ',  'we see'],
    },
    negForms: {
      p3sg: ['न पश्यति',  'na paśyati',  'he/she does not see'],
      p2sg: ['न पश्यसि',  'na paśyasi',  'you do not see'],
      p1sg: ['न पश्यामि', 'na paśyāmi',  'I do not see'],
      p3pl: ['न पश्यन्ति', 'na paśyanti', 'they do not see'],
    },
  },
]

// Common nouns (with accusative for object sentences)
export const NOUNS = [
  { dev: 'पुस्तकम्', iast: 'pustakam', en: 'book',   acc: { dev: 'पुस्तकम्', iast: 'pustakam' } },
  { dev: 'फलम्',    iast: 'phalam',   en: 'fruit',   acc: { dev: 'फलम्',    iast: 'phalam'   } },
  { dev: 'जलम्',    iast: 'jalam',    en: 'water',   acc: { dev: 'जलम्',    iast: 'jalam'    } },
  { dev: 'गृहम्',   iast: 'gṛham',   en: 'house',   acc: { dev: 'गृहम्',   iast: 'gṛham'   } },
  { dev: 'भोजनम्',  iast: 'bhojanam', en: 'food',    acc: { dev: 'भोजनम्',  iast: 'bhojanam' } },
  { dev: 'पत्रम्',  iast: 'patram',   en: 'letter',  acc: { dev: 'पत्रम्',  iast: 'patram'   } },
  { dev: 'सत्यम्',  iast: 'satyam',   en: 'truth',   acc: { dev: 'सत्यम्',  iast: 'satyam'   } },
  { dev: 'वनम्',    iast: 'vanam',    en: 'forest',  acc: { dev: 'वनम्',    iast: 'vanam'    } },
  { dev: 'विद्यालयम्', iast: 'vidyālayam', en: 'school', acc: { dev: 'विद्यालयम्', iast: 'vidyālayam' } },
  { dev: 'मोदकम्',  iast: 'modakam',  en: 'sweet',   acc: { dev: 'मोदकम्',  iast: 'modakam'  } },
]

// Structured lessons
export const LESSONS = [
  {
    id: 'pronouns',
    title: 'Pronouns',
    titleDev: 'सर्वनामानि',
    icon: '👤',
    summary: 'Sanskrit has 3 persons × 3 numbers = 9 pronoun slots',
    type: 'pronouns',
  },
  {
    id: 'endings',
    title: 'Present Tense Endings',
    titleDev: 'लट् विभक्ति',
    icon: '🔤',
    summary: 'The 9 endings that attach to every Class 1 verb stem',
    type: 'endings',
  },
  {
    id: 'verbs',
    title: 'Verb Conjugations',
    titleDev: 'धातु रूपाणि',
    icon: '📋',
    summary: '6 common verbs fully conjugated — read, write, speak, go, eat, see',
    type: 'verbs',
  },
  {
    id: 'negative',
    title: 'Negative Sentences',
    titleDev: 'निषेध वाक्यानि',
    icon: '🚫',
    summary: 'Adding न (na) before the verb to negate — "does not read"',
    type: 'negative',
  },
  {
    id: 'objects',
    title: 'Object + Verb Sentences',
    titleDev: 'कर्म + क्रिया',
    icon: '📝',
    summary: 'Subject · Object · Verb word order with accusative nouns',
    type: 'objects',
  },
  {
    id: 'qa',
    title: 'Question & Answer',
    titleDev: 'प्रश्न उत्तर',
    icon: '❓',
    summary: 'Asking and answering using किम् (kim), कुत्र (kutra), कः (kaḥ)',
    type: 'qa',
  },
]

// Q&A pairs
export const QA_PAIRS = [
  {
    q:    { dev: 'त्वम् किम् पठसि?',          iast: 'tvam kim paṭhasi?',         en: 'What do you read?' },
    a:    { dev: 'अहम् पुस्तकम् पठामि।',       iast: 'aham pustakam paṭhāmi.',    en: 'I read a book.' },
    neg:  { dev: 'अहम् पत्रम् न पठामि।',       iast: 'aham patram na paṭhāmi.',   en: 'I do not read a letter.' },
  },
  {
    q:    { dev: 'सः कुत्र गच्छति?',           iast: 'saḥ kutra gacchati?',       en: 'Where does he go?' },
    a:    { dev: 'सः विद्यालयम् गच्छति।',       iast: 'saḥ vidyālayam gacchati.',  en: 'He goes to school.' },
    neg:  { dev: 'सः वनम् न गच्छति।',           iast: 'saḥ vanam na gacchati.',    en: 'He does not go to the forest.' },
  },
  {
    q:    { dev: 'त्वम् किम् खादसि?',           iast: 'tvam kim khādasi?',         en: 'What do you eat?' },
    a:    { dev: 'अहम् फलम् खादामि।',           iast: 'aham phalam khādāmi.',      en: 'I eat fruit.' },
    neg:  { dev: 'अहम् मोदकम् न खादामि।',       iast: 'aham modakam na khādāmi.',  en: 'I do not eat sweets.' },
  },
  {
    q:    { dev: 'सा किम् लिखति?',              iast: 'sā kim likhati?',            en: 'What does she write?' },
    a:    { dev: 'सा पत्रम् लिखति।',             iast: 'sā patram likhati.',         en: 'She writes a letter.' },
    neg:  { dev: 'सा पुस्तकम् न लिखति।',         iast: 'sā pustakam na likhati.',    en: 'She does not write a book.' },
  },
  {
    q:    { dev: 'त्वम् किम् वदसि?',             iast: 'tvam kim vadasi?',           en: 'What do you say?' },
    a:    { dev: 'अहम् सत्यम् वदामि।',            iast: 'aham satyam vadāmi.',        en: 'I speak the truth.' },
    neg:  { dev: 'अहम् असत्यम् न वदामि।',         iast: 'aham asatyam na vadāmi.',    en: 'I do not speak falsehood.' },
  },
  {
    q:    { dev: 'ते किम् पश्यन्ति?',             iast: 'te kim paśyanti?',           en: 'What do they see?' },
    a:    { dev: 'ते वनम् पश्यन्ति।',              iast: 'te vanam paśyanti.',         en: 'They see the forest.' },
    neg:  { dev: 'ते गृहम् न पश्यन्ति।',           iast: 'te gṛham na paśyanti.',      en: 'They do not see the house.' },
  },
  {
    q:    { dev: 'कः पठति?',                     iast: 'kaḥ paṭhati?',              en: 'Who reads?' },
    a:    { dev: 'बालकः पठति।',                   iast: 'bālakaḥ paṭhati.',          en: 'The boy reads.' },
    neg:  { dev: 'बालिका न पठति।',                iast: 'bālikā na paṭhati.',         en: 'The girl does not read.' },
  },
  {
    q:    { dev: 'वयम् किम् खादामः?',              iast: 'vayam kim khādāmaḥ?',        en: 'What do we eat?' },
    a:    { dev: 'वयम् भोजनम् खादामः।',             iast: 'vayam bhojanam khādāmaḥ.',  en: 'We eat food.' },
    neg:  { dev: 'वयम् जलम् न खादामः।',             iast: 'vayam jalam na khādāmaḥ.',  en: 'We do not eat water.' },
  },
]

// Object + Verb sentence patterns
export const OBJ_VERB_SENTENCES = [
  {
    subject: { dev: 'अहम्',    iast: 'aham',    en: 'I'    },
    object:  { dev: 'पुस्तकम्', iast: 'pustakam', en: 'book' },
    verb:    { dev: 'पठामि',   iast: 'paṭhāmi',  en: 'read' },
    full:    { dev: 'अहम् पुस्तकम् पठामि।',   iast: 'aham pustakam paṭhāmi.',   en: 'I read a book.' },
  },
  {
    subject: { dev: 'सः',      iast: 'saḥ',      en: 'He'   },
    object:  { dev: 'फलम्',    iast: 'phalam',   en: 'fruit' },
    verb:    { dev: 'खादति',   iast: 'khādati',  en: 'eats' },
    full:    { dev: 'सः फलम् खादति।',          iast: 'saḥ phalam khādati.',      en: 'He eats fruit.' },
  },
  {
    subject: { dev: 'सा',      iast: 'sā',       en: 'She'  },
    object:  { dev: 'पत्रम्',   iast: 'patram',   en: 'letter' },
    verb:    { dev: 'लिखति',   iast: 'likhati',  en: 'writes' },
    full:    { dev: 'सा पत्रम् लिखति।',         iast: 'sā patram likhati.',       en: 'She writes a letter.' },
  },
  {
    subject: { dev: 'त्वम्',    iast: 'tvam',     en: 'You'  },
    object:  { dev: 'सत्यम्',   iast: 'satyam',   en: 'truth' },
    verb:    { dev: 'वदसि',    iast: 'vadasi',   en: 'speak' },
    full:    { dev: 'त्वम् सत्यम् वदसि।',        iast: 'tvam satyam vadasi.',      en: 'You speak the truth.' },
  },
  {
    subject: { dev: 'वयम्',    iast: 'vayam',    en: 'We'   },
    object:  { dev: 'विद्यालयम्', iast: 'vidyālayam', en: 'school' },
    verb:    { dev: 'गच्छामः', iast: 'gacchāmaḥ', en: 'go'  },
    full:    { dev: 'वयम् विद्यालयम् गच्छामः।',  iast: 'vayam vidyālayam gacchāmaḥ.', en: 'We go to school.' },
  },
  {
    subject: { dev: 'ते',      iast: 'te',       en: 'They' },
    object:  { dev: 'वनम्',    iast: 'vanam',    en: 'forest' },
    verb:    { dev: 'पश्यन्ति', iast: 'paśyanti', en: 'see'  },
    full:    { dev: 'ते वनम् पश्यन्ति।',          iast: 'te vanam paśyanti.',       en: 'They see the forest.' },
  },
  {
    subject: { dev: 'यूयम्',   iast: 'yūyam',    en: 'You all' },
    object:  { dev: 'भोजनम्',  iast: 'bhojanam', en: 'food' },
    verb:    { dev: 'खादथ',    iast: 'khādatha', en: 'eat'  },
    full:    { dev: 'यूयम् भोजनम् खादथ।',         iast: 'yūyam bhojanam khādatha.',  en: 'You all eat food.' },
  },
  {
    subject: { dev: 'बालकः',   iast: 'bālakaḥ',  en: 'The boy' },
    object:  { dev: 'जलम्',    iast: 'jalam',    en: 'water' },
    verb:    { dev: 'पश्यति',   iast: 'paśyati',  en: 'sees' },
    full:    { dev: 'बालकः जलम् पश्यति।',         iast: 'bālakaḥ jalam paśyati.',   en: 'The boy sees water.' },
  },
]
