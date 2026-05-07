# @styleframe/theme

## 3.6.0

### Minor Changes

- [#210](https://github.com/styleframe-dev/styleframe/pull/210) [`18f82c7`](https://github.com/styleframe-dev/styleframe/commit/18f82c70fb5cdc7c46d22a648da6c68e30a98db9) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `useBreadcrumbRecipe` and `useBreadcrumbItemRecipe` — a two-part breadcrumb recipe with `light`/`dark`/`neutral` color axes and `sm`/`md`/`lg` size variants. Separators are rendered as DOM nodes and auto-inserted between items; the separator character is configurable via a `separator` prop.

- [#204](https://github.com/styleframe-dev/styleframe/pull/204) [`1d57ffa`](https://github.com/styleframe-dev/styleframe/commit/1d57ffaa2861fd05a03f370cf3948d772d6be237) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `Media` recipe — a layout-only multi-part recipe modeled on the Bootstrap/Inkline media object pattern for image-plus-content layouts (comments, posts, list items)
  - New recipes: `useMediaRecipe`, `useMediaFigureRecipe`, `useMediaBodyRecipe`, `useMediaTitleRecipe`
  - Root recipe exposes `orientation` (`horizontal`/`vertical`), `align` (`start`/`center`/`end`), and `size` (`sm`/`md`/`lg`) axes — no color or surface styling, so it composes inside Card, Callout, etc.
  - `useMediaBodyRecipe` sets `min-width: 0` to safely wrap long titles inside flex containers
  - Designed for nesting (parent Media → child Media inside `MediaBody`) for comment threads and reply chains

- [#208](https://github.com/styleframe-dev/styleframe/pull/208) [`787cf14`](https://github.com/styleframe-dev/styleframe/commit/787cf143c925ac9caacb3df1c72c3aeb2d626419) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `PageHero` recipe — a multi-part composable for full-width hero sections with color, size, orientation, alignment, and reverse axes
  - New recipes: `usePageHeroRecipe`, `usePageHeroBodyRecipe`, `usePageHeroHeadlineRecipe`, `usePageHeroTitleRecipe`, `usePageHeroDescriptionRecipe`, `usePageHeroActionsRecipe`, `usePageHeroLinksRecipe`, `usePageHeroImageRecipe`
  - Container exposes `color` (`light`/`dark`/`neutral` with adaptive dark mode), `size` (`sm`/`md`/`lg`), `orientation` (`vertical`/`horizontal`), `alignment` (`start`/`center`/`end`), and `reverse` axes
  - Sub-recipes mirror the `size` and `alignment` axes and override alignment to `start` in horizontal orientation for correct two-column layout
  - Adds a generic `useFilterUtility` and registers it in `useUtilitiesPreset`

- [#209](https://github.com/styleframe-dev/styleframe/pull/209) [`3559b70`](https://github.com/styleframe-dev/styleframe/commit/3559b70dedcc13ad191c78869cd86407b8470604) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add pagination recipe with `usePaginationRecipe`, `usePaginationItemRecipe`, and `usePaginationEllipsisRecipe`. Supports 3 color modes (light, dark, neutral), 6 style variants (solid, outline, soft, subtle, ghost, link), 3 sizes (sm, md, lg), and active/disabled item states.

### Patch Changes

- Updated dependencies [[`c314dbc`](https://github.com/styleframe-dev/styleframe/commit/c314dbc78872df38efe72d7931faf86afce5ffcc)]:
  - @styleframe/core@3.4.0

## 3.5.1

### Patch Changes

- [#201](https://github.com/styleframe-dev/styleframe/pull/201) [`4ae6cd4`](https://github.com/styleframe-dev/styleframe/commit/4ae6cd46269f4619f6d8f3eb481f7aed29450db3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Lock `fluid.screen` at `fluid.max-width` past the maximum viewport to prevent fluid values from extrapolating beyond their intended ceiling
  - `useFluidViewportDesignTokens` now registers a media query at `min-width: <maxWidth>` that pins `fluid.screen` to `calc(var(--fluid--max-width) * 1px)`
  - The lock breakpoint derives from the `maxWidth` option, supporting both numeric (`1440`) and string (`90rem`) values

## 3.5.0

### Minor Changes

- [#196](https://github.com/styleframe-dev/styleframe/pull/196) [`5a37154`](https://github.com/styleframe-dev/styleframe/commit/5a37154540057d115a834961b708a77cbf032783) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Dropdown recipe with item, separator, label, arrow, tests, and documentation
  - Add `useDropdownRecipe` container recipe with 3 colors (light, dark, neutral), 3 visual styles (solid, soft, subtle), and 3 sizes (sm, md, lg) — uses `@z-index.dropdown` for surface stacking
  - Add `useDropdownItemRecipe` for clickable menu options with hover, focus, active, and disabled states across all color × variant combinations
  - Add `useDropdownSeparatorRecipe` for visual dividers between item groups (color axis only)
  - Add `useDropdownLabelRecipe` for uppercase muted group headings (color and size axes)
  - Add `useDropdownArrowRecipe` using the CSS border-triangle technique — points upward by default to sit above the panel, registers an `@dropdown.arrow.size` variable (default `6px`)
  - Add Dropdown documentation page with usage examples, anatomy, accessibility guidance (menu/menuitem/separator roles, keyboard navigation, roving tabindex), API reference, and FAQ

- [#198](https://github.com/styleframe-dev/styleframe/pull/198) [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add fluid typography to the default design tokens preset
  - Add `useFluidClamp` to compose a `clamp()`-style fluid value between a min/max pair using a viewport-driven breakpoint reference
  - Add `useFluidViewportDesignTokens` registering `fluid.breakpoint`, `fluid.min`, and `fluid.max` viewport variables that drive the clamp interpolation
  - Add `useFluidFontSizeDesignTokens` registering `font-size.min/max` (with `xs`–`xl` multipliers off the type scale) and resolving `font-size.{xs..xl}` to fluid clamp values
  - Wire fluid font sizing into `useDesignTokensPreset` so the default preset ships fluid type out of the box
  - Add `fluidFontSize` and `fluidViewport` value helpers and documentation for the new fluid composables and the presets reference page

- [#195](https://github.com/styleframe-dev/styleframe/pull/195) [`73a4c55`](https://github.com/styleframe-dev/styleframe/commit/73a4c551a403fcda250b108fb93c9ab7394b27c2) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add HamburgerMenu recipe with toggle button, animations, tests, and documentation
  - Add `useHamburgerMenuRecipe` icon-toggle button recipe with 3 colors (light, dark, neutral), 3 sizes (sm, md, lg), 7 open-state animations (close, arrow-{up,down,left,right}, minus, plus), and a boolean `active` axis
  - Inner bars rendered via `.hamburger-menu-inner` + `::before`/`::after` pseudo-elements; per-size dimensions and per-animation transforms registered via `setup(s)` callback
  - Add HamburgerMenu Storybook stories with all-variants and all-sizes preview grids, plus per-color, per-size, per-animation, and disabled/active stories
  - Add HamburgerMenu documentation page with usage examples, accessibility guidance (`aria-expanded`, `aria-label`), API reference, and best practices

- [#189](https://github.com/styleframe-dev/styleframe/pull/189) [`689f02b`](https://github.com/styleframe-dev/styleframe/commit/689f02bd98262c4ee7b35b92ca537ac0e50af013) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Input recipe with prefix/suffix and prepend/append slots
  - Add `useInputRecipe` wrapper recipe with 3 colors (light, dark, neutral), 3 variants (default, soft, ghost), 3 sizes, and `invalid`/`disabled`/`readonly` boolean state axes; the wrapper owns the visual field and inherits typography into a nested `<input class="input-field">` styled via setup callback
  - Add `useInputPrefixRecipe` and `useInputSuffixRecipe` for inline addons rendered inside the field, beside the text
  - Add `useInputPrependRecipe` and `useInputAppendRecipe` as transparent slot containers for external addons (Buttons, dropdowns, plain text) — content brings its own visual language
  - Add `useInputGroupRecipe` as a pure layout coordinator that flattens border-radius and collapses border-width at the seams where prepend/append meet the input, using `:has()` selectors

- [`ef662ae`](https://github.com/styleframe-dev/styleframe/commit/ef662ae696acf138a14c246b4b6f7a65ebae53c1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Spinner recipe with circle, text, overlay, tests, and documentation
  - Add `useSpinnerRecipe` container recipe with 4 colors (primary, light, dark, neutral) and 4 sizes (auto, sm, md, lg)
  - Add `useSpinnerCircleRecipe` with SVG stroke-dasharray animation and keyframes
  - Add `useSpinnerTextRecipe` for centered label overlay on the spinner
  - Add `useSpinnerOverlayRecipe` for fixed/absolute backdrop
  - Add Spinner documentation page with usage examples, API reference, and FAQ

- [#198](https://github.com/styleframe-dev/styleframe/pull/198) [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Enable `fluidFontSize` by default in `useDesignTokensPreset`
  - Calling `useDesignTokensPreset(s)` with no config now emits the fluid
    font-size scale (`clamp()`-based `font-size.*`, `font-size.min/max`,
    `scale.min/max`, and per-power scale variables). Previously, fluid was
    opt-in via `fluidFontSize: true`.
  - Pass `fluidFontSize: false` to fall back to the static `fontSize` domain.
  - Custom `fontSize: { ... }` config is silently ignored when fluid is
    active. Migration: add `fluidFontSize: false` alongside any custom
    `fontSize` config you want to keep applying.
  - Domain dependencies are now validated up front. Setting `fluidViewport:
false` or `scale: false` while leaving `fluidFontSize` enabled throws a
    configuration error — both are required for the fluid scale to function.
    Migration: add `fluidFontSize: false` whenever you disable `fluidViewport`
    or `scale`.
  - Internally, domains can now declare `enabled` predicates and a `requires`
    list of config keys that must not be `false`. The preset uses this to gate
    the fluid `scale` and `font-size` domains generically rather than via
    ad-hoc checks inside each composable.

- [#198](https://github.com/styleframe-dev/styleframe/pull/198) [`eabf9f4`](https://github.com/styleframe-dev/styleframe/commit/eabf9f4150cddc240065e72d38d3c01042fb140c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Accept `{ min, max }` objects in fluid range APIs

  `useFluidClamp` and the per-step `values` of `useFluidFontSizeDesignTokens`
  now accept ranges as either `[min, max]` tuples or `{ min, max }` objects.
  The `fluidFontSize.values` config in `useDesignTokensPreset` accepts both
  forms as well. Existing tuple call sites are unaffected.

## 3.4.0

### Minor Changes

- [#165](https://github.com/styleframe-dev/styleframe/pull/165) [`5ef9019`](https://github.com/styleframe-dev/styleframe/commit/5ef9019fd0121cf95bd4e7373dbd55028f25b6d0) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add ButtonGroup recipe for grouping buttons with joined borders
  - Add `useButtonGroupRecipe` with orientation (`horizontal`, `vertical`) and block (`true`, `false`) variants
  - Use compound variant `className` with RSCSS modifiers (`-horizontal`, `-vertical`, `-block`) to emit helper classes
  - Use `setup` callback to register nested selectors for joined-button effects (border-radius and border removal on inner children)
  - Add ButtonGroup storybook component, grid preview, and stories

- [#162](https://github.com/styleframe-dev/styleframe/pull/162) [`990ed33`](https://github.com/styleframe-dev/styleframe/commit/990ed33078b61ddf1cd025ce358862d103e0ea84) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Card recipe with border style utility improvements
  - Add `useCardRecipe` with size (`sm`, `md`, `lg`), variant (`elevated`, `outline`, `filled`, `ghost`), and color variants including light, dark, and neutral
  - Add border style utility support (`solid`, `dashed`, `dotted`, `double`, `hidden`, `none`) with responsive and state modifier capabilities
  - Normalize light/dark color variants across Badge, Button, and Callout recipes using `text-inverted` token
  - Add Card storybook components, grid previews, and stories

- [#180](https://github.com/styleframe-dev/styleframe/pull/180) [`d2c1ed6`](https://github.com/styleframe-dev/styleframe/commit/d2c1ed65b1a268647e4789a20341d8da61fb9f74) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Chip recipe with indicator, tests, and documentation
  - Add `useChipRecipe` wrapper recipe with relative positioning context
  - Add `useChipIndicatorRecipe` with 9 colors, 2 variants (solid/soft), 5 sizes, 4 corner positions, and inset mode
  - Wire `useTransformUtility` into `useUtilitiesPreset`
  - Convert min/max width/height utilities to spacing multiplier utilities for consistency
  - Add Chip documentation page with usage examples, API reference, and FAQ

- [#160](https://github.com/styleframe-dev/styleframe/pull/160) [`cb053e0`](https://github.com/styleframe-dev/styleframe/commit/cb053e0135fef47161537516c53e3fc0e8b238cb) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add light, dark, and neutral colors to Badge and Button recipes
  - Add `light`, `dark`, and `neutral` color variants to `useBadgeRecipe` with compound variants for solid, outline, soft, and subtle styles
  - Add `light`, `dark`, and `neutral` color variants to `useButtonRecipe` with compound variants for solid, outline, soft, subtle, ghost, and link styles
  - Update storybook Badge and Button components, grid previews, and stories to document the new colors

- [#171](https://github.com/styleframe-dev/styleframe/pull/171) [`6f6a360`](https://github.com/styleframe-dev/styleframe/commit/6f6a360b838188eae8244353351e8b458792c95d) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Modal recipe with overlay, header, body, and footer parts
  - Add `useModalRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants matching the Card recipe structure
  - Add `useModalHeaderRecipe` and `useModalFooterRecipe` with separator border compound variants and setup functions for `:first-child`/`:last-child` border collapse
  - Add `useModalBodyRecipe` with size-based padding and gap, no compound variants
  - Add `useModalOverlayRecipe` with fixed-position full-screen backdrop (`rgba(0, 0, 0, 0.75)`) and centered flex layout
  - Add Modal storybook components, grid previews, and stories with interactive open/close and fullscreen example
  - Add Modal documentation page

- [#168](https://github.com/styleframe-dev/styleframe/pull/168) [`0250281`](https://github.com/styleframe-dev/styleframe/commit/02502814c4ec5fba342d7dd20a72180635caf7d8) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Nav recipe with list-style utility
  - Add `useNavRecipe` and `useNavItemRecipe` multi-part recipes with size (xs–xl), color, and variant (pills, underline, default) support
  - Add `useListStyleUtility` shorthand utility for the `list-style` CSS property
  - Add Nav storybook components, grid previews, and stories

- [#176](https://github.com/styleframe-dev/styleframe/pull/176) [`cccd1cd`](https://github.com/styleframe-dev/styleframe/commit/cccd1cdab769a7fb8d3cbfb4620ad2926099f0fc) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Placeholder recipe with dashed border and CSS hatch pattern
  - Add `usePlaceholderRecipe` as a base-only recipe (no variants) with a dashed border, hatch background pattern, and automatic dark mode support
  - Add Placeholder documentation page with usage examples, API reference, and FAQ

- [#179](https://github.com/styleframe-dev/styleframe/pull/179) [`8eadb4b`](https://github.com/styleframe-dev/styleframe/commit/8eadb4b8e6200b962f114d8bf48578eb17e85d95) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Popover recipe with composable sub-recipes and documentation
  - Add `usePopoverRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants
  - Add `usePopoverHeaderRecipe` and `usePopoverFooterRecipe` with border collapsing via `:first-child`/`:last-child` selectors
  - Add `usePopoverBodyRecipe` for content area styling
  - Add `usePopoverArrowRecipe` with CSS border triangle implementation using `@popover.arrow.size` variable and `&:after` pseudo-element for border/fill separation
  - Add Popover storybook components, grid previews, and stories
  - Add complete documentation page covering usage, anatomy, accessibility, and API reference

- [#178](https://github.com/styleframe-dev/styleframe/pull/178) [`2bcd961`](https://github.com/styleframe-dev/styleframe/commit/2bcd961d109c1a3c647a777256b81b2ce3d50d5a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Progress recipe with orientation, inverted, and indeterminate animation support
  - Add `useProgressRecipe` (track) and `useProgressBarRecipe` (bar) with 9 bar colors, 3 track colors, 5 sizes, horizontal/vertical orientation, inverted fill direction, and 4 indeterminate animations (carousel, carousel-inverse, swing, elastic)
  - Register 8 keyframes automatically (4 horizontal + 4 vertical) via setup callback
  - Add Progress documentation page with usage examples, API reference, and FAQ

- [#175](https://github.com/styleframe-dev/styleframe/pull/175) [`b506ea5`](https://github.com/styleframe-dev/styleframe/commit/b506ea5c3c36fa24fea19a69ee3fef7035397dda) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Skeleton recipe with pulse animation and supporting utilities
  - Add `useSkeletonRecipe` with size (`xs`, `sm`, `md`, `lg`, `xl`) and rounded (`true`, `false`) variants, pulse animation, and dark mode support
  - Add granular animation utilities: `useAnimationNameUtility`, `useAnimationDurationUtility`, `useAnimationTimingFunctionUtility`, `useAnimationIterationCountUtility`
  - Switch `useWidthUtility` and `useHeightUtility` to `createUseSpacingUtility` for `@N` multiplier support
  - Add compound keyframe selector support in core engine (e.g. `"0%, 100%"`)
  - Add Skeleton storybook component, grid previews, and stories
  - Add Skeleton documentation page

- [#172](https://github.com/styleframe-dev/styleframe/pull/172) [`7620771`](https://github.com/styleframe-dev/styleframe/commit/7620771ede3b1e6e9a2f14cf20e845af1078635e) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Tooltip recipe with arrow sub-recipe and transform utility
  - Add `useTooltipRecipe` with size (`sm`, `md`, `lg`), variant (`solid`, `soft`, `subtle`), and color (`light`, `dark`, `neutral`) variants
  - Add `useTooltipArrowRecipe` with CSS border triangle implementation using `@tooltip.arrow.size` variable and `&:after` pseudo-element for border/fill separation
  - Add `useTransformUtility` for arbitrary `transform` CSS property values
  - Add Tooltip storybook components, grid previews, and stories including freeform rich content example

- [#163](https://github.com/styleframe-dev/styleframe/pull/163) [`1a7dc77`](https://github.com/styleframe-dev/styleframe/commit/1a7dc77600b6c9766ed69bf00338a225f5188b12) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add per-part borders with adjacency collapsing to Card recipe
  - Add independent `borderTop` and `borderBottom` to each card part (header, body, footer) with compound variants per color×variant
  - Add `:first-child` / `:last-child` collapse selectors to header and footer recipes to remove duplicate borders at card edges
  - Extend `createUseRecipe` with an optional `setup` callback for registering selectors alongside recipes
  - Add `color` and `variant` props to `CardBody` component

- [#158](https://github.com/styleframe-dev/styleframe/pull/158) [`90f1862`](https://github.com/styleframe-dev/styleframe/commit/90f1862e12596943fb739b7cf98e2dfc8c47ff6d) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename Alert recipe to Callout recipe
  - Rename `useAlertRecipe` to `useCalloutRecipe` with updated recipe name from `alert` to `callout`
  - Add `CalloutContent`, `CalloutTitle`, and `CalloutDescription` sub-components for better composability
  - Move storybook grid preview components into `preview/` subdirectories for cleaner organization
  - Add Callout documentation page

- [#166](https://github.com/styleframe-dev/styleframe/pull/166) [`ff13980`](https://github.com/styleframe-dev/styleframe/commit/ff139805c9839da9b4d4511099e7838f7e159ba7) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename `danger` semantic color to `error` across the design system
  - Rename `danger` color token to `error` in default color values and border color values
  - Update all recipes (badge, button, callout) to use `error` instead of `danger` in color variants
  - Update all documentation, storybook stories, and playground examples

### Patch Changes

- Updated dependencies [[`b506ea5`](https://github.com/styleframe-dev/styleframe/commit/b506ea5c3c36fa24fea19a69ee3fef7035397dda), [`efd99f7`](https://github.com/styleframe-dev/styleframe/commit/efd99f70a30f9a42c6e1793ed777b1565fb47a82)]:
  - @styleframe/core@3.3.0

## 3.3.0

### Minor Changes

- [#154](https://github.com/styleframe-dev/styleframe/pull/154) [`352f10c`](https://github.com/styleframe-dev/styleframe/commit/352f10c958ac12b7dde245657f3ae8d548e9378b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Update color palette for accessibility and show hex values in swatches
  - Revise base color values to OKLCH-aligned accessible colors for both light and dark modes
  - Remove per-color `text.on-*` tokens in favor of a single `colorTextInverted` reference
  - Display computed hex values inside color swatch previews
  - Add `color.<name>` labels below each swatch with monospace styling

- [#149](https://github.com/styleframe-dev/styleframe/pull/149) [`b9e54ed`](https://github.com/styleframe-dev/styleframe/commit/b9e54eda1acbf1b1b256f96bf6306dc300602618) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Flatten design tokens preset result and rename variable composables
  - Rename all variable composables from `use{Name}` to `use{Name}DesignTokens` for clearer naming
  - Flatten `useDesignTokensPreset` result so variables are directly destructurable instead of nested by domain
  - Add OKLCH gamut mapping utilities for color processing
  - Add color reference value support so colors can reference generated shade/tint variants
  - Add border, transition, and animation utility implementations

- [#155](https://github.com/styleframe-dev/styleframe/pull/155) [`cc4f170`](https://github.com/styleframe-dev/styleframe/commit/cc4f170c56ad2e246b94ab4d64b7f6c3097c7223) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Refactor recipes, improve modifier at-rule support, and forward variables through modifier factories
  - Refactor recipes and utilities with improved color theming composables
  - Add at-rule support for modifiers (e.g. media preference modifiers)
  - Forward variables and children through all modifier factory functions
  - Restructure docs for components, utilities, and modifiers into composable subdirectories
  - Add Button composable recipe documentation
  - Update plugin scanner for improved recipe handling

- [#151](https://github.com/styleframe-dev/styleframe/pull/151) [`6a18eeb`](https://github.com/styleframe-dev/styleframe/commit/6a18eeb5e36d9f66ef48f2e107d2b6ff65b2a792) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename colorLightness to colorLevel across theme, docs, and storybook
  - Rename `colorLightness` value to `colorLevel` for clearer terminology
  - Rename `useColorLightnessDesignTokens` to `useColorLevelDesignTokens`
  - Update all color-related design token references from lightness to level

### Patch Changes

- Updated dependencies [[`cc4f170`](https://github.com/styleframe-dev/styleframe/commit/cc4f170c56ad2e246b94ab4d64b7f6c3097c7223)]:
  - @styleframe/core@3.2.0

## 3.2.0

### Minor Changes

- [#145](https://github.com/styleframe-dev/styleframe/pull/145) [`1597105`](https://github.com/styleframe-dev/styleframe/commit/1597105d55c1dd43adc6ec146858770a830dc1fb) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add duration design tokens for consistent animation and transition timing
  - Add `useDuration` composable with semantic duration scale from `instant` (0ms) through `slowest` (1000ms)
  - Add `durationValues` default token values: instant, fastest, faster, fast, normal, slow, slower, slowest
  - Register `duration` domain in `useDesignTokensPreset` with full theming and override support
  - Add `duration` namespace to `useTransitionDurationUtility` and `useTransitionDelayUtility` for `@token` references
  - Replace hardcoded `150ms` with `@duration.fast` in `useTransitionPropertyUtility`

- [#146](https://github.com/styleframe-dev/styleframe/pull/146) [`bff61d1`](https://github.com/styleframe-dev/styleframe/commit/bff61d104eca9b1f2a72911593abf0a7fc90ec34) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Close 416px breakpoint gap by adding 768px md breakpoint
  - Shift default breakpoint scale to align with industry standards (Tailwind, Bootstrap, Chakra)
  - Change md from 992px to 768px to cover the tablet range
  - Shift lg to 992px, xl to 1200px, and add new 2xl at 1440px

- [#133](https://github.com/styleframe-dev/styleframe/pull/133) [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Refactor design tokens preset, add Button recipe, and improve Badge recipe
  - Refactor `useDesignTokensPreset` with improved variable composables and `createUseDerivedVariable` utility
  - Add `useButtonRecipe` with color, variant, and size support including compound variant styles
  - Improve `useBadgeRecipe` sizing, contrast, and accessibility
  - Update color references from `@color.light`/`@color.dark` to `@color.white`/`@color.black`
  - Enhance `createUseRecipe` with better types and `@`-prefixed token reference support in recipe definitions

- [#126](https://github.com/styleframe-dev/styleframe/pull/126) [`3ffb881`](https://github.com/styleframe-dev/styleframe/commit/3ffb8814f9b7db1912180b2e0c53e1b6675df4d6) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Extract modifier registration from `useUtilitiesPreset` into a dedicated `useModifiersPreset` composable with independent configuration

- [#138](https://github.com/styleframe-dev/styleframe/pull/138) [`5f06459`](https://github.com/styleframe-dev/styleframe/commit/5f064599bae7a3679aeef0dbcb9bfaf0c4167355) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add sanitize.css preset with configurable normalization categories
  - Add `useSanitizePreset` with opt-out config for base, forms, typography, and reduced motion
  - Add `useSanitizeBaseSelectors` with cross-browser normalization (box-sizing, margins, forms, accessibility)
  - Add `useSanitizeFormsSelectors` with form element normalization and consistent select appearance
  - Add `useSanitizeTypographySelectors` with system font stack defaults
  - Add `useSanitizeReduceMotionSelectors` with `prefers-reduced-motion` media query support

- [#130](https://github.com/styleframe-dev/styleframe/pull/130) [`7ec356a`](https://github.com/styleframe-dev/styleframe/commit/7ec356a0ff945c58df7de5740ef85c6ed781a50a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add custom utility name support and shorthand utilities preset
  - Add `names` config option to `useUtilitiesPreset` for custom CSS class name prefixes on any utility
  - Add `utilityOptions` parameter to `createUseUtility` and `createUseSpacingUtility` to support name overrides
  - Add `useShorthandUtilitiesPreset` with TailwindCSS-compatible shorthand mappings (e.g., `._m:sm` instead of `._margin:sm`)

- [#142](https://github.com/styleframe-dev/styleframe/pull/142) [`89032b8`](https://github.com/styleframe-dev/styleframe/commit/89032b86dee47538a85f10e3083d128aaf60f864) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add z-index design token with semantic stacking scale
  - Add `useZIndex` composable with semantic layer names (base, dropdown, sticky, overlay, modal, popover, toast, max)
  - Add `zIndexValues` defaults with 100-increment scale for consistent stacking order
  - Integrate z-index into `useDesignTokensPreset` and `useUtilitiesPreset`
  - Update z-index utility docs to use semantic token values instead of arbitrary numbers

### Patch Changes

- [#130](https://github.com/styleframe-dev/styleframe/pull/130) [`7ec356a`](https://github.com/styleframe-dev/styleframe/commit/7ec356a0ff945c58df7de5740ef85c6ed781a50a) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Document custom utility names and `useShorthandUtilitiesPreset` in utilities preset docs
  - Add `Custom Names` section documenting the `names` config option in `useUtilitiesPreset`
  - Add `useShorthandUtilitiesPreset` section with usage examples and full shorthand name mapping table

- Updated dependencies [[`295f04e`](https://github.com/styleframe-dev/styleframe/commit/295f04e6fdd011df6437986cc179e17efd8cd1be), [`71009c2`](https://github.com/styleframe-dev/styleframe/commit/71009c2c0a07a0bfd240e70e61020c8b7e923edb), [`2610041`](https://github.com/styleframe-dev/styleframe/commit/2610041beb03a8afc8de17af8857b9931f3359b0), [`7a61df0`](https://github.com/styleframe-dev/styleframe/commit/7a61df083bc534caa9271a1ef4535f7be979d7c2), [`ce62d31`](https://github.com/styleframe-dev/styleframe/commit/ce62d318275deed277d828fdd8d2500c1a9d767f)]:
  - @styleframe/core@3.1.0

## 3.1.0

### Minor Changes

- [#121](https://github.com/styleframe-dev/styleframe/pull/121) [`0242bd6`](https://github.com/styleframe-dev/styleframe/commit/0242bd65028cfc9216ed56e06d52de75ceff4d4b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add utility modifier composables with auto-registration in useUtilitiesPreset
  - Add 68 modifiers across 8 categories: pseudo-states, form states, structural, pseudo-elements, media preferences, ARIA states, directional, and other states
  - Each modifier is individually importable (e.g., `useHoverModifier`, `useDisabledModifier`)
  - Grouped composables available for convenience (e.g., `usePseudoStateModifiers`)
  - Per-category configuration to enable/disable modifier groups via `ModifiersConfig`

### Patch Changes

- Updated dependencies [[`fa48802`](https://github.com/styleframe-dev/styleframe/commit/fa488027d32956e20fa26dc92ee1a3b3583671ad)]:
  - @styleframe/core@3.0.1

## 3.0.0

### Major Changes

- [#117](https://github.com/styleframe-dev/styleframe/pull/117) [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Introduce global Styleframe single-instance architecture. Extension files (`*.styleframe.ts`) now share the same instance created in `styleframe.config.ts` instead of creating independent instances. This is a breaking change that affects how styles are imported and composed across files.

### Minor Changes

- [#81](https://github.com/styleframe-dev/styleframe/pull/81) [`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add Badge recipe with createUseRecipe factory
  - Add `useBadgeRecipe` and `useBadgeRecipeBase` recipe composables with color, variant, and size variants
  - Add `createUseRecipe` factory utility for building reusable, customizable recipe presets
  - Add `3xs` and `2xs` font-size values

### Patch Changes

- Updated dependencies [[`266f961`](https://github.com/styleframe-dev/styleframe/commit/266f96143e9ffb47e0e6326d0e5e7cc9d974ab83), [`ffe6764`](https://github.com/styleframe-dev/styleframe/commit/ffe6764a2e6c84d5b3cfdf431bf11f17a3f3f118)]:
  - @styleframe/core@3.0.0

## 2.5.0

### Minor Changes

- [#105](https://github.com/styleframe-dev/styleframe/pull/105) [`b109ac1`](https://github.com/styleframe-dev/styleframe/commit/b109ac148d837ae0a060c34f0236338bf4deca36) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add multiplier support to spacing utilities (margin, padding, gap, space) with @-prefixed numeric values that generate calc() expressions based on a base spacing variable

## 2.4.0

### Minor Changes

- [#93](https://github.com/styleframe-dev/styleframe/pull/93) [`4ebc385`](https://github.com/styleframe-dev/styleframe/commit/4ebc3856ad4468e6caea5f72e595e781e2651b09) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add `useDesignTokensPreset` composable for quick design token system setup
  - Introduces a comprehensive preset function that bootstraps complete design token systems with sensible defaults in a single function call
  - Full TypeScript type inference for all configuration options
  - Flexible domain configuration: use defaults, disable domains with `false`, or provide custom values
  - Automatic color variation generation (lightness, shades, tints) with configurable levels
  - Exports default values from variable composables (`defaultSpacingValues`, `defaultColorValues`, etc.)
  - Adds `useFontStyle` variable composable
  - Includes 54 comprehensive tests and detailed documentation

- [#95](https://github.com/styleframe-dev/styleframe/pull/95) [`75fd781`](https://github.com/styleframe-dev/styleframe/commit/75fd78196d61498db066de6e355eabcebbd39071) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Rename `useUtilities` to `useUtilitiesPreset` for consistency with design tokens preset naming
  - **BREAKING**: Renamed `useUtilities()` to `useUtilitiesPreset()` to align with `useDesignTokensPreset()` naming convention
  - Added comprehensive presets documentation page with complete API reference for 200+ utility creators
  - Updated all documentation examples and storybook files to use the new function name
  - Clarified CHANGELOG entries to indicate this is a rename from the previous function

- [#97](https://github.com/styleframe-dev/styleframe/pull/97) [`fe021c6`](https://github.com/styleframe-dev/styleframe/commit/fe021c6b90c83593e5a297e4e66ef516d643252f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Centralize theme variable defaults to dedicated values folder

  **BREAKING**: Default value exports have been renamed and `useUtilitiesPreset` has moved.

  ### Renamed Exports

  All default value exports have been renamed from `defaultXxxValues` to `xxxValues`:
  - `defaultSpacingValues` → `spacingValues`
  - `defaultColorValues` → `colorValues`
  - `defaultBorderWidthValues` → `borderWidthValues`
  - `defaultBorderRadiusValues` → `borderRadiusValues`
  - `defaultBorderStyleValues` → `borderStyleValues`
  - `defaultBoxShadowValues` → `boxShadowValues`
  - `defaultBreakpointValues` → `breakpointValues`
  - `defaultEasingValues` → `easingValues`
  - `defaultFontFamilyValues` → `fontFamilyValues`
  - `defaultFontSizeValues` → `fontSizeValues`
  - `defaultFontStyleValues` → `fontStyleValues`
  - `defaultFontWeightValues` → `fontWeightValues`
  - `defaultLineHeightValues` → `lineHeightValues`
  - `defaultLetterSpacingValues` → `letterSpacingValues`
  - `defaultScaleValues` → `scaleValues`
  - `defaultScalePowerValues` → `scalePowerValues`
  - `defaultColorLightnessValues` → `colorLightnessValues`
  - `defaultColorShadeValues` → `colorShadeValues`
  - `defaultColorTintValues` → `colorTintValues`

  ### Moved `useUtilitiesPreset`

  The `useUtilitiesPreset` function has moved from `utilities/` to `presets/`:

  ```ts
  // Before
  import { useUtilitiesPreset } from "@styleframe/theme/utilities";

  // After
  import { useUtilitiesPreset } from "@styleframe/theme/presets";
  // Or from the main export
  import { useUtilitiesPreset } from "@styleframe/theme";
  ```

  ### Enhanced `useUtilitiesPreset`

  The `useUtilitiesPreset` now supports configuration options:
  - Customize utility default values
  - Disable specific utilities with `false`
  - Merge custom values with defaults using `meta.merge: true`

  ```ts
  const utilities = useUtilitiesPreset(s, {
    meta: { merge: true },
    display: { flex: "flex", block: "block" },
    position: false, // Disable position utilities
  });
  ```

  Migration: Update imports to use the new export names and import path.

- [#95](https://github.com/styleframe-dev/styleframe/pull/95) [`75fd781`](https://github.com/styleframe-dev/styleframe/commit/75fd78196d61498db066de6e355eabcebbd39071) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Standardize utility class names to match CSS property syntax

  **BREAKING**: All utility class names now use CSS-standard property names instead of abbreviated Tailwind-style names. This affects the generated CSS class names.

  ### Border Color Utilities
  - `border-t-color` → `border-top-color`
  - `border-r-color` → `border-right-color`
  - `border-b-color` → `border-bottom-color`
  - `border-l-color` → `border-left-color`
  - `border-s-color` → `border-inline-start-color`
  - `border-e-color` → `border-inline-end-color`

  ### Scroll Utilities
  - `scroll-m` → `scroll-margin`
  - `scroll-mt` → `scroll-margin-top`
  - `scroll-mr` → `scroll-margin-right`
  - `scroll-mb` → `scroll-margin-bottom`
  - `scroll-ml` → `scroll-margin-left`
  - `scroll-mx` → `scroll-margin-x`
  - `scroll-my` → `scroll-margin-y`
  - `scroll-ms` → `scroll-margin-inline-start`
  - `scroll-me` → `scroll-margin-inline-end`
  - `scroll-p` → `scroll-padding`
  - `scroll-pt` → `scroll-padding-top`
  - `scroll-pr` → `scroll-padding-right`
  - `scroll-pb` → `scroll-padding-bottom`
  - `scroll-pl` → `scroll-padding-left`
  - `scroll-px` → `scroll-padding-x`
  - `scroll-py` → `scroll-padding-y`
  - `scroll-ps` → `scroll-padding-inline-start`
  - `scroll-pe` → `scroll-padding-inline-end`

  ### Grid Utilities
  - `grid-cols` → `grid-template-columns`
  - `grid-rows` → `grid-template-rows`
  - `col` → `grid-column`
  - `col-span` → `grid-column-span`
  - `col-start` → `grid-column-start`
  - `col-end` → `grid-column-end`
  - `row` → `grid-row`
  - `row-span` → `grid-row-span`
  - `row-start` → `grid-row-start`
  - `row-end` → `grid-row-end`
  - `auto-cols` → `grid-auto-columns`
  - `auto-rows` → `grid-auto-rows`
  - `grid-flow` → `grid-auto-flow`

  ### Flex Utilities
  - `grow` → `flex-grow`
  - `shrink` → `flex-shrink`
  - `basis` → `flex-basis`

  ### Align Utilities
  - `content` → `align-content`
  - `items` → `align-items`
  - `self` → `align-self`

  ### Justify Utilities
  - `justify` → `justify-content`

  ### Transition Utilities
  - `transition` → `transition-property`
  - `duration` → `transition-duration`
  - `ease` → `transition-timing-function`
  - `delay` → `transition-delay`

  ### Transform Utilities
  - `backface` → `backface-visibility`
  - `origin` → `transform-origin`

  ### Inset Utilities
  - `start` → `inset-inline-start`
  - `end` → `inset-inline-end`

  ### Typography Utilities
  - `underline-offset` → `text-underline-offset`
  - `text-decoration` → `text-decoration-line`

  ### Box Utilities
  - `box-decoration` → `box-decoration-break`

  ### Outline Utilities
  - `outline` → `outline-width`

  Migration: Update any CSS class references in your templates from the old abbreviated names to the new CSS-standard names.

### Patch Changes

- Updated dependencies [[`8460f16`](https://github.com/styleframe-dev/styleframe/commit/8460f169cec1199810e9203b357dac9f2f128c56)]:
  - @styleframe/core@2.6.0

## 2.3.0

### Minor Changes

- [#74](https://github.com/styleframe-dev/styleframe/pull/74) [`2a1bbbe`](https://github.com/styleframe-dev/styleframe/commit/2a1bbbe67afb454c16abf9be64c4d5cea51575e4) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add useEasing composable for animation timing functions

  Introduces `useEasing()` with comprehensive defaults including CSS keywords, 24 cubic-bezier curves from easings.net, and linear() functions for spring and bounce effects.

- [#78](https://github.com/styleframe-dev/styleframe/pull/78) [`7c4f098`](https://github.com/styleframe-dev/styleframe/commit/7c4f0988f3767f358f231571e6a3734426d1050c) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: Add padding-x, padding-y, margin-x, and margin-y utilities

  Add Tailwind-style shorthand utilities for horizontal and vertical spacing:
  - `usePaddingXUtility` - sets padding-left and padding-right
  - `usePaddingYUtility` - sets padding-top and padding-bottom
  - `useMarginXUtility` - sets margin-left and margin-right
  - `useMarginYUtility` - sets margin-top and margin-bottom

  These complement the existing CSS logical property variants (`-inline`, `-block`).

- [#75](https://github.com/styleframe-dev/styleframe/pull/75) [`72bb1f6`](https://github.com/styleframe-dev/styleframe/commit/72bb1f64aae1531496c5e7398c4bd3c11f5433f9) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add Tailwind-style utility functions

  Add `createUseUtility` factory function and 15 utility categories (accessibility, backgrounds, borders, effects, filters, flexbox-grid, interactivity, layout, sizing, spacing, svg, tables, transforms, transitions-animation, typography) for generating composable CSS utility classes.

### Patch Changes

- [#76](https://github.com/styleframe-dev/styleframe/pull/76) [`06afe2a`](https://github.com/styleframe-dev/styleframe/commit/06afe2af66c3ecd8c6a516336e594c1e8cb56de1) Thanks [@alexgrozav](https://github.com/alexgrozav)! - **BREAKING**: rename `useUtilities` to `useUtilitiesPreset` for consistency with design tokens preset naming

  Renamed `useUtilities()` to `useUtilitiesPreset()` to align with the naming convention established by `useDesignTokensPreset()`. The function registers all ~180 utility composables with a Styleframe instance and returns their creator functions, enabling automatic utility class generation for recipe declarations.

  Updated recipe documentation examples to use `useUtilitiesPreset()` with destructured functions and demonstrate both `ref()` and `@variable.name` syntax for referencing design tokens.

- Updated dependencies [[`d98b650`](https://github.com/styleframe-dev/styleframe/commit/d98b65030170582ceacfabde3ba9ff7d92105389)]:
  - @styleframe/core@2.5.0

## 2.2.0

### Minor Changes

- [#68](https://github.com/styleframe-dev/styleframe/pull/68) [`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for dot notation in variable names

### Patch Changes

- Updated dependencies [[`653d1fc`](https://github.com/styleframe-dev/styleframe/commit/653d1fc4e8fb80f8c3371e728ffc962cf1fb1cec)]:
  - @styleframe/core@2.3.0

## 2.1.0

### Minor Changes

- [`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b) Thanks [@alexgrozav](https://github.com/alexgrozav)! - chore: update dependencies

### Patch Changes

- Updated dependencies [[`628e650`](https://github.com/styleframe-dev/styleframe/commit/628e65039bae5e21ab9a66e16037e7e2791f8c8b)]:
  - @styleframe/core@2.2.0

## 2.0.2

### Patch Changes

- [`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: update license package version

- [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update package dependencies

- Updated dependencies [[`1ead424`](https://github.com/styleframe-dev/styleframe/commit/1ead424825a6696969294d3127ac79298da03182), [`a08c996`](https://github.com/styleframe-dev/styleframe/commit/a08c996b3b781ead2000b087b3b16906821ba5e3)]:
  - @styleframe/core@2.0.2

## 2.0.1

### Patch Changes

- [#52](https://github.com/styleframe-dev/styleframe/pull/52) [`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix(cli): update install version

- Updated dependencies [[`d3039fc`](https://github.com/styleframe-dev/styleframe/commit/d3039fc548972d01a5db6bd1b65ff7495047b5ae)]:
  - @styleframe/core@2.0.1

## 2.0.0

### Minor Changes

- [#50](https://github.com/styleframe-dev/styleframe/pull/50) [`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add license check integration

### Patch Changes

- Updated dependencies [[`0593c52`](https://github.com/styleframe-dev/styleframe/commit/0593c52798b8846d3c49762621baeb66354e0356)]:
  - @styleframe/core@1.1.0

## 1.0.3

### Patch Changes

- [#43](https://github.com/styleframe-dev/styleframe/pull/43) [`7e3d008`](https://github.com/styleframe-dev/styleframe/commit/7e3d00849067618802334d5e6823fc31f3aa2612) Thanks [@alexgrozav](https://github.com/alexgrozav)! - feat: add support for generic records in createUseVariable

## 1.0.2

### Patch Changes

- [`173a814`](https://github.com/styleframe-dev/styleframe/commit/173a814b09e24e4c14dff77651a9845bd101b625) Thanks [@alexgrozav](https://github.com/alexgrozav)! - fix: update release folders

## 1.0.1

### Patch Changes

- Update README.md
- Updated dependencies
  - @styleframe/core@1.0.1

## 1.0.0

### Major Changes

- 8204e6d: Official styleframe release. Start writing modern, clean, composable CSS using TypeScript, with a focus on simplicity and performance.

### Patch Changes

- Updated dependencies [8204e6d]
  - @styleframe/core@1.0.0
