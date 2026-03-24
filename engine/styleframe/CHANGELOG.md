# styleframe

## 3.3.0

### Minor Changes

- [#154](https://github.com/styleframe-dev/styleframe/pull/154) [`352f10c`](https://github.com/styleframe-dev/styleframe/commit/352f10c958ac12b7dde245657f3ae8d548e9378b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Update color palette for accessibility and show hex values in swatches
  - Revise base color values to OKLCH-aligned accessible colors for both light and dark modes
  - Remove per-color `text.on-*` tokens in favor of a single `colorTextInverted` reference
  - Display computed hex values inside color swatch previews
  - Add `color.<name>` labels below each swatch with monospace styling

- [#149](https://github.com/styleframe-dev/styleframe/pull/149) [`b9e54ed`](https://github.com/styleframe-dev/styleframe/commit/b9e54eda1acbf1b1b256f96bf6306dc300602618) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Flatten design tokens preset result and rename variable composables
  - Rename all variable composables from `use{Name}` to `use{Name}DesignTokens` for clearer naming
  - Flatten `useDesignTokensPreset` result so variables are directly destructurable instead of nested by domain
  - Add OKLCH gamut mapping utilities for color processing
  - Add color reference value support so colors can reference generated shade/tint variants
  - Add border, transition, and animation utility implementations

- [#155](https://github.com/styleframe-dev/styleframe/pull/155) [`cc4f170`](https://github.com/styleframe-dev/styleframe/commit/cc4f170c56ad2e246b94ab4d64b7f6c3097c7223) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Refactor recipes, improve modifier at-rule support, and forward variables through modifier factories
  - Refactor recipes and utilities with improved color theming composables
  - Add at-rule support for modifiers (e.g. media preference modifiers)
  - Forward variables and children through all modifier factory functions
  - Restructure docs for components, utilities, and modifiers into composable subdirectories
  - Add Button composable recipe documentation
  - Update plugin scanner for improved recipe handling

- [#151](https://github.com/styleframe-dev/styleframe/pull/151) [`6a18eeb`](https://github.com/styleframe-dev/styleframe/commit/6a18eeb5e36d9f66ef48f2e107d2b6ff65b2a792) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename colorLightness to colorLevel across theme, docs, and storybook
  - Rename `colorLightness` value to `colorLevel` for clearer terminology
  - Rename `useColorLightnessDesignTokens` to `useColorLevelDesignTokens`
  - Update all color-related design token references from lightness to level

### Patch Changes

- [#152](https://github.com/styleframe-dev/styleframe/pull/152) [`d7f4405`](https://github.com/styleframe-dev/styleframe/commit/d7f440585c942842b20bd97e2781131d28c3ee08) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Reorganize composable documentation into dedicated subdirectories
  - Move design token, utility, and modifier composable docs into `02.composables/` subdirectories
  - Update content to use "composable" terminology consistently
  - Add animations composable documentation page
  - Split transitions-animation into separate transitions and animations pages

- Updated dependencies [[`cc4f170`](https://github.com/styleframe-dev/styleframe/commit/cc4f170c56ad2e246b94ab4d64b7f6c3097c7223)]:
  - @styleframe/core@3.2.0
  - @styleframe/transpiler@3.1.0
  - @styleframe/plugin@3.2.0

## 3.2.0

### Minor Changes

- [#145](https://github.com/styleframe-dev/styleframe/pull/145) [`1597105`](https://github.com/styleframe-dev/styleframe/commit/1597105d55c1dd43adc6ec146858770a830dc1fb) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add duration design tokens for consistent animation and transition timing
  - Add `useDuration` composable with semantic duration scale from `instant` (0ms) through `slowest` (1000ms)
  - Add `durationValues` default token values: instant, fastest, faster, fast, normal, slow, slower, slowest
  - Register `duration` domain in `useDesignTokensPreset` with full theming and override support
  - Add `duration` namespace to `useTransitionDurationUtility` and `useTransitionDelayUtility` for `@token` references
  - Replace hardcoded `150ms` with `@duration.fast` in `useTransitionPropertyUtility`

- [#129](https://github.com/styleframe-dev/styleframe/pull/129) [`2610041`](https://github.com/styleframe-dev/styleframe/commit/2610041beb03a8afc8de17af8857b9931f3359b0) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add custom utility syntax support and separate class name generation from CSS escaping
  - Extract `defaultUtilitySelectorFn` to `@styleframe/core` returning raw class names; add `classNameToCssSelector` for consistent CSS escaping
  - Add `ScannerUtilitiesConfig` with pluggable `pattern`, `parse`, and `selector` functions for custom utility naming conventions
  - Thread custom utilities config through extractor, matcher, scanner, and plugin layers

- [#146](https://github.com/styleframe-dev/styleframe/pull/146) [`bff61d1`](https://github.com/styleframe-dev/styleframe/commit/bff61d104eca9b1f2a72911593abf0a7fc90ec34) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Close 416px breakpoint gap by adding 768px md breakpoint
  - Shift default breakpoint scale to align with industry standards (Tailwind, Bootstrap, Chakra)
  - Change md from 992px to 768px to cover the tablet range
  - Shift lg to 992px, xl to 1200px, and add new 2xl at 1440px

- [#135](https://github.com/styleframe-dev/styleframe/pull/135) [`228b0c0`](https://github.com/styleframe-dev/styleframe/commit/228b0c0bc36332d371dd8a7ca430ebe2be3ac046) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Implement importree-based HMR with selective cache invalidation
  - Replace full-reload HMR with importree-powered dependency graph for selective Jiti cache invalidation
  - Use persistent shared Jiti instance with `moduleCache: true` so unchanged dependencies stay cached across reloads
  - Add `dependency-graph` module that builds merged forward/reverse import trees for cross-entry dependency tracking
  - Export `createSharedJiti`, `clearJitiCache`, and `clearAllJitiCache` from `@styleframe/loader`
  - Remove `resolve.alias` option in favor of automatic dependency detection via importree

- [#137](https://github.com/styleframe-dev/styleframe/pull/137) [`8d6e731`](https://github.com/styleframe-dev/styleframe/commit/8d6e7316dff6ebd0ed5cc29a4061c50786e9e8f5) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `resolve.alias` option to plugin for custom path resolution
  - Add `resolve.alias` option to plugin types for configuring module path alias mappings
  - Resolve relative alias paths to absolute paths relative to the plugin working directory
  - Pass aliases through to Jiti loader and importree dependency graph for proper module resolution and HMR tracking

- [#133](https://github.com/styleframe-dev/styleframe/pull/133) [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Refactor design tokens preset, add Button recipe, and improve Badge recipe
  - Refactor `useDesignTokensPreset` with improved variable composables and `createUseDerivedVariable` utility
  - Add `useButtonRecipe` with color, variant, and size support including compound variant styles
  - Improve `useBadgeRecipe` sizing, contrast, and accessibility
  - Update color references from `@color.light`/`@color.dark` to `@color.white`/`@color.black`
  - Enhance `createUseRecipe` with better types and `@`-prefixed token reference support in recipe definitions

- [#138](https://github.com/styleframe-dev/styleframe/pull/138) [`5f06459`](https://github.com/styleframe-dev/styleframe/commit/5f064599bae7a3679aeef0dbcb9bfaf0c4167355) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add sanitize.css preset with configurable normalization categories
  - Add `useSanitizePreset` with opt-out config for base, forms, typography, and reduced motion
  - Add `useSanitizeBaseSelectors` with cross-browser normalization (box-sizing, margins, forms, accessibility)
  - Add `useSanitizeFormsSelectors` with form element normalization and consistent select appearance
  - Add `useSanitizeTypographySelectors` with system font stack defaults
  - Add `useSanitizeReduceMotionSelectors` with `prefers-reduced-motion` media query support

- [#133](https://github.com/styleframe-dev/styleframe/pull/133) [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add unique id and parent-child traversal to token types, validate @ references, and resolve utility sibling keys
  - Add unique `id` field to Root, Selector, AtRule, Theme, Utility, Modifier, and Variable token types for stable identity tracking
  - Add `parentId` to track parent-child relationships across the token tree
  - Add `root._registry` for efficient id-based lookups and tree traversal
  - Validate `@`-prefixed string references against root-level variables in `parseDeclarationsBlock`, throwing descriptive errors for undefined variables
  - Add null/undefined guard to `ref()` with clear error messages
  - Support `@`-prefixed values in utility entries that resolve to sibling keys (e.g., `{ default: "@solid", solid: "solid" }`)

- [#130](https://github.com/styleframe-dev/styleframe/pull/130) [`7ec356a`](https://github.com/styleframe-dev/styleframe/commit/7ec356a0ff945c58df7de5740ef85c6ed781a50a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add custom utility name support and shorthand utilities preset
  - Add `names` config option to `useUtilitiesPreset` for custom CSS class name prefixes on any utility
  - Add `utilityOptions` parameter to `createUseUtility` and `createUseSpacingUtility` to support name overrides
  - Add `useShorthandUtilitiesPreset` with TailwindCSS-compatible shorthand mappings (e.g., `._m:sm` instead of `._margin:sm`)

- [#142](https://github.com/styleframe-dev/styleframe/pull/142) [`89032b8`](https://github.com/styleframe-dev/styleframe/commit/89032b86dee47538a85f10e3083d128aaf60f864) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add z-index design token with semantic stacking scale
  - Add `useZIndex` composable with semantic layer names (base, dropdown, sticky, overlay, modal, popover, toast, max)
  - Add `zIndexValues` defaults with 100-increment scale for consistent stacking order
  - Integrate z-index into `useDesignTokensPreset` and `useUtilitiesPreset`
  - Update z-index utility docs to use semantic token values instead of arbitrary numbers

### Patch Changes

- [#141](https://github.com/styleframe-dev/styleframe/pull/141) [`295f04e`](https://github.com/styleframe-dev/styleframe/commit/295f04e6fdd011df6437986cc179e17efd8cd1be) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `@variablename` notation support in `css` template literals
  - `@variablename` strings in static parts of `css` template literals are automatically converted to variable references: `` css`1px solid @color.primary` `` resolves `@color.primary` to `ref("color.primary")`
  - Supports dotted names (e.g., `@color.primary.500`) and multiple references per segment (e.g., `` css`@spacing.x @spacing.y` ``)

- [#128](https://github.com/styleframe-dev/styleframe/pull/128) [`71009c2`](https://github.com/styleframe-dev/styleframe/commit/71009c2c0a07a0bfd240e70e61020c8b7e923edb) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add auto-resolve for variables and at-rules in `css` template literal interpolations
  - Variables interpolated directly in `css` are automatically converted to references: `` css`${variable}` `` is equivalent to `` css`${ref(variable)}` ``
  - AtRule and keyframes instances interpolated in `css` resolve to their rule name: `` css`${keyframeInstance}` `` is equivalent to `` css`${keyframeInstance.rule}` ``

- [#126](https://github.com/styleframe-dev/styleframe/pull/126) [`3ffb881`](https://github.com/styleframe-dev/styleframe/commit/3ffb8814f9b7db1912180b2e0c53e1b6675df4d6) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Extract modifier registration from `useUtilitiesPreset` into a dedicated `useModifiersPreset` composable with independent configuration

- [#140](https://github.com/styleframe-dev/styleframe/pull/140) [`7a61df0`](https://github.com/styleframe-dev/styleframe/commit/7a61df083bc534caa9271a1ef4535f7be979d7c2) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `@variablename` reference support in `variable()` values, `ref()` fallbacks, and `selector()` declaration values
  - `variable('name', '1px solid @color.primary')` resolves embedded `@` references to a CSS object with mixed text and reference parts
  - `ref('name', '@fallbackvar')` resolves `@`-prefixed fallback values to nested references
  - `selector({ border: "1px solid @color.primary" })` resolves embedded `@` references in declaration values
  - Extract shared `resolvePropertyValue()` utility for consistent `@` reference resolution across all contexts

- [#130](https://github.com/styleframe-dev/styleframe/pull/130) [`7ec356a`](https://github.com/styleframe-dev/styleframe/commit/7ec356a0ff945c58df7de5740ef85c6ed781a50a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Document custom utility names and `useShorthandUtilitiesPreset` in utilities preset docs
  - Add `Custom Names` section documenting the `names` config option in `useUtilitiesPreset`
  - Add `useShorthandUtilitiesPreset` section with usage examples and full shorthand name mapping table

- Updated dependencies [[`295f04e`](https://github.com/styleframe-dev/styleframe/commit/295f04e6fdd011df6437986cc179e17efd8cd1be), [`71009c2`](https://github.com/styleframe-dev/styleframe/commit/71009c2c0a07a0bfd240e70e61020c8b7e923edb), [`2610041`](https://github.com/styleframe-dev/styleframe/commit/2610041beb03a8afc8de17af8857b9931f3359b0), [`228b0c0`](https://github.com/styleframe-dev/styleframe/commit/228b0c0bc36332d371dd8a7ca430ebe2be3ac046), [`8d6e731`](https://github.com/styleframe-dev/styleframe/commit/8d6e7316dff6ebd0ed5cc29a4061c50786e9e8f5), [`7a61df0`](https://github.com/styleframe-dev/styleframe/commit/7a61df083bc534caa9271a1ef4535f7be979d7c2), [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f)]:
  - @styleframe/core@3.1.0
  - @styleframe/plugin@3.1.0
  - @styleframe/transpiler@3.0.1

## 3.1.0

### Minor Changes

- [#121](https://github.com/styleframe-dev/styleframe/pull/121) [`0242bd6`](https://github.com/styleframe-dev/styleframe/commit/0242bd65028cfc9216ed56e06d52de75ceff4d4b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add utility modifier composables with auto-registration in useUtilitiesPreset
  - Add 68 modifiers across 8 categories: pseudo-states, form states, structural, pseudo-elements, media preferences, ARIA states, directional, and other states
  - Each modifier is individually importable (e.g., `useHoverModifier`, `useDisabledModifier`)
  - Grouped composables available for convenience (e.g., `usePseudoStateModifiers`)
  - Per-category configuration to enable/disable modifier groups via `ModifiersConfig`

### Patch Changes

- [#120](https://github.com/styleframe-dev/styleframe/pull/120) [`fa48802`](https://github.com/styleframe-dev/styleframe/commit/fa488027d32956e20fa26dc92ee1a3b3583671ad) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add hash-based utility class names for arbitrary CSS values containing whitespace. Values like `transition: 'all 0.3s ease'` now produce valid CSS class names using a deterministic hash (e.g., `_transition:2f7a3b1`) instead of invalid bracket notation with spaces.

- Updated dependencies [[`fa48802`](https://github.com/styleframe-dev/styleframe/commit/fa488027d32956e20fa26dc92ee1a3b3583671ad)]:
  - @styleframe/core@3.0.1

## 3.0.0

### Major Changes

- [#117](https://github.com/styleframe-dev/styleframe/pull/117) [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.

### Minor Changes

- [#81](https://github.com/styleframe-dev/styleframe/pull/81) [`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add @-prefixed string reference shorthand and fix keyframes object API
  - Add `@`-prefixed string reference shorthand for inline token references in declarations (e.g., `"@color.primary"`)
  - Fix keyframes object API outputting `[object Object]` by parsing percentage, `from`, and `to` keys as nested selectors
  - Prevent namespace double-prepending for `@`-prefixed values in utilities and defaults

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0
  - @styleframe/transpiler@3.0.0
  - @styleframe/loader@3.0.0
  - @styleframe/cli@3.0.0
  - @styleframe/plugin@3.0.0

## 2.6.0

### Minor Changes

- [#83](https://github.com/styleframe-dev/styleframe/pull/83) [`6deddfd`](https://github.com/styleframe-dev/styleframe/commit/6deddfd7a97df13a7fcb865dbf088995f79bd4f3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Figma plugin for syncing Styleframe variables with Figma variables and CLI commands for Figma import/export

- [#105](https://github.com/styleframe-dev/styleframe/pull/105) [`b109ac1`](https://github.com/styleframe-dev/styleframe/commit/b109ac148d837ae0a060c34f0236338bf4deca36) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add multiplier support to spacing utilities (margin, padding, gap, space) with @-prefixed numeric values that generate calc() expressions based on a base spacing variable

### Patch Changes

- Updated dependencies [[`6deddfd`](https://github.com/styleframe-dev/styleframe/commit/6deddfd7a97df13a7fcb865dbf088995f79bd4f3)]:
  - @styleframe/cli@2.4.0

## 2.5.2

### Patch Changes

- [#102](https://github.com/styleframe-dev/styleframe/pull/102) [`90c3ae8`](https://github.com/styleframe-dev/styleframe/commit/90c3ae8dd19a688f88d1b362af6bef732de988d6) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `@styleframe/license` dependency and move runtime to production dependencies in init command

- Updated dependencies [[`90c3ae8`](https://github.com/styleframe-dev/styleframe/commit/90c3ae8dd19a688f88d1b362af6bef732de988d6)]:
  - @styleframe/cli@2.3.3

## 2.5.1

### Patch Changes

- [#100](https://github.com/styleframe-dev/styleframe/pull/100) [`6ae30fd`](https://github.com/styleframe-dev/styleframe/commit/6ae30fdd281033eb3a37c0a0b0388692506a0e58) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `@styleframe/license` as a dependency to the main `styleframe` package and update the CLI init command to add `@styleframe/runtime` as a production dependency instead of a dev dependency.

- Updated dependencies [[`6ae30fd`](https://github.com/styleframe-dev/styleframe/commit/6ae30fdd281033eb3a37c0a0b0388692506a0e58)]:
  - @styleframe/cli@2.3.2

## 2.5.0

### Minor Changes

- [#93](https://github.com/styleframe-dev/styleframe/pull/93) [`4ebc385`](https://github.com/styleframe-dev/styleframe/commit/4ebc3856ad4468e6caea5f72e595e781e2651b09) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `useDesignTokensPreset` composable for quick design token system setup
  - Introduces a comprehensive preset function that bootstraps complete design token systems with sensible defaults in a single function call
  - Full TypeScript type inference for all configuration options
  - Flexible domain configuration: use defaults, disable domains with `false`, or provide custom values
  - Automatic color variation generation (lightness, shades, tints) with configurable levels
  - Exports default values from variable composables (`defaultSpacingValues`, `defaultColorValues`, etc.)
  - Adds `useFontStyle` variable composable
  - Includes 54 comprehensive tests and detailed documentation

- [#95](https://github.com/styleframe-dev/styleframe/pull/95) [`75fd781`](https://github.com/styleframe-dev/styleframe/commit/75fd78196d61498db066de6e355eabcebbd39071) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename `useUtilities` to `useUtilitiesPreset` for consistency with design tokens preset naming
  - **BREAKING**: Renamed `useUtilities()` to `useUtilitiesPreset()` to align with `useDesignTokensPreset()` naming convention
  - Added comprehensive presets documentation page with complete API reference for 200+ utility creators
  - Updated all documentation examples and storybook files to use the new function name
  - Clarified CHANGELOG entries to indicate this is a rename from the previous function

- [#96](https://github.com/styleframe-dev/styleframe/pull/96) [`8460f16`](https://github.com/styleframe-dev/styleframe/commit/8460f169cec1199810e9203b357dac9f2f128c56) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename `?recipe` imports to `?ts` and add named selector export support
  - **Breaking:** Renamed import query parameter from `?recipe` to `?ts` for styleframe files
  - Add support for exporting named selectors alongside recipes via `?ts` imports
  - Add `_exportName` property to `Selector` and `Recipe` types for tracking named exports
  - Replace `c12` with `chokidar` + `jiti` for simpler, more reliable config loading
  - Add `onError` callback to `watchConfiguration` for error reporting during file watch
  - Add file deletion detection with `unlink` handler in watch mode
  - Simplify `loadConfiguration` API by merging `loadConfigurationFromPath`
  - Add comprehensive unit tests for TypeScript selector consumer

### Patch Changes

- [`1f60314`](https://github.com/styleframe-dev/styleframe/commit/1f60314cde97278294f06e248682026eb53a8af9) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update cli dependency

- Updated dependencies [[`1f60314`](https://github.com/styleframe-dev/styleframe/commit/1f60314cde97278294f06e248682026eb53a8af9), [`8460f16`](https://github.com/styleframe-dev/styleframe/commit/8460f169cec1199810e9203b357dac9f2f128c56), [`4e06424`](https://github.com/styleframe-dev/styleframe/commit/4e064245e78903307e6996eebf3f6dae5565de5f)]:
  - @styleframe/cli@2.3.1
  - @styleframe/loader@2.4.0
  - @styleframe/transpiler@2.6.0
  - @styleframe/plugin@2.4.0
  - @styleframe/core@2.6.0

## 2.4.0

### Minor Changes

- [#72](https://github.com/styleframe-dev/styleframe/pull/72) [`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for .styleframe file imports

- [#75](https://github.com/styleframe-dev/styleframe/pull/75) [`72bb1f6`](https://github.com/styleframe-dev/styleframe/commit/72bb1f64aae1531496c5e7398c4bd3c11f5433f9) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add Tailwind-style utility functions

  Add `createUseUtility` factory function and 15 utility categories (accessibility, backgrounds, borders, effects, filters, flexbox-grid, interactivity, layout, sizing, spacing, svg, tables, transforms, transitions-animation, typography) for generating composable CSS utility classes.

### Patch Changes

- [#80](https://github.com/styleframe-dev/styleframe/pull/80) [`ff1a689`](https://github.com/styleframe-dev/styleframe/commit/ff1a689f36dc4294b2a7353949c6efd220451e9d) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: Expand CSS selector escaping for arbitrary values

  Consolidate escape logic into a single regex and extend escaping to cover additional special characters (#, (, ), %, ,) needed for arbitrary CSS value syntax like `[#1E3A8A]`, `[rgb(255,0,0)]`, and `[calc(100%-20px)]`.

- [#76](https://github.com/styleframe-dev/styleframe/pull/76) [`06afe2a`](https://github.com/styleframe-dev/styleframe/commit/06afe2af66c3ecd8c6a516336e594c1e8cb56de1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - **BREAKING**: rename `useUtilities` to `useUtilitiesPreset` for consistency with design tokens preset naming

  Renamed `useUtilities()` to `useUtilitiesPreset()` to align with the naming convention established by `useDesignTokensPreset()`. The function registers all ~180 utility composables with a Styleframe instance and returns their creator functions, enabling automatic utility class generation for recipe declarations.

  Updated recipe documentation examples to use `useUtilitiesPreset()` with destructured functions and demonstrate both `ref()` and `@variable.name` syntax for referencing design tokens.

- Updated dependencies [[`ff1a689`](https://github.com/styleframe-dev/styleframe/commit/ff1a689f36dc4294b2a7353949c6efd220451e9d), [`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389)]:
  - @styleframe/transpiler@2.5.0
  - @styleframe/plugin@2.3.0
  - @styleframe/loader@2.3.0
  - @styleframe/core@2.5.0

## 2.3.0

### Minor Changes

- [#63](https://github.com/styleframe-dev/styleframe/pull/63) [`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add styleframe runtime for recipes

### Patch Changes

- Updated dependencies [[`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c)]:
  - @styleframe/transpiler@2.4.0
  - @styleframe/plugin@2.2.0
  - @styleframe/core@2.4.0
  - @styleframe/cli@2.3.0

## 2.2.0

### Minor Changes

- [#68](https://github.com/styleframe-dev/styleframe/pull/68) [`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for dot notation in variable names

### Patch Changes

- Updated dependencies [[`7d32059`](https://github.com/styleframe-dev/styleframe/commit/7d320590a311ace8882a5a29db3a911c24b53710), [`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec)]:
  - @styleframe/transpiler@2.3.0
  - @styleframe/core@2.3.0

## 2.1.1

### Patch Changes

- [`ff9d806`](https://github.com/styleframe-dev/styleframe/commit/ff9d806a8f815f94225851db000f6428b07cd305) Thanks [@alexgrozav](https://github.com/alexgrozav)! - docs: update readme

## 2.1.0

### Minor Changes

- [`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - chore: update dependencies

### Patch Changes

- Updated dependencies [[`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b), [`48ea659`](https://github.com/styleframe-dev/styleframe/commit/48ea659789c9cdaf64a86bad7b05f38562d987c9)]:
  - @styleframe/transpiler@2.2.0
  - @styleframe/plugin@2.1.0
  - @styleframe/loader@2.2.0
  - @styleframe/core@2.2.0
  - @styleframe/cli@2.2.0

## 2.0.2

### Patch Changes

- [`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: update license package version

- [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update package dependencies

- Updated dependencies [[`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182), [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3)]:
  - @styleframe/core@2.0.2
  - @styleframe/loader@2.0.2
  - @styleframe/transpiler@2.0.2
  - @styleframe/cli@2.0.2
  - @styleframe/plugin@2.0.2

## 2.0.1

### Patch Changes

- [#52](https://github.com/styleframe-dev/styleframe/pull/52) [`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix(cli): update install version

- Updated dependencies [[`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae)]:
  - @styleframe/cli@2.0.1
  - @styleframe/core@2.0.1
  - @styleframe/loader@2.0.1
  - @styleframe/transpiler@2.0.1
  - @styleframe/plugin@2.0.1

## 2.0.0

### Minor Changes

- [#50](https://github.com/styleframe-dev/styleframe/pull/50) [`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add license check integration

### Patch Changes

- Updated dependencies [[`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356)]:
  - @styleframe/transpiler@1.1.0
  - @styleframe/plugin@1.1.0
  - @styleframe/loader@1.1.0
  - @styleframe/core@1.1.0
  - @styleframe/cli@1.1.0

## 1.0.5

### Patch Changes

- [#45](https://github.com/styleframe-dev/styleframe/pull/45) [`6700e6f`](https://github.com/styleframe-dev/styleframe/commit/6700e6fa835183ac50808c05d44154c25e85e9e1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add license package for license interactions

- Updated dependencies []:
  - @styleframe/core@1.0.3

## 1.0.4

### Patch Changes

- [#43](https://github.com/styleframe-dev/styleframe/pull/43) [`7e3d008`](https://github.com/styleframe-dev/styleframe/commit/7e3d00849067618802334d5e6823fc31f3aa2612) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for generic records in createUseVariable

- Updated dependencies [[`7e3d008`](https://github.com/styleframe-dev/styleframe/commit/7e3d00849067618802334d5e6823fc31f3aa2612)]:
  - @styleframe/cli@1.0.5

## 1.0.3

### Patch Changes

- [#35](https://github.com/styleframe-dev/styleframe/pull/35) [`5d53569`](https://github.com/styleframe-dev/styleframe/commit/5d5356960af687884703f3de5d3d1638d8ee9d8a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: Update published files references in package.json

- Updated dependencies [[`5d53569`](https://github.com/styleframe-dev/styleframe/commit/5d5356960af687884703f3de5d3d1638d8ee9d8a), [`5d53569`](https://github.com/styleframe-dev/styleframe/commit/5d5356960af687884703f3de5d3d1638d8ee9d8a)]:
  - @styleframe/core@1.0.2
  - @styleframe/loader@1.0.3
  - @styleframe/transpiler@1.0.3
  - @styleframe/plugin@1.0.1
  - @styleframe/cli@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [[`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35), [`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35), [`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35), [`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35)]:
  - @styleframe/cli@1.0.2
  - @styleframe/loader@1.0.2
  - @styleframe/plugin@1.0.0
  - @styleframe/transpiler@1.0.2

## 1.0.1

### Patch Changes

- Update README.md
- Updated dependencies
  - @styleframe/cli@1.0.1
  - @styleframe/core@1.0.1
  - @styleframe/loader@1.0.1
  - @styleframe/transpiler@1.0.1

## 1.0.0

### Major Changes

- 8204e6d: Official styleframe release. Start writing modern, clean, composable CSS using TypeScript, with a focus on simplicity and performance.

### Patch Changes

- Updated dependencies [8204e6d]
  - @styleframe/cli@1.0.0
  - @styleframe/core@1.0.0
  - @styleframe/loader@1.0.0
  - @styleframe/transpiler@1.0.0
