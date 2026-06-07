---
"@styleframe/docs": patch
---

Restructure the theme docs subnav into four tabs (Design Tokens, Elements, Components, Utilities), each rendering a slice of the existing theme navigation tree while keeping the `/docs/theme/...` URLs unchanged. Flatten the per-section content by dropping the nested `02.composables` folders and regroup components and elements into categorized directories (actions, navigation, feedback, forms, overlays, layout, ai-chat; typography, inline-text, media, etc.). Add a `cosmeticRoutes` Nuxt module with `foldCosmeticCategories` helpers so the reorganized URLs resolve, and rename the `presets` pages to `preset`.
