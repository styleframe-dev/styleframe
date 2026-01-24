---
"@styleframe/theme": major
---

Standardize utility class names to match CSS property syntax

**BREAKING**: All utility class names now use CSS-standard property names instead of abbreviated Tailwind-style names. This affects the generated CSS class names.

### Border Color Utilities
- `border-t-color` → `border-top-color`
- `border-r-color` → `border-right-color`
- `border-b-color` → `border-bottom-color`
- `border-l-color` → `border-left-color`
- `border-s-color` → `border-inline-start-color`
- `border-e-color` → `border-inline-end-color`

### Scroll Utilities
- `scroll-m` → `scroll-margin`
- `scroll-mt` → `scroll-margin-top`
- `scroll-mr` → `scroll-margin-right`
- `scroll-mb` → `scroll-margin-bottom`
- `scroll-ml` → `scroll-margin-left`
- `scroll-mx` → `scroll-margin-x`
- `scroll-my` → `scroll-margin-y`
- `scroll-ms` → `scroll-margin-inline-start`
- `scroll-me` → `scroll-margin-inline-end`
- `scroll-p` → `scroll-padding`
- `scroll-pt` → `scroll-padding-top`
- `scroll-pr` → `scroll-padding-right`
- `scroll-pb` → `scroll-padding-bottom`
- `scroll-pl` → `scroll-padding-left`
- `scroll-px` → `scroll-padding-x`
- `scroll-py` → `scroll-padding-y`
- `scroll-ps` → `scroll-padding-inline-start`
- `scroll-pe` → `scroll-padding-inline-end`

### Grid Utilities
- `grid-cols` → `grid-template-columns`
- `grid-rows` → `grid-template-rows`
- `col` → `grid-column`
- `col-span` → `grid-column-span`
- `col-start` → `grid-column-start`
- `col-end` → `grid-column-end`
- `row` → `grid-row`
- `row-span` → `grid-row-span`
- `row-start` → `grid-row-start`
- `row-end` → `grid-row-end`
- `auto-cols` → `grid-auto-columns`
- `auto-rows` → `grid-auto-rows`
- `grid-flow` → `grid-auto-flow`

### Flex Utilities
- `grow` → `flex-grow`
- `shrink` → `flex-shrink`
- `basis` → `flex-basis`

### Align Utilities
- `content` → `align-content`
- `items` → `align-items`
- `self` → `align-self`

### Justify Utilities
- `justify` → `justify-content`

### Transition Utilities
- `transition` → `transition-property`
- `duration` → `transition-duration`
- `ease` → `transition-timing-function`
- `delay` → `transition-delay`

### Transform Utilities
- `backface` → `backface-visibility`
- `origin` → `transform-origin`

### Inset Utilities
- `start` → `inset-inline-start`
- `end` → `inset-inline-end`

### Typography Utilities
- `underline-offset` → `text-underline-offset`
- `text-decoration` → `text-decoration-line`

### Box Utilities
- `box-decoration` → `box-decoration-break`

### Outline Utilities
- `outline` → `outline-width`

Migration: Update any CSS class references in your templates from the old abbreviated names to the new CSS-standard names.
