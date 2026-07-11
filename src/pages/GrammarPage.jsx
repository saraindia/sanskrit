import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LESSONS, PRONOUNS, ENDINGS, VERBS, QA_PAIRS, OBJ_VERB_SENTENCES,
         VERB_EXAMPLES, TENSES, PURUSHAS, VACHANAMS, LINGAS, PRONOUN_TABLE,
         GENDER_DATA, GENDER_NOUNS_100 } from '../data/grammar.js'
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
      <div className="gr-sel-group">
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb} onChange={e => setActiveVerb(e.target.value)}>
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
          {rows.map(row => (
            <tr key={row.label}>
              <td className="gr-person">{row.label}</td>
              {[row.sg, row.du, row.pl].map(key => (
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

function ExplorerLesson() {
  const { play } = useSoundEffects()
  const { speak } = useSpeech()
  const [tense,      setTense]      = useState('present')
  const [purusha,    setPurusha]    = useState('3')
  const [linga,      setLinga]      = useState('m')
  const [vachanam,   setVachanam]   = useState('sg')
  const [verbFilter, setVerbFilter] = useState(VERBS[0].id)

  // Build the form key, e.g. p3sg, p2du, p1pl
  const formKey   = `p${purusha}${vachanam}`
  const showVerbs = verbFilter === 'all' ? VERBS : VERBS.filter(v => v.id === verbFilter)
  const pronoun   = PRONOUN_TABLE[purusha][linga][vachanam].dev
  const purObj  = PURUSHAS.find(p => p.id === purusha)
  const vacObj  = VACHANAMS.find(v => v.id === vachanam)

  // Pick the right forms for the selected tense
  const getTenseForms = (verb) => tense === 'present' ? verb.forms : verb[tense]

  // Build an example sentence for the selected tense by swapping the verb form
  // into the existing present-tense sentence (if one exists for this formKey).
  const getExample = (verbId, formKey, form) => {
    const presentEx = VERB_EXAMPLES[verbId]?.[formKey]
    if (!presentEx) return null
    if (tense === 'present') return presentEx
    if (!form) return null
    const devWords  = presentEx.dev.replace('।', '').split(' ')
    const iastWords = presentEx.iast.replace(/[.?!]$/, '').split(' ')
    devWords[devWords.length - 1]   = form[0]
    iastWords[iastWords.length - 1] = form[1]
    return { dev: devWords.join(' ') + '।', iast: iastWords.join(' ') + '.', en: form[2] }
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
                onClick={() => { play('tap'); setPurusha(p.id) }}>
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
                onClick={() => { play('tap'); setLinga(l.id) }}>
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
                onClick={() => { play('tap'); setVachanam(v.id) }}>
                <span className="gr-dev">{v.labelDev}</span>
                <span className="gr-sel-pill-sub">{v.label} — {v.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Verb filter */}
        <div className="gr-sel-group">
          <div className="gr-sel-label">Verb · धातु</div>
          <select className="gr-verb-select" value={verbFilter} onChange={e => setVerbFilter(e.target.value)}>
            <option value="all">All verbs ({VERBS.length})</option>
            {VERBS.map(v => (
              <option key={v.id} value={v.id}>{v.root} — {v.meaning}</option>
            ))}
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
            <td><em>-aḥ, -a</em></td>
            <td><span className="gr-dev">सः</span> <span className="gr-iast">saḥ</span></td>
            <td><span className="gr-dev">रामः</span> <span className="gr-iast">rāmaḥ</span></td>
          </tr>
          <tr>
            <td><span className="gr-gbadge gr-gbadge-f" style={{fontSize:'0.75rem'}}>स्त्रीलिङ्गम्</span><div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>feminine</div></td>
            <td><span className="gr-dev">स्त्रीलिङ्गम्</span></td>
            <td><em>-ā, -ī</em></td>
            <td><span className="gr-dev">सा</span> <span className="gr-iast">sā</span></td>
            <td><span className="gr-dev">सीता</span> <span className="gr-iast">sītā</span></td>
          </tr>
          <tr>
            <td><span className="gr-gbadge gr-gbadge-n" style={{fontSize:'0.75rem'}}>नपुंसकलिङ्गम्</span><div className="gr-en" style={{fontSize:'0.75rem', marginTop:'0.2rem'}}>neuter</div></td>
            <td><span className="gr-dev">नपुंसकलिङ्गम्</span></td>
            <td><em>-am, -a</em></td>
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
  const verb = VERBS.find(v => v.id === activeVerb)
  const info  = TENSE_INFO[tenseId]
  const endings = ENDINGS[tenseId]
  const forms = verb[tenseId]
  const rows = [
    { label: '3rd', sg: 'p3sg', du: 'p3du', pl: 'p3pl' },
    { label: '2nd', sg: 'p2sg', du: 'p2du', pl: 'p2pl' },
    { label: '1st', sg: 'p1sg', du: 'p1du', pl: 'p1pl' },
  ]
  const { stemDev, stemIast, endDev, endIast, resultDev, resultIast, resultEn } = info.formula

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
        <table className="gr-table">
          <thead><tr><th>Person</th><th>Singular</th><th>Dual</th><th>Plural</th></tr></thead>
          <tbody>
            {endings.map(row => (
              <tr key={row.person}>
                <td className="gr-person">{row.person}</td>
                <td><span className="gr-iast">{row.sg}</span></td>
                <td><span className="gr-iast">{row.du}</span></td>
                <td><span className="gr-iast">{row.pl}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gr-sel-group">
        <div className="gr-sel-label">Verb · धातु</div>
        <select className="gr-verb-select" value={activeVerb}
          onChange={e => { play('tap'); setActiveVerb(e.target.value) }}>
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
        <table className="gr-table">
          <thead><tr><th>Person</th><th>Singular</th><th>Dual</th><th>Plural</th></tr></thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.label}>
                <td className="gr-person">{row.label}</td>
                {[row.sg, row.du, row.pl].map(key => (
                  <td key={key}>
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

      <div className="gr-tip">{info.tip}</div>
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
  gender:     GenderLesson,
  vachanam:   VachanamLesson,
  nouns:      NounsLesson,
  imperfect:  () => <TenseLesson tenseId="imperfect" />,
  future:     () => <TenseLesson tenseId="future" />,
  imperative: () => <TenseLesson tenseId="imperative" />,
  optative:   () => <TenseLesson tenseId="optative" />,
}

// Lessons shown inside the TENSES sub-section
const TENSES_LESSON_IDS = ['endings','verbs','imperfect','future','imperative','optative','explorer']

// Lessons shown directly on the Grammar home page
const HOME_LESSON_IDS = ['nouns','gender','vachanam','pronouns','negative','objects','qa']

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
    if (!lesson) { navigate('/grammar', { replace: true }); return null }
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
