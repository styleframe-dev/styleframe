---
name: rfc-method
description: Staj's research manual — the RFC template with exit criteria, the competitive landscape map (styling engines and UI kits), the CSS platform watchlist, citation discipline, and the teardown format. Consult before starting any research task, RFC, or competitive analysis.
---

# RFC method

Research that does not end in a decision is trivia. Every output of this seat is written to be *decided*: one decision per document, a recommendation the reader can accept or reject in ten minutes, and an exit criterion that makes the recommendation falsifiable.

## The RFC template

```
# RFC: <decision to be made, phrased as a question>
Status: draft | decided(accepted/rejected) · Date: <YYYY-MM-DD> · Author: @staj

## Problem
What hurts or what opportunity closes if we do nothing. Grounded in THIS repo:
name the modules/recipes/docs affected.

## Prior art
How Tailwind vN / Panda vN / StyleX vN / the platform solve it — each claim
cited with version, date, and link. Primary sources only.

## Proposed design
Sketch level: API shape, which packages change (engine/core? transpiler
pipelines? theme?), migration story. Enough to estimate, not to implement.

## Alternatives
2–3, each with named tradeoffs. "Do nothing" is always listed, with its cost.

## Adoption & migration
Breaking? Codemod-able? What does the changeset/release train look like?

## Exit criterion
The observable outcome that would prove this decision wrong, and when to check.

## Recommendation
One paragraph. Take a side.
```

File as a Multica issue, @-mention @mise. Depth goes in appendices; the body stays a ten-minute read. Two decisions = two RFCs.

## Citation discipline

- Primary sources only: changelogs, release notes, specs, MDN/Baseline and caniuse data, official docs — not blog posts about blog posts.
- Every claim carries a version and a date; the CSS platform and rival tools move fast, and an undated claim is unverifiable.
- Performance/size claims are never asserted from reading: request numbers from `testing/benchmark` via @etoile, or spec a spike issue for the owning seat stating exactly what question the spike must answer. You do not write code — not even spikes.

## Competitive map (check quarterly; update this file per the compounding rule)

**Styling engines:** Tailwind v4 (oxide engine, CSS-first `@theme` config — the mindshare rival), Panda CSS (nearest architectural neighbor: static extraction + recipes), StyleX (Meta; compile-time atomic), vanilla-extract (zero-runtime TS pioneer), CVA / tailwind-variants (the recipe-pattern incumbents), Open Props (token distribution).
**UI kits (recipe-parity yardstick):** shadcn/ui, Radix, Nuxt UI, Chakra, Mantine — track their component lists against our 39 recipes and their theming/token stories against `@styleframe/theme`.
**Interchange:** DTCG spec evolution, Style Dictionary, Tokens Studio — `tooling/dtcg` must stay conformant.

**Styleframe's differentiators to defend:** typed dual output (CSS + TS + DTS from one AST), design-token composables as a library (not config), 9-bundler unplugin reach, free bidirectional Figma sync, recipes with a ~1.4KB runtime.

## CSS platform watchlist

Track Baseline status; when a feature crosses "newly available," evaluate whether it deserves first-class Styleframe support (modifier, utility, token type, or transpiler output) versus staying an escape hatch: container queries (+units), `@property`, anchor positioning, view transitions, `:has()`, `@scope`, scroll-driven animations, `light-dark()`, `color-mix()`, nesting, `@starting-style`, popover/dialog primitives.

Map each candidate to its landing zone: modifiers → `theme/src/modifiers/`, utilities → `theme/src/utilities/`, token types → `engine/core` + all three transpiler pipelines (see `engine-craft`'s end-to-end checklist — feasibility questions go to @roux).

## Teardown format (competitive analyses)

Scope (versions, date) → feature/DX matrix vs Styleframe → what they do better (honest, specific) → what we do better (evidence, not pride) → top-5 gaps ranked by adoption impact → handed to @mise as issue candidates. A teardown that finds nothing to steal was not adversarial enough — rivals' good ideas are gifts.
