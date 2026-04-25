# @styleframe/playground

Interactive, client-side-only Styleframe playground. Three editable files — `styleframe.config.ts`, `App.vue`, `Component.vue` — compile and render live on each keystroke.

## Run

```sh
pnpm dev --filter @styleframe/playground
# or
pnpm dev:playground
```

Then open http://localhost:5173.

Build a static deployable bundle:

```sh
pnpm build --filter @styleframe/playground
```

## Why this exists

Two reasons, both load-bearing:

1. **Dogfooding.** The playground UI — split pane, tabs, toolbar, editor chrome, error banner — is styled entirely with Styleframe. The shell's own `apps/playground/styleframe.config.ts` registers a set of playground-local recipes (`pg-tab`, `pg-split-pane`, etc.) alongside the standard theme presets.
2. **Preview isolation.** The user-edited config generates its own CSS variables, utility classes, and recipe class names. If those were injected into the same document as the shell, they would collide with the shell's own Styleframe output. The preview therefore renders inside an iframe (`srcdoc`, `sandbox="allow-scripts allow-same-origin"`), which gets its own `<style>` block, its own Vue runtime, and its own `@styleframe/runtime` import via an importmap. The shell's Styleframe world and the user's Styleframe world never share a document.

## Pipeline

On each keystroke (300 ms debounce):

1. `esbuild-wasm` compiles the user's TypeScript config to ES modules JS.
2. The compiled config is evaluated in the parent with its imports stubbed to the real `styleframe` / `@styleframe/theme` packages, producing an in-memory `Styleframe` instance.
3. `@styleframe/transpiler`'s `transpile()` returns generated CSS + a TypeScript runtime module.
4. The runtime TS module is compiled again (to strip TS), yielding a JS module that imports `{ createRecipe }` from `@styleframe/runtime` and exports each named recipe.
5. `@vue/compiler-sfc` compiles `App.vue` and `Component.vue` into ESM modules.
6. `buildSrcdoc` packages the CSS and the three compiled modules into a single HTML document and assigns it to `iframe.srcdoc`. Cross-file imports (`./Component.vue`, `./styleframe.config`) are rewritten to blob URLs.
7. Any failure is caught per-stage; the last valid preview stays on screen and an error banner shows the first failing message. Runtime errors inside the iframe are forwarded to the shell via `postMessage`.

## Layout

```
apps/playground/
├── styleframe.config.ts          # shell config (dogfooding)
├── index.html
├── vite.config.ts
├── src/
│   ├── App.vue                   # playground shell root
│   ├── main.ts
│   ├── recipes/                  # playground-local recipes registered in .styleframe.ts
│   ├── components/               # SplitPane, TabList, EditorPane, OutputPane, PreviewFrame, ErrorBanner, CodeOutput
│   ├── editor/                   # CodeMirror 6 factory and theme
│   ├── pipeline/                 # esbuild-wasm + Vue SFC + transpiler orchestration
│   ├── samples/                  # default file contents (imported as ?raw)
│   └── state/                    # reactive playground state
└── test/                         # Vitest unit tests
```

## Notes

- The playground is **not published to npm**. It's a standalone deployable static site.
- `esbuild-wasm` pulls a ~3 MB `.wasm` asset the first time the user types — loaded lazily and once per session.
- Vue and `@styleframe/runtime` are served from the parent origin (Vite emits hashed assets for them via `?url` imports); the iframe consumes them through its importmap.
- This app depends on `@styleframe/plugin` only for the shell's own `styleframe.config.ts` at dev/build time. The user-edited config never goes through the plugin.
