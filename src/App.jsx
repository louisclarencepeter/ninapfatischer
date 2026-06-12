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

export default function App({ language }) {
  const lang = initialLanguage(language)
  const t = copy[lang]
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 3600)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

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
      <Nav language={lang} copy={t} onBook={goBook} />
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
