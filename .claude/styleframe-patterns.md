# Styleframe Common Patterns

Source-verified patterns for wiring Styleframe into a project and structuring styling
code. API details: `.claude/styleframe-api.md`. Recipe system: `.claude/styleframe-recipes.md`.
Token catalog: `.claude/styleframe-tokens.md`.

## Single-Instance Architecture

Styleframe projects have three layers sharing **one** global instance:

1. **`styleframe.config.ts`** (project root) — creates the instance; tokens, presets, utilities
2. **`*.styleframe.ts`** files — co-located extension files that add component styles to the same instance
3. **App code** — consumes `virtual:styleframe.css` (styles) and `virtual:styleframe` (recipe functions, exported selectors)

### The config file

Loaded by the plugin from `./styleframe.config.ts` (override with the `entry` plugin
option; the standalone loader also resolves `.mts/.cts/.js/.mjs/.cjs`). **Must
default-export the instance.**

```ts
// styleframe.config.ts
import { styleframe } from 'styleframe';
import { useDesignTokensPreset, useUtilitiesPreset, useModifiersPreset } from '@styleframe/theme';

const s = styleframe();

useDesignTokensPreset(s);   // color/spacing/typography/border/... variables + dark theme
useUtilitiesPreset(s);      // registers the standard utility factories (needed by recipes)
useModifiersPreset(s);      // hover, focus, dark, motion-reduce, aria-*, rtl, ...

export default s;
```

### Extension files (`*.styleframe.ts`)

Discovered automatically by the plugin (glob `**/*.styleframe.ts`, configurable via
`include`/`exclude`; loaded alphabetically by default, `loadOrder: 'depth-first'`
optional). They import `styleframe` from **`virtual:styleframe`** — inside a
`.styleframe.ts` file this resolves to a factory returning the shared global instance,
not a new one. Default-export the instance here too.

```ts
// src/components/button.styleframe.ts
import { styleframe } from 'virtual:styleframe';
import { useButtonRecipe } from '@styleframe/theme';

const s = styleframe();               // the SAME instance created by styleframe.config.ts
const { variable, selector, recipe, ref } = s;

const buttonGap = variable('button.gap', '@spacing.sm');

// Module-level exports of recipes/selectors set their export name in virtual:styleframe
export const button = useButtonRecipe(s);
export const buttonIcon = selector('.button-icon', { marginRight: ref(buttonGap) });

export default s;
```

Export-name tracking: an `export const foo = recipe(...)` / `= selector(...)` is
re-exported from `virtual:styleframe` as `foo` (recipes without a module export fall
back to the camelCased recipe name). Named recipe imports also drive recipe
tree-shaking in builds.

### Consuming in app code

```ts
// entry (main.ts / app.vue)
import 'virtual:styleframe.css';      // all generated CSS
```

```ts
// components — recipe runtime functions return class strings
import { button, type ButtonProps } from 'virtual:styleframe';

const classes = button({ color: 'primary', size: 'md' });
// → "button _border-width:thin _background:primary _padding:md ..."
```

Utility classes can also be written directly in markup (`class="_padding:md
_hover:background:primary"`) — enable the scanner (below) so build-time CSS
tree-shaking keeps them.

---

## Plugin Setup

The unplugin lives in `@styleframe/plugin`; the `styleframe` package re-exports every
adapter under `styleframe/plugin/*` (vite, webpack, rollup, rspack, esbuild, farm,
astro, nuxt — plus bun in `@styleframe/plugin`). Prefer the `styleframe/plugin/*` paths.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import styleframe from 'styleframe/plugin/vite';

export default defineConfig({
    plugins: [styleframe()],
});
```

```ts
// nuxt.config.ts — Nuxt module also wires virtual:styleframe into Nuxt's tsconfig paths
export default defineNuxtConfig({
    modules: ['styleframe/plugin/nuxt'],
});
```

**Plugin options** (`tooling/plugin/src/plugin/types.ts`) — all optional:

```ts
styleframe({
    entry: './styleframe.config.ts',        // global config path
    silent: false,
    include: ['**/*.styleframe.ts'],        // extension file globs
    exclude: [],                            // extra ignores (node_modules/dist/etc. built in)
    loadOrder: 'alphabetical',              // or 'depth-first'
    dts: { enabled: true, outDir: '.styleframe' },
    resolve: { alias: { '@styleframe/theme': './theme/src/index.ts' } },
    scanner: {
        content: ['src/**/*.{vue,tsx,html}'],   // scan markup for _utility:value classes
        extractors: [],                          // custom Extractor[] (optional)
        utilities: undefined,                    // custom class syntax (optional)
    },
    recipes: {
        treeshake: undefined,               // default: true for build, false for dev
        include: ['button'],                // recipes to always keep
    },
    minify: true,                           // shorten class names in prod builds
    transpiler: {},                         // TranspileOptions passthrough
});
```

Behavior worth knowing:

- **Type declarations**: written to `.styleframe/` (`styleframe.d.ts` + `shims.d.ts`).
  Add `.styleframe/**/*.d.ts` to tsconfig `include`; add `.styleframe/` to `.gitignore`.
  Vue projects map `"virtual:styleframe"` in `compilerOptions.paths` (done by
  `styleframe init` / the Nuxt module).
- **HMR**: config, extension files, and their deep import dependencies are watched;
  changes selectively invalidate and reload the virtual modules.
- **CSS tree-shaking**: `virtual:styleframe.css` is always transpiled with
  `treeshake: true` — only variables recorded in `root._usage.variables` (i.e. actually
  `ref()`'d) are emitted. Utility classes are additionally pruned only when the scanner
  is configured.
- **Recipe tree-shaking** (build): named imports from `virtual:styleframe` are scanned;
  unimported recipes are dropped (namespace/dynamic imports disable this).
- `npx styleframe init` scaffolds config + plugin wiring; the CLI also has `build`,
  `dtcg`, and `figma` subcommands.

### Standalone builds (no bundler)

```ts
import { loadConfiguration, build } from 'styleframe/loader';

const instance = await loadConfiguration({ entry: 'styleframe.config' });
await build(instance, { outputDir: './styleframe' });   // writes index.css (+ index.ts)
```

`transpile(instance, { type: 'css' | 'ts' | 'dts' | 'all', treeshake, minify })` from
`styleframe/transpiler` gives you the raw output files.

---

## Composable Structure

Custom composables follow the `@styleframe/theme` conventions: take the instance first,
create tokens with `{ default: true }`, return typed tokens.

### Variable composables

`{ default: true }` makes composables override-safe: user-defined values created before
the composable runs win.

```ts
import type { Styleframe } from 'styleframe';

export function useBrandVariables(s: Styleframe) {
    const { variable } = s;

    const colorBrand = variable('color.brand', '#006cff', { default: true });
    const colorBrandContrast = variable('color.brand-contrast', '#ffffff', { default: true });

    return { colorBrand, colorBrandContrast };
}
```

### Selector composables

```ts
import type { Styleframe } from 'styleframe';
import { useBrandVariables } from './useBrandVariables';

export function useButtonSelectors(s: Styleframe) {
    const { selector, ref, css } = s;
    const { colorBrand, colorBrandContrast } = useBrandVariables(s);

    selector('.button', {
        backgroundColor: ref(colorBrand),
        color: ref(colorBrandContrast),
        padding: css`@spacing.sm @spacing.md`,
        border: 'none',
        cursor: 'pointer',

        '&:hover': { opacity: 0.9 },
        '&:focus-visible': { outline: '2px solid', outlineOffset: '2px' },
        '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
    });
}
```

### Utility composables

Create AND invoke the creator — a registered-but-never-invoked utility emits no CSS
(recipes may still invoke it later with their own values).

```ts
import type { Styleframe } from 'styleframe';

export function useSpacingUtilities(s: Styleframe) {
    const { utility } = s;

    const createPadding = utility('padding', ({ value }) => ({ padding: value }), {
        namespace: 'spacing',
    });
    const createGap = utility('gap', ({ value }) => ({ gap: value }), {
        namespace: 'spacing',
    });

    createPadding(['@sm', '@md', '@lg']);   // ._padding:sm → var(--spacing--sm), ...
    createGap(['@sm', '@md']);

    return { createPadding, createGap };
}
```

### Theme package composables

`@styleframe/theme` ships the full catalog (see `.claude/styleframe-tokens.md`):

- **Presets**: `useDesignTokensPreset`, `useUtilitiesPreset`, `useModifiersPreset`,
  `useShorthandUtilitiesPreset`, `useSanitizePreset`, `useGlobalPreset` — each takes
  `(s, config?)`, categories/domains disable with `false`.
- **Design tokens** (`use<X>DesignTokens(s, tokens?, options?)`): color, colorLevel,
  colorShade, colorTint, spacing, scale, scalePowers, multiplier, fontFamily, fontSize,
  fontWeight, fontStyle, lineHeight, letterSpacing, breakpoint, borderColor/Radius/Style/Width,
  boxShadow, duration, easing, zIndex, fluidViewport. These pass `{ default: true }`
  implicitly (opt out with `{ default: false }`).
- **Utilities** (`use<X>Utility(s, values?, modifiers?, options?)` → `UtilityCreatorFn`):
  spacing ones (`useMarginUtility`, `usePaddingUtility`, `useSpaceUtility`,
  `useGapUtility`, plus per-side variants) support **multiplier array values**:

```ts
import { useMarginUtility } from '@styleframe/theme';

const createMargin = useMarginUtility(s, { sm: '@spacing.sm', md: '@spacing.md' });
createMargin(['@1.5', '@2', '@0.5', '@-1']);
// ._margin:1.5 { margin: calc(var(--spacing) * 1.5); }  (also @2, @0.5, @-1)
```

- **Modifiers**: `useHoverModifier(s)`, `useFocusModifier(s)`, `useDarkModifier(s)`,
  `useMotionReduceModifier(s)`, aria/form/structural groups, or all at once via
  `useModifiersPreset(s)`.
- **Recipes**: `use<Name>Recipe(s, options?)` for ~40 components (button, badge, card,
  input, modal, …) with deep-merge overrides and a `filter` to drop variant options:

```ts
import { useButtonRecipe } from '@styleframe/theme';

export const button = useButtonRecipe(s, {
    defaultVariants: { color: 'primary' },
    filter: { size: ['sm', 'md', 'lg'] },     // keep only these size options
});
```

---

## Theming Patterns

### Dark theme

```ts
const colorBackground = variable('color.background', '#ffffff', { default: true });
const colorText = variable('color.text', '#000000', { default: true });

theme('dark', ({ variable, selector }) => {
    variable(colorBackground, '#18181b');
    variable(colorText, '#ffffff');
    selector('.card', { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' });
});
```

Default theme selector: `.dark-theme, [data-theme="dark"]`. Themes with the same name
merge across files, so extension files can extend `theme('dark', ...)` freely.

```html
<html data-theme="light">
    <body>
        <main>Light content</main>
        <aside data-theme="dark">Dark sidebar (themes nest)</aside>
    </body>
</html>
```

### Per-component dark styles via the `dark` modifier

Inside recipes/utilities, prefer the theme package's `dark` modifier
(`:is(.dark-theme, [data-theme="dark"]) &`) over duplicate selectors:

```ts
createBackground({ primary: '@color.primary' }, [dark]);   // _dark:background:primary
```

---

## Responsive & State Patterns

### Mobile-first media queries

```ts
selector('.container', {
    padding: '@spacing.sm',
    '@media (min-width: 768px)': { padding: '@spacing.md' },
    '@media (min-width: 1024px)': { padding: '@spacing.lg' },
});
```

### Breakpoint modifiers

One `modifier()` per breakpoint (the factory receives no key — a multi-key modifier
cannot vary output per key):

```ts
const breakpoints = { sm: '640px', md: '768px', lg: '1024px' };

const [sm, md, lg] = Object.entries(breakpoints).map(([key, minWidth]) =>
    modifier(key, ({ declarations, variables, children }) => ({
        [`@media (min-width: ${minWidth})`]: { declarations, variables, children },
    })),
);

createPadding({ md: '@spacing.md' }, [sm, md, lg]);
// _sm:padding:md, _md:padding:md, _lg:padding:md
```

### Compound state modifiers

```ts
createBackground({ primary: '@color.primary' }, [[hover, focus]]);
// _hover:focus:background:primary — both states required
```

---

## Animation Patterns

```ts
const fadeIn = keyframes('fade-in', {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

selector('.animated', {
    animation: css`${fadeIn} 0.3s ease-out`,
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
});
```

Animate `transform`/`opacity` (GPU-composited), not layout properties (`width`, `left`).

---

## Selector Nesting Patterns

Keys must start with `.`, `&`, or `:` to nest — write combinators with `&`:

```ts
selector('.card', {
    padding: '@spacing.lg',

    // Pseudo-classes / pseudo-elements
    '&:hover': { borderColor: '@color.primary' },
    '&:focus-within': { outline: '2px solid' },
    '&::before': { content: '""' },

    // Descendant / attribute
    '.card-title': { fontSize: '@font-size.lg' },
    '&[aria-expanded="true"]': { background: '@color.primary-tint-100' },

    // Combinators — the & prefix is REQUIRED ('> .x' alone is not recognized)
    '& > .card-header': { marginBottom: '@spacing.md' },
    '& + .card': { marginTop: '@spacing.md' },
    '& a:not(.active)': { color: 'gray' },
});
```

---

## Merge Patterns (programmatic usage)

Only needed when composing instances yourself (tests, standalone builds) — the plugin's
extension-file model replaces this in apps.

```ts
import { merge, styleframe } from 'styleframe';
import base from './base';           // each module: const s = styleframe(); ...; export default s;
import components from './components';
import themes from './themes';

export default merge(base, components, themes);   // general → specific
```

Factory-function customization:

```ts
export function createDesignSystem(options: { primaryColor: string }) {
    const s = styleframe();
    s.variable('color.primary', options.primaryColor);
    return s;
}

export default merge(base, createDesignSystem({ primaryColor: '#8b5cf6' }));
```

Merge behavior: variables override by name, themes merge by name, other arrays
concatenate — later instances win.
