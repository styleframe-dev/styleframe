---
"@styleframe/theme": minor
"styleframe": minor
---

Add `field-group` recipe and replace the per-field grouping recipes with it.

Adds `useFieldGroupRecipe` — an explicit, composable wrapper (modeled on Nuxt UI's FieldGroup) that joins bordered controls (buttons, inputs, selects, badges) placed as **direct children** into one unit, merging border radii and collapsing the inner border at the seams. Supports `orientation` (horizontal/vertical) and `block` mode; in a horizontal group inputs/selects/textareas flex-grow while buttons stay intrinsic.

Replaces the per-field grouping recipes, which are superseded by `useFieldGroupRecipe`:

- Removed `useButtonGroupRecipe` — a group of buttons now works the same way as direct children of a field group.
- Removed `useInputGroupRecipe`, `useInputPrependRecipe`, and `useInputAppendRecipe` — attach a control outside an input by making it a direct child of a field group.
- Removed the internal `createFieldSlotRecipe` and `createFieldGroupRecipe` builders.

Inline `useInputPrefixRecipe` / `useInputSuffixRecipe` (and the textarea equivalents) are unchanged.
