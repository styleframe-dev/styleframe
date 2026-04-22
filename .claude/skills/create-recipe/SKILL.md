---
name: create-recipe
description: Orchestrator that runs the 6-step recipe creation chain end-to-end. Invokes research-component, design-recipe, implement-recipe, showcase-recipe, document-recipe, and verify-recipe in order, chaining via .context/recipe-<name>/ artifacts. Users may invoke any sub-skill standalone (/verify-recipe, /document-recipe, etc.) to resume or re-run a single step without restarting the chain. Starts by asking the component name, then checks for existing artifacts before each step.
---

# Create Recipe (orchestrator)

This skill chains six sub-skills to produce a complete Styleframe recipe with tests, Storybook showcase, and docs.

## Chain

1. `/research-component` — gather requirements + study UI libraries → `.context/recipe-<name>/research.md`
2. `/design-recipe` — classify component + approve design → `.context/recipe-<name>/design.md`
3. `/implement-recipe` — recipe TS, barrel, tests → `.context/recipe-<name>/implementation.md`
4. `/showcase-recipe` — Storybook files + Vue components + preview grids → `.context/recipe-<name>/showcase.md`
5. `/document-recipe` — docs page (absorbs the 4-phase doc flow) → `.context/recipe-<name>/documentation.md` + final `.md` file
6. `/verify-recipe` — typecheck, test, lint → `.context/recipe-<name>/verification.md`

## Flow

1. Ask the user for the component name (kebab-case).
2. For each step in the chain:
   - Check whether the prior artifact already exists at `.context/recipe-<component-name>/`.
   - If present, ask the user whether to skip or re-run.
   - Otherwise, invoke the sub-skill.
3. After each step completes, summarize progress and pause so the user can inspect the artifact before continuing.
4. If any sub-skill surfaces a failure, stop and let the user fix before moving on.

## Resumability

Each sub-skill can be invoked standalone to resume or re-run a single step. Common scenarios:

- **Resume after a fix:** user edits a test → `/verify-recipe`.
- **Add docs to an existing recipe:** `/document-recipe` (falls back to reading `theme/src/recipes/<name>/` directly if `.context/` is empty).
- **Regenerate Storybook after a recipe refactor:** `/showcase-recipe`.
- **Re-check a recipe in an older branch:** `/verify-recipe` against any existing recipe.

## Artifact location

All intermediate artifacts live in `.context/recipe-<component-name>/` (gitignored). Final source lives under `theme/src/recipes/<name>/`, `apps/storybook/...`, and `apps/docs/...`.

## When invoked

Do not do the work yourself — invoke the sub-skills in order via the Skill tool. Each sub-skill contains its own detailed guidance.
