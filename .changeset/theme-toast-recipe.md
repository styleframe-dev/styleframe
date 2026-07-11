---
"@styleframe/theme": minor
---

Add `useToastRecipe` for transient, floating feedback notifications, modeled on the callout recipe. Shares callout's color (9), size (sm/md/lg), and orientation (horizontal/vertical) axes, and adds the `toast-icon`, `toast-content`, `toast-title`, `toast-description`, `toast-progress`, and `toast-dismiss` sub-part recipes. The variant axis drops callout's `outline` — a transparent-background surface is illegible when floating over arbitrary page content — keeping the three filled styles (solid/soft/subtle) across 27 color-variant compound variants. The base departs from callout so it reads as a polished floating card: a soft, diffuse `@box-shadow.lg` elevation, well-rounded `@border-radius.lg` corners, and generous padding, sized to its content rather than full-width, and a `position: relative` / `overflow: hidden` container that anchors and clips the progress bar.

`useToastTitleRecipe` (semibold, snug) and `useToastDescriptionRecipe` (a step down in size and weight) establish the title/description type hierarchy via weight and size, both inheriting `currentColor` so the hierarchy holds on every variant.

`useToastProgressRecipe` renders a prominent, rounded countdown bar — inset from the toast's corners rather than edge-to-edge — that scales from full width to zero over a `--toast-duration` custom property (default `5s`), using `currentColor` at full opacity so it inherits each color/variant's foreground accent. Pure CSS — the recipe owns the `toast-progress` keyframes, no runtime state toggling.
