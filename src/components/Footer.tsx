import { Github, Linkedin, XMark } from './icons'
import { contact, socials } from '../data/site'

const icons = [Github, Linkedin, XMark]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <p className="footer__copy" style={{ margin: '0 0 4px' }}>
              © {new Date().getFullYear()} {contact.name} — Full-stack engineer
            </p>
            <p className="footer__copy" style={{ margin: 0 }}>
              {contact.location} · {contact.responseTime}
            </p>
          </div>

          <nav className="footer__links" aria-label="Social links">
            {socials.map((s, i) => {
              const Icon = icons[i] ?? Github
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  <Icon width={15} height={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  {s.label}
                </a>
              )
            })}
            <a href={`mailto:${contact.email}`}>Email</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </nav>
        </div>

        <p className="footer__wordmark">RAPHAEL</p>
      </div>
    </footer>
  )
}
