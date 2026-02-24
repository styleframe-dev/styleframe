---
"@styleframe/core": patch
"styleframe": patch
---

Add hash-based utility class names for arbitrary CSS values containing whitespace. Values like `transition: 'all 0.3s ease'` now produce valid CSS class names using a deterministic hash (e.g., `_transition:2f7a3b1`) instead of invalid bracket notation with spaces.
