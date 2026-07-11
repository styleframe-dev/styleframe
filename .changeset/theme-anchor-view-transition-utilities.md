---
"@styleframe/theme": minor
---

Add escape-hatch tier utilities for the stable anchor-positioning and view-transition properties (RFC SF-6, surfaces 3 & 4): `useAnchorNameUtility`/`usePositionAnchorUtility`/`usePositionAreaUtility` (`anchor-name`/`position-anchor`/`position-area`) and `useViewTransitionNameUtility` (`view-transition-name`). Each emits its single declaration and, like `container-name`, ships without defaults. All four are registered in `useUtilitiesPreset`. These are thin property utilities, not first-class sugar — the still-moving parts (`anchor()` expressions, `@position-try`, `position-visibility`, the `::view-transition-*` pseudo-elements, and cross-document `@view-transition`) stay on the raw `atRule` hatch. Purely additive.
