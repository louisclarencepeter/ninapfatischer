import { useEffect, useState } from 'react'
import {
  getCookiePreference,
  setCookiePreference,
  trackPageView,
} from '../utils/googleAnalytics.js'

export default function CookieConsent({ copy }) {
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

  const handleChoice = (choice) => {
    setCookiePreference(choice)
    setVisible(false)

    if (choice === 'accepted') {
      trackPageView()
    }
  }

  if (!visible) return null

  return (
    <aside className="np-cookie-consent" aria-label={copy.label}>
      <p>
        <strong>{copy.title}</strong>
        <span>{copy.text}</span>
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
  )
}
