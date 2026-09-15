#!/usr/bin/env bash
# Deterministic web/icon exports of the supplied artwork. Requires ImageMagick.
set -euo pipefail
cd "$(dirname "$0")/.."
source_image=assets/branding/salty-shavasana-source.png
mkdir -p public/brand
magick "$source_image" -resize 768x -strip public/brand/salty-shavasana-logo-v1.png
for size in 180 192 512; do
  # Keep the complete logo inside the central maskable safe circle.
  width=$((size * 66 / 100))
  magick "$source_image" -resize "${width}x" -background '#3A332C' \
    -gravity center -extent "${size}x${size}" -alpha remove -strip \
    "public/brand/salty-shavasana-icon-${size}-v1.png"
done
magick "$source_image" -resize 58x -background '#3A332C' \
  -gravity center -extent 64x64 -alpha remove -strip \
  public/brand/salty-shavasana-favicon-v1.png
magick public/brand/salty-shavasana-favicon-v1.png -define icon:auto-resize=64,32,16 public/favicon.ico
cp public/brand/salty-shavasana-icon-180-v1.png public/apple-touch-icon.png
cp public/brand/salty-shavasana-icon-192-v1.png public/pwa-icon-192.png
cp public/brand/salty-shavasana-icon-512-v1.png public/pwa-icon-512.png
magick "$source_image" -resize 880x -background '#3A332C' \
  -gravity center -extent 1200x630 -alpha remove -strip \
  public/brand/salty-shavasana-share-v1.png
# Retain the legacy SVG URL with an embedded copy for old bookmarks.
node --input-type=module <<'JS'
import { readFileSync, writeFileSync } from 'node:fs'
const png = readFileSync('public/brand/salty-shavasana-favicon-v1.png').toString('base64')
writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${png}"/></svg>\n`)
JS
