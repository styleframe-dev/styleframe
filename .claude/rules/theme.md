# Theme Rules

**Scope:** `theme/**/*`

- Composables take the `Styleframe` instance as first parameter and are named
  `use<Context>DesignTokens` / `use<Context>Modifiers` / `use<Context>Utilities` /
  `use<Context>Recipe`. They return an object of typed tokens.
- Every variable created inside a composable passes `{ default: true }` so user-supplied
  values override preset defaults.
- Semantic token names, never appearance names: `color.primary`, not `color.blue`.
  Reference tokens with `ref(token)` or the `"@color.primary"` string shorthand — never
  hardcode a value that should be a token.
- Recipes live one-directory-per-recipe at `theme/src/recipes/<name>/` with a barrel
  `index.ts`, re-exported from `theme/src/recipes/index.ts`. Always define `base`,
  `variants`, and `defaultVariants`. Tests are colocated in the recipe's directory.
- A new or changed recipe also needs: a Storybook showcase (`apps/storybook`), a docs page
  (`apps/docs/content/docs/`), and a changeset. The `/create-recipe` skill chain automates
  the full flow — prefer it for new recipes.

Layout, the composable catalog, and how-tos: see `theme/AGENTS.md` and
`.claude/styleframe-tokens.md` / `.claude/styleframe-recipes.md`.
