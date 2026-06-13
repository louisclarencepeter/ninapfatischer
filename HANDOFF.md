# Handoff — ninapfatischer.com

_Last updated: 2026-06-13. State as of merged [PR #2](https://github.com/louisclarencepeter/ninapfatischer/pull/2) (branch `development` → `main`)._

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
- **Bilingual German + English**: German is the default root page (`/`),
  English is prerendered at `/en/`, with a DE/EN nav switcher, localized
  section copy, localized alt/ARIA/form text, language-specific canonical
  URLs, `hreflang`, `lang`, and JSON-LD metadata.
- **Light + dark themes**: visitors get the system-preferred theme on first
  load and can switch it from the nav; the choice is stored in `localStorage`
  (`np-theme`). `public/theme.js` applies the theme before hydration to avoid
  a flash.
- **PWA install support**: manifest, standalone display metadata, 192/512px
  app icons, and a small production service worker cache the app shell for
  repeat visits/offline fallback.
- **Contact form** → Netlify Function `POST /api/contact`
  ([netlify/functions/contact.mjs](netlify/functions/contact.mjs)):
  validation, honeypot, per-IP rate limit (5/10 min, best-effort), outbound
  Resend `/emails` delivery to `EMAIL_NOTIFICATION_TO`, plus optional customer
  confirmations. 10 passing tests in `tests/`.
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

## Action required before launch

1. **Address placeholders** in `public/impressum.html` and
   `public/datenschutz.html` (highlighted spans) — German law requires a
   complete Impressum. Have the Datenschutzerklärung reviewed.
2. **Receiving inbox for website leads — DONE (2026-06-13).**
   `EMAIL_NOTIFICATION_TO` is set to `ninapfatischer@gmail.com` and a live form
   test confirmed delivery (Resend status `Delivered`; see Production
   configuration status). The contact function uses Resend only for outbound
   sending via `/emails`; it does not use Resend Receiving as the business
   inbox. Resend's sending-domain records stay in place for `EMAIL_FROM`.
   `EMAIL_REPLY_TO` was also pointed at `ninapfatischer@gmail.com` (2026-06-13)
   so replies to the auto-confirmation email reach Nina instead of dead-ending
   in Resend inbound.
3. **Social links**: Instagram/YouTube are hidden (see `SOCIALS` in
   `src/components/Footer.jsx`) — add real profile URLs to show them.
4. **Final real-device QA**: verify DE/EN navigation, dark/light theme,
   section anchor alignment, gallery/lightbox, contact form, and PWA install
   on at least one iOS and one Android/desktop browser.

## Production configuration status

- **GitHub/Netlify**: PR #2 was merged to `main` on 2026-06-12. The Netlify
  project is `admirable-churros-e13680`, connected to
  `https://ninapfatischer.com` and this GitHub repo.
- **Email routing decision**: match the Trockenbau Prima Vista pattern. The
  site submits to the existing Netlify Function, and the function sends through
  Resend's outbound `POST /emails` API only. Do not use Resend Receiving as the
  inbox for `nina@ninapfatischer.com` unless a full inbound webhook/forwarder
  is intentionally implemented.
- **Receiving mailbox / MX**: `EMAIL_NOTIFICATION_TO` must point at a real
  mailbox that can receive email through normal MX hosting. If Nina wants
  `nina@ninapfatischer.com` to receive leads directly, configure that mailbox
  at a mail host and set the root-domain MX records to that host, not to Resend
  Receiving.
- **Netlify DNS zone**: `ninapfatischer.com` is managed in Netlify DNS; zone
  ID `6a2bc90e09fbba3ce7d26ad0`. Add the chosen mail provider's root-domain
  MX records here. The existing `send.ninapfatischer.com` records should stay
  in place for Resend sending/bounces.
- **Netlify env vars**: production uses `RESEND_API_KEY`, `EMAIL_FROM`,
  `EMAIL_REPLY_TO`, `EMAIL_NOTIFICATION_TO`, `EMAIL_NOTIFICATION_BCC`, and
  `EMAIL_CONFIRMATIONS_ENABLED`. `EMAIL_NOTIFICATION_TO` and `EMAIL_REPLY_TO`
  are both set to `ninapfatischer@gmail.com` (the latter as of 2026-06-13).
  The old `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` variables were removed in
  Netlify on 2026-06-12. `RESEND_API_KEY` must be available to
  Functions/runtime scope.
- **Resend API key**: key `ninapfatischer-contact` was created in Resend with
  Sending access and restricted to the `ninapfatischer.com` domain.
- **Latest production redeploy**: triggered 2026-06-13 after `EMAIL_REPLY_TO`
  was set to `ninapfatischer@gmail.com` (deploy `6a2d7637c967219463db711f`).
  The prior 2026-06-13 redeploy (for `EMAIL_NOTIFICATION_TO`) was
  `6a2d737bd242d75984531624`; the 2026-06-12 redeploy was
  `6a2c1c6b10e3c5171c97c52f`.
- **Latest contact-form test (2026-06-13, PASSED)**: after pointing
  `EMAIL_NOTIFICATION_TO` at `ninapfatischer@gmail.com` and redeploying, a live
  submission through `https://ninapfatischer.com/#contact` succeeded. Resend
  shows the internal notification to `ninapfatischer@gmail.com` (subject "New
  message from Louis Peter — Gmail routing test", reply-to the visitor) as
  `Delivered`, and the visitor auto-confirmation to
  `louisclarencepeters@gmail.com` as `Delivered`. Also removed
  `nina@ninapfatischer.com` from Resend's account-level suppression list
  (left over from the earlier bounced inbound experiments). Final human check:
  confirm the notification lands in Nina's Gmail inbox (not spam).
- **Email sender behavior**: the visitor's email is used as `reply_to`; the
  technical `from` address must remain a verified `ninapfatischer.com` sender
  because Resend cannot safely send from arbitrary visitor domains.

## Bilingual implementation notes

Implemented requirement (Louis, 2026-06-12): the site ships in **German and
English**. Copy lives in `src/i18n.js`; component structure/icons/images stay
local to their sections. `scripts/prerender.mjs` writes both
`dist/index.html` and `dist/en/index.html` from the same Vite build and
injects the language-specific metadata. If copy changes, run `npm run build`
and check both generated pages.

## Theme implementation notes

The base palette remains the warm cream/clay brand system. Dark mode is layered
through semantic tokens in `src/styles/tokens/colors.css` and shadow overrides
in `src/styles/tokens/spacing.css`; section/component styles should keep using
semantic tokens where possible. The nav theme toggle is intentionally stable
between SSR and hydration, with icon visibility handled in CSS.

## PWA implementation notes

Install metadata lives in `public/manifest.webmanifest`; the production-only
service worker registration is at the end of `src/main.jsx`, and the worker is
`public/sw.js`. If you change app-shell files or want returning installed apps
to refresh cached shell assets immediately, bump `CACHE_NAME` in `sw.js`.

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
