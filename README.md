# 287g-scrollytell-template

A modular HTML/CSS/JS template for building journalistic scrollytell stories. No build step. Drop it on any static host (GitHub Pages, Netlify, Vercel, S3) and edit the HTML.

Inspired by long-form data investigations in the *New York Times*, *Washington Post*, and *The Pudding*. Dark-theme by default, with a single accent color and a serif body face.

**Dependencies:** Google Fonts (Poppins + Source Serif Pro) and [scrollama](https://github.com/russellsamora/scrollama) (~3KB), both loaded from CDN. The block fade engine uses `IntersectionObserver` directly — no library.

## Quick start

```bash
# 1. Use this template (GitHub: "Use this template" button), or:
git clone https://github.com/clayludwig/287g-scrollytell-template.git my-story
cd my-story

# 2. Open in your browser — no build needed
open index.html

# 3. (Optional) Serve locally so fonts and assets load over http://
python3 -m http.server 8000
# then visit http://localhost:8000
```

Edit `index.html` to swap in your content. Blocks are modular — copy-paste any `<section>` from `blocks/` to assemble a new story.

## What's included

| File / Folder       | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `index.html`        | Demo page with every block in a typical sequence (lorem ipsum content). |
| `style.css`         | Design system: tokens in `:root`, then one section per block.           |
| `script.js`         | Scroll-fade engine + the sticky people-scrolly interactive.             |
| `blocks/`           | One copy-pasteable snippet per block, plus a catalog README.            |
| `assets/`           | Generic person SVGs used by the scrollytell demo. Replace freely.       |
| `design.md`         | Full design system documentation — read first before editing.           |
| `AGENTS.md`         | Brief for AI assistants working in this repo.                           |

## Block catalog

| Block               | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| Hero                | Full-viewport opening title card                         |
| Text                | Lede (with drop cap), nutgraph, body sections            |
| Stat                | A single striking number with one-sentence label         |
| Explainer cards     | 2–4 side-by-side definition cards                        |
| Image (full-bleed)  | Up-to-1200px-wide image with a captioned column          |
| Image (inline)      | Body-column-width image with caption                     |
| Chart               | Iframe / image / D3-mount slot for any visualization     |
| Pullquote           | Featured source quote with accent rule                   |
| Sticky scrollytell  | Sticky figure grid that highlights step-by-step on scroll|
| Footer              | Credits, methodology, sources                            |

See `blocks/README.md` for snippets and `design.md` for anatomy + rules.

## Customizing

- **Brand color.** Change `--accent` in `style.css` (it's the only accent in the system) and update the `fill="..."` inside SVGs in `assets/` to match.
- **Type.** Swap the Google Fonts `<link>` in `index.html` and the `--font-sans` / `--font-serif` tokens.
- **Add a new block.** Follow `design.md` § 9 — name a `.block-*` class, reuse existing tokens, add `data-scroll="fade-up"` for the entrance fade, and document it.

## Accessibility

- Respects `prefers-reduced-motion` (skips scroll-fade, stops the scroll-cue pulse).
- Stat overlays use `aria-live="polite"` so screen readers announce updates.
- Hero gradient ensures contrast even on busy background images.

## Credits

Designed and built by [Clay Ludwig](https://github.com/clayludwig) and Ela Jalil. Originally developed for a Capital News Service investigation at the University of Maryland Philip Merrill College of Journalism.

## License

MIT. See `LICENSE`.
