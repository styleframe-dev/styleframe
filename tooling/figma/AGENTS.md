# @styleframe/figma

Bidirectional sync between Styleframe design tokens and Figma variables, with DTCG as the wire format. Two deliverables in one package:

1. **A converter library** ([`src/converters/`](./src/converters/), the npm entry point) — pure functions bridging DTCG documents, Figma's variable model, and generated Styleframe code. Consumed by the CLI's `styleframe figma export|import` commands ([`tooling/cli/src/commands/figma/`](../cli/src/commands/figma/)).
2. **The Figma plugin** ([`src/plugin/`](./src/plugin/)) — sandbox code + single-file UI that imports/exports variable collections inside Figma. Built into `dist/plugin/`, referenced by [`manifest.json`](./manifest.json), shipped in the tarball but not importable via the `exports` map.

All spec-level DTCG work (parsing, validation, aliases, resolver, classification) lives in [`@styleframe/dtcg`](../dtcg/AGENTS.md) — this package only bridges.

## Layout

```
manifest.json                  # Figma plugin manifest → dist/plugin/{code.js,ui.html}
vite.config.ts                 # Two plugin builds: --mode code (IIFE sandbox) + UI (singlefile)
src/
├── index.ts                   # npm barrel: types + converters
├── types.ts                   # FigmaExportFormat, FigmaExportVariable, FigmaRGBA, codegen types
├── converters/
│   ├── name-mapping.ts        # dot ↔ slash ↔ camelCase ↔ --css--var name conversions
│   ├── value-parsing.ts       # CSS ↔ Figma RGBA colors, dimension ↔ px, type detection
│   ├── codegen.ts             # generateStyleframeCode(): FigmaExportFormat → Styleframe TS
│   └── dtcg/
│       ├── figma-bridge.ts    # type/value/path mapping between DTCG and Figma primitives
│       ├── to-dtcg.ts         # FigmaExportFormat → { tokens, resolver? } (export path)
│       ├── from-dtcg.ts       # fromDTCG / fromDTCGResolver → FigmaExportFormat (import path)
│       └── flatten-to-figma-dtcg.ts  # spec DTCG (+resolver) → per-mode Figma-safe docs
└── plugin/
    ├── code.ts                # Sandbox: variable CRUD, two-pass alias import
    ├── shared.ts              # Format detection (isDTCGFormat, isDTCGResolver), UI preview
    └── ui/                    # ui.html + main.ts + styles.css, inlined by vite-plugin-singlefile
```

## Data flow

Everything routes through `FigmaExportFormat` ([`src/types.ts`](./src/types.ts)): a collection name, an ordered mode list (first = default), and variables with per-mode values, using Figma's four types (`COLOR | FLOAT | STRING | BOOLEAN`) and slash-notation names.

- **Styleframe → Figma**: `styleframe figma export` (CLI) builds a spec DTCG document, then [`flattenToFigmaDTCG`](./src/converters/dtcg/flatten-to-figma-dtcg.ts) expands the resolver into one document per mode, restricted to the three DTCG types Figma can hold (`number`, `color`, `string`) and returning `FlattenDiagnostic[]` for everything downgraded. The plugin UI accepts those per-mode files and merges them mode-by-mode via `fromDTCG`.
- **DTCG → Figma**: `fromDTCG(doc)` (single mode) or `fromDTCGResolver(resolver, { fileLoader })` (each resolver context becomes a Figma mode). The sandbox can't fetch URLs, so [`code.ts`](./src/plugin/code.ts) satisfies the resolver's `$ref` from the uploaded in-memory document.
- **Figma → DTCG**: plugin export reads a collection into `FigmaExportFormat`, then [`toDTCG`](./src/converters/dtcg/to-dtcg.ts) emits `{ tokens, resolver? }` — default-mode values in the token document, non-default modes as inline resolver contexts under a single `theme` modifier.
- **Figma → Styleframe code**: `styleframe figma import` (CLI) runs [`generateStyleframeCode`](./src/converters/codegen.ts), grouping variables by first path segment and emitting `use<Category>DesignTokens` composable calls (see `COMPOSABLE_MAP`) with `variable()` fallbacks, plus `s.theme()` blocks for non-default modes.

### Lossiness rules (verified in code, keep in sync)

- **Booleans**: DTCG has no boolean type. `toDTCG` emits them as `$type: "string"` tokens tagged `$extensions["dev.styleframe"].boolean`; `fromDTCG` reads that tag and reconstructs a Figma BOOLEAN.
- **Unclassifiable values**: exported with no `$type` plus a `dev.styleframe.unknownType` extension rather than being dropped.
- **Aliases**: exported as `{a.b}` with no `$type` — Figma alone can't supply the target's type.
- **Composite types and unsupported units**: `flattenToFigmaDTCG` downgrades them to strings and reports each in `diagnostics`.

## Plugin protocol

UI → sandbox: `import` (data/modes/resolver/tokensRef), `export` (collectionId, modeId), `get-collections`, `close`. Sandbox → UI: `set-mode`, `collections`, `import-complete`, `export-complete`, `error`. Import creates non-alias variables first, then aliases in a second pass, seeding the lookup with all existing local variables so cross-collection targets resolve.

## Build & test

```bash
pnpm build          # tsdown (library) + vite build --mode code + vite build (plugin)
pnpm build:lib      # library only → dist/index.js
pnpm build:plugin   # plugin only → dist/plugin/{code.js,ui.html}
pnpm test           # vitest run — tests colocated as src/**/*.test.ts (unlike ../dtcg's test/ dir)
pnpm typecheck      # tsc --noEmit
```

To try the plugin in Figma: run the full `pnpm build`, then load [`manifest.json`](./manifest.json) via Figma → Plugins → Development.

## Pitfalls

- **The sandbox build targets ES2017 IIFE** ([`vite.config.ts`](./vite.config.ts)) — Figma's plugin sandbox has no DOM and limited ES support. Don't add DOM APIs or top-level await to anything reachable from [`code.ts`](./src/plugin/code.ts).
- **Figma variables can't change `resolvedType` once created.** Import handles this by removing and recreating on type mismatch — a stale STRING `spacing/md` would otherwise silently reject FLOAT values and display 0.
- **Legacy mode formats are gone.** `fromDTCG` ignores `$extensions["dev.styleframe"].modes` and `$modifiers` embedded in token documents; multi-mode input must come through the resolver flow or per-mode documents. (The header comment in `to-dtcg.ts` still claims booleans are dropped — the code tags them instead; trust the code.)
- **Both vite builds write to `dist/plugin/` with `emptyDirOnBuild: false`** — running only one build leaves the other artifact stale. `pnpm build:plugin` runs both.

## See also

- [`../dtcg/AGENTS.md`](../dtcg/AGENTS.md) — the spec layer this package builds on, including `classifyValue`.
- [`../cli/src/commands/figma/`](../cli/src/commands/figma/) and [`../cli/src/commands/dtcg/`](../cli/src/commands/dtcg/) — the CLI entry points for the sync workflow.
