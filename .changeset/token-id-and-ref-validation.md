---
"@styleframe/core": minor
"@styleframe/scanner": patch
"@styleframe/transpiler": patch
"styleframe": minor
---

Add unique id and parent-child traversal to token types, validate @ references, and resolve utility sibling keys

- Add unique `id` field to Root, Selector, AtRule, Theme, Utility, Modifier, and Variable token types for stable identity tracking
- Add `parentId` to track parent-child relationships across the token tree
- Add `root._registry` for efficient id-based lookups and tree traversal
- Validate `@`-prefixed string references against root-level variables in `parseDeclarationsBlock`, throwing descriptive errors for undefined variables
- Add null/undefined guard to `ref()` with clear error messages
- Support `@`-prefixed values in utility entries that resolve to sibling keys (e.g., `{ default: "@solid", solid: "solid" }`)
