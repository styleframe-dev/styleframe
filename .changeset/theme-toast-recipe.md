---
"@styleframe/theme": minor
---

Add `useToastRecipe` for transient, floating feedback notifications, modeled on the callout recipe. Shares callout's color (9), variant (solid/outline/soft/subtle), size (sm/md/lg), and orientation (horizontal/vertical) axes with the same 36 color-variant compound variants, and adds the `toast-icon`, `toast-content`, and `toast-dismiss` sub-part recipes. The base departs from callout in two ways so it reads as a floating surface: it carries a `@box-shadow.md` elevation and is sized to its content rather than full-width.
