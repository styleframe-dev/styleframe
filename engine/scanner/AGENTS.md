# @styleframe/scanner

Finds Styleframe utility classes (`_hover:margin:sm`) in project source files, parses them into structured objects, matches them against a Styleframe `Root`, and registers the values that don't exist yet — so the transpiler emits CSS for exactly the utilities a project uses. Published to npm. The primary consumer is the build plugin ([`tooling/plugin/src/plugin/scanner.ts`](../../tooling/plugin/src/plugin/scanner.ts)), which runs a full scan at build start and per-file re-scans on HMR.

Two entry points: the main entry is browser-safe; `createScanner` is only exported from the `./node` subpath because it pulls in `fast-glob` and `node:fs/promises`. Importing it from a browser bundle fails.

## Layout

```
src/
├── index.ts        # Browser-safe barrel (everything except createScanner)
├── node.ts         # createScanner — the "./node" subpath entry
├── scanner.ts      # quickScan, createContentScanner (content-only, no file I/O)
├── extractor.ts    # extractClasses + per-format extractors (HTML, JSX, Vue, Svelte, Astro, MDX)
├── parser.ts       # parseUtilityClass, extractUtilityClasses, generateUtilityClassName
├── matcher.ts      # matchUtilities, filterUtilities, createUtilityFilter, get*Matches helpers
├── register.ts     # registerMatchedUtilities — mutates the Root with missing values
├── dynamic.ts      # createDynamicUtilities — mints factories for bare CSS-property utilities
├── properties.ts   # CSS_PROPERTIES set + isKnownCssProperty (gate for dynamic.ts)
├── imports.ts      # scanFileImports via importree — who imports a given module, and what
├── cache.ts        # Content-hash cache (createCache, hashContent)
├── watcher.ts      # createChangeHandler (debounced), debounce, matchesPatterns
├── constants.ts    # UTILITY_CLASS_PATTERN, ARBITRARY_VALUE_PATTERN, defaults
└── types.ts        # ScannerConfig, ParsedUtility, UtilityMatch, Scanner, Extractor, …
```

Tests are colocated as `src/<file>.test.ts`.

## The pipeline

`createScanner(config).scan()` runs, per file:

1. **Discover** — `fast-glob` over `config.content` (relative to `config.cwd`), always ignoring `DEFAULT_IGNORE_PATTERNS` (node_modules, dist, .git, …).
2. **Extract** — [`extractor.ts`](./src/extractor.ts) picks a default extractor by file extension; unknown extensions fall back to string-literal extraction. Custom extractors from `config.extractors` run first and are plain functions: `(content, filePath) => string[]`.
3. **Parse** — [`parser.ts`](./src/parser.ts) turns each candidate into a `ParsedUtility`. Format is `_[modifiers:]name[:value]`: `_hidden` gets value `"default"`, `_margin:[16px]` sets `isArbitrary`/`arbitraryValue`, and colon-splitting is bracket-aware so `[10px:20px]` survives. Invalid strings parse to `null`.
4. **Match** — `scanner.match(parsed, root)` ([`matcher.ts`](./src/matcher.ts)) resolves each utility to a `UtilityFactory` and its modifiers to `ModifierFactory`s; `exists` means the value (keyed with sorted modifiers) is already registered.
5. **Register** — `registerMatchedUtilities(root, matches)` ([`register.ts`](./src/register.ts)): first `createDynamicUtilities` creates factories for unmatched names that are known CSS properties, then usage is recorded on `root._usage.utilities`, then missing values are created via `factory.create()` — `autogenerate("@<value>")` for token references, the literal CSS string for arbitrary values (underscores become spaces: `[10px_20px]` → `10px 20px`).

Caching is content-hash based ([`cache.ts`](./src/cache.ts)): `scanFile` returns the cached result when the hash is unchanged; `scanner.invalidate(path?)` drops one file or everything.

Custom class syntax is supported end to end via `ScannerUtilitiesConfig` (`pattern` — must be a global regex — plus `parse` and `selector`), threaded through `createScanner`, `quickScan`, and `createContentScanner`.

## Import scanning

[`imports.ts`](./src/imports.ts) wraps `importree` to report which specifiers of a given module a file imports (`scanner.scanImports(moduleId)` aggregates across all content files; `scanFileImports` does one file). The plugin uses `scanImports("virtual:styleframe")` to learn which recipe/selector exports are actually imported, so the transpiler only emits those.

## Build & test

```bash
pnpm --filter @styleframe/scanner test     # vitest run
pnpm --filter @styleframe/scanner build    # tsc --noEmit && vite build
```

[`vite.config.ts`](./vite.config.ts) builds both entries (`index`, `node`) via `@styleframe/config-vite`.

## Pitfalls

- **`scanner.watch()` is not a file watcher.** It builds a debounced change handler but never exposes `onChange`, so nothing can feed it events; the returned cleanup just flushes. The plugin does incremental work with `invalidate(path)` + `scanFile(path)` instead ([`scanFileAndRegister`](../../tooling/plugin/src/plugin/scanner.ts)). Don't build on `watch()` without fixing that first.
- **`registerMatchedUtilities` and `createDynamicUtilities` mutate their inputs** — the `Root` (new factories, values, `_usage`) and the `matches` array (`match.factory` is filled in for dynamic utilities). Don't reuse matches across roots.
- **`UTILITY_CLASS_PATTERN` is a cross-package contract.** It must extract exactly the class names `@styleframe/runtime` emits and `defaultUtilitySelectorFn` in `@styleframe/core` generates. Loosening or tightening it alone means used classes get no CSS.
- **`Extractor` is a bare function type** (`(content, filePath) => string[]`), not an `{ extensions, extract }` object. Custom extractors run for every file regardless of extension — filter on `filePath` yourself.

## See also

- [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md) — how scans are wired into bundlers and HMR.
- [`engine/core/AGENTS.md`](../core/AGENTS.md) — `UtilityFactory`, `ModifierFactory`, selector functions.
- [`engine/runtime/AGENTS.md`](../runtime/AGENTS.md) — the code that emits these class names in the browser.
