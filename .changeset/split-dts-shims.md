---
"styleframe": patch
"@styleframe/transpiler": patch
"@styleframe/plugin": patch
"@styleframe/cli": patch
---

Generate DTS output as two files that describe the virtual modules in two complementary forms. The transpiler's `dts` mode now emits:

- `styleframe.d.ts` — top-level exports describing the `virtual:styleframe` module
- `shims.d.ts` — self-contained ambient declarations: a `declare module "virtual:styleframe"` carrying the full typed exports, plus the `virtual:styleframe.css` string shim

Non-Vue consumers resolve both virtual modules from `shims.d.ts` alone (picked up via the `.styleframe/**/*.d.ts` include) with **zero `paths` configuration**. Vue consumers additionally map `virtual:styleframe` to `styleframe.d.ts` via a `compilerOptions.paths` entry, because `vue-tsc` won't resolve a bare-specifier ambient module imported inside a `.vue` SFC. `styleframe init` detects plain Vue projects (a `vue` dependency without `nuxt`) and writes that `paths` entry only for them, merging into any existing `paths`; non-Vue projects just get the includes. Nuxt is excluded because its module already injects the mapping via `prepare:types`, and writing `paths` into an `extends`-based Nuxt root tsconfig would replace (not merge) Nuxt's inherited aliases.

The Nuxt module registers the same `virtual:styleframe` path mapping into Nuxt's generated types via the `prepare:types` hook, so imports type-check without manual tsconfig changes. It also fixes the module's `configKey`/`name`, which were leftover `unpluginStarter` placeholders that caused `styleframe: {}` options in `nuxt.config` to be ignored.
