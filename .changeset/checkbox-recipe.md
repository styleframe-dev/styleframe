---
"@styleframe/theme": minor
"styleframe": minor
---

Add Checkbox, CheckboxField, and CheckboxGroup recipes.

Adds three Inkline-style form-control recipes built on the native `<input type="checkbox">`. The `useCheckboxFieldRecipe()` composable styles the box with `appearance: none` and an SVG checkmark/dash `background-image`; `:checked`, `:indeterminate`, `:disabled`, and `:focus-visible` states are driven by native pseudo-classes. The `useCheckboxRecipe()` composable wraps the label, and `useCheckboxGroupRecipe()` lays out a set with `vertical` / `horizontal` orientation. All three support `light`, `dark`, and `neutral` surface colors and `sm` / `md` / `lg` sizes.

Also adds `useWebkitAppearanceUtility` (`-webkit-appearance`) to `@styleframe/theme` and registers it in `useUtilitiesPreset`, enabling recipes to set the vendor-prefixed appearance property.
