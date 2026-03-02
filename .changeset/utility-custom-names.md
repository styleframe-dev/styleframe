---
"@styleframe/theme": minor
"styleframe": minor
---

Add custom utility name support and shorthand utilities preset

- Add `names` config option to `useUtilitiesPreset` for custom CSS class name prefixes on any utility
- Add `utilityOptions` parameter to `createUseUtility` and `createUseSpacingUtility` to support name overrides
- Add `useShorthandUtilitiesPreset` with TailwindCSS-compatible shorthand mappings (e.g., `._m:sm` instead of `._margin:sm`)
