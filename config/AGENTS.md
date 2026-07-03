# config/ — shared build configs

Two small published packages that every workspace package builds against: [`@styleframe/config-typescript`](./typescript/package.json) (a shared `tsconfig.json` base) and [`@styleframe/config-vite`](./vite/package.json) (a `createViteConfig()` factory for library builds + Vitest). Internal infrastructure — consumed via `workspace:^` inside the monorepo, but published to npm, so changes ship publicly.

## Layout

```
config/
├── typescript/
│   ├── package.json       # @styleframe/config-typescript — main/exports point at tsconfig.json
│   └── tsconfig.json      # The entire package: strict ES2022 ESM base config
└── vite/
    ├── package.json       # @styleframe/config-vite
    ├── vite.config.js     # createViteConfig(name, cwd, options?) — plain JS, shipped as-is
    └── vite.config.d.ts   # Hand-written types (also pulls in vitest/globals for consumers)
```

Neither package has a build or test step — the files are published verbatim.

## @styleframe/config-typescript

Consumers put `"extends": "@styleframe/config-typescript"` in their `tsconfig.json` and typically add only `include` and `tsBuildInfoFile` (see [`engine/core/tsconfig.json`](../engine/core/tsconfig.json)). The base enforces `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `verbatimModuleSyntax`, `composite`, `moduleResolution: "bundler"`, and emits declarations + source maps to `dist`. Don't weaken these in package-level overrides.

## @styleframe/config-vite

`createViteConfig(name, cwd, options?)` returns a Vite `UserConfig` with:

- **Library build** — entry `src/index.ts` under `cwd`; pass `import.meta.dirname` (or equivalent) as `cwd`.
- **Declaration rollup** — `vite-plugin-dts` bundles types via api-extractor (with a `lib` override, because inherited `compilerOptions.lib` gets dropped), then the local `dualDeclarations` plugin copies each `.d.ts` to `.d.mts`/`.d.cts` so ESM and CJS consumers both resolve correctly (attw "FalseESM" fix).
- **Vitest** — `globals: true`, includes `src/**/*.test.{ts,tsx}` only, `verbose` reporter, v8 coverage that excludes `**/*.styleframe.ts` and `styleframe.config.ts`.

## Pitfalls

- **`options` is spread first, then `plugins`/`build`/`test` are re-set.** `options.plugins` are appended after the dts plugins, `options.build.lib` is shallow-merged — but an `options.test` block is silently discarded. A package needing custom Vitest settings can't get them through this factory.
- **`vite.config.d.ts` is maintained by hand** and has drifted: it types `options` as `UserConfig["build"]["lib"]`, while the implementation treats it as a full `UserConfig`. If you change `vite.config.js`, update the `.d.ts` too.
- **Vitest globals typing comes from this package**, via the `/// <reference types="vitest/globals" />` in `vite.config.d.ts` — not from the tsconfig base. Tests placed outside `src/` are not picked up at all.
- **Both packages are published**; a change here affects every package's build and needs a changeset.
