---
"@styleframe/config-vite": patch
---

Upgrade the build toolchain to TypeScript 7 (`typescript@^7.0.2`, the native compiler). TS7's package no longer ships the JavaScript Compiler API, which `@microsoft/api-extractor` relies on for its declaration rollup ("Unable to follow symbol"). The shared vite config swaps `vite-plugin-dts` (api-extractor rollup) for `unplugin-dts` (Volar-based per-file `.d.ts` emission) and drops the `@microsoft/api-extractor` dependency. Declaration output is byte-identical to the TS6 baseline — the entry `index.d.ts` still re-exports its siblings, and the `.d.mts`/`.d.cts` dual copies are preserved. `@typescript/typescript6` is added as the Volar JS-API shim. Package output is otherwise unchanged.
