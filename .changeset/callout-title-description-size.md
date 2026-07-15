---
"@styleframe/theme": minor
---

Add `useCalloutTitleRecipe` (`callout-title`) and `useCalloutDescriptionRecipe` (`callout-description`) sub-part recipes, giving the callout the same per-size type scheme the toast recipe lands with so the two siblings stay visually consistent. The title tracks the `size` axis on the literal token (`sm` → `sm`, `md` → `md`, `lg` → `lg`); the description sits one token below at every step (`sm` → `xs`, `md` → `sm`, `lg` → `md`), default `md`. Values are copied from the toast recipe's landed source so the two recipes can't drift. Purely additive.
