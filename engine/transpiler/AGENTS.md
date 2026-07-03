# @styleframe/transpiler

The codegen stage of the Styleframe engine. Takes a compiled `Styleframe` instance (the token AST from [`@styleframe/core`](../core/AGENTS.md)) and emits strings: a CSS stylesheet, TypeScript runtime code for recipes and exported selectors, and `.d.ts` declarations for the virtual modules. It is pure string generation — no file I/O, no caching. Writing to disk is [`@styleframe/loader`](../loader/AGENTS.md)'s `build()`; the main callers are the build plugin ([`tooling/plugin`](../../tooling/plugin/AGENTS.md)), the CLI, and the loader. Published to npm; end users reach it via the `styleframe/transpiler` barrel subpath.

## Layout

```
src/
├── index.ts        # Barrel — re-exports constants, defaults, consumeCSS/consumeTS,
│                   # DTS filenames, minify, transpile, types, utils
├── transpile.ts    # transpile(instance, options) + createFile — the entry point
├── types.ts        # Output, OutputFile, ConsumeFunction, TranspileContext, TranspileOptions
├── constants.ts    # DEFAULT_INDENT ("\t"), STATEMENT_AT_RULES, STATEMENT_OR_BLOCK_AT_RULES
├── defaults.ts     # defaultThemeSelectorFn, defaultVariableNameFn (dot → "--")
├── license.ts      # addLicenseWatermark — injects a watermark selector into the AST
├── utils.ts        # Indent helpers + scule-backed case conversion
├── generator/      # Raw CSS syntax builders: genSelector, genDeclaration, genDeclareVariable, …
├── consume/
│   ├── css/        # Token → CSS. consume.ts is the dispatcher; one consumer per token type
│   ├── ts/         # Token → runtime TS (createRecipe calls + exported selector consts)
│   └── dts/        # Token → styleframe.d.ts + shims.d.ts (constants + rationale in constants.ts)
└── minify/         # Utility class-name shortening (generateShorteningMap, shortenUtilityOptions)
```

## The consumer pattern

Every pipeline is a `ConsumeFunction`: `(instance, options, context?) => string` ([`src/types.ts`](./src/types.ts)). For CSS, [`consume/css/consume.ts`](./src/consume/css/consume.ts) is the dispatcher — a type-guard switch routing each token to a consumer built by a factory (`createSelectorConsumer(consume)`, …). Factories receive the top-level `consume` back, so consumers recurse into children. If core gains a new token type, you must add a consumer and a dispatcher case here — unhandled tokens fall through to the primitive consumer and produce silently wrong CSS instead of an error.

## What `transpile()` emits

[`transpile(instance, options)`](./src/transpile.ts), by `options.type`:

| `type`          | Files                                                    |
| --------------- | -------------------------------------------------------- |
| `"css"`         | `index.css`                                              |
| `"ts"`          | `index.ts`                                               |
| `"dts"`         | `styleframe.d.ts` + `shims.d.ts`                         |
| `"all"` (default) | `index.css` + `index.ts` — **dts is not part of `"all"`** |

Other options: `treeshake` (drop variables absent from `instance._usage.variables`; combined with `scanner: true` also drops unused utilities), and `minify`/`minifyOptions` (build a `ShorteningMap` via [`src/minify/`](./src/minify/), shorten utility class names in the CSS, and embed the map in the TS output so the runtime shortens the same way).

**TS/DTS emission is driven by loader metadata.** Recipes come from `instance.recipes` (filtered to `_usage.recipes` when non-empty). Selectors are emitted only when `_exportName` is set — which the loader's `trackExports` does at load time. An instance that wasn't loaded through `@styleframe/loader` produces no selector exports.

**The two DTS files describe the same exports in two forms** — `styleframe.d.ts` (top-level exports, mapped to `virtual:styleframe` via `compilerOptions.paths` for Vue/`vue-tsc`) and `shims.d.ts` (self-contained `declare module` ambient shims that non-Vue consumers pick up with zero config). The full rationale lives in [`src/consume/dts/constants.ts`](./src/consume/dts/constants.ts).

**License watermark:** if `isInstanceLicenseRequired(instance)` and validation fails, `addLicenseWatermark` ([`src/license.ts`](./src/license.ts)) pushes a fixed-position "Development Mode" selector into the AST before CSS emission.

## Build & test

```bash
pnpm --filter @styleframe/transpiler build   # tsc --noEmit && vite build
pnpm --filter @styleframe/transpiler test    # vitest run
```

Tests are colocated as `<file>.test.ts` next to source under `src/` — there is no separate `test/` directory in this package.

## Pitfalls

- **`type: "all"` does not emit declaration files.** The plugin makes a separate `transpile(instance, { type: "dts" })` call ([`tooling/plugin/src/plugin/generate/dts.ts`](../../tooling/plugin/src/plugin/generate/dts.ts)). If you add output to one mode, check whether the other callers need it.
- **`defaultThemeSelectorFn` emits `.name-theme, [data-theme="name"]`** — both a class and an attribute selector ([`src/defaults.ts`](./src/defaults.ts)). Tests or docs asserting only `[data-theme]` are out of date.
- **New token types fail silently.** See "The consumer pattern" — the primitive fallback means missing dispatcher cases don't throw.
- **`ConsumeFunction` takes a third `context` argument** (`TranspileContext`: treeshake/scanner/shortMap). Custom consumers passed via `options.consumers` that ignore it will break treeshaking and minification.

## See also

- [`engine/core/AGENTS.md`](../core/AGENTS.md) — the token AST this package consumes.
- [`engine/loader/AGENTS.md`](../loader/AGENTS.md) — sets `_exportName`, calls `transpile()` from `build()`.
- [`engine/runtime/AGENTS.md`](../runtime/AGENTS.md) — `createRecipe`, imported by the generated TS.
- [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md) — how CSS/TS/DTS outputs back the virtual modules.
