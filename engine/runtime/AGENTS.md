# @styleframe/runtime

Lightweight runtime for executing pre-computed Styleframe recipes. Generates utility class name strings from `RecipeRuntime` objects based on variant props.

## What This Package Does

This package provides a single core function — `createRecipe` — that takes a recipe name and a pre-computed `RecipeRuntime` object, and returns a function. That function accepts variant props and produces a space-separated CSS utility class string.

The runtime is designed to be small (~1.4KB ES module) and dependency-free (peer depends on `@styleframe/core` for types only). It runs in the browser or server, converting resolved design token values into deterministic class name strings.

## Package Structure

```
src/
├── index.ts          # Re-exports from runtime.ts and types.ts
├── runtime.ts        # Core createRecipe function and helpers
├── types.ts          # TypeScript type definitions
└── runtime.test.ts   # Test suite (vitest)
```

## Public API

### `createRecipe(name, runtime)`

Creates a recipe function that generates class name strings from variant props.

```ts
import { createRecipe } from '@styleframe/runtime';

const button = createRecipe('button', {
    base: {
        borderWidth: 'thin',
        cursor: 'pointer',
    },
    variants: {
        color: {
            primary: { background: 'primary', color: 'white' },
            secondary: { background: 'secondary', color: 'white' },
        },
        size: {
            sm: { padding: '1' },
            md: { padding: '2' },
        },
    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
    },
} as const satisfies RecipeRuntime);

button({});
// => "button _border-width:thin _cursor:pointer _background:primary _color:white _padding:2"

button({ color: 'secondary', size: 'sm' });
// => "button _border-width:thin _cursor:pointer _background:secondary _color:white _padding:1"
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Recipe name, used as the first class in the output |
| `runtime` | `RecipeRuntime` | Pre-computed recipe object with resolved token values |

**Returns:** `(props?: RecipeVariantProps<R>) => string` — A function that accepts optional variant props and returns a space-separated class name string.

### Exported Types

| Type | Description |
|------|-------------|
| `RecipeVariantProps<R>` | Extracts variant prop types from a `RecipeRuntime`. Each variant key maps to a union of its option names. |
| `RecipeRuntime` | Pre-computed recipe structure (re-exported from `@styleframe/core`) |
| `RuntimeVariantDeclarationsBlock` | Object mapping utility names to resolved values |
| `RuntimeModifierDeclarationsBlock` | Object mapping utility names to values within a modifier context |
| `RuntimeVariantDeclarationsValue` | Union of primitive values or modifier blocks |
| `PrimitiveTokenValue` | `string \| number \| boolean \| null \| undefined` |
| `TokenValue` | Token value type (re-exported from `@styleframe/core`) |
| `RuntimeVariantOptions` | `Record<string, RuntimeVariantDeclarationsBlock \| undefined>` |

## Class Name Format

The runtime generates class names following this pattern:

| Pattern | Example | When Used |
|---------|---------|-----------|
| `_utility:value` | `_padding:2` | Standard utility |
| `_utility` | `_display` | Boolean `true` value (no value suffix) |
| `_modifier:utility:value` | `_hover:background:darkblue` | Single modifier |
| `_mod1:mod2:utility:value` | `_hover:focus:box-shadow:lg` | Compound modifier |

- CamelCase property names are converted to kebab-case: `borderWidth` → `_border-width:thin`
- Boolean `true` omits the value: `{ display: true }` → `_display`

## Declaration Priority

Declarations are applied in this order. Later declarations override earlier ones for the same utility:

1. **Base** — Always applied first
2. **Variants** — Applied based on props (falls back to `defaultVariants`)
3. **Compound Variants** — Applied when all `match` conditions are satisfied

```ts
const runtime = {
    base: { padding: 'default' },
    variants: {
        size: { sm: { padding: 'variant' } },
    },
    compoundVariants: [
        { match: { size: 'sm' }, css: { padding: 'compound' } },
    ],
} as const satisfies RecipeRuntime;

const recipe = createRecipe('el', runtime);
recipe({ size: 'sm' });
// => "el _padding:compound"
// compound overrides variant, which overrides base
```

## Modifier Blocks

Modifier blocks represent pseudo-selector styles (`:hover`, `:focus`, etc.). They are objects nested one level deep inside declarations.

```ts
const runtime = {
    base: {
        background: 'blue',
        // Single modifier
        hover: {
            background: 'darkblue',
        },
        // Multiple modifiers in same block
        focus: {
            outline: 'ring',
        },
        // Compound modifier (colon-separated key)
        'hover:focus': {
            boxShadow: 'lg',
        },
    },
} as const satisfies RecipeRuntime;

const button = createRecipe('button', runtime);
button({});
// => "button _background:blue _hover:background:darkblue _focus:outline:ring _hover:focus:box-shadow:lg"
```

Modifier blocks work in `base`, `variants`, and `compoundVariants.css`. Override rules apply within the same modifier scope — a variant's `hover.background` overrides the base `hover.background`.

## Compound Variants

Compound variants apply additional declarations when multiple variant conditions match simultaneously.

```ts
compoundVariants: [
    {
        match: { color: 'primary', disabled: 'false' },
        css: {
            hover: {
                background: 'primary-shade-50',
            },
        },
    },
],
```

- All keys in `match` must match the current props (or `defaultVariants` fallback)
- Multiple compound variants can match and apply in order
- Compound variant `css` supports modifier blocks

## Edge Cases

- **Empty runtime:** `createRecipe('name', {})` returns a function that always returns just `"name"`
- **No base:** Variants and compound variants still work without a `base` property
- **Undefined variant option:** If a variant option maps to `undefined`, it is skipped and base declarations are preserved
- **No defaultVariants:** Variant declarations are only applied if the prop is explicitly passed
- **Props override defaults:** Passing a prop always overrides `defaultVariants` for that key

## Best Practices

- Always use `as const satisfies RecipeRuntime` when defining runtime objects for full type inference
- Use `RecipeVariantProps<typeof runtime>` to extract the props type for component interfaces
- The runtime object should contain pre-resolved token values (not raw CSS values) — resolution happens at build time in `@styleframe/core`
- Keep runtime objects serializable — they are designed to be generated at build time and consumed at runtime
- The recipe name (first argument) should match the recipe name used at build time for CSS class matching

## Development

```bash
pnpm test        # Run tests
pnpm test:dev    # Run tests in watch mode
pnpm build       # Type-check and build
pnpm typecheck   # Type-check only
```

Peer dependency: `@styleframe/core@^3.0.0`
