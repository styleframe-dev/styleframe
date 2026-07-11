---
name: engine-craft
description: Institutional knowledge for working on Styleframe's engine packages (core, transpiler, loader, runtime, scanner, barrel) — architecture map, AST invariants, the new-token-type checklist, output-stability discipline, tsdown packaging traps, and the Pro license path. Consult before any engine/** change.
---

# Engine craft

The engine is mature (core 3.x, transpiler 3.x, CLI-facing barrel 3.9+) and heavily depended upon. The bar here is not "works" — it is "changes nothing that anyone downstream can observe, except the thing the issue asked for."

## Architecture map

```
engine/core        Token AST + factories: variable, ref, selector, utility, modifier,
                   recipe, theme, css, keyframes, media, atRule, merge.
                   src/tokens/, src/types/, src/utils/. The typed law everything obeys.
engine/transpiler  AST → three independent output pipelines: CSS, TypeScript, DTS.
                   src/consume/ (walk the AST), src/generator/, src/minify/
                   (build-time utility-class-name shortening). Largest engine package.
engine/loader      Config/module loading via jiti, HMR watching, CSS build.
                   Small (8 files) — and has ZERO unit tests; covered only by
                   testing/integration. Treat every loader change as high-risk.
engine/runtime     ~1.4KB browser/server recipe class-string generator (createRecipe).
                   Types-only dependency on core. Size is a feature: watch the bytes.
engine/scanner     Utility-class extraction from content: parser, matcher, extractor,
                   dynamic (creates utilities from scanned classes), watcher, cache.
engine/styleframe  The barrel — the ONLY public import surface ('styleframe',
                   'styleframe/plugin/vite', 'styleframe/loader', …). Index files
                   use `export *`, never named re-exports.
```

## Invariants (violating any is a blocking review finding)

- Never `any` — `unknown` plus a type guard. Every token type has a predicate (`isVariable(token): token is Variable`).
- Every AST node extends `BaseToken`; factories return typed tokens.
- Functional style: no classes except core AST types; immutable data; explicit exported types.
- Every exported function has a unit test in the package's `test/` directory.
- Consumers import from `'styleframe'`, never `@styleframe/*` sub-packages — do not add code that encourages deep imports.

## Adding a new token type — end-to-end or not at all

A token type that exists in core but is unknown to a transpiler pipeline produces silent wrong output. The checklist:

1. AST type in `core/src/types` extending `BaseToken` + type predicate.
2. Factory in `core/src/factory` (typed, tested).
3. **All three** transpiler pipelines handle it: CSS consumer, TypeScript consumer, DTS consumer — plus minify if it introduces class names.
4. Barrel exports via `export *`.
5. Fixture tests in transpiler covering the new output in each pipeline.
6. If the scanner can meet it in content, teach the matcher.

## Output stability discipline

Generated CSS/TS/DTS is the contract with every downstream project.

- Fixture/snapshot tests in `engine/transpiler/test/` are the tripwire — never regenerate snapshots to make a test pass without reading the diff line by line.
- Any intentional output-shape change: paste exact before/after in the PR, flag @mise (breaking-change call), ask @etoile to run `pnpm test:integration` (real bundler builds asserting browser-computed styles).
- The transpiler's utility-name shortening/minify runs at build time — check both minified and unminified output when touching class-name generation.

## Packaging traps (tsdown)

These have broken CI before; check them whenever build config or entries change:

- tsdown-built packages (barrel, and tooling siblings) need `fixedExtension: false` to keep emitting `.js`/`.d.ts` — otherwise entries silently flip to `.mjs`/`.d.mts` and break `bin`/`exports` consumers.
- Entries with `platform: "node"` default to `.mjs` output — the same silent break. Verify `package.json` `exports`/`bin` targets actually exist in `dist/` after a build; a missing file here ships a broken npm release.

## The commercial path

`engine/transpiler/src/license.ts` (`addLicenseWatermark`) injects the "Styleframe Pro: Development Mode" CSS overlay; `@styleframe/license` is a peer dependency across the engine. This is revenue infrastructure — never remove, bypass, or "clean up" the license path, and keep it working when refactoring transpiler output.

## Performance

`testing/benchmark` measures utility output vs Tailwind. Any claim that a change improves size or speed needs a number from there (ask @etoile), not an adjective.
