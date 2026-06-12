const WIDTHS = [640, 960, 1440, 1800]
const jpg = WIDTHS.map((w) => `/images/portrait-garden${w === 1800 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/portrait-garden-w${w}.webp ${w}w`).join(', ')

export default function Hero({ buttons, copy, onBook }) {
  return (
    <section id="top" className="np-hero">
      <picture>
        <source type="image/webp" srcSet={webp} sizes="100vw" />
        <img
          src="/images/portrait-garden.jpg"
          srcSet={jpg}
          sizes="100vw"
          width="1800"
          height="2400"
          alt={copy.alt}
          className="np-hero-img"
          fetchpriority="high"
        />
      </picture>
      <div className="np-hero-scrim" aria-hidden="true" />
      <div className="np-container np-hero-content">
        <div className="np-hero-copy">
          <span className="np-hero-eyebrow">{copy.eyebrow}</span>
          <h1 className="np-hero-title">
            {copy.titlePrefix}
            <em>{copy.titleEm}</em>
          </h1>
          <p className="np-hero-lead">{copy.lead}</p>
          <div className="np-hero-actions">
            <button type="button" className="np-btn np-btn-primary" onClick={onBook}>
              {buttons.book}
            </button>
            <a href="#classes" className="np-btn np-btn-ghost">
              {buttons.explore}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
