---
"@styleframe/theme": minor
"styleframe": minor
---

Update color palette for accessibility and show hex values in swatches

- Revise base color values to OKLCH-aligned accessible colors for both light and dark modes
- Remove per-color `text.on-*` tokens in favor of a single `colorTextInverted` reference
- Display computed hex values inside color swatch previews
- Add `color.<name>` labels below each swatch with monospace styling
