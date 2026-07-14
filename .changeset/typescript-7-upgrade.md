---
"@styleframe/config-vite": patch
---

Upgrade the build toolchain to TypeScript 7 (`typescript@^7.0.2`, the native compiler). TS7's package no longer ships the JavaScript Compiler API, which `@microsoft/api-extractor` relies on for its declaration rollup ("Unable to follow symbol"). The shared vite config swaps `vite-plugin-dts` (api-extractor rollup) for `unplugin-dts` (Volar-based per-file emission) and drops the `@microsoft/api-extractor` dependency; `@typescript/typescript6` is added as the Volar JS-API shim.

**Declaration layout changes; the public type surface does not.** Previously api-extractor flattened each package into a single rolled-up `index.d.ts` with the whole API inlined. It now emits **per-file** `.d.ts` alongside a re-export-barrel `index.d.ts` that mirrors the package's `src/index.ts`. The resolved public type surface is unchanged — a consumer's `import { … } from '@styleframe/core'` resolves the same types (verified symbol-for-symbol, and by a green full-workspace typecheck through the new barrels) — but the on-disk file layout differs.

Per-file emission is scoped to public source: test files (`**/*.test.*`, `**/__tests__/**`), build-config files (`**/*.config.ts`), and the CLI's `playground/**` scaffolding templates are excluded from declaration output, so the published `dist/` (every package ships `files: ["dist"]`) carries only the consumer-facing declaration set. `.js` bundles are untouched.
