---
"styleframe": minor
"@styleframe/core": minor
"@styleframe/scanner": minor
"@styleframe/transpiler": minor
"@styleframe/plugin": minor
---

Add recipe-level tree-shaking. Unused recipes and their utility classes are excluded from the CSS and TypeScript consumer module during production builds.

- **Core**: `Root._usage` gains `recipes` and `recipeUtilities` fields. Recipe utility class names are tracked per-recipe in `recipeUtilities` and promoted to `utilities` via `registerRecipeUtilities()`.
- **Scanner**: New `scanImports()` and `scanFileImports()` methods use importree v2's `parseImports()` to detect which recipes are imported from `virtual:styleframe`.
- **Transpiler**: TS and DTS consumers filter recipes by `_usage.recipes` — only emitting used recipes when the set is populated.
- **Plugin**: Recipe scanning integrated into the build flow after content scanning. Defaults to tree-shaking ON for builds, OFF for dev. Safety: namespace/dynamic imports include all recipes with a warning. `recipes.include` option provides an escape hatch for force-including recipes.
