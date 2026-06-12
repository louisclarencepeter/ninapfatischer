const WIDTHS = [640, 1024, 1600, 2000]
const jpg = WIDTHS.map((w) => `/images/tree-pose-mountains${w === 2000 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/tree-pose-mountains-w${w}.webp ${w}w`).join(', ')
const SIZES = '(max-width: 860px) 92vw, 40vw'

export default function About({ copy }) {
  return (
    <section id="about" className="np-about">
      <div className="np-container np-split">
        <div className="np-about-media">
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
          <div className="np-floatstat">
            <div className="np-floatstat-num">5</div>
            <div className="np-floatstat-label">{copy.stat}</div>
          </div>
        </div>
        <div>
          <span className="np-section-eyebrow">{copy.eyebrow}</span>
          <h2 className="np-section-title">{copy.title}</h2>
          <div className="np-about-body">
            <p className="np-lead">{copy.lead}</p>
            <p>{copy.body}</p>
            <p className="np-about-wish">{copy.wish}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
