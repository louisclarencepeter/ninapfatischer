const WIDTHS = [768, 1280, 1920, 2200]
const jpg = WIDTHS.map((w) => `/images/wildthing-clay${w === 2200 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/wildthing-clay-w${w}.webp ${w}w`).join(', ')

export default function Music() {
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
          alt="Nina arching into wild thing pose on sun-warmed clay rock at golden hour"
          className="np-music-img"
          loading="lazy"
        />
      </picture>
      <div className="np-music-scrim" aria-hidden="true" />
      <div className="np-container np-music-content">
        <div className="np-music-copy">
          <span className="np-music-eyebrow">Atmosphere</span>
          <p className="np-music-quote">
            Music carries us between effort and ease &mdash; it sets the atmosphere, and lets the
            body remember how to feel.
          </p>
          <p className="np-music-note">
            A carefully chosen soundtrack threads through every class &mdash; guiding us into
            movement, holding us in stillness, and carrying us home.
          </p>
        </div>
      </div>
    </section>
  )
}
