---
"@styleframe/theme": patch
"styleframe": patch
---

Lock `fluid.screen` at `fluid.max-width` past the maximum viewport to prevent fluid values from extrapolating beyond their intended ceiling

- `useFluidViewportDesignTokens` now registers a media query at `min-width: <maxWidth>` that pins `fluid.screen` to `calc(var(--fluid--max-width) * 1px)`
- The lock breakpoint derives from the `maxWidth` option, supporting both numeric (`1440`) and string (`90rem`) values
