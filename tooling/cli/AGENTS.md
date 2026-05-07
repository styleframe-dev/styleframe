# @styleframe/cli

Command-line interface for initializing, building, and syncing Styleframe projects. Provides four commands: `init` for project scaffolding, `build` for compiling Styleframe configurations, `dtcg` for exporting Styleframe variables to spec-conformant DTCG JSON, and `figma` for generating Styleframe code from a Figma-flavoured token export.

## Package Info

- **Name:** `@styleframe/cli`
- **Version:** 3.0.0
- **Binary:** `styleframe` (shebang: `#!/usr/bin/env node`)
- **CLI framework:** `citty` for command parsing, `consola` for styled output
- **Dependencies:** `citty`, `consola`, `magicast` (AST-based config file manipulation), `@styleframe/figma`
- **Peer dependency:** `@styleframe/loader` (configuration loading and transpilation)

---

## Source Structure

```
src/
├── index.ts              # Main CLI entry, command registration, run()
├── package.ts            # Generated version/description (from prebuild)
├── constants.ts          # Documentation URLs
├── utils.ts              # fileExists(), parseJsonc()
├── vite-env.d.ts         # Vite type declarations
└── commands/
    ├── init.ts           # Project initialization
    ├── build.ts          # Build orchestration
    ├── init/
    │   ├── vite.ts       # Vite config file updates
    │   └── nuxt.ts       # Nuxt config file updates
    ├── dtcg/
    │   ├── index.ts      # DTCG parent command
    │   ├── export.ts     # Styleframe → DTCG export
    │   ├── build-dtcg.ts # AST → DTCG document builder
    │   └── evaluate.ts   # TokenValue → primitive reducer
    └── figma/
        ├── index.ts      # Figma parent command
        └── import.ts     # DTCG → Styleframe code generator
```

---

## Commands

### `styleframe init [cwd]`

Initializes a new Styleframe project in the target directory.

| Argument | Type | Default | Aliases | Description |
|----------|------|---------|---------|-------------|
| `cwd` | `string` | `process.cwd()` | `d`, `dir` | Directory to initialize |

**Actions performed:**

1. Creates `styleframe.config.ts` with a basic template (skips if exists)
2. Creates or updates `tsconfig.json` — adds includes for `styleframe.config.ts`, `*.styleframe.ts`, `.styleframe/**/*.d.ts`
3. Adds dependencies to `package.json`:
   - **devDependencies:** `styleframe`, `@styleframe/cli`, `@styleframe/core`, `@styleframe/license`, `@styleframe/loader`, `@styleframe/plugin`, `@styleframe/pro`, `@styleframe/theme`, `@styleframe/transpiler`
   - **dependencies:** `@styleframe/runtime`
4. Auto-detects and updates framework config:
   - **Vite:** Adds `styleframe/plugin/vite` plugin to `vite.config.ts` via magicast
   - **Nuxt:** Adds `styleframe/plugin/nuxt` module to `nuxt.config.ts` via magicast

**Edge cases:**
- Skips file creation if file already exists (logs a warning)
- Merges tsconfig includes rather than overwriting
- Only adds missing dependencies to package.json
- Warns with documentation URL if framework config is not found

---

### `styleframe build [entry]`

Builds Styleframe configuration into output artifacts.

| Argument | Type | Default | Aliases | Description |
|----------|------|---------|---------|-------------|
| `entry` | `string` (positional) | `styleframe.config.ts` | — | Entry point file |
| `outputDir` | `string` | `styleframe` | `o`, `out` | Output directory |
| `clean` | `boolean` | `false` | — | Clean output directory before build |

**Behavior:**
- Loads configuration using `@styleframe/loader`
- Transpiles and builds Styleframe definitions
- Outputs artifacts to the specified directory
- Displays success/error messages via consola

---

### `styleframe dtcg export`

Exports Styleframe variables to spec-conformant DTCG (Design Tokens Community Group) JSON. Themed configurations also emit a sibling `*.resolver.json` document.

| Argument | Type | Default | Aliases | Description |
|----------|------|---------|---------|-------------|
| `config` | `string` | `styleframe.config.ts` | `c` | Styleframe config file path |
| `output` | `string` | `tokens.json` | `o` | Output JSON file path |
| `collection` | `string` | `Design Tokens` | `n`, `name` | Collection name embedded in the export |

**Processing pipeline:**
1. Loads Styleframe configuration via `@styleframe/loader`
2. Extracts root + theme variables
3. Reduces each `TokenValue` to a primitive via `evaluate.ts`
4. Classifies primitives into DTCG types via `@styleframe/dtcg`
5. Emits a `DTCGDocument` (`tokens.json`) and, if there are themes, a `DTCGResolverDocument` (`tokens.resolver.json`)
6. CSS expressions that cannot be reduced are preserved as `dev.styleframe.expression` extensions
7. Tokens with no inferable DTCG type are preserved as untyped strings with `dev.styleframe.unknownType`

---

### `styleframe figma import`

Generates Styleframe TypeScript code from DTCG format JSON.

| Argument | Type | Default | Aliases | Description |
|----------|------|---------|---------|-------------|
| `input` | `string` | **(required)** | `i` | Input DTCG JSON file path |
| `output` | `string` | `tokens.styleframe.ts` | `o` | Output TypeScript file path |
| `composables` | `boolean` | `true` | — | Use `@styleframe/theme` composables (`useColor`, `useSpacing`, etc.) |
| `rem` | `boolean` | `false` | — | Use rem units for dimensions instead of px |
| `baseFontSize` | `string` | `16` | — | Base font size for px→rem conversion |
| `instanceName` | `string` | `s` | — | Styleframe instance variable name |

**Output:** TypeScript file with Styleframe variable definitions, themes, and optional composable usage. Logs summary with variable and theme counts.

---

## Internal Architecture

### Command Registration

Commands are lazy-loaded using dynamic imports for fast CLI startup:

```ts
subCommands: {
    init: () => import("./commands/init").then((m) => m.default),
    build: () => import("./commands/build").then((m) => m.default),
    dtcg: () => import("./commands/dtcg").then((m) => m.default),
    figma: () => import("./commands/figma").then((m) => m.default),
}
```

All commands use citty's `defineCommand()` pattern with typed argument definitions.

### Utility Functions

| Function | Purpose |
|----------|---------|
| `fileExists(path)` | Async file existence check using `fs/promises` |
| `parseJsonc(content)` | Parses JSON with comments — handles `//`, `/* */`, and trailing commas |

### Build System

- **Tool:** Vite with `vite-plugin-node`
- **Exports:** ESM (`.js`) and CommonJS (`.cjs`)
- **Types:** Generated with `vite-plugin-dts`
- **Prebuild:** `scripts/prebuild.ts` generates `src/package.ts` from `package.json`
- **Dev:** `pnpm run dev` (watch mode)

---

## Configuration File Formats

### Generated `styleframe.config.ts`

```ts
import { styleframe } from "styleframe";

const s = styleframe();

s.variable("color--primary", "blue");

export default s;
```

### tsconfig.json Additions

```json
{
    "include": [
        "styleframe.config.ts",
        "*.styleframe.ts",
        ".styleframe/**/*.d.ts"
    ]
}
```

### DTCG Format (Figma Sync)

The export/import commands use DTCG (Design Tokens Community Group) format JSON, which includes:
- Collection name
- Modes (`Default` + theme names)
- Variables with type (`COLOR`, `NUMBER`, `STRING`, `BOOLEAN`), per-mode values, and optional aliases (references)
- Styleframe-specific metadata for round-trip fidelity

---

## Ecosystem Integration

The CLI sits at the **build and initialization layer** of Styleframe:

| Phase | What it does | Packages used |
|-------|-------------|---------------|
| **Init** | Scaffolds project, installs deps, configures build tools | `magicast` |
| **Build** | Loads config, transpiles, generates output | `@styleframe/loader` |
| **DTCG export** | Emits spec-conformant tokens.json (and resolver) | `@styleframe/loader`, `@styleframe/dtcg` |
| **Figma import** | Generates Styleframe code from a Figma export | `@styleframe/figma` |

**Framework integrations:**
- **Vite:** Plugin at `styleframe/plugin/vite`
- **Nuxt:** Module at `styleframe/plugin/nuxt`

---

## Best Practices

1. **Run `init` before `build`** to ensure proper project setup, dependencies, and framework integration.
2. **Use the default entry point** (`styleframe.config.ts`) unless you have a specific reason to change it.
3. **For Figma workflows:** Run `dtcg export` first to validate token structure, then import the JSON via the `@styleframe/figma` plugin. The plugin owns the DTCG → Figma value conversion (rem→px, ms passthrough, etc.).
4. **Use composables mode** (`--composables`) in `figma import` for type-safe, semantic token generation with `@styleframe/theme`.

## Anti-Patterns

- Running `build` without first running `init` or manually setting up the config.
- Editing generated DTCG JSON manually — use Styleframe source files as the source of truth instead.
- Using `--clean` on a build output directory that contains non-Styleframe files.
- Hardcoding the Figma collection name inconsistently between export and import cycles.
