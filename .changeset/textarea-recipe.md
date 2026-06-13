---
"@styleframe/theme": minor
---

Add textarea recipe with full parity to input. Exports three new composables — `useTextareaRecipe`, `useTextareaPrefixRecipe`, and `useTextareaSuffixRecipe` — matching the input recipe's color/variant/size/state system and adding a `resize` axis (none/vertical/horizontal/both, default vertical). Also exports `useFieldSelector` from `@styleframe/theme` and refactors the input recipe family to use shared field-recipe builders, eliminating ~450 lines of duplication.
