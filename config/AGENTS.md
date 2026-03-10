# config

Shared build and type-checking configuration packages for the Styleframe monorepo. Contains two packages: `@styleframe/config-typescript` (shared TypeScript compiler settings) and `@styleframe/config-vite` (shared Vite build and Vitest test configuration).

## Package Overview

These packages provide centralized, consistent configuration across all Styleframe engine and theme packages. They are internal infrastructure — not consumed by end users.

---

## @styleframe/config-typescript

Shared `tsconfig.json` base configuration extended by all packages in the monorepo.

**Package:** `@styleframe/config-typescript`
**Exports:** `tsconfig.json` (the main entry point)
**Peer dependency:** `typescript`

### Usage

Extend from this package in any workspace `tsconfig.json`:

```json
{
    "extends": "@styleframe/config-typescript",
    "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
```

### Compiler Options

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `es2022` | Modern JavaScript output |
| `module` | `esnext` | ESM module system |
| `moduleResolution` | `bundler` | Bundler-compatible resolution |
| `strict` | `true` | Full strict mode |
| `noUncheckedIndexedAccess` | `true` | Prevents unsafe indexed access |
| `noImplicitOverride` | `true` | Requires explicit `override` keyword |
| `verbatimModuleSyntax` | `true` | Enforces `import type` for type-only imports |
| `isolatedModules` | `true` | Ensures compatibility with single-file transpilers |
| `moduleDetection` | `force` | Treats all files as modules |
| `declaration` | `true` | Generates `.d.ts` files |
| `declarationMap` | `true` | Generates declaration source maps |
| `sourceMap` | `true` | Generates source maps |
| `composite` | `true` | Enables project references |
| `esModuleInterop` | `true` | CommonJS interop support |
| `skipLibCheck` | `true` | Skips type checking of declaration files |
| `allowJs` | `true` | Allows JavaScript files |
| `resolveJsonModule` | `true` | Allows importing JSON files |
| `outDir` | `dist` | Default output directory |
| `lib` | `es2022, dom, dom.iterable` | Available type libraries |

### Best Practices

1. **Always extend this config** — never duplicate compiler options across packages.
2. **Override only what's necessary** — typically `rootDir`, `outDir`, `include`, and `references`.
3. **Do not weaken strict settings** — the base config enforces `strict`, `noUncheckedIndexedAccess`, and `noImplicitOverride` by design.

---

## @styleframe/config-vite

Shared Vite build configuration and Vitest test setup for all Styleframe library packages.

**Package:** `@styleframe/config-vite`
**Exports:** `createViteConfig` function
**Peer dependencies:** `vite`, `vitest`, `@vitest/coverage-v8`, `vite-plugin-dts`

### Usage

Use in a package's `vite.config.ts`:

```ts
import { createViteConfig } from '@styleframe/config-vite';

export default createViteConfig('package-name', import.meta.dirname);
```

With custom overrides:

```ts
import { createViteConfig } from '@styleframe/config-vite';

export default createViteConfig('package-name', import.meta.dirname, {
    plugins: [customPlugin()],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'src/main.ts'),
        },
    },
});
```

### `createViteConfig(name, cwd, options?)`

Creates a Vite configuration object with library build mode and Vitest test settings.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | Yes | Library name used for build output file naming |
| `cwd` | `string` | Yes | Package root directory (use `import.meta.dirname`) |
| `options` | `UserConfig` | No | Vite config overrides merged into the base config |

**Returns:** `UserConfig` — a Vite configuration object via `defineConfig()`.

**Default configuration:**

| Setting | Value |
|---------|-------|
| Build entry | `src/index.ts` (relative to `cwd`) |
| Build output name | Uses `name` parameter |
| Plugins | `vite-plugin-dts` with `rollupTypes: true` (bundles `.d.ts` output) |
| Test file pattern | `src/**/*.test.{ts,tsx}` |
| Test reporter | `verbose` |
| Coverage provider | `v8` |
| Test globals | `true` (no need to import `describe`, `it`, `expect`) |

**Override behavior:**
- `options.plugins` are appended to the default plugins array (dts plugin is always included).
- `options.build` and `options.build.lib` are shallow-merged with defaults.
- All other Vite config options are spread at the top level.

### Best Practices

1. **Use `import.meta.dirname` for `cwd`** — ensures correct path resolution regardless of how the config is loaded.
2. **Do not override the dts plugin** — it is always included. Add extra plugins via `options.plugins`.
3. **Keep the default entry point** (`src/index.ts`) — only override `build.lib.entry` if the package has a non-standard entry.
4. **Test files follow the convention** `src/**/*.test.{ts,tsx}` — place tests alongside source files, not in a separate directory.
5. **Vitest globals are enabled** — use `describe`, `it`, `expect` without imports. The `@styleframe/config-typescript` base config includes `/// <reference types="vitest/globals" />` via the type declarations.

---

## Anti-Patterns

- Duplicating TypeScript compiler options in individual package `tsconfig.json` files instead of extending the shared config.
- Defining custom Vite build configurations from scratch instead of using `createViteConfig`.
- Removing or weakening strict TypeScript settings in package-level overrides.
- Placing test files outside `src/` — they won't be picked up by the default Vitest include pattern.
- Adding `vite-plugin-dts` manually in overrides — it's already included by default.
