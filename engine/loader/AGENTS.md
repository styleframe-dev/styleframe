# @styleframe/loader

Runtime module loading and configuration management for the Styleframe CSS-in-TypeScript framework. This package dynamically loads and compiles TypeScript/JavaScript Styleframe configuration files, tracks exported recipes and selectors, supports file watching for HMR, and builds CSS output via transpilation.

## When to Use This Package

- Load a `styleframe.config.ts` file at runtime to get a configured `Styleframe` instance
- Dynamically import `.styleframe.ts` extension files during development or build
- Watch configuration files for changes and trigger hot reloads
- Build CSS output from a Styleframe instance to disk
- Track named exports (recipes, selectors) for build-time code generation

## Installation

```ts
import {
  loadConfiguration,
  watchConfiguration,
  loadModule,
  loadExtensionModule,
  trackExports,
  build,
  createLoader,
  createSharedJiti,
  clearJitiCache,
  clearAllJitiCache,
} from "@styleframe/loader";
```

**Peer dependencies:** `@styleframe/core`, `@styleframe/transpiler`, `@styleframe/license`

## Architecture

### Single Instance Model (v3.0.0)

All extension files (`.styleframe.ts`) share one `Styleframe` instance from `styleframe.config.ts`. Extension files do not create their own instances — they import and extend the central one.

### Module Loading Pipeline

1. **Jiti creation** — `createLoader()` creates a jiti instance with no caching (fresh imports)
2. **Import & execution** — `jiti.import(filePath)` transpiles and executes TypeScript on-the-fly
3. **Validation** — Checks the default export is a valid `Styleframe` instance (via `isStyleframe()`)
4. **Export tracking** — `trackExports()` scans named exports, identifies recipes/selectors, sets `_exportName` metadata
5. **Result** — Returns `{ module, instance, exports }` bundle

### HMR Flow

1. `watchConfiguration()` uses chokidar to watch the config file
2. On change: reloads config via `loadConfiguration()`, calls `onUpdate(newConfig)`
3. On deletion: calls `onError()` with deletion message
4. Returns `unwatch()` to stop watching

## API Reference

### loadConfiguration(options?)

Load a `styleframe.config` file and return the `Styleframe` instance. Returns a default instance if no config file is found.

```ts
const instance = await loadConfiguration({
  cwd: process.cwd(),       // Working directory (default: process.cwd())
  entry: "styleframe.config" // Config file name without extension (default: "styleframe.config")
});
```

**Config file resolution order:** `.ts`, `.mts`, `.cts`, `.js`, `.mjs`, `.cjs`

### watchConfiguration(options?)

Watch a config file for changes and reload on update. Throws if the config file is not found.

```ts
const { config, configFile, unwatch } = await watchConfiguration({
  cwd: process.cwd(),
  entry: "styleframe.config",
  onUpdate: (newConfig) => { /* handle updated config */ },
  onError: (error) => { /* handle errors or file deletion */ },
});

// Stop watching
await unwatch();
```

### loadModule(filePath, options?)

Load a TypeScript/JavaScript module, validate its default export as a `Styleframe` instance, and track recipe/selector exports.

```ts
const { module, instance, exports } = await loadModule("/path/to/file.styleframe.ts", {
  alias: { "virtual:config": "/path/to/styleframe.config.ts" },
  validateInstance: true,  // Default: true
  jiti: sharedJitiInstance // Optional: reuse a shared jiti instance
});
```

**Throws** if:
- Default export is missing
- Default export is not a `Styleframe` instance (when `validateInstance: true`)

### loadExtensionModule(filePath, options?)

Load a module without validating the default export. Use for extension files that may not export a `Styleframe` instance.

```ts
const { module, exports } = await loadExtensionModule("/path/to/extension.ts", {
  alias: { "virtual:config": "/path/to/styleframe.config.ts" },
  jiti: sharedJitiInstance
});
```

### trackExports(module)

Scan a module's named exports, identify recipes and selectors, and set `_exportName` metadata on each. Skips the `default` export.

```ts
const exports = trackExports(module);
// Map<string, { name: string, type: "recipe" | "selector" }>
```

### build(instance, options?)

Transpile a `Styleframe` instance to CSS and write files to disk. Validates the license before building.

```ts
await build(instance, {
  clean: true,                 // Remove output dir before writing (default: true)
  outputDir: "./styleframe",   // Output directory (default: "./styleframe")
  transpiler: { /* TranspileOptions */ }
});
```

**Requires** `STYLEFRAME_LICENSE` environment variable for license validation.

### createLoader(basePath, alias?)

Create a jiti instance with no caching (fresh imports every time).

```ts
const jiti = createLoader("/project/root", {
  "virtual:config": "/path/to/config.ts"
});
```

### createSharedJiti(options?)

Create a jiti instance with module caching enabled. Use when loading multiple files to avoid re-compiling shared dependencies.

```ts
const jiti = createSharedJiti();

// Both loads share cached modules
const result1 = await loadModule("./button.styleframe.ts", { jiti });
const result2 = await loadModule("./badge.styleframe.ts", { jiti });

// Invalidate specific files for HMR
clearJitiCache(jiti, "./theme/useTokens.ts");
```

### clearJitiCache(jiti, ...filePaths)

Clear specific modules from the jiti cache. Call when a file changes to force reloading on next import. Handles both Map-based and object-based cache structures.

```ts
clearJitiCache(jiti, "/absolute/path/to/changed-file.ts");
```

### clearAllJitiCache(jiti)

Clear the entire jiti module cache. Use for full rebuilds or when the dependency graph is unclear.

```ts
clearAllJitiCache(jiti);
```

### directoryExists(path)

Check if a directory exists at the given path. Returns `false` if the path does not exist or is not a directory.

```ts
const exists = await directoryExists("./output");
```

## Types

```ts
interface ExportInfo {
  name: string;                    // Export name (e.g., "buttonRecipe")
  type: "recipe" | "selector";    // Type of export
}

interface LoadModuleOptions {
  alias?: Record<string, string>;  // jiti alias for virtual modules
  validateInstance?: boolean;      // Validate default export (default: true)
  jiti?: Jiti;                     // Shared jiti instance
}

interface LoadModuleResult {
  module: Record<string, unknown>;
  instance: Styleframe;
  exports: Map<string, ExportInfo>;
}

interface LoadExtensionModuleResult {
  module: Record<string, unknown>;
  exports: Map<string, ExportInfo>;
}

type BuildOptions = {
  clean?: boolean;
  outputDir?: string;
  transpiler?: TranspileOptions;
};
```

Also re-exports `Jiti` and `JitiOptions` types from `jiti`.

## Best Practices

1. **Use `createSharedJiti()` for multi-file loading** — Avoids re-compiling shared dependencies across files. Essential for performance in dev servers and build tools.

2. **Use `clearJitiCache()` for targeted HMR** — Only invalidate changed files instead of clearing the entire cache. Keeps HMR fast by preserving cached dependencies.

3. **Use `loadExtensionModule()` for extension files** — Extension files may not have a default `Styleframe` export. Using `loadModule()` on them will throw.

4. **Use `loadModule()` for config files** — Config files must export a `Styleframe` instance as their default export. Validation catches misconfiguration early.

5. **Pass `alias` for virtual module resolution** — When extension files import from virtual modules (e.g., `virtual:config`), provide alias mappings so jiti can resolve them.

6. **Set `STYLEFRAME_LICENSE` for builds** — The `build()` function validates the license before transpilation. Builds will fail without a valid license key in the environment.

## Source Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all public API |
| `src/config.ts` | Configuration loading and file watching |
| `src/module.ts` | Module loading, validation, and export tracking |
| `src/build.ts` | CSS transpilation and file output |
| `src/jiti.ts` | Jiti instance creation and cache management |
| `src/types.ts` | TypeScript interfaces |
| `src/utils.ts` | Filesystem utilities |
