# @styleframe/theme

## 3.1.0

### Minor Changes

- [#121](https://github.com/styleframe-dev/styleframe/pull/121) [`0242bd6`](https://github.com/styleframe-dev/styleframe/commit/0242bd65028cfc9216ed56e06d52de75ceff4d4b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add utility modifier composables with auto-registration in useUtilitiesPreset
  - Add 68 modifiers across 8 categories: pseudo-states, form states, structural, pseudo-elements, media preferences, ARIA states, directional, and other states
  - Each modifier is individually importable (e.g., `useHoverModifier`, `useDisabledModifier`)
  - Grouped composables available for convenience (e.g., `usePseudoStateModifiers`)
  - Per-category configuration to enable/disable modifier groups via `ModifiersConfig`

### Patch Changes

- Updated dependencies [[`fa48802`](https://github.com/styleframe-dev/styleframe/commit/fa488027d32956e20fa26dc92ee1a3b3583671ad)]:
  - @styleframe/core@3.0.1

## 3.0.0

### Major Changes

- [#117](https://github.com/styleframe-dev/styleframe/pull/117) [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.

### Minor Changes

- [#81](https://github.com/styleframe-dev/styleframe/pull/81) [`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Badge recipe with createUseRecipe factory
  - Add `useBadgeRecipe` and `useBadgeRecipeBase` recipe composables with color, variant, and size variants
  - Add `createUseRecipe` factory utility for building reusable, customizable recipe presets
  - Add `3xs` and `2xs` font-size values

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0

## 2.5.0

### Minor Changes

- [#105](https://github.com/styleframe-dev/styleframe/pull/105) [`b109ac1`](https://github.com/styleframe-dev/styleframe/commit/b109ac148d837ae0a060c34f0236338bf4deca36) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add multiplier support to spacing utilities (margin, padding, gap, space) with @-prefixed numeric values that generate calc() expressions based on a base spacing variable

## 2.4.0

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

- [#97](https://github.com/styleframe-dev/styleframe/pull/97) [`fe021c6`](https://github.com/styleframe-dev/styleframe/commit/fe021c6b90c83593e5a297e4e66ef516d643252f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Centralize theme variable defaults to dedicated values folder

  **BREAKING**: Default value exports have been renamed and `useUtilitiesPreset` has moved.

  ### Renamed Exports

  All default value exports have been renamed from `defaultXxxValues` to `xxxValues`:
  - `defaultSpacingValues` → `spacingValues`
  - `defaultColorValues` → `colorValues`
  - `defaultBorderWidthValues` → `borderWidthValues`
  - `defaultBorderRadiusValues` → `borderRadiusValues`
  - `defaultBorderStyleValues` → `borderStyleValues`
  - `defaultBoxShadowValues` → `boxShadowValues`
  - `defaultBreakpointValues` → `breakpointValues`
  - `defaultEasingValues` → `easingValues`
  - `defaultFontFamilyValues` → `fontFamilyValues`
  - `defaultFontSizeValues` → `fontSizeValues`
  - `defaultFontStyleValues` → `fontStyleValues`
  - `defaultFontWeightValues` → `fontWeightValues`
  - `defaultLineHeightValues` → `lineHeightValues`
  - `defaultLetterSpacingValues` → `letterSpacingValues`
  - `defaultScaleValues` → `scaleValues`
  - `defaultScalePowerValues` → `scalePowerValues`
  - `defaultColorLightnessValues` → `colorLightnessValues`
  - `defaultColorShadeValues` → `colorShadeValues`
  - `defaultColorTintValues` → `colorTintValues`

  ### Moved `useUtilitiesPreset`

  The `useUtilitiesPreset` function has moved from `utilities/` to `presets/`:

  ```ts
  // Before
  import { useUtilitiesPreset } from "@styleframe/theme/utilities";

  // After
  import { useUtilitiesPreset } from "@styleframe/theme/presets";
  // Or from the main export
  import { useUtilitiesPreset } from "@styleframe/theme";
  ```

  ### Enhanced `useUtilitiesPreset`

  The `useUtilitiesPreset` now supports configuration options:
  - Customize utility default values
  - Disable specific utilities with `false`
  - Merge custom values with defaults using `meta.merge: true`

  ```ts
  const utilities = useUtilitiesPreset(s, {
    meta: { merge: true },
    display: { flex: "flex", block: "block" },
    position: false, // Disable position utilities
  });
  ```

  Migration: Update imports to use the new export names and import path.

- [#95](https://github.com/styleframe-dev/styleframe/pull/95) [`75fd781`](https://github.com/styleframe-dev/styleframe/commit/75fd78196d61498db066de6e355eabcebbd39071) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Standardize utility class names to match CSS property syntax

  **BREAKING**: All utility class names now use CSS-standard property names instead of abbreviated Tailwind-style names. This affects the generated CSS class names.

  ### Border Color Utilities
  - `border-t-color` → `border-top-color`
  - `border-r-color` → `border-right-color`
  - `border-b-color` → `border-bottom-color`
  - `border-l-color` → `border-left-color`
  - `border-s-color` → `border-inline-start-color`
  - `border-e-color` → `border-inline-end-color`

  ### Scroll Utilities
  - `scroll-m` → `scroll-margin`
  - `scroll-mt` → `scroll-margin-top`
  - `scroll-mr` → `scroll-margin-right`
  - `scroll-mb` → `scroll-margin-bottom`
  - `scroll-ml` → `scroll-margin-left`
  - `scroll-mx` → `scroll-margin-x`
  - `scroll-my` → `scroll-margin-y`
  - `scroll-ms` → `scroll-margin-inline-start`
  - `scroll-me` → `scroll-margin-inline-end`
  - `scroll-p` → `scroll-padding`
  - `scroll-pt` → `scroll-padding-top`
  - `scroll-pr` → `scroll-padding-right`
  - `scroll-pb` → `scroll-padding-bottom`
  - `scroll-pl` → `scroll-padding-left`
  - `scroll-px` → `scroll-padding-x`
  - `scroll-py` → `scroll-padding-y`
  - `scroll-ps` → `scroll-padding-inline-start`
  - `scroll-pe` → `scroll-padding-inline-end`

  ### Grid Utilities
  - `grid-cols` → `grid-template-columns`
  - `grid-rows` → `grid-template-rows`
  - `col` → `grid-column`
  - `col-span` → `grid-column-span`
  - `col-start` → `grid-column-start`
  - `col-end` → `grid-column-end`
  - `row` → `grid-row`
  - `row-span` → `grid-row-span`
  - `row-start` → `grid-row-start`
  - `row-end` → `grid-row-end`
  - `auto-cols` → `grid-auto-columns`
  - `auto-rows` → `grid-auto-rows`
  - `grid-flow` → `grid-auto-flow`

  ### Flex Utilities
  - `grow` → `flex-grow`
  - `shrink` → `flex-shrink`
  - `basis` → `flex-basis`

  ### Align Utilities
  - `content` → `align-content`
  - `items` → `align-items`
  - `self` → `align-self`

  ### Justify Utilities
  - `justify` → `justify-content`

  ### Transition Utilities
  - `transition` → `transition-property`
  - `duration` → `transition-duration`
  - `ease` → `transition-timing-function`
  - `delay` → `transition-delay`

  ### Transform Utilities
  - `backface` → `backface-visibility`
  - `origin` → `transform-origin`

  ### Inset Utilities
  - `start` → `inset-inline-start`
  - `end` → `inset-inline-end`

  ### Typography Utilities
  - `underline-offset` → `text-underline-offset`
  - `text-decoration` → `text-decoration-line`

  ### Box Utilities
  - `box-decoration` → `box-decoration-break`

  ### Outline Utilities
  - `outline` → `outline-width`

  Migration: Update any CSS class references in your templates from the old abbreviated names to the new CSS-standard names.

### Patch Changes

- Updated dependencies [[`8460f16`](https://github.com/styleframe-dev/styleframe/commit/8460f169cec1199810e9203b357dac9f2f128c56)]:
  - @styleframe/core@2.6.0

## 2.3.0

### Minor Changes

- [#74](https://github.com/styleframe-dev/styleframe/pull/74) [`2a1bbbe`](https://github.com/styleframe-dev/styleframe/commit/2a1bbbe67afb454c16abf9be64c4d5cea51575e4) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add useEasing composable for animation timing functions

  Introduces `useEasing()` with comprehensive defaults including CSS keywords, 24 cubic-bezier curves from easings.net, and linear() functions for spring and bounce effects.

- [#78](https://github.com/styleframe-dev/styleframe/pull/78) [`7c4f098`](https://github.com/styleframe-dev/styleframe/commit/7c4f0988f3767f358f231571e6a3734426d1050c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: Add padding-x, padding-y, margin-x, and margin-y utilities

  Add Tailwind-style shorthand utilities for horizontal and vertical spacing:
  - `usePaddingXUtility` - sets padding-left and padding-right
  - `usePaddingYUtility` - sets padding-top and padding-bottom
  - `useMarginXUtility` - sets margin-left and margin-right
  - `useMarginYUtility` - sets margin-top and margin-bottom

  These complement the existing CSS logical property variants (`-inline`, `-block`).

- [#75](https://github.com/styleframe-dev/styleframe/pull/75) [`72bb1f6`](https://github.com/styleframe-dev/styleframe/commit/72bb1f64aae1531496c5e7398c4bd3c11f5433f9) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add Tailwind-style utility functions

  Add `createUseUtility` factory function and 15 utility categories (accessibility, backgrounds, borders, effects, filters, flexbox-grid, interactivity, layout, sizing, spacing, svg, tables, transforms, transitions-animation, typography) for generating composable CSS utility classes.

### Patch Changes

- [#76](https://github.com/styleframe-dev/styleframe/pull/76) [`06afe2a`](https://github.com/styleframe-dev/styleframe/commit/06afe2af66c3ecd8c6a516336e594c1e8cb56de1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - **BREAKING**: rename `useUtilities` to `useUtilitiesPreset` for consistency with design tokens preset naming

  Renamed `useUtilities()` to `useUtilitiesPreset()` to align with the naming convention established by `useDesignTokensPreset()`. The function registers all ~180 utility composables with a Styleframe instance and returns their creator functions, enabling automatic utility class generation for recipe declarations.

  Updated recipe documentation examples to use `useUtilitiesPreset()` with destructured functions and demonstrate both `ref()` and `@variable.name` syntax for referencing design tokens.

- Updated dependencies [[`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389)]:
  - @styleframe/core@2.5.0

## 2.2.0

### Minor Changes

- [#68](https://github.com/styleframe-dev/styleframe/pull/68) [`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for dot notation in variable names

### Patch Changes

- Updated dependencies [[`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec)]:
  - @styleframe/core@2.3.0

## 2.1.0

### Minor Changes

- [`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - chore: update dependencies

### Patch Changes

- Updated dependencies [[`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b)]:
  - @styleframe/core@2.2.0

## 2.0.2

### Patch Changes

- [`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: update license package version

- [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update package dependencies

- Updated dependencies [[`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182), [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3)]:
  - @styleframe/core@2.0.2

## 2.0.1

### Patch Changes

- [#52](https://github.com/styleframe-dev/styleframe/pull/52) [`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix(cli): update install version

- Updated dependencies [[`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae)]:
  - @styleframe/core@2.0.1

## 2.0.0

### Minor Changes

- [#50](https://github.com/styleframe-dev/styleframe/pull/50) [`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add license check integration

### Patch Changes

- Updated dependencies [[`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356)]:
  - @styleframe/core@1.1.0

## 1.0.3

### Patch Changes

- [#43](https://github.com/styleframe-dev/styleframe/pull/43) [`7e3d008`](https://github.com/styleframe-dev/styleframe/commit/7e3d00849067618802334d5e6823fc31f3aa2612) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for generic records in createUseVariable

## 1.0.2

### Patch Changes

- [`173a814`](https://github.com/styleframe-dev/styleframe/commit/173a814b09e24e4c14dff77651a9845bd101b625) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update release folders

## 1.0.1

### Patch Changes

- Update README.md
- Updated dependencies
  - @styleframe/core@1.0.1

## 1.0.0

### Major Changes

- 8204e6d: Official styleframe release. Start writing modern, clean, composable CSS using TypeScript, with a focus on simplicity and performance.

### Patch Changes

- Updated dependencies [8204e6d]
  - @styleframe/core@1.0.0
