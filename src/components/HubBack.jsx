import React from 'react'
import { Link } from 'react-router-dom'
import './HubBack.css'

export default function HubBack({ to, label }) {
  return (
    <Link to={to} className="hub-back">
      <span className="hub-back-arrow">‹</span>
      {label}
    </Link>
  )
}
