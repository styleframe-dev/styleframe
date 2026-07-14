---
"@styleframe/theme": minor
---

Add built-in responsive breakpoint modifiers: `useResponsiveModifiers` (`sm`/`md`/`lg`/`xl`/`2xl`), the viewport-scoped twin of the container-query modifiers. A `_md:padding:xl` prefix now resolves to a real `@media (min-width: …)` block out of the box, so the Tailwind-style responsive vocabulary lines up. One modifier per breakpoint, each closing over its own width from the shared `breakpointValues` scale (576/768/992/1200/1440) — the same source of truth the container-query modifiers use, keeping `_md:` and `_container-md:` aligned. Registered in `useModifiersPreset` (toggle via `responsive: false`). Purely additive — no existing output changes.
