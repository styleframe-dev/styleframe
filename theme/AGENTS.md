# @styleframe/theme

The design-system layer of Styleframe, published to npm. Everything here is a composable: a `use*` function that takes a `Styleframe` instance as its first argument, registers tokens/selectors/utilities/recipes on that instance, and returns typed token objects. `@styleframe/core` is a peer dependency; runtime deps are `culori` (OKLCH color math), `defu` (option merging), and `scule` (name casing).

Alongside the engine, this is one of the two central packages of the repo: the 38 component recipes defined here are what the Storybook showcase and the docs site render.

## Layout

```
src/
├── index.ts        # export * from every subdirectory
├── types.ts        # ExportKeys / WithThemes helper types
├── values/         # <category>Values constants (spacingValues, colorValues, darkModeColorValues, …)
├── variables/      # use<X>DesignTokens — CSS custom properties; fluid/ adds useFluidClamp + fluid viewport tokens
├── elements/       # use<X>Element — base HTML element styling (body, headings, links, code, hr, kbd, …)
├── states/         # useFocusState, useSelectionState — global focus-ring and ::selection tokens
├── sanitize/       # sanitize.css-style reset selectors (base, forms, typography, reduced-motion)
├── modifiers/      # use<X>Modifiers — pseudo-state/element, form, ARIA, media, structural, directional
├── utilities/      # use<X>Utility — utility-class creators, one directory per CSS category (spacing, layout, …)
├── recipes/        # use<Name>Recipe — one directory per component (38; see below)
├── presets/        # use<X>Preset — batteries-included bundles of the above
└── utils/          # the create* factories every composable above is built from
```

## The composable contract

Every public composable follows the same shape, produced by a factory in [`src/utils/`](./src/utils/):

| Kind      | Naming                | Factory                                            | Returns                                                        |
| --------- | --------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| Variables | `use<X>DesignTokens`  | `createUseVariable(property, opts)`                | Flat object of typed `Variable`s (`{ spacing, spacingSm, … }`) |
| Utilities | `use<X>Utility`       | `createUseUtility` / `createUseSpacingUtility`     | A `UtilityCreatorFn` — call it to emit more classes            |
| Recipes   | `use<Name>Recipe`     | `createUseRecipe(name, defaults, setup?)`          | The registered `Recipe` token                                  |
| Modifiers | `use<X>Modifiers`     | hand-written                                       | Modifier factories to pass to utility creators                 |
| Presets   | `use<X>Preset`        | hand-written                                       | Aggregated token objects                                       |

Conventions enforced by the factories — keep them when writing composables by hand:

- Variables register with `{ default: true }` (see [`createUseVariable.ts`](./src/utils/createUseVariable.ts)), so composable-provided values act as defaults that a user's own `variable()` call overrides. Callers can opt out via the `{ default: false }` option.
- The `default` key in a value map produces the unsuffixed variable: `useSpacingDesignTokens(s, { default: "1rem" })` returns `{ spacing }`, not `{ spacingDefault }`.
- Reference other tokens with `ref(token)` or the `"@token.name"` string shorthand; never hardcode a value that exists as a token.
- Spacing-style utilities accept `"@<number>"` multipliers (`"@1.5"` → `calc(var(--spacing) * 1.5)`), wired via [`createMultiplierAutogenerate.ts`](./src/utils/createMultiplierAutogenerate.ts).
- Default value constants live in [`src/values/`](./src/values/) and are named `<category>Values` (plus `darkMode<Category>Values` for dark-theme overrides).
- Index files use `export *` only; [`src/index.ts`](./src/index.ts) re-exports every subdirectory.

## Recipes

One directory per component at `src/recipes/<name>/`, containing `use<Name>Recipe.ts`, a colocated `use<Name>Recipe.test.ts`, and an `index.ts` barrel. Multi-part components get one file per part in the same directory (e.g. [`card/`](./src/recipes/card/) has `useCardRecipe`, `useCardHeaderRecipe`, `useCardBodyRecipe`, `useCardFooterRecipe`; [`sidebar/`](./src/recipes/sidebar/) has 15 parts). The root barrel [`src/recipes/index.ts`](./src/recipes/index.ts) lists each directory alphabetically.

Recipes are declared with `createUseRecipe(name, defaults, setup?)`:

- `defaults` is a `{ base, variants, defaultVariants, compoundVariants }` config using `@`-string token references.
- The returned `use<Name>Recipe(s, options?)` deep-merges option overrides over the defaults (via `defu`) and supports `{ filter }` to prune variant axes down to an allowed subset — filtering also drops now-unreachable compound variants and defaults.
- The optional `setup` callback runs before registration, for recipes that need side effects like `@keyframes` (see [`spinner/`](./src/recipes/spinner/)).
- Color/variant axes are often empty declaration blocks with the real styling supplied by `compoundVariants` (see [`badge/useBadgeRecipe.ts`](./src/recipes/badge/useBadgeRecipe.ts)).

**Adding a recipe: use the skill chain, don't wing it.** `/create-recipe` orchestrates six sub-skills (`/research-component` → `/design-recipe` → `/implement-recipe` → `/showcase-recipe` → `/document-recipe` → `/verify-recipe`), defined under [`.claude/skills/`](../.claude/skills/). Intermediate artifacts land in `.context/recipe-<name>/` (gitignored); each sub-skill is standalone-invokable to resume or re-run a step. A finished recipe spans three places:

1. Source + tests: `theme/src/recipes/<name>/`
2. Storybook showcase: `apps/storybook/src/components/components/<name>/`
3. Docs page: `apps/docs/content/docs/05.components/<category>/<nn>.<name>.md`

## Presets

[`src/presets/`](./src/presets/) bundles the individual composables for one-call setup:

| Preset                        | What it registers                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `useDesignTokensPreset`       | Every token category; returns one flat destructurable object. Per-category config, `false` to skip a category, `themes` for per-theme overrides (dark-mode values are built in). |
| `useGlobalPreset`             | Element defaults ([`src/elements/`](./src/elements/)) + focus/selection states ([`src/states/`](./src/states/)) |
| `useSanitizePreset`           | The reset selectors from [`src/sanitize/`](./src/sanitize/), each category toggleable                           |
| `useModifiersPreset`          | All modifier categories, each toggleable                                                                        |
| `useUtilitiesPreset`          | All utility categories                                                                                          |
| `useShorthandUtilitiesPreset` | `useUtilitiesPreset` with Tailwind-style names (`m`, `p`, `w`, `text`, …)                                       |

## Build & test

```bash
pnpm build      # tsc --noEmit && vite build (config from @styleframe/config-vite)
pnpm test       # vitest run
pnpm test:dev   # vitest --watch
pnpm dev        # vite build --watch
```

Tests are colocated as `<file>.test.ts` next to their source (~286 files) — there is no `theme/test/` directory. Recipe tests assert the registered recipe's structure and CSS output; `/verify-recipe` runs typecheck + this package's tests + lint as the final gate.

## Pitfalls

- **`@styleframe/theme` is not part of the `styleframe` barrel.** The barrel's `exports` map has no `./theme` subpath, so `import … from "styleframe/theme"` (which some older TSDoc examples show) does not resolve. Import from `@styleframe/theme` directly — that is the repo-wide exception to the "import from the barrel" rule.
- **Utility composables emit CSS only for the values you give them.** `use<X>Utility(s, values)` registers the utility and emits classes for `values` (or its defaults), then returns a creator — a utility invoked with no values and whose creator is never called produces no CSS, silently.
- **Dropping `{ default: true }` breaks user overrides.** A composable variable registered without it clobbers same-name variables the user defined in their own config instead of yielding to them.
- **Old names linger in other docs.** Variable composables are `use<X>DesignTokens` (not `useColor`/`useSpacing`), value constants are `<category>Values` (not `default<Category>Values`), and recipes are directories (`recipes/button/useButtonRecipe.ts`), not flat files. Trust this file and the source over stale references elsewhere.

## See also

- [`.claude/skills/create-recipe/SKILL.md`](../.claude/skills/create-recipe/SKILL.md) — the recipe-creation chain and its five sub-skills.
- [`engine/core/AGENTS.md`](../engine/core/AGENTS.md) — the `variable`/`utility`/`recipe`/`theme` primitives this package builds on.
- [`apps/storybook/AGENTS.md`](../apps/storybook/AGENTS.md) and [`apps/docs/AGENTS.md`](../apps/docs/AGENTS.md) — where recipes are showcased and documented.
- Root `AGENTS.md` — instance model, `@`-reference syntax, utility class format.
