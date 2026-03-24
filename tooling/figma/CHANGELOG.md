# @styleframe/figma

## 1.1.0

### Minor Changes

- [#149](https://github.com/styleframe-dev/styleframe/pull/149) [`b9e54ed`](https://github.com/styleframe-dev/styleframe/commit/b9e54eda1acbf1b1b256f96bf6306dc300602618) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Flatten design tokens preset result and rename variable composables
  - Rename all variable composables from `use{Name}` to `use{Name}DesignTokens` for clearer naming
  - Flatten `useDesignTokensPreset` result so variables are directly destructurable instead of nested by domain
  - Add OKLCH gamut mapping utilities for color processing
  - Add color reference value support so colors can reference generated shade/tint variants
  - Add border, transition, and animation utility implementations

### Patch Changes

- Updated dependencies [[`cc4f170`](https://github.com/styleframe-dev/styleframe/commit/cc4f170c56ad2e246b94ab4d64b7f6c3097c7223)]:
  - @styleframe/core@3.2.0

## 1.0.1

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0
