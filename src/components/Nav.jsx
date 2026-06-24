import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LANGUAGES, pathForLanguage } from '../i18n.js'

const ArrowIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/verenanina/',
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
    href: 'https://www.youtube.com/@ninapfatischer3765/shorts',
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
]

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
  // The menu is portaled to <body> (see below). Gate on mount so the server
  // render and the first client render match (both render nothing), then the
  // portal attaches after hydration.
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the menu is open: lock background scroll (preserving scroll position),
  // make the page behind inert + trap focus, and wire Escape-to-close.
  useEffect(() => {
    if (!menuOpen) return undefined
    const root = document.documentElement
    const { body } = document
    const overlay = overlayRef.current
    const panel = overlay?.querySelector('.np-mm-panel')
    const appRoot = document.getElementById('root')
    const previouslyFocused = document.activeElement
    const prev = {
      root: root.style.overflow,
      body: body.style.overflow,
    }
    // Lock background scroll WITHOUT moving the page: overflow:hidden leaves the
    // scroll position untouched, so opening and closing the menu cause no jump
    // or visible scroll. (We deliberately avoid the old position:fixed + scrollTo
    // restore — it pinned the page but forced a visible scroll-back on close.)
    // No scrollbar-width compensation is needed here: `html { scrollbar-gutter:
    // stable }` keeps the layout width constant when the scrollbar is hidden,
    // so neither the page nor the fixed nav/close button shifts.
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    // Make everything behind the overlay inert: removes it from the tab order
    // (so focus is trapped in the dialog) and hides it from assistive tech.
    // The overlay is portaled to <body>, a sibling of #root, so it stays active.
    if (appRoot) appRoot.inert = true
    // Move focus into the dialog; restore it to the trigger on close.
    overlay?.querySelector('.np-mm-close')?.focus({ preventScroll: true })

    // overflow:hidden alone doesn't stop touch panning on iOS Safari, so block
    // touchmove that would pan the page — but allow it when the panel itself can
    // scroll (short/landscape screens), so its content stays reachable. Taps
    // don't fire touchmove, so links/buttons stay interactive. Non-passive so
    // preventDefault takes effect.
    const blockTouch = (e) => {
      if (panel && panel.scrollHeight > panel.clientHeight) return
      e.preventDefault()
    }
    overlay?.addEventListener('touchmove', blockTouch, { passive: false })
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      root.style.overflow = prev.root
      body.style.overflow = prev.body
      if (appRoot) appRoot.inert = false
      overlay?.removeEventListener('touchmove', blockTouch)
      window.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [menuOpen])

  const menu = (
    <div
      ref={overlayRef}
      className={`np-mm${menuOpen ? ' is-open' : ''}`}
      id="mobileMenu"
      role="dialog"
      aria-modal="true"
      aria-label={copy.navLabel}
      aria-hidden={!menuOpen}
    >
      <div className="np-mm-panel">
        <div className="np-mm-head">
          <div className="np-mm-brand">
            <span className="name">Nina Pfatischer</span>
            <span className="sub">{copy.brandSub}</span>
          </div>
          <button
            type="button"
            className="np-mm-close"
            aria-label={copy.menu.close}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="np-mm-nav" aria-label={copy.navLabel}>
          {copy.nav.map((l, i) => (
            <a key={l.href} href={l.href} className="np-mm-item" onClick={() => setMenuOpen(false)}>
              <span className="label">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="np-mm-name">{l.label}</span>
              </span>
              <span className="np-mm-arrow" aria-hidden="true">
                {ArrowIcon}
              </span>
            </a>
          ))}
        </nav>

        <div className="np-mm-foot">
          <button
            type="button"
            className="np-mm-book"
            onClick={() => {
              setMenuOpen(false)
              onBook()
            }}
          >
            {copy.buttons.book}
          </button>
          <div className="np-mm-controls">
            <LanguageSwitcher copy={copy} language={language} />
            <ThemeToggle copy={copy} onToggleTheme={onToggleTheme} />
          </div>
          <div className="np-mm-social">
            <span className="find">{copy.footer.findMe}</span>
            <div className="icons">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
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
          aria-haspopup="dialog"
          aria-controls="mobileMenu"
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
            <path d="M3 6h18M3 12h12M3 18h16" />
          </svg>
        </button>
      </nav>
      </header>
      {mounted && createPortal(menu, document.body)}
    </>
  )
}
