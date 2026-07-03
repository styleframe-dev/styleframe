# @styleframe/app

The Styleframe Pro customer dashboard at `app.styleframe.dev` — sign-in, sign-up, and license activation. A Nuxt 4 app (`nuxt` 4.4.8 via the `nuxt` pnpm catalog) that extends the [`../shared`](../shared/AGENTS.md) layer for its module set, theme, and analytics. Auth is Supabase (`@nuxtjs/supabase`); the UI is Nuxt UI + Tailwind CSS from the shared layer — this app does **not** consume Styleframe itself. Not published, and listed in [`.changeset/config.json`](../../.changeset/config.json) `ignore` — changes here need no changeset.

## Layout

```
apps/app/
├── nuxt.config.ts            # extends ../shared; supabase redirects; routeRules; runtimeConfig shape
├── nuxt.schema.ts            # app-config schema (@nuxt/content/preview fields)
├── .env.example              # the full environment contract — copy to .env
├── app/                      # Nuxt srcDir
│   ├── api/license.ts        # activateLicense() → Supabase Edge Function "activate-license"
│   ├── components/           # LicenseActivationCard, LanguageSelect, app/ (header + footer shell)
│   ├── composables/useAppI18n.ts   # i18n wrapper with disabled-state fallback
│   ├── layouts/              # default (dashboard sidebar), auth (centered card + gradient)
│   ├── pages/                # index, login, signup, logout, confirm, forgot/reset-password, debug
│   └── types/database.types.ts     # generated Supabase types — do not hand-edit
├── i18n/locales/             # 30 translation JSONs; en.json is the fallback source
└── public/                   # favicons, logos, manifest
```

## Auth and license activation

`@nuxtjs/supabase` runs with `redirect: true`: every route except the public list in [`nuxt.config.ts`](./nuxt.config.ts) (`/login`, `/signup`, `/confirm`, `/debug`, `/forgot-password`, `/reset-password`) bounces unauthenticated users to `/login`. GitHub OAuth uses the implicit flow with `detectSessionInUrl`; the callback lands on `/confirm`. Use `useSupabaseClient()` / `useSupabaseUser()` — never construct a Supabase client directly.

The one real feature is license activation: [`app/components/LicenseActivationCard.vue`](./app/components/LicenseActivationCard.vue) collects a GitHub username (`label`) and license key (`key`) and calls `activateLicense()` in [`app/api/license.ts`](./app/api/license.ts), which invokes the `activate-license` Edge Function.

## i18n is currently disabled

`@nuxtjs/i18n` is a dependency and 30 locale files exist, but the module is not registered in `nuxt.config.ts`, so `config.public.i18n` is absent at runtime. [`useAppI18n()`](./app/composables/useAppI18n.ts) detects this and serves static English by traversing `i18n/locales/en.json`. Always call `useAppI18n()`, never `useI18n()` directly — the raw composable has no module backing it today.

## Build & dev

```bash
pnpm --filter @styleframe/app dev       # nuxt dev on http://localhost:4000
pnpm --filter @styleframe/app build     # nuxt build (also: generate, preview)
pnpm --filter @styleframe/app generate:db:types   # regenerate Supabase types (needs supabase CLI)
```

There is no root `dev:app` shortcut and no test suite. Copy [`.env.example`](./.env.example) to `.env` first — the app boots without it but auth and analytics won't work.

## Pitfalls

- **`NUXT_PUBLIC_BASE_URL` must be set** (see `.env.example`) — OAuth redirect URLs derive from it; production login breaks silently without it.
- **`generate:db:types` writes to `types/database.types.ts`** at the package root, but the checked-in file lives at `app/types/database.types.ts`. Move the output (or fix the script) — running it as-is creates a second, dead copy.
- `/privacy`, `/terms`, `/license` are `routeRules` redirects to `www.styleframe.dev` — don't add local pages at those paths.

## See also

- [`../shared/AGENTS.md`](../shared/AGENTS.md) — where the modules, theme, PostHog plugin, and app-config defaults actually live.
- [`nuxt.schema.ts`](./nuxt.schema.ts) — the editable app-config surface (ui colors/icons, seo, header, socials, toc, github).
