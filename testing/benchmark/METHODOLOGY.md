# Benchmark Methodology

Symmetric comparison of CSS output size, HTML class density, and visual parity between Styleframe and Tailwind CSS v4. Both sides declare the same design tokens, register equivalent utilities, and use the same HTML structure — only class naming conventions differ.

## Symmetry guarantees

| Dimension | Styleframe | Tailwind |
|---|---|---|
| Design tokens | Hand-written `variable()` calls in `config.ts` | Hand-written `@theme` block in `config.css` |
| Token values | Identical hex colors, rem spacing, px borders | Same values, Tailwind naming (`--color-*`, `--spacing-*`) |
| Utilities | Registered via `utility()` with `ref()` to tokens | Built-in from `@theme` token namespaces |
| HTML structure | Shared `page()` template function | Same `page()` function, different class slots |
| CSS treeshaking | Scanner + `treeshake: true, scanner: true` | JIT scans `@source` HTML (built-in) |
| Visual verification | Playwright screenshots via `pnpm run visual` | Same |

## Configurations

| Configuration | Description |
|---|---|
| **Tailwind v4** | `@theme { --*: initial; ... }` with only benchmark tokens. No Preflight. |
| **Styleframe** | Long utility names: `_padding-inline:xl`, `_background:primary` |
| **SF Minified** | Same as Styleframe with `minify: true` — shortened class names |
| **SF Shorthand** | Tailwind-style short names: `_px:xl`, `_bg:primary` |

## Design tokens (shared)

Both configs declare the same 30+ tokens with identical values:

- **Colors:** primary (5 shades), success (4), error (4), neutral (7), white, black, background, surface, text, text-weak
- **Spacing:** xs (0.25rem), sm (0.5rem), md (0.75rem), lg (1rem), xl (1.5rem), 2xl (2rem), 60 (15rem)
- **Typography:** font-size xs/sm/md/lg, font-weight normal/medium/semibold/bold, line-height tight/normal
- **Borders:** border-width thin (1px), border-radius sm/md/lg/full
- **Max-width:** sm (24rem), md (28rem), lg (32rem), xl (36rem), 2xl (42rem)

Styleframe tokens are in `src/styleframe/config.ts`. Tailwind tokens are in `src/tailwind/config.css`. Both files are hand-written and auditable side-by-side.

## What's measured

| Metric | How |
|---|---|
| Raw HTML | `Buffer.byteLength(bodyContent, 'utf-8')` — body only, excludes `<head>` |
| Raw CSS | `Buffer.byteLength(css, 'utf-8')` |
| Gzipped HTML/CSS | `zlib.gzipSync(content, { level: 6 }).length` (level 6 = HTTP server default) |
| Gzipped total | `zlib.gzipSync(html + css, { level: 6 }).length` |
| Class count | Regex extract `class="..."` values, split by whitespace |
| Avg classes/element | Total classes / elements with class attributes |
| P95 classes/element | 95th percentile of per-element class counts |

## Pages

Five realistic pages, each written three times (Styleframe long, Styleframe shorthand, Tailwind) with identical HTML structure:

| Page | Description | Sections |
|---|---|---|
| **Dashboard** | SaaS admin panel | Nav, sidebar, hero, stat cards, alerts, team table, form, chat, footer |
| **Marketing** | Landing page | Nav, hero, features grid, testimonials, pricing tiers, CTA, footer |
| **Blog** | Article page | Header, article with headings/lists/blockquote/code, sidebar, comments, footer |
| **E-commerce** | Product listing | Header, breadcrumbs, filters, 3×3 product grid, pagination, cart summary, footer |
| **Settings** | App settings | Header, tabs, profile form, notification toggles, security section, danger zone |

Each page file is in `src/pages/` and exports a `PageSpec` with all three variants. The shared `page()` template function takes a class-slot object — proving the HTML structure is identical across variants.

## Visual verification

Run `pnpm run visual` to launch Playwright, screenshot all pages × all variants at 1280×800, and save to `results/screenshots/`. Image size ratios between Tailwind and Styleframe are reported — 99.5%+ indicates near pixel-identical rendering.

## Tailwind CSS constant-size behavior

Tailwind v4 emits a fixed CSS size per `@theme` configuration regardless of which classes are used. The `@theme` block generates `:root` variables, `@property` rules, and `@layer` structure that constitute a baseline overhead. This is visible in the data: Tailwind's CSS is identical across all five pages (6,846 B raw per page).

Styleframe's CSS varies per page because its scanner + treeshaking only emits `:root` variables and utility rules that are actually referenced in the HTML.

## Caveats

**No presets or resets.** Neither side uses CSS resets (no Preflight, no `useSanitizePreset`). Both configs are built from scratch with only the tokens and utilities needed for the benchmark pages.

**No recipes.** This benchmark compares utility-class output only. Recipe comparison (Styleframe `recipe()` vs Tailwind + CVA) is a separate concern not covered here.

**Tailwind auto-discovery.** Tailwind v4 scans content files from the git root by default. Despite per-page `@source` directives, the CLI may scan additional files. The constant CSS size across pages reflects this behavior.

**Object syntax required for literal values.** Styleframe utility values that are CSS keywords (e.g., `flex`, `center`, `solid`) must be registered with object syntax `{ flex: "flex" }`, not array syntax `["flex"]`. Array syntax treats strings as token references, producing `var(--flex)` instead of `flex`.

## Reproduction

```bash
pnpm install
pnpm --filter @styleframe/testing-benchmark run measure    # Build + measure all pages
pnpm --filter @styleframe/testing-benchmark run visual     # Screenshot comparison

cat testing/benchmark/results/report.md                    # View results
open testing/benchmark/results/screenshots/                # View screenshots
```

## File structure

```
src/
  styleframe/
    config.ts              # Tokens + utilities (long names)
    config-shorthand.ts    # Tokens + utilities (short names)
    build.ts               # Scanner → transpile → write HTML + CSS
  tailwind/
    config.css             # @theme tokens (must match config.ts)
    build.ts               # Write HTML → run CLI → read CSS
  pages/
    dashboard.ts           # 3 variants sharing one page() template
    marketing.ts
    blog.ts
    ecommerce.ts
    settings.ts
  measure.ts               # Build all pages, measure sizes, write report
  visual-compare.ts        # Playwright screenshot comparison
  template.ts              # HTML document wrapper
  types.ts                 # PageSpec, SizeMeasurement, etc.
  utils/
    size.ts                # Byte/gzip measurement
    report.ts              # Markdown table formatter
```
