---
"@styleframe/theme": minor
"styleframe": minor
---

Add Input recipe with prefix/suffix and prepend/append slots

- Add `useInputRecipe` wrapper recipe with 3 colors (light, dark, neutral), 3 variants (default, soft, ghost), 3 sizes, and `invalid`/`disabled`/`readonly` boolean state axes; the wrapper owns the visual field and inherits typography into a nested `<input class="input-field">` styled via setup callback
- Add `useInputPrefixRecipe` and `useInputSuffixRecipe` for inline addons rendered inside the field, beside the text
- Add `useInputPrependRecipe` and `useInputAppendRecipe` as transparent slot containers for external addons (Buttons, dropdowns, plain text) — content brings its own visual language
- Add `useInputGroupRecipe` as a pure layout coordinator that flattens border-radius and collapses border-width at the seams where prepend/append meet the input, using `:has()` selectors
