---
"@styleframe/theme": minor
---

Extend `_flex:` namespace to mirror Tailwind's `flex-*` family: direction keywords (`row`, `col`, `column`, and their reverses) now route to `flex-direction`, wrap keywords (`wrap`, `nowrap`, `wrap-reverse`) route to `flex-wrap`, and shorthand values (`1`, `auto`, `initial`, `none`) continue to map to `flex`. Also adds `column`/`column-reverse` as full-word aliases to `flexDirectionValues` and `column`/`column-dense` aliases to grid auto-flow values.
