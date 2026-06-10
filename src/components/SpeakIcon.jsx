import React from 'react'

/**
 * Crisp SVG speaker icon — uses currentColor so it inherits
 * the button's CSS color and adapts to any theme.
 * size: CSS value, default "1em"
 */
export default function SpeakIcon({ size = '1em', className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Speaker cone */}
      <path
        d="M3 7.5h3l4-3v11l-4-3H3v-5z"
        fill="currentColor"
        stroke="none"
      />
      {/* Small arc — near wave */}
      <path
        d="M13 7.5a3.5 3.5 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Large arc — far wave */}
      <path
        d="M15 5a6.5 6.5 0 0 1 0 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
