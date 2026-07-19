import React from 'react'
import './Breadcrumb.css'

// crumbs: [{ label, onClick? }]  — last crumb is current (not clickable)
export default function Breadcrumb({ crumbs }) {
  if (!crumbs?.length) return null
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="breadcrumb-sep">›</span>}
            {isLast || !c.onClick
              ? <span className={`breadcrumb-item ${isLast ? 'breadcrumb-current' : ''}`}>{c.label}</span>
              : <button className="breadcrumb-item breadcrumb-link" onClick={c.onClick}>{c.label}</button>
            }
          </React.Fragment>
        )
      })}
    </nav>
  )
}
