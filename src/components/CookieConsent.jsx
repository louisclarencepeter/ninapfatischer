import { useEffect, useState } from 'react'
import {
  getCookiePreference,
  revokeAnalyticsConsent,
  setCookiePreference,
  trackPageView,
} from '../utils/googleAnalytics.js'

export default function CookieConsent({ copy, privacyHref, openRequest = 0 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const preference = getCookiePreference()

    if (preference === 'accepted') {
      trackPageView()
      return undefined
    }

    if (preference) return undefined

    const timer = window.setTimeout(() => setVisible(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  // Lets the footer's "cookie settings" link reopen the banner so consent
  // can be withdrawn as easily as it was given (Art. 7(3) GDPR).
  useEffect(() => {
    if (openRequest > 0) setVisible(true)
  }, [openRequest])

  const handleChoice = (choice) => {
    setVisible(false)
    setCookiePreference(choice)

    if (choice === 'accepted') {
      trackPageView()
    } else {
      revokeAnalyticsConsent()
    }
  }

  // The live region stays mounted even while the banner is hidden: screen
  // readers only announce content that appears inside an existing region
  // (same pattern as the toast in App.jsx).
  return (
    <div aria-live="polite">
      {visible && (
        <aside className="np-cookie-consent" aria-label={copy.label}>
          <p>
            <strong>{copy.title}</strong>
            <span>
              {copy.text} {copy.privacyPrefix} <a href={privacyHref}>{copy.privacyLink}</a>.
            </span>
          </p>
          <div className="np-cookie-actions">
            <button type="button" onClick={() => handleChoice('necessary')}>
              {copy.necessary}
            </button>
            <button type="button" className="np-cookie-accept" onClick={() => handleChoice('accepted')}>
              {copy.accept}
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}
