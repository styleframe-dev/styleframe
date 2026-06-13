---
"@styleframe/theme": minor
---

Add Drawer recipe with shared overlay recipe builders. Introduces `useDrawerRecipe`, `useDrawerBodyRecipe`, `useDrawerHeaderRecipe`, `useDrawerFooterRecipe`, and `useDrawerOverlayRecipe` for slide-in drawer panels with side (`left`/`right`/`top`/`bottom`) and size variants. Refactors modal sub-part recipes to use shared `createOverlayRecipes` builders, eliminating ~500 lines of duplication.
