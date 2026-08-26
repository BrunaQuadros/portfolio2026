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
- `components/navigation/` — SiteHeader, MobileNavigation, Footer
- `components/media/` — ResponsiveImage, VideoPlayer, ImageCarousel
- `components/shared/` — reusable components that don't fit any category above. Don't let this become a dumping ground

Most of these categories are empty right now, add them as real components are built, don't pre-create empty folders.

### Installed Components
- `button.tsx` — base button (Nova preset, Radix UI)

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
