# Engine Rules

**Scope:** `engine/**/*`

- All exports carry explicit TypeScript types. Never `any` — use `unknown` narrowed by the
  type guards in `engine/core/src/typeGuards.ts` (`isVariable`, `isSelector`, …); add a new
  guard there when you add a token type.
- Tokens are plain typed objects created by factory functions — no classes. Token factories
  live in `engine/core/src/tokens/`, their types in `engine/core/src/types/`.
- Functional style, immutable data. A factory never mutates its inputs.
- Tests are colocated as `<file>.test.ts` next to the source. Every exported function gets one.
- Changes to token shapes ripple: transpiler, runtime, and the `.claude/styleframe-*.md`
  reference guides must be updated in the same change.

Package layout, invariants, and how-tos: see the `AGENTS.md` in each engine package
(`engine/core`, `engine/loader`, `engine/transpiler`, `engine/runtime`, `engine/scanner`,
`engine/styleframe`).
