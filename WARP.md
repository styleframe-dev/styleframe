# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Styleframe is an open-source tool for writing type-safe, composable, and future-proof CSS in TypeScript. It provides a TypeScript API for CSS authoring with compile-time validation, built-in theming, and framework-agnostic usage.

## Architecture

This is a monorepo with the following key packages:

### Core Engine (`engine/`)
- **`@styleframe/core`** - The main TypeScript library containing the core CSS authoring API
  - Exports: `styleframe()` factory function, tokens system (variables, selectors, utilities, recipes, themes, media, keyframes, etc.)
  - Key files: `styleframe.ts` (main API), `tokens/` (CSS primitives)
- **`@styleframe/transpiler`** - Transpiles styleframe objects to CSS files
  - Main functions: `transpile()`, `consume()` for converting styleframe instances to CSS output

### Configuration (`config/`)
- **`@styleframe/config-typescript`** - Shared TypeScript configuration
- **`@styleframe/config-vite`** - Shared Vite configuration for building packages

### Documentation (`docs/`)
- Nuxt Content-based documentation site
- Content lives in `docs/content/`

### Development Tools (`devtools/`)
- **`@styleframe/build`** - Build utilities and tooling

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.7.1

## Common Commands

### Setup
```bash
# Install all dependencies
pnpm install
```

### Building
```bash
# Build all packages (uses Turbo for orchestration)
pnpm build

# Build specific packages
pnpm --filter @styleframe/core build
pnpm --filter @styleframe/transpiler build
pnpm --filter @styleframe/docs build
```

### Testing
```bash
# Run all tests
pnpm -w turbo run test

# Test specific package
pnpm --filter @styleframe/core test

# Watch mode for core package tests
pnpm --filter @styleframe/core run test:dev

# Individual package test (from package directory)
pnpm test          # run tests
pnpm test:dev      # watch mode
```

### Development
```bash
# Start core package in dev mode
pnpm --filter @styleframe/core dev

# Start documentation site
pnpm --filter @styleframe/docs dev
```

### Code Quality
```bash
# Lint (uses Oxlint)
pnpm lint

# Format (uses Biome)
pnpm format
```

### Package-specific Development
```bash
# Work on core library
pnpm --filter @styleframe/core dev
pnpm --filter @styleframe/core build
pnpm --filter @styleframe/core test:dev

# Work on transpiler
pnpm --filter @styleframe/transpiler dev
pnpm --filter @styleframe/transpiler test

# Run documentation site locally
pnpm --filter @styleframe/docs dev
pnpm --filter @styleframe/docs generate  # static generation
```

## Key Development Patterns

### Workspace Structure
- Use `pnpm --filter <package-name>` to target specific packages
- Turbo orchestrates builds with proper dependency ordering
- Each engine package has its own Vite config extending shared config

### Testing Strategy
- Tests are co-located with source files as `*.test.ts`
- Uses Vitest for testing framework
- Tests cover core tokens, selectors, media queries, and other CSS primitives

### Build System
- Vite builds libraries with TypeScript declaration generation
- Shared Vite config in `config/vite/` provides common build setup
- Each package defines entry point at `src/index.ts`

### Token System Architecture
The core API is built around a token system where each token type represents a CSS primitive:
- **Variables**: CSS custom properties and design tokens
- **Selectors**: CSS selectors with type safety
- **Utilities**: Reusable utility classes
- **Recipes**: Component styling patterns
- **Themes**: Theme-based styling system
- **Media**: Media query handling
- **Keyframes**: Animation definitions

### CLI Usage Context
When users install styleframe in projects:
```bash
pnpx styleframe init    # Creates config files
styleframe build        # Builds themes from config
```

## Engine Requirements

- Node >= 22.0.0 (specified in package.json engines)
- Uses ESM modules throughout
- TypeScript strict mode enabled
