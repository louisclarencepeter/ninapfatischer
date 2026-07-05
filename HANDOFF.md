# Handoff — ninapfatischer.com

_Last updated: 2026-07-04 (consent withdrawal, EN legal pages, contact-function hardening on `development`)._

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
- Sections: Nav (frost-on-scroll), Hero, About/story, Classes (7 cards),
  Music interlude, Gallery ("Moments", 12 photos, shuffled per visit,
  lightbox with focus trap), Retreat ("Salty Shavasana", Imsouane/Morocco),
  Contact form, Footer.
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
  validation, honeypot, per-IP rate limit (5/10 min, best-effort, 429 with
  `Retry-After`), outbound Resend `/emails` delivery to
  `EMAIL_NOTIFICATION_TO` with an 8s timeout, plus optional customer
  confirmations localized DE/EN (the form submits `lang`; the confirmation
  deliberately does not echo the visitor's message, so the endpoint cannot be
  used as a spam relay). 15 passing tests in `tests/`.
- **GDPR/privacy**: fonts self-hosted (`public/fonts/`, zero Google Fonts
  requests), Impressum + Datenschutzerklärung in German (`public/*.html`) and
  English (`public/en/*.html`, linked language-aware from footer/form), privacy
  note on the form, and consent-gated Google Analytics 4. Consent is stored
  versioned with a timestamp (`np-cookie-consent` JSON); the banner links to
  the Datenschutzerklärung and can be reopened via the footer
  "Cookie-Einstellungen" button — choosing "Nur notwendige" after a prior
  accept deletes the `_ga*` cookies and sets `ga-disable-G-ZKB4JPM2LK`.
- **Performance**: JPEG+WebP `srcset` variants for every photo
  (regenerate with `python3 scripts/generate-images.py`), width/height
  attributes (no CLS), prerendered first paint, immutable caching for
  fonts/assets (see `netlify.toml`). The service-worker cache name is
  stamped per build by `scripts/prerender.mjs` (placeholder
  `__BUILD_VERSION__` in `public/sw.js`), so each deploy evicts the previous
  cache; image precache entries tolerate individual failures.
- **A11y**: WCAG AA contrast fixes (see `--text-accent` token and chip
  colors in `site.css`), live-region toast, focus management on the form
  confirmation and lightbox, reduced-motion respected.
- **SEO/meta**: canonical, OG/Twitter cards with absolute URLs (dedicated
  1200×630 share image `public/images/og-share.jpg`, ~94 KB — regenerate from
  `portrait-garden.jpg` if the hero photo changes), JSON-LD Person with
  `sameAs` socials, per-language keyword titles, favicon set, robots.txt +
  sitemap.xml (both language URLs), branded 404 page.
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

1. **Receiving inbox for website leads**: production now uses
   `info@ninapfatischer.com` for `EMAIL_FROM`, `EMAIL_REPLY_TO`, and
   `EMAIL_NOTIFICATION_TO`. The live form send path passed on 2026-07-04;
   confirm the exact test marker below is visible in the actual `info@`
   mailbox outside spam.
2. **Search Console**: DONE 2026-07-05 — domain property
   `ninapfatischer.com` verified under `louisclarencepeters@gmail.com` via a
   DNS TXT record in Netlify DNS (record id `6a4a28425c851d06bbd98226`, zone
   `6a2bc90e09fbba3ce7d26ad0`; do not delete it or verification is lost).
   `sitemap.xml` submitted, status Success, 2 pages discovered. If ownership
   should move to `info@ninapfatischer.com` later, add it as an owner under
   Settings → Users and permissions.
3. **Final real-device QA**: verify DE/EN navigation, dark/light theme,
   section anchor alignment, gallery/lightbox, contact form, and PWA install
   on at least one iOS and one Android/desktop browser.
4. **Optional contact/brand polish**: add WhatsApp only if Nina wants it shown
   (`WHATSAPP_NUMBER` in `Footer.jsx`), and swap in licensed brand fonts only
   if provided.

## Production configuration status

- **GitHub/Netlify**: PR #2 was merged to `main` on 2026-06-12. The Netlify
  project is `admirable-churros-e13680`, connected to
  `https://ninapfatischer.com` and this GitHub repo.
- **Email routing decision**: match the Trockenbau Prima Vista pattern. The
  site submits to the existing Netlify Function, and the function sends through
  Resend's outbound `POST /emails` API only. Do not use Resend Receiving as the
  inbox for `nina@ninapfatischer.com` unless a full inbound webhook/forwarder
  is intentionally implemented.
- **Receiving mailbox / MX**: `EMAIL_NOTIFICATION_TO` now targets
  `info@ninapfatischer.com`, which must be a real mailbox that can receive
  email through normal MX hosting. Keep root-domain MX records pointed at the
  chosen mail host, not at Resend Receiving.
- **Netlify DNS zone**: `ninapfatischer.com` is managed in Netlify DNS; zone
  ID `6a2bc90e09fbba3ce7d26ad0`. Add the chosen mail provider's root-domain
  MX records here. The existing `send.ninapfatischer.com` records should stay
  in place for Resend sending/bounces.
- **Netlify env vars**: production uses `RESEND_API_KEY`, `EMAIL_FROM`,
  `EMAIL_REPLY_TO`, `EMAIL_NOTIFICATION_TO`, `EMAIL_NOTIFICATION_BCC`, and
  `EMAIL_CONFIRMATIONS_ENABLED`. As of 2026-07-03, `EMAIL_FROM`,
  `EMAIL_REPLY_TO`, and `EMAIL_NOTIFICATION_TO` are set to
  `info@ninapfatischer.com` in Netlify and were picked up by the 2026-07-03
  production redeploy. The old `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`
  variables were removed in Netlify on 2026-06-12. `RESEND_API_KEY` must be
  available to Functions/runtime scope.
- **Resend API key**: key `ninapfatischer-contact` was created in Resend with
  Sending access and restricted to the `ninapfatischer.com` domain.
- **Latest production redeploy**: triggered 2026-07-03 after switching the
  public/contact mailbox to `info@ninapfatischer.com` (deploy
  `6a4823b17c5c2f5c0f6d8df9`; unique URL
  `https://6a4823b17c5c2f5c0f6d8df9--ninayoga.netlify.app`).
- **Latest live smoke (2026-07-03, PASSED)**: `https://ninapfatischer.com`,
  `/en/`, `/impressum.html`, and `/datenschutz.html` all returned the new
  public `info@ninapfatischer.com` contact address. Browser automation
  confirmed Google Analytics stays unloaded before consent, then loads after
  clicking "Akzeptieren" (`np-cookie-consent=accepted`, GA4 ID
  `G-ZKB4JPM2LK`, `page_view` POST returned `204`).
- **Latest contact-form send-path test (2026-07-04, PASSED)**: a production
  `POST https://ninapfatischer.com/api/contact` with practice marker
  `2026-07-04 Codex info inbox routing test 220029` returned `{"ok":true}`
  and HTTP 200. Because the function returns success only after the internal
  notification send succeeds, this verifies the deployed function accepted and
  sent the lead notification to configured `EMAIL_NOTIFICATION_TO`
  (`info@ninapfatischer.com`). The customer confirmation from
  `Nina Pfatischer Yoga <info@ninapfatischer.com>` reached the connected Gmail
  inbox at `louisclarencepeters@gmail.com` with the same marker. The connected
  Gmail account did not contain a `to:info@ninapfatischer.com` copy, so the
  remaining human check is to open the real `info@` mailbox and confirm that
  exact marker is in Inbox, not Spam.
- **Previous contact-form test (2026-06-13, PASSED)**: after pointing
  `EMAIL_NOTIFICATION_TO` at `ninapfatischer@gmail.com` and redeploying, a live
  submission through `https://ninapfatischer.com/#contact` succeeded. Resend
  shows the internal notification to `ninapfatischer@gmail.com` (subject "New
  message from Louis Peter — Gmail routing test", reply-to the visitor) as
  `Delivered`, and the visitor auto-confirmation to
  `louisclarencepeters@gmail.com` as `Delivered`. Also removed
  `nina@ninapfatischer.com` from Resend's account-level suppression list
  (left over from the earlier bounced inbound experiments).
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

- **CI scope**: the early "Actions didn't trigger on PR pushes" quirk resolved
  itself once the workflow registered on `main` (2026-06-23; runs appear for
  both `pull_request` and `main` pushes since). Note the `push` trigger still
  targets `main` only, so direct pushes to `development` get no CI until a PR
  is opened.
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
