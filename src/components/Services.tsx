import { useCallback, type MouseEvent } from 'react'
import Reveal from './Reveal'
import { Globe, Layers, Mobile, Server } from './icons'
import { services } from '../data/site'

const icons = {
  web: Globe,
  mobile: Mobile,
  backend: Server,
  infra: Layers,
} as const

export default function Services() {
  // Cursor-following glow, throttled through CSS custom properties only.
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">What I do</p>
            <h2 className="h2">
              Four layers, <span className="grad-text">one owner</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ maxWidth: '42ch' }}>
              Most projects stall in the hand-off between design, frontend, backend and ops. I cover
              all four, so the work moves in one straight line.
            </p>
          </Reveal>
        </div>

        <div className="cards">
          {services.map((service, i) => {
            const Icon = icons[service.id as keyof typeof icons] ?? Layers
            return (
              <Reveal key={service.id} delay={i * 90}>
                <article className="card" onMouseMove={onMove}>
                  <div className="card__icon">
                    <Icon width={22} height={22} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.blurb}</p>
                  <ul className="card__list">
                    {service.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
