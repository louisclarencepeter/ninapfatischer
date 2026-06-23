const WIDTHS = [640, 1024, 1600, 2000]
const jpg = WIDTHS.map((w) => `/images/tree-pose-mountains${w === 2000 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/tree-pose-mountains-w${w}.webp ${w}w`).join(', ')
const SIZES = '(max-width: 860px) 92vw, 40vw'

export default function About({ copy }) {
  return (
    <section id="about" className="np-about">
      <div className="np-container np-split">
        <div className="np-about-media" data-animate="lift">
          <div className="np-about-frame">
            <picture>
              <source type="image/webp" srcSet={webp} sizes={SIZES} />
              <img
                src="/images/tree-pose-mountains.jpg"
                srcSet={jpg}
                sizes={SIZES}
                width="2000"
                height="1995"
                alt={copy.alt}
                loading="lazy"
              />
            </picture>
          </div>
          <div className="np-floatstat" data-animate="float" style={{ '--np-stagger': 2 }}>
            <div className="np-floatstat-num">5</div>
            <div className="np-floatstat-label">{copy.stat}</div>
          </div>
        </div>
        <div>
          <span className="np-section-eyebrow" data-animate="fade">
            {copy.eyebrow}
          </span>
          <h2 className="np-section-title" data-animate="rise" style={{ '--np-stagger': 1 }}>
            {copy.title}
          </h2>
          <div className="np-about-body" data-animate="rise" style={{ '--np-stagger': 2 }}>
            <p className="np-lead">{copy.lead}</p>
            {copy.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
            <p className="np-about-wish">{copy.wish}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
