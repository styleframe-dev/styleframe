# @styleframe/app

The Styleframe Pro customer dashboard — a Nuxt 3 application for user authentication, license activation, and account management. This is the authenticated user-facing app at `app.styleframe.dev`.

## Package Info

- **Name:** `@styleframe/app`
- **Framework:** Nuxt 3
- **Extends:** `../shared` (shared Nuxt layer with common UI, plugins, and config)
- **Dev server:** `http://localhost:4000` (`pnpm dev`)
- **Auth provider:** Supabase (via `@nuxtjs/supabase`)
- **UI framework:** Nuxt UI (`@nuxt/ui`)
- **Analytics:** PostHog (`posthog-js`)
- **CSS:** Tailwind CSS 4 (via shared layer)

---

## Source Structure

```
apps/app/
├── app/
│   ├── app.vue               # Root component (locale, SEO, layout shell)
│   ├── error.vue              # Global error page
│   ├── shims.d.ts             # Type shims
│   ├── schema.d.ts            # Auto-generated schema types
│   ├── api/
│   │   ├── license.ts         # License activation API client
│   │   └── debug-config.ts    # Server route: exposes public runtime config
│   ├── components/
│   │   ├── app/               # App shell components (header, footer)
│   │   ├── IconMenuToggle.vue # Animated hamburger menu toggle
│   │   ├── LanguageSelect.vue # i18n locale switcher
│   │   └── LicenseActivationCard.vue # License key + GitHub username form
│   ├── composables/
│   │   └── useAppI18n.ts      # i18n wrapper (graceful fallback when disabled)
│   ├── layouts/
│   │   ├── default.vue        # Dashboard layout (sidebar navigation)
│   │   └── auth.vue           # Auth layout (centered card with gradient bg)
│   ├── pages/
│   │   ├── index.vue          # Dashboard home (license activation)
│   │   ├── login.vue          # Email/password + GitHub OAuth login
│   │   ├── signup.vue         # Registration with email confirmation
│   │   ├── logout.vue         # Sign-out handler
│   │   ├── confirm.vue        # OAuth callback handler
│   │   ├── forgot-password.vue# Password reset request
│   │   ├── reset-password.vue # Set new password (from email link)
│   │   └── debug.vue          # Runtime config debug page
│   └── types/
│       ├── index.ts           # Re-exports database types
│       └── database.types.ts  # Auto-generated Supabase types
├── i18n/
│   └── locales/               # Translation JSON files (30+ languages)
├── public/                    # Static assets (favicons, logos, manifest)
├── nuxt.config.ts             # App-specific Nuxt configuration
├── nuxt.schema.ts             # App config schema (UI, SEO, header, GitHub, TOC)
└── package.json
```

---

## Authentication Flow

Supabase handles all authentication. The `@nuxtjs/supabase` module auto-redirects unauthenticated users to `/login`.

**Public pages** (excluded from auth redirect):
- `/login`, `/signup`, `/confirm`, `/debug`, `/forgot-password`, `/reset-password`

**Auth methods:**
- Email/password sign-in and sign-up
- GitHub OAuth (implicit flow with `detectSessionInUrl`)

**OAuth callback flow:**
1. User clicks "Log in with GitHub"
2. Supabase redirects to GitHub
3. GitHub redirects back to `/confirm`
4. `confirm.vue` watches for `useSupabaseUser()` and navigates to `/`
5. On error, displays the error from query parameters

**Password reset flow:**
1. User submits email on `/forgot-password`
2. Supabase sends reset link pointing to `/reset-password`
3. User sets new password on `/reset-password`

---

## License Activation

The core feature of this app. Users activate Styleframe Pro licenses via a Supabase Edge Function.

**API:** `app/api/license.ts`

```ts
activateLicense(supabase: SupabaseClient, { label: string, key: string }): Promise<ActivateLicenseResponse>
```

- `label` — GitHub username
- `key` — License key
- Calls `supabase.functions.invoke('activate-license', { body })`
- Returns `{ success, message?, error? }`

**UI:** `LicenseActivationCard.vue` displays the form and a success state with an "Activate Another License" option.

---

## Layouts

### `default` — Dashboard layout
Sidebar navigation with:
- "Activate License" (active item)
- "Customer Portal" (external link to Polar)
- "Log Out"

Uses `UPage`, `UPageAside`, `UNavigationMenu` from Nuxt UI.

### `auth` — Authentication layout
Centered card with `MorphingGradientBackground` (from shared layer). Used by login, signup, confirm, logout, forgot-password, reset-password, and debug pages.

---

## Internationalization

`useAppI18n()` composable wraps `@nuxtjs/i18n` with a graceful fallback when i18n is disabled:
- Returns static `"en"` locale and manual `t()` function that traverses the English JSON
- When enabled, delegates to `useI18n()`, `useLocalePath()`, `useSwitchLocalePath()`

The app root (`app.vue`) and error page (`error.vue`) set `lang` and `dir` HTML attributes based on Nuxt UI locale data.

---

## Environment Variables

```env
NUXT_PUBLIC_BASE_URL=http://localhost:4000  # Required for OAuth redirects
SUPABASE_URL=                                # Supabase project URL
SUPABASE_KEY=                                # Supabase anon key
NUXT_PUBLIC_POSTHOG_KEY=                     # PostHog project API key
NUXT_PUBLIC_POSTHOG_HOST=                    # PostHog ingest endpoint
NUXT_PUBLIC_POSTHOG_DEFAULTS=                # PostHog defaults date
```

`NUXT_PUBLIC_BASE_URL` is critical — OAuth redirects fail without it in production.

---

## App Config Schema

Defined in `nuxt.schema.ts` using `@nuxt/content/preview` fields. Configurable sections:

| Section | Keys |
|---------|------|
| `ui.colors` | `primary`, `neutral` |
| `ui.icons` | `search`, `dark`, `light`, `external`, `chevron`, `hash` |
| `seo` | `title`, `description` |
| `header` | `title`, `logo.light`, `logo.dark`, `logo.alt` |
| `socials` | Object of social links |
| `toc` | `title`, `bottom.title`, `bottom.links` |
| `github` | `url`, `branch`, `rootDir` |

---

## Route Rules

| Path | Redirect |
|------|----------|
| `/privacy` | `https://www.styleframe.dev/privacy` |
| `/terms` | `https://www.styleframe.dev/terms` |
| `/license` | `https://www.styleframe.dev/license` |

---

## Shared Layer

The app extends `../shared` which provides:
- **Modules:** `@nuxt/ui`, `@nuxt/image`, `@nuxt/scripts`, `@nuxtjs/robots`, `nuxt-og-image`, `nuxt-llms`
- **Plugins:** `i18n.ts`, `posthog.client.ts`
- **Components:** `MorphingGradientBackground.vue`
- **Utilities:** `meta.ts`, `git.ts`
- **CSS:** `main.css` (Tailwind CSS 4)

---

## Best Practices

1. **Use Nuxt UI components** — `UPageCard`, `UAuthForm`, `UButton`, `UHeader`, `UMain`, `UPage`, `UNavigationMenu`, etc.
2. **Use `useSupabaseClient()` and `useSupabaseUser()`** for all auth operations.
3. **Use `useSeoMeta()`** on every page for SEO metadata.
4. **Use `definePageMeta({ layout: 'auth' })`** for authentication pages.
5. **Use `useToast()`** for user-facing success/error notifications.
6. **Use `useAppI18n()`** instead of raw `useI18n()` — handles the disabled state gracefully.
7. **Use `useAppConfig()`** for accessing UI configuration (header, colors, icons).
8. **Use Tailwind CSS utility classes** for styling — no custom CSS files per component.
9. **Use `watchEffect` or `watch`** to redirect authenticated users away from auth pages.
10. **Handle all Supabase errors** with toast notifications — never silently fail.

## Anti-Patterns

- Importing Supabase client directly instead of using `useSupabaseClient()`.
- Hardcoding redirect URLs instead of using `runtimeConfig.public.baseUrl`.
- Using raw `useI18n()` instead of `useAppI18n()`.
- Creating custom auth logic instead of leveraging `@nuxtjs/supabase` redirect options.
- Adding pages without `useSeoMeta()`.
- Using `alert()` for error messages instead of `useToast()`.
