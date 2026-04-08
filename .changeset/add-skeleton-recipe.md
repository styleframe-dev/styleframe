---
"@styleframe/theme": minor
"styleframe": minor
"@styleframe/core": patch
---

Add Skeleton recipe with pulse animation and supporting utilities

- Add `useSkeletonRecipe` with size (`xs`, `sm`, `md`, `lg`, `xl`) and rounded (`true`, `false`) variants, pulse animation, and dark mode support
- Add granular animation utilities: `useAnimationNameUtility`, `useAnimationDurationUtility`, `useAnimationTimingFunctionUtility`, `useAnimationIterationCountUtility`
- Switch `useWidthUtility` and `useHeightUtility` to `createUseSpacingUtility` for `@N` multiplier support
- Add compound keyframe selector support in core engine (e.g. `"0%, 100%"`)
- Add Skeleton storybook component, grid previews, and stories
- Add Skeleton documentation page
