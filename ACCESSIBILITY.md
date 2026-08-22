# Accessibility

Accessibility is a core implementation requirement, not a final QA step. Build it into shared components so individual pages inherit good behavior automatically. Target WCAG 2.2 Level AA wherever reasonably applicable.

When a Figma design conflicts with accessibility requirements, preserve the design intent while choosing an accessible implementation. Figma is a visual reference, not a complete accessibility spec, don't reproduce insufficient contrast, tiny text, or hover-only behavior just for pixel fidelity. Flag meaningful deviations instead.

## Semantic HTML
- Use real elements for their real purpose: `<button>` for actions, `<a>` for navigation, proper heading tags, `<nav>`, `<main>`, `<header>`, `<footer>`
- Don't use a styled `<div>` when a native element already does the job
- One `<main>` per page

## Headings
- Preserve logical hierarchy (one h1 per page, don't skip levels)
- Visual size and semantic level are independent, a visually small heading can still be an h2

## Keyboard Navigation
- Every interactive element (links, buttons, menus, dialogs, accordions, forms) must be usable with keyboard alone
- Focus order should follow the natural DOM/reading order, avoid positive `tabindex` values
- Provide a "skip to main content" option if persistent navigation appears before real content

## Focus States
- Every interactive element needs a visible focus state, not just hover
- Never remove focus outlines without an equally visible replacement
- Use `:focus-visible` where appropriate

## Color & Contrast
- Normal text: at least 4.5:1 contrast against its background. Large text: at least 3:1
- Never communicate meaning through color alone (e.g. errors need text/icon, not just red)

## Links vs Buttons
- Links for navigation, buttons for actions, don't mix them up
- Link text should make sense out of context, avoid "click here" or "more"

## Images
- Meaningful images need descriptive alt text (describe what matters, not every visual detail)
- Purely decorative images get empty alt text (`alt=""`), not skipped alt entirely
- For case study screenshots, describe the meaningful content ("Mobile checkout flow showing address selection"), not generic labels like "screenshot" or "image 2"

## Icons
- Decorative icons: `aria-hidden="true"`
- Icon-only buttons need an accessible label (e.g. `aria-label="Open navigation"`)

## Forms
- Every input needs a real, visible label, not just a placeholder
- Validation errors must clearly state the problem and be associated with the relevant field, not rely on color alone

## Touch Targets
- Aim for at least ~44x44px on interactive controls, especially for mobile

## Motion
- Respect `prefers-reduced-motion`, reduce or remove parallax, large entrance animations, and auto-playing effects for users who request it

## Hover
- Never make essential content available only on hover, it must also work via keyboard focus. Touch devices don't have hover at all

## Dialogs & Overlays
- Must receive focus when opened, support Escape to close, and restore focus to the triggering element when closed
- Prefer ShadCN/Radix primitives for this rather than building dialog behavior manually

## ARIA
- Use ARIA only when native HTML can't express what's needed. No ARIA is better than incorrect ARIA

## Responsive & Zoom
- Accessibility must hold at all supported viewport sizes and at increased browser zoom, no clipped text, no unreachable controls

## ShadCN Components
- ShadCN/Radix components come with accessibility built in (keyboard support, ARIA, focus management). Preserve this when customizing, don't strip it out for styling convenience

## Definition of Done (Accessibility)
A UI feature isn't complete until:
- Semantic HTML is used appropriately
- Keyboard interaction works fully
- Focus states are visible
- Meaningful images have real alt text
- Color contrast has been checked
- Motion respects reduced-motion preference
- Touch targets are usable
- Heading structure is logical
- Accessible behavior from shared components hasn't been broken
