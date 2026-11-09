# Components

## Core Principles

### Reuse before creating
Before creating a new component:
1. Check if an existing component already solves it
2. Check if composing existing components solves it
3. Check if an existing component just needs a new variant
4. Only create something new if it's genuinely distinct and reusable

Don't create a new component just because a new Figma frame looks slightly different.

### Avoid premature abstraction
A component should exist because it represents a reusable pattern, contains real behavior, appears in multiple places, or meaningfully improves readability by being isolated. Not just to shrink a few lines of JSX.

## Component Categories

- `components/ui/` — low-level ShadCN primitives (Button, Dialog, Tooltip, Accordion, etc). No portfolio-specific content or assumptions here
- `components/layout/` — structural components (Container, Section, Stack, Grid)
- `components/typography/` — only if a typography pattern repeats meaningfully (e.g. SectionHeading), not to wrap a single Tailwind class
- `components/case-study/` — patterns specific to case study pages (CaseStudyHero, ImageBlock, QuoteBlock, ResultsSection, NextProject)
- `components/navigation/` — SiteHeader, MobileNavigation, Footer, ExitButton
- `components/media/` — ResponsiveImage, VideoPlayer, ImageCarousel
- `components/shared/` — reusable components that don't fit any category above. Don't let this become a dumping ground

Most of these categories are empty right now, add them as real components are built, don't pre-create empty folders.

### Installed Components
- `components/ui/button.tsx` — base button (Nova preset, Radix UI)

`components/case-study/` — built for the Faircado case study, reused wherever the same pattern repeats on any case study page:
- `SectionHeading.tsx` — pink eyebrow label + large heading + optional body. Used for Context, Problem, My Approach, Takeaways, and Final Solution
- `ProblemCard.tsx` — tag pill + heading (with an accent phrase) + body. One of the three "how might we" problem cards
- `MethodCard.tsx` — title + description + a row of logos/avatars/icons. One of the four research-method cards under My Approach
- `TestimonialCard.tsx` — quote + supporting data point, with an optional number. Used under Takeaways and again in the closing insights
- `StatCard.tsx` — icon + heading + body. One of the impact/result cards near the end of the case study
- `StepHeading.tsx` — numbered step label (accent color) + h3 one size below the section h2 + optional body. One per step in a multi-step section (eco.mio's My process: 1. Audit, 2. Align, 3. Scope)
- `TagPill.tsx` — small rounded icon + label pill (e.g. "Awareness", "Match accuracy"). Shared across problem cards, results cards, and every solution section
- `SolutionSection.tsx` — one of the three big numbered sections (01/, 02/, 03/), each holding cards with a tag, heading, and mobile screenshots. A block with `video` shows a screen recording on the card instead (rounded, shadowed, starts from the beginning when scrolled into view; eco.mio Automation block 1)
- `ProcessSwimlane.tsx` — horizontal process diagram drawn in SVG from data: three lanes (people), steps left to right hopping between them, each a small node (card, circle icon, screenshots tile, Figma card, link pill) with a label above or below. The highlighted lane and its nodes are yellow; every step label is white. A step with a `duration` (e.g. "2h") is a bottleneck: hovering the diagram draws a hand-drawn loop around it with the time handwritten beside it, and fades the other steps to 40%. A step with a `preview` gets a hover/focus target over its node that shows a bigger example image above it (it stays open while the mouse moves onto it), from lg up (eco.mio: a Ricoh demo on "Figma by hand"). Used in eco.mio's My process (1. Audit); edit the steps in `content/projects/eco-mio.ts`
- `HandoffChart.tsx` — vertical handoff chart in SVG, sized for the 250 x 541 phone slot: three people as columns, a zigzag dot per handoff, an optional note under one column and a big total. Used for eco.mio's "Old demo process"; edit `handoffs` and the totals in the content file
- `ContextCardCluster.tsx` — the three overlapping, slightly tilted cards beside a Context section (black and white, full color and 8% bigger on hover). Moved out of the Faircado page unchanged (pixel-identical) when eco.mio reused it. Exactly three cards: [0] behind, [1] top left, [2] top right; a card without `src` shows a placeholder
- `ImagePlaceholder.tsx` — flat `portfolio-grey-400` box standing in for a screenshot, avatar or icon not exported from Figma yet. Takes the size/corner classes of the image it replaces; `label` gives screen readers the slot's meaning. Images in content without a `src` render through it (phones in `SolutionSection` and `DiscardedIdeasSection`, the `TeamAvatarGroup` photo)
- `RichText.tsx` — renders a sentence stored as `RichSegment[]` (plain strings plus `{ text, bold?, accent? }` pieces), so content files can mark bold or brand-colored phrases anywhere in a sentence. `{ br: true }` is an art-directed line break shown only from `breakClass` up (default `hidden lg:inline`, Mobile Rule 4); the eco.mio hero uses `hidden xl:inline` because its three lines are wider than the hero column. `{ arrow: true, fallback? }` is a right-pointing accent arrow at a visual beside the text, shown with the line breaks; `fallback` (e.g. ".") shows instead on smaller screens, where `fallbackClass` is the opposite of `breakClass` (default `lg:hidden`). First used on eco.mio

Theming for a second case study (added for eco.mio, 2026-11-03). Every prop below is optional and defaults to the Faircado value, so Faircado renders unchanged:
- `accentClass` on `SectionHeading` (eyebrow color), `TeamAvatarGroup` ("+N" badge background), `TestimonialCard` (number color) and `DiscardedIdeasSection` (passed to its heading)
- `SolutionSection`: `hideTitle` (cards only, no giant title; eco.mio What's next), block-level `tag` / `tagIcon` / `body` overrides, `longTitle` (a smaller giant title for 15+ letter words such as "Decentralization"), `compactTag` (a small tag pill, in the card's top-left corner from xl and centred above the heading below it, eco.mio), `numberClass` (the small "01." color), `arrow` (`{ src, width, phoneHeight? }` for the connector between two phones; `phoneHeight` top-aligns the row when the SVG canvas is as tall as the phone), optional `tagIcon`
- `TagPill` and `ProblemCard`: the icon is optional (text-only pills)
- `TagPill`: `size="sm"` is a smaller pill (16px label, 20px icon) for eco.mio's solution blocks
- `TagPill`: `iconNode` takes a ready-made icon (a lucide icon) instead of an image file (eco.mio's "Constraint" pill)
- `ProblemCard`: `body` accepts rich content as well as a string, so eco.mio passes `<RichText>` for bold phrases
- `StatCard`: `iconNode` (custom icon slot, e.g. a placeholder), `size="short"` (383px instead of 431px from `sm:`), and `emphasis` may sit anywhere in the body, not only at the start
- `DiscardedIdeasSection`: the bold body phrases are optional, so it doubles as eco.mio's "What's next" (tag + phone + two-line caption)

`components/home/` — homepage patterns:
- `ProjectCard.tsx` — grey full-width project panel (company, title, summary, three or four highlights, and a media block that is either two phone mockups (image plus hover-play video) or one wide brand-colored panel with a screenshot, chosen by `media.kind`). The whole panel links to the case study. One per project on the homepage; phones use the mobile scroll strip below `lg:`

`components/media/`:
- `HoverPlayVideo.tsx` — client component. Muted looping video frozen on a chosen second (`startAt`) until the surrounding link is hovered or focused, then plays from there; pauses and returns to that frame on leave. Used for the second phone in the homepage project card
- `ImageCompare.tsx` — client component, from Bencho's "Image compare" block (MIT, bencho.dev/licence). Two screenshots of the same frame with a draggable line between them (the line bends on a spring while dragging; flicks glide to the edge). Keyboard: arrows, Home, End. Jumps without animation under reduced motion. Styles are the `.cmp*` classes in `app/globals.css`, with Bencho's tokens mapped to ours on the component root. First used on the eco.mio Context before/after; not on any page right now
- `AutoPlayVideo.tsx` — client component. Muted looping video that plays on load, or stays on its first frame when the visitor prefers reduced motion. `startOnView` waits until 60% of it is on screen, plays from the start, and stops and rewinds once it has fully left the screen (eco.mio case study hero). Used for video screenshots in `ProjectMediaPanel` (eco.mio demo)

- `ProjectMediaPhones.tsx` — the card's two phone mockups (still image + hover-play video), mobile scroll strip below `lg:`
- `ProjectMediaPanel.tsx` — the card's alternative media block: brand-colored panel with either a rounded screenshot that runs off the bottom (`crop: "bottom"`, Impact Hero) or a video covering the whole panel (`crop: "fill"`, eco.mio, for recordings with their own background). Videos use `AutoPlayVideo`. Same 528 x 541 footprint as the phones. Use for case studies without phone mockups

`components/navigation/`:
- `SiteHeader.tsx` — homepage top bar: site name (links home) and a Contact link
- `ExitButton.tsx` — fixed circular close button (top right) linking back to the homepage. Rendered by `app/case-studies/layout.tsx` so it appears on every case study page
- `CaseStudySectionNav.tsx` — client component wrapping everything after the hero on a case study page. Lists the page's sections (`sectionNav` in its content file; each `id` matches an `id` on a section in the page) and tracks which one is being read. `variant` picks the navigation, from xl (1280px) up; below that there is none and the content is unchanged
  - `variant="timeline"` (default, live): renders `CaseStudyTimelineNav.tsx`, the small floating bar at the bottom centre. Appears after 80px of scroll, one dot per section, names on hover or keyboard focus, with Previous and Next arrows at its ends. Arrow order lives in `content/projects/caseStudyOrder.ts` and loops; add a line there when a case study page is published
  - `variant="sidebar"` (kept as an alternative, not in use): the sticky grey "Contents" panel on the left, with the content zoomed to 0.8035 so nav and content together are as wide as the hero

## ShadCN Strategy

- Use ShadCN for generic interactive primitives: buttons, dialogs, dropdowns, accordions, tooltips, forms
- Don't force ShadCN into editorial/content-heavy layouts (like case study body text) where plain semantic HTML is simpler
- When customizing a ShadCN component: preserve accessibility behavior, preserve keyboard behavior, use project design tokens, avoid unnecessary changes to its API, document major structural changes

## Variants vs Props

- Use variants for real design-system states (`<Button variant="primary" />`, `variant="ghost"`), not for one-off page-specific tweaks (`variant="project-page-two-special"`)
- Props should represent meaningful choices (`<ProjectCard featured />`), not raw CSS values disguised as props (`paddingTop="47px"`)
- If a difference only matters on one page, handle it with local composition, don't pollute a shared component's API

## Component API Stability

Before changing a shared component: search all existing usages, understand what depends on it, prefer additive changes over breaking ones. If a breaking change is unavoidable, update all existing usages in the same change.

## Naming

- Name by concept, not current appearance: `ProjectMeta`, `CaseStudyHero`, not `BigGreyBox` or `LeftThing`
- Component files: PascalCase (`ProjectCard.tsx`)
- Utility files: camelCase (`formatProjectDate.ts`)
- Prefer named exports for components; default exports only where Next.js route files require them

## Rules for Extending (Figma → Component)

When implementing a new Figma design:
1. Compare it with existing components first
2. Reuse where possible
3. Use existing design tokens (see DESIGN.md)
4. Add a variant only if it's a genuine reusable variation
5. Create a new component only for a genuinely new pattern
6. Check existing usages before modifying a shared component to satisfy just one page
7. Update this file if a new category or convention is introduced

## New Component Checklist

Before adding a new shared component, ask:
- Does an equivalent already exist?
- Could composition solve this instead?
- Is this pattern likely to repeat?
- Does it represent a real design concept, or is it page-specific?
- Is it using existing design tokens?
- Is accessibility handled? (see ACCESSIBILITY.md)
- Will this still make sense in six months?

If it feels page-specific, keep it local rather than adding it to the shared library.
