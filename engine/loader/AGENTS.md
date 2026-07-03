# @styleframe/loader

Node-side loading for the Styleframe engine: executes `styleframe.config.ts` and `*.styleframe.ts` files on the fly via [jiti](https://github.com/unjs/jiti), validates that they export a `Styleframe` instance, tags exported recipes/selectors with `_exportName` for the transpiler, watches the config for changes, and writes transpiled output to disk. Consumed by the build plugin ([`tooling/plugin`](../../tooling/plugin/AGENTS.md)) and the CLI's `build`/`dtcg`/`figma` commands; published to npm and re-exported via the `styleframe/loader` barrel subpath.

## Layout

```
src/
├── index.ts     # Barrel — export * from every module below
├── module.ts    # createLoader, loadModule, loadExtensionModule, trackExports
├── config.ts    # loadConfiguration, watchConfiguration (chokidar file watching)
├── jiti.ts      # createSharedJiti, clearJitiCache, clearAllJitiCache
├── build.ts     # build(instance, options) — transpile + write files to disk
├── types.ts     # ExportInfo, LoadModuleOptions, LoadModuleResult, …
└── utils.ts     # directoryExists
playground/      # Manual smoke scripts (see Build & test)
```

## How loading works

`loadModule(filePath, options)` ([`src/module.ts`](./src/module.ts)) imports the file through jiti, throws if the default export is missing or not a `Styleframe` instance (skip the instance check with `loadExtensionModule` for extension files), then runs `trackExports` over the named exports. `trackExports` is the load-bearing side effect: it sets `_exportName` on every exported recipe/selector token, and the transpiler's TS/DTS pipelines emit **only** selectors that carry it. An instance transpiled without going through this package produces no selector exports.

Two jiti flavors, deliberately different:

- `createLoader` ([`src/module.ts`](./src/module.ts)) — `fsCache: false, moduleCache: false`; every import is fresh. Used by default for one-shot loads.
- `createSharedJiti` ([`src/jiti.ts`](./src/jiti.ts)) — `moduleCache: true`; shared dependencies compile once across many `*.styleframe.ts` files. This is what the plugin's HMR path uses: on file change it calls `clearJitiCache(jiti, ...changedFiles)` to invalidate just those entries, then reloads (see [`tooling/plugin/src/plugin/global-loader.ts`](../../tooling/plugin/src/plugin/global-loader.ts)).

`loadConfiguration` ([`src/config.ts`](./src/config.ts)) resolves `styleframe.config.{ts,mts,cts,js,mjs,cjs}` (in that order) from `cwd` and returns the instance — or a **default `styleframe()` instance when no config file exists** (no error). `watchConfiguration` does throw when the file is missing; it chokidar-watches it, reloads on change into `onUpdate`, reports deletion via `onError`, and returns `{ config, configFile, unwatch }`.

`build(instance, options)` ([`src/build.ts`](./src/build.ts)) validates the instance license (key read from the environment via `@styleframe/license`), calls the transpiler, and writes `output.files` under `outputDir` (default `./styleframe`), removing the directory first when `clean: true` (the default).

## Build & test

```bash
pnpm --filter @styleframe/loader build   # tsc --noEmit && vite build
pnpm --filter @styleframe/loader test    # vitest run --passWithNoTests
```

There are currently **no unit tests in this package** (hence `--passWithNoTests`); coverage comes from the plugin's tests and `testing/integration`. For manual verification use the playground scripts, which run `src/` directly against [`playground/styleframe.config.ts`](./playground/styleframe.config.ts):

```bash
pnpm --filter @styleframe/loader playground:load    # load config, dump AST
pnpm --filter @styleframe/loader playground:watch   # watch config, log reloads
pnpm --filter @styleframe/loader playground:build   # build to playground/dist
```

## Pitfalls

- **`build()` with default options deletes `outputDir` recursively** before writing. Pointing it at a directory containing anything else loses that content.
- **`loadModule` on an extension file throws** if the file has no default `Styleframe` export — use `loadExtensionModule` for anything that isn't the config.
- **Forgetting `trackExports` (or bypassing this package) silently drops selector exports** from the transpiler's TS/DTS output — nothing errors; the exports just aren't there.
- **A shared jiti instance keeps serving stale modules** until you `clearJitiCache` the changed files (or `clearAllJitiCache`). Cache keys are tried both as plain paths and `file://` URLs — pass absolute paths.

## See also

- [`engine/transpiler/AGENTS.md`](../transpiler/AGENTS.md) — what `build()` delegates to; how `_exportName` is consumed.
- [`engine/core/AGENTS.md`](../core/AGENTS.md) — `isStyleframe`, `isRecipe`, `isSelector` guards used during validation.
- [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md) — the primary consumer; owns the HMR orchestration built on this package's jiti helpers.
