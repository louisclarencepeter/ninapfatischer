// Injects the server-rendered page into dist/index.html so visitors see
// content before the JS bundle loads. Runs as the last step of `npm run
// build`; src/main.jsx hydrates the markup at runtime.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const file = resolve(root, 'dist/index.html')
const html = readFileSync(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('Could not find the empty #root marker in dist/index.html')
}
writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Prerendered dist/index.html')
