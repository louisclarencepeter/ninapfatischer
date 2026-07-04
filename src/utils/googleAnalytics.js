export const COOKIE_CONSENT_KEY = 'np-cookie-consent'

const GOOGLE_ANALYTICS_ID = 'G-ZKB4JPM2LK'
const GA_DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}`

// Bump when the consent scope materially changes (new tools, new purposes):
// stored choices with an older version are ignored, so the banner re-appears.
const CONSENT_VERSION = 1

let isInitialized = false

const canUseAnalytics = () =>
  Boolean(GOOGLE_ANALYTICS_ID) &&
  import.meta.env.PROD &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'

export function getCookiePreference() {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!raw) return ''
    // Legacy entries were bare strings before consent was versioned; the
    // consent scope is unchanged, so they stay valid.
    if (raw === 'accepted' || raw === 'necessary') return raw
    const parsed = JSON.parse(raw)
    if (parsed?.version !== CONSENT_VERSION) return ''
    return parsed.choice === 'accepted' || parsed.choice === 'necessary' ? parsed.choice : ''
  } catch {
    return ''
  }
}

export function setCookiePreference(choice) {
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ choice, timestamp: new Date().toISOString(), version: CONSENT_VERSION }),
    )
  } catch {
    // Storage may be unavailable (private mode); the choice still applies for this visit.
  }
}

// GA sets its cookies on the widest registrable domain, so expire every
// domain scope the browser could have used.
function deleteAnalyticsCookies() {
  const { hostname } = window.location
  const parts = hostname.split('.')
  const domains = ['', hostname, `.${hostname}`]
  for (let i = 1; i < parts.length - 1; i += 1) {
    domains.push(`.${parts.slice(i).join('.')}`)
  }
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0].trim()
    if (name !== '_ga' && !name.startsWith('_ga_')) return
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    })
  })
}

export function revokeAnalyticsConsent() {
  if (typeof window === 'undefined') return
  window[GA_DISABLE_KEY] = true
  if (typeof document !== 'undefined') deleteAnalyticsCookies()
}

export function hasAnalyticsConsent() {
  return getCookiePreference() === 'accepted'
}

export function initGoogleAnalytics() {
  if (!canUseAnalytics()) {
    return false
  }

  window[GA_DISABLE_KEY] = false
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`
    document.head.appendChild(script)
  }

  if (!isInitialized) {
    window.gtag('js', new Date())
    window.gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false })
    isInitialized = true
  }

  return true
}

export function trackPageView(pagePath = `${window.location.pathname}${window.location.search}`) {
  if (!hasAnalyticsConsent() || !initGoogleAnalytics()) {
    return
  }

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  })
}
