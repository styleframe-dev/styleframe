# styleframe

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
