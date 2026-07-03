# @styleframe/storybook

The showcase app for [`@styleframe/theme`](../../theme/) — Storybook 10 on Vue 3 (`@storybook/vue3-vite`). Private, never published. Every theme recipe, element preset, and design-token group gets stories here, and the deployed build (storybook.styleframe.dev) doubles as the live-demo backend that [`apps/docs/`](../docs/) embeds via `::story-preview` iframes.

## Layout

```
apps/storybook/
├── styleframe.config.ts        # global instance: design-tokens, sanitize, global, utilities, modifiers presets
├── vite.config.ts              # @styleframe/plugin/vite + vue; aliases @styleframe/theme → ../../theme/src;
│                               #   vitest "storybook" browser project (Playwright chromium)
├── .storybook/
│   ├── main.ts                 # story glob ../stories/**/*.stories.*; addons; vue3-vite framework
│   ├── preview.ts              # imports virtual:styleframe.css; dark-mode classes; reports preview height
│   ├── manager.ts / theme.ts   # custom UI themes; docs-embed postMessage relay
│   └── vitest.setup.ts         # portable-stories setup for the vitest addon
├── stories/
│   ├── components/             # <name>.stories.ts + <name>.styleframe.ts — one pair per recipe
│   ├── design-tokens/          # <token>.stories.ts (swatch grids)
│   ├── elements/               # plain-template stories styled by the global preset (no .styleframe.ts)
│   └── states/                 # focus, selection
└── src/
    ├── components/
    │   ├── components/<name>/  # <Name>.vue (+ sub-part .vue files for multi-part recipes)
    │   │   └── preview/        # <Name>Grid.vue, <Name>SizeGrid.vue
    │   ├── design-tokens/<group>/  # <Token>Swatch.vue + .styleframe.ts
    │   └── primitives/         # StoryGrid, SwatchCard, SwatchRow, BarChart (+ .styleframe.ts, index.ts)
    └── utils/                  # theme event buses
```

`index.html` and `README.md` at the package root are leftovers from the Vite template (`src/main.ts` doesn't exist); Storybook ignores them.

## Anatomy of a recipe showcase

Badge is the canonical example — four pieces:

1. [`stories/components/badge.styleframe.ts`](./stories/components/badge.styleframe.ts) — registers `useBadgeRecipe(s)` on the shared instance (imported from `virtual:styleframe`), adds `.badge-grid`-style layout selectors, exports `s` as default.
2. [`src/components/components/badge/Badge.vue`](./src/components/components/badge/Badge.vue) — imports the compiled `badge` recipe function from `virtual:styleframe`, exposes `color`/`variant`/`size`/`label` props, applies `badge({...})` as class. Multi-part recipes add sibling sub-part components (see [`card/`](./src/components/components/card/): `CardHeader.vue`, `CardBody.vue`, …).
3. [`src/components/components/badge/preview/`](./src/components/components/badge/preview/) — `BadgeGrid.vue` (all color × variant combos) and `BadgeSizeGrid.vue` (all sizes).
4. [`stories/components/badge.stories.ts`](./stories/components/badge.stories.ts) — CSF3: `title: "Theme/Recipes/Feedback/Badge"`, `tags: ["autodocs"]`, `satisfies Meta<typeof Badge>`, a `Default` story with args, `AllVariants`/`AllSizes` rendering the grids, and one story per color/variant/size.

Title conventions: `Theme/Recipes/<Category>/<Name>` (Category matches the docs nav — Actions, Feedback, Forms, …), `Theme/Elements/<Element>`, `Theme/States/<State>`, `Design Tokens/<Group>/<Token>`.

## The docs-embed contract

Docs pages reference stories by id — `title` "Theme/Recipes/Feedback/Badge" + export `Default` → `theme-recipes-feedback-badge--default`. [`preview.ts`](./.storybook/preview.ts) and [`manager.ts`](./.storybook/manager.ts) implement a postMessage handshake with the embedding docs page: incoming `styleframe:theme` toggles the `dark-theme`/`default-theme` body classes and the manager UI; preview height is relayed out as `styleframe:height` so the docs iframe auto-sizes. Don't rename these message types or the body classes without updating [`apps/docs/app/components/content/StoryPreview.vue`](../docs/app/components/content/StoryPreview.vue).

## Build & test

```bash
pnpm storybook                # from repo root: turbo dev --filter @styleframe/storybook
pnpm dev                      # from this dir: storybook dev -p 6006
pnpm build                    # storybook build → storybook-static/
pnpm typecheck                # vue-tsc --noEmit
pnpm exec vitest              # run every story as a browser test (addon-vitest + Playwright chromium)
```

There is no `test` script, so `turbo run test` skips this package; the vitest project in [`vite.config.ts`](./vite.config.ts) is opt-in and needs Playwright browsers installed. The a11y addon runs with `test: "todo"` — violations show in the test UI but don't fail anything.

## Pitfalls

- **Story titles are public API.** 63 docs pages embed story ids derived from them; renaming a title or a story export silently breaks those iframes. Grep `apps/docs/content/docs` for the old id first.
- **A recipe function only exists on `virtual:styleframe` after a `*.styleframe.ts` file registers it.** Importing `badge` in a Vue component without the matching `stories/components/badge.styleframe.ts` gives you an undefined export at runtime.
- **`@styleframe/theme` is aliased to `../../theme/src`** (in both the plugin config and Vite `resolve.alias`), so you're always previewing theme *source*, not its built `dist/` — theme edits hot-reload here, but a passing Storybook doesn't prove the built package works.
- **The plugin's scanner globs** (`./stories/**/*.stories.{ts,tsx}`, `./src/**/*.{vue,ts,tsx}`) decide which utility classes are emitted; utility classes used outside those paths produce no CSS.

## See also

- [`theme/AGENTS.md`](../../theme/AGENTS.md) — where the recipes being showcased live.
- [`tooling/plugin/AGENTS.md`](../../tooling/plugin/AGENTS.md) — the virtual modules and `*.styleframe.ts` discovery.
- [`apps/docs/AGENTS.md`](../docs/AGENTS.md) — how docs pages embed these stories.
