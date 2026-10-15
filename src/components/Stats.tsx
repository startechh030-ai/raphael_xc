import Reveal from './Reveal'
import { stats } from '../data/site'

export default function Stats() {
  return (
    <section className="section" style={{ paddingTop: 'clamp(32px, 5vw, 60px)' }}>
      <div className="container">
        <Reveal>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat__value">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
