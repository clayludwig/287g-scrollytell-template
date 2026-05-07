# Design System — Scrollytell Template

This document describes the design system for this scrollytelling template so that an LLM (or a human) can generate new pages or sections that match the existing aesthetic.

**If you are an AI assistant being asked to add a new block or page, read this entire file before generating anything.** The block catalog and composition rules are the load-bearing parts.

Designed by Clay Ludwig and Ela Jalil.

---

## 1. Design philosophy

- **Journalistic, not promotional.** The visual language is closer to a New York Times investigation than a marketing landing page. Restrained color, plenty of negative space, prose that gets out of its own way.
- **Dark theme, single-track.** A near-black background (`#0a0a0a`), warm off-white body text, one accent color (orange `#faa916`). No gradients on text, no drop shadows on type, no glow effects.
- **The scroll IS the animation.** Blocks fade and lift slightly as they enter the viewport, but only as a function of scroll position — there are no time-based easing curves. If the reader scrolls slowly, the fade is slow. If they fling, it's fast. This keeps the page feeling responsive instead of choreographed.
- **Two type families, one job each.** Sans (Poppins) for UI/headings, serif (Source Serif Pro) for prose and stat labels. Never mix them within a single phrase.
- **One column for prose, a slightly wider column for visuals.** 680px for body text; 960px for charts and grids. Don't break these without a reason.
- **Cards-with-borders, not cards-with-shadows.** Surfaces are differentiated by 1px borders and small background tint shifts, not by elevation.

When in doubt, choose the more restrained option.

---

## 2. Design tokens

All tokens live in `:root` in `style.css`. Override there to rebrand.

### Surfaces (dark theme)

| Token            | Value      | Use                                          |
| ---------------- | ---------- | -------------------------------------------- |
| `--bg`           | `#0a0a0a`  | Page background                              |
| `--bg-elevated`  | `#141414`  | Image/chart placeholders, subtle elevations  |
| `--bg-card`      | `#1a1a1a`  | Card backgrounds                             |

### Text

| Token            | Value      | Use                                                 |
| ---------------- | ---------- | --------------------------------------------------- |
| `--text`         | `#e8e6e3`  | Body text, primary copy                             |
| `--text-muted`   | `#9a9a9a`  | Subheads, card body text, chart descriptions        |
| `--text-dim`     | `#6a6a6a`  | Captions, sources, footer prose, scroll cues        |
| `#fff`           | (literal)  | Headlines, H2s, `<strong>` inside stat labels       |

### Accents

| Token            | Value      | Use                                                                 |
| ---------------- | ---------- | ------------------------------------------------------------------- |
| `--accent`       | `#faa916`  | Big numbers, kickers, highlighted phrases, hover borders, rules     |
| `--accent-dim`   | rgba accent / 15% | Reserved for accent-tinted surfaces (rarely needed)          |
| `--blue`         | `#1979b9`  | Reserved — use only if you need a second category color in charts   |
| `--red`          | `#c71e1d`  | Reserved — use only for warnings or contrasting categories          |

### Lines

| Token            | Value      | Use                                                |
| ---------------- | ---------- | -------------------------------------------------- |
| `--border`       | `#2a2a2a`  | Card borders, footer top border, dashed placeholders |

### Layout

| Token            | Value      | Use                                          |
| ---------------- | ---------- | -------------------------------------------- |
| `--col-width`    | `680px`    | Body-text column width                       |
| `--col-wide`     | `960px`    | Charts, explainer-card grids                 |

### Type families

| Token            | Value                         | Use                                       |
| ---------------- | ----------------------------- | ----------------------------------------- |
| `--font-sans`    | Poppins → system fallback     | UI, headings, kickers, captions, sources  |
| `--font-serif`   | Source Serif Pro → serif      | Body prose, stat labels, pullquotes       |

### Theming guidance

- Want a different brand color? Change `--accent` and update the `fill="#faa916"` inside the SVGs in `assets/` to match.
- Want a light theme? You'll need to invert the surface and text scales. The structure of the system supports it; the included CSS doesn't ship one.
- Don't introduce a new accent color. The single-accent constraint is what makes the page look intentional.

---

## 3. Type scale

| Element                    | Family   | Size                          | Weight | Color           |
| -------------------------- | -------- | ----------------------------- | ------ | --------------- |
| `.hero-headline`           | sans     | `clamp(2.4rem, 6vw, 4.2rem)`  | 700    | `#fff`          |
| `.hero-subhead`            | serif    | `clamp(1rem, 2.2vw, 1.25rem)` | 400    | `--text-muted`  |
| `.hero-kicker`             | sans     | 0.72rem, uppercase, tracked   | 600    | `--accent`      |
| `.section-heading` (H2)    | sans     | `clamp(1.3rem, 3vw, 1.6rem)`  | 700    | `#fff`          |
| `.section-subheading`      | serif    | 1.15rem                       | 400    | `--text-muted`  |
| `.text-inner p` (body)     | serif    | 1.25em                        | 400    | `--text`        |
| `.text-dropcap::first-letter` | serif | 4.2rem                        | 700    | `#fff`          |
| `.stat-number`             | sans     | `clamp(3rem, 8vw, 5.5rem)`    | 700    | `--accent`      |
| `.stat-label`              | serif    | 1.15rem                       | 400    | `--text`        |
| `.stat-source`             | sans     | 0.65rem, tracked              | 400    | `--text-dim`    |
| `.card h3`                 | sans     | 1rem                          | 600    | `#fff`          |
| `.card p`                  | serif    | 0.95rem                       | 400    | `--text-muted`  |
| `.pullquote-inner blockquote p` | serif | `clamp(1.15rem, 2.5vw, 1.4rem)` italic | 400 | `#fff` |
| `.pullquote-inner cite`    | sans     | 0.78rem                       | 400    | `--text-muted`  |
| `.image-caption p`         | sans     | 0.875rem                      | 400    | `--text-dim`    |
| `.chart-description`       | serif    | 1.1rem                        | 400    | `--text-muted`  |
| `.chart-source`, `.chart-note` | sans | 0.65rem                       | 400    | `--text-dim`    |
| `.footer-section h3`       | sans     | 0.72rem, uppercase, tracked   | 600    | `--text-muted`  |
| `.footer-section p`        | serif    | 0.82rem                       | 400    | `--text-dim`    |

### Type rules

- **Body line-height is always 150%.** Don't override.
- **Letter-spacing only on UI text** (kickers, sources, footer headings, copyright). All-caps short labels get `0.1em`–`0.15em` tracking; lowercase labels get `0.04em`.
- **Drop cap appears on the lede only.** Never on subsequent paragraphs.
- **Em dashes** (—) are written as `--` in HTML and rendered with the surrounding default font. Don't restyle them.

---

## 4. Spacing and rhythm

Block padding is intentionally generous — readers should feel air between sections.

| Block                  | Vertical padding (desktop) | Vertical padding (mobile)  |
| ---------------------- | -------------------------- | -------------------------- |
| `.block-text`          | `6rem`                     | `4.5rem`                   |
| `.block-stat`          | `8rem`                     | `6rem`                     |
| `.block-explainer`     | `7rem`                     | `5rem`                     |
| `.block-image-full`    | `5rem`                     | `5rem`                     |
| `.block-image-inline`  | `5rem`                     | `5rem`                     |
| `.block-chart`         | `6rem`                     | `4.5rem`                   |
| `.block-pullquote`     | `7rem`                     | `5rem`                     |
| `.block-footer`        | `5rem` top, `3rem` bottom  | same                       |

Horizontal padding is `1.5rem` desktop / `1.25rem` mobile (a few blocks use `1rem` mobile for charts).

When adding a new block, match these scales — don't introduce a new padding value unless you're solving a specific problem.

---

## 5. The scroll engine

Two systems handle scroll-driven behavior:

### 5.1 Block fade-in (IntersectionObserver)

`script.js` uses `IntersectionObserver` to add `.is-visible` to any element with `data-scroll` when it enters view. CSS handles the actual transition. **Adding a new block just means adding `data-scroll="fade-up"` (or `"fade"`) to the section — no JS changes required.**

**Contract:**

- `data-scroll="fade-up"` — fade in **and** translate 12px → 0px on entry.
- `data-scroll="fade"`   — fade in only (no translation).
- Trigger: when the element is ~5% inside the viewport (top edge is past 80% of viewport height).
- Cards inside `.card-grid` are staggered 80ms each via inline `transition-delay` set on page load.
- The fade is gated behind a `.js` class on `<html>` (added in the head before stylesheet evaluates), so no-JS readers see content immediately.

### 5.2 Sticky scrollytell (scrollama)

The sticky people-scrolly interactive uses [scrollama](https://github.com/russellsamora/scrollama), a thin IntersectionObserver wrapper (~3KB gzip). Each `.step` element fires `onStepEnter` when it crosses 50% of the viewport. The graphic state (figure highlights, stat counter) updates per step.

**Contract:**

- Each `.step` represents one beat of the interactive: one paragraph of narrative + one visual transition.
- The order of `.step` elements in DOM = the order of states.
- `data-step` attribute is informational; the index used by JS is the DOM order.
- If scrollama fails to load, the graphic falls back to its peak state (so the section is still readable, just not interactive).

### Reduced motion

Both systems read `prefers-reduced-motion`. Under reduce, `.is-visible` is added to all fade blocks immediately (no transition) and CSS pins everything visible as a belt-and-suspenders fallback. The scrollama interactive still works — IO callbacks are independent of motion preferences — but transitions on the figures are zeroed out, so state changes feel instant rather than animated. **Any new motion you add should respect this preference.**

---

## 6. Block catalog

For each block: when to use it, anatomy, and the rules that keep it on-brand.

### 6.1 Hero (`.block-hero`)

**Use:** Once at the top of the story. Never in the middle.

**Anatomy:**
- `.hero-overlay`     — gradient that darkens any background image toward the bottom for legibility
- `.hero-content`     — centered, max-width body column
  - `.hero-kicker`    — short, all-caps, accent color (e.g., "Section Kicker", investigation type, dateline)
  - `.hero-headline`  — H1, 2–6 words, no period
  - `.hero-subhead`   — one sentence summarizing the central tension or finding
  - `.hero-byline`    — "By [author]". Multiple bylines stack as separate `<p>`.
  - `.hero-date`      — month + year only, no day
  - `.scroll-indicator` — optional thin vertical line that pulses

**Rules:**
- Headline is sentence-case or title-case, not all-caps.
- Subhead is one sentence. If it needs two, it's not a subhead.
- To add a background image, set `background-image` on `.block-hero` in CSS, or drop an absolutely-positioned `<img>` inside the section before `.hero-overlay`.

### 6.2 Text (`.block-text`)

**Use:** The connective tissue of the story. Use frequently.

**Variants:**
- **Lede** — first text block, includes `<p class="text-dropcap">…</p>`. Drop cap appears on the first letter.
- **Nutgraph** — second text block, plain `<p>`, no heading.
- **Body section** — `<h2 class="section-heading">` followed by one or more `<p>`s.

**Anatomy:**
- `.text-inner` — caps width to `--col-width` (680px) and centers
- `.section-heading` — H2 inside the column
- `<p>` — serif, 1.25em, 150% line-height

**Rules:**
- Body paragraphs are serif. Headings are sans. Don't swap.
- Drop cap appears on the lede only.
- Use bracketed editorial notes (`[Bracketed editorial note -- ...]`) as visible placeholders during drafting. They render in body style and remind the writer what's missing.

### 6.3 Big number / stat (`.block-stat`)

**Use:** 1–2 times per story. More than that and the punctuation loses force.

**Anatomy:**
- `.stat-number` — the headline number, accent color, very large
- `.stat-label` — one-sentence context, serif. `<strong>` highlights the most important phrase.
- `.stat-source` — small caps, dim

**Rules:**
- Round numbers when possible. "~20%" reads better than "19.4%".
- Label is one sentence. If it needs two, the sentence isn't tight enough.
- Always include a source.

### 6.4 Explainer cards (`.block-explainer`)

**Use:** When you need to define 2–4 key terms before the story moves on.

**Anatomy:**
- `.section-heading` + `.section-subheading` — both centered above the grid
- `.card-grid` — auto-fit grid, wraps on narrow screens
- `.card` — per term: `.card-icon` (24x24 SVG), `<h3>` term, `<p>` definition
- `<strong>` inside `.card p` highlights status or key phrase in accent color

**Rules:**
- 2–4 cards. 1 is just a callout block. 5+ is a list, not a definition set.
- Keep card definitions to 1–2 sentences.
- Icons should be simple, single-color, line-style SVGs that match the existing icon set's stroke weight (`stroke-width="1.5"`). Don't introduce filled icons.

### 6.5 Image, full-bleed (`.block-image-full`)

**Use:** Scene-setters, hero portraits, large illustrations. Maximum impact moments.

**Anatomy:** `.image-container` (max 1200px wide) → `<img>` or `.image-placeholder` → `.image-caption` (constrained to body column)

**Rules:**
- Caption is sans-serif, dim color. The credit goes inside `<span class="credit">`.
- Don't add captions wider than the body column — they read as second-class compared to the body prose.

### 6.6 Image, inline (`.block-image-inline`)

**Use:** Supporting evidence — documents, maps, secondary photos that belong inside the prose flow.

**Same caption rules as full-bleed.**

### 6.7 Chart (`.block-chart`)

**Use:** Whenever data needs to do work that prose can't.

**Anatomy:**
- `.section-heading` (left-aligned, unlike explainer cards)
- `.chart-description` — one paragraph of context, serif, dimmed
- `.chart-placeholder` — replace with an iframe (Datawrapper, Flourish, Observable), an `<img>`, or a D3 mount point
- `.chart-note` — methodology footnote, italic, small
- `.chart-source` — small caps source line

**Rules:**
- Title is a statement, not a label. "Top facilities accounted for 60% of arrests" reads better than "Arrests by facility".
- Always include a source. Methodology note is optional.
- For iframes: set the iframe `min-height` ≥ 420px.

### 6.8 Pullquote (`.block-pullquote`)

**Use:** Sparingly — one or two per story. Only quotes that earn their own block; anything weaker belongs inline.

**Anatomy:**
- 48px accent rule above
- `<blockquote><p>...</p></blockquote>` — italic serif, centered, white
- `<cite>` — sans, dim, em-dash before the name

**Rules:**
- Quote text uses curly quotes (`"..."`) — don't escape them.
- Cite line: `-- Name, Title/Organization`.

### 6.9 Sticky scrollytell — people grid (`.block-scrolly-people`)

**Use:** Once per story, when you have a part-of-whole insight that benefits from being revealed step-by-step ("X of N").

**Pattern:** Sticky-overlay. The graphic pins to the top portion of the viewport while text-step cards scroll past below it. Each `.step` triggers a state change in the graphic via scrollama.

**Anatomy:**
- `.block-scrolly-people` — outer section; height auto-derived from step content
- `.scrolly-sticky` — `position: sticky`, height 62svh (58svh mobile). Contains:
  - `.stat-overlay` with `.stat-number` ("X of N"), `.stat-label`, `.stat-source`. `aria-live="polite"`.
  - `.people-gallery` — grid of `<figure class="people-item">` elements. `aria-hidden="true"` (decorative; the information is in the stat label and step text).
- `.scrolly-steps` — sibling of `.scrolly-sticky`, pulled up via negative margin to overlap. Contains:
  - `.step` elements (one per beat) — 80svh tall each, card anchored near the bottom.
  - `.step-card` — the actual narrative paragraph, with backdrop blur so it's readable over the graphic.

**Tunable (in `script.js`):**
- `MAX_HIGHLIGHTED` — peak number of figures highlighted (numerator). Once `stepIndex >= MAX_HIGHLIGHTED - 1`, additional steps keep the count pinned and dim the unhighlighted figures.
- The number of `.step` elements drives section length (one viewport of scroll per step).
- The denominator ("of N") auto-derives from the count of `.people-item` elements.

**Rules:**
- Each `.step` should have one paragraph of narrative text in `.step-card`. The text explains what just happened in the graphic.
- Stat label should be a single phrase that completes "X of N _______". Use `<strong>` to highlight the noun phrase.
- This is the most expensive block by reader-attention budget. Use at most once.
- If scrollama fails to load, the graphic falls back to the peak state (still readable, just not interactive).

### 6.10 Footer (`.block-footer`)

**Use:** Once at the end of the story.

**Anatomy:**
- 4 default `.footer-section`s: About / Methodology / Graphics / Sources. Add or remove sections to fit.
- `.footer-copyright` — bottom-most line

**Rules:**
- Section headings are uppercase, tracked, sans, dim — never the accent color.
- Section bodies are serif, dim.

---

## 7. Composition rules

A typical scrollytell sequence:

1. **Hero**
2. **Lede** (text with drop cap) — present the central finding
3. **Nutgraph** (text) — explain the stakes
4. **Stat or scrolly-people** — first big punctuation
5. **Explainer cards** — define the key terms before going deeper
6. **Body section → Image (full) → Body section** — first narrative beat
7. **Stat → Chart → Body section → Chart** — data-heavy middle
8. **Pullquote** — let a source carry a beat
9. **Body section** — interpret the data
10. **Stat or image (inline)** — second punctuation
11. **Pullquote** — contrasting voice
12. **Closing text** — reframe the central finding
13. **Footer**

### Rhythm

- **Alternate prose and visual blocks.** Two text blocks in a row is fine. Three is a wall. Four is a problem.
- **Stats and pullquotes are punctuation, not paragraphs.** Don't stack them — give each its own beat.
- **Charts come in pairs or alone, not in long sequences.** Two consecutive charts okay if they're answering different questions; three in a row reads as an appendix.
- **One scrolly-people block per story.** Maximum.

### Density

- Don't try to fit every block type into every story. A solid scrollytell can be hero + 8 text + 2 charts + 1 stat + footer. Variety should serve the reporting, not the template.

---

## 8. Voice and tone

- **Declarative.** State findings; let the data carry the weight. Avoid hedging modifiers ("could perhaps suggest").
- **Concrete numbers over qualifiers.** "9 of 12 facilities" beats "most facilities".
- **Em dashes for asides** — used the way the New York Times uses them.
- **Sentence-case headings** unless your house style is title case. Either is fine; pick one and be consistent.
- **Lowercase chart titles are okay** when the title reads as a sentence. Keep capitalization choices consistent across all charts in one story.
- **Bracketed editorial notes** (`[Bracketed editorial note -- ...]`) are visible-by-design during drafting. They render in body style. Remove before publishing.
- **No exclamation marks.** The design is restrained; the prose should be too.

---

## 9. Adding a new block

When generating a new block (or asking an LLM to):

1. **Pick a `.block-*` class name** that follows the pattern (`.block-quiz`, `.block-timeline`, `.block-map`).
2. **Inherit shared scales.** Use `--col-width` for prose-width content, `--col-wide` for chart/grid-width content. Use the existing padding scale (5–8rem vertical).
3. **Use existing tokens for color and type.** Don't introduce new ones. If you need an accent, it's `--accent`.
4. **Add `data-scroll="fade-up"`** to the section element so it inherits the scroll-fade engine. No JS changes needed for static blocks.
5. **For interactive blocks**, model on the people-scrolly pattern: a `.scrolly-sticky` graphic + a sibling `.scrolly-steps` containing `.step` elements, with scrollama wiring `onStepEnter` to a state-application function. Always handle `prefers-reduced-motion` by short-circuiting transitions to instant.
6. **Mobile breakpoint at 768px**, second breakpoint at 480px. Reduce padding by ~25%, collapse multi-column grids to single columns.
7. **Add a copy-pasteable snippet** to `blocks/` and a row to `blocks/README.md`.
8. **Document the block in section 6 of this file** — when to use, anatomy, rules.

When in doubt about a design choice, pick the option that is more restrained, more consistent with the existing tokens, and more accessible.
