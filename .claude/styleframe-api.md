# Styleframe API Reference

## Core Instance

### styleframe(options?)

Creates a new Styleframe instance.

```ts
import { styleframe } from 'styleframe';

const s = styleframe({
    variables: {
        name: ({ name }) => `--${name}`, // Custom variable naming
    },
    utilities: {
        selector: ({ name, value, modifiers }) =>
            `._${name}:${value}${modifiers.map(m => `:${m}`).join('')}`,
    },
    theme: {
        selector: ({ name }) => `[data-theme="${name}"]`,
    },
});
```

**Returns:** Styleframe instance with all token creation methods.

---

## Variables

### variable(name, value, options?)

Creates a CSS custom property.

**Parameters:**
- `name`: string - Variable name using dot notation
- `value`: string | ref - The value or reference to another variable
- `options.default?`: boolean - If true, only sets if not already defined

**Returns:** Variable token object

```ts
// Basic usage
const colorPrimary = variable('color.primary', '#006cff');

// With default flag (REQUIRED for composables)
const spacing = variable('spacing', '1rem', { default: true });

// Referencing another variable
const colorAccent = variable('color.accent', ref(colorPrimary));
```

### ref(variable, fallback?)

References a CSS variable.

**Parameters:**
- `variable`: Variable | string - Variable token or name string
- `fallback?`: string - Fallback value if variable undefined

```ts
// Reference a variable token
backgroundColor: ref(colorPrimary)

// Reference by name with fallback
color: ref('color.text', '#333')
```

---

## Selectors

### selector(query, declarations, callback?)

Creates CSS rules.

**Parameters:**
- `query`: string - CSS selector
- `declarations`: object | ((ctx) => object) - Style declarations
- `callback?`: (ctx) => void - For nested selectors/at-rules

```ts
// Basic selector
selector('.button', {
    padding: '1rem',
    backgroundColor: ref(colorPrimary),
});

// With nesting (pseudo-classes and child selectors)
selector('.card', {
    padding: '1rem',
    '.card-title': { fontSize: '1.5rem' },
    '&:hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    '&::before': { content: '""' },
});

// With callback for complex nesting
selector('.container', ({ selector, media }) => {
    selector('.inner', { padding: '1rem' });
    media('(min-width: 768px)', { padding: '2rem' });
    return { display: 'flex' };
});
```

---

## Utilities

### utility(name, factory, options?)

Creates a utility class generator.

**Parameters:**
- `name`: string - Utility base name
- `factory`: (ctx: { value, selector, variable, ref, media }) => declarations
- `options.autogenerate?`: function - Custom key generation for array syntax

**Returns:** Creator function: (values, modifiers?) => void

```ts
const createPadding = utility('padding', ({ value }) => ({
    padding: value,
}));

// Object syntax (explicit keys)
createPadding({
    sm: ref(spacingSm),
    md: ref(spacingMd),
    default: ref(spacing),
});

// Array syntax (auto-generated keys)
createPadding([ref(spacingSm), '@spacing.md', '1rem']);

// With modifiers
createPadding({ sm: ref(spacingSm) }, [hover, focus]);
```

**IMPORTANT:** Always invoke the creator function. Defining the utility without calling it produces no CSS.

### Spacing Utility Composables

Spacing utilities (`useMarginUtility`, `usePaddingUtility`, `useGapUtility`, `useSpaceUtility`) support **multiplier values** that generate `calc()` expressions:

```ts
import { useMarginUtility, usePaddingUtility, useGapUtility } from '@styleframe/theme';

// Create utility with named values
const createMargin = useMarginUtility(s, {
    sm: ref(spacingSm),
    md: ref(spacingMd),
});

// Add multiplier values using array syntax (with @ prefix)
createMargin(["@1.5", "@2", "@0.5", "@-1"]);

// Generates:
// ._margin:1.5 { margin: calc(var(--spacing) * 1.5); }
// ._margin:2 { margin: calc(var(--spacing) * 2); }
// ._margin:0.5 { margin: calc(var(--spacing) * 0.5); }
// ._margin:-1 { margin: calc(var(--spacing) * -1); }
```

**Supported multiplier formats (with @ prefix):**
- Integers: `@1`, `@2`, `@3`
- Decimals: `@0.5`, `@1.5`, `@2.25`
- Negative: `@-1`, `@-0.5` (for negative margins)

### modifier(name, factory)

Creates reusable utility modifiers.

**Parameters:**
- `name`: string | string[] - Modifier name(s)
- `factory`: (ctx: { declarations, variables, children, key?, selector }) => object | void

```ts
// Simple modifier
const hover = modifier('hover', ({ declarations }) => ({
    '&:hover': declarations,
}));

// Multi-key modifier (for breakpoints)
const responsive = modifier(['sm', 'md', 'lg'], ({ key, declarations }) => ({
    [`@media (min-width: ${breakpoints[key]})`]: declarations,
}));
```

---

## Recipes

### recipe(config)

Creates a component variant system.

**Parameters:**
- `config.name`: string - Recipe name (base class)
- `config.base`: object - Base utility declarations
- `config.variants`: object - Variant definitions
- `config.defaultVariants?`: object - Default variant selections
- `config.compoundVariants?`: array - Conditional variant combinations

```ts
recipe({
    name: 'button',
    base: {
        borderWidth: ref(borderWidthThin),
        borderStyle: 'solid',
    },
    variants: {
        color: {
            primary: { background: ref(colorPrimary), color: ref(colorWhite) },
            secondary: { background: ref(colorSecondary), color: ref(colorWhite) },
        },
        size: {
            sm: { padding: ref(spacingSm) },
            md: { padding: ref(spacingMd) },
            lg: { padding: ref(spacingLg) },
        },
    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
    },
    compoundVariants: [
        {
            match: { color: 'primary', disabled: false },
            css: { hover: { background: '@color.primary-dark' } },
        },
    ],
});
```

**Runtime Usage:**
```ts
import { button } from 'virtual:styleframe';

button({}) // Uses defaultVariants
button({ color: 'secondary', size: 'lg' })
```

---

## Themes

### theme(name, callback)

Creates theme variations.

**Parameters:**
- `name`: string - Theme name
- `callback`: (ctx: { variable, selector }) => void

```ts
theme('dark', (ctx) => {
    ctx.variable(colorBackground, '#18181b');
    ctx.variable(colorText, '#ffffff');
    ctx.selector('.card', { borderColor: '#333' });
});
```

**HTML Usage:**
```html
<div data-theme="dark">Dark themed content</div>
```

---

## Interpolation

### css template literal

Interpolates values into CSS strings.

```ts
padding: css`${ref(spacingSm)} ${ref(spacingMd)}`
animation: css`${fadeIn.name} ${ref(animationDuration)} ease-out`
width: css`calc(100% - ${ref(sidebarWidth)})`
background: css`linear-gradient(135deg, ${ref(colorPrimary)} 0%, ${ref(colorSecondary)} 100%)`
```

---

## Animations

### keyframes(name, frames)

Defines CSS animations.

**Parameters:**
- `name`: string - Animation name
- `frames`: object - Keyframe stops

**Returns:** Keyframe token with `.name` property

```ts
const fadeIn = keyframes('fade-in', {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

selector('.animate', {
    animation: `${fadeIn.name} 0.3s ease-out`,
});
```

---

## Media Queries

### media(query, callback/declarations)

Creates media query rules.

```ts
// Callback form
media('(min-width: 768px)', ({ selector, variable }) => {
    selector('.container', { maxWidth: '750px' });
});

// Inline in selector
selector('.container', {
    padding: '1rem',
    '@media (min-width: 768px)': { padding: '2rem' },
    '@media (min-width: 1024px)': { padding: '3rem' },
});
```

---

## At-Rules

### atRule(rule, query, declarations/callback)

Creates CSS at-rules.

```ts
// @supports
atRule('supports', '(display: grid)', ({ selector }) => {
    selector('.grid', { display: 'grid' });
});

// @font-face
atRule('font-face', '', {
    fontFamily: "'CustomFont'",
    src: "url('font.woff2') format('woff2')",
    fontDisplay: 'swap',
});

// @layer
atRule('layer', 'base, components, utilities', {});

// @container
atRule('container', 'card (min-width: 400px)', ({ selector }) => {
    selector('.card-content', { display: 'flex' });
});

// @property
atRule('property', '--gradient-angle', {
    syntax: "'<angle>'",
    inherits: 'false',
    initialValue: '0deg',
});
```

---

## Merging

### merge(...instances)

Combines multiple Styleframe instances.

```ts
import { merge } from 'styleframe';
import base from './base';
import theme from './theme';
import components from './components';

const s = merge(base, theme, components);
```

**Merge Behavior:**
- Variables: Later instances override earlier ones
- Arrays (utilities, modifiers, recipes): Concatenated
- Themes by name: Merged together

**IMPORTANT:** Merge from general to specific for proper overrides.
