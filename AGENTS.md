# For AI assistants

You're being asked to work in a scrollytelling template. Before generating new pages, sections, or blocks, **read `design.md` in full**. It is the source of truth for:

- Design tokens (colors, type, spacing, layout)
- The block catalog — every block's anatomy, when to use it, and the rules
- The scroll-fade engine contract (so new blocks plug in without JS changes)
- Composition rules — how to sequence blocks into a coherent story
- Voice and tone
- How to add a new block type

## Quick orientation

- `index.html` — kitchen-sink demo using every block, with lorem ipsum copy
- `style.css` — all styles. `:root` holds the tokens.
- `script.js` — scroll-fade engine + the sticky people-scrolly interactive
- `blocks/` — one HTML snippet per block, copy-pasteable
- `assets/` — generic figure SVGs used by the scrollytell demo

## When generating new content

1. Reuse existing blocks by copying snippets from `blocks/` rather than inventing markup.
2. If a new block type is genuinely needed, follow `design.md` § 9 (Adding a new block). Use existing tokens; don't introduce new colors, type sizes, or padding values.
3. Preserve the lorem-ipsum + bracketed-editorial-note pattern for placeholder copy. `[Bracketed editorial note -- ...]` reminds the writer what's missing.
4. Always include `data-scroll="fade-up"` (or `"fade"`) on new section elements so they participate in the scroll-fade engine.
5. Respect `prefers-reduced-motion` for any new animations or interactions.

## What not to do

- Don't add a build step (Vite, webpack, etc.) — vanilla HTML/CSS/JS is a feature.
- Don't introduce a second accent color. The single-accent constraint is load-bearing.
- Don't add drop shadows, gradients on text, or glow effects. The visual language is restrained.
- Don't replace serif body type with sans, or vice versa — each font has a role (see design.md § 2).
- Don't write placeholder text in the actual brand voice ("This is groundbreaking work…"). Use lorem ipsum.
