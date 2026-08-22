@AGENTS.md

## Docs — read before guessing

| Doc | Use when |
|-----|----------|
| README.md | Project overview, how to run locally, deployment |
| ARCHITECTURE.md | Folder structure, naming conventions, where files go |
| COMPONENTS.md | Using or customizing ShadCN components |
| DESIGN.md | Any visual or styling decision (colors, spacing, type, tokens) |
| CONTENT.md | Page copy, content structure, voice and tone |
| ACCESSIBILITY.md | Contrast, focus states, semantic HTML expectations |

Don't duplicate long content from these docs into chat responses or into this file — link/reference them instead, so there's one source of truth.

## Project Rules

### Stack
- Next.js (App Router), TypeScript, Tailwind CSS, ShadCN (Radix UI variant)
- Do not introduce other UI libraries or CSS approaches (no styled-components, no inline styles, no new component libraries) without explicit approval

### Design Consistency
- Always read DESIGN.md before making any visual or styling decision. If DESIGN.md doesn't yet cover something you need, flag it, don't guess
- Never use loose/one-off values (hex codes, pixel sizes, spacing) that aren't already defined as tokens in DESIGN.md / Tailwind config
- If a new value seems needed, first check whether an existing token is close enough to reuse instead. Example: if a design calls for 22px text and a 20px token already exists, ask whether to use the existing 20px token rather than creating a near-duplicate
- Only create a new token if none is close enough, and ask for approval before doing so
- Any newly approved token must be added to DESIGN.md immediately, so it's available for reuse next time
- Reuse existing components before creating new ones. Check COMPONENTS.md and the components/ui folder first
- Any new pattern that repeats more than twice should become a reusable component, not copy-pasted

### Folder Structure
- See ARCHITECTURE.md for conventions on where files go and naming patterns
- Where things must live:
  - Page content/copy → CONTENT.md as source of truth, not hardcoded inline
  - Design tokens (colors, spacing, type) → Tailwind config only, never inline styles
  - Reusable components → components/ui (ShadCN-based) or components/ (custom)

### Code Style
- Prefer named exports over default exports
- Import order: external packages first, then internal files
- Self-documenting code over heavy comments; keep functions small and clearly named
- Gate any console.log statements behind a development-only check (never ship debug logs to production)

### Copy / Content Rules
- Never use em dashes or en dashes in written copy (headings, body text, button labels, etc.) — use commas, periods, or rewording instead
- Match the voice and tone documented in CONTENT.md. If new copy doesn't match that established voice, flag it and suggest an alternative instead of leaving it inconsistent

### Working Process
- Before writing code, describe the plan in plain English first: what you're building and which files you'll touch. Wait for approval before writing code if the task is non-trivial
- After generating or editing code, give a short summary (a few plain sentences, no jargon): what changed, in which files, and why
- Before creating or modifying any shared component, consult COMPONENTS.md
- Never consider UI work complete without checking ACCESSIBILITY.md

### Commands
- `npm run dev` — start local development server
- (more commands will be added here as the project grows: lint, typecheck, etc.)

### Author context
- The project owner is a product designer learning to code, not a developer — prefer clear, well-commented code over clever/terse code
