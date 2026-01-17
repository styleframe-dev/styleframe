---
"styleframe": patch
"@styleframe/theme": patch
---

feat: add useUtilities function for registering all utility factories

Introduces `useUtilities()` that registers all ~180 utility composables with a Styleframe instance and returns their creator functions. This enables automatic utility class generation for recipe declarations.

Updated recipe documentation examples to use `useUtilities()` with destructured functions and demonstrate both `ref()` and `@variable.name` syntax for referencing design tokens.
