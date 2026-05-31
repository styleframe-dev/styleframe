---
"styleframe": patch
"@styleframe/transpiler": patch
"@styleframe/plugin": patch
"@styleframe/cli": patch
---

Restructure generated DTS output into two concern-separated files. The transpiler's `dts` mode now emits:

- `styleframe.d.ts` — top-level exports describing the `virtual:styleframe` module
- `shims.d.ts` — ambient shim for the `virtual:styleframe.css` module only

`virtual:styleframe` is resolved by a `compilerOptions.paths` entry mapping it to `styleframe.d.ts` (instead of a `declare module` wrapper), so the generated declarations stay clean and reusable. `styleframe init` writes that `paths` entry directly into the project's `tsconfig.json` (merging into any existing `paths`), so virtual-module imports type-check out of the box.

The Nuxt module registers the same `virtual:styleframe` path mapping into Nuxt's generated types via the `prepare:types` hook, so imports type-check without manual tsconfig changes. It also fixes the module's `configKey`/`name`, which were leftover `unpluginStarter` placeholders that caused `styleframe: {}` options in `nuxt.config` to be ignored.
