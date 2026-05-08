---
"@styleframe/theme": major
"styleframe": major
---

Unify fluid and fixed font sizes under `useFontSizeDesignTokens`. Tuple `[min, max]` and object `{ min, max }` values are now treated as **absolute pixel ranges** and routed through `useFluidClamp`; plain `TokenValue` values stay static. The same call accepts mixed fluid + fixed entries.

```ts
useFontSizeDesignTokens(s, {
    default: '@font-size.md',
    md: [16, 18],                 // fluid
    sm: '0.8rem',                 // fixed
    lg: { min: 18, max: 24 },     // fluid (object form)
});
```

Breaking changes:

- `useFluidFontSizeDesignTokens` is removed. Pass ranges directly to `useFontSizeDesignTokens` instead.
- The runtime `font-size.min` / `font-size.max` variables (plus `fontSizeMin` / `fontSizeMax` on the preset result) are no longer emitted; absolute pixel values are baked into each fluid `calc()` expression.
- `useDesignTokensPreset`'s `fluidFontSize.values` config now expects the unified `FontSizeValue` (`TokenValue | RangeInput<TokenValue>`) per key. Existing `[min, max]` / `{ min, max }` shapes still work but are interpreted as **absolute pixels**, not multipliers of a base.
- When `fluidFontSize` is enabled and the user passes their own `fontSize` config, those values now win over the fluid defaults instead of being silently dropped.
- `fontSizeValues` is renamed to `fontSizeStaticValues`; a new `getFontSizeFluidValues(s, base)` builder produces the fluid-aware defaults.

Internal: `createUseVariable` gains a `fluid?: boolean` opt-in flag plus a `breakpoint` options-bag arg on the returned composable, so any composable can adopt range-aware values with a single line.
