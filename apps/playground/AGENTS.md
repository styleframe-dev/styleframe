# @styleframe/playground

The interactive, fully client-side Styleframe playground. Users edit a multi-file project (React 19 `.tsx` components, `*.styleframe.ts` extension files, and a `styleframe.config.ts`) in CodeMirror 6, manage files/folders in a project tree, and see the compiled preview, CSS, and generated runtime JS live. The shell itself is a Vite + Vue 3 app; the user's code is bundled in-browser with `esbuild-wasm` and rendered in a sandboxed iframe. `private: true`, but versioned via changesets (it is not in the ignore list). [`README.md`](./README.md) covers the why and the user-facing behavior.

## Layout

```
apps/playground/
├── styleframe.config.ts     # shell design tokens: theme presets + #app selectors
├── vite.config.ts           # styleframe plugin (minify:false) + vue() + React vendor/runtime virtual modules
├── src/
│   ├── App.vue              # shell root: toolbar │ Editor │ Output │ Tree │ status bar
│   ├── components/          # SplitPane, EditorPane, FileTree, FileTabList, OutputPane,
│   │                        # PreviewFrame, CodeOutput, BrowserChrome, StatusBar, ErrorBanner, …
│   ├── editor/codemirror.ts # createEditor + languageForPath (ts / tsx / css)
│   ├── pipeline/            # the compile pipeline (see below)
│   ├── recipes/             # shell-only pg-* recipes; registered in playground.styleframe.ts
│   ├── samples/             # default project contents, imported as ?raw
│   └── state/               # playground.ts (files/tabs/output), theme.ts (auto|light|dark toggle)
└── test/                    # Vitest specs for the pipeline + state (jsdom)
```

## Two Styleframe worlds, isolated by an iframe

The **shell** is compiled by `@styleframe/plugin/vite` at build time and dogfoods Styleframe for all chrome (recipes in [`src/recipes/`](./src/recipes/), registered via [`playground.styleframe.ts`](./src/recipes/playground.styleframe.ts); no inline styles beyond a few layout resets in `App.vue`). The **user's project** is compiled at runtime by `@styleframe/transpiler` + `esbuild-wasm` and rendered inside `<iframe sandbox="allow-scripts allow-same-origin">` via `srcdoc`, with its own `<style>` and its own React — the two worlds never share a document, so class names and CSS variables cannot collide.

React is vendored once as an IIFE ([`vite.config.ts`](./vite.config.ts) `buildReactVendor`) publishing `globalThis.PGReactVendor`; the preview bundle reads it through shims. Everything else resolves through an in-memory virtual-FS esbuild plugin in [`bundlePreview.ts`](./src/pipeline/bundlePreview.ts) — relative imports against the files map, `virtual:styleframe` → the generated runtime TS, `@styleframe/runtime` → vendored source. No importmap, no network.

## Pipeline

[`pipeline.ts`](./src/pipeline/pipeline.ts) `runPipeline({ files, configPath, entryPath })` runs stages sequentially and returns `{ ok: false, stage, error }` on the first failure: `config-transform` → `config-eval` (config runs via `new Function`; the only code the parent evaluates) → `styleframe` (each `*.styleframe.ts` mutates the shared instance, mirroring how `@styleframe/plugin` loads them) → `scan` (utility classes) → `transpile` → `bundle` → `assemble` (srcdoc). `transpileStyleframe` sets `treeshake: false` — the scanner can't see runtime recipe calls, so tree-shaking would drop CSS the preview needs. On failure the last good preview stays on screen.

## Conventions that will bite you if ignored

- **Default project = the UI Kit samples.** [`src/state/playground.ts`](./src/state/playground.ts) seeds `files` from [`src/samples/`](./src/samples/): `styleframe.config.ts`, `src/App.tsx` (entry; default export is the preview root), and one `src/components/<Name>/` folder per block (Avatar, Badge, Button, Callout, Card, Checkbox, Input, Spinner), each `.tsx` paired with a `.styleframe.ts`. Config and entry (and their folders) are protected from rename/delete.
- **Sample files use `.sample.tsx` / `.styleframe.sample.ts` suffixes** and are excluded in [`tsconfig.app.json`](./tsconfig.app.json) — they type-check against the *user's* `virtual:styleframe`, not the shell's, and the suffix keeps them out of the shell plugin's `**/*.styleframe.ts` glob. New sample = new `?raw` import + entry in `initialFiles`.
- **`*.styleframe.ts` files are evaluated, never bundled or scanned** (`isStyleframeFile` in `pipeline.ts`).
- Shell theme toggle lives in [`src/state/theme.ts`](./src/state/theme.ts): `auto|light|dark`, persisted under `sf-playground-theme`, applied as `data-theme`.

## Build & test

```bash
pnpm dev:playground                              # from repo root (turbo filter); http://localhost:5173
pnpm build:playground                            # static bundle
pnpm test --filter @styleframe/playground        # Vitest (jsdom), specs in test/
pnpm typecheck --filter @styleframe/playground   # vue-tsc
```

Adding a `pg-*` shell recipe requires one `pnpm dev:playground` (or build) run so the plugin regenerates `.styleframe/styleframe.d.ts` before `typecheck` passes. Manual smoke test: create a file from the tree, import it into `App.tsx`, Ctrl/Cmd+S, confirm the Preview / CSS Output / JS Output tabs update.

## See also

- [`README.md`](./README.md) — user-facing behavior, layout diagram, deeper pipeline notes.
- [`../../theme/AGENTS.md`](../../theme/AGENTS.md) — the presets and recipes the samples and shell consume.
- [`../../engine/transpiler/AGENTS.md`](../../engine/transpiler/AGENTS.md) — `transpile(instance)` used by the runtime pipeline.
