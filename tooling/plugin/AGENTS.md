# @styleframe/plugin

Unplugin-based build integration that brings Styleframe to modern bundlers. Transforms `*.styleframe.ts` files and a `styleframe.config.ts` entry into virtual CSS and TypeScript modules at build time, with HMR support and selective cache invalidation via importree dependency graphs.

## Package Info

- **Name:** `@styleframe/plugin`
- **Version:** 3.0.0
- **Type:** ES Module
- **License:** MIT
- **Dependencies:** `unplugin`, `jiti`, `tinyglobby`, `importree`, `consola`, `@styleframe/loader`, `@styleframe/scanner`, `@styleframe/transpiler`, `@styleframe/license`
- **Peer dependencies (all optional):** `vite`, `webpack`, `rollup`, `esbuild`, `@nuxt/kit`, `@nuxt/schema`, `@farmfe/core`

---

## When to Use This Package

- Integrate Styleframe into a Vite, Webpack, Nuxt, Astro, Rollup, Rspack, esbuild, or Farm project
- Provide `virtual:styleframe` and `virtual:styleframe.css` virtual modules to application code
- Auto-discover and load `*.styleframe.ts` extension files
- Generate `.d.ts` type declarations for virtual modules
- Scan content files for utility class usage and auto-register them
- Enable HMR with targeted cache invalidation for fast rebuilds

---

## Architecture

### Global Single-Instance Pattern

All `*.styleframe.ts` files share a single Styleframe instance created in `styleframe.config.ts`. The plugin manages this through a **two-faced virtual module**:

```
styleframe.config.ts          → Creates the global Styleframe instance
*.styleframe.ts files         → Extend the global instance (add tokens, recipes, utilities)
Application code              → Consumes compiled recipes and selectors
```

### Virtual Modules

| Import | Resolves To | Returns |
|--------|-------------|---------|
| `virtual:styleframe` (from `*.styleframe.ts`) | Extension face | Global instance factory for extending the design system |
| `virtual:styleframe` (from app code) | Consumer face | Compiled TypeScript with recipe functions and selector constants |
| `virtual:styleframe.css` | CSS face | All compiled CSS styles |

### Initialization Sequence

1. Create persistent Jiti instance with module caching
2. Load `styleframe.config.ts` to create global Styleframe instance
3. Discover all `*.styleframe.ts` files via glob patterns
4. Sort files by load order (alphabetical or depth-first)
5. Load all styleframe files sequentially (with circular dependency detection)
6. Build importree dependency graph for selective cache invalidation
7. Scan content files and auto-register utilities (if scanner configured)
8. Register watch files (entries + tracked dependencies + content files)
9. Generate type declarations (`.styleframe/` directory)

### HMR Strategy

The plugin uses **importree** to build dependency graphs and perform selective cache invalidation:

| File Changed | Action |
|-------------|--------|
| `styleframe.config.ts` | Reload all files, invalidate affected caches, rebuild dependency graph |
| `*.styleframe.ts` | Reload all files with selective invalidation of changed + dependents |
| Content file (HTML, JSX, etc.) | Incremental scan, register new utility values, update CSS only |
| Tracked dependency (shared composable) | Identify affected files via BFS, reload with targeted invalidation |
| New `*.styleframe.ts` detected | Load file, rebuild dependency graph, re-scan content |
| `*.styleframe.ts` deleted | Reload remaining files, rebuild dependency graph |

---

## Bundler Adapters

Each adapter is a separate entry point:

```ts
import Styleframe from '@styleframe/plugin/vite';      // Vite
import Styleframe from '@styleframe/plugin/webpack';    // Webpack
import Styleframe from '@styleframe/plugin/rollup';     // Rollup
import Styleframe from '@styleframe/plugin/esbuild';    // esbuild
import Styleframe from '@styleframe/plugin/rspack';     // Rspack
import Styleframe from '@styleframe/plugin/farm';       // Farm
import Styleframe from '@styleframe/plugin/nuxt';       // Nuxt module
import Styleframe from '@styleframe/plugin/astro';      // Astro integration
```

The `@styleframe/plugin` root export exposes the raw unplugin factory:

```ts
import { unpluginFactory, unplugin } from '@styleframe/plugin';
```

---

## Plugin Options

```ts
interface Options {
  entry?: string;                    // Config file path (default: './styleframe.config.ts')
  silent?: boolean;                  // Suppress console output (default: false)
  transpiler?: TranspileOptions;     // Transpiler options (type, consumers)
  include?: string[];                // Glob patterns for *.styleframe.ts (default: ['**/*.styleframe.ts'])
  exclude?: string[];                // Glob patterns to exclude
  loadOrder?: 'alphabetical' | 'depth-first';  // File loading order (default: 'alphabetical')
  dts?: {
    enabled?: boolean;               // Generate type declarations (default: true)
    outDir?: string;                 // Output directory (default: '.styleframe')
  };
  scanner?: {
    content: string[];               // Glob patterns for content files to scan
    extractors?: Extractor[];        // Custom file type extractors
    utilities?: ScannerUtilitiesConfig; // Custom utility class syntax
  };
}
```

---

## Usage Examples

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Styleframe from '@styleframe/plugin/vite';

export default defineConfig({
  plugins: [Styleframe()],
});
```

### Vite with Scanner

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Styleframe from '@styleframe/plugin/vite';

export default defineConfig({
  plugins: [
    Styleframe({
      scanner: {
        content: ['./src/**/*.{html,jsx,tsx,vue}'],
      },
    }),
  ],
});
```

### Vite with Custom Options

```ts
Styleframe({
  entry: './src/styleframe.config.ts',
  loadOrder: 'depth-first',
  include: ['./src/**/*.styleframe.ts'],
  exclude: ['./src/**/*.test.ts'],
  dts: { enabled: true, outDir: '.styleframe' },
})
```

### Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@styleframe/plugin/nuxt'],
  unpluginStarter: {
    // Options passed to the plugin
  },
});
```

### Astro

```ts
// astro.config.mjs
import Styleframe from '@styleframe/plugin/astro';

export default {
  integrations: [Styleframe({})],
};
```

### Consuming Virtual Modules

```ts
// In *.styleframe.ts extension files
import { styleframe } from 'virtual:styleframe';

const s = styleframe(); // Returns the global Styleframe instance
const { variable, ref, selector, recipe } = s;

// Define tokens and recipes...
export default s;
```

```ts
// In application code
import { buttonRecipe } from 'virtual:styleframe';
import 'virtual:styleframe.css';

// Use compiled recipe function
const classes = buttonRecipe({ color: 'primary', size: 'md' });
```

---

## Error Handling

The plugin defines three custom error classes in `src/plugin/errors.ts`:

| Error | Condition |
|-------|-----------|
| `ExportCollisionError` | Two files export the same name |
| `GlobalInstanceNotInitializedError` | Global instance not created before loading extension files |
| `CircularDependencyError` | Circular import detected between styleframe files |

All errors extend `StyleframePluginError` and include `[styleframe]` prefix in messages.

---

## Internal State

### PluginGlobalState

```ts
interface PluginGlobalState {
  globalInstance: Styleframe | null;       // From styleframe.config.ts
  configFile: StyleframeFileInfo | null;   // Config file metadata
  files: Map<string, StyleframeFileInfo>;  // All *.styleframe.ts files
  loadingFiles: Set<string>;               // Circular dependency detection
  initialized: boolean;
}

interface StyleframeFileInfo {
  path: string;
  loadOrder: number;
  exports: Map<string, ExportInfo>;
  lastModified: number;
}
```

### DependencyGraph

Built by importree, tracks forward and reverse dependency relationships between all entry points and their transitive imports. Used by `getFilesToInvalidate()` to determine which files need cache clearing on change.

---

## Constants

| Constant | Value |
|----------|-------|
| `PLUGIN_NAME` | `"styleframe"` |
| `DEFAULT_ENTRY` | `"./styleframe.config.ts"` |
| `VIRTUAL_CSS_MODULE_ID` | `"virtual:styleframe.css"` |
| `VIRTUAL_TS_MODULE_ID` | `"virtual:styleframe"` |
| `RESOLVED_VIRTUAL_EXTENSION_ID` | `"\0virtual:styleframe:extension"` |
| `RESOLVED_VIRTUAL_CONSUMER_ID` | `"\0virtual:styleframe:consumer"` |
| `RESOLVED_VIRTUAL_CSS_MODULE_ID` | `"\0virtual:styleframe.css"` |
| `DEFAULT_IGNORE_PATTERNS` | `node_modules`, `.git`, `dist`, `build`, `.next`, `.nuxt`, `coverage` |

---

## Generation Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `generateExtensionModule(configPath)` | `generate/extension-module.ts` | Generates module that imports config and re-exports the global instance |
| `generateConsumerModule(state)` | `generate/consumer-module.ts` | Uses `@styleframe/transpiler` with `type: "ts"` to generate recipe functions and selectors |
| `generateGlobalCSS(state, isBuild, options)` | `generate/global-css.ts` | Uses `@styleframe/transpiler` with `type: "css"` to generate all styles |
| `generateTypeDeclarations(state, cwd, dtsOptions, silent)` | `generate/dts.ts` | Uses `@styleframe/transpiler` with `type: "dts"` to generate `.d.ts` files |

---

## Source Files

```
src/
├── index.ts                         # Re-exports unplugin factory and default
├── vite.ts                          # Vite adapter
├── webpack.ts                       # Webpack adapter
├── nuxt.ts                          # Nuxt module (adds both Vite + Webpack plugins)
├── astro.ts                         # Astro integration (hooks into astro:config:setup)
├── rollup.ts                        # Rollup adapter
├── rspack.ts                        # Rspack adapter
├── esbuild.ts                       # esbuild adapter
├── farm.ts                          # Farm adapter
└── plugin/
    ├── index.ts                     # Plugin factory (unpluginFactory, unplugin)
    ├── types.ts                     # Options interface
    ├── constants.ts                 # Virtual module IDs, defaults, ignore patterns
    ├── state.ts                     # PluginGlobalState, StyleframeFileInfo, findExportCollision, resetState
    ├── discovery.ts                 # discoverStyleframeFiles, sortByLoadOrder
    ├── global-loader.ts             # createPersistentJiti, loadConfigFile, loadStyleframeFile, loadAllStyleframeFiles, reloadAll
    ├── scanner.ts                   # createPluginScanner, scanAndRegister, scanFileAndRegister, isContentFile
    ├── dependency-graph.ts          # createDependencyGraph, buildDependencyGraph, getFilesToInvalidate, isTrackedDependency
    ├── errors.ts                    # StyleframePluginError, ExportCollisionError, GlobalInstanceNotInitializedError, CircularDependencyError
    └── generate/
        ├── index.ts                 # Re-exports all generators
        ├── extension-module.ts      # Extension face code generation
        ├── consumer-module.ts       # Consumer face code generation (via transpiler)
        ├── global-css.ts            # CSS code generation (via transpiler)
        └── dts.ts                   # Type declaration generation (via transpiler)
```

---

## Best Practices

1. **Use the bundler-specific adapter** — Import from `@styleframe/plugin/vite`, not the root package. The root export is the raw unplugin factory for custom integrations.

2. **Keep `styleframe.config.ts` at the project root** — The default entry path is `./styleframe.config.ts`. Use the `entry` option only if the config is elsewhere.

3. **Use `*.styleframe.ts` extension** — The plugin discovers files by this naming convention. All design system extensions (tokens, recipes, utilities) go in these files.

4. **Configure scanner for utility auto-registration** — If using utility classes in templates, pass `scanner.content` with glob patterns for your content files. This enables auto-detection and registration of utility values.

5. **Use specific glob patterns** — Narrow `include` and `scanner.content` patterns reduce discovery and scan time.

6. **Export the Styleframe instance as default** — Both config and extension files must `export default s` for the loader to work correctly.

7. **Avoid circular dependencies between styleframe files** — The plugin detects and throws `CircularDependencyError`. Use shared composable files (not `*.styleframe.ts`) for code reuse between extensions.

8. **Leave `dts.enabled` as true** — Type declarations in `.styleframe/` provide autocomplete for `virtual:styleframe` imports. Add `.styleframe/` to `.gitignore`.

9. **Use `loadOrder: 'alphabetical'`** (default) for deterministic builds — Switch to `'depth-first'` only when files closer to the project root must take precedence.

10. **Do not import from `virtual:styleframe` in non-styleframe files expecting the global instance** — Only `*.styleframe.ts` files receive the extension face. All other importers get the consumer face with compiled exports.
