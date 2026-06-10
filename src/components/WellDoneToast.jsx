import React, { useEffect, useState } from 'react'
import './WellDoneToast.css'

const MESSAGES = [
  { deva: 'उत्तमम्!',       sub: 'uttamam · excellent'  },
  { deva: 'साधु!',           sub: 'sādhu · well done'    },
  { deva: 'सुन्दरम्!',      sub: 'sundaram · beautiful'  },
  { deva: 'वाह!',            sub: 'vāh · wonderful'       },
  { deva: 'शाबाश!',          sub: 'shābāsh · bravo'       },
  { deva: 'प्रगतिः!',       sub: 'pragatiḥ · progress'   },
  { deva: 'अतिसुन्दरम्!',  sub: 'atisundaram · superb'  },
  { deva: 'धन्यवादः!',      sub: 'dhanyavādaḥ · thanks'  },
]

export default function WellDoneToast({ show, onHide }) {
  const [msg, setMsg] = useState(MESSAGES[0])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return
    // Pick a random message each time
    setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    setVisible(true)
    const hide = setTimeout(() => { setVisible(false); onHide?.() }, 1500)
    return () => clearTimeout(hide)
  }, [show]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!show && !visible) return null

  return (
    <div className={`wd-toast ${visible ? 'wd-in' : 'wd-out'}`}>
      <div className="wd-deva devanagari">{msg.deva}</div>
      <div className="wd-sub">{msg.sub}</div>
    </div>
  )
}
