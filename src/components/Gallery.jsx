import { useCallback, useEffect, useState } from 'react'

const PHOTOS = [
  { src: '/images/gallery/lotus-desert.jpg', alt: 'Nina seated in lotus on sun-warmed desert rock' },
  { src: '/images/gallery/inversion-clay-cliff.jpg', alt: 'Nina in a forearm balance against a red clay cliff' },
  { src: '/images/gallery/dancer-cliff-sunset.jpg', alt: 'Nina in dancer pose on the cliffs at golden hour' },
  { src: '/images/gallery/handstand-silhouette.jpg', alt: 'Nina’s handstand silhouetted above the evening ocean' },
  { src: '/images/gallery/ocean-wave.jpg', alt: 'Nina standing steady as a wave breaks behind the rocks' },
  { src: '/images/gallery/half-moon-terrace.jpg', alt: 'Nina in standing splits on a terrace overlooking the sea' },
  { src: '/images/gallery/tree-pose-islands.jpg', alt: 'Nina in tree pose high above green islands and bays' },
  { src: '/images/gallery/gratitude-mountains.jpg', alt: 'Nina with hands at heart in the misty mountains' },
  { src: '/images/gallery/rooftop-practice.jpg', alt: 'Nina practicing on a rooftop under a clear sky' },
  { src: '/images/gallery/canyon-stillness.jpg', alt: 'Nina standing small and grounded among canyon walls' },
  { src: '/images/gallery/teaching-studio.jpg', alt: 'Nina guiding a studio class through an inversion' },
  { src: '/images/gallery/dancer-dusk.jpg', alt: 'Nina in dancer pose silhouetted on the rocks at dusk' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Gallery() {
  const [photos] = useState(() => shuffle(PHOTOS))
  const [selected, setSelected] = useState(null)

  const close = useCallback(() => setSelected(null), [])
  const step = useCallback(
    (dir) => setSelected((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (selected === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, close, step])

  return (
    <section id="gallery" className="np-gallery">
      <div className="np-container">
        <header className="np-classes-header">
          <span className="np-section-eyebrow">Moments</span>
          <h2 className="np-section-title">Along the way</h2>
          <p className="np-classes-intro">
            Deserts, oceans, mountains, studios &mdash; a few moments from the practice, gathered
            with gratitude.
          </p>
        </header>
        <div className="np-gallery-grid">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className="np-gallery-item"
              onClick={() => setSelected(i)}
              aria-label={`View photo: ${p.alt}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="np-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[selected].alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <button type="button" className="np-lightbox-btn np-lightbox-close" onClick={close} aria-label="Close photo" autoFocus>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button type="button" className="np-lightbox-btn np-lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <img src={photos[selected].src} alt={photos[selected].alt} className="np-lightbox-img" />
          <button type="button" className="np-lightbox-btn np-lightbox-next" onClick={() => step(1)} aria-label="Next photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
