# Sanskritly

A Sanskrit language learning app with adaptive spaced repetition, flashcards, sentence drills, and fill-in-the-blank exercises.

## Getting started

```bash
cd /Users/slithers/Projects/sanskrit/Claude/sanskritly
npm install
npm run dev
```

Then open http://localhost:3000

## Features

### Flashcards
- Devanāgarī alphabet (31 characters)
- Core vocabulary (20 words, expandable)
- SM-2 spaced repetition scheduling
- Due / all / weak filters
- Flip animation with quality rating (Blackout → Easy)
- Progress persisted in localStorage

### Sentence Drill (Verb · Noun · Pronoun)
- 24 seed sentences covering all combination patterns
- Patterns: noun+verb, pronoun+verb, noun+obj+verb, pronoun+noun+verb, dative, locative, causative
- Modes: translate, identify pattern, read aloud
- Weak-areas-only toggle
- Per-sentence grammar breakdown after reveal

### Fill in the Blanks
- 8 seed questions (beginner → advanced)
- 4-option MCQ with immediate feedback
- Correct answer highlighted in green, wrong in red
- Grammar concept explanation on every question

### Progress tracking
- Per-item SRS data (ease factor, interval, streak, accuracy)
- Per-concept accuracy with flagging below 70%
- Session history
- Weak areas spotlight with drill links
- Full reset option

## Project structure

```
src/
  data/
    sanskritData.js     — all content (alphabet, vocabulary, sentences, fill-blanks)
  hooks/
    useProgress.js      — SM-2 SRS algorithm + localStorage persistence
  pages/
    Dashboard.jsx       — overview, stats, weak areas, module map
    Flashcards.jsx      — SRS flashcard study
    DrillSentences.jsx  — VNP sentence drill
    FillBlanks.jsx      — fill-in-the-blank MCQ
    Progress.jsx        — detailed progress analytics
  styles/
    global.css          — design system (terracotta/gold/cream theme)
    app.css             — layout
```

## Expanding content

All content lives in `src/data/sanskritData.js`. To add more:

- **Vocabulary**: add entries to `VOCABULARY` array
- **Sentences**: add to `VNP_SENTENCES` with pattern, concepts, difficulty, level tags
- **Fill-in-blanks**: add to `FILL_BLANKS` with template, blank, options, concepts
- **Grammar concepts**: register new concept IDs in `GRAMMAR_CONCEPTS`

## Roadmap

- [ ] Audio playback (IIT Sanskrit TTS or recorded clips)
- [ ] Full Devanāgarī keyboard input
- [ ] Bhagavad Gita shloka module (700 verses)
- [ ] Yoga Sutras module (196 sutras)
- [ ] Upanishads module (10 principal texts)
- [ ] LLM-powered sentence generation endpoint
- [ ] Sandhi splitting exercises
- [ ] Compound word analysis
- [ ] User accounts + cloud sync
