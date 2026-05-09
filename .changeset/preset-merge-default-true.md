---
"@styleframe/theme": minor
---

**BREAKING**: `useDesignTokensPreset` and `useUtilitiesPreset` now merge custom values with defaults by default.

Previously, supplying a custom record for a domain replaced that domain's defaults entirely:

```ts
useDesignTokensPreset(s, {
  colors: { brand: '#ff6600' },
});
// Old behavior: only `colorBrand` exists; default colors and border colors were dropped.
```

The user-facing intent of partial overrides is almost always "merge with defaults", so this is now the default. The opt-in `meta: { merge: true }` is no longer needed; `meta: { merge: false }` is the explicit opt-out for the previous replace behavior.

```ts
useDesignTokensPreset(s, {
  colors: { brand: '#ff6600' },
});
// New behavior: all default colors plus `colorBrand`; border colors keep working.

useDesignTokensPreset(s, {
  meta: { merge: false },
  colors: { brand: '#ff6600' },
});
// Restores the previous replace behavior.
```

The same flip applies transitively to `useShorthandUtilitiesPreset`, which delegates to `useUtilitiesPreset`.

Migration: drop `meta: { merge: true }` from any existing config (it's now a no-op). If you previously relied on a custom record replacing defaults, add `meta: { merge: false }` to that call.
