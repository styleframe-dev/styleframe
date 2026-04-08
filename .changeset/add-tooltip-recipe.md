---
"@styleframe/theme": minor
"styleframe": minor
---

Add Tooltip recipe with arrow sub-recipe and transform utility

- Add `useTooltipRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants
- Add `useTooltipArrowRecipe` with CSS border triangle implementation using `@tooltip.arrow.size` variable and `&:after` pseudo-element for border/fill separation
- Add `useTransformUtility` for arbitrary `transform` CSS property values
- Add Tooltip storybook components, grid previews, and stories including freeform rich content example
