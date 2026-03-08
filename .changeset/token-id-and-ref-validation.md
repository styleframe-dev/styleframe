---
"@styleframe/core": minor
"@styleframe/scanner": patch
"@styleframe/transpiler": patch
"styleframe": minor
---

Add unique id to token types, validate @ references, and resolve utility sibling keys

- Add unique `id` field to Root, Selector, AtRule, Theme, and Utility token types for stable identity tracking
- Validate `@`-prefixed string references against root-level variables in `parseDeclarationsBlock`, throwing descriptive errors for undefined variables
- Add null/undefined guard to `ref()` with clear error messages
- Support `@`-prefixed values in utility entries that resolve to sibling keys (e.g., `{ default: "@solid", solid: "solid" }`)
