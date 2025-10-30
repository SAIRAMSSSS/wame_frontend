WAME Frontend — Fonts included / usage

This file documents the demo fonts used in the frontend sample and how to include them.

Fonts included (via Google Fonts import in `styles/globals.css`):
- Inter (body / UI)
- Poppins (headings)
- Montserrat (alternative headings)

How they are loaded:
- `styles/globals.css` imports the fonts using Google Fonts `@import` at the top of the file for a quick demo.

Usage examples (CSS classes provided):
- `.font-inter` — uses Inter
- `.font-poppins` — uses Poppins
- `.font-montserrat` — uses Montserrat

To self-host fonts (recommended for production):
1. Download woff2 files for the desired families (check Google Fonts or purchased sources).
2. Place them under `public/fonts/`.
3. Add `@font-face` rules to `styles/globals.css`.

Example @font-face (self-hosted):

```
@font-face {
  font-family: 'PoppinsVar';
  src: url('/fonts/Poppins-Regular.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
```

Notes:
- Using `font-display: swap` avoids invisible text while fonts load.
- For production, preload critical fonts using a <link rel="preload" as="font" href="/fonts/.." type="font/woff2" crossorigin>
