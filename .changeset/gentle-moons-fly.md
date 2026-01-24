---
"@styleframe/loader": minor
"@styleframe/transpiler": minor
"@styleframe/plugin": minor
"@styleframe/core": minor
"styleframe": minor
---

Rename `?recipe` imports to `?ts` and add named selector export support

- **Breaking:** Renamed import query parameter from `?recipe` to `?ts` for styleframe files
- Add support for exporting named selectors alongside recipes via `?ts` imports
- Add `_exportName` property to `Selector` and `Recipe` types for tracking named exports
- Replace `c12` with `chokidar` + `jiti` for simpler, more reliable config loading
- Add `onError` callback to `watchConfiguration` for error reporting during file watch
- Add file deletion detection with `unlink` handler in watch mode
- Simplify `loadConfiguration` API by merging `loadConfigurationFromPath`
- Add comprehensive unit tests for TypeScript selector consumer
