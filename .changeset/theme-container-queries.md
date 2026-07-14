---
"@styleframe/theme": minor
---

Add first-class container-query support: `useContainerQueryModifiers` (container-sm/md/lg/xl/2xl, mirroring the media-preference modifiers) and `useContainerTypeUtility`/`useContainerNameUtility` for `container-type`/`container-name` setup. Both are registered in `useModifiersPreset`/`useUtilitiesPreset`. Container units (`cqi`/`cqb`/`cqw`/`cqh`) work as raw token values with no extra API. Purely additive — the raw `atRule('container', …)` path is unchanged.
