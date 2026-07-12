---
name: recipe-craft
description: Institutional knowledge for building Styleframe theme work — the /create-recipe chain, recipe pitfalls unique to this codebase (modifier-registry selectors, utility decomposition, variant-axis ordering, eager ref resolution), shared builders, naming conventions, colocated tests, and Storybook conventions. Consult before EVERY theme/** or storybook task.
---

# Recipe craft

The theme is Styleframe's largest surface: ~90 utility composables, ~23 token composables, 8 modifier categories, 23 element composables, 39 recipes (30 multi-part), 290 test files. The governing rule: **the 40th recipe must feel like whoever wrote the first 39 wrote it too.** Consistency beats cleverness, every time.

## Use the chain

New components go through the recipe-chain skills (they live in `.multica/skills/` alongside this one and are attached to this seat) — do not freehand it:

```
/create-recipe        orchestrates all six steps
/research-recipe      → .context/recipe-<name>/research.md   (UI-kit survey)
/design-recipe        → design.md   (requires approval before writing)
/implement-recipe     → theme/src/recipes/<name>/ + tests + barrels
/showcase-recipe      → storybook registration, stories, preview components
/document-recipe      → docs page (grounded in existing pages + source)
/verify-recipe        → typecheck + theme tests + lint, findings report
```

Each sub-skill runs standalone to resume or redo one step. Artifacts in `.context/recipe-<name>/` are the chain's shared state — check for them before redoing work.

## Pitfalls unique to this codebase (each has burned a task before)

1. **Recipe `css` selector keys resolve through the modifier registry**, not raw CSS. Write `&:after` (registry key), NOT `&::after`. Selectors with no registry entry (`:has(...)`, `:not(...)`, attribute selectors) cannot appear as css keys — they go in the recipe's `setup()` callback via `s.selector()`.
2. **Every declared property must decompose into a registered utility.** `processRecipeUtilities` throws on unknown properties — custom-property keys like `--drawer-size` fail unless a utility is registered for them. Prefer standard properties plus compound variants over custom-prop indirection.
3. **Variant axes resolve last-write-wins in declaration order** (runtime merges by property into a Map). An axis that must override another (e.g. modal's `fullscreen` overriding `size`) must be declared **after** it. Order is semantics, not style.
4. **`setup()` resolves `@token` references eagerly.** If `s.selector()` inside setup references a token (say a theme-adaptive color), that variable must exist in the test's `createInstance` — otherwise tests fail with unresolved-ref errors that look like engine bugs. They are not.
5. **Storybook shims regenerate only when Storybook runs.** After adding/renaming a recipe: run `pnpm storybook` once, or the storybook typecheck fails on stale `virtual:styleframe` types.
6. **Recipes collide on barrel files** (`theme/src/recipes/index.ts`) and Storybook shims. One recipe per task; triage serializes recipe issues with dependency links, so a sibling recipe in flight means triage missed one — flag @mise instead of racing.

## Shared builders — extend, never copy

Component families share definition builders that live in the canonical member's directory (deliberate coupling — DRY beats loose here):

| Builder | Home | Used by |
|---|---|---|
| `createMenuRecipe` | `recipes/dropdown/` | dropdown, select, context-menu (menu surfaces) |
| `createFieldRecipe` | `recipes/input/` | input siblings: textarea, select, otp, … |
| `createOverlayRecipes` | `recipes/modal/` | modal, drawer, popover family |
| `createDismissRecipe` | `recipes/dismiss/` | anything dismissible (callout, chip, toast, …) |
| `createSidebarRecipe` | `recipes/sidebar/` | the 15-sub-part sidebar system |

A new family member extends the builder with a name + extras. If the builder cannot express what you need, evolve the builder (and its existing consumers' tests) — do not fork it.

**Grouping pattern:** one explicit wrapper recipe (like `field-group`) — never per-component `prepend`/`append`/`group` slot recipes. The codebase already removed `ButtonGroup` and friends in favor of this; do not reintroduce them.

## Conventions (blocking review findings if violated)

- Semantic token names (`color.primary`, never `color.blue`); reference via `ref()` or `"@color.primary"` strings; a hardcoded value in a recipe is a bug.
- Composable variables always `{ default: true }`; composables take `s: Styleframe` as first param and return destructurable typed tokens; naming `use<Context>Recipe/Variables/Utilities`.
- Standard axes vocabulary: `color` (primary/secondary/success/info/warning/error), `variant` (solid/outline/soft/subtle/ghost/link where applicable), `size` (xs/sm/md/lg/xl). Read three sibling recipes before adding any axis — same concept, same name, same values.
- Always: `base` styles, `variants`, `defaultVariants`; compound variants for interactions between axes.
- Tests are **colocated** in `theme/src/recipes/<name>/` next to the source (not a separate test root). Every recipe and sub-part has one.
- Any recipe that registers `@keyframes` in its `setup()` callback MUST assert each registration in its colocated test via the shared `expectKeyframesRegistered(s, name)` helper (`theme/src/testing/expectKeyframesRegistered.ts`). An `animationName` is an opaque string to the base/variant object assertions, so a deleted `s.keyframes(...)` call silently makes the animation inert and nothing red catches it — the registration assertion is the only thing that does.

## Storybook conventions

- Stories: `apps/storybook/src/stories/recipes/<Name>.stories.ts` (Storybook 10 + Vue 3); showcase all variants; grid preview components (`<Name>Grid.vue`, `<Name>SizeGrid.vue`) per the showcase-recipe pattern.
- **No inline `style=""` anywhere** — Styleframe utility classes only; arbitrary values via bracket syntax (`_max-width:[320px]`). The showcase must dogfood the system it showcases.
