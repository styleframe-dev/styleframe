---
"@styleframe/plugin": patch
"@styleframe/config-vite": patch
"@styleframe/core": patch
"@styleframe/transpiler": patch
"@styleframe/runtime": patch
"@styleframe/scanner": patch
"@styleframe/loader": patch
"@styleframe/cli": patch
"@styleframe/figma": patch
"@styleframe/theme": patch
"styleframe": patch
---

Migrate from Vite 7 to Vite 8 with native Rolldown integration. Replace esbuild transforms with Oxc in the plugin, rename `rollupOptions` to `rolldownOptions`, upgrade `vite-plugin-dts` v4 to v5 (`rollupTypes` → `bundleTypes`), and bump vitest from v3 to v4.
