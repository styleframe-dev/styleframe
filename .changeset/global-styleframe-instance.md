---
"styleframe": major
"@styleframe/core": major
"@styleframe/transpiler": major
"@styleframe/loader": major
"@styleframe/runtime": major
"@styleframe/scanner": major
"@styleframe/theme": major
"@styleframe/cli": major
"@styleframe/plugin": major
"@styleframe/config-typescript": major
"@styleframe/config-vite": major
---

Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.
