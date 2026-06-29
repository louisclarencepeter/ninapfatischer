const IMG = '/images/gallery/half-moon-terrace'
const webp = [480, 960, 1280].map((w) => `${IMG}-w${w}.webp ${w}w`).join(', ')
const jpg = `${IMG}-w480.jpg 480w, ${IMG}-w960.jpg 960w, ${IMG}.jpg 1280w`

export default function Retreat({ copy, onBook }) {
  return (
    <section id="retreat" className="np-retreat">
      <div className="np-retreat-banner">
        <picture>
          <source type="image/webp" srcSet={webp} sizes="100vw" />
          <img
            src={`${IMG}.jpg`}
            srcSet={jpg}
            sizes="100vw"
            width="1280"
            height="960"
            alt={copy.alt}
            className="np-retreat-img"
            data-parallax
            loading="lazy"
          />
        </picture>
        <div className="np-retreat-scrim" aria-hidden="true" />
        <div className="np-container np-retreat-banner-content">
          <span className="np-retreat-eyebrow" data-animate="fade">
            {copy.eyebrow}
          </span>
          <h2 className="np-retreat-title" data-animate="rise" style={{ '--np-stagger': 1 }}>
            {copy.title}
          </h2>
          <p className="np-retreat-tagline" data-animate="rise" style={{ '--np-stagger': 2 }}>
            {copy.tagline}
          </p>
          <p className="np-retreat-lead" data-animate="rise" style={{ '--np-stagger': 3 }}>
            {copy.lead}
          </p>
        </div>
      </div>

      <div className="np-container np-retreat-body">
        <div className="np-retreat-summary" data-animate="rise">
          <div className="np-retreat-facts" aria-label={copy.summaryLabel}>
            {copy.summary.map((item) => (
              <div key={item.label} className="np-retreat-fact">
                <span className="np-retreat-fact-label">{item.label}</span>
                <span className="np-retreat-fact-value">{item.value}</span>
              </div>
            ))}
          </div>
          <button type="button" className="np-btn np-btn-primary np-retreat-summary-cta" onClick={onBook}>
            {copy.ctaButton}
          </button>
        </div>

        <div className="np-retreat-cols">
          <div className="np-retreat-block" data-animate="rise">
            <h3 className="np-retreat-heading">{copy.includedTitle}</h3>
            <p className="np-retreat-subtext">{copy.includedIntro}</p>
            <ul className="np-retreat-highlights">
              {copy.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="np-retreat-block" data-animate="rise" style={{ '--np-stagger': 1 }}>
            <h3 className="np-retreat-heading">{copy.scheduleTitle}</h3>
            <p className="np-retreat-subtext">{copy.scheduleIntro}</p>
            <ol className="np-retreat-schedule">
              {copy.schedule.map((s) => (
                <li key={s.time} className="np-retreat-slot">
                  <span className="np-retreat-time">{s.time}</span>
                  <span className="np-retreat-slot-copy">
                    <span className="np-retreat-slot-title">{s.title}</span>
                    <span className="np-retreat-slot-desc">{s.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="np-retreat-invest-block" data-animate="rise">
          <h3 className="np-retreat-heading">{copy.investmentTitle}</h3>
          <div className="np-retreat-invest">
            <div className="np-retreat-price-card">
              <span className="np-retreat-price-label">{copy.priceLabel}</span>
              <span className="np-retreat-price">{copy.price}</span>
              <p className="np-retreat-price-note">{copy.investmentNote}</p>
            </div>
            <div className="np-retreat-incexc">
              <div>
                <span className="np-retreat-inc-label">{copy.includedLabel}</span>
                <ul className="np-retreat-list np-retreat-list-inc">
                  {copy.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="np-retreat-inc-label">{copy.excludedLabel}</span>
                <ul className="np-retreat-list np-retreat-list-exc">
                  {copy.excluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="np-retreat-why" data-animate="rise">
          <h3 className="np-retreat-heading">{copy.whyTitle}</h3>
          {copy.why.map((para) => (
            <p key={para.slice(0, 32)} className="np-retreat-why-p">
              {para}
            </p>
          ))}
        </div>

        <div className="np-retreat-quotes" data-animate="rise">
          <h3 className="np-retreat-heading">{copy.testimonialsTitle}</h3>
          <div className="np-retreat-quote-grid">
            {copy.testimonials.map((q) => (
              <figure key={q.slice(0, 32)} className="np-retreat-quote">
                <blockquote>{q}</blockquote>
              </figure>
            ))}
          </div>
        </div>

        <div className="np-retreat-cta" data-animate="rise">
          <h3 className="np-retreat-cta-title">{copy.ctaTitle}</h3>
          <p className="np-retreat-cta-text">{copy.ctaText}</p>
          <button type="button" className="np-btn np-btn-primary" onClick={onBook}>
            {copy.ctaButton}
          </button>
        </div>
      </div>
    </section>
  )
}
