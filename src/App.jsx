import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Classes from './components/Classes.jsx'
import Music from './components/Music.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { copy, languageFromPath, normalizeLanguage } from './i18n.js'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const initialLanguage = (language) => {
  if (language) return normalizeLanguage(language)
  if (typeof window === 'undefined') return 'de'
  return languageFromPath(window.location.pathname)
}

const initialTheme = () => {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

const themeColors = {
  light: '#F5EDE1',
  dark: '#17120F',
}

export default function App({ language }) {
  const lang = initialLanguage(language)
  const t = copy[lang]
  const [theme, setTheme] = useState(initialTheme)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 3600)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = prefersReducedMotion()
    root.dataset.motion = reduceMotion ? 'reduced' : 'ready'

    if (reduceMotion) return undefined

    const revealEls = Array.from(document.querySelectorAll('[data-animate]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    revealEls.forEach((el) => observer.observe(el))

    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'))
    let raf = 0

    const updateParallax = () => {
      raf = 0
      const viewportHeight = window.innerHeight || 1
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const progress = (viewportHeight / 2 - center) / viewportHeight
        const offset = Math.max(-22, Math.min(22, progress * 34))
        el.style.setProperty('--np-parallax-y', `${offset.toFixed(2)}px`)
      })
    }

    const requestUpdate = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
    try {
      window.localStorage.setItem('np-theme', theme)
    } catch {
      // Ignore storage failures; the theme still applies for this visit.
    }
  }, [theme])

  const goBook = useCallback(() => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    showToast(t.toast.book)
  }, [showToast, t.toast.book])

  return (
    <>
      <a href="#main" className="np-skip">
        {t.skip}
      </a>
      <Nav
        language={lang}
        copy={t}
        onBook={goBook}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />
      <main id="main">
        <Hero copy={t.hero} buttons={t.buttons} onBook={goBook} />
        <About copy={t.about} />
        <Classes copy={t.classes} />
        <Music copy={t.music} />
        <Gallery copy={t.gallery} />
        <Contact copy={t.contact} onSent={() => showToast(t.toast.sent)} />
      </main>
      <Footer copy={t} />
      {/* Persistent live region: mounting text into an existing region is
          what gets screen readers to actually announce the toast. */}
      <div role="status" aria-live="polite">
        {toast && (
          <div className="np-toast">
            <span aria-hidden="true" className="np-toast-sun">
              &#9728;
            </span>
            {toast}
          </div>
        )}
      </div>
    </>
  )
}
