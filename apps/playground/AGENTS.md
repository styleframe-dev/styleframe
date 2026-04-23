# Styleframe Playground

Interactive client-side playground for Styleframe. Users edit three files in CodeMirror; an iframe renders the live result.

## Package

- **Name:** `@styleframe/playground`
- **Build tool:** Vite 7 + Vue 3
- **Runs:** fully client-side — no server, no auth, no persistence.
- **Not published to npm.**

## Source Layout

```
apps/playground/
├── styleframe.config.ts         # shell: theme presets + #app / html selectors
├── vite.config.ts               # Styleframe Vite plugin + vue()
├── index.html
├── src/
│   ├── App.vue                  # playground shell root
│   ├── main.ts                  # imports virtual:styleframe.css, mounts App
│   ├── recipes/                 # playground-local recipes (pg-*)
│   │   ├── useTabRecipe.ts
│   │   ├── useTabListRecipe.ts
│   │   ├── useSplitPaneRecipe.ts
│   │   ├── useEditorShellRecipe.ts
│   │   ├── useErrorBannerRecipe.ts
│   │   ├── useToolbarRecipe.ts
│   │   ├── index.ts             # barrel
│   │   └── playground.styleframe.ts  # registers recipes into the shell instance
│   ├── components/
│   │   ├── SplitPane.vue
│   │   ├── TabList.vue
│   │   ├── EditorPane.vue       # 3-tab editor (config, App, Component)
│   │   ├── OutputPane.vue       # 3-tab output (Preview, CSS, JS)
│   │   ├── CodeOutput.vue       # read-only CodeMirror
│   │   ├── PreviewFrame.vue     # iframe + postMessage listener
│   │   └── ErrorBanner.vue
│   ├── editor/
│   │   ├── codemirror.ts        # createEditor({parent, doc, language, onChange})
│   │   └── theme.ts             # CodeMirror theme extension
│   ├── pipeline/
│   │   ├── esbuild.ts           # lazy esbuild-wasm init (single instance)
│   │   ├── transformTs.ts
│   │   ├── evalUserConfig.ts    # rewrites imports, runs via new Function
│   │   ├── transpileStyleframe.ts
│   │   ├── compileVueSfc.ts
│   │   ├── buildSrcdoc.ts
│   │   └── pipeline.ts          # orchestrator + debounce + PipelineResult
│   ├── samples/                 # default file contents, imported as ?raw
│   └── state/
│       └── playground.ts        # reactive { files, output, error, active* }
└── test/                        # Vitest specs for pipeline units
```

## Architecture

**Two Styleframe contexts, isolated by an iframe.**

| Context | Compiled by | Where CSS lives | Runtime |
|---|---|---|---|
| Shell UI | `@styleframe/plugin/vite` at dev/build time | `<style>` in parent document | `@styleframe/runtime` bundled into parent |
| User-edited preview | `esbuild-wasm` + `@styleframe/transpiler` at runtime | `<style>` inside iframe `srcdoc` | `@styleframe/runtime` loaded via iframe importmap |

The iframe has `sandbox="allow-scripts allow-same-origin"` so it can fetch blob URLs and use an importmap. Cross-file imports between user files are rewritten to blob URLs:

- `./Component.vue` inside App.vue → blob URL of compiled Component
- `./styleframe.config` inside Component.vue → blob URL of the compiled runtime TS module (which exports `card`, `cardHeader`, etc.)

## Pipeline Stages

`runPipeline(input)` runs these sequentially, and returns `{ ok: false, stage, error }` if any step throws:

| Stage | Input | Output |
|---|---|---|
| `config-transform` | user's `styleframe.config.ts` source | compiled JS |
| `config-eval` | compiled JS | `Styleframe` instance |
| `transpile` | `Styleframe` instance | `{ css, ts }` from `@styleframe/transpiler` |
| `config-compile` | `ts` | compiled JS module for the iframe |
| `vue` | App + Component SFC sources | compiled ESM modules |
| `assemble` | all of the above + Vue/runtime URLs | `srcdoc` string |

On success, the parent assigns `iframe.srcdoc = srcdoc` and revokes the previous run's blob URLs.

## Key Conventions

1. **Shell styling is via Styleframe only.** No inline styles except for a handful of layout-critical resets in `App.vue`/`SplitPane.vue` (`flex: 1`, `min-height: 0`, etc.). All colors/spacing/borders come from the recipes in `src/recipes/`.
2. **User file specifiers.** User code imports recipes from `"./styleframe.config"` (no extension). The pipeline rewrites that to a blob URL. User code imports `Component.vue` from `"./Component.vue"` — same treatment.
3. **Sample files are in `src/samples/`**, imported via `?raw`. Edit these to change what the playground shows on first load.
4. **CodeMirror 6 used directly.** No wrapper library. Language is selected per file via `@codemirror/lang-javascript` (`typescript: true`) or `@codemirror/lang-vue`.
5. **Parent never evaluates untrusted code.** The user's config runs inside `new Function(...)` with a rewritten source; the Vue SFCs only run inside the iframe.
6. **The last valid preview stays on screen.** The error banner overlays the affected tab; blob URLs from the previous successful run are only revoked when the next run succeeds.

## Testing

```sh
pnpm test --filter @styleframe/playground     # Vitest unit tests (jsdom)
pnpm typecheck --filter @styleframe/playground
```

Manual verification: run `pnpm dev:playground`, edit each of the three files, confirm the three right-hand tabs update, and force a syntax error to see the banner behavior.

## Related

- `theme/src/recipes/card/` — recipes used by the default sample `Component.vue`.
- `engine/transpiler/src/transpile.ts` — `transpile(instance)` API consumed by `src/pipeline/transpileStyleframe.ts`.
- `engine/runtime/src/runtime.ts` — `createRecipe` consumed by the iframe's compiled config module.
- `apps/storybook/` — mirror setup for Vite + Vue + `@styleframe/plugin`.
