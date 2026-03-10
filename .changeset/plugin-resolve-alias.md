---
"@styleframe/plugin": minor
"styleframe": minor
---

Add `resolve.alias` option to plugin for custom path resolution

- Add `resolve.alias` option to plugin types for configuring module path alias mappings
- Resolve relative alias paths to absolute paths relative to the plugin working directory
- Pass aliases through to Jiti loader and importree dependency graph for proper module resolution and HMR tracking
