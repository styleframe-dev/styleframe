---
"@styleframe/theme": patch
---

Fix field-group horizontal/vertical border joining to target known control classes (`.input`, `.textarea`, `.select`, `.button`, `.dropdown`) instead of all children (`*`), using `:where`/`:is` for correct specificity.
