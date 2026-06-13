---
"@styleframe/theme": minor
"styleframe": minor
---

Add `select` recipe — a 7-part multi-select form control.

Adds `useSelectRecipe`, `useSelectPanelRecipe`, `useSelectOptionRecipe`, `useSelectChipRecipe`, `useSelectArrowRecipe`, `useSelectLabelRecipe`, and `useSelectSeparatorRecipe` to `@styleframe/theme`. The trigger follows the Input recipe's structure (color: light/dark/neutral, size, invalid/disabled/readonly states) with a `solid`/`soft`/`ghost` variant axis, the panel and options mirror Dropdown (solid/soft/subtle), and the chips mirror Badge (Container-3 palette) with a nested `.select-chip-remove` dismiss button. The chevron rotates via `.-open`/`data-open`.

Supports both single- and multi-selection. A shared `.select-icon` slot adds a leading icon/media element (e.g. a country flag) to the trigger's selected value, options, and chips. Selected options are driven by `aria-selected`, with the `.select-option-check` indicator pinned to the trailing edge so the leading edge is free for an icon.
