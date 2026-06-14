// Entries without an href are hidden until the real profile URLs are
// provided — placeholder links pointing nowhere hurt trust and SEO.
const SOCIALS = [
  {
    label: 'Instagram',
    href: null, // TODO: add Nina's Instagram profile URL
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: null, // TODO: add Nina's YouTube channel URL
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8a5 5 0 0 0-.9-2.8 2.5 2.5 0 0 0-1.8-1C17.6 4 12 4 12 4s-5.6 0-7.3.2a2.5 2.5 0 0 0-1.8 1A5 5 0 0 0 2 8a26 26 0 0 0 0 8 5 5 0 0 0 .9 2.8 2.5 2.5 0 0 0 1.8 1C6.4 20 12 20 12 20s5.6 0 7.3-.2a2.5 2.5 0 0 0 1.8-1A5 5 0 0 0 22 16a26 26 0 0 0 0-8Z" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:nina@ninapfatischer.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
].filter((s) => s.href)

export default function Footer({ copy }) {
  return (
    <footer className="np-footer-section">
      <div className="np-container">
        <div className="np-footer">
          <div className="np-footer-brand" data-animate="rise">
            <div className="np-footer-wordmark">Nina Pfatischer</div>
            <p className="np-footer-tagline">{copy.footer.tagline}</p>
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
              <div className="np-socials">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="np-social">
                    {s.icon}
                  </a>
                ))}
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
