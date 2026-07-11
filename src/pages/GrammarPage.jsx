import React, { useState } from 'react'
import { LESSONS, PRONOUNS, ENDINGS, VERBS, QA_PAIRS, OBJ_VERB_SENTENCES,
         VERB_EXAMPLES, TENSES, PURUSHAS, VACHANAMS } from '../data/grammar.js'
import HubBack from '../components/HubBack.jsx'
import './Hub.css'
import './GrammarPage.css'

// ── Sub-views ──────────────────────────────────────────────────────────────

function PronounsLesson() {
  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        Sanskrit has <strong>3 persons × 3 numbers</strong> — each gives a different pronoun and verb ending.
        The dual (for exactly two) is unique to Sanskrit.
      </div>
      <table className="gr-table">
        <thead>
          <tr><th>Person</th><th>Singular</th><th>Dual (×2)</th><th>Plural (×3+)</th></tr>
        </thead>
        <tbody>
          {PRONOUNS.map(p => (
            <tr key={p.person}>
              <td className="gr-person">{p.person} <span className="gr-en">({p.en})</span></td>
              <td><span className="gr-dev">{p.sg.dev}</span><br/><span className="gr-iast">{p.sg.iast}</span></td>
              <td><span className="gr-dev">{p.du.dev}</span><br/><span className="gr-iast">{p.du.iast}</span></td>
              <td><span className="gr-dev">{p.pl.dev}</span><br/><span className="gr-iast">{p.pl.iast}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="gr-tip">
        💡 <strong>Tip:</strong> In Sanskrit, the pronoun is optional — the verb ending already tells you who is acting.
        <em> पठामि</em> alone means "I read" — अहम् just adds emphasis.
      </div>
    </div>
  )
}

function EndingsLesson() {
  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        Every Class 1 present tense verb = <strong>stem + a + ending</strong>.
        Memorise these 9 endings and you can conjugate any Class 1 verb.
      </div>
      <table className="gr-table">
        <thead>
          <tr><th>Person</th><th>Singular</th><th>Dual</th><th>Plural</th></tr>
        </thead>
        <tbody>
          {ENDINGS.present.map(row => (
            <tr key={row.person}>
              <td className="gr-person">{row.person}</td>
              <td><span className="gr-iast">{row.sg}</span></td>
              <td><span className="gr-iast">{row.du}</span></td>
              <td><span className="gr-iast">{row.pl}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="gr-example-box">
        <div className="gr-example-title">Example with √पठ् (paṭh) — stem: पठ</div>
        <div className="gr-formula">
          <span className="gr-pill">पठ <em>paṭha</em></span>
          <span className="gr-plus">+</span>
          <span className="gr-pill">ति <em>ti</em></span>
          <span className="gr-eq">=</span>
          <span className="gr-pill gr-pill-gold">पठति <em>paṭhati</em> — he reads</span>
        </div>
        <div className="gr-formula">
          <span className="gr-pill">पठ <em>paṭha</em></span>
          <span className="gr-plus">+</span>
          <span className="gr-pill">मि <em>mi</em></span>
          <span className="gr-eq">=</span>
          <span className="gr-pill gr-pill-gold">पठामि <em>paṭhāmi</em> — I read</span>
        </div>
      </div>
      <div className="gr-tip">
        💡 <strong>Pattern:</strong> 3rd person ends in <em>-ti / -taḥ / -nti</em>.
        2nd in <em>-si / -thaḥ / -tha</em>. 1st in <em>-mi / -vaḥ / -maḥ</em>.
      </div>
    </div>
  )
}

function VerbsLesson() {
  const [activeVerb, setActiveVerb] = useState(VERBS[0].id)
  const verb = VERBS.find(v => v.id === activeVerb)
  const rows = [
    { label: '3rd', sg: 'p3sg', du: 'p3du', pl: 'p3pl' },
    { label: '2nd', sg: 'p2sg', du: 'p2du', pl: 'p2pl' },
    { label: '1st', sg: 'p1sg', du: 'p1du', pl: 'p1pl' },
  ]

  return (
    <div className="gr-lesson">
      <div className="gr-verb-tabs">
        {VERBS.map(v => (
          <button key={v.id}
            className={`gr-verb-tab ${activeVerb === v.id ? 'active' : ''}`}
            onClick={() => setActiveVerb(v.id)}>
            <span className="gr-dev">{v.root}</span>
            <span className="gr-verb-tab-en">{v.meaning}</span>
          </button>
        ))}
      </div>

      <div className="gr-verb-header">
        <span className="gr-dev gr-verb-root">{verb.root}</span>
        <span className="gr-iast">{verb.rootIast}</span>
        <span className="gr-verb-meaning">{verb.meaning}</span>
        <span className="gr-iast">stem: {verb.stemIast}</span>
      </div>
      {verb.note && <div className="gr-tip">⚠️ {verb.note}</div>}

      <table className="gr-table">
        <thead>
          <tr><th>Person</th><th>Singular</th><th>Dual</th><th>Plural</th></tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.label}>
              <td className="gr-person">{row.label}</td>
              {[row.sg, row.du, row.pl].map(key => (
                <td key={key}>
                  <span className="gr-dev">{verb.forms[key][0]}</span><br/>
                  <span className="gr-iast">{verb.forms[key][1]}</span><br/>
                  <span className="gr-en">{verb.forms[key][2]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NegativeLesson() {
  const [activeVerb, setActiveVerb] = useState(VERBS[0].id)
  const verb = VERBS.find(v => v.id === activeVerb)

  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        To negate any verb, simply place <span className="gr-dev">न</span> <em>(na)</em> before it.
        The verb form itself does not change.
        <br/><strong>Subject + Object + न + Verb</strong>
      </div>

      <div className="gr-formula" style={{marginBottom:'1.5rem'}}>
        <span className="gr-pill">सः <em>saḥ</em></span>
        <span className="gr-plus">+</span>
        <span className="gr-pill">पुस्तकम् <em>pustakam</em></span>
        <span className="gr-plus">+</span>
        <span className="gr-pill gr-pill-red">न <em>na</em></span>
        <span className="gr-plus">+</span>
        <span className="gr-pill">पठति <em>paṭhati</em></span>
        <span className="gr-eq">=</span>
        <span className="gr-pill gr-pill-gold">He does not read a book.</span>
      </div>

      <div className="gr-verb-tabs">
        {VERBS.map(v => (
          <button key={v.id}
            className={`gr-verb-tab ${activeVerb === v.id ? 'active' : ''}`}
            onClick={() => setActiveVerb(v.id)}>
            <span className="gr-dev">{v.root}</span>
            <span className="gr-verb-tab-en">{v.meaning}</span>
          </button>
        ))}
      </div>

      <table className="gr-table">
        <thead>
          <tr><th>Positive</th><th>Negative</th></tr>
        </thead>
        <tbody>
          {Object.entries(verb.negForms).map(([key, neg]) => {
            const pos = verb.forms[key]
            return (
              <tr key={key}>
                <td>
                  <span className="gr-dev">{pos[0]}</span><br/>
                  <span className="gr-iast">{pos[1]}</span><br/>
                  <span className="gr-en">{pos[2]}</span>
                </td>
                <td>
                  <span className="gr-dev gr-neg">{neg[0]}</span><br/>
                  <span className="gr-iast">{neg[1]}</span><br/>
                  <span className="gr-en">{neg[2]}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="gr-tip">
        💡 <strong>Remember:</strong> न (na) never changes. Only the verb changes with person/number.
      </div>
    </div>
  )
}

function ObjectsLesson() {
  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        Sanskrit word order is flexible, but the standard pattern is:<br/>
        <strong>Subject (nominative) · Object (accusative) · Verb</strong><br/>
        Neuter nouns ending in <em>-a</em> take <em>-am</em> in the accusative (object case) — often the same form.
      </div>

      <div className="gr-formula" style={{marginBottom:'1.5rem'}}>
        <span className="gr-pill gr-pill-blue">अहम् <em>subject</em></span>
        <span className="gr-plus">+</span>
        <span className="gr-pill gr-pill-teal">पुस्तकम् <em>object</em></span>
        <span className="gr-plus">+</span>
        <span className="gr-pill gr-pill-gold">पठामि <em>verb</em></span>
        <span className="gr-eq">=</span>
        <span className="gr-pill">I read a book.</span>
      </div>

      <div className="gr-sentence-list">
        {OBJ_VERB_SENTENCES.map((s, i) => (
          <div key={i} className="gr-sentence-card">
            <div className="gr-sentence-parts">
              <span className="gr-part gr-part-subj">
                <span className="gr-part-label">subject</span>
                <span className="gr-dev">{s.subject.dev}</span>
                <span className="gr-iast">{s.subject.iast}</span>
                <span className="gr-en">{s.subject.en}</span>
              </span>
              <span className="gr-part gr-part-obj">
                <span className="gr-part-label">object</span>
                <span className="gr-dev">{s.object.dev}</span>
                <span className="gr-iast">{s.object.iast}</span>
                <span className="gr-en">{s.object.en}</span>
              </span>
              <span className="gr-part gr-part-verb">
                <span className="gr-part-label">verb</span>
                <span className="gr-dev">{s.verb.dev}</span>
                <span className="gr-iast">{s.verb.iast}</span>
                <span className="gr-en">{s.verb.en}</span>
              </span>
            </div>
            <div className="gr-sentence-full">
              <span className="gr-dev">{s.full.dev}</span>
              <span className="gr-iast">{s.full.iast}</span>
              <span className="gr-en gr-en-bold">{s.full.en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QALesson() {
  const [revealed, setRevealed] = useState({})
  const toggle = i => setRevealed(r => ({ ...r, [i]: !r[i] }))

  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        Key question words:<br/>
        <strong>किम्</strong> <em>(kim)</em> — what? &nbsp;·&nbsp;
        <strong>कुत्र</strong> <em>(kutra)</em> — where? &nbsp;·&nbsp;
        <strong>कः</strong> <em>(kaḥ)</em> — who? (masc) &nbsp;·&nbsp;
        <strong>का</strong> <em>(kā)</em> — who? (fem)
      </div>

      <div className="gr-qa-list">
        {QA_PAIRS.map((pair, i) => (
          <div key={i} className="gr-qa-card">
            <div className="gr-qa-q" onClick={() => toggle(i)}>
              <span className="gr-qa-badge">Q</span>
              <div>
                <div className="gr-dev">{pair.q.dev}</div>
                <div className="gr-iast">{pair.q.iast}</div>
                <div className="gr-en">{pair.q.en}</div>
              </div>
              <span className="gr-qa-toggle">{revealed[i] ? '▲' : '▼'}</span>
            </div>

            {revealed[i] && (
              <div className="gr-qa-answers anim-fade-up">
                <div className="gr-qa-row gr-qa-pos">
                  <span className="gr-qa-badge gr-qa-badge-a">A</span>
                  <div>
                    <div className="gr-dev">{pair.a.dev}</div>
                    <div className="gr-iast">{pair.a.iast}</div>
                    <div className="gr-en">{pair.a.en}</div>
                  </div>
                </div>
                <div className="gr-qa-row gr-qa-neg">
                  <span className="gr-qa-badge gr-qa-badge-n">✗</span>
                  <div>
                    <div className="gr-dev">{pair.neg.dev}</div>
                    <div className="gr-iast">{pair.neg.iast}</div>
                    <div className="gr-en">{pair.neg.en}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="gr-tip">
        💡 <strong>Tip:</strong> Click each question to reveal the positive and negative answers.
        Try answering yourself before revealing!
      </div>
    </div>
  )
}

function ExplorerLesson() {
  const [tense,   setTense]   = useState('present')
  const [purusha, setPurusha] = useState('3')
  const [vachanam,setVachanam]= useState('sg')

  // Build the form key, e.g. p3sg, p2du, p1pl
  const formKey = `p${purusha}${vachanam}`
  const purObj  = PURUSHAS.find(p => p.id === purusha)
  const vacObj  = VACHANAMS.find(v => v.id === vachanam)

  // Pronoun for selected person + number
  const pronoun = vachanam === 'sg' ? purObj.pronSg
                : vachanam === 'du' ? purObj.pronDu
                : purObj.pronPl

  // Ending highlight for this cell
  const endingRow = ENDINGS.present.find(r =>
    r.person === (purusha === '3' ? '3rd' : purusha === '2' ? '2nd' : '1st')
  )
  const endingStr = endingRow?.[vachanam] ?? ''

  return (
    <div className="gr-lesson">
      {/* ── Selectors ── */}
      <div className="gr-explorer-selectors">
        {/* Tense */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Tense · काल</div>
          <div className="gr-sel-pills">
            {TENSES.map(t => (
              <button key={t.id}
                className={`gr-sel-pill ${tense === t.id ? 'active' : ''}`}
                onClick={() => setTense(t.id)}>
                <span className="gr-dev">{t.labelDev}</span>
                <span className="gr-sel-pill-sub">{t.label} — {t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Person */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Person · पुरुष</div>
          <div className="gr-sel-pills">
            {PURUSHAS.map(p => (
              <button key={p.id}
                className={`gr-sel-pill ${purusha === p.id ? 'active' : ''}`}
                onClick={() => setPurusha(p.id)}>
                <span className="gr-dev">{p.labelDev}</span>
                <span className="gr-sel-pill-sub">{p.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Number */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Number · वचनम्</div>
          <div className="gr-sel-pills">
            {VACHANAMS.map(v => (
              <button key={v.id}
                className={`gr-sel-pill ${vachanam === v.id ? 'active' : ''}`}
                onClick={() => setVachanam(v.id)}>
                <span className="gr-dev">{v.labelDev}</span>
                <span className="gr-sel-pill-sub">{v.label} — {v.en}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Selection summary ── */}
      <div className="gr-explorer-summary">
        <div className="gr-exp-pronoun">
          <span className="gr-exp-label">Pronoun</span>
          <span className="gr-dev">{pronoun}</span>
        </div>
        <div className="gr-exp-arrow">→</div>
        <div className="gr-exp-ending">
          <span className="gr-exp-label">Ending</span>
          <span className="gr-iast" style={{fontSize:'1rem', color:'var(--gold)'}}>{endingStr}</span>
        </div>
        <div className="gr-exp-arrow">→</div>
        <div className="gr-exp-key">
          <span className="gr-exp-label">Stem + ending</span>
          <span className="gr-iast" style={{fontSize:'0.85rem'}}>
            {purObj.labelDev} · {vacObj.labelDev}
          </span>
        </div>
      </div>

      {/* ── Verb cards ── */}
      <div className="gr-exp-verb-list">
        {VERBS.map(verb => {
          const form = verb.forms[formKey]
          const ex   = VERB_EXAMPLES[verb.id]?.[formKey]
          return (
            <div key={verb.id} className="gr-exp-verb-card">
              <div className="gr-exp-verb-head">
                <span className="gr-dev" style={{color:'var(--gold)', fontSize:'1rem'}}>{verb.root}</span>
                <span className="gr-iast">{verb.rootIast}</span>
                <span className="gr-exp-verb-meaning">{verb.meaning}</span>
              </div>
              <div className="gr-exp-form">
                <span className="gr-dev" style={{fontSize:'1.25rem'}}>{form[0]}</span>
                <span className="gr-iast">{form[1]}</span>
                <span className="gr-en" style={{color:'var(--text-primary)'}}>{form[2]}</span>
              </div>
              {ex && (
                <div className="gr-exp-example">
                  <div className="gr-dev" style={{fontSize:'0.95rem'}}>{ex.dev}</div>
                  <div className="gr-iast">{ex.iast}</div>
                  <div className="gr-en" style={{color:'var(--text-primary)', fontSize:'0.85rem'}}>{ex.en}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 All 6 verbs use the <strong>same ending</strong> for this person + number.
        Only the stem changes — master the endings once, read any Class 1 verb.
      </div>
    </div>
  )
}

const LESSON_VIEWS = {
  pronouns: PronounsLesson,
  endings:  EndingsLesson,
  verbs:    VerbsLesson,
  negative: NegativeLesson,
  objects:  ObjectsLesson,
  qa:       QALesson,
  explorer: ExplorerLesson,
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function GrammarPage() {
  const [activeLesson, setActiveLesson] = useState(null)

  if (activeLesson) {
    const lesson = LESSONS.find(l => l.id === activeLesson)
    const View   = LESSON_VIEWS[lesson.type]
    const idx    = LESSONS.findIndex(l => l.id === activeLesson)
    const prev   = LESSONS[idx - 1]
    const next   = LESSONS[idx + 1]

    return (
      <div className="gita anim-fade-up">
        <button className="gita-back" onClick={() => setActiveLesson(null)}>
          ← Grammar
        </button>
        <div className="page-header">
          <div className="gr-lesson-icon">{lesson.icon}</div>
          <h1 className="page-title">{lesson.title}</h1>
          <p className="page-subtitle devanagari">{lesson.titleDev}</p>
        </div>

        <View />

        <div className="gr-lesson-nav">
          <button className="btn-ghost" onClick={() => setActiveLesson(prev.id)} disabled={!prev}>
            ← {prev ? prev.title : ''}
          </button>
          <button className="btn-primary" onClick={() => setActiveLesson(next?.id || null)}>
            {next ? `${next.title} →` : 'Done ✓'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="hub-page anim-fade-up">
      <HubBack to="/study" label="Study" />
      <div className="page-header">
        <h1 className="page-title">Grammar</h1>
        <p className="page-subtitle">Present Tense · Structured lessons with examples</p>
      </div>

      <div className="gr-lesson-progress">
        <span className="gr-progress-label">{LESSONS.length} lessons · Present tense (लट्)</span>
      </div>

      <div className="hub-list">
        {LESSONS.map((lesson, i) => (
          <button key={lesson.id}
            className="hub-item gr-hub-item"
            onClick={() => setActiveLesson(lesson.id)}>
            <span className="hub-item-icon">{lesson.icon}</span>
            <div className="hub-item-text">
              <div className="hub-item-label">{lesson.title}
                <span className="gr-dev gr-title-dev"> — {lesson.titleDev}</span>
              </div>
              <div className="hub-item-sub">{lesson.summary}</div>
            </div>
            <span className="pill pill-beginner">lesson {i + 1}</span>
            <span className="hub-item-chevron">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
