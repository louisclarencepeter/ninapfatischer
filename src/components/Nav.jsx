import { useEffect, useState } from 'react'
import { LANGUAGES, pathForLanguage } from '../i18n.js'

function LanguageSwitcher({ copy, language }) {
  return (
    <div className="np-lang-switch" aria-label={copy.language.label}>
      {LANGUAGES.map((lang) => (
        <a
          key={lang}
          href={pathForLanguage(lang)}
          className={`np-lang-link${language === lang ? ' is-active' : ''}`}
          hrefLang={lang}
          aria-current={language === lang ? 'true' : undefined}
        >
          {copy.language[lang]}
        </a>
      ))}
    </div>
  )
}

export default function Nav({ copy, language, onBook }) {
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
      <nav className="np-container np-nav-inner" aria-label={copy.navLabel}>
        <a href="#top" className="np-brand">
          <span className="np-wordmark">Nina Pfatischer</span>
          <span className="np-sub">{copy.brandSub}</span>
        </a>
        <div className="np-nav-links">
          {copy.nav.map((l) => (
            <a key={l.href} href={l.href} className="np-link">
              {l.label}
            </a>
          ))}
          <LanguageSwitcher copy={copy} language={language} />
          <button
            type="button"
            className="np-bookbtn"
            onClick={() => {
              setMenuOpen(false)
              onBook()
            }}
          >
            {copy.buttons.book}
          </button>
        </div>
        <button
          type="button"
          className="np-menu-btn"
          aria-label={menuOpen ? copy.menu.close : copy.menu.open}
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
            {copy.nav.map((l) => (
              <a key={l.href} href={l.href} className="np-menu-link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <LanguageSwitcher copy={copy} language={language} />
          </div>
        </div>
      )}
    </header>
  )
}
