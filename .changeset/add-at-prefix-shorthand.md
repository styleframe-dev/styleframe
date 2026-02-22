---
"@styleframe/core": minor
"styleframe": minor
---

Add @-prefixed string reference shorthand and fix keyframes object API

- Add `@`-prefixed string reference shorthand for inline token references in declarations (e.g., `"@color.primary"`)
- Fix keyframes object API outputting `[object Object]` by parsing percentage, `from`, and `to` keys as nested selectors
- Prevent namespace double-prepending for `@`-prefixed values in utilities and defaults
