---
name: dogfood-and-report
description: Famille's product manual — architecture of apps/app (Supabase auth + license portal), apps/playground, and apps/shared; the friction-report template; the dogfood migration epic; and how to consume Styleframe from application code. Consult before every apps/app, apps/playground, or apps/shared task.
---

# Dogfood and report

The products prove the system. This seat ships product features *and* converts every rough edge into a filed, routable friction report — the team's highest-value feedback channel.

## The estate

**`apps/app`** — the Pro customer dashboard (app.styleframe.dev), Nuxt 3 + Supabase, v0.1.x:
- Working today: email + GitHub OAuth login, signup with email confirm, forgot/reset password, logout, license activation (`LicenseActivationCard.vue` → license key + GitHub username → Supabase Edge Function), debug page.
- Not built yet: billing, team/seat management, account settings — the actual dashboard. This is front 3 (Commercial Pro) territory; expect epics here.
- **Known debt:** it is styled with Nuxt UI + Tailwind 4, violating the repo rule that all apps use Styleframe. The migration to Styleframe is a standing epic — dogfood chip by chip (auth pages first), one PR per page/flow, filing friction reports as you go. That friction is the epic's real product.
- Commercial software rules: auth and license flows fail **closed**; test unhappy paths (wrong key, expired session, revoked OAuth, double activation) and say which you tested.

**`apps/playground`** — in-browser Styleframe editor (Vite + Vue + CodeMirror): `src/editor`, `src/pipeline` (runs the transpile), `src/samples` (multi-file TSX design-system blocks), `src/recipes`, `src/state`, `src/components`. It is marketing and documentation at once: keep it fast, keep samples real (design-system blocks, not toys). Remember: playground code is inside the codecov patch gate — ship tests with logic.

**`apps/shared`** — Nuxt layer consumed by docs and app: i18n plugin, PostHog analytics, config/routing modules, shared components (e.g. `MorphingGradientBackground.vue`), git/meta utils. Changes here fan out to two apps — check both before claiming done.

## Consuming Styleframe from app code (the part you dogfood)

```ts
// some-feature.styleframe.ts — extension file: gets the global instance
import { styleframe } from 'virtual:styleframe';
const s = styleframe();
// … tokens, selectors, recipes …
export default s;

// component code — gets compiled recipes/selectors
import { button } from 'virtual:styleframe';
import 'virtual:styleframe.css';
const classes = button({ color: 'primary', size: 'md' });
```

- Utility classes in templates: `_property:value` (`_margin:md`), modifiers chain left (`_dark:hover:background:primary`), arbitrary values bracketed (`_max-width:[320px]`), never inline `style=""`.
- Themes switch via `data-theme` attributes.
- The `virtual:styleframe` import has two faces: global instance **only** inside `*.styleframe.ts` files; compiled recipes/selectors everywhere else. Mixing them up produces the classic "instance is not a function" confusion.

## The friction report

File the moment Styleframe cannot express what you need, makes it awkward, or surprises you — *before* any workaround. Template:

```
## Friction: <one line>
**What I tried:** the code I wanted to write (paste it, even though it doesn't work)
**What I expected:** the behavior/API I assumed existed
**What happened:** error/wrong output/missing capability (paste evidence)
**Severity:** blocker / papercut / polish
**Workaround used:** none | <description> (workarounds require a filed report first)
**Suggested owner:** Mère (theme ergonomics) / Roux (engine) / Tournant (plugin,
  virtual modules, HMR) / Larousse (docs made me expect the wrong thing)
```

@-mention @mise on every report for routing — and make that the *only* @ in the report. A suggested owner stays a plain name: an @handle would wake that seat immediately, before triage has routed anything. Judge severity from the customer's chair: "a customer pasting an expired license key sees a raw 500" is a blocker even when the code path is rare. Measure yourself by reports filed as much as by pages shipped — a workaround without a report is the one real failure mode of this seat.
