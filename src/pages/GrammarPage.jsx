import React, { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { LESSONS, PRONOUNS, ENDINGS, VERBS, QA_PAIRS, OBJ_VERB_SENTENCES,
         VERB_EXAMPLES, TENSE_EXAMPLES, TENSES, PURUSHAS, VACHANAMS, LINGAS, PRONOUN_TABLE,
         GENDER_DATA, GENDER_NOUNS_100, VIBHAKTI_LIST, VIBHAKTI_NOUNS } from '../data/grammar.js'
import HubBack from '../components/HubBack.jsx'
import { useSoundEffects } from '../hooks/useSoundEffects.js'
import { useSpeech } from '../hooks/useSpeech.js'
import SpeakIcon from '../components/SpeakIcon.jsx'
import './Hub.css'
import './GrammarPage.css'

// ── Shared speak button ────────────────────────────────────────────────────
function Spk({ text, small }) {
  const { speak } = useSpeech()
  return (
    <button
      className={`speak-btn${small ? ' gr-speak-sm' : ''}`}
      onClick={e => { e.stopPropagation(); speak(text) }}
      title="Hear pronunciation"
    >
      <SpeakIcon />
    </button>
  )
}

// ── Sub-views ──────────────────────────────────────────────────────────────

const LINGA_LABELS = { m: 'पुंलिङ्गम्', f: 'स्त्रीलिङ्गम्', n: 'नपुंसकलिङ्गम्' }
const LINGA_EN     = { m: 'masc',       f: 'fem',           n: 'neuter'           }

function PronounsLesson() {
  return (
    <div className="gr-lesson">
      <table className="gr-table gr-pronoun-intro-table">
        <thead>
          <tr><th>Dimension</th><th>Values</th><th>Note</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Person · पुरुषः</strong></td>
            <td>3rd · 2nd · 1st</td>
            <td>Each gives a different verb ending</td>
          </tr>
          <tr>
            <td><strong>Number · वचनम्</strong></td>
            <td>Singular · Dual · Plural</td>
            <td>Dual (for exactly 2) is unique to Sanskrit</td>
          </tr>
          <tr>
            <td><strong>Gender · लिङ्गम्</strong></td>
            <td>Masculine · Feminine · Neuter</td>
            <td>Only affects 3rd-person pronouns</td>
          </tr>
        </tbody>
      </table>

      {/* 3rd person — show all three genders */}
      <div className="gr-example-title" style={{marginTop:'0.25rem'}}>3rd Person (प्रथमपुरुष) — he / she / it</div>
      <table className="gr-table">
        <thead>
          <tr><th>Gender · लिङ्गम्</th><th>Singular</th><th>Dual (×2)</th><th>Plural (×3+)</th></tr>
        </thead>
        <tbody>
          {['m','f','n'].map(g => {
            const row = PRONOUN_TABLE['3'][g]
            return (
              <tr key={g}>
                <td className="gr-person">
                  <span className="gr-dev" style={{fontSize:'0.82rem'}}>{LINGA_LABELS[g]}</span>
                  <span className="gr-en"> ({LINGA_EN[g]})</span>
                </td>
                <td><div className="gr-spk-row"><span className="gr-dev">{row.sg.dev}</span><Spk text={row.sg.dev} small /></div><span className="gr-iast">{row.sg.iast}</span></td>
                <td><div className="gr-spk-row"><span className="gr-dev">{row.du.dev}</span><Spk text={row.du.dev} small /></div><span className="gr-iast">{row.du.iast}</span></td>
                <td><div className="gr-spk-row"><span className="gr-dev">{row.pl.dev}</span><Spk text={row.pl.dev} small /></div><span className="gr-iast">{row.pl.iast}</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* 2nd and 1st person — gender-neutral */}
      <div className="gr-example-title" style={{marginTop:'1rem'}}>2nd & 1st Person — gender-neutral</div>
      <table className="gr-table">
        <thead>
          <tr><th>Person</th><th>Singular</th><th>Dual (×2)</th><th>Plural (×3+)</th></tr>
        </thead>
        <tbody>
          {[
            { label: '2nd (मध्यमपुरुष)', en: 'you',    row: PRONOUN_TABLE['2']['m'] },
            { label: '1st (उत्तमपुरुष)',  en: 'I / we', row: PRONOUN_TABLE['1']['m'] },
          ].map(p => (
            <tr key={p.label}>
              <td className="gr-person">{p.label} <span className="gr-en">({p.en})</span></td>
              <td><div className="gr-spk-row"><span className="gr-dev">{p.row.sg.dev}</span><Spk text={p.row.sg.dev} small /></div><span className="gr-iast">{p.row.sg.iast}</span></td>
              <td><div className="gr-spk-row"><span className="gr-dev">{p.row.du.dev}</span><Spk text={p.row.du.dev} small /></div><span className="gr-iast">{p.row.du.iast}</span></td>
              <td><div className="gr-spk-row"><span className="gr-dev">{p.row.pl.dev}</span><Spk text={p.row.pl.dev} small /></div><span className="gr-iast">{p.row.pl.iast}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="gr-tip">
        💡 <strong>Tip:</strong> In Sanskrit, the pronoun is optional — the verb ending already tells you who is acting.
        <em> पठामि</em> alone means "I read" — अहम् just adds emphasis.
        Gender only matters for the <strong>3rd person</strong> pronoun, not the verb form.
      </div>
    </div>
  )
}

const VACHANAM_WORDS = {
  Person: [
    { en: 'boy',      sg: { dev: 'बालकः',   iast: 'bālakaḥ'  }, du: { dev: 'बालकौ',   iast: 'bālakau'  }, pl: { dev: 'बालकाः',   iast: 'bālakāḥ'  } },
    { en: 'man',      sg: { dev: 'नरः',     iast: 'naraḥ'    }, du: { dev: 'नरौ',     iast: 'narau'    }, pl: { dev: 'नराः',     iast: 'narāḥ'    } },
    { en: 'god',      sg: { dev: 'देवः',    iast: 'devaḥ'    }, du: { dev: 'देवौ',    iast: 'devau'    }, pl: { dev: 'देवाः',    iast: 'devāḥ'    } },
    { en: 'Rāma',     sg: { dev: 'रामः',    iast: 'rāmaḥ'    }, du: { dev: 'रामौ',    iast: 'rāmau'    }, pl: { dev: 'रामाः',    iast: 'rāmāḥ'    } },
    { en: 'girl',     sg: { dev: 'बालिका',  iast: 'bālikā'   }, du: { dev: 'बालिके',  iast: 'bālike'   }, pl: { dev: 'बालिकाः',  iast: 'bālikāḥ'  } },
    { en: 'Sītā',     sg: { dev: 'सीता',    iast: 'sītā'     }, du: { dev: 'सीते',    iast: 'sīte'     }, pl: { dev: 'सीताः',    iast: 'sītāḥ'    } },
    { en: 'teacher',  sg: { dev: 'गुरुः',   iast: 'guruḥ'    }, du: { dev: 'गुरू',    iast: 'gurū'     }, pl: { dev: 'गुरवः',    iast: 'guravaḥ'  } },
    { en: 'Kṛṣṇa',   sg: { dev: 'कृष्णः',  iast: 'kṛṣṇaḥ'  }, du: { dev: 'कृष्णौ',  iast: 'kṛṣṇau'  }, pl: { dev: 'कृष्णाः',  iast: 'kṛṣṇāḥ'  } },
  ],
  Place: [
    { en: 'village',  sg: { dev: 'ग्रामः',  iast: 'grāmaḥ'   }, du: { dev: 'ग्रामौ',  iast: 'grāmau'   }, pl: { dev: 'ग्रामाः',  iast: 'grāmāḥ'   } },
    { en: 'mountain', sg: { dev: 'पर्वतः',  iast: 'parvataḥ' }, du: { dev: 'पर्वतौ',  iast: 'parvatau' }, pl: { dev: 'पर्वताः',  iast: 'parvatāḥ' } },
    { en: 'river',    sg: { dev: 'नदी',     iast: 'nadī'     }, du: { dev: 'नद्यौ',   iast: 'nadyau'   }, pl: { dev: 'नद्यः',    iast: 'nadyaḥ'   } },
    { en: 'forest',   sg: { dev: 'वनम्',    iast: 'vanam'    }, du: { dev: 'वने',     iast: 'vane'     }, pl: { dev: 'वनानि',    iast: 'vanāni'   } },
    { en: 'town',     sg: { dev: 'नगरम्',   iast: 'nagaram'  }, du: { dev: 'नगरे',    iast: 'nagare'   }, pl: { dev: 'नगराणि',   iast: 'nagarāṇi' } },
    { en: 'temple',   sg: { dev: 'मन्दिरम्',iast: 'mandiram' }, du: { dev: 'मन्दिरे', iast: 'mandire'  }, pl: { dev: 'मन्दिराणि',iast: 'mandirāṇi'} },
    { en: 'ocean',    sg: { dev: 'सागरः',   iast: 'sāgaraḥ'  }, du: { dev: 'सागरौ',   iast: 'sāgarau'  }, pl: { dev: 'सागराः',   iast: 'sāgarāḥ'  } },
    { en: 'house',    sg: { dev: 'गृहम्',   iast: 'gṛham'    }, du: { dev: 'गृहे',    iast: 'gṛhe'     }, pl: { dev: 'गृहाणि',   iast: 'gṛhāṇi'   } },
  ],
  Nature: [
    { en: 'sun',      sg: { dev: 'सूर्यः',  iast: 'sūryaḥ'  }, du: { dev: 'सूर्यौ',  iast: 'sūryau'  }, pl: { dev: 'सूर्याः',  iast: 'sūryāḥ'  } },
    { en: 'moon',     sg: { dev: 'चन्द्रः', iast: 'candraḥ'  }, du: { dev: 'चन्द्रौ', iast: 'candrau'  }, pl: { dev: 'चन्द्राः', iast: 'candrāḥ'  } },
    { en: 'tree',     sg: { dev: 'वृक्षः',  iast: 'vṛkṣaḥ'  }, du: { dev: 'वृक्षौ',  iast: 'vṛkṣau'  }, pl: { dev: 'वृक्षाः',  iast: 'vṛkṣāḥ'  } },
    { en: 'water',    sg: { dev: 'जलम्',    iast: 'jalam'    }, du: { dev: 'जले',     iast: 'jale'     }, pl: { dev: 'जलानि',    iast: 'jalāni'   } },
    { en: 'flower',   sg: { dev: 'पुष्पम्', iast: 'puṣpam'  }, du: { dev: 'पुष्पे',  iast: 'puṣpe'   }, pl: { dev: 'पुष्पाणि', iast: 'puṣpāṇi' } },
    { en: 'sky',      sg: { dev: 'आकाशम्',  iast: 'ākāśam'  }, du: { dev: 'आकाशे',   iast: 'ākāśe'   }, pl: { dev: 'आकाशानि',  iast: 'ākāśāni' } },
    { en: 'wind',     sg: { dev: 'वायुः',   iast: 'vāyuḥ'   }, du: { dev: 'वायू',    iast: 'vāyū'    }, pl: { dev: 'वायवः',    iast: 'vāyavaḥ' } },
    { en: 'fruit',    sg: { dev: 'फलम्',    iast: 'phalam'   }, du: { dev: 'फले',     iast: 'phale'    }, pl: { dev: 'फलानि',    iast: 'phalāni'  } },
  ],
  Animal: [
    { en: 'lion',     sg: { dev: 'सिंहः',   iast: 'siṃhaḥ'  }, du: { dev: 'सिंहौ',   iast: 'siṃhau'  }, pl: { dev: 'सिंहाः',   iast: 'siṃhāḥ'  } },
    { en: 'horse',    sg: { dev: 'अश्वः',   iast: 'aśvaḥ'   }, du: { dev: 'अश्वौ',   iast: 'aśvau'   }, pl: { dev: 'अश्वाः',   iast: 'aśvāḥ'   } },
    { en: 'elephant', sg: { dev: 'गजः',     iast: 'gajaḥ'   }, du: { dev: 'गजौ',     iast: 'gajau'   }, pl: { dev: 'गजाः',     iast: 'gajāḥ'   } },
    { en: 'peacock',  sg: { dev: 'मयूरः',   iast: 'mayūraḥ' }, du: { dev: 'मयूरौ',   iast: 'mayūrau' }, pl: { dev: 'मयूराः',   iast: 'mayūrāḥ' } },
    { en: 'cow',      sg: { dev: 'गौः',     iast: 'gauḥ'    }, du: { dev: 'गावौ',    iast: 'gāvau'   }, pl: { dev: 'गावः',     iast: 'gāvaḥ'   } },
    { en: 'deer',     sg: { dev: 'मृगः',    iast: 'mṛgaḥ'   }, du: { dev: 'मृगौ',    iast: 'mṛgau'   }, pl: { dev: 'मृगाः',    iast: 'mṛgāḥ'   } },
  ],
  Body: [
    { en: 'hand',     sg: { dev: 'हस्तः',   iast: 'hastaḥ'  }, du: { dev: 'हस्तौ',   iast: 'hastau'  }, pl: { dev: 'हस्ताः',   iast: 'hastāḥ'  } },
    { en: 'foot',     sg: { dev: 'पादः',    iast: 'pādaḥ'   }, du: { dev: 'पादौ',    iast: 'pādau'   }, pl: { dev: 'पादाः',    iast: 'pādāḥ'   } },
    { en: 'eye',      sg: { dev: 'नेत्रम्', iast: 'netram'  }, du: { dev: 'नेत्रे',  iast: 'netre'   }, pl: { dev: 'नेत्राणि', iast: 'netrāṇi' } },
    { en: 'face',     sg: { dev: 'मुखम्',   iast: 'mukham'  }, du: { dev: 'मुखे',    iast: 'mukhe'   }, pl: { dev: 'मुखानि',   iast: 'mukhāni' } },
    { en: 'ear',      sg: { dev: 'कर्णः',   iast: 'karṇaḥ'  }, du: { dev: 'कर्णौ',   iast: 'karṇau'  }, pl: { dev: 'कर्णाः',   iast: 'karṇāḥ'  } },
    { en: 'heart',    sg: { dev: 'हृदयम्',  iast: 'hṛdayam' }, du: { dev: 'हृदये',   iast: 'hṛdaye'  }, pl: { dev: 'हृदयानि',  iast: 'hṛdayāni'} },
    { en: 'head',     sg: { dev: 'शिरः',    iast: 'śiraḥ'   }, du: { dev: 'शिरसी',   iast: 'śirasī'  }, pl: { dev: 'शिरांसि',  iast: 'śirāṃsi' } },
    { en: 'tongue',   sg: { dev: 'जिह्वा',  iast: 'jihvā'   }, du: { dev: 'जिह्वे',  iast: 'jihve'   }, pl: { dev: 'जिह्वाः',  iast: 'jihvāḥ'  } },
  ],
  Thing: [
    { en: 'pot',      sg: { dev: 'घटः',     iast: 'ghaṭaḥ'  }, du: { dev: 'घटौ',     iast: 'ghaṭau'  }, pl: { dev: 'घटाः',     iast: 'ghaṭāḥ'  } },
    { en: 'lamp',     sg: { dev: 'दीपः',    iast: 'dīpaḥ'   }, du: { dev: 'दीपौ',    iast: 'dīpau'   }, pl: { dev: 'दीपाः',    iast: 'dīpāḥ'   } },
    { en: 'book',     sg: { dev: 'पुस्तकम्',iast: 'pustakam' }, du: { dev: 'पुस्तके', iast: 'pustake'  }, pl: { dev: 'पुस्तकानि',iast: 'pustakāni'} },
    { en: 'food',     sg: { dev: 'भोजनम्',  iast: 'bhojanam' }, du: { dev: 'भोजने',   iast: 'bhojane'  }, pl: { dev: 'भोजनानि',  iast: 'bhojanāni'} },
    { en: 'garland',  sg: { dev: 'माला',    iast: 'mālā'    }, du: { dev: 'माले',    iast: 'māle'    }, pl: { dev: 'मालाः',    iast: 'mālāḥ'   } },
    { en: 'garment',  sg: { dev: 'वस्त्रम्',iast: 'vastram'  }, du: { dev: 'वस्त्रे', iast: 'vastre'   }, pl: { dev: 'वस्त्राणि',iast: 'vastrāṇi' } },
    { en: 'language', sg: { dev: 'भाषा',    iast: 'bhāṣā'   }, du: { dev: 'भाषे',    iast: 'bhāṣe'   }, pl: { dev: 'भाषाः',    iast: 'bhāṣāḥ'  } },
    { en: 'boat',     sg: { dev: 'नौका',    iast: 'naukā'   }, du: { dev: 'नौके',    iast: 'nauke'   }, pl: { dev: 'नौकाः',    iast: 'naukāḥ'  } },
  ],
  Concept: [
    { en: 'dharma',   sg: { dev: 'धर्मः',   iast: 'dharmaḥ'  }, du: { dev: 'धर्मौ',   iast: 'dharmau'  }, pl: { dev: 'धर्माः',   iast: 'dharmāḥ'  } },
    { en: 'yoga',     sg: { dev: 'योगः',    iast: 'yogaḥ'    }, du: { dev: 'योगौ',    iast: 'yogau'    }, pl: { dev: 'योगाः',    iast: 'yogāḥ'    } },
    { en: 'knowledge',sg: { dev: 'ज्ञानम्', iast: 'jñānam'   }, du: { dev: 'ज्ञाने',  iast: 'jñāne'    }, pl: { dev: 'ज्ञानानि', iast: 'jñānāni'  } },
    { en: 'truth',    sg: { dev: 'सत्यम्',  iast: 'satyam'   }, du: { dev: 'सत्ये',   iast: 'satye'    }, pl: { dev: 'सत्यानि',  iast: 'satyāni'  } },
    { en: 'peace',    sg: { dev: 'शान्तिः', iast: 'śāntiḥ'   }, du: { dev: 'शान्ती',  iast: 'śāntī'    }, pl: { dev: 'शान्तयः',  iast: 'śāntayaḥ' } },
    { en: 'happiness',sg: { dev: 'सुखम्',   iast: 'sukham'   }, du: { dev: 'सुखे',    iast: 'sukhe'    }, pl: { dev: 'सुखानि',   iast: 'sukhāni'  } },
    { en: 'liberation',sg:{ dev: 'मोक्षः',  iast: 'mokṣaḥ'  }, du: { dev: 'मोक्षौ',  iast: 'mokṣau'  }, pl: { dev: 'मोक्षाः',  iast: 'mokṣāḥ'  } },
    { en: 'devotion', sg: { dev: 'भक्तिः',  iast: 'bhaktiḥ'  }, du: { dev: 'भक्ती',   iast: 'bhaktī'   }, pl: { dev: 'भक्तयः',   iast: 'bhaktayaḥ'} },
  ],
}

const VACHA_CAT_META = {
  Person:  { label: 'Person',  labelDev: 'व्यक्ति', color: 'var(--gold-light)',  bg: 'rgba(232,184,75,0.10)'  },
  Place:   { label: 'Place',   labelDev: 'स्थान',   color: 'var(--teal)',        bg: 'rgba(58,158,138,0.10)'  },
  Nature:  { label: 'Nature',  labelDev: 'प्रकृति', color: 'var(--saffron)',     bg: 'rgba(232,130,26,0.10)'  },
  Animal:  { label: 'Animal',  labelDev: 'पशु',     color: 'var(--terracotta)', bg: 'rgba(184,92,56,0.10)'   },
  Body:    { label: 'Body',    labelDev: 'शरीर',    color: 'var(--purple)',      bg: 'rgba(139,109,181,0.10)' },
  Thing:   { label: 'Thing',   labelDev: 'वस्तु',   color: 'var(--cream-dim)',   bg: 'rgba(168,144,112,0.10)' },
  Concept: { label: 'Concept', labelDev: 'विचार',   color: 'var(--gold)',        bg: 'rgba(201,148,42,0.10)'  },
}

const VACHA_CATS = ['Person', 'Place', 'Nature', 'Animal', 'Body', 'Thing', 'Concept']

const VACHA_EXAMPLE_SENTENCES = [
  {
    num: 'Singular', numDev: 'एकवचनम्',
    color: 'var(--gold-light)', bg: 'rgba(232,184,75,0.07)',
    sentences: [
      { dev: 'बालकः पठति।',           iast: 'bālakaḥ paṭhati.',          en: 'The boy reads.' },
      { dev: 'नदी वहति।',             iast: 'nadī vahati.',               en: 'The river flows.' },
      { dev: 'पुष्पम् सुन्दरम् अस्ति।', iast: 'puṣpam sundaram asti.',   en: 'The flower is beautiful.' },
    ],
  },
  {
    num: 'Dual', numDev: 'द्विवचनम्',
    color: 'var(--teal)', bg: 'rgba(58,158,138,0.07)',
    sentences: [
      { dev: 'बालकौ पठतः।',           iast: 'bālakau paṭhataḥ.',          en: 'The two boys read.' },
      { dev: 'गजौ वनं गच्छतः।',       iast: 'gajau vanaṃ gacchataḥ.',    en: 'The two elephants go to the forest.' },
      { dev: 'नेत्रे सुन्दरे स्तः।',  iast: 'netre sundare staḥ.',        en: 'The two eyes are beautiful.' },
    ],
  },
  {
    num: 'Plural', numDev: 'बहुवचनम्',
    color: 'var(--saffron)', bg: 'rgba(232,130,26,0.07)',
    sentences: [
      { dev: 'बालकाः पठन्ति।',        iast: 'bālakāḥ paṭhanti.',          en: 'The boys read.' },
      { dev: 'गजाः वनं गच्छन्ति।',    iast: 'gajāḥ vanaṃ gacchanti.',    en: 'The elephants go to the forest.' },
      { dev: 'पुष्पाणि सुन्दराणि सन्ति।', iast: 'puṣpāṇi suṃdarāṇi santi.', en: 'The flowers are beautiful.' },
    ],
  },
]

function VachanamLesson() {
  const [activeCat, setActiveCat] = useState('Person')
  const [wordIdx,   setWordIdx]   = useState(0)
  const [activeNum, setActiveNum] = useState(null)

  const m    = VACHA_CAT_META[activeCat]
  const opts = VACHANAM_WORDS[activeCat]
  const noun = opts[wordIdx]

  function handleCat(cat) { setActiveCat(cat); setWordIdx(0) }

  return (
    <div className="gr-lesson">
      <table className="gr-table gr-vacha-intro-table">
        <thead>
          <tr><th>Number · वचनम्</th><th>Sanskrit</th><th>Meaning</th><th>When to use</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Singular</strong></td>
            <td><span className="gr-dev">एकवचनम्</span><br/><span className="gr-iast">ekavachanam</span></td>
            <td>one</td>
            <td>Exactly one thing</td>
          </tr>
          <tr>
            <td><strong>Dual</strong></td>
            <td><span className="gr-dev">द्विवचनम्</span><br/><span className="gr-iast">dvivachanam</span></td>
            <td>two</td>
            <td>Exactly two — unique to Sanskrit</td>
          </tr>
          <tr>
            <td><strong>Plural</strong></td>
            <td><span className="gr-dev">बहुवचनम्</span><br/><span className="gr-iast">bahuvachanam</span></td>
            <td>many</td>
            <td>Three or more</td>
          </tr>
        </tbody>
      </table>

      {/* Category selector */}
      <div className="gr-vacha-cats">
        {VACHA_CATS.map(cat => {
          const cm = VACHA_CAT_META[cat]
          const active = cat === activeCat
          return (
            <button
              key={cat}
              className={`gr-vacha-cat-btn${active ? ' active' : ''}`}
              style={{
                borderColor: cm.color,
                color: active ? 'var(--bg-deep)' : cm.color,
                background: active ? cm.color : cm.bg,
              }}
              onClick={() => handleCat(cat)}
            >
              <span className="gr-vacha-cat-btn-label">{cm.label}</span>
              <span className="gr-vacha-cat-btn-dev" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{cm.labelDev}</span>
            </button>
          )
        })}
      </div>

      {/* Word dropdown */}
      <div className="gr-vacha-picker">
        <label className="gr-vacha-picker-label" style={{ color: m.color }}>Select a {m.label.toLowerCase()}:</label>
        <select
          className="gr-vacha-select"
          style={{ borderColor: m.color, color: m.color }}
          value={wordIdx}
          onChange={e => setWordIdx(Number(e.target.value))}
        >
          {opts.map((o, i) => (
            <option key={i} value={i}>{o.en}</option>
          ))}
        </select>
      </div>

      {/* 3 forms display */}
      <div className="gr-vacha-forms" style={{ borderColor: m.color }}>
        {[
          { label: 'Singular', labelDev: 'एकवचनम्', f: noun.sg },
          { label: 'Dual',     labelDev: 'द्विवचनम्', f: noun.du },
          { label: 'Plural',   labelDev: 'बहुवचनम्', f: noun.pl },
        ].map(({ label, labelDev, f }) => (
          <div key={label} className="gr-vacha-form-card" style={{ borderTopColor: m.color }}>
            <div className="gr-vacha-form-num" style={{ color: m.color }}>{label}</div>
            <div className="gr-vacha-form-numdev">{labelDev}</div>
            <div className="gr-spk-row"><span className="gr-dev gr-vacha-form-dev">{f.dev}</span><Spk text={f.dev} small /></div>
            <div className="gr-iast gr-vacha-form-iast">{f.iast}</div>
          </div>
        ))}
      </div>

      {/* Example sentences per form */}
      <div className="gr-vacha-examples">
        {VACHA_EXAMPLE_SENTENCES.map(({ num, numDev, color, bg, sentences }) => {
          const open = activeNum === num
          return (
            <div key={num} className={`gr-vacha-ex-group${open ? ' open' : ''}`} style={{ borderColor: color, background: open ? bg : 'transparent' }}>
              <button
                className="gr-vacha-ex-group-hd"
                style={{ color }}
                onClick={() => setActiveNum(open ? null : num)}
                aria-expanded={open}
              >
                <div style={{ display:'flex', alignItems:'baseline', gap:'0.5rem' }}>
                  <span className="gr-vacha-ex-num">{num}</span>
                  <span className="gr-dev gr-vacha-ex-numdev">{numDev}</span>
                </div>
                <span style={{ fontSize:'0.7rem', color, opacity:0.8 }}>{open ? '▲' : '▼'}</span>
              </button>

              {open && (
                <div className="gr-vacha-ex-body anim-fade-up">
                  {sentences.map((s, i) => (
                    <div key={i} className="gr-vacha-ex-sent">
                      <div className="gr-spk-row"><span className="gr-dev gr-vacha-ex-dev" style={{ color, fontWeight:700, fontSize:'1.1rem' }}>{s.dev}</span><Spk text={s.dev} small /></div>
                      <div className="gr-iast gr-vacha-ex-iast">{s.iast}</div>
                      <div className="gr-vacha-ex-en">{s.en}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 <strong>Tip:</strong> Sanskrit is one of the few languages with a true dual. Use <em>द्विवचनम्</em> only for exactly two — three or more always takes plural.
      </div>
    </div>
  )
}

const NOUN_TYPES = [
  {
    key:   'proper',
    label: 'Proper Noun',
    labelDev: 'व्यक्तिवाचकम्',
    labelIast: 'vyaktivācakam',
    color: 'var(--gold-light)',
    bg:    'rgba(232,184,75,0.08)',
    def:   'Names a specific person, place, or thing. Always refers to one unique entity.',
    words: [
      { dev: 'रामः',    iast: 'rāmaḥ',    en: 'Rāma (a person)'      },
      { dev: 'गङ्गा',   iast: 'gaṅgā',    en: 'Gaṅgā (a river)'      },
      { dev: 'अयोध्या', iast: 'ayodhyā',  en: 'Ayodhyā (a city)'     },
      { dev: 'कृष्णः',  iast: 'kṛṣṇaḥ',  en: 'Kṛṣṇa (a deity)'     },
    ],
    sentences: [
      { dev: 'रामः वनं गच्छति।',          iast: 'rāmaḥ vanaṃ gacchati.',         en: 'Rāma goes to the forest.' },
      { dev: 'गङ्गा पवित्रा अस्ति।',      iast: 'gaṅgā pavitrā asti.',            en: 'The Gaṅgā is holy.' },
    ],
  },
  {
    key:   'common',
    label: 'Common Noun',
    labelDev: 'जातिवाचकम्',
    labelIast: 'jātivācakam',
    color: 'var(--teal)',
    bg:    'rgba(58,158,138,0.08)',
    def:   'Names any member of a class or category — any boy, any river, any tree.',
    words: [
      { dev: 'बालकः',  iast: 'bālakaḥ', en: 'boy'   },
      { dev: 'नदी',    iast: 'nadī',     en: 'river' },
      { dev: 'वृक्षः', iast: 'vṛkṣaḥ',  en: 'tree'  },
      { dev: 'पुस्तकम्',iast: 'pustakam',en: 'book'  },
    ],
    sentences: [
      { dev: 'बालकः पठति।',              iast: 'bālakaḥ paṭhati.',               en: 'The boy reads.' },
      { dev: 'नदी वहति।',                iast: 'nadī vahati.',                    en: 'The river flows.' },
    ],
  },
  {
    key:   'abstract',
    label: 'Abstract Noun',
    labelDev: 'भाववाचकम्',
    labelIast: 'bhāvavācakam',
    color: 'var(--purple)',
    bg:    'rgba(139,109,181,0.08)',
    def:   'Names a quality, state, feeling, or idea — something that cannot be touched or seen.',
    words: [
      { dev: 'ज्ञानम्', iast: 'jñānam',   en: 'knowledge'     },
      { dev: 'शान्तिः', iast: 'śāntiḥ',   en: 'peace'         },
      { dev: 'धर्मः',   iast: 'dharmaḥ',  en: 'righteousness' },
      { dev: 'भक्तिः',  iast: 'bhaktiḥ',  en: 'devotion'      },
    ],
    sentences: [
      { dev: 'ज्ञानम् एव शक्तिः।',       iast: 'jñānam eva śaktiḥ.',             en: 'Knowledge itself is power.' },
      { dev: 'भक्तिः मोक्षं ददाति।',     iast: 'bhaktiḥ mokṣaṃ dadāti.',        en: 'Devotion grants liberation.' },
    ],
  },
  {
    key:   'collective',
    label: 'Collective Noun',
    labelDev: 'समूहवाचकम्',
    labelIast: 'samūhavācakam',
    color: 'var(--saffron)',
    bg:    'rgba(232,130,26,0.08)',
    def:   'Names a group or collection of people, animals, or things treated as a single unit.',
    words: [
      { dev: 'सेना',    iast: 'senā',     en: 'army'         },
      { dev: 'गणः',    iast: 'gaṇaḥ',    en: 'group / flock'},
      { dev: 'वनम्',   iast: 'vanam',     en: 'forest (collection of trees)' },
      { dev: 'समाजः',  iast: 'samājaḥ',  en: 'society'      },
    ],
    sentences: [
      { dev: 'सेना युद्धं करोति।',        iast: 'senā yuddhaṃ karoti.',           en: 'The army fights.' },
      { dev: 'गणः वनं गच्छति।',          iast: 'gaṇaḥ vanaṃ gacchati.',          en: 'The flock goes to the forest.' },
    ],
  },
  {
    key:   'material',
    label: 'Material Noun',
    labelDev: 'द्रव्यवाचकम्',
    labelIast: 'dravyavācakam',
    color: 'var(--terracotta)',
    bg:    'rgba(184,92,56,0.08)',
    def:   'Names a substance or material from which things are made. Usually uncountable.',
    words: [
      { dev: 'सुवर्णम्', iast: 'suvarṇam', en: 'gold'  },
      { dev: 'जलम्',     iast: 'jalam',    en: 'water' },
      { dev: 'काष्ठम्',  iast: 'kāṣṭham', en: 'wood'  },
      { dev: 'दुग्धम्',  iast: 'dugdham',  en: 'milk'  },
    ],
    sentences: [
      { dev: 'जलम् जीवनम् अस्ति।',       iast: 'jalam jīvanam asti.',             en: 'Water is life.' },
      { dev: 'सुवर्णम् बहुमूल्यम् अस्ति।',iast: 'suvarṇam bahumūlyam asti.',     en: 'Gold is very precious.' },
    ],
  },
]

function NounsLesson() {
  const [active, setActive] = useState(null)

  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">
        Sanskrit nouns are classified by <strong>type</strong> — what kind of entity they name.
        Each type has distinct grammatical and semantic properties.
      </div>

      <div className="gr-noun-types">
        {NOUN_TYPES.map(t => {
          const open = active === t.key
          return (
            <div key={t.key} className={`gr-noun-card${open ? ' open' : ''}`}
              style={{ borderColor: t.color, background: open ? t.bg : 'var(--bg-card)' }}>

              {/* Header — always visible, click to toggle */}
              <button className="gr-noun-card-hd" onClick={() => setActive(open ? null : t.key)}>
                <div className="gr-noun-card-title">
                  <span className="gr-noun-type-badge" style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}` }}>
                    {t.label}
                  </span>
                  <span className="gr-dev gr-noun-dev">{t.labelDev}</span>
                  <span className="gr-iast gr-noun-iast">{t.labelIast}</span>
                </div>
                <span className="gr-noun-chevron" style={{ color: t.color }}>{open ? '▲' : '▼'}</span>
              </button>

              {open && (
                <div className="gr-noun-body">
                  <p className="gr-noun-def">{t.def}</p>

                  {/* Examples */}
                  <div className="gr-noun-section-label" style={{ color: t.color }}>Examples</div>
                  <div className="gr-noun-words">
                    {t.words.map((w, i) => (
                      <div key={i} className="gr-noun-word" style={{ borderColor: t.color }}>
                        <div className="gr-spk-row"><span className="gr-dev gr-noun-word-dev">{w.dev}</span><Spk text={w.dev} small /></div>
                        <span className="gr-iast gr-noun-word-iast">{w.iast}</span>
                        <span className="gr-noun-word-en">{w.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sentences */}
                  <div className="gr-noun-section-label" style={{ color: t.color }}>Example sentences</div>
                  <div className="gr-noun-sentences">
                    {t.sentences.map((s, i) => (
                      <div key={i} className="gr-noun-sentence" style={{ borderLeftColor: t.color }}>
                        <div className="gr-spk-row"><span className="gr-dev gr-noun-sent-dev">{s.dev}</span><Spk text={s.dev} small /></div>
                        <div className="gr-iast gr-noun-sent-iast">{s.iast}</div>
                        <div className="gr-noun-sent-en">{s.en}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 <strong>Tip:</strong> Proper nouns are always capitalized in transliteration. Abstract and material nouns are usually neuter in Sanskrit.
      </div>
    </div>
  )
}

const PERSON_GROUPS = [
  { label: '3rd Person', person: '3rd', keys: ['p3sg','p3du','p3pl'], endings: ['-ti','-taḥ','-nti'] },
  { label: '2nd Person', person: '2nd', keys: ['p2sg','p2du','p2pl'], endings: ['-si','-thaḥ','-tha'] },
  { label: '1st Person', person: '1st', keys: ['p1sg','p1du','p1pl'], endings: ['-mi','-vaḥ','-maḥ'] },
]
const NUM_COLORS = [
  { label: 'Singular', color: 'var(--gold)',    bg: 'rgba(232,184,75,0.10)'  },
  { label: 'Dual',     color: 'var(--teal)',    bg: 'rgba(58,158,138,0.10)'  },
  { label: 'Plural',   color: 'var(--saffron)', bg: 'rgba(232,130,26,0.10)'  },
]

function EndingsLesson() {
  const { play } = useSoundEffects()
  const [activeEx,   setActiveEx]   = useState(null)
  const [activeVerb, setActiveVerb] = useState(VERBS[0].id)

  const verb     = VERBS.find(v => v.id === activeVerb)
  const verbExs  = VERB_EXAMPLES[activeVerb] || {}
  // Build p3sg and p1sg forms for the formula examples
  const p3sg = verb.forms?.p3sg
  const p1sg = verb.forms?.p1sg

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

      {/* Verb selector */}
      <div className="gr-sel-group" style={{marginTop:'1.25rem'}}>
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb}
          onChange={e => { play('tap'); setActiveVerb(e.target.value); setActiveEx(null) }}>
          {VERBS.map(v => (
            <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
          ))}
        </select>
      </div>

      {/* Dynamic formation example */}
      <div className="gr-example-box">
        <div className="gr-example-title">Formation — {verb.root} ({verb.rootIast}) — stem: {verb.stemIast}</div>
        {p3sg && (
          <div className="gr-formula">
            <span className="gr-pill"><span className="gr-dev">{verb.stemDev || verb.root.replace('√','')}</span> <em>{verb.stemIast}</em></span>
            <span className="gr-plus">+</span>
            <span className="gr-pill"><span className="gr-dev">ति</span> <em>ti</em></span>
            <span className="gr-eq">=</span>
            <span className="gr-pill gr-pill-gold"><span className="gr-spk-row"><span className="gr-dev">{p3sg[0]}</span><Spk text={p3sg[0]} small /></span> <em>{p3sg[1]}</em> — {p3sg[2]}</span>
          </div>
        )}
        {p1sg && (
          <div className="gr-formula">
            <span className="gr-pill"><span className="gr-dev">{verb.stemDev || verb.root.replace('√','')}</span> <em>{verb.stemIast}</em></span>
            <span className="gr-plus">+</span>
            <span className="gr-pill"><span className="gr-dev">मि</span> <em>mi</em></span>
            <span className="gr-eq">=</span>
            <span className="gr-pill gr-pill-gold"><span className="gr-spk-row"><span className="gr-dev">{p1sg[0]}</span><Spk text={p1sg[0]} small /></span> <em>{p1sg[1]}</em> — {p1sg[2]}</span>
          </div>
        )}
      </div>

      {/* Conjugation table for selected verb */}
      <div className="gr-verb-header">
        <span className="gr-spk-row"><span className="gr-dev gr-verb-root">{verb.root}</span><Spk text={verb.root} small /></span>
        <span className="gr-iast">{verb.rootIast}</span>
        <span className="gr-verb-meaning">{verb.meaning}</span>
        <span className="gr-iast">stem: {verb.stemIast}</span>
      </div>
      {verb.note && <div className="gr-tip">⚠️ {verb.note}</div>}
      <table className="gr-table">
        <thead><tr><th>Person</th><th>Singular</th><th>Dual</th><th>Plural</th></tr></thead>
        <tbody>
          {VERB_FORM_ROWS.map(row => (
            <tr key={row.label}>
              <td className="gr-person">{row.label}</td>
              {row.keys.map(key => (
                <td key={key}>
                  <div className="gr-spk-row"><span className="gr-dev">{verb.forms[key][0]}</span><Spk text={verb.forms[key][0]} small /></div>
                  <span className="gr-iast">{verb.forms[key][1]}</span><br/>
                  <span className="gr-en">{verb.forms[key][2]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="gr-example-title" style={{marginTop:'1rem'}}>See every ending in use — {verb.root}</div>
      <div className="gr-ex-accordion">
        {PERSON_GROUPS.map(group => {
          const open = activeEx === group.person
          return (
            <div key={group.person} className={`gr-ex-acc-item${open ? ' open' : ''}`}>
              <button className="gr-ex-acc-hd" onClick={() => setActiveEx(open ? null : group.person)}>
                <div className="gr-ex-acc-hd-left">
                  <span className="gr-ex-acc-label">{group.label}</span>
                  <span className="gr-ex-acc-num-pills">
                    {NUM_COLORS.map((nc, i) => (
                      <span key={nc.label} className="gr-ex-acc-pill" style={{color: nc.color, borderColor: nc.color}}>{nc.label} <em>{group.endings[i]}</em></span>
                    ))}
                  </span>
                </div>
                <span className="gr-ex-acc-chevron">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="gr-ex-acc-body anim-fade-up">
                  {group.keys.map((key, ki) => {
                    const ex = verbExs[key]
                    const form = verb.forms[key]
                    const { color, bg, label } = NUM_COLORS[ki]
                    return (
                      <div key={key} className="gr-ex-num-card" style={{borderLeftColor: color, background: bg}}>
                        <div className="gr-ex-num-card-hd">
                          <span className="gr-ex-num-badge" style={{color, borderColor: color}}>{label}</span>
                          <span className="gr-ex-acc-ending" style={{color}}>{group.endings[ki]}</span>
                          {form && <span className="gr-dev" style={{color, fontWeight:700}}>{form[0]}</span>}
                        </div>
                        {ex ? (
                          <>
                            <div className="gr-spk-row"><span className="gr-dev gr-ex-acc-sent" style={{color}}>{ex.dev}</span><Spk text={ex.dev} small /></div>
                            <div className="gr-iast">{ex.iast}</div>
                            <div className="gr-en">{ex.en}</div>
                          </>
                        ) : form ? (
                          <>
                            <div className="gr-spk-row"><span className="gr-dev gr-ex-acc-sent" style={{color}}>{form[0]}</span><Spk text={form[0]} small /></div>
                            <div className="gr-iast">{form[1]}</div>
                            <div className="gr-en">{form[2]}</div>
                          </>
                        ) : (
                          <span className="gr-iast" style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>No example available.</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 <strong>Pattern:</strong> 3rd person ends in <em>-ti / -taḥ / -nti</em>.
        2nd in <em>-si / -thaḥ / -tha</em>. 1st in <em>-mi / -vaḥ / -maḥ</em>.
      </div>
    </div>
  )
}

const VERB_FORM_ROWS = [
  { label: '3rd', keys: ['p3sg','p3du','p3pl'], nums: ['Singular','Dual','Plural'] },
  { label: '2nd', keys: ['p2sg','p2du','p2pl'], nums: ['Singular','Dual','Plural'] },
  { label: '1st', keys: ['p1sg','p1du','p1pl'], nums: ['Singular','Dual','Plural'] },
]

function VerbsLesson() {
  const [activeVerb, setActiveVerb] = useState(VERBS[0].id)
  const [activeEx,   setActiveEx]   = useState(null)
  const verb = VERBS.find(v => v.id === activeVerb)
  const verbExamples = VERB_EXAMPLES[activeVerb] || {}

  function handleVerbChange(id) { setActiveVerb(id); setActiveEx(null) }

  return (
    <div className="gr-lesson">
      <div className="gr-sel-group">
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb} onChange={e => handleVerbChange(e.target.value)}>
          {VERBS.map(v => (
            <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
          ))}
        </select>
      </div>

      <div className="gr-verb-header">
        <span className="gr-spk-row"><span className="gr-dev gr-verb-root">{verb.root}</span><Spk text={verb.root} small /></span>
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
          {VERB_FORM_ROWS.map(row => (
            <tr key={row.label}>
              <td className="gr-person">{row.label}</td>
              {row.keys.map(key => (
                <td key={key}>
                  <div className="gr-spk-row"><span className="gr-dev">{verb.forms[key][0]}</span><Spk text={verb.forms[key][0]} small /></div>
                  <span className="gr-iast">{verb.forms[key][1]}</span><br/>
                  <span className="gr-en">{verb.forms[key][2]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Example sentences accordion — grouped by person */}
      <div className="gr-example-title" style={{marginTop:'1.25rem'}}>Example sentences</div>
      <div className="gr-ex-accordion">
        {PERSON_GROUPS.map(group => {
          const open = activeEx === group.person
          return (
            <div key={group.person} className={`gr-ex-acc-item${open ? ' open' : ''}`}>
              <button className="gr-ex-acc-hd" onClick={() => setActiveEx(open ? null : group.person)}>
                <div className="gr-ex-acc-hd-left">
                  <span className="gr-ex-acc-label">{group.label}</span>
                  <span className="gr-ex-acc-num-pills">
                    {NUM_COLORS.map((nc, i) => (
                      <span key={nc.label} className="gr-ex-acc-pill" style={{color: nc.color, borderColor: nc.color}}>{nc.label}</span>
                    ))}
                  </span>
                </div>
                <span className="gr-ex-acc-chevron">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="gr-ex-acc-body anim-fade-up">
                  {group.keys.map((key, ki) => {
                    const ex = verbExamples[key]
                    const { color, bg, label } = NUM_COLORS[ki]
                    return (
                      <div key={key} className="gr-ex-num-card" style={{borderLeftColor: color, background: bg}}>
                        <div className="gr-ex-num-card-hd">
                          <span className="gr-ex-num-badge" style={{color, borderColor: color}}>{label}</span>
                          <span className="gr-dev" style={{color, fontWeight:700}}>{verb.forms[key][0]}</span>
                          <span className="gr-iast" style={{fontSize:'0.78rem',color:'var(--text-muted)'}}>{verb.forms[key][1]}</span>
                        </div>
                        {ex ? (
                          <>
                            <div className="gr-spk-row"><span className="gr-dev gr-ex-acc-sent" style={{color}}>{ex.dev}</span><Spk text={ex.dev} small /></div>
                            <div className="gr-iast">{ex.iast}</div>
                            <div className="gr-en">{ex.en}</div>
                          </>
                        ) : (
                          <span className="gr-iast" style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>No example available.</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
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

      <div className="gr-sel-group">
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb} onChange={e => setActiveVerb(e.target.value)}>
          {VERBS.map(v => (
            <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
          ))}
        </select>
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
                  <div className="gr-spk-row"><span className="gr-dev">{pos[0]}</span><Spk text={pos[0]} small /></div>
                  <span className="gr-iast">{pos[1]}</span><br/>
                  <span className="gr-en">{pos[2]}</span>
                </td>
                <td>
                  <div className="gr-spk-row"><span className="gr-dev gr-neg">{neg[0]}</span><Spk text={neg[0]} small /></div>
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
                <span className="gr-spk-row"><span className="gr-dev">{s.subject.dev}</span><Spk text={s.subject.dev} small /></span>
                <span className="gr-iast">{s.subject.iast}</span>
                <span className="gr-en">{s.subject.en}</span>
              </span>
              <span className="gr-part gr-part-obj">
                <span className="gr-part-label">object</span>
                <span className="gr-spk-row"><span className="gr-dev">{s.object.dev}</span><Spk text={s.object.dev} small /></span>
                <span className="gr-iast">{s.object.iast}</span>
                <span className="gr-en">{s.object.en}</span>
              </span>
              <span className="gr-part gr-part-verb">
                <span className="gr-part-label">verb</span>
                <span className="gr-spk-row"><span className="gr-dev">{s.verb.dev}</span><Spk text={s.verb.dev} small /></span>
                <span className="gr-iast">{s.verb.iast}</span>
                <span className="gr-en">{s.verb.en}</span>
              </span>
            </div>
            <div className="gr-sentence-full">
              <span className="gr-spk-row"><span className="gr-dev">{s.full.dev}</span><Spk text={s.full.dev} small /></span>
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
                <div className="gr-spk-row"><span className="gr-dev">{pair.q.dev}</span><Spk text={pair.q.dev} small /></div>
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
                    <div className="gr-spk-row"><span className="gr-dev">{pair.a.dev}</span><Spk text={pair.a.dev} small /></div>
                    <div className="gr-iast">{pair.a.iast}</div>
                    <div className="gr-en">{pair.a.en}</div>
                  </div>
                </div>
                <div className="gr-qa-row gr-qa-neg">
                  <span className="gr-qa-badge gr-qa-badge-n">✗</span>
                  <div>
                    <div className="gr-spk-row"><span className="gr-dev">{pair.neg.dev}</span><Spk text={pair.neg.dev} small /></div>
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

const SUBJECT_NOUNS = [
  // Masculine पुंलिङ्गम्
  { id:'balaka',  linga:'m', en:'boy',      enPl:'boys',
    forms:{ sg:{dev:'बालकः', iast:'bālakaḥ'}, du:{dev:'बालकौ',  iast:'bālakau'},  pl:{dev:'बालकाः', iast:'bālakāḥ'} } },
  { id:'nara',    linga:'m', en:'man',      enPl:'men',
    forms:{ sg:{dev:'नरः',   iast:'naraḥ'},   du:{dev:'नरौ',    iast:'narau'},    pl:{dev:'नराः',   iast:'narāḥ'} } },
  { id:'guru',    linga:'m', en:'teacher',  enPl:'teachers',
    forms:{ sg:{dev:'गुरुः', iast:'guruḥ'},   du:{dev:'गुरू',   iast:'gurū'},     pl:{dev:'गुरवः',  iast:'guravaḥ'} } },
  { id:'deva',    linga:'m', en:'god',      enPl:'gods',
    forms:{ sg:{dev:'देवः',  iast:'devaḥ'},   du:{dev:'देवौ',   iast:'devau'},    pl:{dev:'देवाः',  iast:'devāḥ'} } },
  { id:'raja',    linga:'m', en:'king',     enPl:'kings',
    forms:{ sg:{dev:'राजा',  iast:'rājā'},    du:{dev:'राजानौ', iast:'rājānau'},  pl:{dev:'राजानः', iast:'rājānaḥ'} } },
  { id:'muni',    linga:'m', en:'sage',     enPl:'sages',
    forms:{ sg:{dev:'मुनिः', iast:'muniḥ'},   du:{dev:'मुनी',   iast:'munī'},     pl:{dev:'मुनयः',  iast:'munayaḥ'} } },
  { id:'shishya', linga:'m', en:'student',  enPl:'students',
    forms:{ sg:{dev:'शिष्यः',iast:'śiṣyaḥ'},  du:{dev:'शिष्यौ', iast:'śiṣyau'},   pl:{dev:'शिष्याः',iast:'śiṣyāḥ'} } },
  { id:'gaja',    linga:'m', en:'elephant', enPl:'elephants',
    forms:{ sg:{dev:'गजः',   iast:'gajaḥ'},   du:{dev:'गजौ',    iast:'gajau'},    pl:{dev:'गजाः',   iast:'gajāḥ'} } },
  // Feminine स्त्रीलिङ्गम्
  { id:'balika',  linga:'f', en:'girl',     enPl:'girls',
    forms:{ sg:{dev:'बालिका',iast:'bālikā'},  du:{dev:'बालिके', iast:'bālike'},   pl:{dev:'बालिकाः',iast:'bālikāḥ'} } },
  { id:'mata',    linga:'f', en:'mother',   enPl:'mothers',
    forms:{ sg:{dev:'माता',  iast:'mātā'},    du:{dev:'मातरौ',  iast:'mātarau'},  pl:{dev:'मातरः',  iast:'mātaraḥ'} } },
  { id:'nadi',    linga:'f', en:'river',    enPl:'rivers',
    forms:{ sg:{dev:'नदी',   iast:'nadī'},    du:{dev:'नद्यौ',  iast:'nadyau'},   pl:{dev:'नद्यः',  iast:'nadyaḥ'} } },
  { id:'sita',    linga:'f', en:'Sītā',     enPl:'Sītā',
    forms:{ sg:{dev:'सीता',  iast:'sītā'},    du:{dev:'सीते',   iast:'sīte'},     pl:{dev:'सीताः',  iast:'sītāḥ'} } },
  { id:'kanya',   linga:'f', en:'maiden',   enPl:'maidens',
    forms:{ sg:{dev:'कन्या', iast:'kanyā'},   du:{dev:'कन्ये',  iast:'kanye'},    pl:{dev:'कन्याः', iast:'kanyāḥ'} } },
  { id:'devi',    linga:'f', en:'goddess',  enPl:'goddesses',
    forms:{ sg:{dev:'देवी',  iast:'devī'},    du:{dev:'देव्यौ', iast:'devyau'},   pl:{dev:'देव्यः', iast:'devyaḥ'} } },
  // Neuter नपुंसकलिङ्गम्
  { id:'pustaka', linga:'n', en:'book',     enPl:'books',
    forms:{ sg:{dev:'पुस्तकम्',iast:'pustakam'}, du:{dev:'पुस्तके', iast:'pustake'},  pl:{dev:'पुस्तकानि',iast:'pustakāni'} } },
  { id:'phala',   linga:'n', en:'fruit',    enPl:'fruits',
    forms:{ sg:{dev:'फलम्',  iast:'phalam'},  du:{dev:'फले',    iast:'phale'},    pl:{dev:'फलानि',  iast:'phalāni'} } },
  { id:'vana',    linga:'n', en:'forest',   enPl:'forests',
    forms:{ sg:{dev:'वनम्',  iast:'vanam'},   du:{dev:'वने',    iast:'vane'},     pl:{dev:'वनानि',  iast:'vanāni'} } },
  { id:'jala',    linga:'n', en:'water',    enPl:'water',
    forms:{ sg:{dev:'जलम्',  iast:'jalam'},   du:{dev:'जले',    iast:'jale'},     pl:{dev:'जलानि',  iast:'jalāni'} } },
  { id:'karma',   linga:'n', en:'deed',     enPl:'deeds',
    forms:{ sg:{dev:'कर्म',  iast:'karma'},   du:{dev:'कर्मणी', iast:'karmaṇī'},  pl:{dev:'कर्माणि',iast:'karmāṇi'} } },
]

function ExplorerLesson() {
  const { play } = useSoundEffects()
  const { speak } = useSpeech()
  const [tense,      setTense]      = useState('present')
  const [purusha,    setPurusha]    = useState('3')
  const [linga,      setLinga]      = useState('m')
  const [vachanam,   setVachanam]   = useState('sg')
  const [verbFilter, setVerbFilter] = useState(VERBS[0].id)
  const [subject,    setSubject]    = useState('pronoun')

  // Build the form key, e.g. p3sg, p2du, p1pl
  const formKey   = `p${purusha}${vachanam}`
  const showVerbs = verbFilter === 'all' ? VERBS : VERBS.filter(v => v.id === verbFilter)
  const pronoun   = PRONOUN_TABLE[purusha][linga][vachanam].dev
  const purObj  = PURUSHAS.find(p => p.id === purusha)
  const vacObj  = VACHANAMS.find(v => v.id === vachanam)

  // Pick the right forms for the selected tense
  const getTenseForms = (verb) => tense === 'present' ? verb.forms : verb[tense]

  const selectedNoun = subject !== 'pronoun' ? SUBJECT_NOUNS.find(n => n.id === subject) : null

  // Build an example sentence: swap verb for non-present tenses,
  // swap subject pronoun/noun when 3rd-person gender or selected subject changes.
  const getExample = (verbId, formKey, form) => {
    const presentEx = VERB_EXAMPLES[verbId]?.[formKey]
    if (!presentEx) return null
    // Present tense, masculine, pronoun subject — return stored sentence unchanged
    if (tense === 'present' && (purusha !== '3' || linga === 'm') && !selectedNoun) return presentEx
    if (tense !== 'present' && !form) return null

    const devWords  = presentEx.dev.replace('।', '').split(' ')
    const iastWords = presentEx.iast.replace(/[.?!]$/, '').split(' ')

    // Swap verb (last word) for non-present tenses
    if (tense !== 'present') {
      devWords[devWords.length - 1]   = form[0]
      iastWords[iastWords.length - 1] = form[1]
    }

    // Swap subject for 3rd person: pronoun gender change OR noun selection
    if (purusha === '3') {
      if (selectedNoun) {
        // Replace first word with selected noun in correct vachanam form
        const nf = selectedNoun.forms[vachanam]
        devWords[0]   = nf.dev
        iastWords[0]  = nf.iast
      } else if (linga !== 'm') {
        // Replace masculine pronoun with gendered pronoun
        const mascPron = PRONOUN_TABLE['3']['m'][vachanam]
        const newPron  = PRONOUN_TABLE['3'][linga][vachanam]
        if (devWords[0]   === mascPron.dev)  devWords[0]   = newPron.dev
        if (iastWords[0]  === mascPron.iast) iastWords[0]  = newPron.iast
      }
    }

    const punct = presentEx.iast.match(/[?!]$/) ? presentEx.iast.slice(-1) : '.'
    let en = tense === 'present' ? presentEx.en : form[2]

    if (purusha === '3') {
      if (selectedNoun) {
        // Build English subject phrase
        const subEn = vachanam === 'sg' ? `The ${selectedNoun.en}`
                    : vachanam === 'du' ? `The two ${selectedNoun.enPl}`
                    : `The ${selectedNoun.enPl}`
        // Replace known pronoun patterns at start of English sentence
        en = en
          .replace(/^He /, `${subEn} `)
          .replace(/^She /, `${subEn} `)
          .replace(/^It /, `${subEn} `)
          .replace(/^They two /, `${subEn} `)
          .replace(/^They /, `${subEn} `)
          .replace(/^he\/she /, `${subEn} `)
          .replace(/^they two /, `${subEn} `)
          .replace(/^they /, `${subEn} `)
        // If none matched (sentence starts with "The boy..." etc.), replace after "The "
        if (!en.startsWith(subEn) && en.startsWith('The ')) {
          const rest = en.split(' ').slice(2).join(' ')
          en = `${subEn} ${rest}`
        }
      } else if (linga !== 'm' && tense === 'present') {
        if (linga === 'f') en = en.replace(/^He /, 'She ')
        if (linga === 'n') en = en.replace(/^He /, 'It ')
      }
    }

    return { dev: devWords.join(' ') + '।', iast: iastWords.join(' ') + punct, en }
  }

  // Ending highlight for this cell
  const endingRows = ENDINGS[tense] || ENDINGS.present
  const endingRow = endingRows.find(r =>
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
                onClick={() => { play('tap'); setTense(t.id) }}>
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
                onClick={() => { play('tap'); setPurusha(p.id); setSubject('pronoun') }}>
                <span className="gr-dev">{p.labelDev}</span>
                <span className="gr-sel-pill-sub">{p.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gender (only affects 3rd-person pronoun display) */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">
            Gender · लिङ्गम्
            {purusha !== '3' && <span className="gr-sel-label-note"> — not applicable for {purusha === '2' ? '2nd' : '1st'} person</span>}
          </div>
          <div className="gr-sel-pills">
            {LINGAS.map(l => (
              <button key={l.id}
                className={`gr-sel-pill ${linga === l.id ? 'active' : ''} ${purusha !== '3' ? 'gr-sel-pill-dim' : ''}`}
                onClick={() => { play('tap'); setLinga(l.id); setSubject('pronoun') }}>
                <span className="gr-dev" style={{fontSize:'0.8rem'}}>{l.labelDev}</span>
                <span className="gr-sel-pill-sub">{l.label} — {l.en}</span>
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
                onClick={() => { play('tap'); setVachanam(v.id); setSubject('pronoun') }}>
                <span className="gr-dev">{v.labelDev}</span>
                <span className="gr-sel-pill-sub">{v.label} — {v.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verb filter */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Verb · धातु</div>
          <select className="gr-verb-select" value={verbFilter} onChange={e => { play('tap'); setVerbFilter(e.target.value) }}>
            <option value="all">All verbs ({VERBS.length})</option>
            {VERBS.map(v => (
              <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
            ))}
          </select>
        </div>

        {/* Subject selector — only meaningful for 3rd person */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">
            Subject · कर्ता
            {purusha !== '3' && <span className="gr-sel-label-note"> — not applicable for {purusha === '2' ? '2nd' : '1st'} person</span>}
          </div>
          <select
            className={`gr-verb-select ${purusha !== '3' ? 'gr-select-dim' : ''}`}
            value={subject}
            disabled={purusha !== '3'}
            onChange={e => { play('tap'); setSubject(e.target.value) }}>
            <option value="pronoun">Pronoun — {pronoun} ({linga === 'm' ? 'he' : linga === 'f' ? 'she' : 'it'}/{vachanam === 'sg' ? 'singular' : vachanam === 'du' ? 'dual' : 'plural'})</option>
            {SUBJECT_NOUNS
              .filter(n => n.linga === linga)
              .map(n => {
                const f = n.forms[vachanam]
                return (
                  <option key={n.id} value={n.id}>
                    {f.dev} / {f.iast} — {n.en}
                  </option>
                )
              })
            }
          </select>
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
        {showVerbs.map(verb => {
          const tenseForms = getTenseForms(verb)
          const form = tenseForms?.[formKey]
          const ex   = getExample(verb.id, formKey, form)
          return (
            <div key={verb.id} className="gr-exp-verb-card">
              <div className="gr-exp-verb-head">
                <span className="gr-dev" style={{color:'var(--gold)', fontSize:'1rem'}}>{verb.root}</span>
                <span className="gr-iast">{verb.rootIast}</span>
                <span className="gr-exp-verb-meaning">{verb.meaning}</span>
              </div>
              <div className="gr-exp-form">
                {form ? <>
                  <div className="gr-exp-form-spoken">
                    <span className="gr-dev" style={{fontSize:'1.25rem'}}>{form[0]}</span>
                    <button className="speak-btn gr-speak-sm" onClick={() => speak(form[0])} title="Hear pronunciation"><SpeakIcon /></button>
                  </div>
                  <span className="gr-iast">{form[1]}</span>
                  <span className="gr-en" style={{color:'var(--text-primary)'}}>{form[2]}</span>
                </> : <span className="gr-iast" style={{color:'var(--text-muted)'}}>—</span>}
              </div>
              {ex && (
                <div className="gr-exp-example">
                  <div className="gr-exp-example-spoken">
                    <div className="gr-dev gr-ex-dev">{ex.dev}</div>
                    <button className="speak-btn" onClick={() => speak(ex.dev)} title="Hear sentence"><SpeakIcon /></button>
                  </div>
                  <div className="gr-iast gr-ex-iast">{ex.iast}</div>
                  <div className="gr-en gr-ex-en">{ex.en}</div>
                  <a
                    className="gr-verify-link"
                    href={`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(ex.dev)}&op=translate`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔍 Verify translation
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 All verbs use the <strong>same ending</strong> for the selected person + number.
        Only the stem changes — master the 9 endings once, read any verb.
      </div>
    </div>
  )
}

const GENDER_BADGE = { m: 'gr-gbadge-m', f: 'gr-gbadge-f', n: 'gr-gbadge-n' }
const GENDER_PRON  = { m: 'सः', f: 'सा', n: 'तत्' }

function GenderLesson() {
  const [selected, setSelected] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [activeGender, setActiveGender] = useState(null)

  const noun = GENDER_NOUNS_100.find(n => n.iast === selected)
  const cats = ['All', ...Array.from(new Set(GENDER_NOUNS_100.map(n => n.cat)))]

  return (
    <div className="gr-lesson">

      {/* ── Introduction table ── */}
      <table className="gr-table gr-gender-intro-table">
        <thead>
          <tr>
            <th>Gender · लिङ्गम्</th>
            <th>Sanskrit</th>
            <th>Typical ending</th>
            <th>Pronoun</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="gr-gbadge gr-gbadge-m" style={{fontSize:'0.75rem'}}>पुंलिङ्गम्</span><div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>masculine</div></td>
            <td><span className="gr-dev">पुंलिङ्गम्</span></td>
            <td><em style={{color:'#7aaeff', fontWeight:700, fontSize:'1.05rem'}}>-aḥ, -a</em></td>
            <td><span className="gr-dev">सः</span> <span className="gr-iast">saḥ</span></td>
            <td><span className="gr-dev">रामः</span> <span className="gr-iast">rāmaḥ</span></td>
          </tr>
          <tr>
            <td><span className="gr-gbadge gr-gbadge-f" style={{fontSize:'0.75rem'}}>स्त्रीलिङ्गम्</span><div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>feminine</div></td>
            <td><span className="gr-dev">स्त्रीलिङ्गम्</span></td>
            <td><em style={{color:'#ff9fc8', fontWeight:700, fontSize:'1.05rem'}}>-ā, -ī</em></td>
            <td><span className="gr-dev">सा</span> <span className="gr-iast">sā</span></td>
            <td><span className="gr-dev">सीता</span> <span className="gr-iast">sītā</span></td>
          </tr>
          <tr>
            <td><span className="gr-gbadge gr-gbadge-n" style={{fontSize:'0.75rem'}}>नपुंसकलिङ्गम्</span><div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>neuter</div></td>
            <td><span className="gr-dev">नपुंसकलिङ्गम्</span></td>
            <td><em style={{color:'#88d888', fontWeight:700, fontSize:'1.05rem'}}>-am, -a</em></td>
            <td><span className="gr-dev">तत्</span> <span className="gr-iast">tat</span></td>
            <td><span className="gr-dev">फलम्</span> <span className="gr-iast">phalam</span></td>
          </tr>
        </tbody>
      </table>
      <div className="gr-tip" style={{marginTop:'0.5rem'}}>
        💡 These endings are <strong>patterns, not rules</strong> — gender must always be memorized with each noun.
      </div>

      {/* ── 100-noun dropdown ── */}
      <div className="gr-example-title">Look up a noun · शब्दकोश</div>
      <div className="gr-gender-lookup">
        <div className="gr-gender-filter-row">
          {cats.map(c => (
            <button key={c}
              className={`gr-gender-cat-btn ${catFilter === c ? 'active' : ''}`}
              onClick={() => { setCatFilter(c); setSelected('') }}>
              {c}
            </button>
          ))}
        </div>
        <select className="gr-verb-select" value={selected}
          onChange={e => setSelected(e.target.value)}>
          <option value="">— select a noun ({catFilter === 'All' ? GENDER_NOUNS_100.length : GENDER_NOUNS_100.filter(n => n.cat === catFilter).length} words) —</option>
          {GENDER_NOUNS_100
            .filter(n => catFilter === 'All' || n.cat === catFilter)
            .map(n => (
              <option key={n.iast} value={n.iast}>
                {n.dev}  {n.iast}  —  {n.en}
              </option>
            ))}
        </select>

        {noun && (
          <div className="gr-gender-result">
            <div className="gr-gender-result-noun">
              <div className="gr-spk-row"><span className="gr-dev" style={{fontSize:'1.5rem'}}>{noun.dev}</span><Spk text={noun.dev} small /></div>
              <span className="gr-iast">{noun.iast}</span>
              <span className="gr-en">{noun.en}</span>
            </div>
            <div className={`gr-gbadge ${GENDER_BADGE[noun.g]}`}>
              {GENDER_DATA[noun.g].labelDev}
              <span style={{opacity:0.7, marginLeft:'0.4rem', fontSize:'0.75em'}}>{GENDER_DATA[noun.g].en}</span>
            </div>
            <div className="gr-gender-result-pron">
              Use pronoun: <span className="gr-spk-row"><span className="gr-dev">{GENDER_PRON[noun.g]}</span><Spk text={GENDER_PRON[noun.g]} small /></span>
              <span className="gr-iast" style={{marginLeft:'0.4rem'}}>{GENDER_DATA[noun.g].pronouns.sg.iast}</span>
              <span style={{color:'var(--text-secondary)', marginLeft:'0.4rem', fontSize:'0.85rem'}}>({GENDER_DATA[noun.g].pronouns.sg.en})</span>
            </div>
            <div className="gr-gender-result-hint">{GENDER_DATA[noun.g].hint}</div>
          </div>
        )}
      </div>

      {/* ── 3 genders — accordion ── */}
      <div className="gr-example-title" style={{marginTop:'0.5rem'}}>All 3 genders — example sentences</div>
      <div className="gr-gender-accordion">
        {['m','f','n'].map(g => {
          const gd = GENDER_DATA[g]
          const open = activeGender === g
          const badgeClass = GENDER_BADGE[g]
          return (
            <div key={g} className={`gr-gac-panel gr-gac-panel-${g}${open ? ' open' : ''}`}>
              <button
                className="gr-gac-hd"
                onClick={() => setActiveGender(open ? null : g)}
                aria-expanded={open}
              >
                <div className="gr-gac-hd-left">
                  <span className={`gr-gbadge ${badgeClass} gr-gac-badge`}>{gd.labelDev}</span>
                  <span className="gr-gac-en">{gd.en}</span>
                  <span className="gr-gac-iast">{gd.labelIast ?? (g === 'm' ? 'puṃliṅgam' : g === 'f' ? 'strīliṅgam' : 'napuṃsakaliṅgam')}</span>
                </div>
                <span className="gr-gac-chevron">{open ? '▲' : '▼'}</span>
              </button>

              {open && (
                <div className="gr-gac-body anim-fade-up">
                  {gd.examples.map(ex => (
                    <div key={ex.num} className="gr-gender-ex-card">
                      <div className="gr-gender-ex-num">{ex.num}</div>
                      <div className="gr-spk-row"><span className="gr-dev" style={{fontSize:'1.2rem', color:'var(--gold)', fontWeight:700}}>{ex.dev}</span><Spk text={ex.dev} small /></div>
                      <div className="gr-iast">{ex.iast}</div>
                      <div className="gr-en" style={{color:'var(--text-primary)', fontSize:'0.82rem'}}>{ex.en}</div>
                      <a
                        className="gr-verify-link"
                        href={`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(ex.dev)}&op=translate`}
                        target="_blank" rel="noopener noreferrer"
                      >🔍 Verify</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">
        💡 <strong>Pattern tip:</strong> nouns ending in <em>-aḥ</em> → usually masculine ·
        <em> -ā / -ī</em> → usually feminine ·
        <em> -am</em> → usually neuter. Exceptions exist — always learn gender with the noun.
      </div>

      {/* ── Full pronoun reference table ── */}
      <div className="gr-example-title" style={{marginTop:'1rem'}}>3rd-person pronouns by gender &amp; number</div>
      <table className="gr-table">
        <thead>
          <tr>
            <th>Gender · लिङ्गम्</th>
            <th>Singular (एक)</th>
            <th>Dual (द्वि)</th>
            <th>Plural (बहु)</th>
          </tr>
        </thead>
        <tbody>
          {['m','f','n'].map(g => {
            const gd = GENDER_DATA[g]
            return (
              <tr key={g}>
                <td>
                  <span className={`gr-gbadge ${GENDER_BADGE[g]}`} style={{fontSize:'0.72rem', padding:'0.15rem 0.5rem'}}>{gd.labelDev}</span>
                  <div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>{gd.en}</div>
                </td>
                {['sg','du','pl'].map(num => (
                  <td key={num}>
                    <div className="gr-spk-row"><span className="gr-dev">{gd.pronouns[num].dev}</span><Spk text={gd.pronouns[num].dev} small /></div>
                    <span className="gr-iast">{gd.pronouns[num].iast}</span>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const TENSE_INFO = {
  imperfect: {
    rule: <>The <strong>imperfect (लङ् laṅ)</strong> expresses a <em>past action</em>. It is formed by prefixing the augment <strong>अ (a-)</strong> to the present stem and using the laṅ endings instead of the present endings.</>,
    formula: { stemDev: 'पठ', stemIast: 'paṭha', endDev: 'त्', endIast: 't', resultDev: 'अपठत्', resultIast: 'apaṭhat', resultEn: 'he/she read' },
    tip: <>💡 <strong>Key rule:</strong> augment अ (a-) + present stem + laṅ endings. The 2nd person singular ends in -ḥ (visarga from -s).</>,
  },
  future: {
    rule: <>The <strong>future (लृट् lṛṭ)</strong> expresses a <em>future action</em>. It is formed by adding the suffix <strong>-इष्य (-iṣya)</strong> to the verbal root, then the standard present tense endings.</>,
    formula: { stemDev: 'पठ्', stemIast: 'paṭh', endDev: 'इष्यति', endIast: 'iṣyati', resultDev: 'पठिष्यति', resultIast: 'paṭhiṣyati', resultEn: 'he/she will read' },
    tip: <>💡 <strong>Key rule:</strong> verbal root + इष्य (iṣya) + present endings. Irregular verbs may have different future stems.</>,
  },
  imperative: {
    rule: <>The <strong>imperative (लोट् loṭ)</strong> expresses a <em>command, request, or wish</em>. The 2nd person singular is simply the bare stem; other forms use loṭ endings similar to the present.</>,
    formula: { stemDev: 'पठ', stemIast: 'paṭha', endDev: 'तु', endIast: 'tu', resultDev: 'पठतु', resultIast: 'paṭhatu', resultEn: 'let him/her read' },
    tip: <>💡 <strong>Key rule:</strong> 2nd person singular = bare stem (<em>paṭha</em> → read!). 3rd person sg ends in -tu. 3rd person pl ends in -ntu.</>,
  },
  optative: {
    rule: <>The <strong>optative (विधिलिङ् vidhi-liṅ)</strong> expresses <em>possibility, wish, duty, or advice</em> — "should", "would", "may". It is formed using the present stem + the optative vowel <strong>-e-</strong>.</>,
    formula: { stemDev: 'पठ', stemIast: 'paṭha', endDev: 'ेत्', endIast: 'et', resultDev: 'पठेत्', resultIast: 'paṭhet', resultEn: 'he/she should read' },
    tip: <>💡 <strong>Key rule:</strong> present stem + e + optative endings. 3rd sg -et, 3rd pl -eyuḥ, 1st sg -eyam.</>,
  },
}

function TenseLesson({ tenseId }) {
  const { play } = useSoundEffects()
  const [activeVerb, setActiveVerb] = useState(VERBS[0].id)
  const [activeEx,   setActiveEx]   = useState(null)
  const verb = VERBS.find(v => v.id === activeVerb)
  const info  = TENSE_INFO[tenseId]
  const endings = ENDINGS[tenseId]
  const forms = verb[tenseId]
  const tenseExamples = TENSE_EXAMPLES[tenseId]?.[activeVerb] || {}
  const rows = [
    { label: '3rd', sg: 'p3sg', du: 'p3du', pl: 'p3pl' },
    { label: '2nd', sg: 'p2sg', du: 'p2du', pl: 'p2pl' },
    { label: '1st', sg: 'p1sg', du: 'p1du', pl: 'p1pl' },
  ]
  const { stemDev, stemIast, endDev, endIast, resultDev, resultIast, resultEn } = info.formula

  function handleVerbChange(id) { setActiveVerb(id); setActiveEx(null) }

  return (
    <div className="gr-lesson">
      <div className="gr-rule-box">{info.rule}</div>

      <div className="gr-example-box">
        <div className="gr-example-title">Formation — how it's built</div>
        <div className="gr-formula">
          <span className="gr-pill"><span className="gr-dev">{stemDev}</span><em>{stemIast}</em></span>
          <span className="gr-plus">+</span>
          <span className="gr-pill"><span className="gr-dev">{endDev}</span><em>{endIast}</em></span>
          <span className="gr-eq">=</span>
          <span className="gr-pill gr-pill-gold"><span className="gr-spk-row"><span className="gr-dev">{resultDev}</span><Spk text={resultDev} small /></span><em>{resultIast}</em> — {resultEn}</span>
        </div>
      </div>

      <div>
        <div className="gr-example-title">Endings · विभक्ति</div>
        <table className="gr-table gr-table-vac">
          <thead><tr>
            <th>Person</th>
            <th className="vac-sg">Singular · एक</th>
            <th className="vac-du">Dual · द्वि</th>
            <th className="vac-pl">Plural · बहु</th>
          </tr></thead>
          <tbody>
            {endings.map(row => (
              <tr key={row.person}>
                <td className="gr-person">{row.person}</td>
                <td className="vac-sg"><span className="gr-iast vac-iast-sg">{row.sg}</span></td>
                <td className="vac-du"><span className="gr-iast vac-iast-du">{row.du}</span></td>
                <td className="vac-pl"><span className="gr-iast vac-iast-pl">{row.pl}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gr-sel-group">
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb}
          onChange={e => { play('tap'); handleVerbChange(e.target.value) }}>
          {VERBS.map(v => (
            <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
          ))}
        </select>
      </div>

      <div className="gr-verb-header">
        <span className="gr-dev gr-verb-root">{verb.root}</span>
        <span className="gr-iast">{verb.rootIast}</span>
        <span className="gr-verb-meaning">{verb.meaning}</span>
        <span className="gr-iast">stem: {verb.stemIast}</span>
      </div>
      {verb.note && <div className="gr-tip">⚠️ {verb.note}</div>}

      {forms ? (
        <table className="gr-table gr-table-vac">
          <thead><tr>
            <th>Person</th>
            <th className="vac-sg">Singular · एक</th>
            <th className="vac-du">Dual · द्वि</th>
            <th className="vac-pl">Plural · बहु</th>
          </tr></thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label}>
                <td className="gr-person">{row.label}</td>
                {[row.sg, row.du, row.pl].map((key, ci) => (
                  <td key={key} className={['vac-sg','vac-du','vac-pl'][ci]}>
                    <div className="gr-spk-row"><span className="gr-dev">{forms[key][0]}</span><Spk text={forms[key][0]} small /></div>
                    <span className="gr-iast">{forms[key][1]}</span>
                    <span className="gr-en">{forms[key][2]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="gr-tip">Forms for this verb are not yet available for this tense.</div>
      )}

      {/* Example sentences accordion — grouped by person */}
      <div className="gr-example-title" style={{marginTop:'1.25rem'}}>Example sentences</div>
      <div className="gr-ex-accordion">
        {PERSON_GROUPS.map(group => {
          const open = activeEx === group.person
          const hasAny = group.keys.some(k => tenseExamples[k])
          return (
            <div key={group.person} className={`gr-ex-acc-item${open ? ' open' : ''}`}>
              <button className="gr-ex-acc-hd" onClick={() => setActiveEx(open ? null : group.person)}>
                <div className="gr-ex-acc-hd-left">
                  <span className="gr-ex-acc-label">{group.label}</span>
                  <span className="gr-ex-acc-num-pills">
                    {NUM_COLORS.map(nc => (
                      <span key={nc.label} className="gr-ex-acc-pill" style={{color: nc.color, borderColor: nc.color}}>{nc.label}</span>
                    ))}
                  </span>
                </div>
                <span className="gr-ex-acc-chevron">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="gr-ex-acc-body anim-fade-up">
                  {hasAny ? group.keys.map((key, ki) => {
                    const ex = tenseExamples[key]
                    const { color, bg, label } = NUM_COLORS[ki]
                    return (
                      <div key={key} className="gr-ex-num-card" style={{borderLeftColor: color, background: bg}}>
                        <div className="gr-ex-num-card-hd">
                          <span className="gr-ex-num-badge" style={{color, borderColor: color}}>{label}</span>
                          {forms && <span className="gr-dev" style={{color, fontWeight:700}}>{forms[key][0]}</span>}
                          {forms && <span className="gr-iast" style={{fontSize:'0.78rem',color:'var(--text-muted)'}}>{forms[key][1]}</span>}
                        </div>
                        {ex ? (
                          <>
                            <div className="gr-spk-row"><span className="gr-dev gr-ex-acc-sent" style={{color}}>{ex.dev}</span><Spk text={ex.dev} small /></div>
                            <div className="gr-iast">{ex.iast}</div>
                            <div className="gr-en">{ex.en}</div>
                          </>
                        ) : (
                          <span className="gr-iast" style={{color:'var(--text-muted)',fontSize:'0.8rem'}}>No example available.</span>
                        )}
                      </div>
                    )
                  }) : (
                    <div style={{padding:'0.5rem 0', color:'var(--text-muted)', fontSize:'0.85rem', fontStyle:'italic'}}>
                      Example sentences for this verb are coming soon.
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="gr-tip">{info.tip}</div>
    </div>
  )
}

// ── Question Explorer data ───────────────────────────────────────────────

const QUESTION_TYPES = [
  { id:'yesno',    dev:'किम्',     iast:'kim',      label:'Yes / No',  desc:'Does / did / will...?'  },
  { id:'va',       dev:'वा',       iast:'vā',       label:'Or / वा',   desc:'...or? (disjunctive)'   },
  { id:'what',     dev:'किम्',     iast:'kim',      label:'What',      desc:'What does / did...?'    },
  { id:'who',      dev:'कः/का',    iast:'kaḥ/kā',   label:'Who',       desc:'Who does / did...?'     },
  { id:'where',    dev:'कुत्र',    iast:'kutra',    label:'Where',     desc:'Where does / did...?'   },
  { id:'when',     dev:'कदा',      iast:'kadā',     label:'When',      desc:'When does / did...?'    },
  { id:'how',      dev:'कथम्',     iast:'katham',   label:'How',       desc:'How does / is...?'      },
  { id:'why',      dev:'किमर्थम्', iast:'kimartham',label:'Why',       desc:'Why does / did...?'     },
  { id:'whose',    dev:'कस्य',     iast:'kasya',    label:'Whose',     desc:'Whose...? (possession)' },
]

const QE_OBJECTS = [
  { id:'pustaka',    dev:'पुस्तकम्',    iast:'pustakam',    en:'a book'       },
  { id:'vedam',      dev:'वेदम्',        iast:'vedam',       en:'the Veda'     },
  { id:'slokam',     dev:'श्लोकम्',     iast:'ślokam',      en:'a verse'      },
  { id:'jalam',      dev:'जलम्',         iast:'jalam',       en:'water'        },
  { id:'phalam',     dev:'फलम्',         iast:'phalam',      en:'a fruit'      },
  { id:'annam',      dev:'अन्नम्',       iast:'annam',       en:'food'         },
  { id:'patram',     dev:'पत्रम्',       iast:'patram',      en:'a letter'     },
  { id:'satyam',     dev:'सत्यम्',       iast:'satyam',      en:'the truth'    },
  { id:'jnanam',     dev:'ज्ञानम्',      iast:'jñānam',      en:'knowledge'    },
  { id:'nagaram',    dev:'नगरम्',         iast:'nagaram',     en:'the city'     },
  { id:'gramam',     dev:'ग्रामम्',       iast:'grāmam',      en:'the village'  },
  { id:'vidyalayam', dev:'विद्यालयम्',   iast:'vidyālayam',  en:'the school'   },
  { id:'vanam',      dev:'वनम्',          iast:'vanam',       en:'the forest'   },
  { id:'dharmam',    dev:'धर्मम्',        iast:'dharmam',     en:'dharma'       },
  { id:'karma',      dev:'कर्म',          iast:'karma',       en:'work / karma' },
]

const QE_LOCATIONS = [
  { id:'atra',       dev:'अत्र',          iast:'atra',        en:'here'            },
  { id:'tatra',      dev:'तत्र',          iast:'tatra',       en:'there'           },
  { id:'iha',        dev:'इह',            iast:'iha',         en:'here (now)'      },
  { id:'grihe',      dev:'गृहे',          iast:'gṛhe',        en:'at home'         },
  { id:'vidyalaye',  dev:'विद्यालये',     iast:'vidyālaye',   en:'at school'       },
  { id:'vane',       dev:'वने',           iast:'vane',        en:'in the forest'   },
  { id:'nagare',     dev:'नगरे',          iast:'nagare',      en:'in the city'     },
  { id:'nadyam',     dev:'नद्याम्',       iast:'nadyām',      en:'at the river'    },
  { id:'kasim',      dev:'काश्यां',       iast:'kāśyām',      en:'in Kāśī'         },
  { id:'ksetre',     dev:'क्षेत्रे',      iast:'kṣetre',      en:'in the field'    },
  { id:'ashrame',   dev:'आश्रमे',        iast:'āśrame',      en:'in the hermitage'},
  { id:'itah',      dev:'इतः',           iast:'itaḥ',        en:'from here'       },
  { id:'sarvatra',  dev:'सर्वत्र',       iast:'sarvatra',    en:'everywhere'      },
  { id:'kutah',     dev:'कुतः',          iast:'kutaḥ',       en:'from where'      },
]

const QE_ADVERBS = [
  { id:'shighram',   dev:'शीघ्रम्',       iast:'śīghram',     en:'quickly'         },
  { id:'mandam',     dev:'मन्दम्',         iast:'mandam',      en:'slowly'          },
  { id:'sukham',     dev:'सुखम्',          iast:'sukham',      en:'happily / well'  },
  { id:'sundar',     dev:'सुन्दरम्',       iast:'sundaram',    en:'beautifully'     },
  { id:'shantam',    dev:'शान्तम्',        iast:'śāntam',      en:'peacefully'      },
  { id:'dridham',    dev:'दृढम्',          iast:'dṛḍham',      en:'steadily'        },
  { id:'nityam',     dev:'नित्यम्',        iast:'nityam',      en:'regularly'       },
  { id:'shuddham',   dev:'शुद्धम्',        iast:'śuddham',     en:'purely'          },
]

const QE_TIMES = [
  { id:'pratah',   dev:'प्रातः',    iast:'prātaḥ',    en:'in the morning' },
  { id:'sayam',    dev:'सायम्',     iast:'sāyam',     en:'in the evening' },
  { id:'ratrau',   dev:'रात्रौ',    iast:'rātrau',    en:'at night'       },
  { id:'dine',     dev:'दिने',      iast:'dine',      en:'during the day' },
  { id:'sarvada',  dev:'सर्वदा',    iast:'sarvadā',   en:'always'         },
  { id:'adhuna',   dev:'अधुना',     iast:'adhunā',    en:'now'            },
  { id:'nityam',   dev:'नित्यम्',   iast:'nityam',    en:'daily'          },
  { id:'kadacit',  dev:'कदाचित्',   iast:'kadācit',   en:'sometimes'      },
]

const QE_PURPOSES = [
  { id:'jnanaya',    dev:'ज्ञानाय',     iast:'jñānāya',    en:'for knowledge'    },
  { id:'sukhaya',    dev:'सुखाय',       iast:'sukhāya',    en:'for happiness'    },
  { id:'dharmaya',   dev:'धर्माय',      iast:'dharmāya',   en:'for dharma'       },
  { id:'shikshaya',  dev:'शिक्षायै',    iast:'śikṣāyai',   en:'for learning'     },
  { id:'sevaaya',    dev:'सेवायै',      iast:'sevāyai',    en:'for service'      },
  { id:'shantaya',   dev:'शान्तये',     iast:'śāntaye',    en:'for peace'        },
  { id:'arogaya',    dev:'आरोग्याय',    iast:'ārogyāya',   en:'for health'       },
  { id:'bhojanaya',  dev:'भोजनाय',      iast:'bhojanāya',  en:'for food'         },
]

// Possessive pronouns (genitive) for 'whose' question
// en = predicate ("It is ___"), adj = attributive ("___ book")
const QE_POSSESSIVES = [
  { id:'mama',    dev:'मम',       iast:'mama',    en:'mine',           adj:'my'            },
  { id:'tasya',   dev:'तस्य',     iast:'tasya',   en:'his',            adj:'his'           },
  { id:'tasyah',  dev:'तस्याः',   iast:'tasyāḥ',  en:'hers',           adj:'her'           },
  { id:'asmakam', dev:'अस्माकम्', iast:'asmākam', en:'ours',           adj:'our'           },
  { id:'tava',    dev:'तव',       iast:'tava',    en:'yours',          adj:'your'          },
  { id:'guroh',   dev:'गुरोः',    iast:'guroḥ',   en:"the teacher's",  adj:"the teacher's" },
  { id:'devasya', dev:'देवस्य',   iast:'devasya', en:"god's",          adj:"god's"         },
  { id:'putrasya',dev:'पुत्रस्य', iast:'putrasya',en:"the son's",      adj:"the son's"     },
]

// English base-verb lookup (infinitive without pronoun)
const VERB_EN_BASE = {
  as:'be', path:'read / study', gam:'go', agam:'come', vad:'speak / say',
  pashya:'see', shru:'hear / listen', jna:'know', stha:'stand / stay',
  pa:'drink', sna:'bathe', da:'give', kr:'do / make',
  bhav:'become', nam:'bow', puj:'worship', likh:'write',
}

// English auxiliary by tense and person for questions / answers
function qeAux(tense, purusha, vachanam) {
  if (tense === 'present') return (purusha === '3' && vachanam === 'sg') ? 'does' : 'do'
  if (tense === 'imperfect') return 'did'
  if (tense === 'future')    return 'will'
  if (tense === 'optative')  return 'should'
  if (tense === 'imperative')return ''
  return 'does'
}

// English subject for pronouns
function qeSubjEn(purusha, linga, vachanam, noun) {
  if (noun) {
    if (vachanam === 'sg') return `The ${noun.en}`
    if (vachanam === 'du') return `The two ${noun.enPl}`
    return `The ${noun.enPl}`
  }
  const map = {
    '3':{ m:{ sg:'he',   du:'they two', pl:'they' },
          f:{ sg:'she',  du:'they two', pl:'they' },
          n:{ sg:'it',   du:'they two', pl:'they' } },
    '2':{   sg:'you',    du:'you two',  pl:'you all' },
    '1':{   sg:'I',      du:'we two',   pl:'we' },
  }
  return purusha === '3' ? map['3'][linga][vachanam] : map[purusha][vachanam]
}

// Build a sentence triple {dev, iast, en} from parts
function qeSentence(parts) {
  const dev  = parts.map(p => p.dev).filter(Boolean).join(' ')
  const iast = parts.map(p => p.iast).filter(Boolean).join(' ')
  const en   = parts.map(p => p.en).filter(Boolean).join(' ')
  return { dev, iast, en }
}

function QuestionExplorerLesson() {
  const { play } = useSoundEffects()
  const { speak } = useSpeech()
  const [qtype,      setQtype]      = useState('yesno')
  const [tense,      setTense]      = useState('present')
  const [purusha,    setPurusha]    = useState('3')
  const [followOpen, setFollowOpen] = useState(false)
  const [linga,    setLinga]    = useState('m')
  const [vachanam, setVachanam] = useState('sg')
  const [verbId,   setVerbId]   = useState(VERBS[0].id)
  const [subject,  setSubject]  = useState('pronoun')
  const [objectId, setObjectId] = useState('pustaka')

  const formKey = `p${purusha}${vachanam}`
  const verb    = VERBS.find(v => v.id === verbId) || VERBS[0]
  const tenseForms = tense === 'present' ? verb.forms : verb[tense]
  const form    = tenseForms?.[formKey]  // [dev, iast, en]

  const pronObj = PRONOUN_TABLE[purusha][linga][vachanam]
  const subjectNoun = subject !== 'pronoun' ? SUBJECT_NOUNS.find(n => n.id === subject) : null
  const subjectForm = subjectNoun
    ? { dev: subjectNoun.forms[vachanam].dev, iast: subjectNoun.forms[vachanam].iast }
    : { dev: pronObj.dev, iast: pronObj.iast }
  const subjectEn   = qeSubjEn(purusha, linga, vachanam, subjectNoun)

  // Pick object/location/time/adverb/purpose based on qtype
  const auxObject = qtype === 'where'  ? QE_LOCATIONS.find(l => l.id === objectId)   || QE_LOCATIONS[0]
                  : qtype === 'when'   ? QE_TIMES.find(t => t.id === objectId)        || QE_TIMES[0]
                  : qtype === 'how'    ? QE_ADVERBS.find(a => a.id === objectId)      || QE_ADVERBS[0]
                  : qtype === 'why'    ? QE_PURPOSES.find(p => p.id === objectId)     || QE_PURPOSES[0]
                  : qtype === 'whose'  ? QE_OBJECTS.find(o => o.id === objectId)      || QE_OBJECTS[0]
                  : QE_OBJECTS.find(o => o.id === objectId) || QE_OBJECTS[0]
  // For 'whose', we also need the possessive answer
  const possessive = qtype === 'whose' ? QE_POSSESSIVES.find(p => p.id === objectId) || QE_POSSESSIVES[0] : null

  // The question word for 'who' depends on linga
  const whoWord = { m:{dev:'कः',iast:'kaḥ'}, f:{dev:'का',iast:'kā'}, n:{dev:'किम्',iast:'kim'} }[linga]

  const verbBase = VERB_EN_BASE[verbId] || verb.meaning.replace(/^to /,'')
  const aux      = qeAux(tense, purusha, vachanam)

  // ── Sentence builders ──────────────────────────────────────────────────

  const verbDev  = form?.[0] || '—'
  const verbIast = form?.[1] || '—'

  // Extract the conjugated verb directly from form[2] (handles irregular "to be": is/are/am)
  const enVerbConj = form ? form[2]
    .replace(/^(he\/she\/it|he\/she|she\/he|they two|they all|they|you two|you all|you|we two|we|I)\s+/, '')
    .trim()
    : verbBase.split(' / ')[0]
  // For building yes/no questions with "to be": "is" → "Is he...?"
  const enVerbConj3 = tense === 'present' && purusha === '3' && vachanam === 'sg'
    ? verbBase.split(' / ')[0] + 's'
    : verbBase.split(' / ')[0]
  const enVerb3    = verbId === 'as' ? enVerbConj : enVerbConj3
  const enVerbBase = verbBase.split(' / ')[0]
  const isCopula   = verbId === 'as'

  // Build the affirmative statement (Sanskrit SOV; English SVO)
  const buildStatement = () => {
    if (!form) return null
    if (qtype === 'why') {
      // S V purpose: "सः ज्ञानाय पठति।" / "He reads for knowledge."
      const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
      return {
        dev:  `${subjectForm.dev} ${auxObject.dev} ${verbDev}।`,
        iast: `${subjectForm.iast} ${auxObject.iast} ${verbIast}.`,
        en:   `${cap(subjectEn)} ${enVerb3} ${auxObject.en}.`,
      }
    }
    if (qtype === 'whose') {
      // "possessive + object + अस्ति": "तस्य पुस्तकम् अस्ति।"
      const asVerb = VERBS.find(v => v.id === 'as')
      const asti = asVerb?.forms?.['p3sg']
      const pos = possessive || QE_POSSESSIVES[0]
      return {
        dev:  `${pos.dev} ${auxObject.dev}${asti ? ` ${asti[0]}` : ''}।`,
        iast: `${pos.iast} ${auxObject.iast}${asti ? ` ${asti[1]}` : ''}.`,
        en:   `It is ${pos.adj} ${auxObject.en.replace(/^(a|the) /,'')}.`,
      }
    }
    return {
      dev:  `${subjectForm.dev} ${auxObject.dev} ${verbDev}।`,
      iast: `${subjectForm.iast} ${auxObject.iast} ${verbIast}.`,
      en:   `${subjectEn} ${enVerb3} ${auxObject.en}.`,
    }
  }

  // Negative verb form: use negVerbs from verb data (handles sandhi like नास्ति) or fallback to न + verb
  const negVerbDev  = verb.negVerbs?.[formKey]?.[0] || `न ${verbDev}`
  const negVerbIast = verb.negVerbs?.[formKey]?.[1] || `na ${verbIast}`

  // Build the negative statement (Sanskrit: S O negV; English: S does not V O)
  const buildNegStatement = () => {
    if (!form) return null
    const negAux = tense === 'imperfect' ? 'did not'
                 : tense === 'future'    ? 'will not'
                 : tense === 'optative'  ? 'should not'
                 : tense === 'imperative'? 'do not'
                 : (purusha === '3' && vachanam === 'sg') ? 'does not' : 'do not'
    // For 'how': no object in the negative — just subject + neg-verb + adverb
    if (qtype === 'how') {
      return {
        dev:  `${subjectForm.dev} ${negVerbDev}।`,
        iast: `${subjectForm.iast} ${negVerbIast}.`,
        en:   isCopula ? `${subjectEn} ${enVerbConj} not ${auxObject.en}.` : `${subjectEn} ${negAux} ${enVerbBase} ${auxObject.en}.`,
      }
    }
    if (qtype === 'why') {
      return {
        dev:  `${subjectForm.dev} ${auxObject.dev} ${negVerbDev}।`,
        iast: `${subjectForm.iast} ${auxObject.iast} ${negVerbIast}.`,
        en:   `${subjectEn} ${negAux} ${enVerbBase} ${auxObject.en}.`,
      }
    }
    if (qtype === 'whose') {
      // "It is not his book."
      const asVerb = VERBS.find(v => v.id === 'as')
      const nasti  = asVerb?.negVerbs?.['p3sg']
      const asti   = asVerb?.forms?.['p3sg']
      const pos = possessive || QE_POSSESSIVES[0]
      return {
        dev:  `${pos.dev} ${auxObject.dev} ${nasti?.[0] || (asti ? `न ${asti[0]}` : negVerbDev)}।`,
        iast: `${pos.iast} ${auxObject.iast} ${nasti?.[1] || (asti ? `na ${asti[1]}` : negVerbIast)}.`,
        en:   `It is not ${pos.adj} ${auxObject.en.replace(/^(a|the) /,'')}.`,
      }
    }
    return {
      dev:  `${subjectForm.dev} ${auxObject.dev} ${negVerbDev}।`,
      iast: `${subjectForm.iast} ${auxObject.iast} ${negVerbIast}.`,
      en:   isCopula ? `${subjectEn} ${enVerbConj} not ${auxObject.en}.` : `${subjectEn} ${negAux} ${enVerbBase} ${auxObject.en}.`,
    }
  }

  // Build the question
  const buildQuestion = () => {
    if (!form) return null
    if (qtype === 'va') {
      // Disjunctive question: S O V वा? — "he reads a book, or?"
      const enQ = isCopula
        ? `${enVerbConj.charAt(0).toUpperCase() + enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}, or not?`
        : `Does ${subjectEn} ${enVerbBase} ${auxObject.en}, or not?`
      return {
        dev:  `${subjectForm.dev} ${auxObject.dev} ${verbDev} वा?`,
        iast: `${subjectForm.iast} ${auxObject.iast} ${verbIast} vā?`,
        en:   enQ,
      }
    }
    if (qtype === 'yesno') {
      const enQ = isCopula
        ? `${enVerbConj.charAt(0).toUpperCase() + enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}?`
        : aux
          ? `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${subjectEn} ${enVerbBase} ${auxObject.en}?`
          : `${subjectEn.charAt(0).toUpperCase() + subjectEn.slice(1)}, ${enVerbBase}!`
      return {
        dev:  `किम् ${subjectForm.dev} ${auxObject.dev} ${verbDev}?`,
        iast: `kim ${subjectForm.iast} ${auxObject.iast} ${verbIast}?`,
        en:   enQ,
      }
    }
    if (qtype === 'what') {
      const enQ = aux
        ? `${aux.charAt(0).toUpperCase() + aux.slice(1)} ${subjectEn} ${verbBase.split(' / ')[0]}?`
        : `What does ${subjectEn} ${verbBase.split(' / ')[0]}?`
      return {
        dev:  `${subjectForm.dev} किम् ${verbDev}?`,
        iast: `${subjectForm.iast} kim ${verbIast}?`,
        en:   `What does ${subjectEn} ${verbBase.split(' / ')[0]}?`,
      }
    }
    if (qtype === 'who') {
      return {
        dev:  `${whoWord.dev} ${auxObject.dev} ${verbDev}?`,
        iast: `${whoWord.iast} ${auxObject.iast} ${verbIast}?`,
        en:   `Who ${verbBase.split(' / ')[0]}s ${auxObject.en}?`,
      }
    }
    if (qtype === 'where') {
      return {
        dev:  `${subjectForm.dev} कुत्र ${verbDev}?`,
        iast: `${subjectForm.iast} kutra ${verbIast}?`,
        en:   isCopula ? `Where ${enVerbConj} ${subjectEn}?` : `Where does ${subjectEn} ${enVerbBase}?`,
      }
    }
    if (qtype === 'when') {
      return {
        dev:  `${subjectForm.dev} कदा ${verbDev}?`,
        iast: `${subjectForm.iast} kadā ${verbIast}?`,
        en:   isCopula ? `When ${enVerbConj} ${subjectEn}?` : `When does ${subjectEn} ${enVerbBase}?`,
      }
    }
    if (qtype === 'how') {
      return {
        dev:  `${subjectForm.dev} कथम् ${verbDev}?`,
        iast: `${subjectForm.iast} katham ${verbIast}?`,
        en:   isCopula ? `How ${enVerbConj} ${subjectEn}?` : `How does ${subjectEn} ${enVerbBase}?`,
      }
    }
    if (qtype === 'why') {
      return {
        dev:  `${subjectForm.dev} किमर्थम् ${verbDev}?`,
        iast: `${subjectForm.iast} kimartham ${verbIast}?`,
        en:   isCopula ? `Why ${enVerbConj} ${subjectEn}?` : `Why does ${subjectEn} ${enVerbBase}?`,
      }
    }
    if (qtype === 'whose') {
      // "Whose book is this?" — कस्य पुस्तकम् अस्ति?
      const astiForm = VERBS.find(v => v.id === 'as')?.forms?.['p3sg']
      return {
        dev:  `कस्य ${auxObject.dev} ${astiForm?.[0] || 'अस्ति'}?`,
        iast: `kasya ${auxObject.iast} ${astiForm?.[1] || 'asti'}?`,
        en:   `Whose ${auxObject.en.replace(/^(a|the) /,'')} is this?`,
      }
    }
    return null
  }

  // For 'how': sentence is S + adverb + V (adverb precedes verb in Sanskrit)
  // Override buildStatement to place adverb before verb for 'how'
  const buildHowStatement = () => {
    if (!form) return null
    return {
      dev:  `${subjectForm.dev} ${auxObject.dev} ${verbDev}।`,
      iast: `${subjectForm.iast} ${auxObject.iast} ${verbIast}.`,
      en:   `${subjectEn} ${enVerb3} ${auxObject.en}.`,
    }
  }

  // Follow-up dialogue — returns array of {q, a} exchange pairs
  const buildFollowUp = () => {
    if (!form) return []
    const pronSg  = PRONOUN_TABLE['3'][linga]['sg']
    const pronEn  = linga === 'm' ? 'he' : linga === 'f' ? 'she' : 'it'
    const pronEnC = pronEn.charAt(0).toUpperCase() + pronEn.slice(1)
    const p3sg    = verb.forms?.['p3sg']
    const asVerb  = VERBS.find(v => v.id === 'as')
    const asti    = asVerb?.forms?.['p3sg']       // ['अस्ति','asti','he/she/it is']
    const nasti   = asVerb?.negVerbs?.['p3sg']     // ['नास्ति','nāsti']

    // Helper: strip pronoun prefix from form[2] to get the bare conjugated verb
    const cleanConj = f => f[2]
      .replace(/^(he\/she\/it|he\/she|she\/he|they two|they all|they|you two|you all|you|we two|we|I)\s+/, '')
      .trim()
    // Possessive form of pronoun (his/her/its/their/your/my)
    const pronPoss = linga === 'm' ? 'his' : linga === 'f' ? 'her' : 'its'
    const subjPoss = subjectNoun ? `the ${subjectNoun.en}'s` : pronPoss

    // Helper: अस्ति/नास्ति exchange — "Is [subj] here?" / "Is [obj] here?"
    const astiExchange = (devSubj, iastSubj, enSubj, loc = {dev:'अत्र',iast:'atra',en:'here'}) => asti ? {
      q: { dev:`${devSubj} ${loc.dev} ${asti[0]} वा?`, iast:`${iastSubj} ${loc.iast} ${asti[1]} vā?`, en:`Is ${enSubj} ${loc.en}?` },
      a: { dev:`आम्, ${devSubj} ${loc.dev} ${asti[0]}।`, iast:`ām, ${iastSubj} ${loc.iast} ${asti[1]}.`, en:`Yes, ${enSubj} is ${loc.en}.` },
      na:{ dev:`न, ${devSubj} ${loc.dev} ${nasti?.[0] || `न ${asti[0]}`}।`, iast:`na, ${iastSubj} ${loc.iast} ${nasti?.[1] || `na ${asti[1]}`}.`, en:`No, ${enSubj} is not ${loc.en}.` },
    } : null

    if (qtype === 'yesno' || qtype === 'va') {
      if (!p3sg) return []
      const p3c = cleanConj(p3sg)
      const ex = []
      // 1. What does he V? → He Vs object.
      ex.push({
        q: { dev:`${pronSg.dev} किम् ${p3sg[0]}?`, iast:`${pronSg.iast} kim ${p3sg[1]}?`, en: isCopula ? `What is ${pronEn}?` : `What does ${pronEn} ${enVerbBase}?` },
        a: { dev:`${pronSg.dev} ${auxObject.dev} ${p3sg[0]}।`, iast:`${pronSg.iast} ${auxObject.iast} ${p3sg[1]}.`, en: isCopula ? `${pronEnC} ${p3c} ${auxObject.en}.` : `${pronEnC} ${p3c} ${auxObject.en}.` },
      })
      // 2. Is he/she here? — अस्ति/नास्ति
      const ae = astiExchange(pronSg.dev, pronSg.iast, pronEn)
      if (ae) ex.push(ae)
      // 3. Where is the object? (only for non-copula with a concrete object)
      if (!isCopula && asti) {
        ex.push({
          q: { dev:`${subjectForm.dev} ${auxObject.dev} कुत्र ${asti[0]}?`, iast:`${subjectForm.iast} ${auxObject.iast} kutra ${asti[1]}?`, en:`Where is ${subjPoss} ${auxObject.en.replace(/^(a|the) /,'')}?` },
          a: { dev:`${subjectForm.dev} ${auxObject.dev} गृहे ${asti[0]}।`, iast:`${subjectForm.iast} ${auxObject.iast} gṛhe ${asti[1]}.`, en:`${subjPoss.charAt(0).toUpperCase()+subjPoss.slice(1)} ${auxObject.en.replace(/^(a|the) /,'')} is at home.` },
        })
      }
      return ex
    }

    if (qtype === 'what') {
      const ex = []
      // 1. Confirm with yes/no
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${auxObject.dev} ${verbDev}?`, iast:`kim ${subjectForm.iast} ${auxObject.iast} ${verbIast}?`, en: isCopula ? `${enVerbConj.charAt(0).toUpperCase()+enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}?` : `Does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${auxObject.dev} ${verbDev}।`, iast:`ām, ${subjectForm.iast} ${auxObject.iast} ${verbIast}.`, en:`Yes, ${subjectEn} ${enVerb3} ${auxObject.en}.` },
      })
      // 2. Where does he V? — कुत्र
      if (!isCopula) {
        ex.push({
          q: { dev:`${subjectForm.dev} कुत्र ${verbDev}?`, iast:`${subjectForm.iast} kutra ${verbIast}?`, en:`Where does ${subjectEn} ${enVerbBase}?` },
          a: { dev:`${subjectForm.dev} गृहे ${verbDev}।`, iast:`${subjectForm.iast} gṛhe ${verbIast}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${enVerb3} at home.` },
        })
      }
      // 3. Is subject here? — अस्ति/नास्ति
      const ae = astiExchange(subjectForm.dev, subjectForm.iast, subjectEn)
      if (ae) ex.push(ae)
      return ex
    }

    if (qtype === 'who') {
      if (!p3sg) return []
      const p3c = cleanConj(p3sg)
      const ex = []
      // 1. Does he V object?
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${auxObject.dev} ${p3sg[0]}?`, iast:`kim ${subjectForm.iast} ${auxObject.iast} ${p3sg[1]}?`, en: `Does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${auxObject.dev} ${p3sg[0]}।`, iast:`ām, ${subjectForm.iast} ${auxObject.iast} ${p3sg[1]}.`, en:`Yes, ${subjectEn} ${p3c} ${auxObject.en}.` },
      })
      // 2. Is he here? — अस्ति/नास्ति
      const ae = astiExchange(subjectForm.dev, subjectForm.iast, subjectEn)
      if (ae) ex.push(ae)
      // 3. When does he V?
      ex.push({
        q: { dev:`${subjectForm.dev} कदा ${p3sg[0]}?`, iast:`${subjectForm.iast} kadā ${p3sg[1]}?`, en:`When does ${subjectEn} ${enVerbBase}?` },
        a: { dev:`${subjectForm.dev} प्रातः ${p3sg[0]}।`, iast:`${subjectForm.iast} prātaḥ ${p3sg[1]}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${p3c} in the morning.` },
      })
      return ex
    }

    if (qtype === 'where') {
      const ex = []
      // 1. Does he go there? (confirm)
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${auxObject.dev} ${verbDev}?`, iast:`kim ${subjectForm.iast} ${auxObject.iast} ${verbIast}?`, en: isCopula ? `${enVerbConj.charAt(0).toUpperCase()+enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}?` : `Does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${auxObject.dev} ${verbDev}।`, iast:`ām, ${subjectForm.iast} ${auxObject.iast} ${verbIast}.`, en: isCopula ? `Yes, ${subjectEn} ${enVerb3} ${auxObject.en}.` : `Yes, ${subjectEn} ${enVerb3} ${auxObject.en}.` },
      })
      // 2. Is he there now? — अस्ति/नास्ति
      const ae = astiExchange(subjectForm.dev, subjectForm.iast, subjectEn, auxObject)
      if (ae) ex.push(ae)
      // 3. When does he go there?
      if (!isCopula) {
        ex.push({
          q: { dev:`${subjectForm.dev} ${auxObject.dev} कदा ${verbDev}?`, iast:`${subjectForm.iast} ${auxObject.iast} kadā ${verbIast}?`, en:`When does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
          a: { dev:`${subjectForm.dev} ${auxObject.dev} प्रातः ${verbDev}।`, iast:`${subjectForm.iast} ${auxObject.iast} prātaḥ ${verbIast}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${enVerb3} ${auxObject.en} in the morning.` },
        })
      }
      return ex
    }

    if (qtype === 'when') {
      const ex = []
      // 1. Does he V then? (confirm)
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${auxObject.dev} ${verbDev}?`, iast:`kim ${subjectForm.iast} ${auxObject.iast} ${verbIast}?`, en: isCopula ? `${enVerbConj.charAt(0).toUpperCase()+enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}?` : `Does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${auxObject.dev} ${verbDev}।`, iast:`ām, ${subjectForm.iast} ${auxObject.iast} ${verbIast}.`, en:`Yes, ${subjectEn} ${enVerb3} ${auxObject.en}.` },
      })
      // 2. Where does he V? — कुत्र
      if (!isCopula) {
        ex.push({
          q: { dev:`${subjectForm.dev} कुत्र ${verbDev}?`, iast:`${subjectForm.iast} kutra ${verbIast}?`, en:`Where does ${subjectEn} ${enVerbBase}?` },
          a: { dev:`${subjectForm.dev} गृहे ${verbDev}।`, iast:`${subjectForm.iast} gṛhe ${verbIast}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${enVerb3} at home.` },
        })
      }
      // 3. Is he/she here? — अस्ति/नास्ति
      const ae = astiExchange(subjectForm.dev, subjectForm.iast, subjectEn)
      if (ae) ex.push(ae)
      return ex
    }

    if (qtype === 'how') {
      const ex = []
      // 1. Confirm with yes/no
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${auxObject.dev} ${verbDev}?`, iast:`kim ${subjectForm.iast} ${auxObject.iast} ${verbIast}?`, en: isCopula ? `${enVerbConj.charAt(0).toUpperCase()+enVerbConj.slice(1)} ${subjectEn} ${auxObject.en}?` : `Does ${subjectEn} ${enVerbBase} ${auxObject.en}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${auxObject.dev} ${verbDev}।`, iast:`ām, ${subjectForm.iast} ${auxObject.iast} ${verbIast}.`, en:`Yes, ${subjectEn} ${enVerb3} ${auxObject.en}.` },
      })
      // 2. Is he/she here? — अस्ति/नास्ति
      const ae = astiExchange(subjectForm.dev, subjectForm.iast, subjectEn)
      if (ae) ex.push(ae)
      // 3. When does he V?
      if (!isCopula) {
        ex.push({
          q: { dev:`${subjectForm.dev} कदा ${verbDev}?`, iast:`${subjectForm.iast} kadā ${verbIast}?`, en:`When does ${subjectEn} ${enVerbBase}?` },
          a: { dev:`${subjectForm.dev} नित्यम् ${verbDev}।`, iast:`${subjectForm.iast} nityam ${verbIast}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${enVerb3} daily.` },
        })
      }
      return ex
    }

    if (qtype === 'why') {
      const ex = []
      // 1. Does he V? (yes/no confirm)
      ex.push({
        q: { dev:`किम् ${subjectForm.dev} ${verbDev}?`, iast:`kim ${subjectForm.iast} ${verbIast}?`, en: isCopula ? `${enVerbConj.charAt(0).toUpperCase()+enVerbConj.slice(1)} ${subjectEn}?` : `Does ${subjectEn} ${enVerbBase}?` },
        a: { dev:`आम्, ${subjectForm.dev} ${verbDev}।`, iast:`ām, ${subjectForm.iast} ${verbIast}.`, en:`Yes, ${subjectEn} ${enVerb3}.` },
      })
      // 2. He Vs because of purpose — already shown in statement; add "Is it useful?" with अस्ति
      if (asti) {
        ex.push({
          q: { dev:`किम् तत् उपयुक्तम् ${asti[0]}?`, iast:`kim tat upayuktam ${asti[1]}?`, en:`Is it useful?` },
          a: { dev:`आम्, तत् उपयुक्तम् ${asti[0]}।`, iast:`ām, tat upayuktam ${asti[1]}.`, en:`Yes, it is useful.` },
          na:{ dev:`न, तत् उपयुक्तम् ${nasti?.[0] || `न ${asti[0]}`}।`, iast:`na, tat upayuktam ${nasti?.[1] || `na ${asti[1]}`}.`, en:`No, it is not useful.` },
        })
      }
      // 3. How does he V? — कथम्
      ex.push({
        q: { dev:`${subjectForm.dev} कथम् ${verbDev}?`, iast:`${subjectForm.iast} katham ${verbIast}?`, en: isCopula ? `How ${enVerbConj} ${subjectEn}?` : `How does ${subjectEn} ${enVerbBase}?` },
        a: { dev:`${subjectForm.dev} नित्यम् ${verbDev}।`, iast:`${subjectForm.iast} nityam ${verbIast}.`, en:`${subjectEn.charAt(0).toUpperCase()+subjectEn.slice(1)} ${enVerb3} regularly.` },
      })
      return ex
    }

    if (qtype === 'whose') {
      const ex = []
      // possessive answer object
      const pos = possessive || QE_POSSESSIVES[0]
      // 1. Is this [object] here? — अस्ति/नास्ति
      const ae = astiExchange(auxObject.dev, auxObject.iast, auxObject.en)
      if (ae) ex.push(ae)
      // 2. Is it good? / is it useful?
      if (asti) {
        ex.push({
          q: { dev:`किम् ${pos.dev} ${auxObject.dev} ${asti[0]}?`, iast:`kim ${pos.iast} ${auxObject.iast} ${asti[1]}?`, en:`Is this ${pos.adj} ${auxObject.en.replace(/^(a|the) /,'')}?` },
          a: { dev:`आम्, ${pos.dev} ${auxObject.dev} ${asti[0]}।`, iast:`ām, ${pos.iast} ${auxObject.iast} ${asti[1]}.`, en:`Yes, it is ${pos.en}.` },
          na:{ dev:`न, ${pos.dev} ${auxObject.dev} ${nasti?.[0] || `न ${asti[0]}`}।`, iast:`na, ${pos.iast} ${auxObject.iast} ${nasti?.[1] || `na ${asti[1]}`}.`, en:`No, it is not ${pos.en}.` },
        })
      }
      // 3. Where is it? — कुत्र
      if (asti) {
        ex.push({
          q: { dev:`${pos.dev} ${auxObject.dev} कुत्र ${asti[0]}?`, iast:`${pos.iast} ${auxObject.iast} kutra ${asti[1]}?`, en:`Where is ${pos.adj} ${auxObject.en.replace(/^(a|the) /,'')}?` },
          a: { dev:`${pos.dev} ${auxObject.dev} अत्र ${asti[0]}।`, iast:`${pos.iast} ${auxObject.iast} atra ${asti[1]}.`, en:`${(pos.adj.charAt(0).toUpperCase()+pos.adj.slice(1))} ${auxObject.en.replace(/^(a|the) /,'')} is here.` },
        })
      }
      return ex
    }

    return []
  }

  const question   = buildQuestion()
  const statement  = qtype === 'how' ? buildHowStatement() : buildStatement()
  const negation   = buildNegStatement()
  const followUp   = buildFollowUp()

  // Object/location/time/adverb selector options
  const auxList  = qtype === 'where'  ? QE_LOCATIONS
                 : qtype === 'when'  ? QE_TIMES
                 : qtype === 'how'   ? QE_ADVERBS
                 : qtype === 'why'   ? QE_PURPOSES
                 : qtype === 'whose' ? QE_POSSESSIVES
                 : QE_OBJECTS
  const auxLabel = qtype === 'where'  ? 'Location · स्थान'
                 : qtype === 'when'   ? 'Time · काल'
                 : qtype === 'how'    ? 'Manner · प्रकार'
                 : qtype === 'why'    ? 'Purpose · प्रयोजन'
                 : qtype === 'whose'  ? 'Object · कर्म (for "whose" question)'
                 : qtype === 'va'     ? 'Object · कर्म (वा question)'
                 : 'Object · कर्म'

  const Spk = ({ text }) => (
    <button className="speak-btn gr-speak-sm" onClick={() => speak(text)} title="Hear"><SpeakIcon /></button>
  )

  return (
    <div className="gr-lesson">
      {/* ── Selectors ── */}
      <div className="gr-explorer-selectors">

        {/* Question type */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Question Type · प्रश्नप्रकार</div>
          <div className="gr-sel-pills">
            {QUESTION_TYPES.map(qt => (
              <button key={qt.id}
                className={`gr-sel-pill ${qtype === qt.id ? 'active' : ''}`}
                onClick={() => { play('tap'); setQtype(qt.id); setObjectId(qt.id === 'where' ? 'atra' : qt.id === 'when' ? 'pratah' : qt.id === 'how' ? 'shighram' : qt.id === 'why' ? 'jnanaya' : qt.id === 'whose' ? 'mama' : 'pustaka') }}>
                <span className="gr-dev" style={{fontSize:'0.85rem'}}>{qt.dev}</span>
                <span className="gr-sel-pill-sub">{qt.label} — {qt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tense */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Tense · काल</div>
          <div className="gr-sel-pills">
            {TENSES.map(t => (
              <button key={t.id}
                className={`gr-sel-pill ${tense === t.id ? 'active' : ''}`}
                onClick={() => { play('tap'); setTense(t.id) }}>
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
                onClick={() => { play('tap'); setPurusha(p.id); setSubject('pronoun') }}>
                <span className="gr-dev">{p.labelDev}</span>
                <span className="gr-sel-pill-sub">{p.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">
            Gender · लिङ्गम्
            {purusha !== '3' && <span className="gr-sel-label-note"> — not applicable for {purusha === '2' ? '2nd' : '1st'} person</span>}
          </div>
          <div className="gr-sel-pills">
            {LINGAS.map(l => (
              <button key={l.id}
                className={`gr-sel-pill ${linga === l.id ? 'active' : ''} ${purusha !== '3' ? 'gr-sel-pill-dim' : ''}`}
                onClick={() => { play('tap'); setLinga(l.id); setSubject('pronoun') }}>
                <span className="gr-dev" style={{fontSize:'0.8rem'}}>{l.labelDev}</span>
                <span className="gr-sel-pill-sub">{l.label} — {l.en}</span>
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
                onClick={() => { play('tap'); setVachanam(v.id); setSubject('pronoun') }}>
                <span className="gr-dev">{v.labelDev}</span>
                <span className="gr-sel-pill-sub">{v.label} — {v.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verb */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Verb · धातु</div>
          <select className="gr-verb-select" value={verbId} onChange={e => { play('tap'); setVerbId(e.target.value) }}>
            {VERBS.map(v => (
              <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
            ))}
          </select>
        </div>

        {/* Subject (hidden for 'who' since subject is the answer) */}
        {qtype !== 'who' && (
          <div className="gr-sel-group">
            <div className="gr-sel-label">
              Subject · कर्ता
              {purusha !== '3' && <span className="gr-sel-label-note"> — not applicable for {purusha === '2' ? '2nd' : '1st'} person</span>}
            </div>
            <select
              className={`gr-verb-select ${purusha !== '3' ? 'gr-select-dim' : ''}`}
              value={subject}
              disabled={purusha !== '3'}
              onChange={e => { play('tap'); setSubject(e.target.value) }}>
              <option value="pronoun">Pronoun — {pronObj.dev} ({pronObj.iast})</option>
              {SUBJECT_NOUNS.filter(n => n.linga === linga).map(n => {
                const f = n.forms[vachanam]
                return <option key={n.id} value={n.id}>{f.dev} / {f.iast} — {n.en}</option>
              })}
            </select>
          </div>
        )}

        {/* Object / Location / Time */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">{auxLabel}</div>
          <select className="gr-verb-select" value={objectId} onChange={e => { play('tap'); setObjectId(e.target.value) }}>
            {auxList.map(item => (
              <option key={item.id} value={item.id}>{item.dev} / {item.iast} — {item.en}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Dialogue panel ── */}
      {question && statement ? (
        <div className="qe-dialogue">

          {/* Question */}
          <div className="qe-bubble qe-bubble-q">
            <div className="qe-bubble-label">
              <span className="qe-badge qe-badge-q">Q प्रश्नः</span>
            </div>
            <div className="qe-bubble-body">
              <div className="qe-sent-row">
                <span className="gr-dev qe-dev">{question.dev}</span>
                <Spk text={question.dev} />
              </div>
              <div className="gr-iast qe-iast">{question.iast}</div>
              <div className="gr-en qe-en">{question.en}</div>
              <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(question.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
            </div>
          </div>

          {/* Affirmative answer */}
          <div className="qe-bubble qe-bubble-yes">
            <div className="qe-bubble-label">
              <span className="qe-badge qe-badge-yes">आम् ✓ Yes</span>
            </div>
            <div className="qe-bubble-body">
              {(qtype === 'yesno' || qtype === 'va') ? (
                <>
                  <div className="qe-sent-row">
                    <span className="gr-dev qe-dev" style={{color:'var(--teal)'}}>आम्, {statement.dev}</span>
                    <Spk text={`आम्, ${statement.dev}`} />
                  </div>
                  <div className="gr-iast qe-iast">ām, {statement.iast}</div>
                  <div className="gr-en qe-en">Yes, {statement.en}</div>
                </>
              ) : (
                <>
                  <div className="qe-sent-row">
                    <span className="gr-dev qe-dev" style={{color:'var(--teal)'}}>{statement.dev}</span>
                    <Spk text={statement.dev} />
                  </div>
                  <div className="gr-iast qe-iast">{statement.iast}</div>
                  <div className="gr-en qe-en">{statement.en}</div>
                </>
              )}
              <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(statement.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
            </div>
          </div>

          {/* Negative answer (mainly for yes/no; also shown as alternative) */}
          {negation && (
            <div className="qe-bubble qe-bubble-no">
              <div className="qe-bubble-label">
                <span className="qe-badge qe-badge-no">न ✗ No</span>
              </div>
              <div className="qe-bubble-body">
                {(qtype === 'yesno' || qtype === 'va') ? (
                  <>
                    <div className="qe-sent-row">
                      <span className="gr-dev qe-dev" style={{color:'var(--saffron)'}}>न, {negation.dev}</span>
                      <Spk text={`न, ${negation.dev}`} />
                    </div>
                    <div className="gr-iast qe-iast">na, {negation.iast}</div>
                    <div className="gr-en qe-en">No, {negation.en}</div>
                  </>
                ) : (
                  <>
                    <div className="qe-sent-row">
                      <span className="gr-dev qe-dev" style={{color:'var(--saffron)'}}>न, {negation.dev}</span>
                      <Spk text={`न, ${negation.dev}`} />
                    </div>
                    <div className="gr-iast qe-iast">na, {negation.iast}</div>
                    <div className="gr-en qe-en">No — {negation.en}</div>
                  </>
                )}
                <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(negation.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
              </div>
            </div>
          )}

          {/* Follow-up dialogue — collapsible accordion */}
          {followUp.length > 0 && (
            <div className="qe-followup">
              <button
                className="qe-followup-toggle"
                onClick={() => { play('tap'); setFollowOpen(o => !o) }}
              >
                <span className="qe-followup-toggle-label">
                  💬 Follow-up conversation · संवादः
                  <span className="qe-followup-count">({followUp.length} exchanges)</span>
                </span>
                <span className="qe-followup-toggle-chevron">{followOpen ? '▲' : '▼'}</span>
              </button>

              {followOpen && (
                <div className="qe-followup-body anim-fade-up">
                  {followUp.map((ex, i) => (
                    <div key={i} className="qe-followup-exchange">
                      {/* Q */}
                      <div className="qe-bubble qe-bubble-q">
                        <div className="qe-bubble-label">
                          <span className="qe-badge qe-badge-q">Q {i + 1}</span>
                        </div>
                        <div className="qe-bubble-body">
                          <div className="qe-sent-row">
                            <span className="gr-dev qe-dev">{ex.q.dev}</span>
                            <Spk text={ex.q.dev} />
                          </div>
                          <div className="gr-iast qe-iast">{ex.q.iast}</div>
                          <div className="gr-en qe-en">{ex.q.en}</div>
                          <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(ex.q.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
                        </div>
                      </div>
                      {/* Yes / affirmative answer */}
                      <div className="qe-bubble qe-bubble-yes">
                        <div className="qe-bubble-label">
                          <span className="qe-badge qe-badge-yes">आम् A</span>
                        </div>
                        <div className="qe-bubble-body">
                          <div className="qe-sent-row">
                            <span className="gr-dev qe-dev" style={{color:'var(--teal)'}}>{ex.a.dev}</span>
                            <Spk text={ex.a.dev} />
                          </div>
                          <div className="gr-iast qe-iast">{ex.a.iast}</div>
                          <div className="gr-en qe-en">{ex.a.en}</div>
                          <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(ex.a.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
                        </div>
                      </div>
                      {/* Optional नास्ति / negative answer */}
                      {ex.na && (
                        <div className="qe-bubble qe-bubble-no">
                          <div className="qe-bubble-label">
                            <span className="qe-badge qe-badge-no">न A</span>
                          </div>
                          <div className="qe-bubble-body">
                            <div className="qe-sent-row">
                              <span className="gr-dev qe-dev" style={{color:'var(--saffron)'}}>{ex.na.dev}</span>
                              <Spk text={ex.na.dev} />
                            </div>
                            <div className="gr-iast qe-iast">{ex.na.iast}</div>
                            <div className="gr-en qe-en">{ex.na.en}</div>
                            <a className="gr-verify-link" href={`https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(ex.na.dev)}&op=translate`} target="_blank" rel="noopener noreferrer">🔍 Verify translation</a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Verb form reference */}
          {form && (
            <div className="qe-verb-ref">
              <span className="qe-verb-ref-label">Verb form used:</span>
              <span className="gr-dev" style={{color:'var(--gold)',fontWeight:700}}>{form[0]}</span>
              <span className="gr-iast" style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>{form[1]}</span>
              <span className="gr-en" style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>{form[2]}</span>
            </div>
          )}
          {!form && (
            <div className="qe-verb-ref" style={{color:'var(--text-muted)',fontStyle:'italic'}}>
              No conjugated form available for {verb.root} in this tense / person / number.
            </div>
          )}
        </div>
      ) : (
        <div style={{padding:'2rem',textAlign:'center',color:'var(--text-muted)',fontStyle:'italic'}}>
          No verb form available for this combination.
        </div>
      )}

      <div className="gr-tip">
        💡 <strong>Tip:</strong> Change the verb, subject, or object above to generate a completely new question and dialogue. Each combination produces a grammatically correct Sanskrit sentence.
      </div>
    </div>
  )
}

// ── VibhaktiLesson ───────────────────────────────────────────────────────────
const VIB_COLOR = {
  teal:   { bg:'rgba(0,200,180,0.10)', border:'rgba(0,200,180,0.35)', text:'var(--teal)'    },
  saffron:{ bg:'rgba(255,153,0,0.10)', border:'rgba(255,153,0,0.35)', text:'var(--saffron)' },
  gold:   { bg:'rgba(212,175,55,0.10)',border:'rgba(212,175,55,0.35)',text:'var(--gold)'    },
  purple: { bg:'rgba(160,90,220,0.10)',border:'rgba(160,90,220,0.35)',text:'#b07de0'        },
  blue:   { bg:'rgba(80,140,255,0.10)',border:'rgba(80,140,255,0.35)',text:'#7aaeff'        },
  green:  { bg:'rgba(80,200,100,0.10)',border:'rgba(80,200,100,0.35)',text:'#6dcf7f'        },
  orange: { bg:'rgba(255,120,50,0.10)',border:'rgba(255,120,50,0.35)',text:'#ff8c42'        },
  red:    { bg:'rgba(220,60,60,0.10)', border:'rgba(220,60,60,0.35)', text:'#e06060'        },
}

function VibhaktiLesson() {
  const { play } = useSoundEffects()
  const { speak } = useSpeech()
  const [tab,        setTab]        = useState('learn')   // 'learn' | 'table'
  const [activeV,    setActiveV]    = useState(0)         // index into VIBHAKTI_LIST
  const [activeNoun, setActiveNoun] = useState('rama')
  const [showIast,   setShowIast]   = useState(false)

  const vib  = VIBHAKTI_LIST[activeV]
  const noun = VIBHAKTI_NOUNS.find(n => n.id === activeNoun)
  const c    = VIB_COLOR[vib.color]

  const vacLabels = { sg: 'Singular · एकवचन', du: 'Dual · द्विवचन', pl: 'Plural · बहुवचन' }

  const highlightSa = (sentence, hl) => {
    if (!hl || !sentence.includes(hl)) return <span>{sentence}</span>
    const parts = sentence.split(hl)
    return <span>{parts[0]}<mark className="vib-hl">{hl}</mark>{parts[1]}</span>
  }

  const verifyUrl = (sa) =>
    `https://translate.google.com/?sl=sa&tl=en&text=${encodeURIComponent(sa)}&op=translate`

  return (
    <div className="gr-lesson vib-lesson">
      {/* Mnemonic banner */}
      <div className="vib-mnemonic-bar">
        <div className="vib-mnemonic-title">🧠 Mnemonic — chant this to remember all 8:</div>
        <div className="vib-mnemonic-chain">
          {VIBHAKTI_LIST.map((v, i) => {
            const cv = VIB_COLOR[v.color]
            return (
              <button key={v.id}
                className={`vib-mnemonic-chip${activeV === i && tab === 'learn' ? ' active' : ''}`}
                style={{ borderColor: cv.border, color: cv.text, background: activeV === i && tab === 'learn' ? cv.bg : 'transparent' }}
                onClick={() => { play('tap'); setTab('learn'); setActiveV(i) }}
              >
                <span className="vib-chip-num">{v.num}</span>
                <span className="vib-chip-marker">{v.hindiMarker}</span>
              </button>
            )
          })}
        </div>
        <div className="vib-mnemonic-hint">ने · को · से · के-लिए · से · का/की/के · में · हे</div>
      </div>

      {/* Tab bar */}
      <div className="gr-tab-bar" style={{marginBottom:'1.25rem'}}>
        {[['learn','📖 Learn Cases'],['table','📊 Declension Table']].map(([t, label]) => (
          <button key={t} className={`gr-tab-btn${tab === t ? ' active' : ''}`}
            onClick={() => { play('tap'); setTab(t) }}>{label}</button>
        ))}
      </div>

      {/* ── LEARN TAB ── */}
      {tab === 'learn' && (
        <div className="vib-learn">
          {/* Vibhakti nav pills */}
          <div className="vib-nav">
            {VIBHAKTI_LIST.map((v, i) => {
              const cv = VIB_COLOR[v.color]
              return (
                <button key={v.id}
                  className={`vib-nav-btn${activeV === i ? ' active' : ''}`}
                  style={activeV === i ? { background: cv.bg, borderColor: cv.border, color: cv.text } : {}}
                  onClick={() => { play('tap'); setActiveV(i) }}
                >
                  <span className="vib-nav-num">{v.num}</span>
                  <span className="vib-nav-name">{v.iast}</span>
                </button>
              )
            })}
          </div>

          {/* Main card */}
          <div className="vib-card" style={{ borderColor: c.border, background: c.bg }}>
            {/* Header */}
            <div className="vib-card-header">
              <span className="vib-badge-emoji">{vib.badge}</span>
              <div className="vib-card-title-group">
                <div className="vib-card-num" style={{ color: c.text }}>Vibhakti {vib.num}</div>
                <div className="vib-card-name" style={{ color: c.text }}>{vib.dev} · {vib.iast}</div>
                <div className="vib-card-role">{vib.karakaEn}</div>
              </div>
              <div className="vib-hindi-chip" style={{ borderColor: c.border, color: c.text }}>
                <span className="vib-hindi-label">Hindi marker</span>
                <span className="vib-hindi-word">{vib.hindiMarker}</span>
              </div>
            </div>

            {/* Question + description */}
            <div className="vib-card-desc">{vib.desc}</div>
            <div className="vib-card-question">❓ {vib.question}</div>
            <div className="vib-card-tip">💡 {vib.tip}</div>

            {/* Prep tag */}
            {vib.prep !== '—' && (
              <div className="vib-prep-row">
                <span className="vib-prep-label">English equivalent:</span>
                <span className="vib-prep-value" style={{ color: c.text }}>{vib.prep}</span>
              </div>
            )}
          </div>

          {/* Example sentences */}
          <div className="vib-examples-label">Example Sentences · उदाहरणानि</div>
          <div className="vib-examples">
            {vib.examples.map((ex, i) => (
              <div key={i} className="vib-example-card" style={{ borderColor: c.border }}>
                <div className="vib-ex-num" style={{ color: c.text }}>Ex {i + 1}</div>
                <div className="vib-ex-body">
                  <div className="vib-ex-sa-row">
                    <span className="gr-dev vib-ex-sa">{highlightSa(ex.sa, ex.hl)}</span>
                    <button className="gr-spk-btn" onClick={() => { play('tap'); speak(ex.sa) }} title="Listen">🔊</button>
                  </div>
                  <div className="gr-iast vib-ex-iast">{ex.iast}</div>
                  <div className="gr-en vib-ex-en">{ex.en}</div>
                  <div className="vib-ex-footer">
                    <span className="vib-ex-hl-label">
                      Highlighted form: <span style={{ color: c.text }}>{ex.hl}</span>
                      {' '}(vibhakti {vib.num} singular)
                    </span>
                    <a className="gr-verify-link"
                      href={verifyUrl(ex.sa)} target="_blank" rel="noopener noreferrer">
                      🔍 Verify translation
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="vib-prev-next">
            <button className="vib-nav-arrow" disabled={activeV === 0}
              onClick={() => { play('tap'); setActiveV(v => v - 1) }}>‹ Prev</button>
            <span className="vib-pager">{activeV + 1} / {VIBHAKTI_LIST.length}</span>
            <button className="vib-nav-arrow" disabled={activeV === VIBHAKTI_LIST.length - 1}
              onClick={() => { play('tap'); setActiveV(v => v + 1) }}>Next ›</button>
          </div>
        </div>
      )}

      {/* ── TABLE TAB ── */}
      {tab === 'table' && (
        <div className="vib-table-view">
          {/* Noun picker */}
          <div className="gr-select-row">
            <label className="gr-select-label">NOUN · नाम</label>
            <div className="gr-select-wrap">
              <select className="gr-select" value={activeNoun}
                onChange={e => { play('tap'); setActiveNoun(e.target.value) }}>
                {VIBHAKTI_NOUNS.map(n => (
                  <option key={n.id} value={n.id}>
                    {n.dev} ({n.iast}) — {n.en} · {n.stem}
                  </option>
                ))}
              </select>
              <span className="gr-select-arrow">⌄</span>
            </div>
          </div>

          {/* IAST toggle */}
          <div className="vib-table-controls">
            <button className={`vib-iast-toggle${showIast ? ' active' : ''}`}
              onClick={() => { play('tap'); setShowIast(v => !v) }}>
              {showIast ? 'Hide' : 'Show'} IAST
            </button>
          </div>

          {/* Declension table */}
          <div className="vib-table-scroll">
            <table className="vib-table">
              <thead>
                <tr>
                  <th className="vib-th-case">Case</th>
                  <th>Singular · एकवचन</th>
                  <th>Dual · द्विवचन</th>
                  <th>Plural · बहुवचन</th>
                </tr>
              </thead>
              <tbody>
                {VIBHAKTI_LIST.map((v, i) => {
                  const cv   = VIB_COLOR[v.color]
                  const vkey = `v${v.num}`
                  const forms  = noun.forms[vkey]
                  const iforms = noun.iast_forms[vkey]
                  return (
                    <tr key={v.id}
                      className={`vib-tr${activeV === i && tab === 'table' ? ' vib-tr-active' : ''}`}
                      onClick={() => { play('tap'); setActiveV(i) }}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="vib-td-case" style={{ borderLeftColor: cv.text }}>
                        <span className="vib-td-badge">{v.badge}</span>
                        <span className="vib-td-num" style={{ color: cv.text }}>{v.num}</span>
                        <span className="vib-td-name" style={{ color: cv.text }}>{v.iast}</span>
                        <span className="vib-td-hint">{v.hindiMarker}</span>
                      </td>
                      {['sg','du','pl'].map(vac => (
                        <td key={vac} className="vib-td-form">
                          <span className="vib-form-dev">{forms[vac]}</span>
                          {showIast && <span className="vib-form-iast">{iforms[vac]}</span>}
                          <button className="gr-spk-btn vib-spk" title="Listen"
                            onClick={e => { e.stopPropagation(); play('tap'); speak(forms[vac]) }}>🔊</button>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="vib-table-tip">
            💡 Tap any row to see its examples in the Learn tab.
            The highlighted row is the currently selected case.
          </div>
        </div>
      )}
    </div>
  )
}

const LESSON_VIEWS = {
  pronouns:   PronounsLesson,
  endings:    EndingsLesson,
  verbs:      VerbsLesson,
  negative:   NegativeLesson,
  objects:    ObjectsLesson,
  qa:         QALesson,
  explorer:   ExplorerLesson,
  questions:  QuestionExplorerLesson,
  vibhakti:   VibhaktiLesson,
  gender:     GenderLesson,
  vachanam:   VachanamLesson,
  nouns:      NounsLesson,
  imperfect:  () => <TenseLesson tenseId="imperfect" />,
  future:     () => <TenseLesson tenseId="future" />,
  imperative: () => <TenseLesson tenseId="imperative" />,
  optative:   () => <TenseLesson tenseId="optative" />,
}

// Lessons shown inside the TENSES sub-section
const TENSES_LESSON_IDS = ['endings','verbs','imperfect','future','imperative','optative','explorer','questions']

// Lessons shown directly on the Grammar home page
const HOME_LESSON_IDS = ['nouns','gender','vachanam','pronouns','vibhakti','negative','objects','qa']

const TENSES_GROUPS = [
  { label: 'Present Tense', labelDev: 'लट् लकार', ids: ['verbs'] },
  { label: 'Past',          labelDev: 'लङ् लकार', ids: ['imperfect'] },
  { label: 'Future',        labelDev: 'लृट् लकार', ids: ['future'] },
  { label: 'Commands',      labelDev: 'लोट् लकार', ids: ['imperative'] },
  { label: 'Optative',      labelDev: 'विधिलिङ्',  ids: ['optative'] },
  { label: 'Explore',       labelDev: 'दर्शनम्',   ids: ['explorer'] },
]

// ── Main page ──────────────────────────────────────────────────────────────

export default function GrammarPage() {
  const { play } = useSoundEffects()
  const navigate = useNavigate()
  const { lessonId } = useParams()

  // Detect section from URL path
  const isTenses  = window.location.pathname.startsWith('/grammar/tenses')
  const activeLesson  = lessonId || null

  // ── Lesson view ────────────────────────────────────────────────────────
  if (activeLesson) {
    const lesson = LESSONS.find(l => l.id === activeLesson)
    if (!lesson) return <Navigate to="/grammar" replace />
    const View   = LESSON_VIEWS[lesson.type]
    const listIds = isTenses ? TENSES_LESSON_IDS : HOME_LESSON_IDS
    const listIdx = listIds.indexOf(activeLesson)
    const prevId  = listIds[listIdx - 1]
    const nextId  = listIds[listIdx + 1]
    const prevLesson = prevId ? LESSONS.find(l => l.id === prevId) : null
    const nextLesson = nextId ? LESSONS.find(l => l.id === nextId) : null
    const backPath   = isTenses ? '/grammar/tenses' : '/grammar'
    const backLabel  = isTenses ? 'Tenses' : 'Grammar'

    return (
      <div className="gr-lesson-page anim-fade-up">
        <button className="gr-back" onClick={() => { play('nav'); navigate(backPath) }}>
          <span className="gr-back-arrow">‹</span> {backLabel}
        </button>
        <div className="page-header">
          <div className="gr-lesson-header-row">
            <span className="gr-lesson-icon-inline">{lesson.icon}</span>
            <h1 className="page-title">{lesson.title}</h1>
          </div>
          <p className="page-subtitle devanagari">{lesson.titleDev}</p>
        </div>

        <View />

        <div className="gr-lesson-nav">
          <button className="btn-ghost"
            onClick={() => { play('nav'); navigate(`${backPath}/${prevId}`) }}
            disabled={!prevLesson}>
            ← {prevLesson ? prevLesson.title : ''}
          </button>
          <button className="btn-primary"
            onClick={() => { play('nav'); nextLesson ? navigate(`${backPath}/${nextId}`) : navigate(backPath) }}>
            {nextLesson ? `${nextLesson.title} →` : 'Done ✓'}
          </button>
        </div>
      </div>
    )
  }

  // ── Tenses sub-section ─────────────────────────────────────────────────
  if (isTenses) {
    return (
      <div className="hub-page anim-fade-up">
        <button className="gr-back" onClick={() => { play('nav'); navigate('/grammar') }}>
          <span className="gr-back-arrow">‹</span> Grammar
        </button>
        <div className="page-header">
          <h1 className="page-title">Tenses</h1>
          <p className="page-subtitle">लकाराः · 5 tenses + conjugation explorer</p>
        </div>

        <div className="hub-list">
          {TENSES_LESSON_IDS.map((id, i) => {
            const lesson = LESSONS.find(l => l.id === id)
            if (!lesson) return null
            return (
              <button key={lesson.id}
                className="hub-item gr-hub-item"
                onClick={() => { play('tap'); navigate(`/grammar/tenses/${lesson.id}`) }}>
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
            )
          })}
        </div>
      </div>
    )
  }

  // ── Grammar home ───────────────────────────────────────────────────────
  return (
    <div className="hub-page anim-fade-up">
      <HubBack to="/study" label="Study" />
      <div className="page-header">
        <h1 className="page-title">Grammar</h1>
        <p className="page-subtitle">Sanskrit grammar · structured and progressive</p>
      </div>

      <div className="hub-list">
        {/* TENSES card */}
        <button className="hub-item gr-hub-item"
          onClick={() => { play('tap'); navigate('/grammar/tenses') }}>
          <span className="hub-item-icon">📚</span>
          <div className="hub-item-text">
            <div className="hub-item-label">Tenses
              <span className="gr-dev gr-title-dev"> — लकाराः</span>
            </div>
            <div className="hub-item-sub">Present · Imperfect · Future · Imperative · Optative · Explorer</div>
          </div>
          <span className="hub-item-chevron">›</span>
        </button>

        {/* All other lessons directly on home */}
        {HOME_LESSON_IDS.map((id, i) => {
          const lesson = LESSONS.find(l => l.id === id)
          if (!lesson) return null
          return (
            <button key={lesson.id}
              className="hub-item gr-hub-item"
              onClick={() => { play('tap'); navigate(`/grammar/${lesson.id}`) }}>
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
          )
        })}
      </div>
    </div>
  )
}
