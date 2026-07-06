import { ZANZIBAR_RETREAT_URL } from '../constants.js'

const BANNERS = {
  morocco: {
    base: '/images/gallery/half-moon-terrace',
    widths: [480, 960],
    masterW: 1280,
    masterH: 960,
  },
  zanzibar: {
    base: '/images/zanzibar-tree-pose',
    widths: [480, 960],
    masterW: 1200,
    masterH: 1800,
    // Portrait master: keep Nina and the bays in frame when cover-cropped.
    position: 'center 55%',
  },
}

function bannerSources({ base, widths, masterW }) {
  const webp = [...widths, masterW].map((w) => `${base}-w${w}.webp ${w}w`).join(', ')
  const jpg = [...widths.map((w) => `${base}-w${w}.jpg ${w}w`), `${base}.jpg ${masterW}w`].join(', ')
  return { webp, jpg }
}

function Cta({ href, onClick, className, children }) {
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

function RetreatSection({ id, copy, banner, ctaHref, onBook }) {
  const { webp, jpg } = bannerSources(banner)
  return (
    <section id={id} className="np-retreat">
      <div className="np-retreat-banner">
        <picture>
          <source type="image/webp" srcSet={webp} sizes="100vw" />
          <img
            src={`${banner.base}.jpg`}
            srcSet={jpg}
            sizes="100vw"
            width={banner.masterW}
            height={banner.masterH}
            alt={copy.alt}
            className="np-retreat-img"
            style={banner.position ? { objectPosition: banner.position } : undefined}
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
          <div className="np-retreat-facts" role="group" aria-label={copy.summaryLabel}>
            {copy.summary.map((item) => (
              <div key={item.label} className="np-retreat-fact">
                <span className="np-retreat-fact-label">{item.label}</span>
                <span className="np-retreat-fact-value">{item.value}</span>
              </div>
            ))}
          </div>
          <Cta href={ctaHref} onClick={onBook} className="np-btn np-btn-primary np-retreat-summary-cta">
            {copy.ctaButton}
          </Cta>
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
            {copy.options ? (
              <div className="np-retreat-options">
                {copy.options.map((option) => (
                  <div key={option.label} className="np-retreat-price-card np-retreat-option">
                    <span className="np-retreat-price-label">{option.label}</span>
                    <span className="np-retreat-price">{option.price}</span>
                    <p className="np-retreat-price-note">{option.note}</p>
                  </div>
                ))}
                <p className="np-retreat-price-note">{copy.investmentNote}</p>
              </div>
            ) : (
              <div className="np-retreat-price-card">
                <span className="np-retreat-price-label">{copy.priceLabel}</span>
                <span className="np-retreat-price">{copy.price}</span>
                <p className="np-retreat-price-note">{copy.investmentNote}</p>
              </div>
            )}
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

        <div className="np-retreat-cta" data-animate="rise">
          <h3 className="np-retreat-cta-title">{copy.ctaTitle}</h3>
          <p className="np-retreat-cta-text">{copy.ctaText}</p>
          <Cta href={ctaHref} onClick={onBook} className="np-btn np-btn-primary">
            {copy.ctaButton}
          </Cta>
          {copy.ctaNote && <p className="np-retreat-cta-note">{copy.ctaNote}</p>}
        </div>
      </div>
    </section>
  )
}

// Rendered separately in App so the gallery can sit between the retreat
// sections and the quotes; the quotes stay directly above the contact form.
export function RetreatVoices({ copy }) {
  if (!copy.testimonials?.length) return null
  return (
    <section className="np-retreat" aria-label={copy.testimonialsTitle}>
      <div className="np-container np-retreat-body">
        <div className="np-retreat-quotes" data-animate="rise">
          <h2 className="np-retreat-heading">{copy.testimonialsTitle}</h2>
          <div className="np-retreat-quote-grid">
            {copy.testimonials.map((q) => (
              <figure key={q.slice(0, 32)} className="np-retreat-quote">
                <blockquote>{q}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Retreat({ copy, onBook }) {
  return (
    <>
      <RetreatSection id="retreat" copy={copy} banner={BANNERS.morocco} onBook={onBook} />
      <RetreatSection
        id="retreat-zanzibar"
        copy={copy.zanzibar}
        banner={BANNERS.zanzibar}
        ctaHref={ZANZIBAR_RETREAT_URL}
      />
    </>
  )
}
