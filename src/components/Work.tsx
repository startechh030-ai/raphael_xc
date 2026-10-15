import Reveal from './Reveal'
import { ArrowUpRight } from './icons'
import { projects } from '../data/site'

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="h2">
              Things I shipped that <span className="grad-text">people use</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede" style={{ maxWidth: '40ch' }}>
              A snapshot of recent builds across product, mobile and infrastructure. Happy to walk
              through architecture and trade-offs on a call.
            </p>
          </Reveal>
        </div>

        <div className="work-grid">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 80}>
              <article className="project">
                <div className="project__media">
                  <span className="project__year">{project.year}</span>
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    loading={i > 1 ? 'lazy' : 'eager'}
                    decoding="async"
                    width={1200}
                    height={825}
                  />
                </div>
                <div className="project__body">
                  <p className="project__cat">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project__foot">
                    <div className="tags">
                      {project.stack.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="project__metric">{project.metric}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div style={{ marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a className="btn btn--ghost" href="#contact">
              Request a case study
              <ArrowUpRight width={18} height={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
