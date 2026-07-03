# Styleframe API Reference

Canonical, source-verified reference for the authoring API. Everything below is exported
from the `styleframe` barrel (which re-exports `@styleframe/core` in full). Source of
truth: `engine/core/src/`.

```ts
import { styleframe, merge, isVariable, isRecipe /* ... */ } from 'styleframe';
```

All token creation functions (`variable`, `selector`, `utility`, `modifier`, `recipe`,
`theme`, `atRule`, `keyframes`, `media`, `ref`, `css`) are **methods on the instance**
returned by `styleframe()` — destructure them from it. Standalone `create*Function`
factories also exist (see "Advanced exports") but are for tooling, not authoring.

---

## Core Instance

### styleframe(options?)

Creates a new Styleframe instance. Source: `engine/core/src/styleframe.ts`.

```ts
import { styleframe } from 'styleframe';

const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe, theme, atRule, keyframes, media, css } = s;

export default s; // config files MUST default-export the instance
```

**Options** (`StyleframeOptions`, all optional):

```ts
const s = styleframe({
    indent: '    ',                                       // output indentation
    variables: {
        name: ({ name }) => `sf-${name}`,                 // VariableNameFn — CSS var naming
    },
    utilities: {
        selector: ({ name, value, modifiers }) =>         // UtilitySelectorFn — class naming
            `_${[...modifiers, name, value].join(':')}`,
    },
    themes: {
        selector: ({ name }) => `[data-theme="${name}"]`, // ThemeSelectorFn
    },
});
```

**Defaults** (from `engine/core/src/defaults.ts` + `engine/transpiler/src/defaults.ts`):

- Variable name: dots become double dashes — `color.primary` → `--color--primary`
- Utility selector: `_${[...modifiers, name, value].join(':')}` with `value === 'default'`
  omitted — e.g. `_padding:md`, `_hover:background:primary`, `_margin` (default value)
- Theme selector: `.${name}-theme, [data-theme="${name}"]`

**Returns** `Styleframe`: `{ id, root, options }` plus all eleven token functions above.
`root` is the mutable token tree (`Root`): `{ declarations, variables, children, utilities, modifiers, recipes, themes, _registry, _usage }`.

---

## Variables

### variable(nameOrInstance, value, options?)

Creates (or updates) a CSS custom property. Source: `engine/core/src/tokens/variable.ts`.

```ts
variable<Name extends string>(
    nameOrInstance: Name | Variable<Name>,
    value: TokenValue,
    options?: { default: boolean },   // default: { default: false }
): Variable<Name>
```

Behavior when a variable with the same name already exists in the parent container:

- `{ default: true }` → returns the **existing** variable untouched (set-if-undefined)
- `{ default: false }` (the default) → **updates** the existing variable's value

```ts
const colorPrimary = variable('color.primary', '#006cff');

// Set-if-undefined — REQUIRED inside reusable composables
const spacing = variable('spacing', '1rem', { default: true });

// Reference another variable
const colorAccent = variable('color.accent', ref(colorPrimary));

// @-prefixed strings resolve to references (validated — throws if undefined)
const colorLink = variable('color.link', '@color.primary');

// Passing a Variable instance overrides its value (theming/overrides)
variable(colorPrimary, '#8b5cf6');
```

CSS output: `--color--primary: #006cff;` under `:root` (dot → `--`, then sanitized).

### ref(variable, fallback?)

References a CSS variable. Source: `engine/core/src/tokens/ref.ts`.

```ts
ref<Name extends string>(variable: Variable<Name> | Name, fallback?: string): Reference<Name>
```

```ts
backgroundColor: ref(colorPrimary)          // from a Variable token
color: ref('color.text', '#333')            // by name, with fallback
padding: ref('spacing', '@spacing.md')      // @-prefixed fallback resolves to a nested ref
```

- Throws immediately if `variable` is `null`/`undefined` (catches broken destructuring).
- Records the name in `root._usage.variables` (drives CSS tree-shaking).
- String names are **not** validated at `ref()` time (unlike `"@name"` value strings).

### "@" reference strings

Any `TokenValue` string position resolves `@` prefixes
(`engine/core/src/tokens/resolve.ts`):

```ts
selector('.button', {
    background: '@color.primary',              // exact → Reference (validated, throws if undefined)
    border: '1px solid @color.primary',        // embedded → CSS token with mixed parts
});
```

Validation walks the scope chain (selector → parents → root), so theme-scoped variables
resolve correctly.

---

## Selectors

### selector(query, declarationsOrCallback)

Creates a CSS rule. Source: `engine/core/src/tokens/selector.ts`. **Two parameters** —
there is no separate third callback parameter.

```ts
selector(
    query: string,
    declarationsOrCallback: DeclarationsBlock | ContainerInput | DeclarationsCallback,
): Selector
```

```ts
// Declarations object
selector('.button', {
    padding: '1rem',
    backgroundColor: ref(colorPrimary),
});

// Nesting inside declarations
selector('.card', {
    padding: '1rem',
    '&:hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    '&::before': { content: '""' },
    '.card-title': { fontSize: '1.5rem' },
    '& > .card-header': { marginBottom: '1rem' },
    '&[aria-expanded="true"]': { background: '#eee' },
    '@media (min-width: 768px)': { padding: '2rem' },
});

// Callback form — full declarations context; return value becomes own declarations
selector('.container', ({ selector, media, variable, ref }) => {
    selector('.inner', { padding: '1rem' });
    media('(min-width: 768px)', { maxWidth: '750px' });
    return { display: 'flex' };
});
```

**Nesting rules** (`parseDeclarationsBlock`, `engine/core/src/tokens/declarations.ts`):
a key is treated as a nested selector only if it starts with `.`, `&`, or `:` (or is a
keyframe stop: `from`, `to`, `NN%`). Keys starting with `@` become nested at-rules.
Combinator selectors **must** be written with `&`: use `'& > li'`, `'& + .card'`,
`'& a:not(.active)'` — bare `'> li'` is NOT recognized and would be emitted as a
(bogus) property.

The callback context is `DeclarationsCallbackContext`:
`{ variable, selector, atRule, keyframes, media, ref, css }` — the same context appears
in `theme()`, `atRule()`, `media()` callbacks and (plus `value`) in utility factories.

---

## Utilities

### utility(name, factory, options?)

Registers a utility class generator. Source: `engine/core/src/tokens/utility.ts`.

```ts
utility<Name extends string>(
    name: Name,
    factory: UtilityCallbackFn,        // ({ value, ...declarationsContext }) => DeclarationsBlock
    options?: {
        autogenerate?: UtilityAutogenerateFn;   // (value) => Record<key, TokenValue>, for array syntax
        namespace?: string | string[];          // "@sm" in arrays resolves to ref("<ns>.sm")
    },
): UtilityCreatorFn
```

Registering the same name twice returns the **existing** creator (no duplicate).

**Returns** the creator: `(values, modifiers?) => void` where
`values: Record<string, TokenValue> | TokenValue[]` and
`modifiers?: (ModifierFactory | ModifierFactory[])[]`.

```ts
const createPadding = utility('padding', ({ value }) => ({ padding: value }));

// Object syntax — explicit class keys
createPadding({
    sm: ref(spacingSm),        // ._padding:sm
    md: '@spacing.md',         // ._padding:md   (token reference)
    default: ref(spacing),     // ._padding      ("default" key drops the value suffix)
});

// Array syntax — keys autogenerated per value:
//   '@spacing.md'  → key 'spacing.md' (or 'md' with namespace: 'spacing')
//   '1rem'         → key '[1rem]'      (arbitrary value)
//   '1px solid'    → hashed key        (whitespace values are hashed)
createPadding([ref(spacingSm), '@spacing.md', '1rem']);

// Namespaced utility — array items resolve against the namespace
const createMargin = utility('margin', ({ value }) => ({ margin: value }), {
    namespace: 'spacing',
});
createMargin(['@sm', '@md']);   // ._margin:sm → var(--spacing--sm), etc.

// Modifiers: flat entries are independent variants; nested arrays are compound
createPadding({ sm: ref(spacingSm) }, [hover, focus]);      // _hover:padding:sm, _focus:padding:sm
createPadding({ sm: ref(spacingSm) }, [[hover, focus]]);    // _hover:focus:padding:sm
```

**IMPORTANT:** defining a utility produces no CSS until the creator is invoked with
values. In object syntax, a string value `"@key"` pointing at a **sibling key** of the
same call resolves to that entry's value (`{ default: '@solid', solid: 'solid' }`).

### modifier(key, factory)

Registers a reusable utility modifier. Source: `engine/core/src/tokens/modifier.ts`.

```ts
modifier<Key extends string>(
    key: Key | Key[],
    factory: ModifierCallbackFn,
): ModifierFactory
```

The factory receives the full declarations context **plus** the wrapped variant's
`{ declarations, variables, children }` — there is **no `key` argument**. Forward all
three through the new wrapper key so nested content survives:

```ts
const hover = modifier('hover', ({ declarations, variables, children }) => ({
    '&:hover': { declarations, variables, children },
}));

const dark = modifier('dark', ({ declarations, variables, children }) => ({
    ':is(.dark-theme, [data-theme="dark"]) &': { declarations, variables, children },
}));

const motionReduce = modifier('motion-reduce', ({ declarations, variables, children }) => ({
    '@media (prefers-reduced-motion: reduce)': { declarations, variables, children },
}));
```

An array `key` registers the same factory under several names (aliases): each key
produces its own class variant with identical output. Since the factory never learns
which key matched, per-key behavior (e.g. per-breakpoint media queries) requires one
`modifier()` call per breakpoint.

When multiple modifiers are applied as a compound, they compose inside-out: the **last**
modifier in the compound array is innermost.

---

## Recipes

### recipe(options)

Defines a component variant system built on registered utilities.
Source: `engine/core/src/tokens/recipe.ts`.

```ts
recipe<Name extends string, Variants extends VariantsBase>(options: {
    name: Name;
    base?: VariantDeclarationsBlock;
    variants?: Variants;
    defaultVariants?: { [K in keyof Variants]?: keyof Variants[K] & string };
    compoundVariants?: Array<{
        match: { [K in keyof Variants]?: keyof Variants[K] & string };
        css?: VariantDeclarationsBlock;
        className?: string;
    }>;
}): Recipe<Name, Variants>
```

Every property key in `base` / variant blocks / `compoundVariants[].css` is a
**utility name** (camelCase is matched against kebab-case registrations), and every
value is a utility value (token `ref()`, `"@token.path"`, or arbitrary string). Nested
object keys are **modifier names** (`hover`, `'hover:focus'`; `'&:hover'` is normalized
to `hover`). The recipe **throws at definition time** if a referenced utility or
modifier is not registered — register utilities (e.g. `useUtilitiesPreset`) and
modifiers (e.g. `useModifiersPreset`) first.

```ts
recipe({
    name: 'button',
    base: {
        borderWidth: ref(borderWidthThin),      // → _border-width:thin
        cursor: 'pointer',                      // → _cursor:[pointer]
        'hover:focus': {
            boxShadow: '@box-shadow.sm',        // → _hover:focus:box-shadow:sm
        },
    },
    variants: {
        color: {
            primary: { background: ref(colorPrimary), color: '@color.white' },
            secondary: { background: '@color.secondary', color: '@color.white' },
        },
        size: {
            sm: { padding: '@spacing.sm' },
            md: { padding: '1rem' },            // arbitrary → _padding:[1rem]
        },
        disabled: {
            false: {},
            true: { opacity: '@opacity.50', cursor: 'not-allowed' },
        },
    },
    defaultVariants: { color: 'primary', size: 'md' },
    compoundVariants: [
        {
            match: { color: 'primary', disabled: 'false' },
            css: { hover: { background: '@color.primary-shade-50' } },
        },
    ],
});
```

Side effects at definition time:

1. Creates all needed utility value instances (CSS classes) via the registered factories.
2. Computes `_runtime` (resolved class-key lookup tables) for the runtime function.
3. Registers class names in `root._usage.recipeUtilities` for tree-shaking.

**Runtime usage** — the plugin's `virtual:styleframe` consumer module exports one
function per recipe (named after the module-level `export const` name in the
`.styleframe.ts` file, else the camelCased recipe name) plus a props type. The function
is built with `createRecipe` from `@styleframe/runtime`:

```ts
import { button, type ButtonProps } from 'virtual:styleframe';

button({});                                   // defaultVariants → "button _border-width:thin ..."
button({ color: 'secondary', size: 'sm' });   // returns a class string
```

Boolean props are coerced (`disabled: true` selects the `"true"` variant option).

---

## Themes

### theme(name, callback)

Creates (or extends) a named theme. Source: `engine/core/src/tokens/theme.ts`.

```ts
theme(name: string, callback: DeclarationsCallback): Theme
```

Calling `theme('dark', ...)` again appends to the **same** theme. The callback receives
the full declarations context (`variable`, `selector`, `atRule`, `keyframes`, `media`,
`ref`, `css`):

```ts
theme('dark', ({ variable, selector }) => {
    variable(colorBackground, '#18181b');     // override by instance
    variable('color.text', '#ffffff');        // or by name
    selector('.card', { borderColor: '#333' });
});
```

CSS output uses the theme selector (default `.dark-theme, [data-theme="dark"]`):

```html
<div data-theme="dark">…</div>   <!-- or class="dark-theme" -->
```

---

## Interpolation

### css tagged template

Builds a composite `CSS` token from mixed parts. Source: `engine/core/src/tokens/css.ts`.

```ts
css(strings: TemplateStringsArray, ...interpolations: (TokenValue | Variable | AtRule)[]): CSS
```

Interpolation rules — `Variable` → auto-wrapped in `ref()`; `AtRule` (e.g. a keyframes
token) → its rule/name string; strings containing `@name` → parsed into references;
anything else passes through:

```ts
padding: css`${ref(spacingSm)} ${ref(spacingMd)}`
padding: css`${spacingSm} ${spacingMd}`                  // Variables auto-ref'd
animation: css`${fadeIn} 300ms ease-in-out`              // AtRule → animation name
width: css`calc(100% - @sidebar.width)`                  // @-refs inside strings
background: css`linear-gradient(135deg, ${ref(colorPrimary)} 0%, @color.secondary 100%)`
```

---

## Animations

### keyframes(name, declarations)

Sugar for `atRule('keyframes', name, declarations)`. Returns the `AtRule` token; its
`.rule` is the animation name. Source: `engine/core/src/tokens/atRule.ts`.

```ts
const fadeIn = keyframes('fade-in', {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

selector('.animate', {
    animation: css`${fadeIn} 0.3s ease-out`,   // interpolate the token directly
});
```

Keyframe stop keys: `from`, `to`, percentages, and comma-separated combinations
(`'0%, 100%'`).

---

## Media Queries

### media(query, declarationsOrCallback?)

Sugar for `atRule('media', query, ...)`. Returns `AtRule`.

```ts
// Standalone with callback
media('(min-width: 768px)', ({ selector }) => {
    selector('.container', { maxWidth: '750px' });
});

// Inline in a declarations block
selector('.container', {
    padding: '1rem',
    '@media (min-width: 768px)': { padding: '2rem' },
});
```

---

## At-Rules

### atRule(identifier, rule, declarationsOrCallback?)

Generic at-rule. Source: `engine/core/src/tokens/atRule.ts`.

```ts
atRule(
    identifier: string,       // 'media', 'supports', 'font-face', 'layer', 'container', 'property', ...
    rule: string,             // the query/prelude ('' if none)
    declarationsOrCallback?: DeclarationsBlock | ContainerInput | DeclarationsCallback,
): AtRule
```

```ts
atRule('supports', '(display: grid)', ({ selector }) => {
    selector('.grid', { display: 'grid' });
});

atRule('font-face', '', {
    fontFamily: "'CustomFont'",
    src: "url('font.woff2') format('woff2')",
    fontDisplay: 'swap',
});

atRule('layer', 'base, components, utilities', {});

atRule('container', 'card (min-width: 400px)', ({ selector }) => {
    selector('.card-content', { display: 'flex' });
});

atRule('property', '--gradient-angle', {
    syntax: "'<angle>'",
    inherits: 'false',
    initialValue: '0deg',
});
```

---

## Merging

### merge(base, ...instances)

Combines Styleframe instances left-to-right into `base`.
Source: `engine/core/src/utils/merge.ts`.

```ts
import { merge } from 'styleframe';
import base from './base';
import components from './components';
import themes from './themes';

export default merge(base, components, themes);
```

Merge semantics:

- **Variables**: matched by name; later instances override earlier values
- **Themes**: matched by name and deep-merged (their containers merge recursively)
- **Declarations**: object-spread, later keys win
- **Other arrays** (children, utilities, modifiers, recipes): concatenated
- The internal `_registry` is rebuilt after each merge

Order from general to specific so overrides land last. Note: under the build plugin you
rarely need `merge` — `*.styleframe.ts` files share one global instance (see the
patterns doc).

---

## Advanced exports

Also exported from `styleframe` (verified against `engine/core/src/index.ts`, which
re-exports `defaults`, `styleframe`, `tokens`, `typeGuards`, `types`, `utils`):

- **Type guards** (`typeGuards.ts`): `isVariable`, `isRef`, `isSelector`, `isAtRule`,
  `isUtility`, `isModifier`, `isCSS`, `isTheme`, `isRoot`, `isRecipe`, `isStyleframe`,
  `isTokenValue`, `isPrimitiveTokenValue`, `isContainer`, `isContainerInput`,
  `isKeyReferenceValue`, `isToken`, `isObject`
- **Getters** (`utils/getters.ts`): `getVariable(root, name)`, `getUtility(root, name)`,
  `getModifier(root, name)` — throw when missing
- **Defaults** (`defaults.ts`): `transformUtilityKey({ replacer?, namespace? })` (build
  custom `autogenerate` functions), `defaultUtilitySelectorFn`
- **Token machinery** (`tokens/`): `createRoot`, `createDeclarationsCallbackContext`,
  `parseDeclarationsBlock`, `createPropertyValueResolver`, `parseAtReferences`,
  `registerRecipeUtilities`, `generateRecipeRuntime`, `processRecipeUtilities`, plus all
  `create*Function` factories
- **Utils**: `merge`, `mergeContainers`, `mergeVariablesArray`, `mergeThemesArray`,
  `rebuildRegistry`, `capitalizeFirst`, `deepClone`, `generateRandomId`, `hashValue`,
  `isTokenEqual`, CSS selector helpers
- **Types**: `Styleframe`, `StyleframeOptions`, `Root`, `Variable`, `Reference`,
  `Selector`, `AtRule`, `CSS`, `Utility`, `UtilityFactory`, `UtilityCreatorFn`,
  `ModifierFactory`, `Recipe`, `RecipeRuntime`, `Theme`, `TokenValue`,
  `DeclarationsBlock`, `DeclarationsCallbackContext`, `Container`, `ContainerInput`, …

`TokenValue = string | number | boolean | null | undefined | Reference | CSS | Array<...>`.

## CSS output conventions (defaults)

| Token | Output |
| --- | --- |
| `variable('color.primary', v)` | `:root { --color--primary: v; }` |
| `ref(colorPrimary)` | `var(--color--primary)` |
| `ref('x', 'f')` | `var(--x, f)` |
| utility `padding`, key `md` | class `_padding:md` (escaped in the stylesheet) |
| utility key `default` | class `_padding` (value suffix omitted) |
| modifier `hover` on it | class `_hover:padding:md` |
| `theme('dark', …)` | `.dark-theme, [data-theme="dark"] { … }` |
