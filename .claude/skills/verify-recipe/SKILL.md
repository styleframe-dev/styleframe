---
name: verify-recipe
description: Step 6 (final) of the create-recipe chain. Runs pnpm typecheck, pnpm --filter @styleframe/theme test, and pnpm lint to verify the recipe is correct. Reports failures with file:line references and suggested fix locations. Does NOT attempt auto-fix. Standalone-capable — runs against any existing recipe without prior artifacts. Writes .context/recipe-<name>/verification.md.
---

# Verify Recipe

Step 6 of the Styleframe recipe creation chain. Run the repo-level quality checks and surface any failures that the previous steps may have introduced.

## Persona

You are a QA-focused engineer. You run the verification commands, parse the output, and report failures with exact file paths, line numbers, and short suggestions. You do not fix issues — the user (or a targeted re-run of `implement-recipe` / `showcase-recipe` / `document-recipe`) handles fixes.

## Inputs

- `.context/recipe-<component-name>/implementation.md` (optional — tells you exactly which files to scope fix suggestions to)
- The live repo state (`theme/src/recipes/<name>/`, `apps/storybook/...`, `apps/docs/...`)

**Standalone mode:** this skill can run without any `.context/` artifacts. If invoked alone (`/verify-recipe`), ask which recipe to verify, then locate files under `theme/src/recipes/<name>/`.

## Outputs

- `.context/recipe-<component-name>/verification.md` — typecheck / test / lint pass-fail, plus any failure details.

---

## Workflow

### Step 1: Identify the recipe

If invoked as part of the chain, read `implementation.md` to know which files were created.

If invoked standalone, ask the user for the recipe name, then `ls theme/src/recipes/<name>/` to confirm it exists.

### Step 2: Run checks

Run the following three commands from the project root. Run them sequentially so failures are reported one at a time. Use `Bash` with appropriate timeouts.

#### Typecheck

```bash
pnpm typecheck
```

Parse output. Capture:
- Exit status (0 = pass).
- For each error: file:line, error code, message.
- Scope errors to files touched by this recipe when possible; note cross-package errors separately.

#### Theme tests

```bash
pnpm --filter @styleframe/theme test
```

Parse output. Capture:
- Total suites, total tests, passed, failed.
- For each failed test: test name, expected vs actual, file:line.
- If the recipe has no test file (rare, but valid — badge and button are exceptions), note that the recipe exists without tests.

#### Lint

```bash
pnpm lint
```

Parse output. Capture:
- Exit status.
- For each issue: file:line, rule, message.

### Step 3: (Optional) Storybook spot-check

If the user wants, offer to start Storybook briefly to verify the story renders:

```bash
pnpm storybook
```

This is a manual check — the assistant cannot verify rendering automatically. Prompt the user to open the component story in the browser and confirm it looks correct.

### Step 4: Write `verification.md`

Use the schema below. Include every failure with a file:line reference and a one-line suggestion pointing to the sub-skill most likely responsible:

- TypeScript errors in `theme/src/recipes/<name>/` → `/implement-recipe`
- Test failures in `theme/src/recipes/<name>/` → `/implement-recipe`
- Lint errors in `apps/storybook/**` → `/showcase-recipe`
- Lint errors in `apps/docs/**` → `/document-recipe`
- Broken story IDs referenced in docs → `/document-recipe` or `/showcase-recipe`

### Step 5: Summarize to the user

Report:

- Pass/fail for each of the three checks.
- Total failures.
- Suggested next step (if all pass: "recipe is ready"; if failures: "fix issues in <file> then re-run `/verify-recipe`").

Do NOT attempt to fix issues automatically.

---

## `verification.md` schema

```markdown
# Verification: <Name>

## Typecheck: <pass | fail>
<!-- If fail, list: file:line — error code — message — suggested sub-skill -->

## Test (theme): <pass | fail> (<passed>/<total>)
<!-- If fail, list: test name — file:line — expected vs actual — suggested sub-skill -->
<!-- If no tests exist: note "Recipe has no test file — confirmed intentional opt-out" -->

## Lint: <pass | fail>
<!-- If fail, list: file:line — rule — message — suggested sub-skill -->

## Storybook spot-check: <pass | not run | manual-deferred>

## Summary
- Total failures: <N>
- Suggested next step: <e.g., re-run /implement-recipe after fixing use<Name>Recipe.ts:42>
```

---

## Validation checklist

- [ ] `pnpm typecheck` was run from the project root.
- [ ] `pnpm --filter @styleframe/theme test` was run.
- [ ] `pnpm lint` was run.
- [ ] Each failure is reported with file:line and a suggested sub-skill.
- [ ] `verification.md` is written to `.context/recipe-<name>/`.
- [ ] User received a short pass/fail summary.

---

## Constraints

- **No auto-fix.** This skill reports failures; it does not modify any source.
- **Do not skip checks.** All three must run — skipping one masks issues.
- **No `--no-verify` or similar bypasses.** If a hook or check fails, report it.
- **Do not rerun an entire chain after fixes.** The user (or a targeted sub-skill) handles fixes and then re-runs `/verify-recipe` alone.

---

## Done

If all three checks pass, the recipe is ready. If the user is running the chain from `/create-recipe`, this is the final step.
