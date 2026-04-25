---
"@styleframe/theme": minor
"styleframe": minor
---

Add Dropdown recipe with item, separator, label, arrow, tests, and documentation

- Add `useDropdownRecipe` container recipe with 3 colors (light, dark, neutral), 3 visual styles (solid, soft, subtle), and 3 sizes (sm, md, lg) — uses `@z-index.dropdown` for surface stacking
- Add `useDropdownItemRecipe` for clickable menu options with hover, focus, active, and disabled states across all color × variant combinations
- Add `useDropdownSeparatorRecipe` for visual dividers between item groups (color axis only)
- Add `useDropdownLabelRecipe` for uppercase muted group headings (color and size axes)
- Add `useDropdownArrowRecipe` using the CSS border-triangle technique — points upward by default to sit above the panel, registers an `@dropdown.arrow.size` variable (default `6px`)
- Add Dropdown documentation page with usage examples, anatomy, accessibility guidance (menu/menuitem/separator roles, keyboard navigation, roving tabindex), API reference, and FAQ
