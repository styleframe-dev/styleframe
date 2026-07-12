---
"@styleframe/theme": patch
"styleframe": patch
---

Fix inset utilities dropping the spacing multiplier scale. The nine inset composables (`inset`, `inset-x`, `inset-y`, `inset-inline-start`, `inset-inline-end`, `top`, `right`, `bottom`, `left`) were plain `createUseUtility`, so a numeric ref like `@0.5` fell through to a bare lookup for a non-existent `0.5` variable and silently emitted an undefined `var(--0--5)`. They now use `createUseSpacingUtility(..., { namespace: "spacing" })` like `margin`/`padding`/`height`, so `@0.5` resolves to `calc(var(--spacing) * 0.5)`. Object-syntax literals and preset `undefined` calls are unchanged — purely a fix for numeric-multiplier insets. Note: existing `@spacing.xs` inset usages shorten the utility class key `spacing.xs` → `xs` (resolved var identical), matching margin.
