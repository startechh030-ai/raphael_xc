/**
 * Single source of truth for everything editable on the site.
 * Swap the copy, projects and contact details here — no need to touch components.
 */

export const contact = {
  name: 'Raphael',
  email: 'raphaelphp000@gmail.com',
  /** Digits only, with country code. Used for tel: and wa.me links. */
  phoneRaw: '+2347039768931',
  /** Display version, shown on the page. */
  phoneDisplay: '+234 703 976 8931',
  whatsapp: 'https://wa.me/2347039768931',
  location: 'Lagos, Nigeria',
  timezone: 'Africa/Lagos',
  /** Response promise shown in the hero + contact section. */
  responseTime: 'Usually replies within 24 hours',
} as const

export const socials = [
  { label: 'GitHub', href: 'https://github.com/startechh030-ai' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'X', href: 'https://x.com/' },
] as const

export const stats = [
  { value: '6+', label: 'Years shipping products' },
  { value: '40+', label: 'Projects delivered' },
  { value: '99.9%', label: 'Uptime on managed systems' },
  { value: '24h', label: 'Average reply time' },
] as const

export type Service = {
  id: string
  title: string
  blurb: string
  bullets: string[]
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Websites & Web Apps',
    blurb:
      'Interfaces that load fast, rank well and feel considered down to the last hover state.',
    bullets: [
      'React / Next.js + TypeScript',
      'Design systems & component libraries',
      'Core Web Vitals, SEO, accessibility',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    blurb:
      'Cross-platform iOS and Android apps from one codebase — without the compromise.',
    bullets: ['React Native / Expo', 'Offline-first data & push', 'App Store & Play releases'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    blurb:
      'Servers that stay up under load, with data models built to survive the second year.',
    bullets: ['Node / Python services', 'PostgreSQL, Redis, queues', 'Auth, payments, webhooks'],
  },
  {
    id: 'infra',
    title: 'Cloud & Infrastructure',
    blurb: 'Deploy pipelines, observability and the boring reliability work nobody sees.',
    bullets: ['Docker + CI/CD pipelines', 'AWS, VPS, Nginx, TLS', 'Monitoring, alerts, backups'],
  },
]

export type Project = {
  id: string
  title: string
  category: string
  year: string
  summary: string
  stack: string[]
  image: string
  metric: string
}

export const projects: Project[] = [
  {
    id: 'ledger',
    title: 'Ledgerly',
    category: 'Fintech dashboard',
    year: '2025',
    summary:
      'A real-time treasury dashboard moving six-figure daily volume, with streaming charts and role-based access.',
    stack: ['Next.js', 'TypeScript', 'Node', 'PostgreSQL'],
    image: '/work/fintech-dashboard.jpg',
    metric: '1.2s → 340ms dashboard load',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Mobile app',
    year: '2025',
    summary:
      'An offline-first habit and wellbeing tracker with gentle notifications and a synced companion web app.',
    stack: ['React Native', 'Expo', 'SQLite', 'Realtime sync'],
    image: '/work/mobile-app.jpg',
    metric: '4.8★ · 30k+ installs',
  },
  {
    id: 'atlas',
    title: 'Atlas Cloud',
    category: 'Infrastructure',
    year: '2024',
    summary:
      'Containerised deployment platform with one-command rollbacks, autoscaling and cost visibility per service.',
    stack: ['Docker', 'Terraform', 'AWS', 'Grafana'],
    image: '/work/cloud-infra.jpg',
    metric: '99.98% uptime · −38% infra cost',
  },
  {
    id: 'atelier',
    title: 'Atelier',
    category: 'Commerce platform',
    year: '2024',
    summary:
      'Headless storefront and ops tooling for a multi-vendor brand, handling drops, flash sales and international checkout.',
    stack: ['Next.js', 'Stripe', 'Redis', 'Edge cache'],
    image: '/work/commerce-platform.jpg',
    metric: '3.4× conversion lift',
  },
]

export const process = [
  {
    step: '01',
    title: 'Scope it properly',
    body:
      'A call (or a long voice note) to pin down the outcome, the constraints and the trade-offs before a line of code exists.',
  },
  {
    step: '02',
    title: 'Plan in the open',
    body:
      'You get a written plan with milestones, a fixed price or clear hourly range, and a timeline you can hold me to.',
  },
  {
    step: '03',
    title: 'Build with weekly demos',
    body:
      'Every week you see working software on a live staging URL — no vanishing acts, no surprise invoices.',
  },
  {
    step: '04',
    title: 'Ship and stay close',
    body:
      'Launch, monitoring, handover docs and a support window, so the thing keeps running long after I log off.',
  },
] as const

export const stack = [
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Redis',
  'GraphQL',
  'Prisma',
  'Docker',
  'AWS',
  'Terraform',
  'Nginx',
  'GitHub Actions',
  'Grafana',
] as const
