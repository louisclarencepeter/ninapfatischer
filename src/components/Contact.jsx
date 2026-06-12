import { useState } from 'react'

const POINTS = [
  {
    title: 'Studios & outdoors',
    desc: 'Group classes, privates & retreats — Germany and beyond.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'All levels welcome',
    desc: 'Beginners to seasoned practitioners. Come exactly as you are.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
      </svg>
    ),
  },
  {
    title: 'Sound-led sessions',
    desc: 'Each class is shaped by music and the mood of the day.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

export default function Contact({ onSent }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus('sent')
      onSent()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="np-contact-section">
      <div className="np-container np-contact">
        <div>
          <span className="np-section-eyebrow">Let&rsquo;s practice together</span>
          <h2 className="np-section-title">Come breathe with me</h2>
          <p className="np-contact-lead">
            Tell me a little about what you&rsquo;re looking for &mdash; a class, a private
            session, or simply where to begin. I&rsquo;ll write back personally.
          </p>
          <div className="np-contact-points">
            {POINTS.map((p) => (
              <div key={p.title} className="np-point">
                <span aria-hidden="true" className="np-point-icon">
                  {p.icon}
                </span>
                <div>
                  <div className="np-point-title">{p.title}</div>
                  <div className="np-point-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="np-form-card">
          {status === 'sent' ? (
            <div className="np-confirm">
              <span aria-hidden="true" className="np-confirm-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
              <h3>Thank you</h3>
              <p>
                Your message is on its way. I&rsquo;ll be in touch soon &mdash; take a deep breath,
                you&rsquo;re already on your way.
              </p>
            </div>
          ) : (
            <form className="np-form" onSubmit={handleSubmit}>
              <div className="np-form-two">
                <div className="np-field">
                  <label htmlFor="np-name">Your name</label>
                  <input id="np-name" name="name" type="text" required placeholder="Jane Doe" autoComplete="name" />
                </div>
                <div className="np-field">
                  <label htmlFor="np-email">Email</label>
                  <input id="np-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
                </div>
              </div>
              <div className="np-field">
                <label htmlFor="np-practice">Which practice calls you?</label>
                <input id="np-practice" name="practice" type="text" placeholder="Vinyasa, Yin, a private session…" />
              </div>
              <div className="np-field">
                <label htmlFor="np-msg">Message</label>
                <textarea id="np-msg" name="message" rows="4" required placeholder="Tell me what you're looking for…" />
              </div>
              <div className="np-hp" aria-hidden="true">
                <label htmlFor="np-website">Leave this field empty</label>
                <input id="np-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
              </div>
              {status === 'error' && (
                <p className="np-form-error" role="alert">
                  Something went quiet on the way &mdash; please try again, or write to me directly
                  at nina@ninapfatischer.com.
                </p>
              )}
              <button type="submit" className="np-btn np-btn-primary np-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send a message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
