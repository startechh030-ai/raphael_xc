import Reveal from './Reveal'
import { process } from '../data/site'

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="h2">
              Clear scope, <span className="grad-text">no radio silence</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ maxWidth: '40ch' }}>
              Good communication is a feature. You always know what’s being built, what it costs and
              what happens next.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container">
        <Reveal>
          <div className="process">
            {process.map((p) => (
              <div className="process__item" key={p.step}>
                <div className="process__step">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
