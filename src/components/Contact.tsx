import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'
import { ArrowRight, Chat, Check, Copy, Mail, Phone } from './icons'
import { contact } from '../data/site'

type Copied = 'email' | 'phone' | null

export default function Contact() {
  const [copied, setCopied] = useState<Copied>(null)
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'Website',
    message: '',
  })

  const copy = async (value: string, key: Exclude<Copied, null>) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fall back to a
      // temporary textarea + execCommand so the button still does something useful.
      const el = document.createElement('textarea')
      el.value = value
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      try {
        document.execCommand('copy')
        setCopied(key)
        window.setTimeout(() => setCopied(null), 1800)
      } finally {
        document.body.removeChild(el)
      }
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = `New project enquiry — ${form.type}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.type}`,
      '',
      form.message,
      '',
      '— sent from raphael.dev',
    ].join('\n')

    setStatus('Opening your mail app with the details filled in…')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <Reveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2>
              Let’s build something <span className="grad-text">worth launching</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Tell me what you’re building — a website, an app, an API, or a system that needs
              rescuing. You’ll get a straight answer on scope, timeline and cost, usually the same
              day.
            </p>

            <div className="contact__direct">
              <div className="direct">
                <span className="direct__icon">
                  <Mail width={19} height={19} />
                </span>
                <span className="direct__text">
                  <span className="direct__label">Email</span>
                  <a className="direct__value" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </span>
                <button
                  className="copy"
                  data-copied={copied === 'email'}
                  onClick={() => copy(contact.email, 'email')}
                  aria-label="Copy email address"
                >
                  {copied === 'email' ? <Check width={17} height={17} /> : <Copy width={17} height={17} />}
                </button>
              </div>

              <div className="direct">
                <span className="direct__icon">
                  <Phone width={19} height={19} />
                </span>
                <span className="direct__text">
                  <span className="direct__label">Phone / WhatsApp</span>
                  <a className="direct__value" href={`tel:${contact.phoneRaw}`}>
                    {contact.phoneDisplay}
                  </a>
                </span>
                <button
                  className="copy"
                  data-copied={copied === 'phone'}
                  onClick={() => copy(contact.phoneRaw, 'phone')}
                  aria-label="Copy phone number"
                >
                  {copied === 'phone' ? <Check width={17} height={17} /> : <Copy width={17} height={17} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn btn--primary" href={contact.whatsapp} target="_blank" rel="noreferrer">
                <Chat width={18} height={18} />
                Message on WhatsApp
              </a>
              <a className="btn btn--ghost" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>

            <p className="form__note" style={{ marginTop: 18 }}>
              Prefer email? Write to{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> — {contact.responseTime.toLowerCase()}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="contact__panel form" onSubmit={onSubmit}>
            <div className="form__row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Your email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="type">What do you need?</label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Website</option>
                <option>Web app</option>
                <option>Mobile app</option>
                <option>Backend / API</option>
                <option>Cloud & infrastructure</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="What are you building, who is it for, and what does done look like? Timeline and budget range help too."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button className="btn btn--primary btn--block" type="submit">
              Send enquiry
              <ArrowRight width={18} height={18} />
            </button>

            <p className="form__status" role="status">
              {status}
            </p>
            <p className="form__note">
              This form opens your email client with everything pre-filled, so nothing is stored on a
              server. Or just call / WhatsApp {contact.phoneDisplay}.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
