# Apps Rules

**Scope:** `apps/**/*`

- `apps/app`, `apps/playground`, and `apps/storybook` dogfood Styleframe — author tokens
  and recipes in `*.styleframe.ts` files, no stray CSS or utility frameworks. `apps/docs`
  is the exception: it is styled with Nuxt UI + Tailwind.
- Changesets: the apps are in the changesets `ignore` list — no changeset for app-only
  changes. `apps/shared` (the Nuxt layer) IS versioned — changes to it need one.
- New user-facing features ship with docs: add or update the relevant page under
  `apps/docs/content/docs/`, and update the Storybook showcase when a recipe changes.
- Code examples in docs must be runnable against the current API — when an engine or theme
  API changes, grep the docs content for the old form.

Layout, stack, and commands per app: see `apps/docs/AGENTS.md`, `apps/storybook/AGENTS.md`,
`apps/app/AGENTS.md`, `apps/shared/AGENTS.md`, `apps/playground/AGENTS.md`.
