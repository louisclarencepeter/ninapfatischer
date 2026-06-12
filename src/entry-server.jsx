// Build-time prerender entry — see scripts/prerender.mjs.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(<App />)
}
