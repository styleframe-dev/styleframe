---
"@styleframe/theme": minor
"styleframe": minor
---

Add per-part borders with adjacency collapsing to Card recipe

- Add independent `borderTop` and `borderBottom` to each card part (header, body, footer) with compound variants per color×variant
- Add `:first-child` / `:last-child` collapse selectors to header and footer recipes to remove duplicate borders at card edges
- Extend `createUseRecipe` with an optional `setup` callback for registering selectors alongside recipes
- Add `color` and `variant` props to `CardBody` component
