# Blocks

Each file in this directory is a standalone, copy-pasteable HTML snippet for one section of a scrollytell story. They all assume `style.css` and `script.js` are loaded on the page.

## Catalog

| File                          | Block               | When to use                                             |
| ----------------------------- | ------------------- | ------------------------------------------------------- |
| `00-hero.html`                | Hero                | Opening title card. One per story.                      |
| `01-text.html`                | Text                | Lede, nutgraph, body sections. Most common block.       |
| `02-stat.html`                | Big number / stat   | A single striking data point. Use 1–2x per story.       |
| `03-explainer-cards.html`     | Explainer cards     | Defining 2–4 key terms side-by-side.                    |
| `04-image-full.html`          | Image (full-bleed)  | Scene-setter photos, large illustrations.               |
| `05-image-inline.html`        | Image (inline)      | Supporting evidence images at body-text width.          |
| `06-chart.html`               | Chart               | Datawrapper / Flourish iframe, image, or D3 mount.      |
| `07-pullquote.html`           | Pullquote           | Featured source quote. Use sparingly.                   |
| `08-scrolly-people.html`      | Sticky scrollytell  | Part-of-whole interactive ("X of N") with figure grid.  |
| `09-footer.html`              | Footer              | Credits, methodology, sourcing. One per story.          |

## Composition

A typical story sequence:

1. Hero
2. Text (lede with drop cap)
3. Text (nutgraph)
4. Stat **or** scrolly-people
5. Explainer cards
6. Text → Image (full) → Text
7. Stat → Chart → Text → Chart
8. Pullquote
9. Text (closing)
10. Footer

Rhythm matters: alternate text blocks with visual blocks so the page never reads as a wall of prose or a wall of charts.

See `../design.md` for the full block anatomy, design tokens, voice, and extension guidance.
