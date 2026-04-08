# Theme Package Rules

**Scope:** `theme/**/*`

## Composable Conventions

- All composables must accept `Styleframe` instance as first parameter
- All variables in composables must use `{ default: true }` option
- Return destructured objects with typed token exports
- Naming: `use<Context>Variables`, `use<Context>Utilities`, `use<Context>Recipe`

## Design Tokens

- Use semantic names, not appearance-based: `color.primary` not `color.blue`
- Reference tokens with `ref()` or `@` prefix: `ref(colorPrimary)` or `"@color.primary"`
- Scale-based spacing: use `useScalePowersDesignTokens` for consistent spacing
- All token values should be customizable via composable parameters

## Recipes

- Recipe implementations: `theme/src/recipes/` (e.g., `theme/src/recipes/button.ts`, `theme/src/recipes/badge.ts`)
- Recipe entry point: `theme/src/recipes/index.ts`
- Always include base styles, variants, and defaultVariants
- Use compound variants for complex interactions
- Test recipes: `theme/test/recipes/`
- Document recipes: `apps/docs/content/docs/recipes/`
- Showcase in Storybook: `apps/storybook/src/stories/recipes/` (e.g., `apps/storybook/src/stories/recipes/Button.stories.ts`)

## Testing

- Test composables return correct token structure
- Verify CSS output matches expectations
- Test token references resolve correctly
