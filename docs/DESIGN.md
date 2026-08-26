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

These are project-specific brand colors for the Faircado case study, not the portfolio's own site-wide palette (which still uses the ShadCN neutral theme for chrome like the button component). Future case studies may introduce their own accent colors the same way, scoped with a project prefix.

## Typography

- Body/heading font: **Manrope** (`--font-manrope`, loaded via `next/font/google` in `app/layout.tsx`), used for all case study copy, headings, and card titles.
- Display font for large numbered section labels ("01/", "02/", "03/") and background outline numbers: **Inter** (`--font-inter-display`).
- Font sizes and line heights used inline via Tailwind (e.g. `text-[28px] leading-[38px]`, `text-[40px] leading-[48px]`) since no site-wide type scale exists yet. Flagged below.

## Spacing

No custom spacing tokens were needed. Figma's pixel-named spacing vars (e.g. `spacing-32`) map directly onto Tailwind's default numeric scale (`gap-8` = 8 × 4px = 32px), so standard Tailwind spacing utilities were used throughout.

## Radius & Shadows

Added case-study-specific radius tokens (`--radius-case-md` 12px through `--radius-case-3xl` 48px, plus `rounded-full` for pills) since the existing ShadCN radius scale (`--radius-sm/md/lg/xl/2xl/3xl/4xl`, based on a 10px `--radius` root) doesn't land close to the larger card radii (24px, 40px, 48px) this design repeats throughout. Shadows use Tailwind's arbitrary `shadow-[...]` values matching Figma's exact drop shadows (no shadow token scale exists yet).

## Components
(pending — see COMPONENTS.md for ShadCN-specific rules)

## Voice & Tone

First real case study copy (Faircado) is direct, confident, data-forward: short declarative headlines, bolded numbers/stats inline in body copy, no filler. Sentences are typically short to medium length. Further extraction pending more case studies.

## Decisions Log
- 2026-08-22: DESIGN.md created as placeholder, structure only, awaiting Figma extraction
- 2026-08-24: First token extraction done while building the Faircado case study page. Added portfolio-grey/faircado-pink/faircado-green color tokens, Manrope + Inter fonts, and case-study radius tokens to `app/globals.css`. Font sizes/line-heights and shadows were not tokenized (used as one-off arbitrary Tailwind values) — flag for future consolidation once a second case study confirms which values actually repeat.
