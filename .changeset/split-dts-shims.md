---
"styleframe": patch
"@styleframe/transpiler": patch
"@styleframe/plugin": patch
"@styleframe/cli": patch
---

Restructure generated DTS output into three concern-separated files. The transpiler's `dts` mode now emits:

- `styleframe.d.ts` — top-level exports describing the `virtual:styleframe` module
- `shims.d.ts` — ambient shim for the `virtual:styleframe.css` module only
- `tsconfig.json` — an extension point that maps `virtual:styleframe` imports to `styleframe.d.ts` via `compilerOptions.paths`

`virtual:styleframe` is now resolved through tsconfig `paths` instead of a `declare module` wrapper, so the generated declarations stay clean and reusable. `styleframe init` extends the generated `./.styleframe/tsconfig.json` so virtual-module imports type-check out of the box.

The Nuxt module now registers the `virtual:styleframe` path mapping into Nuxt's generated types via the `prepare:types` hook (rather than relying on `extends`, which would clobber Nuxt's own `paths`), so imports type-check without manual tsconfig changes. It also fixes the module's `configKey`/`name`, which were leftover `unpluginStarter` placeholders that caused `styleframe: {}` options in `nuxt.config` to be ignored.
