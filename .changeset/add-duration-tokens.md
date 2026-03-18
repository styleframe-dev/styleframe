---
"@styleframe/theme": minor
"styleframe": minor
---

Add duration design tokens for consistent animation and transition timing

- Add `useDuration` composable with semantic duration scale from `instant` (0ms) through `slowest` (1000ms)
- Add `durationValues` default token values: instant, fastest, faster, fast, normal, slow, slower, slowest
- Register `duration` domain in `useDesignTokensPreset` with full theming and override support
- Add `duration` namespace to `useTransitionDurationUtility` and `useTransitionDelayUtility` for `@token` references
- Replace hardcoded `150ms` with `@duration.fast` in `useTransitionPropertyUtility`
