# @styleframe/dtcg

Spec-conformant parser, validator, and resolver for the W3C Design Tokens Community Group format — Format, Color, and Resolver modules, all at the 2025.10 report level. Published to npm; sole runtime dependency is `culori` (color math). It is deliberately Styleframe-agnostic: no filesystem, no DOM, no `@styleframe/core` import. Bridging DTCG documents to and from the Styleframe AST is the consumer's job — [`@styleframe/figma`](../figma/AGENTS.md) and the CLI's `styleframe dtcg` commands ([`tooling/cli/src/commands/dtcg/`](../cli/src/commands/dtcg/)) do that.

User-facing overview: [`README.md`](./README.md).

## Layout

Modules are organised by spec concern, not by conversion direction. Everything public is re-exported from [`src/index.ts`](./src/index.ts) — read it first; it is the authoritative API list.

```
src/
├── index.ts        # Public API barrel
├── types/          # The full DTCG schema as TypeScript types
├── guards/         # Runtime type guards (isToken, isGroup, isColorValue, …)
├── parse/          # parse() (string|unknown → DTCGDocument), walk() iterator, error classes
├── validate/       # validate() / validateResolver() → ValidationError[]
├── alias/          # {a.b} parse/format, path helpers, resolveAliases(), lookupToken()
├── inheritance/    # applyInheritance() — propagate $type/$deprecated through groups
├── classify/       # classifyValue(): raw value + path hint → DTCG type
├── color/          # 14 color spaces; parse/format/convert via culori
├── dimension/      # {value, unit} ↔ "16px"
├── duration/       # {value, unit} ↔ "100ms"
├── composite/      # border, gradient, shadow, strokeStyle, transition, typography
├── extensions/     # isValidNamespace() — reverse-DNS $extensions keys
└── resolver/       # Resolver Module: parseResolver(), resolve(), mergeDocuments()
test/               # Vitest tests mirroring src/, plus test/fixtures/ (spec-example
                    # .tokens.json / .resolver.json exercised by spec-fixtures.test.ts)
```

## Concepts

**Parse, validate, and resolve are separate steps.** `parse()` throws `ParseError` on invalid JSON or a non-object root; it does not enforce the spec. `validate()` returns a `ValidationError[]` (it never throws). `resolveAliases()` and `applyInheritance()` return new documents — inputs are never mutated.

**`classifyValue()` is the single source of truth for type inference.** Given a raw value and an optional `path` hint, it returns `{ type, value }` or `undefined` (caller decides). Value-shape detection runs first; the path disambiguates ambiguous cases (a bare `700` could be a fontWeight, number, or duration — only a path like `font-weight.bold` can decide). Both the CLI's DTCG export ([`build-dtcg.ts`](../cli/src/commands/dtcg/build-dtcg.ts)) and the Figma bridge ([`figma-bridge.ts`](../figma/src/converters/dtcg/figma-bridge.ts)) route through it — if you change classification behavior, you change both export paths.

**The resolver never touches the filesystem.** `resolve(resolverDoc, inputs, fileLoader)` takes a caller-supplied async `fileLoader(ref)` to satisfy `$ref`s, which is what lets the same code run in Node (CLI) and inside the Figma plugin sandbox.

**Typed errors** (all in [`src/parse/errors.ts`](./src/parse/errors.ts)): `ParseError`, `ValidationError` (carries `path`, `expected`, `received`), `CircularReferenceError` (carries `cycle`), `UnknownReferenceError` (carries `path`, `target`).

## How to add support for a new token type

1. Add the value type in [`src/types/`](./src/types/) and re-export from [`src/types/index.ts`](./src/types/index.ts).
2. Add a guard in [`src/guards/values.ts`](./src/guards/values.ts) and wire it into [`src/validate/document.ts`](./src/validate/document.ts).
3. If the value is inferable from raw JSON, teach [`src/classify/classify.ts`](./src/classify/classify.ts) about it.
4. Mirror each new file with a test under `test/`, and add a spec-example fixture in [`test/fixtures/`](./test/fixtures/) if the spec provides one.

## Build & test

```bash
pnpm build       # tsdown → dist/index.js + dist/index.d.ts (ESM only)
pnpm test        # vitest run — tests live in test/, NOT colocated with src
pnpm typecheck   # tsc --noEmit
```

[`tsdown.config.ts`](./tsdown.config.ts) pins `fixedExtension: false` so output stays `.js`/`.d.ts` matching the `exports` map — don't remove it. Coverage ([`vitest.config.ts`](./vitest.config.ts)) excludes barrel `index.ts` files and `types/`.

## Pitfalls

- **`resolveAliases()` is lenient by default.** Missing alias targets are left as-is unless you pass `{ strict: true }`, which upgrades them to `UnknownReferenceError`. Cycles always throw `CircularReferenceError`.
- **`parse()` succeeding does not mean the document is valid.** Consumers that skip `validate()` will happily walk spec-violating documents.
- **Aliases have no inherent type.** `classifyValue("{color.primary}")` returns `undefined` by design; the consumer must stamp the type from the target token.

## See also

- [`README.md`](./README.md) — features, install, usage.
- [`../figma/AGENTS.md`](../figma/AGENTS.md) — the main consumer; DTCG ↔ Figma bridging and its lossiness rules.
- [`../cli/src/commands/dtcg/`](../cli/src/commands/dtcg/) — `styleframe dtcg export|import`, built on this package.
