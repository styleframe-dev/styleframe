---
"@styleframe/theme": minor
"styleframe": minor
---

Accept `{ min, max }` objects in fluid range APIs

`useFluidClamp` and the per-step `values` of `useFluidFontSizeDesignTokens`
now accept ranges as either `[min, max]` tuples or `{ min, max }` objects.
The `fluidFontSize.values` config in `useDesignTokensPreset` accepts both
forms as well. Existing tuple call sites are unaffected.
