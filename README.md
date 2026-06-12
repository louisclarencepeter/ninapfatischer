# Nina Pfatischer Yoga — ninapfatischer.com

Single-page personal site for yoga teacher Nina Pfatischer, implemented from the
Claude Design handoff bundle ("Nina Pfatischer Yoga — Design System",
`templates/website/Website.dc.html`).

Warm, earthy, serene: sand/cream surfaces, clay and sage accents, golden-hour
photography, Cormorant Garamond headings and Nunito Sans body text.

## Stack

- **React 18 + Vite**, prerendered to static HTML at build time
  (`scripts/prerender.mjs`) and hydrated on load — no backend.
- **Netlify Functions** — `netlify/functions/contact.mjs` handles the contact
  form at `POST /api/contact` (validation, honeypot, best-effort rate limit).
- Design tokens from the design system live in `src/styles/tokens/` and are
  consumed everywhere as CSS custom properties. Fonts are **self-hosted** in
  `public/fonts/` (GDPR — no requests to Google).

## Sections

| Component | Section |
|---|---|
| `Nav.jsx` | Fixed nav — transparent over hero, frosted once scrolled, mobile menu under 860px |
| `Hero.jsx` | Full-bleed garden portrait, "Come back to yourself" |
| `About.jsx` | Nina's story — knee injury, five surgeries, training in Portugal, teaching in Morocco & Germany |
| `Classes.jsx` | Vinyasa Flow, Hatha, Yin, Meditation & Long Stretches |
| `Music.jsx` | Full-bleed golden-hour interlude on the role of music |
| `Gallery.jsx` | "Moments" photo gallery — shuffled on every load, with a lightbox |
| `Contact.jsx` | Booking/contact form → Netlify Function, calm confirmation state |
| `Footer.jsx` | Charcoal-brown close with wordmark, socials, and legal links |

Legal pages (`public/impressum.html`, `public/datenschutz.html`) are static
German-language pages. **Before launch:** fill in the highlighted address
placeholders in both files, and have the privacy policy reviewed.

## Develop

```sh
npm install
npx netlify dev   # site + the contact function at /api/contact
npm test          # contact-function tests (node:test)
```

`npm run dev` also works for pure UI work, but the contact form needs the
function, so prefer `netlify dev`.

## Images

Master photos live in `public/images/` (and `gallery/`); responsive JPEG/WebP
variants (`-w480`, `-w960`, …) are generated from them:

```sh
python3 scripts/generate-images.py   # requires Pillow
```

Re-run after adding or replacing a master photo, and update the width/height
in the component that uses it.

## Deploy (Netlify)

Connect the repo; `netlify.toml` sets the build (`npm run build` → `dist`),
the functions directory, security headers, and caching. CI
(`.github/workflows/ci.yml`) runs tests and the build on every PR.

Form submissions are emailed via [Resend](https://resend.com) to
**nina@ninapfatischer.com**. Setup:

1. Verify the `ninapfatischer.com` domain in the Resend dashboard (required to
   send from `nina@ninapfatischer.com`).
2. Set `RESEND_API_KEY` in the Netlify environment variables.

Without the API key, submissions are logged in the function logs and the form
still succeeds. Optional overrides: `CONTACT_TO_EMAIL` (recipient) and
`CONTACT_FROM_EMAIL` (sender).

## Still open

- **Bilingual site (confirmed requirement):** the page must be available in
  **German and English**. Planned approach: a language switcher in the nav,
  copy extracted into per-language dictionaries (`de`/`en`), `lang` attribute
  and `hreflang` annotations per language, with German likely the default
  for the audience. The legal pages already exist in German.
- Real Instagram/YouTube profile URLs (`SOCIALS` in `Footer.jsx` — hidden
  until provided).
- Address placeholders in `impressum.html` / `datenschutz.html`.
- Licensed brand fonts, if any, to replace the Google Fonts substitutes.
