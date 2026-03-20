---
'@styleframe/core': minor
'@styleframe/scanner': minor
'@styleframe/plugin': minor
'styleframe': minor
---

Add custom utility syntax support and separate class name generation from CSS escaping

- Extract `defaultUtilitySelectorFn` to `@styleframe/core` returning raw class names; add `classNameToCssSelector` for consistent CSS escaping
- Add `ScannerUtilitiesConfig` with pluggable `pattern`, `parse`, and `selector` functions for custom utility naming conventions
- Thread custom utilities config through extractor, matcher, scanner, and plugin layers
