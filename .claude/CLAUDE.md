# Styleframe Code Generation Guide

Styleframe is a type-safe, composable CSS-in-TypeScript framework for building design systems. This guide ensures consistent, correct code generation.

## CRITICAL RULES

### Instance Creation
ALWAYS create a Styleframe instance and destructure the methods:

```ts
import { styleframe } from 'styleframe';

const s = styleframe();
const { variable, ref, selector, utility, modifier, recipe, theme, atRule, keyframes, media, css } = s;

export default s;
```

### Variable Naming Convention
- Use dot notation: `color.primary` becomes CSS `--color--primary`
- ALWAYS use `ref()` to reference variables in declarations
- Use `{ default: true }` for variables in reusable composables
- NEVER hardcode values that should be tokens

### Utility Class Format
- Generated format: `_property-name:value` (e.g., `_margin:md`)
- Modifier prefix format: `_modifier:property:value` (e.g., `_hover:background:primary`)

### Theme Selector
- Default: `[data-theme="name"]`
- Apply themes via `data-theme` attribute on HTML elements

---

## API QUICK REFERENCE

### variable(name, value, options?)
```ts
const colorPrimary = variable('color.primary', '#006cff');
const spacing = variable('spacing', '1rem', { default: true }); // For composables
```

### ref(variable, fallback?)
```ts
backgroundColor: ref(colorPrimary)
color: ref('color.text', '#000') // String ref with fallback
```

### selector(query, declarations)
```ts
selector('.button', {
    padding: ref(spacing),
    '&:hover': { opacity: 0.9 },
});
```

### utility(name, factory) → createUtility(values, modifiers?)
```ts
const createMargin = utility('margin', ({ value }) => ({ margin: value }));
createMargin({ sm: ref(spacingSm), md: ref(spacingMd) }, [hover]);
```

### modifier(name, factory)
```ts
const hover = modifier('hover', ({ declarations }) => ({
    '&:hover': declarations,
}));
```

### recipe({ name, base, variants, defaultVariants?, compoundVariants? })
```ts
recipe({
    name: 'button',
    base: { borderWidth: ref(borderWidthThin) },
    variants: {
        color: { primary: { background: ref(colorPrimary) } },
        size: { sm: { padding: ref(spacingSm) } },
    },
    defaultVariants: { color: 'primary', size: 'md' },
});
```

### theme(name, callback)
```ts
theme('dark', (ctx) => {
    ctx.variable(colorPrimary, '#60a5fa');
    ctx.selector('.card', { background: '#1a1a1a' });
});
```

### css template literal
```ts
padding: css`${ref(spacing)} calc(${ref(spacing)} * 2)`
```

### keyframes(name, frames)
```ts
const fadeIn = keyframes('fade-in', {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});
```

### media(query, callback) or inline @media
```ts
media('(min-width: 768px)', ({ selector }) => {
    selector('.container', { padding: '2rem' });
});
// OR inline:
selector('.container', {
    '@media (min-width: 768px)': { padding: '2rem' },
});
```

### atRule(rule, query, declarations/callback)
```ts
atRule('supports', '(display: grid)', ({ selector }) => {
    selector('.grid', { display: 'grid' });
});
```

---

## COMPOSABLE NAMING CONVENTIONS

- Variables: `use<Context>Variables()` (e.g., `useColorVariables`)
- Selectors: `use<Context>Selectors()` (e.g., `useButtonSelectors`)
- Utilities: `use<Context>Utilities()` (e.g., `useSpacingUtilities`)
- Recipes: `use<Context>Recipe()` (e.g., `useButtonRecipe`)

---

## DESIGN TOKEN IMPORTS

```ts
// @styleframe/theme
import { useColor, useColorLightness, useColorShade, useColorTint } from '@styleframe/theme';
import { useSpacing, useMultiplier } from '@styleframe/theme';
import { useScale, useScalePowers } from '@styleframe/theme';
import { useFontFamily, useFontSize, useFontWeight, useLineHeight, useLetterSpacing } from '@styleframe/theme';
import { useBreakpoint } from '@styleframe/theme';
import { useBorderWidth, useBorderRadius, useBoxShadow } from '@styleframe/theme';
import { useEasing } from '@styleframe/theme';

// @styleframe/pro (fluid design)
import { useFluidViewport, useFluidFontSize, useFluidClamp } from '@styleframe/pro';
```

---

## COMMON ANTI-PATTERNS - NEVER DO THESE

1. **NEVER hardcode colors, spacing, or sizes** - Use variables
2. **NEVER use `ref()` without importing it from the instance**
3. **NEVER forget `{ default: true }` in composable variables**
4. **NEVER define utilities without calling the creator function**
5. **NEVER use arbitrary CSS values without `css` template literal for complex expressions**
6. **NEVER forget to export the Styleframe instance as default**
7. **NEVER use appearance-based names** - Use semantic names (e.g., `color.primary` not `color.blue`)
8. **NEVER use named exports in index files** - Use `export *` for all re-exports in index files

---

## REFERENCE FILES

See these files for detailed documentation:
- `.claude/styleframe-api.md` - Complete API reference
- `.claude/styleframe-patterns.md` - Common patterns and examples
- `.claude/styleframe-recipes.md` - Recipe system guide
- `.claude/styleframe-tokens.md` - Design token composables
