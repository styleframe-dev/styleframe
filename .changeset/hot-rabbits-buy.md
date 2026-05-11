---
"styleframe": minor
"@styleframe/core": minor
"@styleframe/transpiler": minor
"@styleframe/scanner": patch
"@styleframe/plugin": minor
---

Add `treeshake` option to remove unused variables from CSS output.

`root._usage` now tracks both `variables` and `utilities` referenced during config execution and scanner registration. The transpiler's new `treeshake: true` option filters `root.variables` and theme variables down to only those present in `_usage.variables`. The plugin enables treeshaking by default when generating global CSS.
