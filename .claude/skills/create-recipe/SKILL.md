---
name: create-recipe
description: Create a complete Styleframe component recipe with all deliverables — recipe TS, tests, barrel exports, Storybook stories, Vue components, preview grids, and documentation. Interactive workflow that researches UI library inspiration before implementation.
---

# Create Recipe

Create a complete Styleframe component recipe from scratch, including all 7 deliverables across the monorepo.

## Instructions

You are a senior design-systems engineer specializing in CSS-in-TypeScript frameworks. You are creating a component recipe for Styleframe — a type-safe, composable CSS-in-TypeScript framework. A recipe is a component variant system that generates CSS utility classes based on configurable axes (color, variant style, size). At runtime, calling `button({ color: "primary", variant: "solid", size: "md" })` returns a string of CSS class names.

Your job is to gather requirements, research UI library implementations for inspiration, design the recipe structure, and then implement all 7 deliverables.

---

## Phase 1: Discovery

### Step 1: Ask What to Build

Use AskUserQuestion to gather the component details:

1. **Component name** — What component should be created? (e.g., "Alert", "Dropdown", "Tabs", "Avatar")
2. **Component type** — What kind of component is it?
   - Interactive (button, menu item, toggle) — has hover/focus/active/disabled states
   - Static/display (badge, tag, chip) — compact labeling element
   - Container (alert, card, callout) — block-level wrapper for content
   - Layout (nav, button-group) — structural grouping component
   - Minimal (avatar, indicator) — compact element with few variants
3. **Multi-part?** — Does it have distinct sub-parts that need their own recipes? (e.g., Card has header/body/footer, Modal has overlay/header/body/footer)
4. **Color model** — Which colors does it support?
   - Semantic + non-semantic (9 colors: primary, secondary, success, info, warning, error, light, dark, neutral)
   - Non-semantic only (3 colors: light, dark, neutral) — for containers like card, modal, tooltip
   - No colors — for layout components like nav, button-group

### Step 2: Research UI Library Inspiration

Ask the user: **"Which UI libraries should I study for inspiration? Provide URLs to specific component pages."**

Suggest these common references:
- Nuxt UI: `https://ui.nuxt.com/components/<name>`
- Shadcn/ui: `https://ui.shadcn.com/docs/components/<name>`
- Radix Themes: `https://www.radix-ui.com/themes/docs/components/<name>`
- Chakra UI: `https://v2.chakra-ui.com/docs/components/<name>`
- Mantine: `https://mantine.dev/core/<name>/`

For each URL the user provides, use WebFetch to retrieve the page. Extract:
- **Variant axes** — What props/variants does this library expose? (color, size, variant/style, radius, etc.)
- **Variant values** — What options exist for each axis? (e.g., sizes: sm/md/lg or xs/sm/md/lg/xl)
- **Visual styles** — How do solid, outline, soft, ghost variants look?
- **Sub-parts** — Does the component have named parts (header, content, footer, trigger, etc.)?
- **Interactive states** — What hover/focus/active/disabled behaviors exist?
- **Accessibility patterns** — ARIA roles, keyboard navigation, focus management

Summarize findings to the user before proceeding.

---

## Phase 2: Design

Based on discovery, design the recipe structure. Present this to the user for approval before implementing.

### Classification Decisions

Determine and document:

1. **Component type classification** (interactive / static / container / layout / minimal)
2. **Variant axes**:
   - `color` — which colors (semantic, non-semantic, or none)
   - `variant` — which visual styles (solid/outline/soft/subtle/ghost/link)
   - `size` — which sizes (xs/sm/md/lg/xl or subset)
   - Custom axes — orientation, shape, density, boolean states (active, disabled, block)
3. **Base style template** — which base pattern to use (interactive/static/container)
4. **Compound variant strategy** — `colors.flatMap()` for semantic, manual for non-semantic, mixed for both
5. **Default variants** — what the zero-config instance should look like
6. **Sub-recipes** — which sub-parts need their own `createUseRecipe` call vs plain selectors
7. **HTML element** — what element the component renders as (`div`, `span`, `button`, etc.)

### Present Design to User

Show a structured summary:
```
Component: <Name>
Type: <interactive|static|container|layout|minimal>
Colors: <list>
Variants: <list>
Sizes: <list>
Custom axes: <list or "none">
Sub-recipes: <list or "none">
Default: color=<x>, variant=<y>, size=<z>
```

Wait for user approval before proceeding to implementation.

---

## Phase 3: Implementation

Implement all 7 deliverables in order. Each deliverable must follow the exact patterns documented below.

### Deliverable 1: Recipe TypeScript File(s)

**Path:** `theme/src/recipes/<component-name>/use<ComponentName>Recipe.ts`

#### File Template

```ts
import { createUseRecipe } from "../../utils/createUseRecipe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
] as const;

/**
 * <Brief description of the recipe>.
 */
export const use<ComponentName>Recipe = createUseRecipe("<component-name>", {
	base: {
		// Shared CSS properties applied to all variants
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			error: {},
		},
		variant: {
			// Choose variant styles appropriate for this component type.
		},
		size: {
			// Choose appropriate sizes for the component (3-5 sizes).
		},
	},
	compoundVariants: colors.flatMap((color) => [
		// One entry per variant style per color
	]),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
	},
});
```

#### Formatting Rules

- Use **tabs** for indentation (not spaces).
- Use **double quotes** for all string values.
- Add `as const` on the `colors` array.
- Add `as const` on every `variant` value inside `match` objects: `variant: "solid" as const`.
- The recipe name (first argument) is **kebab-case** matching the component.
- The exported constant follows the pattern `use<ComponentName>Recipe`.
- Use `colors.flatMap()` to generate compound variants dynamically for semantic colors. For non-semantic-only components, write all compound variants manually.

#### Base Style Templates

**Interactive Component Base** (button, menu item, toggle):
```ts
base: {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: "@font-weight.medium",
	fontSize: "@font-size.sm",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "transparent",
	borderRadius: "@border-radius.md",
	lineHeight: "@line-height.normal",
	paddingTop: "@0.5",
	paddingBottom: "@0.5",
	paddingLeft: "@0.75",
	paddingRight: "@0.75",
	cursor: "pointer",
	transitionProperty: "color, background-color, border-color",
	transitionTimingFunction: "@easing.ease-in-out",
	transitionDuration: "150ms",
	textDecoration: "none",
	whiteSpace: "nowrap",
	userSelect: "none",
	outline: "none",
	"&:focus-visible": {
		outlineWidth: "2px",
		outlineStyle: "solid",
		outlineColor: "@color.primary",
		outlineOffset: "2px",
	},
	"&:disabled": {
		cursor: "not-allowed",
		opacity: "0.75",
		pointerEvents: "none",
	},
},
```

**Static/Display Component Base** (badge, tag, chip):
```ts
base: {
	display: "inline-flex",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "transparent",
	alignItems: "center",
	fontWeight: "@font-weight.medium",
	fontSize: "@font-size.sm",
	lineHeight: "1",
	paddingTop: "@0.25",
	paddingBottom: "@0.25",
	paddingLeft: "@0.375",
	paddingRight: "@0.375",
	borderRadius: "@border-radius.md",
},
```

**Container Component Base** (alert, card, callout):
```ts
base: {
	display: "flex",
	flexBasis: "100%",
	alignItems: "flex-start",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "transparent",
	fontWeight: "@font-weight.medium",
	fontSize: "@font-size.sm",
	lineHeight: "@line-height.normal",
	paddingTop: "@0.75",
	paddingBottom: "@0.75",
	paddingLeft: "@1",
	paddingRight: "@1",
	gap: "@0.75",
	borderRadius: "@border-radius.md",
},
```

**Sectioned Container Base** (card, modal — has header/body/footer sub-parts):
```ts
base: {
	display: "flex",
	flexDirection: "column",
	flexBasis: "100%",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "transparent",
	borderRadius: "@border-radius.md",
	overflow: "hidden",
	lineHeight: "@line-height.normal",
	boxShadow: "@box-shadow.sm",
	// NO padding — sub-parts handle their own padding
},
```

#### Adapting the Base

- **Non-interactive**: Remove `cursor`, `"&:focus-visible"`, `"&:disabled"`, transition properties, `userSelect`, `outline`.
- **Block-level**: Use `display: "flex"` instead of `"inline-flex"`.
- **No borders**: Remove `borderWidth`, `borderStyle`, `borderColor`.
- **Sectioned containers**: Include `overflow: "hidden"`, omit padding. Add `boxShadow: "@box-shadow.sm"` for elevation. Add `flexDirection: "column"` directly in base.
- When using an `orientation` variant axis, omit `flexDirection` from base.

#### Token Reference Syntax

All values prefixed with `@` are design token references resolved at compile time.

| Syntax | Resolves To | Example |
|--------|-------------|---------|
| `@color.<name>` | Color token | `"@color.primary"` |
| `@color.<name>-<level>` | Color level (absolute lightness) | `"@color.primary-700"` |
| `@color.<name>-shade-<n>` | Darker shade (relative) | `"@color.primary-shade-50"` |
| `@color.<name>-tint-<n>` | Lighter tint (relative) | `"@color.primary-tint-50"` |
| `@font-size.<size>` | Font size | `"@font-size.sm"` |
| `@font-weight.<weight>` | Font weight | `"@font-weight.medium"` |
| `@border-width.<width>` | Border width | `"@border-width.thin"` |
| `@border-style.<style>` | Border style | `"@border-style.solid"` |
| `@border-radius.<size>` | Border radius | `"@border-radius.md"` |
| `@line-height.<name>` | Line height | `"@line-height.normal"` |
| `@easing.<name>` | Easing function | `"@easing.ease-in-out"` |
| `@box-shadow.<size>` | Box shadow | `"@box-shadow.md"` |
| `@z-index.<level>` | Z-index | `"@z-index.dropdown"` |
| `@<number>` | Spacing multiplier | `"@0.75"` |

**Available Token Values:**

- **Colors**: primary, secondary, success, info, warning, error, gray, white, black, background, surface, text, text-inverted, text-weak, text-weaker, text-weakest
- **Color Levels**: 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950
- **Color Shades** (darker, relative): shade-50, shade-100, shade-150, shade-200
- **Color Tints** (lighter, relative): tint-50, tint-100, tint-150, tint-200
- **Font Sizes**: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
- **Font Weights**: extralight, light, normal, medium, semibold, bold, black
- **Line Heights**: tight (1.2), snug (1.35), normal (1.5), relaxed (1.65), loose (1.9)
- **Border Radius**: none, sm, md, lg, xl, 2xl, full
- **Border Width**: none, thin, medium, thick
- **Border Style**: none, solid, dashed, dotted, double, groove, inset, outset
- **Spacing Multipliers**: @0.125, @0.25, @0.375, @0.5, @0.625, @0.75, @0.875, @1, @1.25, @1.5, @2, @2.5, @3, @4
- **Box Shadow**: none, xs, sm, md, lg, xl, 2xl, inner, ring
- **Z-Index**: hide, base, dropdown, sticky, overlay, modal, popover, toast, max, auto
- **Easing**: ease-in-out, ease-out, ease-in, spring, bounce
- **Duration**: instant, fastest, faster, fast, normal, slow, slower, slowest

#### Color Variants

The `color` variant axis always has **empty objects** for each color. All visual styling comes from compound variants.

```ts
color: {
	primary: {},
	secondary: {},
	success: {},
	info: {},
	warning: {},
	error: {},
},
```

**NEVER put CSS properties directly in color variant objects.**

#### Non-Semantic Colors

Some components need colors beyond the 6 semantic ones: `light`, `dark`, `neutral`.

| Color | Behavior |
|-------|----------|
| `light` | Always light, ignores dark mode. Uses `@color.white`, `@color.gray-*`, `@color.text`. Repeats all values in `"&:dark"` to stay fixed. |
| `dark` | Always dark, ignores dark mode. Uses `@color.gray-900`, `@color.white`. Repeats all values in `"&:dark"` to stay fixed. |
| `neutral` | Adaptive — light in light mode, dark in dark mode. Has genuinely different `"&:dark"` values. |

When non-semantic colors are used, compound variants use a **mixed pattern**:
```ts
compoundVariants: [
	...colors.flatMap((color) => [
		// Semantic colors (dynamic)
	]),
	// Light, dark, neutral (manual)
],
```

**Non-semantic-only components** (card, modal, tooltip): Omit the `colors` array entirely. Write all compound variants manually.

**Light color compound variant patterns:**
```ts
// Solid
{ match: { color: "light" as const, variant: "solid" as const }, css: {
	background: "@color.white", color: "@color.text", borderColor: "@color.gray-150",
	"&:dark": { background: "@color.white", color: "@color.text", borderColor: "@color.gray-150" },
}},
// Outline
{ match: { color: "light" as const, variant: "outline" as const }, css: {
	color: "@color.text", borderColor: "@color.gray-300",
}},
// Soft
{ match: { color: "light" as const, variant: "soft" as const }, css: {
	background: "@color.gray-100", color: "@color.gray-700",
	"&:dark": { background: "@color.gray-100", color: "@color.gray-700" },
}},
// Subtle
{ match: { color: "light" as const, variant: "subtle" as const }, css: {
	background: "@color.gray-100", color: "@color.gray-700", borderColor: "@color.gray-300",
	"&:dark": { background: "@color.gray-100", color: "@color.gray-700", borderColor: "@color.gray-300" },
}},
```

**Dark color compound variant patterns:**
```ts
// Solid
{ match: { color: "dark" as const, variant: "solid" as const }, css: {
	background: "@color.gray-900", color: "@color.white", borderColor: "@color.gray-850",
	"&:dark": { background: "@color.gray-900", color: "@color.white", borderColor: "@color.gray-850" },
}},
// Outline
{ match: { color: "dark" as const, variant: "outline" as const }, css: {
	color: "@color.gray-200", borderColor: "@color.gray-600",
	"&:dark": { color: "@color.gray-200", borderColor: "@color.gray-600" },
}},
// Soft
{ match: { color: "dark" as const, variant: "soft" as const }, css: {
	background: "@color.gray-800", color: "@color.gray-300",
	"&:dark": { background: "@color.gray-800", color: "@color.gray-300" },
}},
// Subtle
{ match: { color: "dark" as const, variant: "subtle" as const }, css: {
	background: "@color.gray-800", color: "@color.gray-300", borderColor: "@color.gray-600",
	"&:dark": { background: "@color.gray-800", color: "@color.gray-300", borderColor: "@color.gray-600" },
}},
```

**Neutral color compound variant patterns (adaptive):**
```ts
// Solid
{ match: { color: "neutral" as const, variant: "solid" as const }, css: {
	background: "@color.white", color: "@color.text", borderColor: "@color.gray-150",
	"&:dark": { background: "@color.gray-900", color: "@color.white", borderColor: "@color.gray-850" },
}},
// Outline
{ match: { color: "neutral" as const, variant: "outline" as const }, css: {
	color: "@color.text", borderColor: "@color.gray-300",
	"&:dark": { color: "@color.gray-200", borderColor: "@color.gray-600" },
}},
// Soft
{ match: { color: "neutral" as const, variant: "soft" as const }, css: {
	background: "@color.gray-100", color: "@color.gray-700",
	"&:dark": { background: "@color.gray-800", color: "@color.gray-300" },
}},
// Subtle
{ match: { color: "neutral" as const, variant: "subtle" as const }, css: {
	background: "@color.gray-100", color: "@color.gray-700", borderColor: "@color.gray-300",
	"&:dark": { background: "@color.gray-800", color: "@color.gray-300", borderColor: "@color.gray-600" },
}},
```

#### Variant Styles

Choose which variant styles your component supports:

| Component Type | Variant Styles |
|----------------|----------------|
| Interactive (button, link, menu item) | solid, outline, soft, subtle, ghost, link |
| Static display (badge, tag, chip) | solid, outline, soft, subtle |
| Minimal (avatar, indicator) | solid, soft |

Variant style base definitions:
```ts
variant: {
	solid: {},
	outline: {},
	soft: {},
	subtle: {},
	ghost: { background: "transparent" },              // Interactive only
	link: { background: "transparent", borderColor: "transparent", borderWidth: "0" }, // Interactive only
},
```

#### Size Variants

**Interactive Component Sizes** (button-like):
```ts
size: {
	xs: { fontSize: "@font-size.xs", paddingTop: "@0.25", paddingBottom: "@0.25", paddingLeft: "@0.5", paddingRight: "@0.5", gap: "@0.25", borderRadius: "@border-radius.md" },
	sm: { fontSize: "@font-size.sm", paddingTop: "@0.375", paddingBottom: "@0.375", paddingLeft: "@0.625", paddingRight: "@0.625", gap: "@0.375", borderRadius: "@border-radius.md" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.375", borderRadius: "@border-radius.md" },
	lg: { fontSize: "@font-size.md", paddingTop: "@0.625", paddingBottom: "@0.625", paddingLeft: "@0.875", paddingRight: "@0.875", gap: "@0.5", borderRadius: "@border-radius.md" },
	xl: { fontSize: "@font-size.lg", paddingTop: "@0.75", paddingBottom: "@0.75", paddingLeft: "@1", paddingRight: "@1", gap: "@0.5", borderRadius: "@border-radius.lg" },
},
```

**Display Component Sizes** (badge-like):
```ts
size: {
	xs: { fontSize: "@font-size.2xs", lineHeight: "@line-height.normal", paddingTop: "@0.125", paddingBottom: "@0.125", paddingLeft: "@0.25", paddingRight: "@0.25", gap: "@0.125", borderRadius: "@border-radius.sm" },
	sm: { fontSize: "@font-size.xs", lineHeight: "@line-height.tight", paddingTop: "@0.25", paddingBottom: "@0.25", paddingLeft: "@0.375", paddingRight: "@0.375", gap: "@0.25", borderRadius: "@border-radius.md" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.375", paddingBottom: "@0.375", paddingLeft: "@0.5", paddingRight: "@0.5", gap: "@0.375", borderRadius: "@border-radius.md" },
	lg: { fontSize: "@font-size.md", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.625", paddingRight: "@0.625", gap: "@0.5", borderRadius: "@border-radius.md" },
	xl: { fontSize: "@font-size.lg", paddingTop: "@0.625", paddingBottom: "@0.625", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.625", borderRadius: "@border-radius.lg" },
},
```

**Container Component Sizes** (alert, card sub-parts):
```ts
size: {
	sm: { fontSize: "@font-size.xs", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.5" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.75", paddingBottom: "@0.75", paddingLeft: "@1", paddingRight: "@1", gap: "@0.75" },
	lg: { fontSize: "@font-size.md", paddingTop: "@1", paddingBottom: "@1", paddingLeft: "@1.25", paddingRight: "@1.25", gap: "@1" },
},
```

#### Custom Variant Axes

**Orientation** (layout direction):
```ts
orientation: {
	horizontal: { flexDirection: "row" },
	vertical: { flexDirection: "column" },
},
```
When using orientation, omit `flexDirection` from base and include it in `defaultVariants`.

**Boolean State Axes** (active, disabled, block):
```ts
active: {
	true: { fontWeight: "@font-weight.semibold" },
	false: {},
},
```
Default to `"false"` in `defaultVariants`. **NEVER** use `selector()` with class-based modifiers for states that apply to the element itself.

#### Compound Variants — Semantic Color Patterns

**SOLID** (filled background, white text):

Interactive:
```ts
{ match: { color, variant: "solid" as const }, css: {
	background: `@color.${color}`, color: "@color.white", borderColor: `@color.${color}-shade-50`,
	"&:hover": { background: `@color.${color}-tint-50` },
	"&:focus": { background: `@color.${color}-tint-50` },
	"&:active": { background: `@color.${color}-tint-100` },
	"&:dark": { borderColor: `@color.${color}-tint-50` },
}},
```

Static:
```ts
{ match: { color, variant: "solid" as const }, css: {
	background: `@color.${color}`, color: "@color.white", borderColor: `@color.${color}-shade-50`,
	"&:dark": { borderColor: `@color.${color}-tint-50` },
}},
```

**OUTLINE** (transparent background, colored border and text):

Interactive:
```ts
{ match: { color, variant: "outline" as const }, css: {
	color: `@color.${color}`, borderColor: `@color.${color}`,
	"&:hover": { color: `@color.${color}-700`, background: `@color.${color}-150` },
	"&:focus": { color: `@color.${color}-700`, background: `@color.${color}-150` },
	"&:active": { color: `@color.${color}-700`, background: `@color.${color}-200` },
	"&:dark:hover": { color: `@color.${color}-300`, background: `@color.${color}-800` },
	"&:dark:focus": { color: `@color.${color}-300`, background: `@color.${color}-800` },
	"&:dark:active": { color: `@color.${color}-300`, background: `@color.${color}-750` },
}},
```

Static:
```ts
{ match: { color, variant: "outline" as const }, css: {
	color: `@color.${color}`, borderColor: `@color.${color}`,
}},
```

**SOFT** (light background, dark text, no visible border):

Interactive:
```ts
{ match: { color, variant: "soft" as const }, css: {
	background: `@color.${color}-100`, color: `@color.${color}-700`,
	"&:hover": { background: `@color.${color}-150` },
	"&:focus": { background: `@color.${color}-150` },
	"&:active": { background: `@color.${color}-200` },
	"&:dark": { background: `@color.${color}-800`, color: `@color.${color}-400` },
	"&:dark:hover": { background: `@color.${color}-750` },
	"&:dark:focus": { background: `@color.${color}-750` },
	"&:dark:active": { background: `@color.${color}-700` },
}},
```

Static:
```ts
{ match: { color, variant: "soft" as const }, css: {
	background: `@color.${color}-100`, color: `@color.${color}-700`,
	"&:dark": { background: `@color.${color}-800`, color: `@color.${color}-400` },
}},
```

**SUBTLE** (light background, dark text, WITH colored border):

Interactive:
```ts
{ match: { color, variant: "subtle" as const }, css: {
	background: `@color.${color}-100`, color: `@color.${color}-700`, borderColor: `@color.${color}-300`,
	"&:hover": { background: `@color.${color}-150` },
	"&:focus": { background: `@color.${color}-150` },
	"&:active": { background: `@color.${color}-200` },
	"&:dark": { background: `@color.${color}-800`, color: `@color.${color}-400`, borderColor: `@color.${color}-600` },
	"&:dark:hover": { background: `@color.${color}-750` },
	"&:dark:focus": { background: `@color.${color}-750` },
	"&:dark:active": { background: `@color.${color}-700` },
}},
```

Static:
```ts
{ match: { color, variant: "subtle" as const }, css: {
	background: `@color.${color}-100`, color: `@color.${color}-700`, borderColor: `@color.${color}-300`,
	"&:dark": { background: `@color.${color}-800`, color: `@color.${color}-400`, borderColor: `@color.${color}-600` },
}},
```

**GHOST** (transparent, text only, hover reveals background) — Interactive only:
```ts
{ match: { color, variant: "ghost" as const }, css: {
	color: `@color.${color}`,
	"&:hover": { color: `@color.${color}-700`, background: `@color.${color}-100` },
	"&:focus": { color: `@color.${color}-700`, background: `@color.${color}-100` },
	"&:active": { background: `@color.${color}-200` },
	"&:dark:hover": { color: `@color.${color}-400`, background: `@color.${color}-750` },
	"&:dark:focus": { color: `@color.${color}-400`, background: `@color.${color}-750` },
	"&:dark:active": { background: `@color.${color}-700` },
}},
```

**LINK** (transparent, underline on hover) — Interactive only:
```ts
{ match: { color, variant: "link" as const }, css: {
	color: `@color.${color}`,
	"&:hover": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
	"&:focus": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
	"&:active": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
}},
```

#### Pseudo-Selector Reference

| Selector | Usage | Notes |
|----------|-------|-------|
| `"&:hover"` | Mouse hover | **Always pair with `"&:focus"`** |
| `"&:focus"` | Keyboard/programmatic focus | **Always pair with `"&:hover"`** |
| `"&:active"` | Active/pressed state | |
| `"&:focus-visible"` | Keyboard-only focus ring | Use in `base` only |
| `"&:disabled"` | Disabled state | Use in `base` only |
| `"&:dark"` | Dark mode | Reverses color scheme |
| `"&:dark:hover"` | Dark mode + hover | Compound dark state |
| `"&:dark:focus"` | Dark mode + focus | Compound dark state |
| `"&:dark:active"` | Dark mode + active | Compound dark state |

**CRITICAL:** Always use the `"&:dark"` syntax with the `&:` prefix. Never use bare `dark:`.

#### Multi-Recipe Components

- **Use a recipe** when a sub-part needs **variant axes** (size-responsive padding, color variants).
- **Use a plain CSS selector** when a sub-part has **fixed styling with no variants**.
- **Use a plain Vue wrapper** when a sub-part is purely structural.

Rules:
1. All recipes in a single directory share the same `colors` array (when semantic colors are used).
2. Each recipe has its own `base`, `variants`, `compoundVariants`, `defaultVariants`.
3. Sub-component recipes may have fewer variant axes.
4. Sub-recipes include `color` and `variant` axes when visual styling varies by parent's color/variant.
5. Name each recipe with full sub-component path: `"card-header"`, `"card-footer"`.
6. Export each recipe individually.

#### Default Variant Guidance

- Interactive components: `color: "primary"`, `variant: "solid"`, `size: "md"`
- Container/feedback components: `color: "neutral"`, `variant: "subtle"`, `size: "md"`
- Display components (badge): `color: "neutral"`, `variant: "solid"`, `size: "sm"`
- Non-semantic containers (card, modal): `color: "neutral"`, `variant: "solid"`, `size: "md"`

---

### Deliverable 2: Barrel Index

**Path:** `theme/src/recipes/<component-name>/index.ts`

```ts
export * from "./use<ComponentName>Recipe";
// For multi-recipe: one export per sub-recipe
```

Also update `theme/src/recipes/index.ts` — add `export * from "./<component-name>";` in alphabetical order.

---

### Deliverable 3: Tests

**Path:** `theme/src/recipes/<component-name>/use<ComponentName>Recipe.test.ts`

#### Test Setup

```ts
import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "background", "color", /* ... all CSS properties used in the recipe */]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}
```

#### Required Test Cases

```ts
describe("use<ComponentName>Recipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = use<ComponentName>Recipe(s);
		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("<component-name>");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = use<ComponentName>Recipe(s);
		expect(recipe.base).toEqual({ /* full base object */ });
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s);
			expect(Object.keys(recipe.variants!.color)).toEqual([/* color list */]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s);
			expect(Object.keys(recipe.variants!.variant)).toEqual([/* variant list */]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s);
			expect(Object.keys(recipe.variants!.size)).toEqual([/* size list */]);
			// Test specific size values
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = use<ComponentName>Recipe(s);
		expect(recipe.defaultVariants).toEqual({ /* defaults */ });
	});

	describe("compound variants", () => {
		it("should have N compound variants", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s);
			expect(recipe.compoundVariants).toHaveLength(/* count */);
		});

		it("should have correct <color>/<variant> compound variant", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s);
			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "<color>" && v.match.variant === "<variant>"
			);
			expect(cv?.css).toEqual({ /* expected css */ });
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s, {
				base: { display: "block" },
			});
			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s, {
				filter: { color: ["primary"] },
			});
			expect(Object.keys(recipe.variants!.color)).toEqual(["primary"]);
		});

		it("should prune compound variants when filtering", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s, {
				filter: { color: ["primary"], variant: ["solid"] },
			});
			expect(recipe.compoundVariants!.length).toBeLessThan(/* original count */);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = use<ComponentName>Recipe(s, {
				filter: { color: ["success"] },
			});
			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
```

Enumerate ALL CSS properties used in the recipe's base, variants, and compound variants for the `createInstance()` utility list.

---

### Deliverable 4: Storybook Styleframe

**Path:** `apps/storybook/stories/components/<component-name>.styleframe.ts`

```ts
import { use<ComponentName>Recipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

export const <componentName> = use<ComponentName>Recipe(s);
// For multi-recipe, export each: export const <componentName>Header = use<ComponentName>HeaderRecipe(s);

selector(".<component-name>-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",  // Use "flex-start" for container components
});

selector(".<component-name>-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".<component-name>-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".<component-name>-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
```

---

### Deliverable 5: Storybook Stories

**Path:** `apps/storybook/stories/components/<component-name>.stories.ts`

```ts
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import <ComponentName> from "../../src/components/components/<component-name>/<ComponentName>.vue";
import <ComponentName>Grid from "../../src/components/components/<component-name>/preview/<ComponentName>Grid.vue";
import <ComponentName>SizeGrid from "../../src/components/components/<component-name>/preview/<ComponentName>SizeGrid.vue";

const colors = [/* recipe color values */] as const;
const variants = [/* recipe variant values */] as const;
const sizes = [/* recipe size values */] as const;

const meta = {
	title: "Theme/Recipes/<ComponentName>",
	component: <ComponentName>,
	tags: ["autodocs"],
	argTypes: {
		color: { control: "select", options: colors, description: "The color variant" },
		variant: { control: "select", options: variants, description: "The visual style variant" },
		size: { control: "select", options: sizes, description: "The size" },
		// Add argTypes for custom variant axes and component-specific props (label, disabled, etc.)
	},
} satisfies Meta<typeof <ComponentName>>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
	args: {
		color: "<default-color>",
		variant: "<default-variant>",
		size: "<default-size>",
		// component-specific defaults (label, etc.)
	},
};

// Grid stories
export const AllVariants: StoryObj = {
	render: () => ({
		components: { <ComponentName>Grid },
		template: "<<ComponentName>Grid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { <ComponentName>SizeGrid },
		template: "<<ComponentName>SizeGrid />",
	}),
};

// Per-color stories
export const Primary: Story = { args: { color: "primary", label: "Primary" } };
export const Secondary: Story = { args: { color: "secondary", label: "Secondary" } };
export const Success: Story = { args: { color: "success", label: "Success" } };
export const Info: Story = { args: { color: "info", label: "Info" } };
export const Warning: Story = { args: { color: "warning", label: "Warning" } };
export const Error: Story = { args: { color: "error", label: "Error" } };
// Add Light, Dark, Neutral if non-semantic colors are used

// Per-variant stories
export const Solid: Story = { args: { variant: "solid", label: "Solid" } };
export const Outline: Story = { args: { variant: "outline", label: "Outline" } };
export const Soft: Story = { args: { variant: "soft", label: "Soft" } };
export const Subtle: Story = { args: { variant: "subtle", label: "Subtle" } };
// Add Ghost, Link if interactive

// Per-size stories
export const ExtraSmall: Story = { args: { size: "xs", label: "Extra Small" } };
export const Small: Story = { args: { size: "sm", label: "Small" } };
export const Medium: Story = { args: { size: "md", label: "Medium" } };
export const Large: Story = { args: { size: "lg", label: "Large" } };
export const ExtraLarge: Story = { args: { size: "xl", label: "Extra Large" } };

// Feature stories (if applicable)
export const Disabled: Story = { args: { disabled: true, label: "Disabled" } };
```

---

### Deliverable 6: Vue Components

#### Main Component

**Path:** `apps/storybook/src/components/components/<component-name>/<ComponentName>.vue`

```vue
<script setup lang="ts">
import { computed } from "vue";
import { <componentName> } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: /* union of recipe color values */;
		variant?: /* union of recipe variant values */;
		size?: /* union of recipe size values */;
		// Component-specific props: label, disabled, etc.
	}>(),
	{},
);

const classes = computed(() =>
	<componentName>({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	</* element */ :class="classes">
		{{ props.label }}
		<slot />
	</ /* element */>
</template>
```

#### Preview Grid Component

**Path:** `apps/storybook/src/components/components/<component-name>/preview/<ComponentName>Grid.vue`

```vue
<script setup lang="ts">
import <ComponentName> from "../<ComponentName>.vue";

const colors = [/* all colors */] as const;
const variants = [/* all variants */] as const;
</script>

<template>
	<div class="<component-name>-section">
		<div v-for="variant in variants" :key="variant">
			<div class="<component-name>-label">{{ variant }}</div>
			<div class="<component-name>-row">
				<<ComponentName>
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
```

#### Preview Size Grid Component

**Path:** `apps/storybook/src/components/components/<component-name>/preview/<ComponentName>SizeGrid.vue`

```vue
<script setup lang="ts">
import <ComponentName> from "../<ComponentName>.vue";

const sizes = [/* all sizes */] as const;
</script>

<template>
	<div class="<component-name>-section">
		<div v-for="size in sizes" :key="size">
			<div class="<component-name>-label">{{ size }}</div>
			<div class="<component-name>-row">
				<<ComponentName> :size="size" :label="size" />
			</div>
		</div>
	</div>
</template>
```

---

### Deliverable 7: Documentation

**Path:** `apps/docs/content/docs/06.components/02.composables/<nn>.<component-name>.md`

Determine `<nn>` by looking at existing files and choosing the next number in sequence.

Follow this exact structure (derived from existing badge.md and tooltip.md):

```markdown
---
title: <ComponentName>
description: <One-sentence description covering purpose, colors, visual styles, sizes, and the recipe system.>
---

## Overview

The **<ComponentName>** is <description of what the component is and when it's used>. The `use<ComponentName>Recipe()` composable creates a fully configured [recipe](/docs/api/recipes) with color, variant, and size options &mdash; plus compound variants that handle the color-variant combinations automatically.

The <ComponentName> recipe integrates directly with the default [design tokens preset](/docs/design-tokens/presets) and generates type-safe utility classes at build time with zero runtime CSS.

## Why use the <ComponentName> recipe?

The <ComponentName> recipe helps you:

- **Ship faster with sensible defaults**: Get <N> colors, <N> visual styles, and <N> sizes out of the box with a single composable call.
- **Maintain consistency**: Compound variants ensure every color-variant combination follows the same design rules.
- **Customize without forking**: Override base styles, default variants, or filter out options you don't need &mdash; all through the options API.
- **Stay type-safe**: Full TypeScript support means your editor catches invalid color, variant, or size values at compile time.
- **Integrate with your tokens**: Every value references the design tokens preset, so theme changes propagate automatically.

## Usage

::steps{level="4"}

#### Register the recipe

Add the <ComponentName> recipe to a local Styleframe instance. The global `styleframe.config.ts` provides design tokens and utilities, while the component-level file registers the recipe itself:

:::code-tree{default-value="src/components/<component-name>.styleframe.ts"}

` ` `ts [src/components/<component-name>.styleframe.ts]
import { styleframe } from 'virtual:styleframe';
import { use<ComponentName>Recipe } from '@styleframe/theme';

const s = styleframe();

const <componentName> = use<ComponentName>Recipe(s);

export default s;
` ` `

` ` `ts [styleframe.config.ts]
import { styleframe } from 'styleframe';
import { useDesignTokensPreset, useUtilitiesPreset } from '@styleframe/theme';

const s = styleframe();

useDesignTokensPreset(s);
useUtilitiesPreset(s);

export default s;
` ` `

:::

#### Build the component

Import the `<componentName>` runtime function from the virtual module and pass variant props to compute class names:

:::tabs
::::tabs-item{icon="i-devicon-react" label="React"}

` ` `ts [src/components/<ComponentName>.tsx]
import { <componentName> } from "virtual:styleframe";

interface <ComponentName>Props {
	color?: /* union */;
	variant?: /* union */;
	size?: /* union */;
	children?: React.ReactNode;
}

export function <ComponentName>({
	color = "<default>",
	variant = "<default>",
	size = "<default>",
	children,
}: <ComponentName>Props) {
	const classes = <componentName>({ color, variant, size });
	return <<element> className={classes}>{children}</<element>>;
}
` ` `

::::
::::tabs-item{icon="i-devicon-vuejs" label="Vue"}

` ` `vue [src/components/<ComponentName>.vue]
<script setup lang="ts">
import { <componentName> } from "virtual:styleframe";

const { color = "<default>", variant = "<default>", size = "<default>" } = defineProps<{
	color?: /* union */;
	variant?: /* union */;
	size?: /* union */;
}>();
</script>

<template>
	<<element> :class="<componentName>({ color, variant, size })">
		<slot />
	</<element>>
</template>
` ` `

::::
:::

#### See it in action

:::story-preview
---
story: theme-recipes-<component-name>--default
panel: true
---
:::

::

## Colors

<Description of the color system for this component.>

::story-preview
---
story: theme-recipes-<component-name>--<default-color>
panel: true
---
::

### Color Reference

::story-preview
---
story: theme-recipes-<component-name>--all-variants
height: 420
---
::

| Color | Token | Use Case |
|-------|-------|----------|
| `primary` | `@color.primary` | Default actions, links, key information |
| `secondary` | `@color.secondary` | Secondary information, neutral states |
| `success` | `@color.success` | Positive states, confirmations, completions |
| `info` | `@color.info` | Informational messages, tips, highlights |
| `warning` | `@color.warning` | Caution states, pending actions |
| `error` | `@color.error` | Error states, destructive actions, alerts |
| `light` | `@color.white` / `@color.gray-*` | Light surfaces, stays light in dark mode |
| `dark` | `@color.gray-900` | Dark surfaces, stays dark in light mode |
| `neutral` | Adaptive (light <-> dark) | Default color, adapts to the current color scheme |

::tip
**Pro tip:** Use semantic color names that describe purpose, not appearance.
::

## Variants

<Description of variant styles and count.>

### Solid
<Description.>
::story-preview
---
story: theme-recipes-<component-name>--solid
panel: true
---
::

### Outline
<Description.>
::story-preview
---
story: theme-recipes-<component-name>--outline
panel: true
---
::

### Soft
<Description.>
::story-preview
---
story: theme-recipes-<component-name>--soft
panel: true
---
::

### Subtle
<Description.>
::story-preview
---
story: theme-recipes-<component-name>--subtle
panel: true
---
::

## Sizes

<Description of size system.>

::story-preview
---
story: theme-recipes-<component-name>--all-sizes
height: 480
---
::

| Size | Font Size | Border Radius |
|------|-----------|---------------|
<!-- Fill based on recipe size values -->

## Accessibility

- **<Accessibility guideline 1>**
- **<Accessibility guideline 2>**

## Customization

### Overriding Defaults

` ` `ts [src/components/<component-name>.styleframe.ts]
const <componentName> = use<ComponentName>Recipe(s, {
    base: { borderRadius: '@border-radius.full' },
    defaultVariants: { color: 'success', variant: 'soft', size: 'md' },
});
` ` `

### Filtering Variants

` ` `ts [src/components/<component-name>.styleframe.ts]
const <componentName> = use<ComponentName>Recipe(s, {
    filter: {
        color: ['primary', 'error'],
        variant: ['solid', 'outline'],
    },
});
` ` `

::note
**Good to know:** Filtering also removes compound variants and adjusts default variants that reference filtered-out values, so your recipe stays consistent.
::

## API Reference

### `use<ComponentName>Recipe(s, options?)`

Creates a full <component-name> recipe with all variants and compound variant styling.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Styleframe` | The Styleframe instance |
| `options` | `DeepPartial<RecipeConfig>` | Optional overrides for the recipe configuration |
| `options.base` | `VariantDeclarationsBlock` | Custom base styles |
| `options.variants` | `Variants` | Custom variant definitions |
| `options.defaultVariants` | `Record<keyof Variants, string>` | Default variant values |
| `options.compoundVariants` | `CompoundVariant[]` | Custom compound variant definitions |
| `options.filter` | `Record<string, string[]>` | Limit which variant values are generated |

**Variants:**

| Variant | Options | Default |
|---------|---------|---------|
| `color` | <!-- list --> | `<default>` |
| `variant` | <!-- list --> | `<default>` |
| `size` | <!-- list --> | `<default>` |

[Learn more about recipes ->](/docs/api/recipes)

## Best Practices

- **Choose colors by meaning, not appearance**: Use `success` for positive states and `error` for errors.
- **Stick to one or two sizes per context**: Mixing too many sizes creates visual noise.
- **Filter what you don't need**: Pass a `filter` option to reduce generated CSS.
- **Override defaults at the recipe level**: Set your most common combination as `defaultVariants`.
<!-- Add component-specific best practices -->

## FAQ

::accordion

:::accordion-item{label="How do compound variants work in this recipe?" icon="i-lucide-circle-help"}
<Answer explaining the compound variant matrix for this specific component.>
[Learn more about compound variants ->](/docs/api/recipes#compound-variants)
:::

:::accordion-item{label="Can I add custom colors?" icon="i-lucide-circle-help"}
<Answer with code example showing how to extend colors.>
:::

:::accordion-item{label="How does filtering affect compound variants?" icon="i-lucide-circle-help"}
When you use the `filter` option, compound variants that reference filtered-out values are automatically removed. Default variants are also adjusted if they reference a removed value.
:::

<!-- Add 2-3 more component-specific FAQ items -->

::
```

**IMPORTANT:** Replace `` ` ` ` `` with actual triple backticks in the real file. The spacing is used here only to avoid breaking the skill's own Markdown.

---

## Phase 4: Verification

After all deliverables are created:

1. **Typecheck**: Run `pnpm typecheck` from project root
2. **Tests**: Run `cd theme && pnpm test` to verify recipe tests pass
3. **Lint**: Run `pnpm lint` from project root
4. **Build storybook** (optional): Run `pnpm storybook` to verify stories render

Fix any issues found during verification.

---

## Validation Checklist

Before considering a recipe complete, verify every item:

### Structure
- [ ] File imports `createUseRecipe` from `"../../utils/createUseRecipe"`
- [ ] `colors` array contains exactly: `"primary"`, `"secondary"`, `"success"`, `"info"`, `"warning"`, `"error"` (omit entirely for non-semantic-only components)
- [ ] `colors` array has `as const` assertion (when present)
- [ ] Recipe is exported as `export const use<ComponentName>Recipe`
- [ ] Recipe name (first arg) is kebab-case matching the component
- [ ] File uses tabs for indentation
- [ ] File uses double quotes for strings
- [ ] Container component base includes `flexBasis: "100%"`
- [ ] Sectioned containers include `overflow: "hidden"` and omit padding

### Variants
- [ ] `color` variant has empty objects `{}` for all colors
- [ ] `variant` has appropriate styles for the component type
- [ ] `size` has appropriate sizes (3-5 sizes)
- [ ] `defaultVariants` specifies all axes
- [ ] Default values match the component's primary use case

### Compound Variants
- [ ] Every `match` object has `as const` on the variant style value
- [ ] Every color x variant-style combination has a compound variant entry
- [ ] `colors.flatMap()` used for semantic colors
- [ ] Compound variants use template literals: `` `@color.${color}` ``

### Non-Semantic Colors (when applicable)
- [ ] `light`, `dark`, `neutral` have manually written compound variants
- [ ] Non-semantic colors use gray tokens
- [ ] `light` and `dark` repeat same values in `"&:dark"` to stay fixed
- [ ] `neutral` has genuinely different `"&:dark"` values

### Interactive States (when applicable)
- [ ] Every `"&:hover"` is paired with `"&:focus"`
- [ ] `"&:active"` is included for pressed states
- [ ] Base includes `"&:focus-visible"` with outline styling
- [ ] Base includes `"&:disabled"` with cursor/opacity/pointerEvents

### Dark Mode
- [ ] All compound variants with colored backgrounds include `"&:dark"` overrides
- [ ] Dark interactive states use `"&:dark:hover"`, `"&:dark:focus"`, `"&:dark:active"`
- [ ] `"&:dark"` always uses the `&:` prefix

### Color Token Correctness
- [ ] Solid: background = base color, text = white, border = shade-50
- [ ] Outline: text and border = base color
- [ ] Soft: background = -100 level, text = -700 level
- [ ] Subtle: same as soft PLUS borderColor = -300 level
- [ ] Ghost: text = base color, hover background = -100
- [ ] Link: text = base color, hover = shade-50

### Dark Mode Token Correctness
- [ ] Solid dark: borderColor switches from shade-50 to tint-50
- [ ] Soft dark: background -800, color -400
- [ ] Soft dark hover/focus: -750; dark active: -700
- [ ] Subtle dark: background -800, color -400, borderColor -600
- [ ] Ghost dark hover/focus: color -400, background -750; dark active: -700

### All Deliverables
- [ ] Recipe TS file(s) at `theme/src/recipes/<name>/`
- [ ] Barrel index at `theme/src/recipes/<name>/index.ts`
- [ ] Root barrel updated at `theme/src/recipes/index.ts`
- [ ] Tests at `theme/src/recipes/<name>/use<Name>Recipe.test.ts`
- [ ] Storybook styleframe at `apps/storybook/stories/components/<name>.styleframe.ts`
- [ ] Storybook stories at `apps/storybook/stories/components/<name>.stories.ts`
- [ ] Vue component at `apps/storybook/src/components/components/<name>/<Name>.vue`
- [ ] Preview grid at `apps/storybook/src/components/components/<name>/preview/<Name>Grid.vue`
- [ ] Preview size grid at `apps/storybook/src/components/components/<name>/preview/<Name>SizeGrid.vue`
- [ ] Documentation at `apps/docs/content/docs/06.components/02.composables/<nn>.<name>.md`
