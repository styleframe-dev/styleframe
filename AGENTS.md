# Styleframe

A type-safe, composable CSS-in-TypeScript framework. Design tokens, utility classes, component recipes, and themes are authored as TypeScript, then compiled into CSS, runtime TypeScript, and type declarations by the engine.

This file is the entry point for any LLM agent or new contributor working in the repo. Read it first, then descend to the nearest `AGENTS.md` for the area you're editing (LLM tools resolve nearest-wins).

## Quick start

```bash
corepack enable && corepack prepare   # Node >=22, pnpm 10
pnpm install
pnpm build:nodocs                     # build engine + theme + tooling (skip apps)
pnpm dev:docs                         # docs site + Storybook
pnpm test                             # all unit tests (Turbo + Vitest)
pnpm build:nodocs && pnpm lint && pnpm typecheck && pnpm test   # the pre-PR gate
```

## How Styleframe works

```
styleframe.config.ts     → creates the global Styleframe instance (single source of truth)
*.styleframe.ts files    → extend that instance with tokens, recipes, utilities
@styleframe/plugin       → bundler integration; serves the two virtual modules
@styleframe/transpiler   → compiles the token AST to CSS + TypeScript + .d.ts
@styleframe/runtime      → tiny browser runtime that turns recipe calls into class strings
virtual:styleframe       → compiled recipe functions + selectors (or the instance, in extension files)
virtual:styleframe.css   → all compiled CSS
```

All `*.styleframe.ts` extension files share the one instance from `styleframe.config.ts`: they import it from `virtual:styleframe`, add tokens/recipes/utilities, and export it as default. Application code imports the *compiled* recipe functions and selectors from the same `virtual:styleframe` specifier.

## Repository map

```
engine/      @styleframe/core (token AST + factories), @styleframe/loader,
             @styleframe/transpiler, @styleframe/runtime, @styleframe/scanner,
             styleframe (the published barrel package)
theme/       @styleframe/theme — design-token composables, modifiers, utilities, recipes
tooling/     @styleframe/plugin (unplugin), @styleframe/cli, @styleframe/dtcg, @styleframe/figma
config/      shared tsconfig/vite build configs (@styleframe/config-*)
apps/        docs (Nuxt Content), storybook, app (customer dashboard), playground, shared (Nuxt layer)
testing/     integration (Playwright), benchmark
.changeset/  pending changesets — one markdown file per upcoming change
.claude/     Claude-specific config: rules, skills, deep-reference guides
```

Workspace globs live in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml); task orchestration in [`turbo.json`](./turbo.json).

## Where to look next

Descend to the `AGENTS.md` nearest the file you're editing:

| Package                                                                                | When to look                                                        |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`engine/core/AGENTS.md`](./engine/core/AGENTS.md)                                     | Token AST types, factory functions (`variable`, `selector`, …)      |
| [`engine/styleframe/AGENTS.md`](./engine/styleframe/AGENTS.md)                         | The published `styleframe` barrel package                           |
| [`engine/loader/AGENTS.md`](./engine/loader/AGENTS.md)                                 | Config/module loading, HMR, build orchestration                     |
| [`engine/transpiler/AGENTS.md`](./engine/transpiler/AGENTS.md)                         | AST → CSS / TypeScript / DTS code generation                        |
| [`engine/runtime/AGENTS.md`](./engine/runtime/AGENTS.md)                               | Browser recipe runtime                                              |
| [`engine/scanner/AGENTS.md`](./engine/scanner/AGENTS.md)                               | Utility-class extraction from source content                        |
| [`theme/AGENTS.md`](./theme/AGENTS.md)                                                 | **Design tokens, modifiers, utilities, and the 38 recipes**         |
| [`tooling/plugin/AGENTS.md`](./tooling/plugin/AGENTS.md)                               | Bundler adapters, virtual modules, HMR wiring                       |
| [`tooling/cli/AGENTS.md`](./tooling/cli/AGENTS.md)                                     | `styleframe init/build/dtcg` commands                               |
| [`tooling/dtcg/AGENTS.md`](./tooling/dtcg/AGENTS.md)                                   | W3C DTCG token import/export                                        |
| [`tooling/figma/AGENTS.md`](./tooling/figma/AGENTS.md)                                 | Bidirectional Figma variable sync                                   |
| [`config/AGENTS.md`](./config/AGENTS.md)                                               | Shared tsconfig/Vite build configs                                  |
| [`apps/docs/AGENTS.md`](./apps/docs/AGENTS.md)                                         | Documentation site content + components                             |
| [`apps/storybook/AGENTS.md`](./apps/storybook/AGENTS.md)                               | Recipe showcase stories                                             |
| [`apps/app/AGENTS.md`](./apps/app/AGENTS.md), [`apps/shared/AGENTS.md`](./apps/shared/AGENTS.md), [`apps/playground/AGENTS.md`](./apps/playground/AGENTS.md) | The consumer apps |
| [`testing/integration/AGENTS.md`](./testing/integration/AGENTS.md)                     | Playwright e2e suite against a real Vite consumer app               |
| [`testing/benchmark/AGENTS.md`](./testing/benchmark/AGENTS.md)                         | Performance benchmarks                                              |

Deep-reference guides (verified API/pattern references, any agent may read them):

| Guide                                                            | Contents                                            |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| [`.claude/styleframe-api.md`](./.claude/styleframe-api.md)         | Full authoring API reference (every factory function) |
| [`.claude/styleframe-patterns.md`](./.claude/styleframe-patterns.md) | Config/extension/consumption patterns              |
| [`.claude/styleframe-recipes.md`](./.claude/styleframe-recipes.md) | The recipe system end-to-end                         |
| [`.claude/styleframe-tokens.md`](./.claude/styleframe-tokens.md)   | Design-token composable catalog                      |

Human-facing workflow (fork, branch, PR, changesets): [CONTRIBUTING.md](./CONTRIBUTING.md).

## Authoring rules

The rules that hold everywhere Styleframe code is written — apps, docs examples, theme composables:

- A config or extension file creates one instance and destructures its factories, then **exports the instance as default** — a file that forgets the default export contributes nothing to the build:

  ```ts
  import { styleframe } from "styleframe"; // "virtual:styleframe" in *.styleframe.ts extension files

  const s = styleframe();
  const { variable, ref, selector, utility, modifier, recipe, theme } = s;

  export default s;
  ```

- **Reference tokens, never hardcode values.** `ref(colorPrimary)` or the string shorthand `"@color.primary"`. Dot-notation names map to CSS custom properties (`color.primary` → `--color--primary`).
- **Semantic token names**, not appearance names: `color.primary`, not `color.blue`.
- **`utility()` returns a creator function that must be called** — defining a utility without invoking the creator produces no CSS.
- **Composable variables take `{ default: true }`** so user-provided values win over preset defaults. Composables are named `use<Context>DesignTokens` / `…Modifiers` / `…Utilities` / `…Recipe` and take the `Styleframe` instance as first argument.
- **User-facing code imports from the `styleframe` barrel** (`styleframe`, `styleframe/loader`, `styleframe/plugin/vite`, …), never `@styleframe/*` sub-packages — with one exception: the theme package has no barrel subpath and is imported as `@styleframe/theme` directly. Inside the monorepo, packages depend on `@styleframe/*` workspace packages directly.

## Cross-cutting conventions

These apply everywhere. Package-level `AGENTS.md` files repeat them only when consequential.

- **Tooling**: pnpm 10 + Turbo, Node ≥22. Oxlint (`pnpm lint`) and Oxfmt (`pnpm format` — tabs, double quotes). **Not ESLint, not Biome, not Prettier.**
- **TypeScript**: strict; no `any` — use `unknown` plus type guards (`isVariable(token): token is Variable`). Engine code is functional: tokens are plain typed objects built by factory functions, not classes.
- **Tests**: Vitest, colocated as `<file>.test.ts` next to the source (`tooling/plugin` and `tooling/dtcg` use a `test/` directory instead). Every exported engine function gets a unit test. Playwright integration tests live in [`testing/integration/`](./testing/integration/).
- **Commits**: conventional commits with package scope — `feat(theme): …`, `fix(plugin): …`.
- **Changesets**: every change to a publishable package needs one (`pnpm changeset`); apps and testing packages don't.
- **Generated output — never hand-edit**: `dist/`, `.styleframe/`, `.nuxt/`, `.output/`, `storybook-static/`.
- **Workflow files** under `.github/workflows/` are linted with actionlint on pre-commit (`pnpm lint:actions` to run manually).
- **Doc freshness**: if your change touches public API, build flow, conventions, or directory shape, update the relevant `AGENTS.md` and the deep-reference guide that covers it.
