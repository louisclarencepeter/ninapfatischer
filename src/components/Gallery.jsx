import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PHOTOS = [
  { base: '/images/gallery/lotus-desert', w: 1280, h: 854 },
  { base: '/images/gallery/inversion-clay-cliff', w: 1280, h: 854 },
  { base: '/images/gallery/dancer-cliff-sunset', w: 960, h: 1280 },
  { base: '/images/gallery/handstand-silhouette', w: 854, h: 1280 },
  { base: '/images/gallery/ocean-wave', w: 854, h: 1280 },
  { base: '/images/gallery/half-moon-terrace', w: 1280, h: 960 },
  { base: '/images/gallery/tree-pose-islands', w: 854, h: 1280 },
  { base: '/images/gallery/gratitude-mountains', w: 1280, h: 852 },
  { base: '/images/gallery/rooftop-practice', w: 854, h: 1280 },
  { base: '/images/gallery/canyon-stillness', w: 1280, h: 854 },
  { base: '/images/gallery/rock-balance', w: 854, h: 1280 },
  { base: '/images/gallery/dancer-dusk', w: 854, h: 1280 },
]

const SIZES = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw'

const srcset = (p, ext) => {
  const widths = [480, 960].filter((w) => w < p.w)
  const entries = widths.map((w) => `${p.base}-w${w}.${ext} ${w}w`)
  entries.push(ext === 'jpg' ? `${p.base}.jpg ${p.w}w` : `${p.base}-w${p.w}.webp ${p.w}w`)
  return entries.join(', ')
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Gallery({ copy }) {
  const localizedPhotos = useMemo(
    () => PHOTOS.map((photo, index) => ({ ...photo, alt: copy.photos[index] })),
    [copy.photos],
  )
  // Deterministic order for prerendered HTML; reshuffled right after
  // hydration so every visit gets its own arrangement.
  const [photos, setPhotos] = useState(localizedPhotos)
  const [selected, setSelected] = useState(null)
  const lastFocused = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    setPhotos(shuffle(localizedPhotos))
  }, [localizedPhotos])

  const close = useCallback(() => setSelected(null), [])
  const step = useCallback(
    (dir) => setSelected((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  )

  const isOpen = selected !== null

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'Tab') {
        // Keep focus inside the dialog
        const focusables = dialogRef.current?.querySelectorAll('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocused.current?.focus?.()
    }
  }, [isOpen, close, step])

  return (
    <section id="gallery" className="np-gallery">
      <div className="np-container">
        <header className="np-classes-header" data-animate="rise">
          <span className="np-section-eyebrow">{copy.eyebrow}</span>
          <h2 className="np-section-title">{copy.title}</h2>
          <p className="np-classes-intro">{copy.intro}</p>
        </header>
        <div className="np-gallery-grid">
          {photos.map((p, i) => (
            <button
              key={p.base}
              type="button"
              className="np-gallery-item"
              data-animate="gallery"
              style={{ '--np-stagger': i % 6 }}
              onClick={() => {
                // Captured here, not in the effect — by effect time the
                // dialog's autoFocus has already moved document.activeElement.
                lastFocused.current = document.activeElement
                setSelected(i)
              }}
              aria-label={`${copy.viewPhoto}: ${p.alt}`}
            >
              <img
                src={`${p.base}.jpg`}
                srcSet={srcset(p, 'jpg')}
                sizes={SIZES}
                width={p.w}
                height={p.h}
                alt={p.alt}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dialogRef}
          className="np-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[selected].alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <button type="button" className="np-lightbox-btn np-lightbox-close" onClick={close} aria-label={copy.close} autoFocus>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button type="button" className="np-lightbox-btn np-lightbox-prev" onClick={() => step(-1)} aria-label={copy.previous}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <img
            src={`${photos[selected].base}.jpg`}
            alt={photos[selected].alt}
            className="np-lightbox-img"
          />
          <button type="button" className="np-lightbox-btn np-lightbox-next" onClick={() => step(1)} aria-label={copy.next}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
