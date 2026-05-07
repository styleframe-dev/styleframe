---
"@styleframe/core": minor
"styleframe": minor
---

Track variable references in `root._usage.variables` for future transpiler optimizations

- Add `_usage: { variables: Set<string> }` to `Root` type and initialize in `createRoot()`
- Record variable names whenever `ref()` is called or `@`-prefixed syntax is resolved
