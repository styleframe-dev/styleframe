# @styleframe/plugin

## 2.4.1

### Patch Changes

- [#113](https://github.com/styleframe-dev/styleframe/pull/113) [`b73095f`](https://github.com/styleframe-dev/styleframe/commit/b73095f114ef41158ab552e2784500215393b294) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Improve color previews and HMR handling
  - Fix caching configuration in loader to use fsCache and moduleCache options
  - Add HMR refetch handling for .styleframe.css virtual imports
  - Update SwatchCard styling with proper footer alignment and better contrast

- [#111](https://github.com/styleframe-dev/styleframe/pull/111) [`152d221`](https://github.com/styleframe-dev/styleframe/commit/152d221934ed3c86e76c31229a8925152081243c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Fix HMR for virtual imports by normalizing file paths and adding fallback full-reload

- Updated dependencies [[`b73095f`](https://github.com/styleframe-dev/styleframe/commit/b73095f114ef41158ab552e2784500215393b294)]:
  - @styleframe/loader@2.4.1

## 2.4.0

### Minor Changes

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

- [`4e06424`](https://github.com/styleframe-dev/styleframe/commit/4e064245e78903307e6996eebf3f6dae5565de5f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: add Nuxt 4 compatibility

  Updated `@nuxt/kit` and `@nuxt/schema` dependencies to v4.1.3 via the nuxt catalog. Peer dependencies now accept both `^3 || ^4` to support Nuxt 3 and Nuxt 4 projects.

- Updated dependencies [[`8460f16`](https://github.com/styleframe-dev/styleframe/commit/8460f169cec1199810e9203b357dac9f2f128c56)]:
  - @styleframe/loader@2.4.0
  - @styleframe/transpiler@2.6.0

## 2.3.1

### Patch Changes

- [#88](https://github.com/styleframe-dev/styleframe/pull/88) [`0b20658`](https://github.com/styleframe-dev/styleframe/commit/0b20658bb2b8362286ac8d955dfbc961b68d4aec) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: add Nuxt 4 compatibility

  Updated `@nuxt/kit` and `@nuxt/schema` dependencies to v4.1.3 via the nuxt catalog. Peer dependencies now accept both `^3 || ^4` to support Nuxt 3 and Nuxt 4 projects.

## 2.3.0

### Minor Changes

- [#72](https://github.com/styleframe-dev/styleframe/pull/72) [`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for .styleframe file imports

### Patch Changes

- Updated dependencies [[`ff1a689`](https://github.com/styleframe-dev/styleframe/commit/ff1a689f36dc4294b2a7353949c6efd220451e9d), [`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389)]:
  - @styleframe/transpiler@2.5.0
  - @styleframe/loader@2.3.0

## 2.2.0

### Minor Changes

- [#63](https://github.com/styleframe-dev/styleframe/pull/63) [`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add styleframe runtime for recipes

### Patch Changes

- Updated dependencies [[`ec430e1`](https://github.com/styleframe-dev/styleframe/commit/ec430e11502b3dba69c20ee10b24f0302008883c)]:
  - @styleframe/transpiler@2.4.0

## 2.1.0

### Minor Changes

- [`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - chore: update dependencies

### Patch Changes

- Updated dependencies [[`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b)]:
  - @styleframe/transpiler@2.2.0
  - @styleframe/loader@2.2.0

## 2.0.2

### Patch Changes

- [`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: update license package version

- [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update package dependencies

- Updated dependencies [[`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182), [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3)]:
  - @styleframe/loader@2.0.2
  - @styleframe/transpiler@2.0.2

## 2.0.1

### Patch Changes

- [#52](https://github.com/styleframe-dev/styleframe/pull/52) [`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix(cli): update install version

- Updated dependencies [[`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae)]:
  - @styleframe/loader@2.0.1
  - @styleframe/transpiler@2.0.1

## 1.1.0

### Minor Changes

- [#50](https://github.com/styleframe-dev/styleframe/pull/50) [`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add license check integration

### Patch Changes

- Updated dependencies [[`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356)]:
  - @styleframe/transpiler@1.1.0
  - @styleframe/loader@1.1.0

## 1.0.1

### Patch Changes

- [#35](https://github.com/styleframe-dev/styleframe/pull/35) [`5d53569`](https://github.com/styleframe-dev/styleframe/commit/5d5356960af687884703f3de5d3d1638d8ee9d8a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: Update published files references in package.json

- Updated dependencies [[`5d53569`](https://github.com/styleframe-dev/styleframe/commit/5d5356960af687884703f3de5d3d1638d8ee9d8a)]:
  - @styleframe/loader@1.0.3
  - @styleframe/transpiler@1.0.3

## 1.0.0

### Major Changes

- [#30](https://github.com/styleframe-dev/styleframe/pull/30) [`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: Initial release. Add `unplugin` instance with dedicated Vite support

### Patch Changes

- Updated dependencies [[`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35), [`68cd004`](https://github.com/styleframe-dev/styleframe/commit/68cd004b04395797876b5e805c0b910d6b665f35)]:
  - @styleframe/loader@1.0.2
  - @styleframe/transpiler@1.0.2
