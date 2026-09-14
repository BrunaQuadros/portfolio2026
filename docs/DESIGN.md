# Design System

Status: First real tokens extracted from the Faircado case study Figma file (2026-08-24). Values below are what's been used in code so far; extend as later case studies introduce new needs, don't invent ahead of use.

## Colors

Defined in `app/globals.css` under `@theme inline`, used via Tailwind utilities like `bg-portfolio-grey-50`, `text-faircado-pink-500`, etc.

| Token | Value | Use |
|---|---|---|
| `portfolio-grey-50` | `#f7f7f7` | Section/card background |
| `portfolio-grey-100` | `#f0f0f0` | Subtle fill (logo chips) |
| `portfolio-grey-200` | `#e7e7e7` | Borders on light cards |
| `portfolio-grey-400` | `#cfcfcf` | Placeholder/empty image fill |
| `portfolio-grey-600` | `#5e5f5d` | Secondary/muted text |
| `portfolio-grey-900` | `#121212` | Primary text |
| `faircado-pink-400` | `#ff80a4` | Numbered annotation pills |
| `faircado-pink-500` | `#ff5182` | Brand accent, eyebrow labels |
| `faircado-pink-600` | `#e50041` | Accent (thumbs-down chip) |
| `faircado-green-400` | `#a9f185` | Section number accent ("01/") |
| `faircado-green-500` | `#52c517` | Highlight text accent |

| `portfolio-pink-500` | `#e53b7d` | Site-wide accent (homepage hero highlight, focus rings on homepage links). Added 2026-09-14 |

The `portfolio-pink-500` token is the portfolio's own accent. The `faircado-*` colors are project-specific brand colors for the Faircado case study, not the portfolio's own site-wide palette (which still uses the ShadCN neutral theme for chrome like the button component). Future case studies may introduce their own accent colors the same way, scoped with a project prefix.

## Typography

- Body/heading font: **Manrope** (`--font-manrope`, loaded via `next/font/google` in `app/layout.tsx`), used for all case study copy, headings, and card titles.
- Display font for large numbered section labels ("01/", "02/", "03/") and background outline numbers: **Inter** (`--font-inter-display`).
- Diegetic app-UI font, used only for mockup elements that reproduce real in-app copy (e.g. the Momentum urgency tip callouts) instead of the portfolio's own voice: **Hanken Grotesk** (`--font-hanken-grotesk`), matching the actual Faircado app's typeface per Figma.
- `text-hero`: 60px / 1.4 line-height, the homepage hero sentence (Manrope semibold, paired with `tracking-[-0.04em]`). Below `lg:` the hero uses vw steps instead (`text-[11vw] sm:text-[7vw] lg:text-hero`). First site-wide type token, added 2026-09-14.
- Other font sizes and line heights used inline via Tailwind (e.g. `text-[28px] leading-[38px]`, `text-[40px] leading-[48px]`) since no site-wide type scale exists yet. Flagged below.

## Spacing

No custom spacing tokens were needed. Figma's pixel-named spacing vars (e.g. `spacing-32`) map directly onto Tailwind's default numeric scale (`gap-8` = 8 × 4px = 32px), so standard Tailwind spacing utilities were used throughout.

## Vertical Rhythm (mobile)

Below `sm:` the case study uses three spacing steps and nothing else:

| Between | Value | Tailwind |
|---|---|---|
| One section and the next | 96px | `gap-24` on the page's `<main>` |
| A section heading block and its content | 48px | `gap-12` (or `mb-12`) on the section |
| Cards in the same group | 24px | `gap-6` on the grid / strip |

Inside the heading block, `SectionHeading` already fixes eyebrow to title at 32px and title to body at 16px at every width. Desktop keeps its per-section tuning: any extra or negative section margin is scoped to `lg:` (`lg:mt-10`, `lg:-mt-[60px]`), and heading or card gaps restore their desktop value from `sm:` (`gap-12 sm:gap-16`). Approved exceptions on mobile: the Challenge panel sits 48px under "So our challenge became:" (`-mt-12`) and the numbered solution blocks sit close under the Final Solution title (`-mt-16`), because both continue the section above; and the My Approach 2x2 card grid uses an 8px gap (`gap-2 sm:gap-6`) so each small card keeps room for its content.

## Mobile Rules

Desktop is the approved, primary surface. Mobile is retrofitted onto it, so every rule below is applied with breakpoint-scoped classes that leave `lg:` (or `sm:`, where noted) rendering exactly as it was.

1. **Desktop first.** No mobile fix may change how anything renders on desktop without explicit approval. If a shared value has to change, stop and ask; otherwise add a mobile-scoped override and restore the desktop value at its breakpoint (`p-6 sm:p-10`, `gap-12 sm:gap-16`).
2. **Corner-positioned tag pills return to the flow below `lg:`,** centred above the card heading (`self-center lg:absolute lg:left-10 lg:top-10 lg:self-auto`, with `-mt-9 lg:mt-0` on the heading to tighten the gap). An absolutely positioned pill overlaps the heading once the card is narrow.
3. **Fixed card heights and large fixed gaps only apply once cards sit side by side.** `h-[380px]`, `h-[431px]`, `gap-[100px]` exist to equalise cards in a row; scope them to the breakpoint where the grid becomes multi-column (`sm:h-[380px]`, `gap-10 sm:gap-[100px]`). Stacked in one column they only leave empty space.
4. **Manual line breaks in headings are desktop-only.** `<br className="hidden lg:inline" />{" "}` (the `{" "}` restores the space) so short mobile lines wrap naturally instead of leaving orphan words. Where two words must stay together on phones, replace the break with a non-breaking space below `lg:`.
5. **Large headings scale with `vw` up to `lg:`, never a fixed px below that.** A fixed px size (or a `calc(vw + px)` addend) still overflows tablets and narrow phones; use pure `vw` steps (`text-[12vw] sm:text-[7vw] md:text-[14vw] lg:text-[152px]`).
6. **Decorative giant titles may crop at the screen edges, but must never cause horizontal scroll.** Give the title `w-max` inside a centred parent with `overflow-x-hidden`, so the word is cropped evenly on both sides (solution titles: `19vw` below `sm:`, number stacked above the word). Check `document.documentElement.scrollWidth` equals the viewport width after any such change.
7. **Overlays that hang off a phone mockup scale with the phone.** Badges, loupes, tags and pins sized for the 250px desktop phone scale by 190/250 (0.76) below the phone's mobile breakpoint (`w-[213px] sm:w-[280px]` for the urgency tips; the peek cards use a 0.76 transform). Anything that hangs off the left edge also needs matching left padding in its scroll strip so it isn't clipped.

## Layout Containers

Every case study section aligns to one of two nested containers. Reuse these exactly, don't invent new offsets per section.

**Full-bleed container** — 1220px wide, breaks out of the section's own padding to reach the edges of the outermost page container. Used for anything meant to visually anchor the page (the hero video panel, the Challenge headline panel, the "My Approach" four-card row).
```
mx-auto w-full max-w-[1220px] px-6 sm:px-10   /* on the <section> */
-mx-6 w-[calc(100%+3rem)] sm:-mx-10 sm:w-[calc(100%+5rem)]   /* on the full-bleed child */
```

**Text container** — a narrower 975px-based column, inset from the full-bleed edge, used for every heading/body block (Context, Problem, the Challenge headline itself, "My Approach" heading). Its left edge lines up with the text *inside* the My Role/Impact grey box above it, not that box's own background or the section's padding:
```
style={{ marginLeft: "max(0px, calc((100% - 975px) / 2 + 40px))" }}
```

When adding a new section: headings/body copy get the text container's offset; anything meant to span the full visual width (image panels, card rows, colored panels) gets the full-bleed breakout. Both nest inside the same outer `max-w-[1220px]` section.

**Phone mockups** — every app screenshot is 250 x 541px on desktop (`lg:` and up) and 190 x 411px below that (same 250:541 aspect ratio). Reuse these two sizes for any phone mockup; don't introduce a third.

**Horizontal scroll strip (mobile only)** — when a section shows two or more phone mockups side by side, below `lg:` they go in a scroll strip instead of stacking. The desktop composition stays untouched (`hidden lg:block`), the strip is `lg:hidden`:
```
scrollbar-hide -mx-4 -mt-8 -mb-10 flex snap-x snap-mandatory gap-10 overflow-x-auto px-4 pt-8 pb-14 scroll-pl-4 sm:-mx-10 sm:px-10 sm:scroll-pl-10
```
Each phone is `shrink-0 snap-start`. **The gap between phones is 40px (`gap-10`)** on every strip. Exception: the before/after pair keeps its own spacing (24px gap plus the 64px right margin each figure carries for the numbered pins), because that spacing exists for an element, not for rhythm. The negative margins break out of the section padding so the next phone peeks in from the right edge; `scroll-pl-*` keeps the first phone aligned with the text above it; `scrollbar-hide` (a utility in `app/globals.css`) hides the scrollbar while keeping touch and trackpad scrolling. The vertical padding plus matching negative margins give the phones' drop shadow room inside the scroll box: overflow clips it otherwise, which shows up as a hard grey line under the phones. Inside a card that centers its children (`items-center`), add `self-stretch` to the strip, or it shrinks to its content width and gets clipped instead of scrolling. Used on the Insight section and on every Final Solution card.

## Radius & Shadows

Added case-study-specific radius tokens (`--radius-case-md` 12px through `--radius-case-3xl` 48px, plus `rounded-full` for pills) since the existing ShadCN radius scale (`--radius-sm/md/lg/xl/2xl/3xl/4xl`, based on a 10px `--radius` root) doesn't land close to the larger card radii (24px, 40px, 48px) this design repeats throughout. Shadows use Tailwind's arbitrary `shadow-[...]` values matching Figma's exact drop shadows (no shadow token scale exists yet).

**Mobile panel radius** — below `sm:`, every grey panel and card (hero, My Role, Challenge, method/problem/result cards, Final Solution cards, testimonial, learnings) uses `rounded-case-mobile` (28px, added 2026-09-14). The 40/48px desktop corners read too big on a 343px-wide card. Pattern: `rounded-case-mobile sm:rounded-case-{original}`. Phone mockups keep their own 20/24px at every width.

## Motion

First motion values, introduced 2026-09-14 on the Faircado hero star. Treat these as the starting motion tokens; reuse them before inventing new ones, and promote them to `app/globals.css` once a second use confirms them.

- **Settle** (playful landing): `cubic-bezier(0.34, 1.56, 0.64, 1)`, 500ms. Overshoots the target slightly and returns. For small decorative objects arriving somewhere (the sunglasses dropping onto the star). Not for layout or content reveals.
- **Fade-in for the same object**: 150ms, so the object is visible for most of its travel.
- **Tailwind 4 gotcha**: `translate`, `rotate` and `scale` are separate CSS properties, so list them by name in `transition-[...]`. Listing only `transform` makes the move snap.
- **Reduced motion**: not yet handled. Decide a `prefers-reduced-motion` rule before adding scroll reveals or page transitions.

## Inline heading icons

A 3D icon inside a heading (Faircado hero star) is sized relative to the text: `size-[1.25em] align-[-0.28em]` in a `relative inline-block` span, so it scales with the heading at every breakpoint. Empty `alt`, since the surrounding word carries the meaning.

## Components
(pending — see COMPONENTS.md for ShadCN-specific rules)

## Voice & Tone

First real case study copy (Faircado) is direct, confident, data-forward: short declarative headlines, bolded numbers/stats inline in body copy, no filler. Sentences are typically short to medium length. Further extraction pending more case studies.

## Decisions Log
- 2026-08-22: DESIGN.md created as placeholder, structure only, awaiting Figma extraction
- 2026-08-24: First token extraction done while building the Faircado case study page. Added portfolio-grey/faircado-pink/faircado-green color tokens, Manrope + Inter fonts, and case-study radius tokens to `app/globals.css`. Font sizes/line-heights and shadows were not tokenized (used as one-off arbitrary Tailwind values) — flag for future consolidation once a second case study confirms which values actually repeat.
- 2026-08-30: Added Hanken Grotesk (`--font-hanken-grotesk`) for diegetic app-UI mockup copy only (Momentum urgency tip callouts), matching the real Faircado app's font per Figma — not a replacement for Manrope as the portfolio's own voice.
- 2026-09-13: Mobile responsive pass on the Faircado case study. Standardized phone mockups at 190 x 411px below `lg:`, added the mobile horizontal scroll strip pattern (first used on the Insight section) and the `scrollbar-hide` utility in `app/globals.css`.
- 2026-09-14: Added `--radius-case-mobile` (28px) as the single panel/card corner radius below `sm:`. 28px is a new value rather than the existing 24px token, chosen by eye on the phone against the hero and My Role panels.
- 2026-09-14: Standardized mobile vertical rhythm (96 / 48 / 24px). Section-specific margins that existed for desktop are now `lg:`-only.
- 2026-09-14: Added the "Mobile Rules" section (desktop-first, pills in flow, scoped fixed heights, desktop-only line breaks, vw headings, cropped giant titles, overlays scaling with the phone), promoted from the Faircado mobile pass.
- 2026-09-14: Added the "Motion" section (settle easing, 150ms fade, Tailwind 4 transition gotcha) and "Inline heading icons", both from the Faircado hero star with hover sunglasses.
- 2026-09-14: Homepage built from the Portfolio 2026 Figma. Added `portfolio-pink-500` (#e53b7d) as the site-wide accent and `text-hero` (60px / 1.4) as the first type token. Figma used Inter for the hero and nav; the owner chose Manrope to keep one heading font. The 50px panel radius in Figma maps to the existing `rounded-case-3xl` (48px); the 230 x 498px phone mockups map to the approved 250 x 541px desktop size.
