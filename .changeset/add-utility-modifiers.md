---
"@styleframe/theme": minor
"styleframe": minor
---

Add utility modifier composables with auto-registration in useUtilitiesPreset

- Add 68 modifiers across 8 categories: pseudo-states, form states, structural, pseudo-elements, media preferences, ARIA states, directional, and other states
- Each modifier is individually importable (e.g., `useHoverModifier`, `useDisabledModifier`)
- Grouped composables available for convenience (e.g., `usePseudoStateModifiers`)
- Per-category configuration to enable/disable modifier groups via `ModifiersConfig`
