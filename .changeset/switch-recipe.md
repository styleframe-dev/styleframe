---
"@styleframe/theme": minor
"styleframe": minor
---

Add Switch and SwitchField recipes.

Adds two form-control recipes built on the native `<input type="checkbox" role="switch">`. The `useSwitchFieldRecipe()` composable styles a pill-shaped track with a sliding white knob; `:checked` recolors the track to `@color.primary` and translates the knob, `:focus-visible` shows a focus ring, and `:disabled` dims the control — all driven by native pseudo-classes with zero runtime JavaScript. The `useSwitchRecipe()` composable wraps the label with inline layout, gap, and label typography. Both support `light`, `dark`, and `neutral` surface colors and `sm` / `md` / `lg` sizes.
