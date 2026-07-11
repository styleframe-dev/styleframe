---
name: styleframe-verification
description: How to build and verify work in the Styleframe monorepo — fresh-workspace build order, per-package test/typecheck/lint commands, Storybook shim regeneration, integration-test costs, and CI gates (codecov patch). Consult before running any verification and before claiming any task done.
---

# Verifying work in the Styleframe monorepo

Node ≥ 22, pnpm ≥ 10.7. Turborepo orchestrates; most commands accept `--filter`.

## Fresh workspace: build BEFORE you verify

In a fresh checkout, typechecks and tests fail confusingly until workspace dependencies are built. The order that works:

```bash
pnpm install
pnpm build:nodocs   # builds engine/*, tooling/*, theme — the dependency spine
```

Only after this will `theme` typecheck/tests, Storybook, and app typechecks behave. If you see missing-module or missing-type errors from `@styleframe/*` packages, you skipped this step — it is almost never a real bug.

## The command palette

| What | Command |
|---|---|
| Build everything | `pnpm build` |
| Build libraries only (fast spine) | `pnpm build:nodocs` |
| Test one package | `pnpm --filter @styleframe/theme test` (Vitest) |
| Test everything | `pnpm test` |
| Typecheck | `pnpm typecheck` (turbo; add `--filter` to scope) |
| Lint | `pnpm lint` (oxlint — fast, run repo-wide) |
| Format | `pnpm format` (oxfmt; pre-commit runs it via lint-staged anyway) |
| Integration (slow, real bundlers) | `pnpm test:integration` |
| Workflow lint | `pnpm lint:actions` (needs actionlint installed) |

Always paste the commands you ran and their outcomes in your final task comment. That is the team's definition of "verified."

## Package-specific traps

- **Storybook shims:** `apps/storybook/.styleframe/` type declarations regenerate only when Storybook actually runs (`pnpm storybook` dev or build) — **not** during typecheck. After adding or renaming a recipe, run Storybook once, or the storybook typecheck fails on stale virtual-module types.
- **Theme tests are colocated:** recipe tests live in `theme/src/recipes/<name>/`, next to the source — not in a separate test root.
- **engine/loader has no unit tests** — it is covered only by the integration suite. Changes there need extra care and explicit verification notes.
- **Integration suite is expensive:** it builds all packages, packs `.tgz` tarballs, scaffolds a fresh Vite+Vue app via `styleframe init`, runs a production build, and asserts browser-computed styles in Chromium, Firefox, and WebKit. Run it for plugin/CLI/loader/transpiler-output changes; do not run it for a docs typo.
- **Generated directories:** never edit `dist/` or `.styleframe/`. If output looks wrong, fix the source and rebuild.

## CI gates

- **codecov patch coverage gates ALL packages** — including `apps/playground` (the lcov path globs miss some packages and CI falls back to a repo-wide clover.xml, so nothing is exempt). New code in any package must carry tests that meet the patch target, or CI blocks the PR.
- Pre-commit hooks (husky + lint-staged) run oxfmt/oxlint on staged files and actionlint on workflow files.
- CI runs build, test, typecheck, lint on PRs; keep them green locally first — a red CI run wastes a full review round-trip.
