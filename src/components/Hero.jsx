const WIDTHS = [640, 960, 1440, 1800]
const jpg = WIDTHS.map((w) => `/images/portrait-garden${w === 1800 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/portrait-garden-w${w}.webp ${w}w`).join(', ')

export default function Hero({ onBook }) {
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
          alt="Nina smiling toward the sun on a wooden boardwalk in a green garden"
          className="np-hero-img"
          fetchpriority="high"
        />
      </picture>
      <div className="np-hero-scrim" aria-hidden="true" />
      <div className="np-container np-hero-content">
        <div className="np-hero-copy">
          <span className="np-hero-eyebrow">A Mindful Practice</span>
          <h1 className="np-hero-title">
            Come back to <em>yourself</em>
          </h1>
          <p className="np-hero-lead">
            Yoga that is so much more than movement &mdash; mindfulness, serenity, and a quiet
            return to gratitude. Come breathe, soften, and feel grounded again.
          </p>
          <div className="np-hero-actions">
            <button type="button" className="np-btn np-btn-primary" onClick={onBook}>
              Book a class
            </button>
            <a href="#classes" className="np-btn np-btn-ghost">
              Explore the practice
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
