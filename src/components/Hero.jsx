export default function Hero({ onBook }) {
  return (
    <section id="top" className="np-hero">
      <img
        src="/images/portrait-garden.jpg"
        alt="Nina smiling toward the sun on a wooden boardwalk in a green garden"
        className="np-hero-img"
        fetchpriority="high"
      />
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
