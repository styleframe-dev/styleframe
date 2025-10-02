# Implement CLI Package for Styleframe

## Overview
Create a CLI package to provide `styleframe init` and `styleframe build` commands as documented in the installation guides.

## Description
The documentation references CLI commands that don't exist yet:
- `styleframe init` - Initialize styleframe in a project
- `styleframe build` - Build theme files from configuration

## Tasks
- [x] Create new package `@styleframe/cli` 
- [x] Implement `init` command that:
  - Creates `styleframe.config.ts` file
  - Creates `src/styleframe.theme.ts` file  
  - Installs styleframe as dev dependency
- [ ] Implement `build` command that:
  - Reads configuration from `styleframe.config.ts`
  - Processes theme files
  - Generates CSS output
- [ ] Create programmatic API exports (`build`, `loadConfiguration`)
- [ ] Add proper CLI argument parsing and help text
- [ ] Add executable bin entry in package.json
- [ ] Write comprehensive tests for CLI functionality
- [ ] Update documentation with CLI usage examples

## Acceptance Criteria
- [ ] Users can run `npx styleframe init` to scaffold a project
- [ ] Users can run `styleframe build` to generate CSS from their themes
- [ ] CLI provides helpful error messages and validation
- [ ] Programmatic API is available for build tools integration
- [ ] All CLI commands have tests with >90% coverage

## Priority
🔥 **High** - This is referenced throughout the documentation and is essential for user onboarding.

## Labels
`enhancement`, `cli`, `good first issue`, `documentation`
