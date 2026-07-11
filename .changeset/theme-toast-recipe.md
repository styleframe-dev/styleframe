---
"@styleframe/theme": minor
---

Add `useToastRecipe` for transient, floating feedback notifications, modeled on the callout recipe. Shares callout's color (9), variant (solid/outline/soft/subtle), size (sm/md/lg), and orientation (horizontal/vertical) axes with the same 36 color-variant compound variants, and adds the `toast-icon`, `toast-content`, `toast-progress`, and `toast-dismiss` sub-part recipes. The base departs from callout so it reads as a floating surface: it carries a `@box-shadow.md` elevation, is sized to its content rather than full-width, and is a `position: relative` / `overflow: hidden` container that anchors and clips the progress line.

`useToastProgressRecipe` renders a thin duration indicator pinned to the toast's bottom edge that scales from full width to zero over a `--toast-duration` custom property (default `5s`), using `currentColor` so it inherits each color/variant's foreground. Pure CSS — the recipe owns the `toast-progress` keyframes, no runtime state toggling.
