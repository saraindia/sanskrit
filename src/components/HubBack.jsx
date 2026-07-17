import React from 'react'
import { Link } from 'react-router-dom'
import './HubBack.css'

export default function HubBack({ to, label, onClick }) {
  if (onClick) {
    return (
      <button className="hub-back" onClick={onClick}>
        <span className="hub-back-arrow">‹</span>
        {label}
      </button>
    )
  }
  return (
    <Link to={to} className="hub-back">
      <span className="hub-back-arrow">‹</span>
      {label}
    </Link>
  )
}
