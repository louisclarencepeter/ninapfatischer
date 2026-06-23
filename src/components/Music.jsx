const WIDTHS = [768, 1280, 1920, 2200]
const jpg = WIDTHS.map((w) => `/images/wildthing-clay${w === 2200 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/wildthing-clay-w${w}.webp ${w}w`).join(', ')

export default function Music({ copy }) {
  return (
    <section id="music" className="np-music">
      <picture>
        <source type="image/webp" srcSet={webp} sizes="100vw" />
        <img
          src="/images/wildthing-clay.jpg"
          srcSet={jpg}
          sizes="100vw"
          width="2200"
          height="1833"
          alt={copy.alt}
          className="np-music-img"
          data-parallax
          loading="lazy"
        />
      </picture>
      <div className="np-music-scrim" aria-hidden="true" />
      <div className="np-container np-music-content">
        <div className="np-music-copy">
          <span className="np-music-eyebrow" data-animate="fade">
            {copy.eyebrow}
          </span>
          <p className="np-music-quote" data-animate="rise" style={{ '--np-stagger': 1 }}>
            {copy.quote}
          </p>
          <p className="np-music-note" data-animate="rise" style={{ '--np-stagger': 2 }}>
            {copy.note}
          </p>
          {copy.extra && (
            <p className="np-music-note" data-animate="rise" style={{ '--np-stagger': 3 }}>
              {copy.extra}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
