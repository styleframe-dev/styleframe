---
"@styleframe/theme": minor
"styleframe": minor
---

The built-in `dark` modifier is now theme-driven. It no longer emits `@media (prefers-color-scheme: dark)`; `_dark:` / `&:dark` now respond solely to `.dark-theme` / `[data-theme="dark"]`, matching the values set by the `dark` theme. This fixes light surfaces showing inverted (unreadable) text when the OS is in dark mode but no `data-theme` is set.

Migration: to follow the operating-system preference, mirror it into `data-theme` — e.g. `window.matchMedia('(prefers-color-scheme: dark)')` → set `document.documentElement.dataset.theme`. See the theme-switcher guide.
