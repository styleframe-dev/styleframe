---
"@styleframe/theme": minor
"styleframe": minor
---

Add fullscreen variant to modal and modal-body recipes.

Adds a `fullscreen` boolean variant to `useModalRecipe` (fills the viewport with `width: 100%`, `height: 100%`, `max-width: none`, and `border-radius: 0`) and a matching variant to `useModalBodyRecipe` (`flex-grow: 1`) so the footer stays pinned to the bottom. Pass `fullscreen="true"` to both the container and the body to opt in.
