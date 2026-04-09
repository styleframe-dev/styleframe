---
"@styleframe/theme": minor
"styleframe": minor
---

Add Popover recipe with composable sub-recipes and documentation

- Add `usePopoverRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants
- Add `usePopoverHeaderRecipe` and `usePopoverFooterRecipe` with border collapsing via `:first-child`/`:last-child` selectors
- Add `usePopoverBodyRecipe` for content area styling
- Add `usePopoverArrowRecipe` with CSS border triangle implementation using `@popover.arrow.size` variable and `&:after` pseudo-element for border/fill separation
- Add Popover storybook components, grid previews, and stories
- Add complete documentation page covering usage, anatomy, accessibility, and API reference
