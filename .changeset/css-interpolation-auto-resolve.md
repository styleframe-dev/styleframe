---
"@styleframe/core": patch
"styleframe": patch
---

Add auto-resolve for variables and at-rules in `css` template literal interpolations

- Variables interpolated directly in `css` are automatically converted to references: `` css`${variable}` `` is equivalent to `` css`${ref(variable)}` ``
- AtRule and keyframes instances interpolated in `css` resolve to their rule name: `` css`${keyframeInstance}` `` is equivalent to `` css`${keyframeInstance.rule}` ``
