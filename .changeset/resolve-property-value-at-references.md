---
"@styleframe/core": patch
"styleframe": patch
---

Add `@variablename` reference support in `variable()` values, `ref()` fallbacks, and `selector()` declaration values

- `variable('name', '1px solid @color.primary')` resolves embedded `@` references to a CSS object with mixed text and reference parts
- `ref('name', '@fallbackvar')` resolves `@`-prefixed fallback values to nested references
- `selector({ border: "1px solid @color.primary" })` resolves embedded `@` references in declaration values
- Extract shared `resolvePropertyValue()` utility for consistent `@` reference resolution across all contexts
