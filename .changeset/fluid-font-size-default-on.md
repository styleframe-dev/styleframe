---
"@styleframe/theme": minor
"styleframe": minor
---

Enable `fluidFontSize` by default in `useDesignTokensPreset`

- Calling `useDesignTokensPreset(s)` with no config now emits the fluid
  font-size scale (`clamp()`-based `font-size.*`, `font-size.min/max`,
  `scale.min/max`, and per-power scale variables). Previously, fluid was
  opt-in via `fluidFontSize: true`.
- Pass `fluidFontSize: false` to fall back to the static `fontSize` domain.
- Custom `fontSize: { ... }` config is silently ignored when fluid is
  active. Migration: add `fluidFontSize: false` alongside any custom
  `fontSize` config you want to keep applying.
- Domain dependencies are now validated up front. Setting `fluidViewport:
  false` or `scale: false` while leaving `fluidFontSize` enabled throws a
  configuration error — both are required for the fluid scale to function.
  Migration: add `fluidFontSize: false` whenever you disable `fluidViewport`
  or `scale`.
- Internally, domains can now declare `enabled` predicates and a `requires`
  list of config keys that must not be `false`. The preset uses this to gate
  the fluid `scale` and `font-size` domains generically rather than via
  ad-hoc checks inside each composable.
