---
"@styleframe/theme": minor
"styleframe": minor
---

Refactor design tokens preset, add Button recipe, and improve Badge recipe

- Refactor `useDesignTokensPreset` with improved variable composables and `createUseDerivedVariable` utility
- Add `useButtonRecipe` with color, variant, and size support including compound variant styles
- Improve `useBadgeRecipe` sizing, contrast, and accessibility
- Update color references from `@color.light`/`@color.dark` to `@color.white`/`@color.black`
- Enhance `createUseRecipe` with better types and `@`-prefixed token reference support in recipe definitions
