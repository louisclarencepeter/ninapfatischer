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

function ThemeToggle({ copy, onToggleTheme }) {
  return (
    <button
      type="button"
      className="np-theme-toggle"
      aria-label={copy.theme.label}
      title={copy.theme.label}
      onClick={onToggleTheme}
    >
      <svg
        className="np-theme-icon np-theme-icon-sun"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="np-theme-icon np-theme-icon-moon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  )
}

export default function Nav({ copy, language, onBook, onToggleTheme }) {
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
          <div className="np-nav-controls">
            <LanguageSwitcher copy={copy} language={language} />
            <ThemeToggle copy={copy} onToggleTheme={onToggleTheme} />
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
            <div className="np-menu-controls">
              <LanguageSwitcher copy={copy} language={language} />
              <ThemeToggle copy={copy} onToggleTheme={onToggleTheme} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
