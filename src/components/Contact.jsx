import { useEffect, useRef, useState } from 'react'

const POINT_ICONS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
      </svg>
    ),
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
]

export default function Contact({ copy, onSent }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const confirmRef = useRef(null)

  useEffect(() => {
    if (status === 'sent') confirmRef.current?.focus()
  }, [status])

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
          <span className="np-section-eyebrow">{copy.eyebrow}</span>
          <h2 className="np-section-title">{copy.title}</h2>
          <p className="np-contact-lead">{copy.lead}</p>
          <div className="np-contact-points">
            {copy.points.map((p, index) => (
              <div key={p.title} className="np-point">
                <span aria-hidden="true" className="np-point-icon">
                  {POINT_ICONS[index].icon}
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
              <h3 tabIndex={-1} ref={confirmRef}>
                {copy.confirmationTitle}
              </h3>
              <p>{copy.confirmation}</p>
            </div>
          ) : (
            <form className="np-form" onSubmit={handleSubmit}>
              <div className="np-form-two">
                <div className="np-field">
                  <label htmlFor="np-name">{copy.labels.name}</label>
                  <input id="np-name" name="name" type="text" required placeholder={copy.placeholders.name} autoComplete="name" />
                </div>
                <div className="np-field">
                  <label htmlFor="np-email">{copy.labels.email}</label>
                  <input id="np-email" name="email" type="email" required placeholder={copy.placeholders.email} autoComplete="email" />
                </div>
              </div>
              <div className="np-field">
                <label htmlFor="np-practice">{copy.labels.practice}</label>
                <input id="np-practice" name="practice" type="text" placeholder={copy.placeholders.practice} />
              </div>
              <div className="np-field">
                <label htmlFor="np-msg">{copy.labels.message}</label>
                <textarea id="np-msg" name="message" rows="4" required placeholder={copy.placeholders.message} />
              </div>
              <div className="np-hp" aria-hidden="true">
                <label htmlFor="np-website">{copy.labels.website}</label>
                <input id="np-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
              </div>
              {status === 'error' && (
                <p className="np-form-error" role="alert">
                  {copy.errorPrefix} <a href="mailto:nina@ninapfatischer.com">nina@ninapfatischer.com</a>.
                </p>
              )}
              <button type="submit" className="np-btn np-btn-primary np-submit" disabled={status === 'sending'}>
                {status === 'sending' ? copy.sending : copy.submit}
              </button>
              <p className="np-form-privacy">
                {copy.privacyPrefix} <a href="/datenschutz.html">{copy.privacyLink}</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
