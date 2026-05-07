---
"@styleframe/theme": minor
"styleframe": minor
---

Add `PageHero` recipe — a multi-part composable for full-width hero sections with color, size, orientation, alignment, and reverse axes

- New recipes: `usePageHeroRecipe`, `usePageHeroBodyRecipe`, `usePageHeroHeadlineRecipe`, `usePageHeroTitleRecipe`, `usePageHeroDescriptionRecipe`, `usePageHeroActionsRecipe`, `usePageHeroLinksRecipe`, `usePageHeroImageRecipe`
- Container exposes `color` (`light`/`dark`/`neutral` with adaptive dark mode), `size` (`sm`/`md`/`lg`), `orientation` (`vertical`/`horizontal`), `alignment` (`start`/`center`/`end`), and `reverse` axes
- Sub-recipes mirror the `size` and `alignment` axes and override alignment to `start` in horizontal orientation for correct two-column layout
- Adds a generic `useFilterUtility` and registers it in `useUtilitiesPreset`
