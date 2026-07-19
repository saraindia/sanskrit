// SVG stroke paths for Devanagari alphabet
// ViewBox: 0 0 100 110  |  Shirorékha: y=28  |  Baseline: y=82  |  Center: x=50
// Each entry is an array of SVG path strings, one per stroke, in writing order.
// pathLength="1" is applied at render time so stroke-dashoffset animation is normalized.

export const STROKE_PATHS = {

  // ──────────────────────────────────────────────────────────────────────────
  // VOWELS  (स्वर)
  // ──────────────────────────────────────────────────────────────────────────

  'a-01': [ // अ  (a)  — 3 strokes
    // 1. Body loop: counter-clockwise starting from top-centre, swings left, down, right and back up
    "M 52,32 C 44,32 28,42 26,58 C 24,74 36,82 52,78 C 66,74 74,62 70,50 C 66,38 58,30 52,32",
    // 2. Right vertical bar dropping straight down
    "M 68,28 L 68,82",
    // 3. Shirorékha — left to right across top
    "M 16,28 L 84,28",
  ],

  'a-02': [ // आ  (ā)  — 4 strokes
    // 1. Body loop (shifted left to make room for extra right stem)
    "M 46,32 C 38,32 24,42 22,58 C 20,74 32,82 48,78 C 62,74 70,62 66,50 C 62,38 54,30 46,32",
    // 2. Inner-right vertical
    "M 64,28 L 64,82",
    // 3. Outer-right vertical with small foot
    "M 74,28 L 74,82 Q 74,90 66,88",
    // 4. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-03': [ // इ  (i)  — 2 strokes
    // 1. Body: starts top-right, arcs left/down/around, ends roughly centre-right
    "M 56,32 C 66,40 72,54 68,68 C 64,80 50,86 36,80 C 24,74 22,62 28,52 C 34,42 46,34 56,32",
    // 2. Shirorékha
    "M 20,28 L 80,28",
  ],

  'a-04': [ // ई  (ī)  — 3 strokes
    // 1. Body (like इ, slightly left-shifted)
    "M 50,32 C 60,40 66,54 62,68 C 58,80 44,86 30,80 C 18,74 16,62 22,52 C 28,42 40,34 50,32",
    // 2. Shirorékha
    "M 20,28 L 80,28",
    // 3. Right elongated hook
    "M 68,34 C 76,44 76,62 68,72",
  ],

  'a-05': [ // उ  (u)  — 2 strokes
    // 1. Teardrop body: from top-left, swings down, closes at lower-right stem
    "M 50,28 C 36,32 22,44 22,58 C 22,74 34,84 50,84 C 66,84 76,72 74,60 C 72,50 62,44 54,42",
    // 2. Shirorékha
    "M 18,28 L 82,28",
  ],

  'a-06': [ // ऊ  (ū)  — 3 strokes
    // 1. Teardrop body (like उ, slightly left-shifted)
    "M 46,28 C 32,32 18,44 18,58 C 18,74 30,84 46,84 C 62,84 72,72 70,60 C 68,50 58,44 50,42",
    // 2. Shirorékha
    "M 18,28 L 82,28",
    // 3. Lower decorative hook (extends below baseline)
    "M 56,72 C 64,78 68,88 62,94 C 56,100 44,98 38,90",
  ],

  'a-07': [ // ए  (e)  — 2 strokes
    // 1. Main curve: top-right, sweeps down-left then back up to close
    "M 62,34 C 52,40 38,52 32,64 C 26,74 30,82 42,82 C 54,82 64,72 62,60",
    // 2. Shirorékha
    "M 20,28 L 80,28",
  ],

  'a-08': [ // ऐ  (ai)  — 4 strokes
    // 1. Main curve (same as ए)
    "M 60,34 C 50,40 36,52 30,64 C 24,74 28,82 40,82 C 52,82 62,72 60,60",
    // 2. Left short vertical mark above the headline
    "M 44,14 L 44,26",
    // 3. Right short vertical mark above the headline
    "M 58,14 L 58,26",
    // 4. Shirorékha
    "M 20,28 L 80,28",
  ],

  'a-09': [ // ओ  (o)  — 3 strokes
    // 1. Left body arc (bowl on the left)
    "M 46,30 C 34,36 20,50 20,64 C 20,78 32,84 48,82 C 62,80 70,68 68,56",
    // 2. Right vertical stem
    "M 64,28 L 64,82",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-10': [ // औ  (au)  — 4 strokes
    // 1. Left body arc
    "M 38,30 C 24,36 10,50 10,64 C 10,78 22,84 38,82 C 52,80 60,68 58,56",
    // 2. Middle right stem
    "M 54,28 L 54,82",
    // 3. Far right stem with foot
    "M 68,28 L 68,82 Q 68,90 60,88",
    // 4. Shirorékha
    "M 10,28 L 90,28",
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // CONSONANTS  (व्यञ्जन)
  // ──────────────────────────────────────────────────────────────────────────

  'a-11': [ // क  (ka)  — 4 strokes
    // 1. Left vertical stem
    "M 36,28 L 36,82",
    // 2. Upper-right diagonal arm going up-right from mid-stem
    "M 36,50 L 68,28",
    // 3. Lower-right curve from mid-stem, sweeping down and curling left
    "M 36,58 C 50,60 64,70 66,82",
    // 4. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-12': [ // ख  (kha)  — 3 strokes
    // 1. Outer oval/body
    "M 50,34 C 36,34 24,44 24,58 C 24,72 36,80 50,80 C 64,80 74,70 74,56 C 74,42 64,34 50,34",
    // 2. Horizontal bar through the middle of the oval
    "M 26,56 L 72,56",
    // 3. Shirorékha (also serves as top of the oval)
    "M 16,28 L 84,28",
  ],

  'a-13': [ // ग  (ga)  — 2 strokes
    // 1. Single sweeping curve: top-right, down, left, closing into hook
    "M 66,32 C 54,34 36,42 28,56 C 20,68 24,78 36,80 C 50,82 62,74 64,62",
    // 2. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-14': [ // घ  (gha)  — 3 strokes
    // 1. Left body curve (like ग but shifted left)
    "M 58,32 C 46,34 28,42 20,56 C 12,68 16,78 28,80 C 42,82 56,74 58,62",
    // 2. Right vertical
    "M 66,28 L 66,82",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-15': [ // च  (ca)  — 2 strokes
    // 1. C-shape with tail: from top-right, sweeps down-left, back right, then a lower hook
    "M 64,34 C 54,36 36,44 28,58 C 20,70 26,80 38,80 C 52,80 62,72 62,62 C 62,70 58,80 48,84",
    // 2. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-16': [ // ज  (ja)  — 3 strokes
    // 1. Inner horizontal crossbar (written first)
    "M 30,42 L 66,42",
    // 2. Right body curve: from headline, curves right then sweeps back left at bottom
    "M 60,28 C 66,40 68,56 60,68 C 54,78 40,82 26,80 C 18,76 18,66 24,60",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-17': [ // त  (ta)  — 3 strokes
    // 1. Left arc/body
    "M 50,32 C 38,36 24,48 22,62 C 20,74 28,80 40,78 C 54,76 62,66 58,54",
    // 2. Right vertical
    "M 58,28 L 58,82",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-18': [ // द  (da)  — 3 strokes
    // 1. Right outer arc (the distinctive shape of द)
    "M 50,34 C 64,34 74,46 72,60 C 70,74 58,82 44,80 C 30,78 22,68 22,56 C 22,44 30,36 44,34",
    // 2. Left descending vertical
    "M 42,28 L 42,82",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-19': [ // न  (na)  — 4 strokes
    // 1. Left vertical
    "M 32,28 L 32,82",
    // 2. Diagonal connector (upper crossbar angling right)
    "M 32,46 C 42,42 54,40 66,44",
    // 3. Right vertical
    "M 68,28 L 68,82",
    // 4. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-20': [ // प  (pa)  — 3 strokes
    // 1. Left vertical
    "M 32,28 L 32,82",
    // 2. Right bowl/P-shape (from top-left of stem, arcing right and closing back)
    "M 32,28 C 44,28 62,32 68,44 C 74,56 68,68 54,70 C 44,72 32,66 32,56",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-21': [ // म  (ma)  — 3 strokes
    // 1. Left vertical
    "M 28,28 L 28,82",
    // 2. Right loop: from mid-left-stem, sweeps up-right then curves back left at bottom
    "M 28,46 C 38,36 56,34 66,44 C 76,56 74,70 62,76 C 50,82 32,80 26,72",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-22': [ // य  (ya)  — 3 strokes
    // 1. Left vertical
    "M 32,28 L 32,82",
    // 2. Right body: curves up to mid-height, then back down to a low tail
    "M 32,46 C 44,36 58,36 66,48 C 74,60 70,74 58,78 C 48,82 42,86 44,92",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-23': [ // र  (ra)  — 2 strokes
    // 1. Single rolling curve (no vertical — starts headline, rolls through a loose S)
    "M 40,32 C 30,40 26,54 32,66 C 38,78 54,84 66,78 C 76,72 76,60 68,52",
    // 2. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-24': [ // व  (va)  — 4 strokes
    // 1. Left vertical
    "M 30,28 L 30,82",
    // 2. Upper-right bowed curve closing at mid-right
    "M 30,30 C 44,28 62,32 68,46 C 72,58 64,66 52,66",
    // 3. Lower-right bowed curve from mid-right back left at bottom
    "M 52,66 C 66,66 76,76 72,84 C 68,92 54,92 44,86",
    // 4. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-25': [ // स  (sa)  — 3 strokes
    // 1. Upper arc (from right, sweeps left then curls back right at mid-height)
    "M 64,36 C 54,28 38,28 30,38 C 22,48 24,58 32,64",
    // 2. Lower arc (from mid-left, sweeps right at lower body)
    "M 32,64 C 38,72 50,78 64,74 C 74,70 76,60 70,52",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-26': [ // ह  (ha)  — 3 strokes
    // 1. Upper hook: from left-centre going right then curling down
    "M 36,32 C 44,34 56,34 64,42 C 70,50 68,60 60,64",
    // 2. Lower body: from centre-right, sweeps down-left, hooks back up-right
    "M 52,64 C 40,68 32,78 36,86 C 40,94 54,94 64,86 C 72,78 70,66 62,62",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-27': [ // श  (śa)  — 3 strokes
    // 1. Outer body curve (like ग but deeper)
    "M 64,36 C 52,30 36,32 26,44 C 16,56 18,70 30,76 C 44,82 60,78 66,66",
    // 2. Inner descending stroke (midpoint dipping down-left)
    "M 50,62 C 44,70 38,78 30,82",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-28': [ // ष  (ṣa)  — 3 strokes
    // 1. Left body arc (oval)
    "M 34,42 C 24,52 22,66 30,76 C 40,86 58,86 68,76 C 78,64 76,50 66,40",
    // 2. Upper-right curve (distinctive arch above headline)
    "M 50,28 C 58,20 72,22 74,34",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  'a-29': [ // ल  (la)  — 3 strokes
    // 1. Central vertical
    "M 50,28 L 50,82",
    // 2. Lower-left curved arm sweeping away to the left
    "M 50,64 C 38,66 26,70 20,78 C 16,84 20,90 30,88",
    // 3. Shirorékha
    "M 16,28 L 84,28",
  ],

  // ──────────────────────────────────────────────────────────────────────────
  // SPECIAL  (विशेष)
  // ──────────────────────────────────────────────────────────────────────────

  'a-30': [ // ं  anusvāra — 1 stroke (small circle/dot drawn clockwise)
    "M 50,28 C 56,28 62,34 62,40 C 62,48 56,54 50,54 C 44,54 38,48 38,40 C 38,34 44,28 50,28",
  ],

  'a-31': [ // ः  visarga — 2 strokes (two small dots)
    // Upper dot
    "M 50,26 C 56,26 60,30 60,36 C 60,42 56,46 50,46 C 44,46 40,42 40,36 C 40,30 44,26 50,26",
    // Lower dot
    "M 50,50 C 56,50 60,54 60,60 C 60,66 56,70 50,70 C 44,70 40,66 40,60 C 40,54 44,50 50,50",
  ],
}
