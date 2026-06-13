---
"@styleframe/theme": minor
"styleframe": minor
---

Add `context-menu` recipe — a 6-part right-click context menu.

Adds `useContextMenuRecipe`, `useContextMenuItemRecipe`, `useContextMenuSubTriggerRecipe`, `useContextMenuLabelRecipe`, `useContextMenuSeparatorRecipe`, and `useContextMenuShortcutRecipe` to `@styleframe/theme`. The panel and item styling mirror the Dropdown family (color: light/dark/neutral, variant: solid/soft/subtle, size: sm/md/lg), with a sub-trigger arrow indicator and an inline keyboard shortcut slot.

Extracts shared menu-surface logic into `createMenuRecipe.ts` in the dropdown folder, which the Dropdown, Select panel, and Context Menu recipes all now delegate to — eliminating ~1100 lines of duplicated compound-variant declarations.
