---
"@styleframe/theme": minor
"styleframe": minor
---

Add fluid typography to the default design tokens preset

- Add `useFluidClamp` to compose a `clamp()`-style fluid value between a min/max pair using a viewport-driven breakpoint reference
- Add `useFluidViewportDesignTokens` registering `fluid.breakpoint`, `fluid.min`, and `fluid.max` viewport variables that drive the clamp interpolation
- Add `useFluidFontSizeDesignTokens` registering `font-size.min/max` (with `xs`–`xl` multipliers off the type scale) and resolving `font-size.{xs..xl}` to fluid clamp values
- Wire fluid font sizing into `useDesignTokensPreset` so the default preset ships fluid type out of the box
- Add `fluidFontSize` and `fluidViewport` value helpers and documentation for the new fluid composables and the presets reference page
