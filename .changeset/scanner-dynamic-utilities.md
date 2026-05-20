---
"styleframe": minor
"@styleframe/scanner": minor
---

Add dynamic utility creation for unmatched CSS properties.

Automatically creates utility factories on-the-fly for unmatched class names that correspond to known CSS properties. Enables fallback support for arbitrary CSS values without pre-registration (e.g., `_display:flex`, `_background:[red]`). Includes comprehensive test coverage for dynamic factory creation, deduplication, and modifier preservation.
