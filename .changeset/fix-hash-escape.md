---
"@styleframe/transpiler": patch
"styleframe": patch
---

fix: Expand CSS selector escaping for arbitrary values

Consolidate escape logic into a single regex and extend escaping to cover additional special characters (#, (, ), %, ,) needed for arbitrary CSS value syntax like `[#1E3A8A]`, `[rgb(255,0,0)]`, and `[calc(100%-20px)]`.
