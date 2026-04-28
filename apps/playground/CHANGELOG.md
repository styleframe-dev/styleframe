# @styleframe/playground

## 0.1.0

### Minor Changes

- [#187](https://github.com/styleframe-dev/styleframe/pull/187) [`d1b88ad`](https://github.com/styleframe-dev/styleframe/commit/d1b88ade7ca0dc0bedc74a9f6fa008f86502f2f1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add interactive Styleframe playground app (`apps/playground`)
  - New Vite+Vue 3 app that dogfoods Styleframe for its own UI (split pane, tabs, toolbar, error banner recipes in `apps/playground/src/recipes/`)
  - Three-file editor (`styleframe.config.ts`, `App.vue`, `Component.vue`) powered by CodeMirror 6
  - Client-side pipeline: `esbuild-wasm` for TS, `@styleframe/transpiler` for CSS/runtime, `@vue/compiler-sfc` for Vue SFCs — all running in the browser
  - Preview renders in a sandboxed iframe via `srcdoc` + importmap so the user-edited Styleframe instance never collides with the shell
  - Last-good cache + `postMessage` error forwarding: syntax/runtime failures show a banner but leave the previous valid preview on screen
  - Root scripts: `pnpm dev:playground`, `pnpm build:playground`

### Patch Changes

- Updated dependencies [[`5a37154`](https://github.com/styleframe-dev/styleframe/commit/5a37154540057d115a834961b708a77cbf032783), [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c), [`73a4c55`](https://github.com/styleframe-dev/styleframe/commit/73a4c551a403fcda250b108fb93c9ab7394b27c2), [`689f02b`](https://github.com/styleframe-dev/styleframe/commit/689f02bd98262c4ee7b35b92ca537ac0e50af013), [`ef662ae`](https://github.com/styleframe-dev/styleframe/commit/ef662ae696acf138a14c246b4b6f7a65ebae53c1), [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c), [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c)]:
  - @styleframe/theme@3.5.0
  - styleframe@3.5.0
