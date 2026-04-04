---
"@styleframe/theme": minor
"styleframe": minor
---

Add ButtonGroup recipe for grouping buttons with joined borders

- Add `useButtonGroupRecipe` with orientation (`horizontal`, `vertical`) and block (`true`, `false`) variants
- Use compound variant `className` with RSCSS modifiers (`-horizontal`, `-vertical`, `-block`) to emit helper classes
- Use `setup` callback to register nested selectors for joined-button effects (border-radius and border removal on inner children)
- Add ButtonGroup storybook component, grid preview, and stories
