---
name: extract-figma-tokens
description: Use when extracting design tokens (colors, typography, spacing, radius, shadows) from a Figma file into this project's DESIGN.md and Tailwind config.
---

# Extract Figma Tokens Skill

Use this skill when pulling real design values from Figma into the codebase, whether for the first time or when a new Figma file/frame needs its tokens extracted.

## Workflow

1. Read DESIGN.md first to see what tokens already exist (don't duplicate blindly).
2. Using the connected Figma MCP, read the relevant frame(s)/file and identify actual values: colors, font sizes, spacing, radius, shadows.
3. For each value found, check if an existing token in DESIGN.md/Tailwind config is close enough to reuse (per CLAUDE.md's Design Consistency rules). If yes, ask before treating it as a new token rather than reusing the existing one.
4. Only add a new token if nothing close enough exists, and confirm with the user first.
5. Write confirmed tokens into `tailwind.config.js` and/or `app/globals.css` as the functional source of truth.
6. Update DESIGN.md's relevant sections (Colors, Typography, Spacing, Radius & Shadows) to document what was extracted, replacing "(pending)" placeholders.
7. Add an entry to DESIGN.md's Decisions Log noting what was extracted and from which Figma file/frame.
8. Flag anything ambiguous (e.g. inconsistent spacing that doesn't cleanly map to a scale) instead of guessing a resolution.

## Notes
- Never invent a token value that wasn't actually present in the Figma file.
- If the same visual value appears with slightly different numbers in Figma (e.g. 22px vs 24px in different frames), flag it as an inconsistency to resolve rather than creating both as separate tokens.

If you hit a blocker not covered here, solve it and update this file for next time.
