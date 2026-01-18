# Styleframe Design Token Composables

## @styleframe/theme Package

### Colors

```ts
import {
    useColor,
    useColorLightness,
    useColorShade,
    useColorTint,
    defaultColorLightnessValues,
    defaultColorShadeValues,
    defaultColorTintValues
} from '@styleframe/theme';

// Base colors
const { colorPrimary, colorSecondary } = useColor(s, {
    primary: '#006cff',
    secondary: '#6c757d',
} as const);

// Lightness variants (absolute: sets L channel to specific value in OKLCH)
// Generates: colorPrimary50, colorPrimary100, ..., colorPrimary950
const { colorPrimary100, colorPrimary500, colorPrimary900 } =
    useColorLightness(s, colorPrimary, defaultColorLightnessValues);

// Shade variants (relative: subtracts from L channel - darker)
const { colorPrimaryShade100 } = useColorShade(s, colorPrimary, { 100: 10 } as const);

// Tint variants (relative: adds to L channel - lighter)
const { colorPrimaryTint100 } = useColorTint(s, colorPrimary, { 100: 10 } as const);
```

**Default Lightness Values:**
```ts
defaultColorLightnessValues = {
    50: 97, 100: 94, 200: 86, 300: 77, 400: 66,
    500: 55, 600: 46, 700: 39, 800: 32, 900: 25, 950: 17
}
```

**OKLCH Color Space:** Uses perceptually uniform color space ensuring consistent lightness across all hues.

---

### Scales

```ts
import { useScale, useScalePowers, defaultScaleValues } from '@styleframe/theme';

// Scale ratios (based on musical intervals)
const { scale, scalePerfectFourth, scaleGolden } = useScale(s, {
    ...defaultScaleValues,
    default: '@minor-third', // Set default scale
});

// Generate scale powers for multipliers
const scalePowers = useScalePowers(s, scale, [-3, -2, -1, 0, 1, 2, 3, 4, 5]);
```

**Available Scale Ratios:**

| Scale Name | Ratio | Use Case |
|------------|-------|----------|
| Minor Second | 1.067 | Very subtle, minimal designs |
| Major Second | 1.125 | Subtle, clean designs |
| Minor Third | 1.2 | **Balanced, most websites** |
| Major Third | 1.25 | Distinct, marketing sites |
| Perfect Fourth | 1.333 | Bold, editorial content |
| Augmented Fourth | 1.414 | Dramatic contrast |
| Perfect Fifth | 1.5 | Landing pages, hero sections |
| Golden Ratio | 1.618 | Art, design-forward sites |

---

### Spacing

```ts
import { useSpacing, useMultiplier } from '@styleframe/theme';

const { spacing } = useSpacing(s, { default: '1rem' } as const);

// Scale-based spacing using scale powers
const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } =
    useMultiplier(s, spacing, {
        xs: scalePowers[-2],
        sm: scalePowers[-1],
        md: scalePowers[0],
        lg: scalePowers[1],
        xl: scalePowers[2],
    });
```

---

### Typography

```ts
import {
    useFontFamily,
    useFontSize,
    useFontWeight,
    useFontStyle,
    useLineHeight,
    useLetterSpacing,
    defaultFontFamilyValues,
    defaultFontWeightValues
} from '@styleframe/theme';

// Font families
const { fontFamily, fontFamilyMono, fontFamilyPrint } = useFontFamily(s);

// Font sizes (with scale)
const { fontSize } = useFontSize(s, { default: '1rem' } as const);
const { fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl, fontSize2xl } =
    useMultiplier(s, fontSize, {
        sm: scalePowers[-1],
        md: scalePowers[0],
        lg: scalePowers[1],
        xl: scalePowers[2],
        '2xl': scalePowers[3],
    });

// Font weights
const { fontWeightNormal, fontWeightMedium, fontWeightSemibold, fontWeightBold } =
    useFontWeight(s);

// Line heights
const { lineHeightTight, lineHeightSnug, lineHeightNormal, lineHeightRelaxed } =
    useLineHeight(s);

// Letter spacing
const { letterSpacingTight, letterSpacingNormal, letterSpacingWide } =
    useLetterSpacing(s);
```

**Default Font Weights:**
```ts
defaultFontWeightValues = {
    thin: 100, extraLight: 200, light: 300, normal: 400,
    medium: 500, semibold: 600, bold: 700, extraBold: 800, black: 900
}
```

---

### Breakpoints

```ts
import { useBreakpoint, defaultBreakpointValues } from '@styleframe/theme';

const { breakpointXs, breakpointSm, breakpointMd, breakpointLg, breakpointXl } =
    useBreakpoint(s, defaultBreakpointValues);
```

**Default Breakpoint Values:**
```ts
defaultBreakpointValues = {
    xs: 0, sm: 576, md: 992, lg: 1200, xl: 1440
}
```

---

### Borders

```ts
import {
    useBorderWidth,
    useBorderRadius,
    useBorderStyle,
    useBoxShadow
} from '@styleframe/theme';

const { borderWidthThin, borderWidthMedium, borderWidthThick } =
    useBorderWidth(s, {
        thin: '1px',
        medium: '2px',
        thick: '4px',
    } as const);

const { borderRadiusSm, borderRadiusMd, borderRadiusLg, borderRadiusFull } =
    useBorderRadius(s, {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
    } as const);

const { boxShadowSm, boxShadowMd, boxShadowLg } =
    useBoxShadow(s, {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    } as const);
```

---

### Easing (Animation Timing Functions)

```ts
import { useEasing, defaultEasingValues } from '@styleframe/theme';

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
} = useEasing(s, defaultEasingValues);

// Or use custom subset
const { easingEaseOut, easingSpring } = useEasing(s, {
    'ease-out': 'ease-out',
    spring: defaultEasingValues.spring,
} as const);

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

## @styleframe/pro Package (Fluid Design)

### Fluid Viewport Setup

```ts
import { useFluidViewport } from '@styleframe/pro';

// Default: 320px - 1440px viewport range
useFluidViewport(s);

// Custom range
useFluidViewport(s, {
    minWidth: 375,  // Start scaling at 375px
    maxWidth: 1920  // Stop scaling at 1920px
});
```

---

### Fluid Clamp for Custom Values

```ts
import { useFluidViewport, useFluidClamp } from '@styleframe/pro';
import { useSpacing } from '@styleframe/theme';

useFluidViewport(s);

// Create a fluid spacing variable (scales from 24px to 48px)
const { spacingLg } = useSpacing(s, {
    lg: useFluidClamp(s, { min: 24, max: 48 })
});

selector('.hero', {
    padding: ref(spacingLg), // Smoothly scales with viewport
});
```

---

### Fluid Typography

```ts
import { useFluidViewport, useFluidFontSize } from '@styleframe/pro';
import { useScale, useScalePowers, defaultScaleValues } from '@styleframe/theme';

// Set up fluid viewport range (320px - 1440px)
useFluidViewport(s);

// Define scales for mobile and desktop
const { scaleMin, scaleMax } = useScale(s, {
    ...defaultScaleValues,
    min: '@minor-third',   // Minor Third (1.2) for mobile
    max: '@major-third'    // Major Third (1.25) for desktop
});

// Calculate scale powers
const scaleMinPowers = useScalePowers(s, scaleMin);
const scaleMaxPowers = useScalePowers(s, scaleMax);

// Generate fluid font sizes
const {
    fontSize,
    fontSizeXs,
    fontSizeSm,
    fontSizeMd,
    fontSizeLg,
    fontSizeXl,
    fontSize2xl,
} = useFluidFontSize(s,
    { min: 16, max: 18 },  // Base font size range (16px on mobile, 18px on desktop)
    {
        xs: { min: scaleMinPowers[-2], max: scaleMaxPowers[-2] },
        sm: { min: scaleMinPowers[-1], max: scaleMaxPowers[-1] },
        md: { min: scaleMinPowers[0], max: scaleMaxPowers[0] },
        lg: { min: scaleMinPowers[1], max: scaleMaxPowers[1] },
        xl: { min: scaleMinPowers[2], max: scaleMaxPowers[2] },
        '2xl': { min: scaleMinPowers[3], max: scaleMaxPowers[3] },
        default: '@md'
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
| `useFluidViewport()` | Set up fluid viewport ranges | Define min/max viewport widths |
| `useFluidClamp()` | Create fluid `calc()` calculations | Custom fluid properties (spacing, sizing) |
| `useFluidFontSize()` | Generate fluid typography scales | Complete fluid type systems |

---

## IMPORTANT Notes

1. **ALWAYS use `as const`** on value objects for proper TypeScript inference
2. **Token composables use `{ default: true }` internally** - safe to call multiple times
3. **Lightness uses OKLCH color space** for perceptually uniform colors
4. **Scale powers can be negative** (smaller) or positive (larger)
5. **`useMultiplier` creates calc() expressions** referencing the base variable
6. **Call `useFluidViewport()` BEFORE** using other fluid composables
7. **Fluid design eliminates media query breakpoints** - values scale smoothly
8. **The `default` key generates the base variable name without suffix** - e.g., `useFontSize(s, { default: '1rem' })` returns `{ fontSize }` not `{ fontSizeDefault }`, generates CSS variable `--font-size` not `--font-size--default`, and utility class `._font-size` not `._font-size:default`. This applies to all theme composables: `useColor` returns `color`, `useSpacing` returns `spacing`, etc.

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
