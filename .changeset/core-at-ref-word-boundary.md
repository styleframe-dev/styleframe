---
"@styleframe/core": patch
"styleframe": patch
---

Boundary-guard `@`-reference parsing so a `@` mid-token is a literal, not a reference. `AT_VARIABLE_REGEX` matched `@` anywhere in a string, so a retina URL like `url("image@2x.png")` parsed `@2x.png` as a variable reference — silently emitting a dead `var(--2x--png)` before SF-13, and *throwing* `Variable "2x.png" is not defined` after SF-13 tightened ref validation. The regex now requires a non-word boundary before `@` (`(?<!\w)`), so `@` only starts a reference when not preceded by a word character. Genuine leading-`@` refs (`@color.primary`, `1px solid @spacing.sm`, `@border.width solid @color.primary`) are unchanged, byte for byte; only `@`-mid-token literals change — from broken/throwing to passthrough.
