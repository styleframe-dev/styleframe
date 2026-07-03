# @styleframe/testing-benchmark

Private (never published) benchmark comparing Styleframe against Tailwind CSS v4: CSS output size, HTML class density, and visual parity across five realistic pages, each hand-written in four variants (Tailwind, Styleframe long-form, Styleframe minified, Styleframe shorthand) over an identical shared `page()` template. The canonical methodology doc is [`METHODOLOGY.md`](./METHODOLOGY.md) — read it before changing anything measured.

## Layout

```
src/
├── measure.ts             # Main entry: build all pages × variants, measure, write results/report.md
├── visual-compare.ts      # Playwright screenshots of every page × variant → results/screenshots/
├── styleframe/            # config.ts (tokens+utilities, long names), config-shorthand.ts, build.ts (scan → transpile)
├── tailwind/              # config.css (@theme — must mirror styleframe/config.ts) + build.ts (Tailwind CLI)
├── pages/                 # dashboard, marketing, blog, ecommerce, settings — 3 class-slot variants each
├── template.ts, types.ts  # HTML document wrapper; PageSpec/report types
├── utils/                 # size.ts (byte + gzip), report.ts (markdown tables)
└── inspect-*.ts, test-display.ts   # Ad-hoc tsx debugging scripts, no package.json script entries
tests/visual-parity.spec.ts  # Playwright smoke test (Chromium only, file:// against results/)
```

Everything lands in `results/` (gitignored): `results/<page>/<variant>/index.{html,css}`, `results/report.md`, `results/screenshots/`.

## Running it

Workspace packages must be built first (`pnpm build:nodocs` at the repo root) — the build scripts import `styleframe`, `styleframe/transpiler`, and `@styleframe/scanner` from their `dist/`.

| Command | Purpose |
| --- | --- |
| `pnpm run measure` | Build all pages + variants, write `results/report.md` |
| `pnpm run visual` | Screenshot every page × variant via Playwright |
| `pnpm run test:parity` | `playwright test` — render smoke test of built output |
| `pnpm run build:styleframe` / `build:tailwind` | Run one side's build in isolation |

`pnpm run test` is Vitest with `--passWithNoTests`; [`vitest.config.ts`](./vitest.config.ts) excludes `tests/**`, which belongs to Playwright.

## Pitfalls

- **Symmetry is the whole point.** A token or utility added in [`src/styleframe/config.ts`](./src/styleframe/config.ts) must be mirrored with identical values in [`src/tailwind/config.css`](./src/tailwind/config.css) (and in `config-shorthand.ts`), or the size comparison is meaningless.
- **CSS-keyword utility values need object syntax** — `{ flex: "flex" }`, not `["flex"]`. Array syntax treats strings as token refs and emits `var(--flex)`.
- **[`tests/visual-parity.spec.ts`](./tests/visual-parity.spec.ts) is stale relative to the current output layout**: it loads `results/tailwind/index.html` etc., but builds write `results/<page>/<variant>/`, and its comment references a `src/tailwind/theme-mapper.ts` that doesn't exist. Fix the paths if you revive it; `pnpm run visual` is the working verification path.
- **Tailwind v4 auto-discovers content from the git root**, so its CSS size is constant per `@theme` regardless of page — see METHODOLOGY.md "Caveats" before interpreting numbers.
