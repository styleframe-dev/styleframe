---
"@styleframe/scanner": patch
"@styleframe/loader": patch
"styleframe": patch
---

Remove vite-plugin-node and externalize peer deps in scanner/loader builds

- Remove `vite-plugin-node` which was injecting dead code (rfdc deep-clone, Buffer utilities) into dist bundles
- Replace with native Vite library mode and explicit `rollupOptions.external` for peer dependencies and Node.js builtins
- Scanner dist: 23.21 kB → 11.18 kB (52% smaller), Loader dist: 43.83 kB → 4.10 kB (91% smaller)
