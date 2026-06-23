// Injects the server-rendered page into dist/index.html so visitors see
// content before the JS bundle loads. Runs as the last step of `npm run
// build`; src/main.jsx hydrates the markup at runtime.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const { absoluteUrlForLanguage, copy } = await import(resolve(root, 'src/i18n.js'))

const file = resolve(root, 'dist/index.html')
const html = readFileSync(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('Could not find the empty #root marker in dist/index.html')
}

const escapeAttr = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const replaceMeta = (source, key, value) =>
  source.replace(
    new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*("\\s*/?>)`),
    `$1${escapeAttr(value)}$2`,
  )

const replaceLink = (source, rel, value) =>
  source.replace(
    new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*("\\s*/?>)`),
    `$1${escapeAttr(value)}$2`,
  )

function withMetadata(source, lang) {
  const t = copy[lang]
  const url = absoluteUrlForLanguage(lang)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nina Pfatischer',
    jobTitle: t.meta.jobTitle,
    url,
    email: 'mailto:nina@ninapfatischer.com',
    image: 'https://ninapfatischer.com/images/portrait-garden.jpg',
    knowsAbout: ['Vinyasa Yoga', 'Yin Yoga', 'Animal Flow', 'Pranayama', 'Meditation', 'Mobility Training', 'Yoga Retreats'],
    description: t.meta.schemaDescription,
    inLanguage: lang,
  }

  let page = source
    .replace(/<html lang="[^"]+">/, `<html lang="${lang}">`)
    .replace(/<title>.*<\/title>/, `<title>${escapeAttr(t.meta.title)}</title>`)
    .replace(/\n\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '')
    .replace(/\n\s*<meta property="og:locale" content="[^"]+" \/>/g, '')
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(schema, null, 8)}\n    </script>`,
    )

  page = replaceMeta(page, 'description', t.meta.description)
  page = replaceMeta(page, 'og:title', t.meta.title)
  page = replaceMeta(page, 'og:description', t.meta.ogDescription)
  page = replaceMeta(page, 'og:url', url)
  page = replaceMeta(page, 'twitter:title', t.meta.title)
  page = replaceMeta(page, 'twitter:description', t.meta.ogDescription)
  page = replaceLink(page, 'canonical', url)

  const alternates = [
    '<link rel="alternate" hreflang="de" href="https://ninapfatischer.com/" />',
    '<link rel="alternate" hreflang="en" href="https://ninapfatischer.com/en/" />',
    '<link rel="alternate" hreflang="x-default" href="https://ninapfatischer.com/" />',
    `<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_US'}" />`,
  ].join('\n    ')

  return page.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1\n    ${alternates}`)
}

const pages = [
  { lang: 'de', output: file },
  { lang: 'en', output: resolve(root, 'dist/en/index.html') },
]

for (const page of pages) {
  mkdirSync(dirname(page.output), { recursive: true })
  const rendered = withMetadata(html, page.lang).replace(
    marker,
    `<div id="root">${render(page.lang)}</div>`,
  )
  writeFileSync(page.output, rendered)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerendered dist/index.html and dist/en/index.html')
