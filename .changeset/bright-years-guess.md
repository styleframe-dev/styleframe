---
"@styleframe/theme": minor
"styleframe": minor
---

Add `useDesignTokensPreset` composable for quick design token system setup

- Introduces a comprehensive preset function that bootstraps complete design token systems with sensible defaults in a single function call
- Full TypeScript type inference for all configuration options
- Flexible domain configuration: use defaults, disable domains with `false`, or provide custom values
- Automatic color variation generation (lightness, shades, tints) with configurable levels
- Exports default values from variable composables (`defaultSpacingValues`, `defaultColorValues`, etc.)
- Adds `useFontStyle` variable composable
- Includes 54 comprehensive tests and detailed documentation
