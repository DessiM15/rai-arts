# Rai Arts

Marketing site for **Rai Arts** — career readiness for dancers.
_Your Art. Your Business._

Next.js 16 (App Router) · React 19 · Tailwind v4 · Lenis · deployed on Netlify.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## Things to hand off

Four spots need real values before or shortly after launch. Everything else works today.

| What | Where | Notes |
| --- | --- | --- |
| **Stripe buy link** | `src/lib/content.ts` → `GUIDE.stripeLink` | Paste a Stripe Payment Link and the Shop button goes live automatically. Empty string = "Checkout opening soon" with an email fallback. No API keys, no backend. |
| **Podcast + Substack URLs** | `src/lib/content.ts` → `LEARN` | Currently point at youtube.com / substack.com placeholders. |
| **Online workshop copy** | `src/lib/content.ts` → `ONLINE_DRAFT` | Written in brand voice as a stand-in; waiting on Kira's real offering. |
| **Founder bio** | `src/app/founders/page.tsx` | Paragraphs marked `DRAFT` — written in brand voice, needs her own words. |

Search the repo for `DRAFT` and `TODO` to find them all.

**Domain:** `SITE.url` in `src/lib/site.ts` is set to `https://raiarts.com`. Canonicals,
the sitemap, OG tags, and JSON-LD all read from it. Point the domain at the Netlify
deploy and this is already correct — until then those URLs reference a domain that
isn't live yet.

---

## Structure

```
src/
  app/                  one folder per route, each with its own metadata
    layout.tsx          nav, footer, opening sequence, Organization JSON-LD
    sitemap.ts          generated sitemap.xml
    robots.ts           generated robots.txt
    opengraph-image.tsx social card, drawn from the vector dancer
  components/
    Marks.tsx           Wordmark + Dancer (pure vector, currentColor)
    Opening.tsx         title sequence — once per session, skippable
    LineWalk.tsx        the scroll spine: she walks the path
    DancerStage.tsx     hero panel, she draws herself in place
    Reveal.tsx          Lines / Words / Rise / Label reveal primitives
    Nav.tsx             sticky nav, Workshops dropdown, mobile sheet
    ContactForm.tsx     Netlify Forms
    WaitlistForm.tsx    Netlify Forms
  lib/
    brand.ts            the vector paths (see below)
    content.ts          all site copy
    site.ts             nav + site constants
```

---

## The logo

The supplied logo files shipped the dancer as a **base64 PNG wrapped in an SVG** —
it could not scale cleanly and could not animate. She has been re-traced from that
bitmap into **one continuous path** (99.7% centreline coverage), which is what lets
her draw herself on screen.

The `RAI ARTS` letterforms in `brand.ts` are the genuine vector outlines lifted from
the original file, so the wordmark stays pixel-exact to the identity.

Clean vector files for general use — decks, print, socials — are in `public/brand/`:

- `rai-arts-lockup.svg` — wordmark + dancer
- `rai-arts-wordmark.svg` — type only
- `rai-arts-dancer.svg` — the mark alone

---

## Notes for whoever works on this next

**Reveals never hide content from a crawler or a broken browser.** Every hidden
state is gated behind a `.js` class set by an inline script in `<head>`. Without
JavaScript the server HTML renders as plain, complete text. Don't add
`opacity: 0` to a component without that gate.

**`public/__forms.html` is load-bearing.** Netlify only discovers forms by parsing
static HTML at build time, and this site is server-rendered, so the form shapes are
declared there and the live React forms POST back to it. Deleting it silently
breaks both forms.

**Lenis owns smooth scrolling**, so `scroll-behavior: smooth` is deliberately absent
from CSS — Next 16 no longer neutralises it during navigation and the two would
fight. Lenis is skipped on touch devices and under reduced motion.

**`LineWalk` measures in real pixels** (1 SVG unit = 1 CSS pixel) and rebuilds on
resize. An earlier version stretched a `100×100` viewBox across the section, which
distorted the dash pattern and broke the line into disconnected arcs.

**Accessibility floor:** every interactive target is ≥44px, all text clears WCAG AA
(the gold and grey tokens were darkened specifically to get there), one `h1` per
page, no heading-level jumps, and everything animated has a reduced-motion path.
