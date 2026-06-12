import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: 'Story' },
  { href: '#classes', label: 'Classes' },
  { href: '#music', label: 'Music' },
  { href: '#gallery', label: 'Moments' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`np-nav${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="np-container np-nav-inner" aria-label="Primary">
        <a href="#top" className="np-brand">
          <span className="np-wordmark">Nina Pfatischer</span>
          <span className="np-sub">Yoga &middot; Mindfulness</span>
        </a>
        <div className="np-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="np-link">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="np-bookbtn"
            onClick={() => {
              setMenuOpen(false)
              onBook()
            }}
          >
            Book a class
          </button>
        </div>
        <button
          type="button"
          className="np-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="np-menu">
          <div className="np-container np-menu-inner">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="np-menu-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
