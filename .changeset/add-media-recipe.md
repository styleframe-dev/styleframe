---
"@styleframe/theme": minor
"styleframe": minor
---

Add `Media` recipe — a layout-only multi-part recipe modeled on the Bootstrap/Inkline media object pattern for image-plus-content layouts (comments, posts, list items)

- New recipes: `useMediaRecipe`, `useMediaFigureRecipe`, `useMediaBodyRecipe`, `useMediaTitleRecipe`
- Root recipe exposes `orientation` (`horizontal`/`vertical`), `align` (`start`/`center`/`end`), and `size` (`sm`/`md`/`lg`) axes — no color or surface styling, so it composes inside Card, Callout, etc.
- `useMediaBodyRecipe` sets `min-width: 0` to safely wrap long titles inside flex containers
- Designed for nesting (parent Media → child Media inside `MediaBody`) for comment threads and reply chains
