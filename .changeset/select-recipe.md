---
"@styleframe/theme": minor
"styleframe": minor
---

Add `select` recipe — a 7-part multi-select form control.

Adds `useSelectRecipe`, `useSelectPanelRecipe`, `useSelectOptionRecipe`, `useSelectChipRecipe`, `useSelectArrowRecipe`, `useSelectLabelRecipe`, and `useSelectSeparatorRecipe` to `@styleframe/theme`. The trigger mirrors the Input recipe (color: light/dark/neutral, variant: solid/soft/ghost, size, and invalid/disabled/readonly states), the panel and options mirror Dropdown (solid/soft/subtle), and the chips mirror Badge (Container-3 palette) with a nested `.select-chip-remove` dismiss button. Selected options are styled via `aria-selected`; the chevron rotates via `.-open`/`data-open`.

Also renames the Input recipe's `variant: "default"` to `variant: "solid"` for vocabulary consistency with Dropdown, Badge, and the new Select trigger.
