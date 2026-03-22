---
"@styleframe/theme": minor
"@styleframe/figma": minor
"styleframe": minor
---

Flatten design tokens preset result and rename variable composables

- Rename all variable composables from `use{Name}` to `use{Name}DesignTokens` for clearer naming
- Flatten `useDesignTokensPreset` result so variables are directly destructurable instead of nested by domain
- Add OKLCH gamut mapping utilities for color processing
- Add color reference value support so colors can reference generated shade/tint variants
- Add border, transition, and animation utility implementations
