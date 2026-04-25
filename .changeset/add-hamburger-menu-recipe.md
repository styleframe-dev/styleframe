---
"@styleframe/theme": minor
"styleframe": minor
---

Add HamburgerMenu recipe with toggle button, animations, tests, and documentation

- Add `useHamburgerMenuRecipe` icon-toggle button recipe with 3 colors (light, dark, neutral), 3 sizes (sm, md, lg), 7 open-state animations (close, arrow-{up,down,left,right}, minus, plus), and a boolean `active` axis
- Inner bars rendered via `.hamburger-menu-inner` + `::before`/`::after` pseudo-elements; per-size dimensions and per-animation transforms registered via `setup(s)` callback
- Add HamburgerMenu Storybook stories with all-variants and all-sizes preview grids, plus per-color, per-size, per-animation, and disabled/active stories
- Add HamburgerMenu documentation page with usage examples, accessibility guidance (`aria-expanded`, `aria-label`), API reference, and best practices
