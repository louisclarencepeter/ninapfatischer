export default function Music() {
  return (
    <section id="music" className="np-music">
      <img
        src="/images/wildthing-clay.jpg"
        alt="Nina arching into wild thing pose on sun-warmed clay rock at golden hour"
        className="np-music-img"
        loading="lazy"
      />
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
