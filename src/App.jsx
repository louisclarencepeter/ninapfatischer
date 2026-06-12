import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Classes from './components/Classes.jsx'
import Music from './components/Music.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
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
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
    showToast('Let’s find your class — a few details below')
  }, [showToast])

  return (
    <>
      <a href="#main" className="np-skip">
        Skip to content
      </a>
      <Nav onBook={goBook} />
      <main id="main">
        <Hero onBook={goBook} />
        <About />
        <Classes />
        <Music />
        <Gallery />
        <Contact onSent={() => showToast('Message sent — talk soon ✨')} />
      </main>
      <Footer />
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
