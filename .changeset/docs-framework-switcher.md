---
"@styleframe/docs": patch
---

Add a persistent framework switcher to the docs sidebar (Vue, React, Vanilla / Other) backed by `useFramework()` with localStorage persistence. Replace inline `tabs-item` blocks with a shared `<FrameworkSwitcher>` content component across both getting-started guides and all 20 composable recipe docs, and add a vanilla TS + HTML `#other` slot to every composable doc showing the recipe's framework-agnostic class-string output.
