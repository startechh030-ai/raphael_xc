import { stack } from '../data/site'

export default function Marquee() {
  const items = [...stack, ...stack]

  return (
    <div className="marquee" aria-label="Tech stack">
      <div className="marquee__track">
        {items.map((tech, i) => (
          <span className="chip" key={`${tech}-${i}`} aria-hidden={i >= stack.length}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
