# @styleframe/core

The token AST and factory functions — the lowest layer of the engine. `styleframe()` creates an instance whose `root` is a plain-object AST; every other package (transpiler, loader, plugin, theme, CLI) consumes that AST. This package produces **no CSS** — [`@styleframe/transpiler`](../transpiler/AGENTS.md) does that.

Published, but consumers import it through the [`styleframe` barrel](../styleframe/AGENTS.md), not directly. The user-facing API is documented in [`.claude/styleframe-api.md`](../../.claude/styleframe-api.md) and at [styleframe.dev/docs](https://styleframe.dev/docs) — don't restate it here; this file is for contributors changing the engine.

## Layout

```
src/
├── index.ts          # export * barrel over everything below
├── styleframe.ts     # styleframe() — assembles the instance from token factories
├── tokens/           # One file per token: variable, selector, utility, modifier,
│   │                 #   recipe, theme, ref, css, root
│   ├── atRule.ts     # atRule + media + keyframes factories (no separate files)
│   ├── declarations.ts  # createDeclarationsCallbackContext — the ctx passed to callbacks
│   └── resolve.ts    # "@name" string → Reference resolution; usage tracking
├── types/            # tokens.ts (AST types), declarations.ts, options.ts, minify.ts
├── typeGuards.ts     # isVariable, isSelector, isToken, isStyleframe, …
├── defaults.ts       # transformUtilityKey, defaultUtilitySelectorFn
├── constants.ts      # LICENSE_PROPERTY_NAME
└── utils/            # merge, hash, deepClone, getters, isTokenEqual, cssSelector, …
```

## The factory pattern

Every token module exports `create<Name>Function(parent: Container, root: Root)` which returns the user-facing closure (`variable`, `selector`, …). The closure **registers as a side effect**: it pushes the created token onto `parent.variables` / `parent.children` (or the `Root` arrays `utilities` / `modifiers` / `recipes` / `themes`) and returns it. [`styleframe.ts`](./src/styleframe.ts) binds all factories to the root; [`tokens/declarations.ts`](./src/tokens/declarations.ts) re-binds a subset to nested containers for callback contexts — a new factory usually needs wiring in both.

Tokens are plain object literals discriminated by a `type: TokenType` string ([`types/tokens.ts`](./src/types/tokens.ts)). No classes, no shared base interface — type guards in [`typeGuards.ts`](./src/typeGuards.ts) check the discriminant.

`Root` also carries internal bookkeeping: `_registry` (id → container map) and `_usage` (referenced variables/utilities/recipes, fed by [`tokens/resolve.ts`](./src/tokens/resolve.ts) for tree-shaking downstream). Anything that restructures the tree must keep these consistent — `merge()` calls `rebuildRegistry()` for exactly this reason.

## Semantics worth knowing before editing

- `variable(name, value)` **updates in place** when a variable with that name already exists on the container; `{ default: true }` returns the existing one untouched ([`tokens/variable.ts`](./src/tokens/variable.ts)). Composables in `theme/` rely on both behaviors.
- `"@name"` strings and `css` interpolations resolve through `createPropertyValueResolver` in [`tokens/resolve.ts`](./src/tokens/resolve.ts), which also records usage in `root._usage`.
- `merge()` ([`utils/merge.ts`](./src/utils/merge.ts)): variables override by name, arrays concatenate, same-name themes merge, registry is rebuilt — and the `@styleframe/license` "license required" flag propagates from any input instance to the result. That's why `@styleframe/license` is a peer dependency; don't drop the marking logic.

## How to add a token type

1. Add the AST type to [`types/tokens.ts`](./src/types/tokens.ts) and its literal to the `TokenType` union.
2. Create `src/tokens/<name>.ts` with `create<Name>Function(parent, root)`; re-export from [`tokens/index.ts`](./src/tokens/index.ts).
3. Wire it into the instance in [`styleframe.ts`](./src/styleframe.ts) and, if callable inside callbacks, into [`tokens/declarations.ts`](./src/tokens/declarations.ts).
4. Add a guard to [`typeGuards.ts`](./src/typeGuards.ts) and handle the token in [`utils/merge.ts`](./src/utils/merge.ts) if it lives on `Root`.
5. Colocated test (`<name>.test.ts`), then teach the transpiler to emit it — a token core creates but the transpiler ignores silently produces no CSS.

## Build & test

```bash
pnpm build      # tsc --noEmit, then vite build (shared config from @styleframe/config-vite)
pnpm test       # vitest run
pnpm test:dev   # vitest --watch
```

Tests are **colocated** as `src/**/<file>.test.ts` — this package has no `test/` directory, whatever older repo docs say. Output is dual ESM/CJS in `dist/` per the `exports` map in [`package.json`](./package.json).

## Pitfalls

- **`media` and `keyframes` live in [`tokens/atRule.ts`](./src/tokens/atRule.ts)**, not in files of their own — searching by filename will miss them.
- **Every `src/index.ts` re-export is public API** (surfaced verbatim through the `styleframe` barrel). Renaming or removing an export is a breaking change for end users, not an internal refactor.
- **Registration is call-time and stateful.** Calling a factory twice registers twice (except `variable`, which dedupes by name). Pure "describe, don't register" helpers don't exist here.
- **`utility()` returns a creator function** — the utility emits nothing until the creator is invoked with values. Tests that only define the utility will pass while the CSS is missing.

## See also

- Root [AGENTS.md](../../AGENTS.md) — repo-wide conventions; [`.claude/styleframe-api.md`](../../.claude/styleframe-api.md) — user-facing API reference.
- [`engine/styleframe/AGENTS.md`](../styleframe/AGENTS.md) — how this package reaches consumers.
- [`engine/transpiler/AGENTS.md`](../transpiler/AGENTS.md) — what consumes the AST.
