const CLASS_META = [
  {
    tint: 'np-tint-clay',
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
    ),
  },
  {
    tint: 'np-tint-sage',
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    tint: 'np-tint-ochre',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    tint: 'np-tint-sage',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.9 15.5 8.5 14l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9 9.9 3.8a.5.5 0 0 1 1 0l1.6 6.1 6.1 1.5a.5.5 0 0 1 0 1L12.5 14l-1.6 6.1a.5.5 0 0 1-1 0z" />
        <path d="M19 4v3M20.5 5.5h-3" />
      </svg>
    ),
  },
]

export default function Classes({ copy }) {
  return (
    <section id="classes" className="np-classes">
      <div className="np-container">
        <header className="np-classes-header" data-animate="rise">
          <span className="np-section-eyebrow">{copy.eyebrow}</span>
          <h2 className="np-section-title">{copy.title}</h2>
          <p className="np-classes-intro">{copy.intro}</p>
        </header>
        <div className="np-class-grid">
          {copy.items.map((c, index) => {
            const meta = CLASS_META[index]
            return (
            <article key={c.title} className="np-class-card" data-animate="rise" style={{ '--np-stagger': index }}>
              <span aria-hidden="true" className={`np-class-icon ${meta.tint}`}>
                {meta.icon}
              </span>
              <h3 className="np-class-title">{c.title}</h3>
              <p className="np-class-desc">{c.desc}</p>
              <div className="np-class-tags">
                {c.tags.map((t) => (
                  <span key={t} className={`np-tag ${meta.tint}`}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
