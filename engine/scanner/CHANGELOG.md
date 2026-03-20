# @styleframe/scanner

## 3.1.0

### Minor Changes

- [#129](https://github.com/styleframe-dev/styleframe/pull/129) [`2610041`](https://github.com/styleframe-dev/styleframe/commit/2610041beb03a8afc8de17af8857b9931f3359b0) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add custom utility syntax support and separate class name generation from CSS escaping
  - Extract `defaultUtilitySelectorFn` to `@styleframe/core` returning raw class names; add `classNameToCssSelector` for consistent CSS escaping
  - Add `ScannerUtilitiesConfig` with pluggable `pattern`, `parse`, and `selector` functions for custom utility naming conventions
  - Thread custom utilities config through extractor, matcher, scanner, and plugin layers

### Patch Changes

- [#133](https://github.com/styleframe-dev/styleframe/pull/133) [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add unique id and parent-child traversal to token types, validate @ references, and resolve utility sibling keys
  - Add unique `id` field to Root, Selector, AtRule, Theme, Utility, Modifier, and Variable token types for stable identity tracking
  - Add `parentId` to track parent-child relationships across the token tree
  - Add `root._registry` for efficient id-based lookups and tree traversal
  - Validate `@`-prefixed string references against root-level variables in `parseDeclarationsBlock`, throwing descriptive errors for undefined variables
  - Add null/undefined guard to `ref()` with clear error messages
  - Support `@`-prefixed values in utility entries that resolve to sibling keys (e.g., `{ default: "@solid", solid: "solid" }`)

- Updated dependencies [[`295f04e`](https://github.com/styleframe-dev/styleframe/commit/295f04e6fdd011df6437986cc179e17efd8cd1be), [`71009c2`](https://github.com/styleframe-dev/styleframe/commit/71009c2c0a07a0bfd240e70e61020c8b7e923edb), [`2610041`](https://github.com/styleframe-dev/styleframe/commit/2610041beb03a8afc8de17af8857b9931f3359b0), [`7a61df0`](https://github.com/styleframe-dev/styleframe/commit/7a61df083bc534caa9271a1ef4535f7be979d7c2), [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f)]:
  - @styleframe/core@3.1.0

## 3.0.0

### Major Changes

- [#117](https://github.com/styleframe-dev/styleframe/pull/117) [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0
