# Styleframe Recipe System

Recipes are component variant systems: a base style block plus named variant axes, default
selections, and compound variants for combinations. A recipe is authored once as a plain typed
object, compiled to static utility CSS at build time, and consumed in components through a tiny
runtime function that assembles class-name strings — no CSS-in-JS at runtime.

Source of truth (all claims below verified against these files):

- Factory + build-time processing: `engine/core/src/tokens/recipe.ts`
- Types: `engine/core/src/types/tokens.ts` (`Recipe`, `RecipeRuntime`, `VariantsBase`, …)
- Runtime class-name generation: `engine/runtime/src/runtime.ts` (`createRecipe`),
  `engine/runtime/src/types.ts` (`RecipeVariantProps`)
- Code generation: `engine/transpiler/src/consume/ts/recipe.ts`
- Theme recipe library: `theme/src/recipes/<name>/`, built with `createUseRecipe` from
  `theme/src/utils/createUseRecipe.ts`

---

## Recipe Anatomy

Created via the `recipe` function on a Styleframe instance (`s.recipe(...)`, or destructured:
`const { recipe } = styleframe()`).

```ts
recipe({
    name: 'button',           // Base class name + generated export name
    base: { ... },            // Always-applied utility declarations
    variants: { ... },        // Variant axes -> options -> declarations
    defaultVariants: { ... }, // Default option per axis
    compoundVariants: [ ... ] // Conditional combinations
});
```

The exact type (from `engine/core/src/types/tokens.ts`):

```ts
export type Recipe<
    Name extends string = string,
    Variants extends VariantsBase = VariantsBase,
> = {
    type: "recipe";
    name: Name;
    base?: VariantDeclarationsBlock;
    variants?: Variants;
    defaultVariants?: {
        [K in keyof Variants]?: keyof Variants[K] & string;
    };
    compoundVariants?: Array<{
        match: {
            [K in keyof Variants]?: keyof Variants[K] & string;
        };
        css?: VariantDeclarationsBlock;      // optional
        className?: string;                   // optional static class appended on match
    }>;
    _runtime?: RecipeRuntime<Variants>;       // internal: pre-resolved lookup keys
    _exportName?: string;                     // internal: overrides generated export name
};

// Supporting types
type VariantsBase = Record<string, Record<string, VariantDeclarationsBlock>>;
type VariantDeclarationsBlock = Record<string, TokenValue | ModifierDeclarationsBlock>;
type ModifierDeclarationsBlock = Record<string, TokenValue>;
```

Note the compound-variant shape: `{ match, css?, className? }`. Both `css` and `className`
are optional; `className` is appended to the output after all utility classes when the
`match` conditions are met.

---

## Declaration Values

Every key in a declarations block is a **utility name** (camelCase or kebab-case — both
resolve; see `getUtilityFactory`), and every value is a `TokenValue`:

| Config value | Meaning | Generated class |
|--------------|---------|-----------------|
| `ref(variable)` | Token reference | `_property:token-key` (namespace stripped, e.g. `_background:primary`) |
| `"@token.path"` | Token path reference | `_property:token-key` |
| `"@1.5"` | Multiplier (spacing-namespace utilities only) | `_property:1.5` → `calc(var(--spacing, 1rem) * 1.5)` |
| `"literal"` (no whitespace) | Arbitrary value | `_property:[literal]` |
| `"literal with spaces"` | Arbitrary value | `_property:<hash>` (whitespace values are hashed, not bracketed) |
| `true` | Boolean utility | `_property` (no value suffix) |

Two more formatting rules (from `defaultUtilitySelectorFn` in `engine/core/src/defaults.ts`):

- A resolved value key of `"default"` produces just `_property` (no `:default` suffix).
- Modifiers prefix the class: `_hover:background:primary`, `_dark:hover:color:white`.

### Multiplier values

Spacing-family utilities (`padding`, `margin`, `gap`, and their directional variants —
anything built with `createUseSpacingUtility`) accept `@`-prefixed numeric values:

```ts
recipe({
    name: 'card',
    base: {
        padding: '@1.5',   // calc(var(--spacing, 1rem) * 1.5)
        margin: '@2',
        gap: '@0.5',
    },
});
```

Supported: integers (`@2`), decimals (`@0.5`, `@2.25`), negatives (`@-1`, `@-0.5`). The base
`spacing` variable should exist (the generated `calc()` falls back to `1rem`).

### Modifier blocks (pseudo-states, dark mode, etc.)

A declarations block may nest **one level** of modifier blocks. Keys are modifier names,
optionally written CSS-style with a `&:`/`&::` prefix (stripped by `stripSelectorPrefix`),
and compounded with `:`:

```ts
base: {
    outline: 'none',
    '&:focus-visible': {            // same as 'focus-visible'
        outlineWidth: '2px',
        outlineColor: '@color.primary',
    },
    '&:disabled': {
        cursor: 'not-allowed',
        opacity: '0.75',
    },
    'hover:focus': {                // compound: applies under hover AND focus together
        boxShadow: '@box-shadow.sm',
    },
    '&:dark:hover': {               // dark theme + hover
        background: '@color.gray-800',
    },
},
```

Every modifier used must be **registered** on the instance (e.g. via `useModifiersPreset`
from `@styleframe/theme`), or the recipe factory throws:
`[styleframe] Modifier "<name>" not found in registry.`

### Utilities must be registered first

Every utility name used in `base`, `variants`, or `compoundVariants[].css` must be
registered before `recipe()` is called (e.g. via `useUtilitiesPreset`, or manual
`s.utility(...)` calls). Otherwise:
`[styleframe] Utility "<name>" not found in registry.`

---

## What `recipe()` Does at Build Time

From `createRecipeFunction` in `engine/core/src/tokens/recipe.ts`:

1. Creates the `Recipe` token object and pushes it onto `root.recipes`.
2. **Generates `_runtime`** (`generateRecipeRuntime`): every declaration value is resolved
   to its runtime key via the utility's `autogenerate` function (e.g. `ref(colorPrimary)` →
   `"primary"`, `"1rem"` → `"[1rem]"`). This pre-resolved object is what gets serialized
   into the generated TypeScript module.
3. **Creates utility instances** (`processRecipeUtilities`): for every declaration across
   base/variants/compound css, the corresponding utility CSS rule is created (with
   modifiers applied), so every class a recipe can emit exists in the CSS output. Used
   class names are tracked per recipe in `root._usage.recipeUtilities` for tree-shaking
   (`registerRecipeUtilities` promotes them into `_usage.utilities`).

---

## Runtime Behavior

The transpiler (`engine/transpiler/src/consume/ts/recipe.ts`) emits, per recipe:

```ts
const buttonRecipe = { /* serialized _runtime */ } as const satisfies RecipeRuntime;
export type ButtonProps = RecipeVariantProps<typeof buttonRecipe>;
export const button = createRecipe("button", buttonRecipe);   // + optional shortening map
```

`createRecipe(name, runtime, shortMap?)` from `@styleframe/runtime` returns
`(props?) => string`. Calling it:

1. Starts with the recipe name as the base class (`"button"`).
2. Applies all `base` declarations.
3. For each variant axis, resolves the selected option from `props`, falling back to
   `defaultVariants`. Boolean props are coerced with `String(...)`, so `disabled: true`
   selects the `"true"` option.
4. Checks each compound variant: if **all** `match` entries equal the resolved selections,
   its `css` declarations are applied and its `className` (if any) is collected. Multiple
   compound variants can match.
5. Declarations are keyed by `modifiers + utility name` in a map, so **later declarations
   override earlier ones per utility**: variants override base, compound variants override
   variants, later compound variants override earlier ones.
6. Output: `"<name> <utility classes...> <compound classNames...>"`.

```ts
button({});                              // defaults from defaultVariants
button({ color: 'primary', size: 'lg' });
button({ disabled: true });              // boolean accepted for "true"/"false" axes
// e.g. "button _border-width:thin _border-style:[solid] _background:primary ..."
```

`RecipeVariantProps<typeof runtime>` derives the props type: each axis becomes an optional
union of its option names; axes that have both `"true"` and `"false"` options additionally
accept `boolean`.

If class-name shortening/minification is enabled, the generated module embeds a
`ShorteningMap` (`p` = property names, `v` = values, `m` = modifiers) passed as the third
`createRecipe` argument.

---

## Using Recipes in Components

Recipes are consumed from the build plugin's virtual module (see `tooling/plugin`):

```ts
import { button, type ButtonProps } from 'virtual:styleframe';
import 'virtual:styleframe.css';

function Button({ color, size, disabled, children }) {
    return (
        <button className={button({ color, size, disabled })} disabled={disabled}>
            {children}
        </button>
    );
}
```

The plugin scans importers of `virtual:styleframe` to include only the recipes actually
used; a namespace or dynamic import of the virtual module forces all recipes to be
included.

---

## Complete Example

```ts
import { styleframe } from 'styleframe';
import {
    useDesignTokensPreset,
    useModifiersPreset,
    useUtilitiesPreset,
} from '@styleframe/theme';

const s = styleframe();

useDesignTokensPreset(s);   // variables (@color.*, @spacing.*, ...)
useUtilitiesPreset(s);      // registers the utilities used below
useModifiersPreset(s);      // registers hover/focus/disabled/dark/... modifiers

s.recipe({
    name: 'button',
    base: {
        borderWidth: '@border-width.thin',
        borderStyle: '@border-style.solid',
        borderColor: 'transparent',
        cursor: 'pointer',
        paddingTop: '@0.5',
        paddingBottom: '@0.5',
        paddingLeft: '@0.75',
        paddingRight: '@0.75',
        '&:disabled': { cursor: 'not-allowed', opacity: '0.75' },
    },
    variants: {
        color: {
            primary: { background: '@color.primary', color: '@color.white' },
            secondary: { background: '@color.secondary', color: '@color.white' },
        },
        size: {
            sm: { fontSize: '@font-size.sm' },
            md: { fontSize: '@font-size.md' },
        },
        block: {
            false: {},
            true: { width: '100%' },
        },
    },
    defaultVariants: { color: 'primary', size: 'md', block: false },
    compoundVariants: [
        {
            match: { color: 'primary', block: false },
            css: {
                '&:hover': { background: '@color.primary-tint-50' },
            },
        },
    ],
});

export default s;
```

---

## The Theme Recipe Library (`@styleframe/theme`)

Ready-made recipes live in **per-name directories**: `theme/src/recipes/<name>/`, each with
one file per recipe part plus an `index.ts` barrel, re-exported from
`theme/src/recipes/index.ts`. Tests are colocated as `<file>.test.ts` next to each source
file (not in a separate `test/` folder).

38 recipe directories:

```
accordion   avatar        badge           breadcrumb   button       calendar
callout     card          chat-message    checkbox     chip         color-picker
context-menu drawer       dropdown        field-group  hamburger-menu input
media       modal         nav             otp          page-hero    pagination
placeholder popover       progress        radio        select       sidebar
skeleton    slider        spinner         switch       tabs         textarea
toggle      tooltip
```

Multi-part components export one composable per part, named `use<Name><Part>Recipe`:
e.g. `card/` exports `useCardRecipe`, `useCardHeaderRecipe`, `useCardBodyRecipe`,
`useCardFooterRecipe`; `spinner/` exports `useSpinnerRecipe`, `useSpinnerCircleRecipe`,
`useSpinnerOverlayRecipe`, `useSpinnerTextRecipe`. (`recipes/input/createFieldRecipe.ts`
also exports a `useFieldSelector` helper shared by the form-field recipes.)

### `createUseRecipe(name, defaults, setup?)`

All theme recipes are built with `createUseRecipe` (`theme/src/utils/createUseRecipe.ts`):

```ts
export const useButtonRecipe = createUseRecipe("button", {
    base: { ... },
    variants: { color: {...}, variant: {...}, size: {...} },
    compoundVariants: [ ... ],
    defaultVariants: { color: "neutral", variant: "solid", size: "md" },
});
```

It returns a composable with the signature:

```ts
useButtonRecipe(
    s: Styleframe,
    options?: DeepPartial<RecipeConfig<Variants>> & { filter?: FilterConfig<Variants> },
): Recipe
```

Behavior (verified against source):

- **`setup` callback** — the optional third `createUseRecipe` argument runs first with the
  Styleframe instance; used for prerequisites such as `s.keyframes(...)` (see the
  `skeleton`, `spinner`, and `progress` recipes).
- **Deep merge** — `options` (minus `filter`) is deep-merged over the recipe defaults with
  `defu`, so callers can override individual declarations.
- **`filter`** — `{ axis: [allowedOptions] }` prunes variant options, drops compound
  variants whose `match` references an excluded option, and removes `defaultVariants`
  entries that are no longer valid. The returned `Recipe` type reflects the filtered axes.
- Finally calls `s.recipe({ name, ...merged })`.

### Theme recipe conventions

- Variant axes are commonly `color` / `variant` / `size`; color styling is often expressed
  entirely through `compoundVariants` generated with `colors.map(...)` while the color
  options themselves stay empty (`primary: {}`). Example: `useButtonRecipe` with colors
  `primary | secondary | success | info | warning | error | light | dark | neutral` and
  variants `solid | outline | soft | subtle | ghost | link`.
- Dark-mode styling uses `&:dark` / `&:dark:hover` modifier blocks inside compound css.
- Recipes reference tokens by `@` path (`@color.primary-tint-50`, `@font-size.sm`,
  `@border-radius.md`) and spacing by multiplier (`@0.5`).

---

## Best Practices

1. Register design tokens, utilities, and modifiers **before** defining recipes.
2. Use semantic variant names (not appearance-based).
3. Provide `defaultVariants` for every axis.
4. Model boolean axes as `{ false: {}, true: {...} }` — callers then get `boolean` props.
5. Prefer compound variants for color × variant matrices; keep `match` to 2–3 conditions.
6. Remember override order: base → variants → compound variants (in array order).

---

## Recipe vs Utilities

| Feature | Utilities | Recipes |
|---------|-----------|---------|
| Output | Single CSS class | Recipe class + combined utility classes |
| Usage | Direct class application | Function call with variant props |
| Variants | None built-in | Full variant system |
| Runtime | None | `createRecipe` from `@styleframe/runtime` (string concatenation only) |

Use **recipes** for component-level styling with variant selection; use **utilities** for
one-off styling or for building custom abstractions.
