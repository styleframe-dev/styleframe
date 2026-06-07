---
"@styleframe/config-vite": minor
"@styleframe/core": patch
"@styleframe/loader": patch
"@styleframe/runtime": patch
"@styleframe/scanner": patch
"@styleframe/transpiler": patch
"@styleframe/theme": patch
"@styleframe/cli": patch
---

Bundle type declarations on build. The shared Vite config now enables `vite-plugin-dts`'s `bundleTypes`, so each package ships a single rolled-up `.d.ts` per entry (via `@microsoft/api-extractor`) instead of a tree of per-file declarations. `@microsoft/api-extractor` is now a peer dependency of `@styleframe/config-vite`.
