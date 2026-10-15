import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const Globe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </svg>
)

export const Phone = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 3h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  </svg>
)

export const Server = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <path d="M7 7h.01M7 17h.01M11 7h5M11 17h5" />
  </svg>
)

export const Mobile = (p: P) => (
  <svg {...base(p)}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
    <path d="M10.6 18.6h2.8" />
  </svg>
)

export const Layers = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 3 7.8l9 4.8 9-4.8L12 3Z" />
    <path d="m3 13.2 9 4.8 9-4.8M3 17.6 12 22.4l9-4.8" />
  </svg>
)

export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.8" y="5" width="18.4" height="14" rx="2.5" />
    <path d="m3.6 7 7.1 5.3a2 2 0 0 0 2.6 0L20.4 7" />
  </svg>
)

export const Copy = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-6A2.5 2.5 0 0 0 4 5.5v6A2.5 2.5 0 0 0 6.5 14" />
  </svg>
)

export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

export const Pin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Clock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3.2 2" />
  </svg>
)

export const Bolt = (p: P) => (
  <svg {...base(p)}>
    <path d="M13.5 3 5 13.5h6l-.5 7.5L19 10.5h-6l.5-7.5Z" />
  </svg>
)

export const Chat = (p: P) => (
  <svg {...base(p)}>
    <path d="M20.5 12a8 8 0 0 1-8 8H8l-4 3v-4.6A8 8 0 0 1 12.5 4a8 8 0 0 1 8 8Z" />
    <path d="M9 11h7M9 14.5h4.5" />
  </svg>
)

export const Github = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <path d="M9 20.5c-4 1.2-4-2.2-5.5-2.7m11 5.2v-3.6c0-1 .1-1.4-.5-2 2.3-.25 4.5-1.15 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-.9-.25-3 1.1a10.3 10.3 0 0 0-5.4 0c-2.1-1.35-3-1.1-3-1.1a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 11.9c0 3.85 2.2 4.75 4.5 5-.6.6-.6 1.2-.5 2v3.6" />
  </svg>
)

export const Linkedin = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5v6M8 7.6v.01M12 16.5v-3.4a2 2 0 0 1 4 0v3.4M12 16.5v-6" />
  </svg>
)

export const XMark = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
)
