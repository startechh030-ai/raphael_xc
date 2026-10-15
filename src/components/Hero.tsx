import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bolt, Clock, Pin } from './icons'
import { contact } from '../data/site'

const HeroScene = lazy(() => import('./HeroScene'))

const line1 = 'Full-stack engineer'
const line2 = 'for products that'
const line3 = 'have to work.'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const },
  },
}

/** Local time in the owner's timezone — a small signal that a human is behind the site. */
function useLocalTime(tz: string) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: tz,
          }).format(new Date()),
        )
      } catch {
        setTime('')
      }
    }
    update()
    const id = window.setInterval(update, 30_000)
    return () => window.clearInterval(id)
  }, [tz])

  return time
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [ready, setReady] = useState(false)
  const [allow3d, setAllow3d] = useState(true)
  const localTime = useLocalTime(contact.timezone)

  // Respect reduced-motion: skip the WebGL scene entirely and show the static orb.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAllow3d(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Only mount the WebGL scene once the page is idle-ish, then pause it offscreen.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const el = stage.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.01,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const quality =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 820px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4)
      ? 'low'
      : 'high'

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge">
              <i className="dot" />
              Available for new projects · {contact.location}
            </span>
          </motion.div>

          <motion.h1 variants={container} initial="hidden" animate="show">
            <span className="line">
              <motion.span variants={item}>{line1}</motion.span>
            </span>
            <span className="line">
              <motion.span variants={item}>
                {line2} <span className="grad-text">actually</span>
              </motion.span>
            </span>
            <span className="line">
              <motion.span variants={item}>{line3}</motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="hero__summary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            I’m <strong>Raphael</strong> — I design, build and run the whole stack: fast marketing
            sites and web apps, cross-platform mobile apps, backend APIs, and the servers,
            pipelines and monitoring that keep them online. One person, one point of contact, from
            first sketch to production.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="btn btn--primary" href="#contact">
              Start a project
              <ArrowRight width={18} height={18} />
            </a>
            <a className="btn btn--ghost" href="#work">
              See selected work
            </a>
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <span>
              <Clock width={15} height={15} />
              {localTime ? `${localTime} local time` : contact.location}
            </span>
            <span>
              <Bolt width={15} height={15} />
              {contact.responseTime}
            </span>
            <span>
              <Pin width={15} height={15} />
              Works with teams worldwide, remote-first
            </span>
          </motion.div>
        </div>

        <div className="hero__stage" ref={stage} aria-hidden="true">
          <div className="hero__canvas">
            {ready && allow3d && (
              <Suspense
                fallback={
                  <div className="stage-fallback">
                    <div className="stage-fallback__orb" />
                  </div>
                }
              >
                <HeroScene active={inView} quality={quality} />
              </Suspense>
            )}
          </div>
          {(!ready || !allow3d) && (
            <div className="stage-fallback">
              <div className="stage-fallback__orb" />
            </div>
          )}
        </div>
      </div>

      <div className="hero__scroll">
        <i />
        Scroll
      </div>
    </section>
  )
}
