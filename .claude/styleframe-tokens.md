# Styleframe Design Token Composables (`@styleframe/theme`)

Catalog of the theme package's composables, verified against `theme/src/`. Import
composables from `@styleframe/theme` and the `styleframe()` factory from `styleframe`.

Package layout (`theme/src/`):

| Directory | Contents |
|-----------|----------|
| `variables/` | `use<X>DesignTokens` composables (CSS variables), incl. `variables/fluid/` |
| `values/` | `<category>Values` default value constants |
| `utilities/` | `use<X>Utility` composables (~300, grouped by CSS area) |
| `modifiers/` | `use<Group>Modifiers` + individual `use<X>Modifier` composables |
| `presets/` | `use<X>Preset` batteries-included bundles |
| `elements/` | `use<Tag>Element` base HTML element styles |
| `states/` | `useFocusState`, `useSelectionState` |
| `sanitize/` | sanitize.css selector groups |
| `recipes/` | component recipes — see `.claude/styleframe-recipes.md` |
| `utils/` | factories: `createUseVariable`, `createUseDerivedVariable`, `createUseUtility`, `createUseSpacingUtility`, `createUseRecipe` |

## Common Signature

All variable composables are built with `createUseVariable(propertyName, options)` and share:

```ts
use<X>DesignTokens(
    s,                        // Styleframe instance / declarations context — always first
    tokens?,                  // Record<string, TokenValue>; falls back to <category>Values
    options?: {
        default?: boolean;    // defaults to TRUE: existing variables win, so presets
                              // never clobber user-defined values — safe to call repeatedly
        breakpoint?: Variable | Reference;  // fluid-aware composables only
    },
): Record<CamelCaseName, Variable>
```

Key behaviors (from `theme/src/utils/createUseVariable.ts`):

- The **`default` key** in a value map creates the base variable without a suffix:
  `{ default: '1rem' }` → variable `spacing` (`--spacing`), returned as `{ spacing }`, not
  `{ spacingDefault }`. `default` values are usually `@` references to another key
  (e.g. `default: '@spacing.md'`).
- Other keys become `<property>.<key>` variables returned camelCased:
  `spacing.2xs` → `spacing2xs`, `font-size.md` → `fontSizeMd`.
- `"@path.to.token"` string values become references; reference values are created after
  plain values so they resolve.
- Derived composables (built with `createUseDerivedVariable`) take a **parent variable**
  second: `use<X>DesignTokens(s, parentVariable, values, options?)`.

## Full Composable List (`theme/src/variables/`)

`useBorderColorDesignTokens`, `useBorderRadiusDesignTokens`, `useBorderStyleDesignTokens`,
`useBorderWidthDesignTokens`, `useBoxShadowDesignTokens`, `useBreakpointDesignTokens`,
`useColorDesignTokens`, `useColorLevelDesignTokens`, `useColorShadeDesignTokens`,
`useColorTintDesignTokens`, `useDurationDesignTokens`, `useEasingDesignTokens`,
`useFontFamilyDesignTokens`, `useFontSizeDesignTokens`, `useFontStyleDesignTokens`,
`useFontWeightDesignTokens`, `useLetterSpacingDesignTokens`, `useLineHeightDesignTokens`,
`useMultiplierDesignTokens`, `useScaleDesignTokens`, `useScalePowersDesignTokens`,
`useSpacingDesignTokens`, `useZIndexDesignTokens`, plus `variables/fluid/`:
`useFluidViewportDesignTokens`, `useFluidClamp`.

Default value constants live in `theme/src/values/` as `<category>Values`
(e.g. `colorValues`, `spacingValues`, `scaleValues`, `easingValues`, `breakpointValues`,
`zIndexValues`, `durationValues`, `fontSizeStaticValues`, `colorLevelValues`, …).

---

## Colors

```ts
import {
    useColorDesignTokens,
    useColorLevelDesignTokens,
    useColorShadeDesignTokens,
    useColorTintDesignTokens,
    colorValues, colorLevelValues, colorShadeValues, colorTintValues,
} from '@styleframe/theme';

// Base colors — values are normalized to oklch(l c h / alpha) when parseable
const { colorPrimary, colorSecondary } = useColorDesignTokens(s, {
    primary: '#007A99',
    secondary: '#406AD4',
});

// Absolute lightness levels (sets the OKLCH L channel): colorPrimary50..colorPrimary950
const levels = useColorLevelDesignTokens(s, colorPrimary, colorLevelValues);

// Relative shades (darker; values are percentage points subtracted from L)
const { colorPrimaryShade50, colorPrimaryShade100 } =
    useColorShadeDesignTokens(s, colorPrimary, colorShadeValues);

// Relative tints (lighter; percentage points added to L)
const { colorPrimaryTint50, colorPrimaryTint100 } =
    useColorTintDesignTokens(s, colorPrimary, colorTintValues);
```

Defaults:

- `colorValues`: primitives `primary`, `secondary`, `success`, `warning`, `error`, `info`,
  `gray`, `white`, `black`; surfaces `background`, `surface`; text `text`, `text-inverted`,
  `text-weak`, `text-weaker`, `text-weakest`. `darkModeColorValues` overrides surfaces/text
  for dark themes.
- `colorLevelValues` (L channel, 0–1): `50: 0.97`, `100: 0.93`, `150: 0.89`, `200: 0.85`,
  `250: 0.8`, `300: 0.75`, `350: 0.7`, `400: 0.65`, `450: 0.6`, `500: 0.55`, `550: 0.5`,
  `600: 0.45`, `650: 0.4`, `700: 0.35`, `750: 0.3`, `800: 0.25`, `850: 0.21`, `900: 0.17`,
  `950: 0.12`.
- `colorShadeValues` / `colorTintValues`: `"shade-50": 5` … `"shade-200": 20` (and tint
  equivalents). Derived names use the `-` delimiter: `color.primary-shade-50`,
  `color.primary-100`.

OKLCH gives perceptually uniform lightness across hues (`theme/src/utils/oklchGamut.ts`).

---

## Scale & Scale Powers

```ts
import { useScaleDesignTokens, useScalePowersDesignTokens, scaleValues } from '@styleframe/theme';

const { scale, scaleMinorThird, scaleGolden } = useScaleDesignTokens(s);
// scaleValues keys are hyphenated: "minor-second" (1.067), "major-second" (1.125),
// "minor-third" (1.2), "major-third" (1.25), "perfect-fourth" (1.333),
// "augmented-fourth" (1.414), "perfect-fifth" (1.5), "golden" (1.618),
// default: "@scale.minor-third"

// Powers of the scale as CSS calc chains (NOT variables):
// useScalePowersDesignTokens(s, scale: Variable | Reference, powers?: readonly number[])
// -> Record<number, TokenValue>. Default powers: scalePowerValues = [-4..5].
const scalePowers = useScalePowersDesignTokens(s, scale);
// scalePowers[2]  === css`${ref(scale)} * ${ref(scale)}`
// scalePowers[-1] === css`1 / ${ref(scale)}`
```

Guidance: minor-second/major-second = subtle; minor-third = balanced default; major-third =
marketing; perfect-fourth/fifth = bold/editorial; golden = design-forward.

## Spacing & Multipliers

```ts
import { useSpacingDesignTokens, useMultiplierDesignTokens, spacingValues } from '@styleframe/theme';

const { spacing, spacingXs, spacingMd, spacingXl } = useSpacingDesignTokens(s);
// spacingValues: default "@spacing.md", 2xs 0.25rem, xs 0.5rem, sm 0.75rem, md 1rem,
//                lg 1.5rem, xl 2rem, 2xl 3rem, 3xl 4rem

// Derive tokens as calc(parent * value) — works with scale powers:
const { spacingXs2, spacingLg2 } = useMultiplierDesignTokens(s, spacing, {
    xs2: scalePowers[-2],
    lg2: scalePowers[1],
});
// each value becomes css`calc(${ref(spacing)} * ${value})`
```

Spacing **utilities** additionally support `@`-prefixed numeric multipliers (see the
Utilities section and `.claude/styleframe-recipes.md`).

## Typography

```ts
import {
    useFontFamilyDesignTokens,   // fontFamilyValues: default "@font-family.base", base, print, mono
    useFontSizeDesignTokens,     // fontSizeStaticValues: default "@font-size.md", 3xs..4xl (0.5rem..2.25rem)
    useFontStyleDesignTokens,    // fontStyleValues: default "@font-style.normal", italic, oblique, normal, inherit
    useFontWeightDesignTokens,   // fontWeightValues: default "@font-weight.normal", extralight 200, light 300,
                                 //   normal, medium 500, semibold 600, bold, black 900, lighter, bolder, inherit
    useLineHeightDesignTokens,   // lineHeightValues: default "@line-height.normal", tight 1.2, snug 1.35,
                                 //   normal 1.5, relaxed 1.65, loose 1.9
    useLetterSpacingDesignTokens, // letterSpacingValues: default "@letter-spacing.normal", tighter -0.05em,
                                 //   tight -0.025em, normal, wide 0.05em, wider 0.1em
} from '@styleframe/theme';

const { fontFamily, fontFamilyMono, fontFamilyPrint } = useFontFamilyDesignTokens(s);
const { fontSize, fontSizeSm, fontSizeMd, fontSizeLg, fontSize2xl } = useFontSizeDesignTokens(s);
const { fontWeightMedium, fontWeightSemibold, fontWeightBold } = useFontWeightDesignTokens(s);
```

`useFontSizeDesignTokens` is **fluid-aware** (built with `fluid: true`): see Fluid Design.

## Breakpoints, Borders, Shadows, Z-Index, Motion

```ts
import {
    useBreakpointDesignTokens,   // breakpointValues: xs 0, sm 576, md 768, lg 992, xl 1200, 2xl 1440 (no default key)
    useBorderWidthDesignTokens,  // borderWidthValues: default "@border-width.thin", none 0, thin, medium, thick (CSS keywords)
    useBorderRadiusDesignTokens, // borderRadiusValues: default "@border-radius.md", none 0, sm 0.125rem, md 0.25rem,
                                 //   lg 0.5rem, xl 0.75rem, 2xl 1rem, full 9999px
    useBorderStyleDesignTokens,  // borderStyleValues: default "@border-style.solid", none, solid, dashed, dotted,
                                 //   double, groove, inset, outset
    useBorderColorDesignTokens,  // borderColorValues: default "@color.gray-200", primary..info as @color refs
                                 //   (darkModeBorderColorValues: default "@color.gray-700")
    useBoxShadowDesignTokens,    // boxShadowValues: default "@box-shadow.md", none, xs..2xl, inner, ring
                                 //   (layered oklch shadows using var(--box-shadow-color, 0 0 0))
    useZIndexDesignTokens,       // zIndexValues: default "@z-index.base", hide -1, base 0, dropdown 100, sticky 200,
                                 //   overlay 300, modal 400, popover 500, toast 600, max 9999, auto
    useDurationDesignTokens,     // durationValues: instant 0ms, fastest 50ms, faster 100ms, fast 150ms,
                                 //   normal 250ms, slow 300ms, slower 500ms, slowest 1000ms (no default key)
    useEasingDesignTokens,       // easingValues — see below (no default key)
} from '@styleframe/theme';
```

Note: `breakpointValues`, `durationValues`, and `easingValues` have **no `default` key**, so
no suffix-less base variable (`breakpoint`/`duration`/`easing`) is created by default —
destructure named keys only (`durationFast`, `easingEaseOut`, …).

### Easing values

CSS keywords `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`; cubic-bezier families
`ease-{in,out,in-out}-{sine,quad,cubic,quart,quint,expo,circ,back}`; and `spring` / `bounce`
built with the CSS `linear()` function.

```ts
const { easingEaseOutCubic, easingSpring } = useEasingDesignTokens(s);
selector('.button', { transition: css`all 200ms ${ref(easingEaseOutCubic)}` });
```

Recommendations: UI interactions `ease-out-cubic`/`ease-out-quad`; enter = `ease-out`
variants; exit = `ease-in` variants; playful = `spring`/`bounce`; `*-back` easings
overshoot.

---

## Fluid Design (`theme/src/variables/fluid/`)

```ts
import { useFluidViewportDesignTokens, useFluidClamp } from '@styleframe/theme';

// 1. Set up the interpolator (REQUIRED before any fluid value resolves).
//    Creates fluid.min-width, fluid.max-width, fluid.screen, fluid.breakpoint,
//    plus a media query locking fluid.screen above maxWidth.
useFluidViewportDesignTokens(s);                              // 320–1440 default
useFluidViewportDesignTokens(s, { minWidth: 375, maxWidth: 1920 });

// 2. One-off fluid values on any property.
//    useFluidClamp(s, range, breakpoint?) — range is [min, max] tuple or { min, max }
//    object of absolute pixel values; returns a calc() TokenValue.
const { spacingLg } = useSpacingDesignTokens(s, {
    lg: useFluidClamp(s, { min: 24, max: 48 }),
});

// 3. Fluid typography — useFontSizeDesignTokens routes range values through
//    useFluidClamp automatically; plain values stay static.
const { fontSize, fontSizeMd, fontSizeLg } = useFontSizeDesignTokens(s, {
    default: '@font-size.md',
    sm: '0.875rem',            // fixed
    md: [16, 18],              // fluid (tuple, absolute px)
    lg: { min: 18, max: 24 },  // fluid (object form)
});
```

Fluid-aware composables also accept a `breakpoint` option (defaults to
`ref('fluid.breakpoint')`). `useDesignTokensPreset` enables a fluid font-size scale by
default (see Presets).

---

## Utilities (`theme/src/utilities/`)

~300 `use<X>Utility` composables grouped by area: `accessibility`, `backgrounds`,
`borders`, `effects`, `filters`, `flexbox-grid`, `interactivity`, `layout`, `sizing`,
`spacing`, `svg`, `tables`, `transforms`, `transitions-animation`, `typography`.

Shared signature (from `createUseUtility`):

```ts
use<X>Utility(
    s: Styleframe,
    values?: Record<string, TokenValue>,          // named values registered immediately
    modifiers?: (ModifierFactory | ModifierFactory[])[],
    utilityOptions?: { name?: string },           // override the class-name prefix
): UtilityCreatorFn                                // call again to add more values
```

Spacing utilities (`useMarginUtility`, `usePaddingUtility`, `useGapUtility`, directional
variants — built with `createUseSpacingUtility`) support multipliers via array syntax:

```ts
const createMargin = useMarginUtility(s, { sm: ref(spacingSm) });
createMargin(['@1.5', '@2', '@-1']);
// ._margin:1.5 { margin: calc(var(--spacing, 1rem) * 1.5); } etc.
```

They use `namespace: "spacing"`, so `"@sm"` in array syntax resolves to
`ref("spacing.sm")`.

## Modifiers (`theme/src/modifiers/`)

Eight group composables, each registering a set of `s.modifier(...)` factories and
returning them: `usePseudoStateModifiers` (hover, focus, active, …),
`useFormStateModifiers` (disabled, checked, valid, …), `useStructuralModifiers` (first,
last, odd, even, …), `usePseudoElementModifiers` (before, after, placeholder, …),
`useMediaPreferenceModifiers` (dark, print, motion-safe, …), `useAriaStateModifiers`
(aria-expanded, …), `useDirectionalModifiers` (rtl, ltr), `useOtherStateModifiers` (open,
inert). Individual `use<X>Modifier` functions are also exported.

## Presets (`theme/src/presets/`)

| Preset | Purpose |
|--------|---------|
| `useDesignTokensPreset(s, config?)` | All design-token domains in dependency order. Each domain key (`spacing`, `colors`, `fontSize`, `borderColor`, `zIndex`, `easing`, `duration`, `breakpoint`, `scale`, `boxShadow`, …) accepts a custom record (merged over defaults), or `false` to disable. `meta.merge: false` replaces defaults instead of merging; `meta.colors` controls level/shade/tint generation (`generateLevels`, `levels`, `overrides`, …). `fluidViewport` (default on, 320–1440), `fluidFontSize` (default on), `fluidScale` (`{ min: "@scale.major-second", max: "@scale.major-third" }`) configure the fluid system. `themes` provides per-theme (e.g. dark) overrides. Returns all created variables flat, plus nested `scalePowers`. |
| `useUtilitiesPreset(s, config?)` | Registers all utilities with default values; `names` maps default utility names to custom class prefixes. |
| `useShorthandUtilitiesPreset(s, config?)` | `useUtilitiesPreset` with Tailwind-style names (`margin`→`m`, `padding`→`p`, `width`→`w`, …). |
| `useModifiersPreset(s, config?)` | All eight modifier groups; disable a category with `{ pseudoStates: false, … }`. Returns the flat modifier instances. |
| `useSanitizePreset(s, config?)` | sanitize.css normalization: `base`, `forms`, `typography`, `reduceMotion` — each defaults on, disable with `false`. |
| `useGlobalPreset(s, config?)` | Base HTML element styles (`use<Tag>Element` from `elements/`: body, headings, links, code, lists, …) plus `states/` (`useFocusState`, `useSelectionState`). |

---

## IMPORTANT Notes

1. **Variable composables default to `{ default: true }`** — an existing variable with the
   same name wins, so calling a composable (or preset) after user definitions never
   overwrites them. Pass `{ default: false }` to force-update.
2. **The `default` key generates the suffix-less base variable** — `{ default: '1rem' }`
   returns `{ spacing }` (CSS `--spacing`), not `{ spacingDefault }`. Applies to all
   variable composables.
3. **Color levels/shades/tints operate in OKLCH**; derived color names use `-`
   (`color.primary-100`, `color.primary-shade-50`).
4. **`useScalePowersDesignTokens` returns calc-chain `TokenValue`s keyed by power** (not
   variables); default powers `[-4..5]`.
5. **`useMultiplierDesignTokens` creates `calc(parent * value)` variables** referencing the
   parent variable.
6. **Call `useFluidViewportDesignTokens(s)` before** anything that uses fluid ranges;
   `useDesignTokensPreset` does this for you unless `fluidViewport: false`.
7. **Composable naming**: `use<X>DesignTokens` (variables), `use<X>Utility`,
   `use<Group>Modifiers` / `use<X>Modifier`, `use<X>Preset`, `use<Tag>Element`,
   `use<Name>Recipe`. Default values are `<category>Values` in `theme/src/values/`.
