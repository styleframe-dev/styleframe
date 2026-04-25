---
"@styleframe/playground": minor
---

Add interactive Styleframe playground app (`apps/playground`)

- New Vite+Vue 3 app that dogfoods Styleframe for its own UI (split pane, tabs, toolbar, error banner recipes in `apps/playground/src/recipes/`)
- Three-file editor (`styleframe.config.ts`, `App.vue`, `Component.vue`) powered by CodeMirror 6
- Client-side pipeline: `esbuild-wasm` for TS, `@styleframe/transpiler` for CSS/runtime, `@vue/compiler-sfc` for Vue SFCs — all running in the browser
- Preview renders in a sandboxed iframe via `srcdoc` + importmap so the user-edited Styleframe instance never collides with the shell
- Last-good cache + `postMessage` error forwarding: syntax/runtime failures show a banner but leave the previous valid preview on screen
- Root scripts: `pnpm dev:playground`, `pnpm build:playground`
