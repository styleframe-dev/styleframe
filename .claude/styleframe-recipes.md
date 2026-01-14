# Styleframe Recipe System

Recipes are component variant systems that combine base styles with configurable variants, default selections, and compound variants for complex styling scenarios.

## Recipe Anatomy

```ts
recipe({
    name: 'button',           // Base class name
    base: { ... },            // Always-applied utility declarations
    variants: { ... },        // Variant group definitions
    defaultVariants: { ... }, // Default selections
    compoundVariants: [ ... ] // Conditional combinations
});
```

---

## Complete Button Recipe Example

```ts
import { styleframe } from 'styleframe';

const s = styleframe();
const { variable, ref, utility, recipe } = s;

// 1. Define tokens
const colorPrimary = variable('color.primary', '#006cff');
const colorSecondary = variable('color.secondary', '#6c757d');
const colorWhite = variable('color.white', '#ffffff');
const colorDisabled = variable('color.disabled', '#9ca3af');
const borderWidthThin = variable('border-width.thin', '1px');
const spacingXs = variable('spacing.xs', '0.5rem');
const spacingSm = variable('spacing.sm', '0.75rem');
const spacingMd = variable('spacing.md', '1rem');
const spacingLg = variable('spacing.lg', '1.25rem');

// 2. Define utilities that the recipe will use
utility('background', ({ value }) => ({ backgroundColor: value }));
utility('color', ({ value }) => ({ color: value }));
utility('padding', ({ value }) => ({ padding: value }));
utility('border-width', ({ value }) => ({ borderWidth: value }));
utility('border-style', ({ value }) => ({ borderStyle: value }));
utility('border-color', ({ value }) => ({ borderColor: value }));
utility('opacity', ({ value }) => ({ opacity: value }));
utility('cursor', ({ value }) => ({ cursor: value }));

// 3. Define the recipe
recipe({
    name: 'button',
    base: {
        borderWidth: ref(borderWidthThin),
        borderStyle: 'solid',
        borderColor: 'transparent',
        cursor: 'pointer',
    },
    variants: {
        color: {
            primary: {
                background: ref(colorPrimary),
                color: ref(colorWhite),
                borderColor: ref(colorPrimary),
            },
            secondary: {
                background: ref(colorSecondary),
                color: ref(colorWhite),
                borderColor: ref(colorSecondary),
            },
            ghost: {
                background: 'transparent',
                color: ref(colorPrimary),
                borderColor: ref(colorPrimary),
            },
        },
        size: {
            xs: { padding: ref(spacingXs) },
            sm: { padding: ref(spacingSm) },
            md: { padding: ref(spacingMd) },
            lg: { padding: ref(spacingLg) },
        },
        disabled: {
            false: {},
            true: {
                opacity: '0.5',
                cursor: 'not-allowed',
            },
        },
    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
        disabled: false,
    },
    compoundVariants: [
        {
            match: { color: 'primary', disabled: false },
            css: {
                hover: { background: '@color.primary-dark' },
            },
        },
        {
            match: { color: 'secondary', disabled: false },
            css: {
                hover: { background: '@color.secondary-dark' },
            },
        },
        {
            match: { color: 'ghost', disabled: false },
            css: {
                hover: { background: '@color.primary-light' },
            },
        },
    ],
});

export default s;
```

---

## Using Recipes in Components

```ts
// Import from virtual module
import { button } from 'virtual:styleframe';

// Usage
function Button({ color, size, disabled, children }) {
    const className = button({ color, size, disabled });
    // Returns: "button _border-width:thin _border-style:[solid] ..."

    return <button className={className} disabled={disabled}>{children}</button>;
}

// Examples
button({})                          // Uses defaultVariants
button({ color: 'secondary' })      // Override color only
button({ color: 'ghost', size: 'lg' })
button({ disabled: true })
```

---

## Recipe Value Formats

| Config Value | Runtime Output | Class Generated |
|--------------|----------------|-----------------|
| `ref(variable)` | Token path | `_property:token.path` |
| `"@token.path"` | Token path | `_property:token.path` |
| `"literal"` | Wrapped value | `_property:[literal]` |

---

## Variants

Variants define multiple styling options for each design dimension:

```ts
recipe({
    name: 'button',
    variants: {
        // "color" variant group
        color: {
            primary: { background: ref(colorPrimary) },
            secondary: { background: ref(colorSecondary) },
            danger: { background: ref(colorDanger) },
        },
        // "size" variant group
        size: {
            sm: { padding: ref(spacingSm) },
            md: { padding: ref(spacingMd) },
            lg: { padding: ref(spacingLg) },
        },
        // Boolean variant
        rounded: {
            false: { borderRadius: '0' },
            true: { borderRadius: ref(borderRadiusFull) },
        },
    },
});
```

---

## Default Variants

Specify which variant is applied when no explicit variant is chosen:

```ts
recipe({
    name: 'button',
    variants: { /* ... */ },
    defaultVariants: {
        color: 'primary',
        size: 'md',
        rounded: false,
    },
});

// button({}) uses color: 'primary', size: 'md', rounded: false
// button({ size: 'lg' }) uses color: 'primary', size: 'lg', rounded: false
```

---

## Compound Variants

Define special styling for specific variant combinations:

```ts
recipe({
    name: 'button',
    variants: {
        color: {
            primary: { /* ... */ },
            secondary: { /* ... */ },
        },
        disabled: {
            false: {},
            true: { opacity: '0.5', cursor: 'not-allowed' },
        },
    },
    compoundVariants: [
        {
            // When color is primary AND disabled is false
            match: {
                color: 'primary',
                disabled: false,
            },
            css: {
                hover: { background: '@color.primary-dark' },
            },
        },
        {
            // When color is secondary AND disabled is false
            match: {
                color: 'secondary',
                disabled: false,
            },
            css: {
                hover: { background: '@color.secondary-dark' },
            },
        },
    ],
});
```

**How Compound Variants Work:**
1. After base and variant classes are resolved, runtime checks each compound variant
2. For each compound variant, it compares current selections against `match`
3. If ALL match conditions are satisfied, `css` declarations are added
4. Multiple compound variants can match and all their styles will be applied

---

## Reusable Variant Objects

Extract common variants for reuse:

```ts
// Shared variants
const sizeVariants = {
    sm: { padding: ref(spacingSm) },
    md: { padding: ref(spacingMd) },
    lg: { padding: ref(spacingLg) },
};

const disabledVariant = {
    false: {},
    true: {
        opacity: '0.5',
        cursor: 'not-allowed',
    },
};

// Reuse in multiple recipes
recipe({
    name: 'button',
    variants: {
        size: sizeVariants,
        disabled: disabledVariant,
        /* ... */
    },
});

recipe({
    name: 'input',
    variants: {
        size: sizeVariants,
        disabled: disabledVariant,
        /* ... */
    },
});
```

---

## Recipe Best Practices

1. **Define utilities BEFORE recipes that use them**
2. **Use semantic variant names** (not appearance-based)
3. **Provide sensible `defaultVariants`** for common use cases
4. **Keep variant groups focused** on single concerns
5. **Use compound variants sparingly** for specific combinations
6. **Limit `match` conditions** to 2-3 maximum for maintainability
7. **Test all variant combinations** for accessibility

---

## Recipe vs Utilities Comparison

| Feature | Utilities | Recipes |
|---------|-----------|---------|
| Output | Single CSS class | Multiple combined classes |
| Usage | Direct class application | Function call with props |
| Variants | No built-in variants | Full variant system |
| Runtime | No runtime needed | Requires `@styleframe/runtime` |

Use **recipes** for component-level styling with variant selection.
Use **utilities** for one-off styling or building custom abstractions.
