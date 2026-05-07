# Styleframe Design Token Composables

## @styleframe/theme Package

### Colors

```ts
import {
    useColorDesignTokens,
    useColorLevelDesignTokens,
    useColorShadeDesignTokens,
    useColorTintDesignTokens,
    colorLevelValues,
    colorShadeValues,
    colorTintValues
} from '@styleframe/theme';

// Base colors
const { colorPrimary, colorSecondary } = useColorDesignTokens(s, {
    primary: '#006cff',
    secondary: '#6c757d',
});

// Level variants (absolute: sets L channel in OKLCH to a specific 0-1 lightness)
// Generates: colorPrimary50, colorPrimary100, ..., colorPrimary950
const { colorPrimary100, colorPrimary500, colorPrimary900 } =
    useColorLevelDesignTokens(s, colorPrimary, colorLevelValues);

// Shade variants (relative: lowers L channel — darker)
// Keys are "shade-50", "shade-100", etc.; values are 0-100 percentage points to subtract
const { colorPrimaryShade100 } = useColorShadeDesignTokens(s, colorPrimary, { "shade-100": 10 });

// Tint variants (relative: raises L channel — lighter)
const { colorPrimaryTint100 } = useColorTintDesignTokens(s, colorPrimary, { "tint-100": 10 });
```

**Default Level Values (decimals 0–1):**
```ts
colorLevelValues = {
    50: 0.97, 100: 0.93, 150: 0.89, 200: 0.85, 250: 0.8,
    300: 0.75, 350: 0.7, 400: 0.65, 450: 0.6, 500: 0.55,
    550: 0.5, 600: 0.45, 650: 0.4, 700: 0.35, 750: 0.3,
    800: 0.25, 850: 0.21, 900: 0.17, 950: 0.12
}
```

**OKLCH Color Space:** Uses perceptually uniform color space ensuring consistent lightness across all hues.

---

### Scales

```ts
import { useScaleDesignTokens, useScalePowersDesignTokens, scaleValues } from '@styleframe/theme';

// Scale ratios (based on musical intervals).
// Keys are hyphenated: "minor-second", "major-second", "minor-third", "major-third",
// "perfect-fourth", "augmented-fourth", "perfect-fifth", and "golden".
const { scale, scalePerfectFourth, scaleGolden } = useScaleDesignTokens(s, {
    ...scaleValues,
    default: '@scale.minor-third', // Set default scale via @ reference
});

// Generate scale powers for multipliers (default range: -4..5)
const scalePowers = useScalePowersDesignTokens(s, scale, [-3, -2, -1, 0, 1, 2, 3, 4, 5]);
```

**Available Scale Ratios:**

| Key | Ratio | Use Case |
|------------|-------|----------|
| `minor-second` | 1.067 | Very subtle, minimal designs |
| `major-second` | 1.125 | Subtle, clean designs |
| `minor-third` | 1.2 | **Balanced, most websites** |
| `major-third` | 1.25 | Distinct, marketing sites |
| `perfect-fourth` | 1.333 | Bold, editorial content |
| `augmented-fourth` | 1.414 | Dramatic contrast |
| `perfect-fifth` | 1.5 | Landing pages, hero sections |
| `golden` | 1.618 | Art, design-forward sites |

---

### Spacing

```ts
import { useSpacingDesignTokens, useMultiplierDesignTokens } from '@styleframe/theme';

const { spacing } = useSpacingDesignTokens(s, { default: '1rem' });

// Scale-based spacing using scale powers
const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } =
    useMultiplierDesignTokens(s, spacing, {
        xs: scalePowers[-2],
        sm: scalePowers[-1],
        md: scalePowers[0],
        lg: scalePowers[1],
        xl: scalePowers[2],
    });
```

### Spacing Utilities with Multiplier Support

Spacing utilities support multiplier values that generate `calc()` expressions:

```ts
import { useMarginUtility, usePaddingUtility, useGapUtility } from '@styleframe/theme';

// Create utility with named values
const createMargin = useMarginUtility(s, {
    sm: ref(spacingSm),
    md: ref(spacingMd),
});

// Add multiplier values using array syntax (with @ prefix)
createMargin(["@1.5", "@2", "@0.5", "@-1"]);

// Generates: _margin:1.5, _margin:2, _margin:0.5, _margin:-1
// CSS: calc(var(--spacing) * multiplier)
```

**Note:** Multiplier values require the base `spacing` variable to be defined.

---

### Typography

```ts
import {
    useFontFamilyDesignTokens,
    useFontSizeDesignTokens,
    useFontWeightDesignTokens,
    useFontStyleDesignTokens,
    useLineHeightDesignTokens,
    useLetterSpacingDesignTokens,
    fontFamilyValues,
    fontWeightValues
} from '@styleframe/theme';

// Font families
const { fontFamily, fontFamilyMono, fontFamilyPrint } = useFontFamilyDesignTokens(s);

// Font sizes (with scale)
const { fontSize } = useFontSizeDesignTokens(s, { default: '1rem' });
const { fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl, fontSize2xl } =
    useMultiplierDesignTokens(s, fontSize, {
        sm: scalePowers[-1],
        md: scalePowers[0],
        lg: scalePowers[1],
        xl: scalePowers[2],
        '2xl': scalePowers[3],
    });

// Font weights
const { fontWeightNormal, fontWeightMedium, fontWeightSemibold, fontWeightBold } =
    useFontWeightDesignTokens(s);

// Line heights
const { lineHeightTight, lineHeightSnug, lineHeightNormal, lineHeightRelaxed } =
    useLineHeightDesignTokens(s);

// Letter spacing
const { letterSpacingTight, letterSpacingNormal, letterSpacingWide } =
    useLetterSpacingDesignTokens(s);
```

**Default Font Weights:**
```ts
fontWeightValues = {
    default: '@font-weight.normal',
    extralight: 200,
    light: 300,
    normal: 'normal',
    medium: 500,
    semibold: 600,
    bold: 'bold',
    black: 900,
    lighter: 'lighter',
    bolder: 'bolder',
    inherit: 'inherit',
}
```

---

### Breakpoints

```ts
import { useBreakpointDesignTokens, breakpointValues } from '@styleframe/theme';

const { breakpointXs, breakpointSm, breakpointMd, breakpointLg, breakpointXl } =
    useBreakpointDesignTokens(s, breakpointValues);
```

**Default Breakpoint Values:**
```ts
breakpointValues = {
    xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, '2xl': 1440
}
```

---

### Borders

```ts
import {
    useBorderWidthDesignTokens,
    useBorderRadiusDesignTokens,
    useBorderStyleDesignTokens,
    useBorderColorDesignTokens,
    useBoxShadowDesignTokens
} from '@styleframe/theme';

const { borderWidthThin, borderWidthMedium, borderWidthThick } =
    useBorderWidthDesignTokens(s, {
        thin: '1px',
        medium: '2px',
        thick: '4px',
    });

const { borderRadiusSm, borderRadiusMd, borderRadiusLg, borderRadiusFull } =
    useBorderRadiusDesignTokens(s, {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
    });

const { boxShadowSm, boxShadowMd, boxShadowLg } =
    useBoxShadowDesignTokens(s, {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    });
```

---

### Easing (Animation Timing Functions)

```ts
import { useEasingDesignTokens, easingValues } from '@styleframe/theme';

// Use all default easing values
const {
    easing,                // Base variable
    easingLinear,          // linear
    easingEase,            // ease
    easingEaseIn,          // ease-in
    easingEaseOut,         // ease-out
    easingEaseInOut,       // ease-in-out
    easingEaseInCubic,     // cubic-bezier(0.55, 0.055, 0.675, 0.19)
    easingEaseOutCubic,    // cubic-bezier(0.215, 0.61, 0.355, 1)
    easingEaseInOutCubic,  // cubic-bezier(0.645, 0.045, 0.355, 1)
    easingSpring,          // linear() spring animation
    easingBounce,          // linear() bounce animation
} = useEasingDesignTokens(s, easingValues);

// Or use custom subset
const { easingEaseOut, easingSpring } = useEasingDesignTokens(s, {
    'ease-out': 'ease-out',
    spring: easingValues.spring,
});

// Apply to selectors
selector('.button', {
    transition: css`all 200ms ${ref(easingEaseOutCubic)}`,
});

selector('.modal', {
    animation: css`slide-in 300ms ${ref(easingSpring)}`,
});
```

**Available Easing Values:**

| Category | Easings |
|----------|---------|
| CSS Keywords | `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out` |
| Sine | `ease-in-sine`, `ease-out-sine`, `ease-in-out-sine` |
| Quad | `ease-in-quad`, `ease-out-quad`, `ease-in-out-quad` |
| Cubic | `ease-in-cubic`, `ease-out-cubic`, `ease-in-out-cubic` |
| Quart | `ease-in-quart`, `ease-out-quart`, `ease-in-out-quart` |
| Quint | `ease-in-quint`, `ease-out-quint`, `ease-in-out-quint` |
| Expo | `ease-in-expo`, `ease-out-expo`, `ease-in-out-expo` |
| Circ | `ease-in-circ`, `ease-out-circ`, `ease-in-out-circ` |
| Back | `ease-in-back`, `ease-out-back`, `ease-in-out-back` |
| Special | `spring`, `bounce` (using `linear()` function) |

**Easing Recommendations:**
- **UI Interactions**: `ease-out-cubic` or `ease-out-quad` - fast start, smooth finish
- **Enter animations**: `ease-out` variants - elements appear naturally
- **Exit animations**: `ease-in` variants - elements leave naturally
- **Playful UI**: `spring` or `bounce` - adds character to interactions
- **Back easings**: Include overshoot - good for attention-grabbing animations

---

## Fluid Design

### Fluid Viewport Setup

```ts
import { useFluidViewportDesignTokens } from '@styleframe/theme';

// Default: 320px - 1440px viewport range
useFluidViewportDesignTokens(s);

// Custom range
useFluidViewportDesignTokens(s, {
    minWidth: 375,  // Start scaling at 375px
    maxWidth: 1920  // Stop scaling at 1920px
});
```

---

### Fluid Clamp for Custom Values

```ts
import { useFluidViewportDesignTokens, useFluidClamp, useSpacingDesignTokens } from '@styleframe/theme';

useFluidViewportDesignTokens(s);

// Create a fluid spacing variable (scales from 24px to 48px)
const { spacingLg } = useSpacingDesignTokens(s, {
    lg: useFluidClamp(s, { min: 24, max: 48 })
});

selector('.hero', {
    padding: ref(spacingLg), // Smoothly scales with viewport
});
```

---

### Fluid Typography

```ts
import {
    useFluidViewportDesignTokens,
    useFluidFontSizeDesignTokens,
    useScaleDesignTokens,
    useScalePowersDesignTokens,
    scaleValues,
} from '@styleframe/theme';

// Set up fluid viewport range (320px - 1440px)
useFluidViewportDesignTokens(s);

// Define scales for mobile and desktop
const { scaleMin, scaleMax } = useScaleDesignTokens(s, {
    ...scaleValues,
    min: '@scale.minor-third',   // Minor Third (1.2) for mobile
    max: '@scale.major-third'    // Major Third (1.25) for desktop
});

// Calculate scale powers
const scaleMinPowers = useScalePowersDesignTokens(s, scaleMin);
const scaleMaxPowers = useScalePowersDesignTokens(s, scaleMax);

// Generate fluid font sizes
const {
    fontSize,
    fontSizeXs,
    fontSizeSm,
    fontSizeMd,
    fontSizeLg,
    fontSizeXl,
    fontSize2xl,
} = useFluidFontSizeDesignTokens(s,
    { min: 16, max: 18 },  // Base font size range (16px on mobile, 18px on desktop)
    {
        xs: { min: scaleMinPowers[-2], max: scaleMaxPowers[-2] },
        sm: { min: scaleMinPowers[-1], max: scaleMaxPowers[-1] },
        md: { min: scaleMinPowers[0], max: scaleMaxPowers[0] },
        lg: { min: scaleMinPowers[1], max: scaleMaxPowers[1] },
        xl: { min: scaleMinPowers[2], max: scaleMaxPowers[2] },
        '2xl': { min: scaleMinPowers[3], max: scaleMaxPowers[3] },
        default: '@font-size.md'
    }
);

// Apply to elements
selector('body', { fontSize: ref(fontSize) });
selector('h1', { fontSize: ref(fontSize2xl) });
selector('h2', { fontSize: ref(fontSizeXl) });
selector('h3', { fontSize: ref(fontSizeLg) });
```

---

## Fluid Design Composable Reference

| Composable | Purpose | Use Case |
|------------|---------|----------|
| `useFluidViewportDesignTokens()` | Set up fluid viewport ranges | Define min/max viewport widths |
| `useFluidClamp()` | Create fluid `calc()` calculations | Custom fluid properties (spacing, sizing) |
| `useFluidFontSizeDesignTokens()` | Generate fluid typography scales | Complete fluid type systems |

---

## IMPORTANT Notes

1. **Token composables use `{ default: true }` internally** - safe to call multiple times
2. **Color levels use OKLCH color space** for perceptually uniform colors
3. **Scale powers can be negative** (smaller) or positive (larger); the default range is `-4..5`
4. **`useMultiplierDesignTokens` creates calc() expressions** referencing the base variable
5. **Call `useFluidViewportDesignTokens()` BEFORE** using other fluid composables
6. **Fluid design eliminates media query breakpoints** - values scale smoothly
7. **The `default` key generates the base variable name without suffix** - e.g., `useFontSizeDesignTokens(s, { default: '1rem' })` returns `{ fontSize }` not `{ fontSizeDefault }`, generates CSS variable `--font-size` not `--font-size--default`, and utility class `._font-size` not `._font-size:default`. This applies to all theme composables: `useColorDesignTokens` returns `color`, `useSpacingDesignTokens` returns `spacing`, etc.

---

## Choosing Scales

**For Mobile (tight scale - 1.125 to 1.2):**
- Prevents text from becoming too large on small screens
- Maintains readability with limited space

**For Desktop (dramatic scale - 1.25 to 1.5):**
- Enhances visual hierarchy with more screen space
- Creates stronger contrast between heading levels

**Recommended Combinations:**
- Conservative: Minor Third (1.2) → Major Third (1.25)
- Balanced: Minor Third (1.2) → Perfect Fourth (1.333)
- Bold: Major Third (1.25) → Perfect Fifth (1.5)
