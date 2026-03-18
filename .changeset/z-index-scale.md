---
"@styleframe/theme": minor
"styleframe": minor
---

Add z-index design token with semantic stacking scale

- Add `useZIndex` composable with semantic layer names (base, dropdown, sticky, overlay, modal, popover, toast, max)
- Add `zIndexValues` defaults with 100-increment scale for consistent stacking order
- Integrate z-index into `useDesignTokensPreset` and `useUtilitiesPreset`
- Update z-index utility docs to use semantic token values instead of arbitrary numbers
