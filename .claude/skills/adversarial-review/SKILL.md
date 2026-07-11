---
name: adversarial-review
description: Étoile's review manual — the adversarial protocol (assume broken, prove it), Styleframe's anti-pattern checklist, per-area review checklists (engine, theme, docs, tooling, apps), blocking rules, verdict format, and the quality machinery in testing/. Consult at the start of every review.
---

# Adversarial review

Builder agents grade their own work generously — that is a property of the species, not a character flaw. The review seat exists to compensate. Operating assumption: **the PR is broken; your job is to prove it.** When you genuinely fail to prove it, approve it — slow approvals stall eight seats, so run one complete pass, not a drip.

## Protocol

1. **Open the issue first.** Its acceptance criteria are your test plan. Work beyond the issue's scope is a finding (scope creep), even when the extra work is good — with one standing exception: amendments to the author's own skill files under `.multica/skills/` (the compounding rule) are always in scope.
2. **Re-run, never re-read.** A pasted green output is a claim. Re-run the verification commands yourself (see `styleframe-verification`): the affected package suites, typecheck, lint. For recipes, run `/verify-recipe`. For transpiler-output changes, demand the before/after diff and run `pnpm test:integration`.
3. **Read the tests before the code.** Ask of each: can this test fail? A test that cannot fail is a finding. New behavior without a test is an automatic block.
4. **Then read the diff line by line**, hunting the checklist below.
5. **Verdict, ranked findings, shortest path.** Every finding: severity, exact `file:line`, reproduction or concrete failure scenario. End with: *Approve*, or *Block* + the minimal set of changes that earns approval.

## The Styleframe anti-pattern checklist (block on sight)

1. Hardcoded colors/spacing/sizes that should be tokens (`ref()` / `"@token"`).
2. Composable variables missing `{ default: true }`.
3. Utility creators defined but never invoked (produces zero CSS, silently).
4. Appearance-based names (`color.blue`) instead of semantic (`color.primary`).
5. `ref()` not destructured from the instance / raw `var(--…)` strings.
6. Missing `export default s` from config/extension files.
7. Named exports in index files (must be `export *`).
8. Imports from `@styleframe/*` sub-packages instead of the `styleframe` barrel.
9. `virtual:styleframe` imported for the global instance outside `*.styleframe.ts`.
10. Complex CSS expressions without the `css` template literal.
11. `any` in engine code; missing type predicates on new token types.
12. Edits to generated directories (`dist/`, `.styleframe/`).
13. Missing changeset on a publishable-package behavior change.
14. Inline `style=""` in storybook/docs/app code (utility classes exist; arbitrary values via `_prop:[value]`).

## Per-area checklists

- **Engine (@roux):** output-shape diff present for any generated-output change? Snapshots regenerated blindly (read the snapshot diff yourself)? Loader touched (no unit tests — demand explicit verification notes)? License watermark path intact? tsdown config changes → check `dist/` targets match `exports`/`bin`.
- **Theme (@mere):** axis names/values rhyme with 3 sibling recipes? Shared builder extended rather than copied? `&:after`-style registry keys (never `&::after`)? Custom-prop utility keys that `processRecipeUtilities` would reject? Overriding axis declared last? Tests colocated in `theme/src/recipes/<name>/`? Storybook run once so shims regenerated?
- **Docs (@larousse):** examples compile against current API (spot-check against `theme/` source)? Links resolve (flattened component routes, `/docs/theme/` prefix)? Framework-switcher variants present where usage differs? Sentence-initial inline code? (Docs are changeset-ignored — do not demand one.)
- **Tooling (@tournant):** which bundler adapters affected, and evidence the rest are not? HMR exercised on a live dev server? CLI failure paths produce actionable messages? Integration suite run for plugin/CLI changes?
- **Apps (@famille):** styling via Styleframe (the dogfood rule — Tailwind/Nuxt-UI usage is legacy debt, must not grow)? Auth/license flows fail closed, unhappy paths stated as tested? Friction encountered → report filed, not worked around silently?

## Do not block on

Taste no convention backs, hypothetical future needs, or style the formatter already accepts. Note them once and move on. Reviews that relitigate settled conventions teach builders to ignore reviews.

## The machinery you own

- `testing/integration` — the ground-truth harness: builds all packages → packs tarballs → scaffolds a fresh Vite+Vue app via `styleframe init` → production build → asserts **browser-computed styles** in Chromium/Firefox/WebKit. Extend it when new public surface ships; it is the only place "works in a real project" is actually proven.
- `testing/benchmark` — utility-output vs Tailwind. Any performance claim in any PR gets a number from here or gets rewritten without the claim.
- **Recurring findings are systemic:** the same finding twice → file an issue for @mise proposing a skill amendment or a lint rule. Reviews should converge to zero on known classes of defect.
