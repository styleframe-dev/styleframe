# @styleframe/testing-integration

End-to-end integration testing suite that validates the full Styleframe toolchain. It simulates a real user workflow — from CLI initialization through the Vite plugin to runtime CSS output — and asserts correctness in real browsers (Chromium, Firefox, WebKit) using Playwright.

## Package Info

- **Name:** `@styleframe/testing-integration`
- **Test runner:** Playwright (`@playwright/test`)
- **Build tool:** Vite + Vue
- **Base URL:** `http://localhost:4173` (Vite preview server)
- **Browsers:** Chromium, Firefox, WebKit

---

## How It Works

The integration pipeline follows these steps:

1. **Build all Styleframe packages** — runs `pnpm run build:nodocs` from the monorepo root
2. **Pack to `.tgz` tarballs** — creates distributable archives of engine, tooling, and theme packages
3. **Create a starter Vite project** — scaffolds a fresh Vue + TypeScript Vite app
4. **Install Styleframe via CLI** — installs packages from local tarballs with `pnpm` overrides, runs `styleframe init`
5. **Copy fixture configs** — copies `styleframe.config.ts`, `vite.config.ts`, and `src/` fixtures into the app
6. **Build with Vite** — runs `npx vite build` to generate production assets with Styleframe CSS
7. **Run Playwright tests** — validates browser-rendered computed styles against expected values

---

## Source Structure

```
src/
├── main.ts          # Full CI pipeline (build → pack → scaffold → install → test → cleanup)
├── setup.ts         # One-time local dev setup (creates .app/ directory)
├── update.ts        # Re-syncs fixtures and rebuilds .app/ without full reinstall
├── commands.ts      # Shared pipeline utility functions
├── constants.ts     # Default Vite config constant
├── index.ts         # Barrel re-exports
└── fixtures/        # Test app source files
    ├── styleframe.config.ts   # Styleframe config exercising all major features
    ├── vite.config.ts         # Vite config with Styleframe plugin
    └── src/
        ├── main.ts            # Vue app entry (imports virtual Styleframe CSS)
        ├── App.vue            # Root component with <router-view />
        ├── router.ts          # Hash-based router with 11 test page routes
        └── pages/             # One Vue component per test scenario

tests/
├── example.spec.ts                # Selector + design token ref styles
├── utilities.spec.ts              # Margin, padding, background, text utilities
├── utilities-autogenerate.spec.ts # Scanner-resolved and array-syntax utilities
├── variables.spec.ts              # Custom variables and @-prefixed string refs
├── selectors-advanced.spec.ts     # Nested selectors and media queries
├── themes.spec.ts                 # Theme switching via data-theme attribute
├── recipes.spec.ts                # Badge recipe with variant system
├── keyframes.spec.ts              # Animation keyframes
├── layout-flexbox.spec.ts         # Flexbox and position utilities
└── borders-effects.spec.ts        # Border-radius and display utilities
```

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `pnpm run start` | Full CI pipeline: setup in temp dir → test → cleanup |
| `pnpm run setup` | One-time local `.app/` setup |
| `pnpm run update` | Re-copy fixtures and rebuild `.app/` |
| `pnpm run dev` | Watch mode Vite build |
| `pnpm run build` | Typecheck and build |
| `pnpm run test:e2e` | Run Playwright tests against built `.app/` |

---

## Local Development Workflow

```bash
# 1. One-time setup (creates .app/ directory)
pnpm run setup

# 2. Run tests
pnpm run test:e2e

# 3. After changing fixtures, re-sync and rebuild
pnpm run update

# 4. Run tests again
pnpm run test:e2e
```

For full CI mode (temporary directory, auto-cleanup):

```bash
pnpm run start
```

---

## Pipeline Commands (`src/commands.ts`)

| Function | Description |
|----------|-------------|
| `buildPackages()` | Runs `pnpm run build:nodocs` from monorepo root |
| `createPackageTarballs()` | Creates `.tgz` files from engine, tooling, and theme packages |
| `mapTarballsToPackages()` | Maps tarball paths to scoped package names for `pnpm` overrides |
| `createStarterVitePackage()` | Scaffolds a fresh Vite Vue + TypeScript project |
| `installStyleframeUsingCLI()` | Installs Styleframe from tarballs, configures vite, runs `styleframe init` |
| `addStyleframeConfig()` | Copies fixture files (`styleframe.config.ts`, `vite.config.ts`, `src/`) into the app |
| `buildVite()` | Runs `npx vite build` |
| `runPlaywright()` | Executes Playwright tests |
| `cleanup()` | Removes temporary directories |

---

## Fixture Config (`src/fixtures/styleframe.config.ts`)

The fixture config exercises all major Styleframe features:

- **Design tokens preset** — colors, spacing, fontSize, fontWeight, borderRadius
- **Selectors** — `.h1`, `.card`, `.card .card-title`, `.themed-box`
- **Variables** — `s.variable()` with `custom.size` and `custom.font`
- **String refs** — `"@spacing.lg"`, `"@font-size.xl"`
- **Media queries** — responsive styles in selectors
- **Themes** — dark theme with color overrides
- **Keyframes** — `fade-in` animation
- **Custom utilities** — array syntax with multiplier autogeneration
- **Recipes** — badge recipe with color/variant system

---

## Test Pages

Each Vue component in `src/fixtures/src/pages/` exercises a specific Styleframe feature:

| Page | Route | Tests |
|------|-------|-------|
| `HomePage.vue` | `/` | Navigation hub with links to all pages |
| `SelectorsPage.vue` | `/selectors` | `.h1` selector with design token refs |
| `UtilitiesPage.vue` | `/utilities` | Margin, padding, background, text utility classes |
| `VariablesPage.vue` | `/variables` | Custom variables and `@`-prefixed string refs |
| `SelectorsAdvancedPage.vue` | `/selectors-advanced` | Nested selectors, media queries |
| `ThemesPage.vue` | `/themes` | Theme switching via `data-theme` attribute |
| `RecipesPage.vue` | `/recipes` | Badge recipe with color/variant combinations |
| `UtilitiesAutogeneratePage.vue` | `/utilities-autogenerate` | Scanner-resolved and array-syntax utilities |
| `LayoutFlexboxPage.vue` | `/layout-flexbox` | Flexbox, position, overflow utilities |
| `BordersEffectsPage.vue` | `/borders-effects` | Border-radius, display utilities |
| `KeyframesPage.vue` | `/keyframes` | CSS animation keyframes |

---

## Writing Tests

### Test Pattern

All tests follow the same pattern: navigate to a page, locate elements, and assert computed CSS styles.

```ts
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/route-name');
    });

    test('should apply expected styles', async ({ page }) => {
        const element = page.locator('#element-id');

        const styles = await element.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
                color: computed.color,
                padding: computed.padding,
            };
        });

        expect(styles.color).toBe('expected-value');
        expect(styles.padding).toBe('expected-value');
    });
});
```

### Key Conventions

1. **Use `window.getComputedStyle()`** to read browser-rendered CSS values.
2. **Color values are in OKLCH format** — assert against `oklch(...)` strings (browser-resolved).
3. **Each test file corresponds to one fixture page** — keep them in sync.
4. **Use `test.describe` blocks** to group related assertions.
5. **Use `test.beforeEach`** to navigate to the page before each test.
6. **Assert class attributes** with `toContain()` when verifying utility class application.
7. **Assert computed styles** with exact values (`toBe()`) for CSS property validation.

### Asserting Colors

Browsers resolve colors to their computed format. Expect OKLCH values:

```ts
const color = await element.evaluate((el) => window.getComputedStyle(el).color);
expect(color).toBe('oklch(0.546 0.245 264)');
```

### Asserting Responsive Styles

Use `page.setViewportSize()` to test media query breakpoints:

```ts
await page.setViewportSize({ width: 1024, height: 768 });
const padding = await element.evaluate((el) => window.getComputedStyle(el).padding);
expect(padding).toBe('32px');
```

### Asserting Keyframes

Check both animation properties and the existence of `@keyframes` rules:

```ts
// Check animation property
const animation = await element.evaluate((el) => window.getComputedStyle(el).animationName);
expect(animation).toBe('fade-in');

// Check @keyframes rule exists in stylesheets
const hasKeyframes = await page.evaluate(() => {
    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {
            if (rule instanceof CSSKeyframesRule && rule.name === 'fade-in') return true;
        }
    }
    return false;
});
expect(hasKeyframes).toBe(true);
```

---

## Adding New Test Scenarios

1. **Create a new Vue page** in `src/fixtures/src/pages/` that exercises the feature.
2. **Add a route** in `src/fixtures/src/router.ts` pointing to the new page.
3. **Add a link** in `src/fixtures/src/pages/HomePage.vue` for navigation.
4. **Create a test file** in `tests/` following the naming pattern `feature-name.spec.ts`.
5. **Update the fixture config** (`src/fixtures/styleframe.config.ts`) if new Styleframe features are needed.
6. **Run `pnpm run update`** to sync fixtures into `.app/`.
7. **Run `pnpm run test:e2e`** to verify.

---

## Playwright Configuration

- **Test directory:** `./tests`
- **Base URL:** `http://localhost:4173`
- **Browsers:** Chromium, Firefox, WebKit (all three)
- **Web server:** Starts via `npm run preview` in `.app/`
- **Retries:** 2 on CI, 0 locally
- **Workers:** 1 on CI, unlimited locally
- **Traces:** Captured on first retry

---

## Best Practices

1. **Test computed styles, not class names** — class names are implementation details; computed styles verify actual rendering.
2. **Test across all browsers** — Playwright runs Chromium, Firefox, and WebKit by default.
3. **Keep fixtures minimal** — each page should test one feature area to isolate failures.
4. **Use semantic selectors** — prefer `#id` or `[data-testid]` over fragile CSS class selectors.
5. **Run `update` after fixture changes** — always re-sync before running tests.
6. **Never modify `.app/` directly** — it is generated from fixtures and will be overwritten.

## Anti-Patterns

- Editing files inside `.app/` directly (they get overwritten by `setup`/`update`).
- Testing multiple unrelated features in a single page component.
- Asserting hex color values instead of browser-computed OKLCH format.
- Skipping `pnpm run update` after changing fixture files.
- Adding Styleframe config outside of `src/fixtures/styleframe.config.ts`.
