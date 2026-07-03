# @styleframe/testing-integration

End-to-end validation of the whole Styleframe toolchain as a user experiences it: build every package, pack to `.tgz` tarballs, scaffold a **fresh Vite + Vue-TS app** with `pnpm create vite`, install styleframe from the tarballs and run `styleframe init`, copy in fixture pages, `vite build`, then assert browser-computed CSS with Playwright across **Chromium, Firefox, and WebKit**. It tests one bundler (Vite) — not Webpack/Nuxt/Astro.

User-facing walkthrough: [`README.md`](./README.md).

## Layout

```
src/
├── main.ts              # Full CI pipeline in a temp dir: build → pack → scaffold → init → build → test → cleanup
├── setup.ts             # Same pipeline, but into a persistent local .app/ (no test run, no cleanup)
├── update.ts            # Re-copies fixtures into .app/ and rebuilds — the fast iteration loop
├── commands.ts          # The pipeline steps (shelljs); includes an exact-match assert on the CLI-written vite.config.ts
├── constants.ts         # DEFAULT_VITE_CONFIG written before `styleframe init` mutates it
└── fixtures/            # The app that gets copied into the scaffold
    ├── styleframe.config.ts   # Exercises tokens, selectors, themes, keyframes, utilities, recipes
    ├── vite.config.ts
    └── src/                   # Vue entry + hash router + pages/ (one page per feature scenario)
tests/                   # Playwright specs — one <feature>.spec.ts per fixture page (11 today)
playwright.config.ts     # 3 browsers; baseURL :4173; webServer = `npm run preview` in PROJECT_DIR ?? .app/
```

## Running it

| Command | What happens |
| --- | --- |
| `pnpm test:integration` (repo root) | `turbo run start --filter './testing/integration'` — the full CI pipeline |
| `pnpm run start` | Same pipeline directly: temp dir, auto-cleanup. Slow — it runs `pnpm run build:nodocs` for the whole monorepo first |
| `pnpm run setup` | One-time: build everything into a local `.app/` you can inspect |
| `pnpm run update` | After editing anything in `src/fixtures/`: re-copy + `vite build` `.app/` |
| `pnpm run test:e2e` | `playwright test` against the built `.app/` (preview server starts automatically) |

`pnpm run test` is Vitest with `--passWithNoTests` — there are no unit tests here; Playwright owns `tests/`. In CI, the root [`ci.yml`](../../.github/workflows/ci.yml) `integration-tests` job runs `pnpm test:integration` when relevant paths change.

## Adding a scenario

1. Add a page in [`src/fixtures/src/pages/`](./src/fixtures/src/pages/), a route in [`router.ts`](./src/fixtures/src/router.ts), and a link in `HomePage.vue`.
2. Extend [`src/fixtures/styleframe.config.ts`](./src/fixtures/styleframe.config.ts) if the feature needs new config.
3. Add `tests/<feature>.spec.ts`: `page.goto('/<route>')`, then assert `window.getComputedStyle(...)` values — computed styles, not class names. Browsers resolve colors to `oklch(...)`; assert that format, not hex. Use `page.setViewportSize()` for media-query cases.
4. `pnpm run update && pnpm run test:e2e`.

## Pitfalls

- **`.app/` is generated output.** Direct edits are overwritten by `setup`/`update`. Edit `src/fixtures/` and re-run `update` — skipping it means Playwright tests a stale build.
- **`installStyleframeUsingCLI` asserts the exact `vite.config.ts` text `styleframe init` writes** ([`src/commands.ts`](./src/commands.ts)). Changing the CLI's init output breaks the pipeline here — update the assertion together with the CLI.
- **Tarball installs use npm `overrides`** mapping `@styleframe/*` to local `.tgz` files, so unpublished version bumps still resolve. New workspace packages under `engine/`, `tooling/`, or `theme` are picked up by the pack filter; packages elsewhere are not.
- **[`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml) in this package is vestigial** — workflows only run from the repo root `.github/`; the real CI entry is the root `ci.yml` job.

## See also

- [`README.md`](./README.md) — the same pipeline from the user's perspective.
- [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md) and [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md) — the pieces this suite exercises end-to-end.
