# Styleframe Development Guide

Styleframe is a type-safe, composable CSS-in-TypeScript framework for building design systems. This is a pnpm monorepo managed with Turbo.

## Quick Reference

**Full API documentation:** See `AGENTS.md` for comprehensive Styleframe architecture, API reference, and patterns.

## Project Structure

Core packages live in `engine/` (@styleframe/core, loader, runtime, transpiler, scanner), design tokens in `theme/`, build tools in `tooling/` (CLI, Figma sync, plugins), applications in `apps/` (docs, Storybook, dashboard), tests in `testing/`, and shared configs in `config/`.

**Import rule:** Always import from `'styleframe'` (barrel package), not `@styleframe/*` sub-packages.

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
2. Update tests in the same package
3. Run `pnpm typecheck` and `pnpm lint`
4. Test in Storybook if UI-related: `pnpm storybook`
5. Create changeset: `pnpm ci:changeset`

### Working on recipes

- Recipe implementations: `theme/src/recipes/`
- Recipe documentation: `apps/docs/content/docs/recipes/`
- Recipe stories: `apps/storybook/src/stories/recipes/`

### Working on the transpiler

- Core transpiler: `engine/transpiler/src/`
- Test fixtures: `engine/transpiler/test/`
- Always verify output CSS matches expectations

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
# Unit tests (per package)
cd engine/core && pnpm test

# Integration tests (full E2E)
pnpm test:integration
```

## Package-Specific Guides

Each package has detailed documentation in its own `AGENTS.md`:

- `engine/core/AGENTS.md` — Core token AST and factory methods
- `engine/transpiler/AGENTS.md` — CSS/TS/DTS code generation
- `theme/AGENTS.md` — Design token composables and presets
- `tooling/plugin/AGENTS.md` — Build tool integrations

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
