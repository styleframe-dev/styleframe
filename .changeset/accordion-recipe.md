---
"@styleframe/theme": minor
"styleframe": minor
---

Add Accordion recipe.

Adds a multi-part Accordion recipe composed of five composables: `useAccordionRecipe`, `useAccordionItemRecipe`, `useAccordionTriggerRecipe`, `useAccordionBodyRecipe`, and `useAccordionContentRecipe`. Supports `primary`, `secondary`, `light`, `dark`, and `neutral` colors and `sm`, `md`, and `lg` sizes. The trigger uses a chevron icon that rotates via a CSS transition when the item is in the `open` state (driven by the `[open]` attribute on `<details>`). Each part is independently composable and all five are re-exported from the `@styleframe/theme` barrel.
