# styleframe

The published entry point users install. A pure barrel: every source file is a one-line re-export of an `@styleframe/*` engine package, plus the `styleframe` bin. No implementation lives here — if you came to change behavior, go to the sub-package and come back only to wire up a new entry point.

This package is why the repo-wide import rule exists: consumers write `import { styleframe } from 'styleframe'` and `import styleframe from 'styleframe/plugin/vite'`, never `@styleframe/core` or `@styleframe/plugin/*` directly.

## Layout & entry points

```
src/
├── index.ts         # export * from "@styleframe/core"
├── loader.ts        # export * from "@styleframe/loader"
├── transpiler.ts    # export * from "@styleframe/transpiler"
├── cli.ts           # #!/usr/bin/env node — runs @styleframe/cli's default export
└── plugin/          # one file per bundler, each `export default` from
                     #   @styleframe/plugin/<bundler>
tsdown.config.ts     # per-entry build config + .d.mts emission hook
```

| Subpath | Re-exports | Form |
| --- | --- | --- |
| `styleframe` | `@styleframe/core` | named (`export *`) |
| `styleframe/loader` | `@styleframe/loader` | named (`export *`) |
| `styleframe/transpiler` | `@styleframe/transpiler` | named (`export *`) |
| `styleframe/plugin/{vite,webpack,rspack,rollup,esbuild,astro,nuxt,farm}` | `@styleframe/plugin/<bundler>` | **default export only** |
| `styleframe/cli` + `bin.styleframe` (`dist/cli.js`) | `@styleframe/cli` | executable |

Dependency shape in [`package.json`](./package.json): `@styleframe/cli` and `@styleframe/license` are real dependencies; `@styleframe/core`, `@styleframe/loader`, `@styleframe/transpiler`, and `@styleframe/plugin` are **peerDependencies** — the re-exported code resolves from the consumer's install, not from a bundled copy.

## Adding an entry point

1. Create the one-line re-export in `src/` (or `src/plugin/` — the `./src/plugin/*.ts` glob in [`tsdown.config.ts`](./tsdown.config.ts) picks up new adapter files automatically; other entries need their own config block, with `platform: "node"` or `"neutral"` chosen to match the sub-package).
2. Add the subpath to the `exports` map in [`package.json`](./package.json) with all four `import`/`require` × `types`/`default` conditions — copy an existing block.
3. If it re-exports a package not already listed, add it to `peerDependencies` (and `devDependencies` for local builds).

## Build & test

```bash
pnpm build   # tsdown — dual ESM/CJS per entry into dist/
pnpm test    # vitest run --passWithNoTests (there are currently no tests)
```

## Pitfalls

- **The `emitEsmDeclarations` hook in [`tsdown.config.ts`](./tsdown.config.ts) is load-bearing.** It copies each `dist/**/*.d.ts` to `.d.mts` so the `exports` map's `import.types` condition resolves a real ESM declaration. Remove it and TypeScript consumers on `require` see the ESM types masquerading as CJS.
- **`fixedExtension: false` is deliberate.** tsdown ≥0.22 otherwise emits `.mjs`/`.d.mts` for node-platform entries, which would break every `dist/*.js` path in `bin`, `types`, and `exports`.
- **[`src/cli.ts`](./src/cli.ts) must keep its `#!/usr/bin/env node` shebang** — `bin.styleframe` points at the built `dist/cli.js`.

## See also

- [`engine/core/AGENTS.md`](../core/AGENTS.md), [`engine/loader/AGENTS.md`](../loader/AGENTS.md), [`engine/transpiler/AGENTS.md`](../transpiler/AGENTS.md), [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md), [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md) — where the actual APIs live.
- [`README.md`](./README.md) — the npm-facing product page.
