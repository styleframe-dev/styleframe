# Styleframe Common Patterns

## Composable Structure

### Variable Composables

ALWAYS use `{ default: true }` and return the variables:

```ts
import type { Styleframe } from 'styleframe';

export function useColorVariables(s: Styleframe) {
    const { variable, ref } = s;

    const colorPrimary = variable('color.primary', '#006cff', { default: true });
    const colorSecondary = variable('color.secondary', '#6c757d', { default: true });
    const colorSuccess = variable('color.success', '#28a745', { default: true });
    const colorDanger = variable('color.danger', '#dc3545', { default: true });
    const colorWhite = variable('color.white', '#ffffff', { default: true });

    return { colorPrimary, colorSecondary, colorSuccess, colorDanger, colorWhite };
}
```

### Selector Composables

Import variable composables and use `ref()`:

```ts
import type { Styleframe } from 'styleframe';
import { useColorVariables } from './useColorVariables';
import { useSpacingVariables } from './useSpacingVariables';

export function useButtonSelectors(s: Styleframe) {
    const { selector, ref, css } = s;
    const { colorPrimary, colorWhite } = useColorVariables(s);
    const { spacingMd, spacingLg } = useSpacingVariables(s);

    selector('.button', {
        backgroundColor: ref(colorPrimary),
        color: ref(colorWhite),
        padding: css`${ref(spacingMd)} ${ref(spacingLg)}`,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',

        '&:hover': {
            opacity: 0.9,
        },

        '&:focus': {
            outline: '2px solid',
            outlineOffset: '2px',
        },

        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    });
}
```

### Utility Composables

Create AND invoke the utility creator:

```ts
import type { Styleframe } from 'styleframe';
import { useSpacingVariables } from './useSpacingVariables';

export function useSpacingUtilities(s: Styleframe) {
    const { utility, ref } = s;
    const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } = useSpacingVariables(s);

    const spacingMap = {
        xs: ref(spacingXs),
        sm: ref(spacingSm),
        md: ref(spacingMd),
        lg: ref(spacingLg),
        xl: ref(spacingXl),
    };

    const createPadding = utility('padding', ({ value }) => ({ padding: value }));
    const createMargin = utility('margin', ({ value }) => ({ margin: value }));
    const createGap = utility('gap', ({ value }) => ({ gap: value }));

    // IMPORTANT: Invoke the creators
    createPadding(spacingMap);
    createMargin(spacingMap);
    createGap(spacingMap);

    return { createPadding, createMargin, createGap };
}
```

---

## Complete Design System Setup

```ts
import { styleframe } from 'styleframe';
import {
    useColor, useColorLightness, useColorShade,
    useSpacing, useMultiplier,
    useScale, useScalePowers,
    useFontFamily, useFontSize, useFontWeight, useLineHeight,
    useBreakpoint,
    useBorderRadius,
    defaultScaleValues, defaultColorLightnessValues
} from '@styleframe/theme';

const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe, theme, css } = s;

// 1. SCALES - Foundation for proportional sizing
const { scale } = useScale(s, { ...defaultScaleValues, default: '@minor-third' });
const scalePowers = useScalePowers(s, scale, [-2, -1, 0, 1, 2, 3, 4, 5]);

// 2. COLORS - Base colors with lightness variants
const { colorPrimary, colorSecondary, colorSuccess, colorDanger } = useColor(s, {
    primary: '#006cff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
} as const);

const primaryLevels = useColorLightness(s, colorPrimary, defaultColorLightnessValues);
const { colorPrimaryShade100, colorPrimaryShade200 } = useColorShade(s, colorPrimary);

// 3. SPACING - Scale-based spacing
const { spacing } = useSpacing(s, { default: '1rem' } as const);
const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } = useMultiplier(s, spacing, {
    xs: scalePowers[-2],
    sm: scalePowers[-1],
    md: scalePowers[0],
    lg: scalePowers[1],
    xl: scalePowers[2],
});

// 4. TYPOGRAPHY - Scale-based font sizes
const { fontFamily } = useFontFamily(s);
const { fontSize } = useFontSize(s, { default: '1rem' } as const);
const { fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl } = useMultiplier(s, fontSize, {
    sm: scalePowers[-1],
    md: scalePowers[0],
    lg: scalePowers[1],
    xl: scalePowers[2],
});
const { fontWeightNormal, fontWeightSemibold, fontWeightBold } = useFontWeight(s);
const { lineHeightTight, lineHeightNormal } = useLineHeight(s);

// 5. BREAKPOINTS
const { breakpointSm, breakpointMd, breakpointLg } = useBreakpoint(s);

// 6. BORDERS
const { borderRadiusSm, borderRadiusMd, borderRadiusLg } = useBorderRadius(s, {
    sm: '4px',
    md: '8px',
    lg: '12px',
} as const);

// 7. MODIFIERS - For utilities
const hover = modifier('hover', ({ declarations }) => ({ '&:hover': declarations }));
const focus = modifier('focus', ({ declarations }) => ({ '&:focus': declarations }));

// 8. UTILITIES
const createBackground = utility('background', ({ value }) => ({ backgroundColor: value }));
createBackground({
    primary: ref(colorPrimary),
    secondary: ref(colorSecondary),
}, [hover]);

// 9. DARK THEME
theme('dark', (ctx) => {
    ctx.variable(colorPrimary, '#60a5fa');
    ctx.variable(colorSecondary, '#94a3b8');
});

export default s;
```

---

## Responsive Patterns

### Mobile-First Media Queries

```ts
selector('.container', {
    padding: ref(spacingSm),

    '@media (min-width: 768px)': {
        padding: ref(spacingMd),
    },

    '@media (min-width: 1024px)': {
        padding: ref(spacingLg),
    },
});
```

### Breakpoint-Based Modifiers

```ts
const breakpointValues = { sm: 640, md: 768, lg: 1024 };

const responsive = modifier(
    ['sm', 'md', 'lg'],
    ({ key, declarations }) => ({
        [`@media (min-width: ${breakpointValues[key]}px)`]: declarations,
    })
);

// Usage: creates _sm:padding:md, _md:padding:md, _lg:padding:md
createPadding({ md: ref(spacingMd) }, [responsive]);
```

---

## Animation Patterns

### Respecting Reduced Motion

```ts
const fadeIn = keyframes('fade-in', {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

selector('.animated', {
    animation: css`${fadeIn.name} 0.3s ease-out`,

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
    },
});
```

### Performance-Optimized Animations

ALWAYS animate only `transform` and `opacity` when possible:

```ts
// GOOD - GPU accelerated
const slideIn = keyframes('slide-in', {
    '0%': { opacity: 0, transform: 'translateX(-100%)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

// AVOID - Causes layout/paint
const badAnimation = keyframes('bad', {
    '0%': { width: '0%', left: '0' },
    '100%': { width: '100%', left: '100px' },
});
```

---

## Theme Patterns

### Complete Theme Override

```ts
const colorBackground = variable('color.background', '#ffffff', { default: true });
const colorText = variable('color.text', '#000000', { default: true });
const colorBorder = variable('color.border', '#e5e7eb', { default: true });

theme('dark', (ctx) => {
    ctx.variable(colorBackground, '#18181b');
    ctx.variable(colorText, '#ffffff');
    ctx.variable(colorBorder, '#3f3f46');

    // Selector overrides for specific components
    ctx.selector('.card', {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    });
});
```

### Nested Themes

```html
<html data-theme="light">
    <body>
        <main>Light content</main>
        <aside data-theme="dark">
            Dark sidebar content
        </aside>
    </body>
</html>
```

---

## Merge Patterns

### Modular Design System

```ts
// base.ts - Foundation tokens
import { styleframe } from 'styleframe';
const s = styleframe();
// Define variables, scales, etc.
export default s;

// components.ts - Component styles
import { styleframe } from 'styleframe';
const s = styleframe();
// Define selectors, recipes
export default s;

// main.ts - Combine everything
import { merge } from 'styleframe';
import base from './base';
import components from './components';
import themes from './themes';

export default merge(base, components, themes);
```

### Factory Functions for Customization

```ts
export function createDesignSystem(options: { primaryColor: string }) {
    const s = styleframe();
    const { variable } = s;

    variable('color.primary', options.primaryColor);

    return s;
}

// Usage
import { merge } from 'styleframe';
import { createDesignSystem } from './factory';

const custom = createDesignSystem({ primaryColor: '#8b5cf6' });
export default merge(base, custom);
```

---

## Selector Nesting Patterns

### Pseudo-Classes and Pseudo-Elements

```ts
selector('.input', {
    padding: ref(spacingMd),
    border: '1px solid',
    borderColor: ref(colorBorder),

    // Pseudo-classes
    '&:hover': { borderColor: ref(colorPrimary) },
    '&:focus': { outline: 'none', boxShadow: '0 0 0 2px' },
    '&:disabled': { opacity: 0.5 },

    // Pseudo-elements
    '&::placeholder': { color: ref(colorTextMuted) },
});
```

### Child and Descendant Selectors

```ts
selector('.card', {
    padding: ref(spacingLg),

    // Direct child
    '> .card-header': {
        marginBottom: ref(spacingMd),
    },

    // Descendant
    '.card-title': {
        fontSize: ref(fontSizeLg),
        fontWeight: ref(fontWeightBold),
    },

    // Adjacent sibling
    '+ .card': {
        marginTop: ref(spacingMd),
    },
});
```
