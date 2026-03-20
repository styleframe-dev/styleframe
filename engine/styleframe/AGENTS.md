# styleframe

The unified entry point for Styleframe — a type-safe, composable CSS-in-TypeScript framework for building design systems. This package re-exports all core APIs, plugins, CLI, loader, and transpiler from their respective `@styleframe/*` packages under a single `styleframe` import.

## When to Use This Package

- Import the core API (`styleframe`, `merge`, type guards, utilities) from `'styleframe'`
- Import build tool plugins from `'styleframe/plugin/vite'`, `'styleframe/plugin/webpack'`, etc.
- Import the loader API from `'styleframe/loader'`
- Import the transpiler API from `'styleframe/transpiler'`
- Run the CLI via `npx styleframe` or the `styleframe` bin command

Use this package instead of importing from `@styleframe/core`, `@styleframe/loader`, etc. directly. It provides a single dependency that bundles all engine functionality.

## Package Info

- **Name:** `styleframe`
- **Version:** `3.1.0`
- **Type:** ES module (with CJS fallback)
- **License:** MIT
- **Dependencies:** `@styleframe/cli`, `@styleframe/license`
- **Peer dependencies:** `@styleframe/core`, `@styleframe/loader`, `@styleframe/transpiler`, `@styleframe/plugin`

## Architecture

This package is a **barrel package** — it contains no implementation of its own. Every source file is a re-export from the corresponding `@styleframe/*` sub-package:

| Entry Point | Re-exports From | Purpose |
|-------------|----------------|---------|
| `styleframe` | `@styleframe/core` | Core API: `styleframe()`, `merge()`, token factories, type guards, utilities |
| `styleframe/loader` | `@styleframe/loader` | Config loading, module loading, build, jiti cache management |
| `styleframe/transpiler` | `@styleframe/transpiler` | AST-to-CSS transpilation |
| `styleframe/cli` | `@styleframe/cli` | CLI entry point (`#!/usr/bin/env node`) |
| `styleframe/plugin/vite` | `@styleframe/plugin/vite` | Vite/Rolldown plugin |
| `styleframe/plugin/webpack` | `@styleframe/plugin/webpack` | Webpack plugin |
| `styleframe/plugin/rspack` | `@styleframe/plugin/rspack` | Rspack plugin |
| `styleframe/plugin/rollup` | `@styleframe/plugin/rollup` | Rollup plugin |
| `styleframe/plugin/esbuild` | `@styleframe/plugin/esbuild` | esbuild plugin |
| `styleframe/plugin/astro` | `@styleframe/plugin/astro` | Astro integration |
| `styleframe/plugin/nuxt` | `@styleframe/plugin/nuxt` | Nuxt module |
| `styleframe/plugin/farm` | `@styleframe/plugin/farm` | Farm plugin |

## Usage

### Core API

```ts
import { styleframe, merge } from 'styleframe';

const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe, theme, atRule, keyframes, media, css } = s;

export default s;
```

All core token creation methods, type guards (`isVariable`, `isSelector`, `isRecipe`, etc.), and utility functions (`hashValue`, `deepClone`, `getVariable`, etc.) are available from the main `'styleframe'` import. See `@styleframe/core` AGENTS.md for the full API reference.

### Build Tool Plugins

Each plugin is a default export:

```ts
// vite.config.ts
import styleframe from 'styleframe/plugin/vite';

export default defineConfig({
    plugins: [styleframe()],
});
```

```ts
// webpack.config.js
import styleframe from 'styleframe/plugin/webpack';

module.exports = {
    plugins: [styleframe()],
};
```

```ts
// astro.config.mjs
import styleframe from 'styleframe/plugin/astro';

export default defineConfig({
    integrations: [styleframe()],
});
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: ['styleframe/plugin/nuxt'],
});
```

### Loader

```ts
import { loadConfiguration, loadModule, build, createSharedJiti } from 'styleframe/loader';

const instance = await loadConfiguration({ cwd: process.cwd() });
await build(instance, { outputDir: './styleframe' });
```

See `@styleframe/loader` AGENTS.md for the full loader API reference.

### Transpiler

```ts
import { transpile } from 'styleframe/transpiler';
```

### CLI

```bash
npx styleframe
```

The CLI binary is at `./dist/cli.cjs` and invokes the main function from `@styleframe/cli`.

## Source Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all of `@styleframe/core` |
| `src/cli.ts` | CLI entry point — imports and runs `@styleframe/cli` |
| `src/loader.ts` | Re-exports all of `@styleframe/loader` |
| `src/transpiler.ts` | Re-exports all of `@styleframe/transpiler` |
| `src/plugin/vite.ts` | Default export from `@styleframe/plugin/vite` |
| `src/plugin/webpack.ts` | Default export from `@styleframe/plugin/webpack` |
| `src/plugin/rspack.ts` | Default export from `@styleframe/plugin/rspack` |
| `src/plugin/rollup.ts` | Default export from `@styleframe/plugin/rollup` |
| `src/plugin/esbuild.ts` | Default export from `@styleframe/plugin/esbuild` |
| `src/plugin/astro.ts` | Default export from `@styleframe/plugin/astro` |
| `src/plugin/nuxt.ts` | Default export from `@styleframe/plugin/nuxt` |
| `src/plugin/farm.ts` | Default export from `@styleframe/plugin/farm` |

## Best Practices

1. **Import from `styleframe` rather than `@styleframe/*` sub-packages** — This is the public-facing package. Sub-packages are implementation details.
2. **Use the correct entry point for each concern** — Core API from `'styleframe'`, plugins from `'styleframe/plugin/*'`, loader from `'styleframe/loader'`.
3. **Plugin imports use default exports** — Always `import plugin from 'styleframe/plugin/vite'`, not named imports.
4. **Refer to sub-package AGENTS.md for detailed API docs** — Since this package re-exports, the authoritative API documentation lives in `@styleframe/core`, `@styleframe/loader`, and `@styleframe/transpiler`.
