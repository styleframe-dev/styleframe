# @styleframe/docs

The documentation site at styleframe.dev — Nuxt 4 + Nuxt Content, extending the shared layer in [`apps/shared/`](../shared/). Content is Markdown with MDC components under [`content/`](./content/); the app shell lives under [`app/`](./app/).

The site's own chrome is styled with Nuxt UI + Tailwind, **not** styleframe — there is no `virtual:styleframe` here. Live component demos are embedded from the Storybook app ([`apps/storybook/`](../storybook/)) via iframes.

## Layout

```
apps/docs/
├── nuxt.config.ts             # extends ../shared; content, sitemap, og-image, llms, prerender
├── content.config.ts          # builds one Nuxt Content collection per DOCS_SECTIONS entry
├── content/
│   ├── *.md                   # landing pages (index, pricing, license, …)
│   └── docs/                  # the docs tree — see "Sections and URLs"
├── app/
│   ├── constants/sections.ts  # DOCS_SECTIONS + THEME_SUBSECTIONS — source of truth for nav AND collections
│   ├── pages/[[lang]]/docs/[section]/[...slug].vue   # renders every docs page
│   ├── components/content/    # MDC components (StoryPreview, FrameworkSwitcher, BrowserFrame, …)
│   └── components/docs/       # docs chrome (asides, framework select, header links)
├── modules/                   # nonRouteCategories (reads .navigation.yml), optimizeDeps
├── i18n/locales/              # UI-string translations (JSON)
└── server/routes/             # raw markdown endpoint + prerender helper
```

## Sections and URLs

[`app/constants/sections.ts`](./app/constants/sections.ts) maps top-level content folders to URL sections, and [`content.config.ts`](./content.config.ts) builds the content collections from the same constant:

| Content folder(s)                                                            | URL prefix                |
| ---------------------------------------------------------------------------- | -------------------------- |
| `01.getting-started/` (root), `08.tooling/`, `09.integrations/`              | `/docs/getting-started/…` |
| `02.api/`                                                                    | `/docs/api/…`             |
| `03.design-tokens/`, `04.elements/`, `05.components/`, `06.utilities/`, `07.modifiers/` | `/docs/theme/…` |

`NN.` numeric prefixes order files and folders and are stripped from URLs: `content/docs/05.components/04.feedback/00.badge.md` → `/docs/theme/components/feedback/badge`. Section index pages are `00.index.md`.

Category folders that group pages without having a page of their own (e.g. `05.components/04.feedback/`) carry a `.navigation.yml` with `title`, `icon`, and `route: false`; the [`modules/nonRouteCategories.ts`](./modules/nonRouteCategories.ts) module turns these into non-clickable nav groups.

## Component (recipe) doc pages

One page per theme recipe at `content/docs/05.components/<NN>.<category>/<nn>.<name>.md`, where the categories are `02.actions`, `03.navigation`, `04.feedback`, `05.forms`, `06.overlays`, `07.layout`, `08.ai-chat`. [`04.feedback/00.badge.md`](./content/docs/05.components/04.feedback/00.badge.md) is the canonical example.

Live demos use the `::story-preview` MDC block with a Storybook story id:

```markdown
::story-preview
---
story: theme-recipes-feedback-badge--default
panel: true
---
::
```

[`app/components/content/StoryPreview.vue`](./app/components/content/StoryPreview.vue) renders it as an iframe pointing at `http://localhost:6006` in dev and `https://storybook.styleframe.dev` in production, with a postMessage handshake for auto-height and dark-mode sync.

## Authoring conventions

- Frontmatter: `title` and `description` required; optional `navigation.title` / `navigation.icon` (`i-lucide-*`, or `icon: false`). Never write an H1 in the body — the title renders from frontmatter.
- Multi-file code examples use `::code-tree`; Code/Output/Usage examples use `::tabs` with `:::tabs-item`. Other MDC blocks in active use: `::note`, `::tip`, `::steps{level="4"}`, `::accordion` (FAQ), `::framework-switcher`.
- Config examples create one instance and end with `export default s;`; token references use `@`-shorthand (`"@spacing.md"`). The full authoring rules live in the [root AGENTS.md](../../AGENTS.md) → "Authoring rules".
- Cross-link with absolute paths (`/docs/api/recipes`) and only to pages that exist.

## Build & dev

```bash
pnpm dev:docs                          # from repo root: docs + Storybook together (StoryPreview needs :6006)
pnpm build:docs                        # from repo root: turbo build --filter ./apps/docs
pnpm --filter @styleframe/docs dev     # docs alone — story previews will render empty iframes
```

In-package scripts ([`package.json`](./package.json)): `dev`, `build`, `generate`, `preview`, plus `postinstall: nuxt prepare`. There are no tests or typecheck in this package.

## Pitfalls

- **Story ids in `::story-preview` are derived from Storybook story titles.** Renaming a `title:` in `apps/storybook/stories/` silently breaks every docs page that embeds it (63 pages embed stories today). Grep `content/docs` for the old id when renaming.
- **Adding a top-level folder under `content/docs/` is not enough** — it must also be registered in `DOCS_SECTIONS` in [`app/constants/sections.ts`](./app/constants/sections.ts), or no collection is created and the pages 404.
- **Renaming the part after the `NN.` prefix changes the public URL**; renumbering only changes nav order. Treat renames as link-breaking changes.
- **Don't style with styleframe here.** This app deliberately uses Nuxt UI/Tailwind; `virtual:styleframe` is not available.

## See also

- [`apps/storybook/AGENTS.md`](../storybook/AGENTS.md) — the app that serves the embedded demos.
- [`apps/shared/AGENTS.md`](../shared/AGENTS.md) — the Nuxt layer this app extends.
- [`theme/AGENTS.md`](../../theme/AGENTS.md) — the recipes and composables these pages document.
