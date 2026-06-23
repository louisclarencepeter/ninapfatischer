const FOOTER_IMG = '/images/gallery/rooftop-practice'
const footerWebp = `${FOOTER_IMG}-w480.webp 480w, ${FOOTER_IMG}-w854.webp 854w`
const footerJpg = `${FOOTER_IMG}-w480.jpg 480w, ${FOOTER_IMG}.jpg 854w`
// Add Nina's WhatsApp number in international format, for example '+491701234567'.
const WHATSAPP_NUMBER = ''

const IconInstagram = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
)

const IconYoutube = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 8a5 5 0 0 0-.9-2.8 2.5 2.5 0 0 0-1.8-1C17.6 4 12 4 12 4s-5.6 0-7.3.2a2.5 2.5 0 0 0-1.8 1A5 5 0 0 0 2 8a26 26 0 0 0 0 8 5 5 0 0 0 .9 2.8 2.5 2.5 0 0 0 1.8 1C6.4 20 12 20 12 20s5.6 0 7.3-.2a2.5 2.5 0 0 0 1.8-1A5 5 0 0 0 22 16a26 26 0 0 0 0-8Z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
)

const IconEmail = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const IconWhatsapp = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.4-4.9A8.5 8.5 0 1 1 20.5 11.7Z" />
    <path d="M8.7 8.9c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.3.4c.5.9 1.2 1.6 2.2 2.1l.4-.3c.2-.2.5-.2.7-.1l1.4.7c.3.1.4.3.4.6v.4c0 .3-.1.6-.4.8-.4.3-1 .5-1.7.4-2.7-.4-5.4-3-5.9-5.7-.1-.5.1-1 .4-1.4Z" />
  </svg>
)

const IconArrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/verenanina/',
    icon: IconInstagram,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@ninapfatischer3765/shorts',
    icon: IconYoutube,
  },
  {
    label: 'Email',
    href: 'mailto:nina@ninapfatischer.com',
    icon: IconEmail,
  },
].filter((s) => s.href)

const contactLinks = (copy) => [
  {
    label: copy.footer.contact.whatsapp,
    value: WHATSAPP_NUMBER,
    href: WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}` : null,
    icon: IconWhatsapp,
  },
  {
    label: copy.footer.contact.email,
    value: 'nina@ninapfatischer.com',
    href: 'mailto:nina@ninapfatischer.com',
    icon: IconEmail,
  },
  {
    label: copy.footer.contact.form,
    value: copy.footer.contact.formValue,
    href: '#contact',
    icon: IconArrow,
  },
].filter((item) => item.href)

export default function Footer({ copy }) {
  return (
    <footer className="np-footer-section">
      <div className="np-container">
        <div className="np-footer">
          <div className="np-footer-brand" data-animate="rise">
            <picture className="np-footer-photo">
              <source type="image/webp" srcSet={footerWebp} sizes="(max-width: 860px) 100vw, 360px" />
              <img
                src={`${FOOTER_IMG}.jpg`}
                srcSet={footerJpg}
                sizes="(max-width: 860px) 100vw, 360px"
                width="854"
                height="1280"
                alt={copy.footer.photoAlt}
                loading="lazy"
              />
            </picture>
            <div className="np-footer-brand-copy">
              <div className="np-footer-wordmark">Nina Pfatischer</div>
              <p className="np-footer-tagline">{copy.footer.tagline}</p>
              <span className="np-footer-social-label">{copy.footer.social}</span>
              <div className="np-socials">
                {SOCIALS.map((s) => {
                  const external = s.href.startsWith('http')
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="np-social"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {s.icon}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="np-footer-cols" data-animate="rise" style={{ '--np-stagger': 1 }}>
            <div>
              <span className="np-footer-heading">{copy.footer.explore}</span>
              <div className="np-footer-links">
                {copy.nav.map((l) => (
                  <a key={l.href} href={l.href} className="np-footer-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <span className="np-footer-heading">{copy.footer.findMe}</span>
              <div className="np-footer-contact">
                {contactLinks(copy).map((item) => {
                  const external = item.href.startsWith('http')
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="np-footer-contact-link"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="np-footer-contact-icon">{item.icon}</span>
                      <span>
                        <span className="np-footer-contact-label">{item.label}</span>
                        <span className="np-footer-contact-value">{item.value}</span>
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="np-footer-meta">
          <span suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Nina Pfatischer Yoga
          </span>
          <span>
            <a href="/impressum.html" className="np-footer-link">
              {copy.footer.legal.impressum}
            </a>
            {' · '}
            <a href="/datenschutz.html" className="np-footer-link">
              {copy.footer.legal.privacy}
            </a>
          </span>
          <span>{copy.footer.location}</span>
        </div>
      </div>
    </footer>
  )
}
