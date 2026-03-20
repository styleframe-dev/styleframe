---
"@styleframe/core": patch
"styleframe": patch
---

Add `@variablename` notation support in `css` template literals

- `@variablename` strings in static parts of `css` template literals are automatically converted to variable references: `` css`1px solid @color.primary` `` resolves `@color.primary` to `ref("color.primary")`
- Supports dotted names (e.g., `@color.primary.500`) and multiple references per segment (e.g., `` css`@spacing.x @spacing.y` ``)
