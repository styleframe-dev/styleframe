---
"@styleframe/theme": minor
"styleframe": minor
---

Add Modal recipe with overlay, header, body, and footer parts

- Add `useModalRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants matching the Card recipe structure
- Add `useModalHeaderRecipe` and `useModalFooterRecipe` with separator border compound variants and setup functions for `:first-child`/`:last-child` border collapse
- Add `useModalBodyRecipe` with size-based padding and gap, no compound variants
- Add `useModalOverlayRecipe` with fixed-position full-screen backdrop (`rgba(0, 0, 0, 0.75)`) and centered flex layout
- Add Modal storybook components, grid previews, and stories with interactive open/close and fullscreen example
- Add Modal documentation page
