import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { languageFromPath } from './i18n.js'
import './styles/index.css'

const container = document.getElementById('root')
const language = languageFromPath(window.location.pathname)
const app = (
  <React.StrictMode>
    <App language={language} />
  </React.StrictMode>
)

// Production builds are prerendered (scripts/prerender.mjs), so the HTML
// already contains the page — hydrate it. In dev the root is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
