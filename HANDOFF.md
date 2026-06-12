# Handoff — ninapfatischer.com

_Last updated: 2026-06-12. State as of [PR #1](https://github.com/louisclarencepeter/ninapfatischer/pull/1) (branch `website-implementation`)._

## What this is

Single-page personal site for yoga teacher Nina Pfatischer, implemented from a
Claude Design handoff bundle ("Nina Pfatischer Yoga — Design System"). The
authoritative design source was `templates/website/Website.dc.html` in that
bundle (share link: `https://api.anthropic.com/v1/design/h/xlR7gta38ZtpvEyR7TwuHg`).
Original photos live untracked in `docs/` (29 source images).

## Current state

Everything below is implemented, tested, and on the PR branch:

- **React 18 + Vite**, prerendered to static HTML at build time
  (`src/entry-server.jsx` + `scripts/prerender.mjs`), hydrated on load.
- Sections: Nav (frost-on-scroll), Hero, About/story, Classes (4 cards),
  Music interlude, Gallery ("Moments", 12 photos, shuffled per visit,
  lightbox with focus trap), Contact form, Footer.
- **Contact form** → Netlify Function `POST /api/contact`
  ([netlify/functions/contact.mjs](netlify/functions/contact.mjs)):
  validation, honeypot, per-IP rate limit (5/10 min, best-effort), Resend
  email delivery to nina@ninapfatischer.com. 7 passing tests in `tests/`.
- **GDPR**: fonts self-hosted (`public/fonts/`, zero Google requests),
  German Impressum + Datenschutzerklärung (`public/*.html`), privacy note on
  the form, no cookies/tracking.
- **Performance**: JPEG+WebP `srcset` variants for every photo
  (regenerate with `python3 scripts/generate-images.py`), width/height
  attributes (no CLS), prerendered first paint, immutable caching for
  fonts/assets (see `netlify.toml`).
- **A11y**: WCAG AA contrast fixes (see `--text-accent` token and chip
  colors in `site.css`), live-region toast, focus management on the form
  confirmation and lightbox, reduced-motion respected.
- **SEO/meta**: canonical, OG/Twitter cards with absolute URLs, JSON-LD
  Person, favicon set, robots.txt.
- Security headers + CSP in `netlify.toml`. CI workflow in
  `.github/workflows/ci.yml` (`npm test` + `npm run build`).

## Run it

```sh
nvm use            # Node 20
npm install
npx netlify dev    # site + contact function at /api/contact
npm test           # contact-function tests
npm run build      # client build + SSR build + prerender into dist/
```

`npm run dev` works for UI-only (form will show its error state — no
function server).

## Action required before launch (cannot be done in code)

1. **Address placeholders** in `public/impressum.html` and
   `public/datenschutz.html` (highlighted spans) — German law requires a
   complete Impressum. Have the Datenschutzerklärung reviewed.
2. **Resend**: verify the `ninapfatischer.com` domain in Resend, set
   `RESEND_API_KEY` env var in Netlify. Until then submissions only land in
   the function logs (form still shows success).
3. **Social links**: Instagram/YouTube are hidden (see `SOCIALS` in
   `src/components/Footer.jsx`) — add real profile URLs to show them.
4. **Netlify**: connect the repo; `netlify.toml` handles the rest.

## Confirmed next feature: bilingual DE + EN

Confirmed requirement (Louis, 2026-06-12): the site must ship in **German
and English**. Not yet implemented. Planned approach: nav language
switcher, copy extracted to per-language dictionaries (`de`/`en`), `lang` +
`hreflang` per language, German likely the default. All copy currently
lives inline in `src/components/*.jsx` and `index.html` meta.

## Known quirks / gotchas

- **CI on the PR**: GitHub Actions didn't trigger on the PR pushes (zero
  runs despite valid YAML, Actions enabled, public repo). An empty commit
  was pushed to retrigger; if it still shows no runs, expect the workflow
  to register and run normally once the PR merges to `main` (the `push`
  trigger targets `main`). Verify after merge. `npm test` + `npm run build`
  pass locally either way.
- **Photo consent**: the original gallery included a studio-class photo
  with recognizable students; it was replaced (KunstUrhG §22). If Nina
  wants it back, get written consent from the people pictured first.
- **Image masters are not content-hashed**: `/images/*` is cached 30 days.
  If you replace a photo, keep the filename only if a stale month is
  acceptable — otherwise rename and update the component.
- **`fetchpriority`** on the hero img is lowercase for React 18; React 19
  renames it to `fetchPriority` (camelCase) — flip it if you upgrade.
- The design bundle in `/tmp` does not survive reboots — re-download from
  the share link above if you need to consult the original design.

## Key decisions (and why)

- **Prerender instead of SSG framework**: kept plain Vite + a 20-line
  prerender script rather than migrating to Astro/Next — smallest change
  that fixes blank-first-paint. The gallery renders a deterministic order
  server-side and reshuffles after hydration to avoid mismatches.
- **Music section photo**: the design's handstand photo is portrait; a
  full-bleed wide band could only show a sliver. Swapped to the landscape
  wild-thing shot, pre-cropped (right 20% trimmed) so Nina sits right of
  the overlay text at all widths.
- **Contrast tokens**: brand clay (#C17B5A) fails AA for small text, so
  small accent text uses `--text-accent` (#9C5536); buttons keep the
  original clay (3.15:1 passes large-text AA).
