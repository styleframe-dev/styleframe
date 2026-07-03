# @styleframe/app-shared

A Nuxt 4 layer extended by [`apps/docs`](../docs/AGENTS.md) and [`apps/app`](../app/AGENTS.md) via `extends: ["../shared"]`. It registers the common module set (`@nuxt/ui`, `@nuxt/image`, `@nuxt/scripts`, `@nuxt/test-utils`, `@nuxtjs/robots`, `nuxt-og-image`, `nuxt-llms`) plus two local Nuxt modules that auto-configure site metadata, and ships the shared theme, PostHog plugin, and gradient background component.

It has no dev server, build, or tests of its own (`postinstall: nuxt prepare` is the only script) — validate changes by running a consuming app. Unlike the apps, it is **not** in the changesets `ignore` list: changes here get versioned, so add a changeset.

## Layout

```
apps/shared/
├── nuxt.config.ts             # module registration; icon serverBundle: local
├── modules/
│   ├── config.ts              # build-time auto-config: site URL, package.json meta, git, i18n
│   └── routing.ts             # auto-imports useDocusI18n (see Pitfalls)
├── app/
│   ├── app.config.ts          # defaults: seo, header, socials, github, footer, toc, ui slots
│   ├── assets/css/main.css    # Tailwind + @nuxt/ui imports; custom teal palette; --ui-primary
│   ├── components/MorphingGradientBackground.vue
│   └── plugins/
│       ├── i18n.ts            # / → /{locale} redirect; no-op unless i18n is configured
│       └── posthog.client.ts  # PostHog init — production only, skipped in dev
└── utils/
    ├── meta.ts                # inferSiteURL (env vars), getPackageJsonMetadata
    └── git.ts                 # branch + remote info from .git or CI env vars
```

## How consuming apps get configured

[`modules/config.ts`](./modules/config.ts) runs at build time in the *consuming app's* context: it infers the site URL from env (`NUXT_SITE_URL`, then Vercel/Netlify/GitLab/Cloudflare vars), reads the app's own `package.json` for name/description, resolves git info from the local `.git` or CI env, and `defu`-merges the results into `nuxt.options.llms`, `site`, and `appConfig.{header,seo,github}`. App-level values always win — override in the app's `nuxt.config.ts` / `app.config.ts`, never by editing the defaults here unless every consumer should change.

The i18n branch of the module (locale filtering, `strategy: "prefix"`, locale registration) only runs when a consuming app registers `@nuxtjs/i18n` and defines locales. No app does today, so that path — and the `plugins/i18n.ts` redirect — is dormant.

## Theming

[`app/app.config.ts`](./app/app.config.ts) sets `ui.colors` to `primary: "teal"` / `neutral: "zinc"` plus slot overrides for `commandPalette`, `contentNavigation`, `pageLinks`, `pageCard`, and `pricingTable`. [`app/assets/css/main.css`](./app/assets/css/main.css) defines the teal palette with relative HSL and sets `--ui-primary`. The CSS is **not** auto-included by the layer — both consumers list `css: ["../shared/app/assets/css/main.css"]` explicitly; a new app must do the same or it gets unstyled Nuxt UI.

[`MorphingGradientBackground.vue`](./app/components/MorphingGradientBackground.vue) exposes `{ onMousemove }` through its default slot — the parent must bind it to a container for the interactive blob to track the cursor. Theme it via the CSS custom properties on `.morphing-gradient-background` (`--color1`…`--color5`, `--color-interactive`, `--intensity`, `--blending`), not by editing the component.

## Analytics

[`plugins/posthog.client.ts`](./app/plugins/posthog.client.ts) initializes PostHog from `runtimeConfig.public.posthog` (`key`, `host`, `defaults`) with `person_profiles: "identified_only"`, and provides `$posthog`. It returns early in dev (`import.meta.dev`), so you cannot verify analytics locally — each consuming app must supply the `NUXT_PUBLIC_POSTHOG_*` env vars in production.

## Pitfalls

- **[`modules/routing.ts`](./modules/routing.ts) registers `useDocusI18n` from `./app/composables/useDocusI18n` — a file that does not exist in this layer.** It works today only because `apps/docs` defines its own `useDocusI18n` composable, which satisfies the module's already-registered guard. Any other consumer relying on the layer's fallback gets a broken import at build time.
- Similarly, `config.ts`'s locale-file check resolves `i18n/locales/{code}.json` *inside this layer*, and `apps/shared/i18n/` does not exist — if a consumer ever enables `@nuxtjs/i18n`, every locale will be filtered out with `[Docus]` warnings until locale files are added here.
- A change here ships to both docs and dashboard — smoke-test both (`pnpm --filter @styleframe/docs dev`, `pnpm --filter @styleframe/app dev`) before merging.
