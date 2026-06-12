const WIDTHS = [640, 1024, 1600, 2000]
const jpg = WIDTHS.map((w) => `/images/tree-pose-mountains${w === 2000 ? '' : `-w${w}`}.jpg ${w}w`).join(', ')
const webp = WIDTHS.map((w) => `/images/tree-pose-mountains-w${w}.webp ${w}w`).join(', ')
const SIZES = '(max-width: 860px) 92vw, 40vw'

export default function About() {
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
                alt="Nina balancing in tree pose before soft, misty mountains"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="np-floatstat">
            <div className="np-floatstat-num">5</div>
            <div className="np-floatstat-label">
              surgeries, and one long road back to my own strength
            </div>
          </div>
        </div>
        <div>
          <span className="np-section-eyebrow">My Story</span>
          <h2 className="np-section-title">Yoga gave me back my ground</h2>
          <div className="np-about-body">
            <p className="np-lead">
              For me, yoga is so much more than movement. After a serious knee injury, five
              surgeries, and a long recovery, it helped me find stability, strength, and inner
              peace again &mdash; both physically and mentally.
            </p>
            <p>
              I trained in Portugal and have had the joy of teaching in studios in Morocco and
              Germany. My classes balance movement and stillness, strength and relaxation &mdash;
              shaped flexibly to fit the day. Each one is an invitation back to mindfulness,
              serenity, and gratitude.
            </p>
            <p className="np-about-wish">
              My wish is simple: that you leave lighter, more grounded, and more connected to
              yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
