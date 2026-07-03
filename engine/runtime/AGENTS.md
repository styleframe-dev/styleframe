# @styleframe/runtime

The piece of Styleframe that ships to the browser. One export matters: `createRecipe(name, runtime, shortMap?)` in [`src/runtime.ts`](./src/runtime.ts) takes a pre-computed `RecipeRuntime` object (token values already resolved at build time) and returns `(props?) => string`, producing a space-separated utility class string like `button _border-width:thin _background:primary`. Published to npm. You rarely call it by hand — the transpiler emits `import { createRecipe } from '@styleframe/runtime'` into the generated `virtual:styleframe` module (see [`engine/transpiler/src/consume/ts/root.ts`](../transpiler/src/consume/ts/root.ts)), so this bundle ends up in end-user apps.

**Keep it dependency-free.** `@styleframe/core` is a peer dependency used for types only; `src/runtime.ts` imports nothing at runtime. Adding a runtime import here adds bytes to every consumer's client bundle.

## Layout

```
src/
├── index.ts         # Barrel: re-exports runtime.ts + types.ts
├── runtime.ts       # createRecipe + class-name assembly — the whole implementation
├── types.ts         # RecipeVariantProps inference; re-exports runtime types from core
└── runtime.test.ts  # Colocated Vitest suite
```

## How class strings are assembled

All in [`src/runtime.ts`](./src/runtime.ts) (`toClassName`, `processDeclarationsBlock`):

- Declarations map to `_<name>:<value>` classes; camelCase names are kebab-cased (`borderWidth: "thin"` → `_border-width:thin`). A literal `true` value drops the suffix (`{ hidden: true }` → `_hidden`).
- Object values one level deep are modifier blocks: `hover: { background: "x" }` → `_hover:background:x`. Compound keys split on `:` (`"hover:focus"` → `_hover:focus:…`).
- Override order per utility+modifier key: `base` → `variants` (props, falling back to `defaultVariants`; boolean props are coerced with `String()` so `disabled: true` selects the `"true"` option) → `compoundVariants` whose `match` conditions all hold. Later wins.
- A matched compound variant may also contribute a raw `className`, appended after the utility classes.
- The optional third argument is a `ShorteningMap` (`{ p, v, m }` from `@styleframe/core`) that remaps property, value, and modifier names for minified class output. The transpiler passes it when class shortening is enabled.

`RecipeVariantProps<R>` in [`src/types.ts`](./src/types.ts) infers the props type from a runtime object: each variant key becomes a union of its option names, and variants declaring both `"true"` and `"false"` options additionally accept a plain `boolean`. Runtime objects should be written `as const satisfies RecipeRuntime` so the inference sees literal keys.

## Build & test

```bash
pnpm --filter @styleframe/runtime test     # vitest run (src/runtime.test.ts)
pnpm --filter @styleframe/runtime build    # tsc --noEmit && vite build
```

The Vite config comes from [`@styleframe/config-vite`](../../config/vite) via [`vite.config.ts`](./vite.config.ts); output is ESM + UMD in `dist/`.

## Pitfalls

- **The class-name format is a cross-package contract.** The strings emitted here must match, byte for byte, the class names the scanner extracts ([`engine/scanner/src/constants.ts`](../scanner/src/constants.ts) `UTILITY_CLASS_PATTERN`) and the selectors core generates (`defaultUtilitySelectorFn` in [`engine/core/src/defaults.ts`](../core/src/defaults.ts)). Change the format in one place only and elements silently render unstyled.
- **Values must arrive pre-resolved.** `createRecipe` does no token resolution — that happened in the transpiler. Passing raw token references produces class names that no generated CSS rule matches.

## See also

- [`engine/transpiler/AGENTS.md`](../transpiler/AGENTS.md) — generates the code that calls `createRecipe`.
- [`engine/scanner/AGENTS.md`](../scanner/AGENTS.md) — extracts the class names this package emits.
- [`engine/core/AGENTS.md`](../core/AGENTS.md) — owns `RecipeRuntime`, `ShorteningMap`, and the selector functions.
