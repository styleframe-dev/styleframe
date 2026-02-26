---
"@styleframe/plugin": minor
"styleframe": minor
---

Add Vite resolve.alias forwarding to Jiti module loader

- Extract `resolve.alias` from Vite config and store in plugin state, supporting both array and object alias forms
- Pass aliases to Jiti when loading config and extension files, so aliased imports resolve correctly
- Watch aliased source directories for changes and trigger full HMR reloads when modified
- Refactor HMR logic into reusable helpers (`reloadAndRescan`, `invalidateServerModules`, `handleReload`)
