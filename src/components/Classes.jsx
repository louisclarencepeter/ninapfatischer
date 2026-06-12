const CLASSES = [
  {
    title: 'Vinyasa Flow',
    desc: 'Dynamic, powerful sequences that link breath to movement — building heat, strength, and a steady, flowing focus.',
    tags: ['75 min', 'Dynamic'],
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
    title: 'Hatha Yoga',
    desc: 'Inner peace and stability through mindful alignment and conscious breathing. Slower, deliberate, deeply grounding.',
    tags: ['60 min', 'Foundational'],
    tint: 'np-tint-sage',
    icon: (
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    title: 'Yin Yoga',
    desc: 'Calm and gentle, with long-held poses, philosophy, and meditation. A quiet space to soften and let go.',
    tags: ['75 min', 'Gentle'],
    tint: 'np-tint-ochre',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Meditation & Long Stretches',
    desc: 'Guided stillness, long held stretches, and conscious breath — settling the mind and returning to gratitude.',
    tags: ['30 min', 'Stillness'],
    tint: 'np-tint-sage',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.9 15.5 8.5 14l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9 9.9 3.8a.5.5 0 0 1 1 0l1.6 6.1 6.1 1.5a.5.5 0 0 1 0 1L12.5 14l-1.6 6.1a.5.5 0 0 1-1 0z" />
        <path d="M19 4v3M20.5 5.5h-3" />
      </svg>
    ),
  },
]

export default function Classes() {
  return (
    <section id="classes" className="np-classes">
      <div className="np-container">
        <header className="np-classes-header">
          <span className="np-section-eyebrow">The Practice</span>
          <h2 className="np-section-title">Find the class that meets you today</h2>
          <p className="np-classes-intro">
            Every session balances movement and stillness. Come exactly as you are &mdash; each
            practice is designed flexibly to fit the day.
          </p>
        </header>
        <div className="np-class-grid">
          {CLASSES.map((c) => (
            <article key={c.title} className="np-class-card">
              <span aria-hidden="true" className={`np-class-icon ${c.tint}`}>
                {c.icon}
              </span>
              <h3 className="np-class-title">{c.title}</h3>
              <p className="np-class-desc">{c.desc}</p>
              <div className="np-class-tags">
                {c.tags.map((t) => (
                  <span key={t} className={`np-tag ${c.tint}`}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
