# Nina Pfatischer Yoga — ninapfatischer.com

Single-page personal site for yoga teacher Nina Pfatischer, implemented from the
Claude Design handoff bundle ("Nina Pfatischer Yoga — Design System",
`templates/website/Website.dc.html`).

Warm, earthy, serene: sand/cream surfaces, clay and sage accents, golden-hour
photography, Cormorant Garamond headings and Nunito Sans body text.

## Stack

- **React 18 + Vite** — no backend; the site is fully static.
- **Netlify Functions** — `netlify/functions/contact.mjs` handles the contact
  form at `POST /api/contact`.
- Design tokens from the design system live in `src/styles/tokens/` and are
  consumed everywhere as CSS custom properties.

## Sections

| Component | Section |
|---|---|
| `Nav.jsx` | Fixed nav — transparent over the hero, frosted once scrolled, mobile menu under 860px |
| `Hero.jsx` | Full-bleed garden portrait, "Come back to yourself" |
| `About.jsx` | Nina's story — knee injury, five surgeries, training in Portugal, teaching in Morocco & Germany |
| `Classes.jsx` | Vinyasa Flow, Hatha, Yin, Meditation & Long Stretches |
| `Music.jsx` | Full-bleed golden-hour interlude on the role of music |
| `Gallery.jsx` | "Moments" photo gallery — shuffled on every load, with a lightbox |
| `Contact.jsx` | Booking/contact form → Netlify Function, calm confirmation state |
| `Footer.jsx` | Charcoal-brown close with wordmark and socials |

## Develop

```sh
npm install
npx netlify dev   # site + the contact function at /api/contact
```

`npm run dev` also works for pure UI work, but the contact form needs the
function, so prefer `netlify dev`.

## Deploy (Netlify)

Connect the repo; `netlify.toml` already sets the build (`npm run build` →
`dist`) and the functions directory.

Form submissions are emailed via [Resend](https://resend.com) to
**nina@ninapfatischer.com**. Setup:

1. Verify the `ninapfatischer.com` domain in the Resend dashboard (required to
   send from `nina@ninapfatischer.com`).
2. Set `RESEND_API_KEY` in the Netlify environment variables.

Without the API key, submissions are logged in the function logs and the form
still succeeds. Optional overrides: `CONTACT_TO_EMAIL` (recipient) and
`CONTACT_FROM_EMAIL` (sender).
