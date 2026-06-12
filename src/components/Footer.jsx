const FOOTER_LINKS = [
  { href: '#about', label: 'Story' },
  { href: '#classes', label: 'Classes' },
  { href: '#music', label: 'Music' },
  { href: '#gallery', label: 'Moments' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="np-footer-section">
      <div className="np-container">
        <div className="np-footer">
          <div className="np-footer-brand">
            <div className="np-footer-wordmark">Nina Pfatischer</div>
            <p className="np-footer-tagline">Move, soften, and come home to yourself.</p>
          </div>
          <div className="np-footer-cols">
            <div>
              <span className="np-footer-heading">Explore</span>
              <div className="np-footer-links">
                {FOOTER_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className="np-footer-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <span className="np-footer-heading">Find me</span>
              <div className="np-socials">
                <a href="#contact" aria-label="Instagram" className="np-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
                <a href="#contact" aria-label="YouTube" className="np-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 8a5 5 0 0 0-.9-2.8 2.5 2.5 0 0 0-1.8-1C17.6 4 12 4 12 4s-5.6 0-7.3.2a2.5 2.5 0 0 0-1.8 1A5 5 0 0 0 2 8a26 26 0 0 0 0 8 5 5 0 0 0 .9 2.8 2.5 2.5 0 0 0 1.8 1C6.4 20 12 20 12 20s5.6 0 7.3-.2a2.5 2.5 0 0 0 1.8-1A5 5 0 0 0 22 16a26 26 0 0 0 0-8Z" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
                <a href="#contact" aria-label="Email" className="np-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="np-footer-meta">
          <span>&copy; {new Date().getFullYear()} Nina Pfatischer Yoga</span>
          <span>Trained in Portugal &middot; Teaching in Germany</span>
        </div>
      </div>
    </footer>
  )
}
