---
"@styleframe/theme": minor
---

Add InputDate recipe.

Adds `useInputDateRecipe` and `useInputDateSegmentRecipe` to `@styleframe/theme` for building segmented date/time inputs. The wrapper is a member of the field recipes family (built on `createFieldRecipe`), supporting `light` / `dark` / `neutral` colors, `default` / `soft` / `ghost` variants, `sm` / `md` / `lg` sizes, and the `invalid` / `disabled` / `readonly` boolean axes; it owns the field surface (border, background, focus ring via `:focus-within`) and lays the segments out as a horizontal `.input-date-field` row with muted `.input-date-separator` glyphs. The segment recipe styles each individually-focusable part (day, month, year, hour, minute) as a transparent, tabular-figure cell that inherits typography from the wrapper and paints a highlight on `:focus`, with a single `size` axis. Both composables are re-exported from the `@styleframe/theme` barrel.
