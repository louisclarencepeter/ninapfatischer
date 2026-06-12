const CACHE_NAME = 'nina-pfatischer-pwa-2026-06-12-v1'
const APP_SHELL = [
  '/',
  '/en/',
  '/manifest.webmanifest',
  '/theme.js',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
  '/fonts/cormorant-garamond.woff2',
  '/fonts/cormorant-garamond-italic.woff2',
  '/fonts/nunito-sans.woff2',
  '/images/portrait-garden-w1440.webp',
  '/images/tree-pose-mountains-w1024.webp',
  '/images/wildthing-clay-w1280.webp',
]

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(APP_SHELL)

  const html = await Promise.all(
    ['/', '/en/'].map(async (path) => {
      const response = await cache.match(path)
      return response ? response.text() : ''
    }),
  )

  const assets = new Set()
  for (const page of html) {
    for (const match of page.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = match[1]
      if (url.startsWith('/assets/')) assets.add(url)
    }
  }

  await Promise.all([...assets].map((asset) => cache.add(asset).catch(() => undefined)))
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME)
          return (
            (await cache.match(request)) ||
            (await cache.match(url.pathname.startsWith('/en') ? '/en/' : '/')) ||
            Response.error()
          )
        }),
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => cached)

      return cached || network
    }),
  )
})
