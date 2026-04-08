# Applications Rules

**Scope:** `apps/**/*`

## Documentation Site (`apps/docs/`)

- Content: `apps/docs/content/docs/` (Markdown files)
- Pages: `apps/docs/pages/` (Vue components)
- Components: `apps/docs/components/` (Nuxt components)
- Config: `apps/docs/nuxt.config.ts`
- Use Nuxt Content with Markdown
- Code examples must be runnable and tested
- Public assets: `apps/docs/public/`
- See `apps/docs/content/docs/AGENTS.md`

## Storybook (`apps/storybook/`)

- Stories in `apps/storybook/src/stories/`
- Each recipe needs a corresponding story
- Use Storybook 10 + Vue 3
- Stories should showcase all variants
- See `apps/storybook/AGENTS.md`

## Customer Dashboard (`apps/app/`)

- Nuxt 3 + Supabase
- Use Styleframe for all styling (dogfooding)
- See `apps/app/AGENTS.md`

## Shared Layer (`apps/shared/`)

- Shared Nuxt layer for doc apps
- Reusable components and composables
- See `apps/shared/AGENTS.md`

## General Rules

- All apps must use Styleframe for styling
- Document new features in docs site when adding them
- Update Storybook stories when updating recipes
