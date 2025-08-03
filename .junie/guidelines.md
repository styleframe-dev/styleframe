# Styleframe — Project Guidelines for Junie

This document provides a concise project overview and working instructions for Junie, based on the official documentation under `docs/content/docs` and the repository setup.

## What is Styleframe (from docs)
Styleframe is an open‑source tool for writing type‑safe, composable, and future‑proof CSS in TypeScript. It enables:
- Type‑safe CSS API (compile‑time validation)
- Composable, modular styling primitives
- Built‑in theming (e.g., light/dark)
- Framework‑agnostic usage (React, Vue, Svelte, Solid, Astro, etc.)
- Great DX with IDE autocomplete and static analysis

Key concepts documented under `docs/content/docs/02.api` include: Variables (design tokens), Selectors, Media Queries, Keyframes, Interpolation, Utilities, Recipes, Themes, and Composables.

## Repository structure (monorepo)
- core — The TypeScript library (`@styleframe/core`).
  - Scripts: `dev` (vite), `build` (typecheck + vite build), `test` (vitest run), `test:dev` (watch).
  - Tests live under `core/src/**.test.ts` (e.g., tokens, selectors, media).
- docs — The documentation site (Nuxt Content).
  - Scripts: `dev`, `build`, `generate`, `preview`.
  - Markdown docs used for this overview are under `docs/content/docs`.
- devtools/** — Internal build tooling.
- config/** — Shared configuration packages.

Workspace definition is in `pnpm-workspace.yaml`. Task orchestration uses Turbo (`turbo.json`).

## Prerequisites
- Node >= 22.0.0
- pnpm >= 10.7.1

## Install dependencies
Run at the repository root:
- pnpm install

## Build
- Build all packages via Turbo:
  - pnpm build  (runs `turbo run build`)
- Per package:
  - Core: pnpm --filter @styleframe/core build
  - Docs: pnpm --filter @styleframe/docs build

## Tests
- Run tests across the workspace (Turbo will invoke package `test` scripts):
  - pnpm -w turbo run test
- Run only core tests:
  - pnpm --filter @styleframe/core test
- Watch mode (core):
  - pnpm --filter @styleframe/core run test:dev

## Linting and formatting
- Lint (Oxlint): pnpm lint
- Format (Biome): pnpm format

## Running the documentation site
- Start docs locally: pnpm --filter @styleframe/docs dev
- Build docs: pnpm --filter @styleframe/docs build
- Static generate: pnpm --filter @styleframe/docs generate

## Using Styleframe in an application (from docs)
- Install: pnpm add styleframe (or yarn/npm/bun equivalents)
- Initialize in a project (creates `styleframe.config.ts` and `src/styleframe.theme.ts`):
  - pnpx styleframe init
- Build themes:
  - CLI: styleframe build
  - Programmatic (example):
    - import { build, loadConfiguration } from 'styleframe/cli'
    - const configuration = await loadConfiguration()
    - await build(configuration)

## Notes for Junie when addressing issues
- Prefer minimal changes scoped to the relevant package (most issues will target `core`).
- If tests are present/affected in `core`, run them with Vitest as shown above.
- Use workspace filters (`pnpm --filter`) to target specific packages for build/test/dev.
- Respect Node/pnpm engine requirements to avoid tooling errors.

Source for this overview: documentation under `docs/content/docs` and package scripts in this repository.
