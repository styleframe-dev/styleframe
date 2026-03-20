# Integration Testing

End-to-end tests that validate the full Styleframe toolchain — from CLI init, through the Vite plugin, to runtime CSS output in real browsers.

## How It Works

The test pipeline simulates a real user workflow:

1. **Build** all Styleframe packages from source
2. **Pack** them into `.tgz` tarballs (simulating npm publish)
3. **Scaffold** a fresh Vue + TypeScript Vite project
4. **Install** Styleframe from local tarballs, run `styleframe init`
5. **Copy** fixture files (Vue pages, router, styleframe config) into the project
6. **Build** the Vite project with the Styleframe plugin
7. **Test** the built output with Playwright across Chromium, Firefox, and WebKit

## Quick Start

### Full pipeline (CI)

Runs everything from scratch in a temp directory, then cleans up:

```bash
pnpm run start
```

### Local development

Set up the integration app once, then iterate on fixtures and tests:

```bash
# One-time setup — creates .app/ with the full project
pnpm run setup

# Run Playwright tests against .app/
pnpm run test:e2e

# After changing fixtures, re-copy and rebuild
pnpm run update

# Then re-run tests
pnpm run test:e2e
```

## Directory Structure

```
testing/integration/
├── src/
│   ├── main.ts              # Full CI pipeline (setup + test + cleanup)
│   ├── setup.ts             # One-time setup to .app/
│   ├── update.ts            # Re-copy fixtures + rebuild .app/
│   ├── commands.ts           # Shared pipeline commands
│   ├── constants.ts          # Default Vite config constant
│   └── fixtures/
│       ├── styleframe.config.ts  # Styleframe configuration
│       ├── vite.config.ts        # Vite config with scanner content patterns
│       └── src/
│           ├── main.ts           # Vue app entry point
│           ├── App.vue           # Root component with <router-view>
│           ├── router.ts         # Hash-based routing
│           ├── env.d.ts          # Vue SFC type declarations
│           └── pages/
│               ├── HomePage.vue      # Index with navigation links
│               ├── SelectorsPage.vue # Selector tests (h1 styling)
│               └── UtilitiesPage.vue # Utility class tests
├── tests/
│   ├── example.spec.ts       # Tests selector-based styling
│   └── utilities.spec.ts     # Tests utility class CSS output
├── playwright.config.ts      # Playwright config (chromium, firefox, webkit)
└── .app/                     # Local integration app (gitignored)
```

## Adding New Test Fixtures

1. Create a new Vue page in `src/fixtures/src/pages/` (e.g., `RecipesPage.vue`)
2. Add the route in `src/fixtures/src/router.ts`
3. Create a test file in `tests/` that navigates to the new route
4. Run `pnpm run update && pnpm run test:e2e` to verify

## Scripts

| Script | Description |
|--------|-------------|
| `start` | Full CI pipeline: setup in temp dir, test, cleanup |
| `setup` | One-time setup of `.app/` for local development |
| `update` | Re-copy fixtures and rebuild `.app/` |
| `test:e2e` | Run Playwright tests against `.app/` (or `PROJECT_DIR`) |
