# Styleframe Development Guide

Styleframe is a type-safe, composable CSS-in-TypeScript framework for building design systems. This is a pnpm monorepo managed with Turbo.

## Quick Reference

**Full API documentation:** See `AGENTS.md` for comprehensive Styleframe architecture, API reference, and patterns.

**Package-specific guides:** Each package has detailed `AGENTS.md` (e.g., `engine/core/AGENTS.md`, `theme/AGENTS.md`, `tooling/plugin/AGENTS.md`).

## Project Structure

Core packages live in `engine/` (@styleframe/core, loader, runtime, transpiler, scanner), design tokens in `theme/`, build tools in `tooling/` (CLI, Figma sync, plugins), applications in `apps/` (docs, Storybook, dashboard), tests in `testing/`, and shared configs in `config/`.

**Import rule:** Always import from `'styleframe'` (barrel package), not `@styleframe/*` sub-packages.

## Project Configuration

- `package.json` — Monorepo root with Turbo scripts and dependencies
- `turbo.json` — Turbo build pipeline configuration
- `pnpm-workspace.yaml` — Workspace package definitions
- `biome.json` — Biome formatter and linter config
- `.editorconfig` — Editor settings for consistent code style
- `.gitignore` — Git ignore rules
- `.changeset/` — Changesets for version management and changelogs
- `.husky/` — Git hooks (pre-commit, commit-msg)
- `.ai/` — AI assistant configurations (if present)
- `.zed/` — Zed editor configuration (if present)

## Common Commands

```bash
# Development
pnpm dev                    # Start all dev servers
pnpm dev:docs              # Docs + Storybook only
pnpm storybook             # Storybook only

# Building
pnpm build                 # Build all packages
pnpm build:nodocs          # Build engine + tooling only (faster)
pnpm build:docs            # Build documentation site

# Quality checks
pnpm test                  # Run all tests
pnpm test:integration      # Playwright tests
pnpm typecheck             # Type check all packages
pnpm lint                  # Lint with oxlint
pnpm format                # Format with Biome

# Publishing (CI/CD)
pnpm ci:changeset          # Create a changeset
pnpm ci:version            # Bump versions
pnpm ci:publish            # Publish to npm
```

## Workflow Patterns

### Adding a new feature

1. Make changes in the appropriate package under `engine/`, `theme/`, or `tooling/`
2. Update tests in the same package (e.g., `engine/core/test/`, `theme/test/`)
3. Run `pnpm typecheck` and `pnpm lint` from project root
4. Test in Storybook if UI-related: `pnpm storybook` (see `apps/storybook/`)
5. Create changeset: `pnpm ci:changeset` (adds file to `.changeset/`)
6. Git hooks in `.husky/` will run lint-staged before commit

### Working on recipes

- Recipe implementations: `theme/src/recipes/` (e.g., `theme/src/recipes/button.ts`)
- Recipe documentation: `apps/docs/content/docs/recipes/` (Markdown files)
- Recipe stories: `apps/storybook/src/stories/recipes/` (Storybook stories)
- Recipe tests: `theme/test/recipes/` (Vitest tests)

### Working on the transpiler

- Core transpiler: `engine/transpiler/src/` (CSS/TS/DTS generators)
- Transpiler entry: `engine/transpiler/src/index.ts`
- Test fixtures: `engine/transpiler/test/` (input/output pairs)
- Always verify output CSS matches expectations

### Working on design tokens

- Token composables: `theme/src/tokens/` (color, spacing, typography, etc.)
- Token presets: `theme/src/presets/` (complete design system presets)
- Token documentation: `apps/docs/content/docs/tokens/`

### Working on build plugins

- Plugin implementations: `tooling/plugin/src/` (Vite, Webpack, Nuxt, etc.)
- Plugin entry: `tooling/plugin/src/index.ts`
- Virtual module handlers: `tooling/plugin/src/virtual-modules.ts`
- Test integration with different bundlers in `testing/integration/`

## Key Conventions

### Styleframe Instance Pattern

```ts
import { styleframe } from 'styleframe';

const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe } = s;

export default s;
```

### Variable Naming

- Use dot notation: `color.primary` → `--color--primary`
- Reference with `ref()` or `@` prefix: `ref(colorPrimary)` or `"@color.primary"`
- Composable variables need `{ default: true }`

### File Conventions

- `styleframe.config.ts` — Global config at project root
- `*.styleframe.ts` — Extension files that extend the global instance
- `.styleframe/` — Auto-generated types (gitignored)

## Testing

```bash
# Unit tests (per package, using Vitest)
cd engine/core && pnpm test          # Run core package tests
cd theme && pnpm test                # Run theme package tests

# Integration tests (Playwright E2E)
pnpm test:integration                # Runs testing/integration/
```

**Test locations:**
- Unit tests: `<package>/test/` (e.g., `engine/core/test/`, `theme/test/`)
- Integration tests: `testing/integration/` (Playwright specs)
- Test configs: `vitest.config.ts` in each package, `playwright.config.ts` in testing/integration/

## Package-Specific Guides

Each package has detailed documentation in its own `AGENTS.md`:

**Engine packages:**
- `engine/core/AGENTS.md` — Core token AST and factory methods (`engine/core/src/`)
- `engine/loader/AGENTS.md` — Config loading and HMR (`engine/loader/src/`)
- `engine/transpiler/AGENTS.md` — CSS/TS/DTS code generation (`engine/transpiler/src/`)
- `engine/runtime/AGENTS.md` — Browser runtime (`engine/runtime/src/`)
- `engine/scanner/AGENTS.md` — Content scanning (`engine/scanner/src/`)

**Theme & tooling:**
- `theme/AGENTS.md` — Design token composables and presets (`theme/src/`)
- `tooling/plugin/AGENTS.md` — Build tool integrations (`tooling/plugin/src/`)
- `tooling/cli/AGENTS.md` — CLI commands (`tooling/cli/src/`)
- `tooling/figma/AGENTS.md` — Figma sync (`tooling/figma/src/`)

**Applications:**
- `apps/docs/content/docs/AGENTS.md` — Documentation site (`apps/docs/`)
- `apps/storybook/AGENTS.md` — Component showcase (`apps/storybook/`)
- `apps/app/AGENTS.md` — Customer dashboard (`apps/app/`)
- `apps/shared/AGENTS.md` — Shared Nuxt layer (`apps/shared/`)

## Code Navigation

Use LSP tools for navigation:
- `goToDefinition` — Jump to source
- `findReferences` — See all usages
- `workspaceSymbol` — Find symbol definitions
- Check LSP diagnostics after editing code

## Tools

- **Package manager:** pnpm (>=10.7.1)
- **Node version:** >=22.0.0
- **Monorepo:** Turbo
- **Formatter:** Biome
- **Linter:** oxlint
- **Type checker:** TypeScript
- **Testing:** Vitest (unit), Playwright (E2E)
- **CI/CD:** Changesets for versioning

## Resources

- Documentation: https://styleframe.dev
- Repository: https://github.com/styleframe-dev/styleframe
- Issues: https://github.com/styleframe-dev/styleframe/issues
