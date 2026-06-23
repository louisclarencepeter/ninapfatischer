#!/usr/bin/env python3
"""Generate responsive image variants (JPEG + WebP) for the site.

Masters live in public/images/ (full-bleed photos) and
public/images/gallery/ (gallery thumbs). For each master this writes
<name>-w<width>.jpg and <name>-w<width>.webp next to it, plus a WebP at
the master's own width. Components reference these via srcset.

Run from the repo root after adding or replacing a master photo:
    python3 scripts/generate-images.py
"""

import json
import re
from pathlib import Path

from PIL import Image

# Matches generated derivatives like "name-w480"; used to skip them when
# scanning for masters. A plain `'-w' in stem` check is too loose — it also
# matches masters whose name happens to contain "-w" (e.g. "ocean-wave").
DERIVATIVE_RE = re.compile(r'-w\d+$')

JPEG_QUALITY = 78
WEBP_QUALITY = 78

HERO_WIDTHS = {
    'portrait-garden': [640, 960, 1440],
    'tree-pose-mountains': [640, 1024, 1600],
    'wildthing-clay': [768, 1280, 1920],
}
GALLERY_WIDTHS = [480, 960]

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'


def variants(master: Path, widths: list[int]) -> dict:
    img = Image.open(master).convert('RGB')
    w, h = img.size
    stem, parent = master.stem, master.parent
    for target in widths:
        if target >= w:
            continue
        resized = img.resize((target, round(h * target / w)), Image.LANCZOS)
        resized.save(parent / f'{stem}-w{target}.jpg', quality=JPEG_QUALITY, optimize=True)
        resized.save(parent / f'{stem}-w{target}.webp', quality=WEBP_QUALITY, method=6)
    img.save(parent / f'{stem}-w{w}.webp', quality=WEBP_QUALITY, method=6)
    return {'width': w, 'height': h}


def main() -> None:
    dims = {}
    for stem, widths in HERO_WIDTHS.items():
        dims[stem] = variants(ROOT / f'{stem}.jpg', widths)
    for master in sorted((ROOT / 'gallery').glob('*.jpg')):
        if DERIVATIVE_RE.search(master.stem):
            continue
        dims[f'gallery/{master.stem}'] = variants(master, GALLERY_WIDTHS)
    print(json.dumps(dims, indent=2))


if __name__ == '__main__':
    main()
