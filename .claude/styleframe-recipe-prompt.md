# Styleframe Recipe Creation Prompt

You are creating component recipes for Styleframe, a type-safe CSS-in-TypeScript framework. A recipe is a component variant system that generates CSS utility classes based on configurable axes (color, variant style, size). At runtime, calling `button({ color: "primary", variant: "solid", size: "md" })` returns a string of CSS class names.

Recipes live in `theme/src/recipes/` and are built using the `createUseRecipe()` factory.

---

## File Template

Every recipe file follows this exact structure. Replace `<ComponentName>` with PascalCase and `<component-name>` with kebab-case.

```ts
import { createUseRecipe } from "../utils/createUseRecipe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
] as const;

// Use `const` by default. Export `colors` (and optionally a `variants` array)
// when they need to be consumed externally (e.g., by storybook stories or Vue components).

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
			// Interactive components: solid, outline, soft, subtle, ghost, link
			// Static/display components: solid, outline, soft, subtle
		},
		size: {
			// Choose appropriate sizes for the component (3-5 sizes).
			// Not every component needs all 5 — containers may use sm/md/lg only.
			xs: { /* ... */ },
			sm: { /* ... */ },
			md: { /* ... */ },
			lg: { /* ... */ },
			xl: { /* ... */ },
		},
		// Optional: custom variant axes (orientation, shape, density, etc.)
	},
	compoundVariants: colors.flatMap((color) => [
		// One entry per variant style per color (see Compound Variants section)
	]),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
		// Include defaults for any custom variant axes
	},
});

// Default variant guidance:
// - Interactive components: color: "primary", variant: "solid", size: "md"
// - Container/feedback components: color: "neutral", variant: "subtle", size: "md"
// - Display components (badge): color: "primary", variant: "solid", size: "sm"
```

### Formatting Rules

- Use **tabs** for indentation (not spaces).
- Use **double quotes** for all string values.
- Add `as const` on the `colors` array.
- Add `as const` on every `variant` value inside `match` objects: `variant: "solid" as const`.
- The recipe name (first argument) is **kebab-case** matching the component.
- The exported constant follows the pattern `use<ComponentName>Recipe`.
- Use `colors.flatMap()` to generate compound variants dynamically (when semantic colors are used). For non-semantic-only components, write all compound variants manually.

---

## Base Styles

The `base` object contains CSS properties applied to every instance regardless of variant selections.

### Interactive Component Base (button, menu item, toggle)

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

### Static/Display Component Base (badge, tag, chip)

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

### Container Component Base (alert, card, callout)

Block-level components that wrap content with optional icons/actions:

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

Note: `flexDirection` is omitted from the base when using an `orientation` variant (see Custom Variant Axes).

### Adapting the Base

- **Non-interactive components**: Remove `cursor`, `"&:focus-visible"`, `"&:disabled"`, transition properties, `userSelect`, `outline`.
- **Block-level components** (card, alert): Use `display: "flex"` instead of `"inline-flex"`.
- **Components without borders**: Remove `borderWidth`, `borderStyle`, `borderColor`.
- **Sectioned containers** (card, dialog): When the component has distinct sub-parts (header/body/footer) that each have their own padding, **omit padding from the main container base**. Add `overflow: "hidden"` so child content is clipped by the container's `borderRadius`. Add `boxShadow: "@box-shadow.sm"` for elevation when the component is a surface/card. Add `flexDirection: "column"` directly in the base (no orientation variant).
- Adjust default padding/fontSize/lineHeight to fit the component's purpose.

---

## Token Reference Syntax

All values prefixed with `@` are design token references resolved at compile time.

| Syntax | Resolves To | Example |
|--------|-------------|---------|
| `@color.<name>` | Color token | `"@color.primary"` |
| `@color.<name>-<level>` | Color level (absolute lightness) | `"@color.primary-700"` |
| `@color.<name>-shade-<n>` | Darker shade (relative) | `"@color.primary-shade-50"` |
| `@color.<name>-tint-<n>` | Lighter tint (relative) | `"@color.primary-tint-50"` |
| `@font-size.<size>` | Font size token | `"@font-size.sm"` |
| `@font-weight.<weight>` | Font weight token | `"@font-weight.medium"` |
| `@border-width.<width>` | Border width token | `"@border-width.thin"` |
| `@border-style.<style>` | Border style token | `"@border-style.solid"` |
| `@border-radius.<size>` | Border radius token | `"@border-radius.md"` |
| `@line-height.<name>` | Line height token | `"@line-height.normal"` |
| `@easing.<name>` | Easing function token | `"@easing.ease-in-out"` |
| `@box-shadow.<size>` | Box shadow token | `"@box-shadow.md"` |
| `@z-index.<level>` | Z-index token | `"@z-index.dropdown"` |
| `@<number>` | Spacing multiplier: `calc(var(--spacing) * <number>)` | `"@0.75"` |

### Available Token Values

**Colors**: primary, secondary, success, info, warning, error, gray, white, black, background, surface, text, text-inverted, text-weak, text-weaker, text-weakest

**Color Levels** (absolute lightness): 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950

**Color Shades** (darker, relative): shade-50, shade-100, shade-150, shade-200

**Color Tints** (lighter, relative): tint-50, tint-100, tint-150, tint-200

**Font Sizes**: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl

**Font Weights**: extralight, light, normal, medium, semibold, bold, black

**Line Heights**: tight (1.2), snug (1.35), normal (1.5), relaxed (1.65), loose (1.9)

**Border Radius**: none, sm, md, lg, xl, 2xl, full

**Border Width**: none, thin, medium, thick

**Border Style**: none, solid, dashed, dotted, double, groove, inset, outset

**Spacing Multipliers**: @0.125, @0.25, @0.375, @0.5, @0.625, @0.75, @0.875, @1, @1.25, @1.5, @2, @2.5, @3, @4

**Box Shadow**: none, xs, sm, md, lg, xl, 2xl, inner, ring

**Z-Index**: hide, base, dropdown, sticky, overlay, modal, popover, toast, max, auto

**Easing**: ease-in-out, ease-out, ease-in, spring, bounce, and more

**Duration**: instant, fastest, faster, fast, normal, slow, slower, slowest

---

## Color Variants

The `color` variant axis always has **empty objects** for each color. All visual styling comes from compound variants that combine color with variant style.

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

**NEVER put CSS properties directly in color variant objects.** Styling is always in `compoundVariants`.

### Non-Semantic Colors

Some components need colors beyond the 6 semantic ones. These are added directly to the `color` variant object (not the `colors` array) and get **manually written** compound variants since they don't follow the `@color.${color}` token pattern.

**Non-semantic-only components**: Some components (e.g., card, surface, modal) only use non-semantic colors (`light`, `dark`, `neutral`) and have NO semantic colors at all. In this case, omit the `colors` array entirely and write all compound variants manually — no `colors.flatMap()` is needed.

| Color | Behavior | Light Mode | Dark Mode |
|-------|----------|------------|-----------|
| `light` | Always light, ignores dark mode | White/gray bg, dark text | Same as light mode |
| `dark` | Always dark, ignores dark mode | Gray-900 bg, white text | Same as light mode |
| `neutral` | Adaptive — follows the theme | Light appearance | Dark appearance |

```ts
color: {
	primary: {},
	secondary: {},
	success: {},
	info: {},
	warning: {},
	error: {},
	light: {},
	dark: {},
	neutral: {},
},
```

When non-semantic colors are used, the compound variants array uses a **mixed pattern** — spread the dynamic `colors.flatMap()` into a larger array with manual entries:

```ts
compoundVariants: [
	// Standard semantic colors (dynamic)
	...colors.flatMap((color) => [
		{ match: { color, variant: "solid" as const }, css: { /* ... */ } },
		// ...
	]),

	// Light color (matches neutral light mode, stays fixed across themes)
	{
		match: { color: "light" as const, variant: "solid" as const },
		css: {
			background: "@color.white",
			color: "@color.text",
			borderColor: "@color.gray-150",
			"&:dark": {
				background: "@color.white",
				color: "@color.text",
				borderColor: "@color.gray-150",
			},
		},
	},
	{
		match: { color: "light" as const, variant: "outline" as const },
		css: {
			color: "@color.text",
			borderColor: "@color.gray-300",
		},
	},
	{
		match: { color: "light" as const, variant: "soft" as const },
		css: {
			background: "@color.gray-100",
			color: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-100",
				color: "@color.gray-700",
			},
		},
	},
	{
		match: { color: "light" as const, variant: "subtle" as const },
		css: {
			background: "@color.gray-100",
			color: "@color.gray-700",
			borderColor: "@color.gray-300",
			"&:dark": {
				background: "@color.gray-100",
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
			},
		},
	},

	// Dark color (matches neutral dark mode, stays fixed across themes)
	{
		match: { color: "dark" as const, variant: "solid" as const },
		css: {
			background: "@color.gray-900",
			color: "@color.white",
			borderColor: "@color.gray-850",
			"&:dark": {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-850",
			},
		},
	},
	{
		match: { color: "dark" as const, variant: "outline" as const },
		css: {
			color: "@color.gray-200",
			borderColor: "@color.gray-600",
			"&:dark": {
				color: "@color.gray-200",
				borderColor: "@color.gray-600",
			},
		},
	},
	{
		match: { color: "dark" as const, variant: "soft" as const },
		css: {
			background: "@color.gray-800",
			color: "@color.gray-300",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
			},
		},
	},
	{
		match: { color: "dark" as const, variant: "subtle" as const },
		css: {
			background: "@color.gray-800",
			color: "@color.gray-300",
			borderColor: "@color.gray-600",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-600",
			},
		},
	},

	// Neutral color (manual — adaptive: light in light mode, dark in dark mode)
	{
		match: { color: "neutral" as const, variant: "solid" as const },
		css: {
			background: "@color.white",
			color: "@color.text",
			borderColor: "@color.gray-150",
			"&:dark": {
				background: "@color.gray-900",
				color: "@color.white",
				borderColor: "@color.gray-850",
			},
		},
	},
	{
		match: { color: "neutral" as const, variant: "outline" as const },
		css: {
			color: "@color.text",
			borderColor: "@color.gray-300",
			"&:dark": {
				color: "@color.gray-200",
				borderColor: "@color.gray-600",
			},
		},
	},
	{
		match: { color: "neutral" as const, variant: "soft" as const },
		css: {
			background: "@color.gray-100",
			color: "@color.gray-700",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
			},
		},
	},
	{
		match: { color: "neutral" as const, variant: "subtle" as const },
		css: {
			background: "@color.gray-100",
			color: "@color.gray-700",
			borderColor: "@color.gray-300",
			"&:dark": {
				background: "@color.gray-800",
				color: "@color.gray-300",
				borderColor: "@color.gray-600",
			},
		},
	},
],
```

**Key patterns:**
- **`light`** = neutral's light-mode appearance, frozen. Repeats ALL light-mode values in `"&:dark"` so dark mode cannot change them.
- **`dark`** = neutral's dark-mode appearance, frozen. Repeats ALL dark-mode values in both light and `"&:dark"`.
- **`neutral`** = adaptive. Light-mode values in the base CSS, genuinely different dark-mode values in `"&:dark"`.
- All non-semantic colors use gray tokens (`@color.gray-*`, `@color.white`, `@color.text`).
- Solid border colors use **subtle shades/tints** of the background (matching the semantic `shade-50`/`tint-50` pattern): `gray-150` for light backgrounds, `gray-850` for dark backgrounds.

---

## Variant Styles

Choose which variant styles your component supports:

| Component Type | Variant Styles |
|----------------|----------------|
| Interactive (button, link, menu item) | solid, outline, soft, subtle, ghost, link |
| Static display (badge, tag, chip) | solid, outline, soft, subtle |
| Minimal (avatar, indicator) | solid, soft |

### Variant Style Base Definitions

Some variant styles need their own base CSS in the `variants.variant` object:

```ts
variant: {
	solid: {},
	outline: {},
	soft: {},
	subtle: {},
	ghost: {                        // Interactive only
		background: "transparent",
	},
	link: {                         // Interactive only
		background: "transparent",
		borderColor: "transparent",
		borderWidth: "0",
	},
},
```

---

## Size Variants

Sizes control `fontSize`, `paddingTop`/`paddingBottom`, `paddingLeft`/`paddingRight`, `gap`, and `borderRadius`.

### Interactive Component Sizes (button-like)

```ts
size: {
	xs: {
		fontSize: "@font-size.xs",
		paddingTop: "@0.25",
		paddingBottom: "@0.25",
		paddingLeft: "@0.5",
		paddingRight: "@0.5",
		gap: "@0.25",
		borderRadius: "@border-radius.md",
	},
	sm: {
		fontSize: "@font-size.sm",
		paddingTop: "@0.375",
		paddingBottom: "@0.375",
		paddingLeft: "@0.625",
		paddingRight: "@0.625",
		gap: "@0.375",
		borderRadius: "@border-radius.md",
	},
	md: {
		fontSize: "@font-size.sm",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		gap: "@0.375",
		borderRadius: "@border-radius.md",
	},
	lg: {
		fontSize: "@font-size.md",
		paddingTop: "@0.625",
		paddingBottom: "@0.625",
		paddingLeft: "@0.875",
		paddingRight: "@0.875",
		gap: "@0.5",
		borderRadius: "@border-radius.md",
	},
	xl: {
		fontSize: "@font-size.lg",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		gap: "@0.5",
		borderRadius: "@border-radius.lg",
	},
},
```

### Display Component Sizes (badge-like)

For smaller, more compact components:

```ts
size: {
	xs: {
		fontSize: "@font-size.2xs",
		lineHeight: "@line-height.normal",
		paddingTop: "@0.125",
		paddingBottom: "@0.125",
		paddingLeft: "@0.25",
		paddingRight: "@0.25",
		gap: "@0.125",
		borderRadius: "@border-radius.sm",
	},
	sm: {
		fontSize: "@font-size.xs",
		lineHeight: "@line-height.tight",
		paddingTop: "@0.25",
		paddingBottom: "@0.25",
		paddingLeft: "@0.375",
		paddingRight: "@0.375",
		gap: "@0.25",
		borderRadius: "@border-radius.md",
	},
	md: {
		fontSize: "@font-size.sm",
		paddingTop: "@0.375",
		paddingBottom: "@0.375",
		paddingLeft: "@0.5",
		paddingRight: "@0.5",
		gap: "@0.375",
		borderRadius: "@border-radius.md",
	},
	lg: {
		fontSize: "@font-size.md",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.625",
		paddingRight: "@0.625",
		gap: "@0.5",
		borderRadius: "@border-radius.md",
	},
	xl: {
		fontSize: "@font-size.lg",
		paddingTop: "@0.625",
		paddingBottom: "@0.625",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		gap: "@0.625",
		borderRadius: "@border-radius.lg",
	},
},
```

Choose the size scale that fits your component. Not every component needs all 5 sizes — container components like Alert may only need 3 (sm, md, lg), while compact components like Badge may need all 5.

### Container Component Sizes (alert, card)

For block-level components with larger padding:

```ts
size: {
	sm: {
		fontSize: "@font-size.xs",
		paddingTop: "@0.5",
		paddingBottom: "@0.5",
		paddingLeft: "@0.75",
		paddingRight: "@0.75",
		gap: "@0.5",
	},
	md: {
		fontSize: "@font-size.sm",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		gap: "@0.75",
	},
	lg: {
		fontSize: "@font-size.md",
		paddingTop: "@1",
		paddingBottom: "@1",
		paddingLeft: "@1.25",
		paddingRight: "@1.25",
		gap: "@1",
	},
},
```

---

## Custom Variant Axes

Recipes can define variant axes beyond color, variant, and size. Use custom axes when a component has a meaningful layout or behavioral dimension.

### Orientation (layout direction)

Controls `flexDirection` for components that support horizontal and vertical layouts:

```ts
orientation: {
	horizontal: {
		flexDirection: "row",
	},
	vertical: {
		flexDirection: "column",
	},
},
```

When using a custom variant axis, omit the controlled property from `base` (e.g., no `flexDirection` in base when `orientation` is a variant) and include it in `defaultVariants`:

```ts
defaultVariants: {
	color: "info",
	variant: "soft",
	size: "md",
	orientation: "horizontal",
},
```

### Other Examples

- **`shape`**: Controls `borderRadius` — `rounded` vs `square` vs `pill`
- **`density`**: Controls padding — `compact` vs `default` vs `comfortable`

Custom axes should be simple enums that map to a small number of CSS properties. Complex conditional behavior belongs in compound variants instead.

---

## Compound Variants

Compound variants define the visual appearance for each color x variant-style combination. This is where ALL color-specific CSS lives.

### Generation Pattern

```ts
compoundVariants: colors.flatMap((color) => [
	{
		match: { color, variant: "solid" as const },
		css: { /* solid styles */ },
	},
	{
		match: { color, variant: "outline" as const },
		css: { /* outline styles */ },
	},
	// ... one entry per variant style
]),
```

**CRITICAL:** Always use `as const` on every variant value in `match` objects.

---

### SOLID (filled background, white text)

**Interactive:**
```ts
{
	match: { color, variant: "solid" as const },
	css: {
		background: `@color.${color}`,
		color: "@color.white",
		borderColor: `@color.${color}-shade-50`,
		"&:hover": {
			background: `@color.${color}-tint-50`,
		},
		"&:focus": {
			background: `@color.${color}-tint-50`,
		},
		"&:active": {
			background: `@color.${color}-tint-100`,
		},
		"&:dark": {
			borderColor: `@color.${color}-tint-50`,
		},
	},
},
```

**Static:**
```ts
{
	match: { color, variant: "solid" as const },
	css: {
		background: `@color.${color}`,
		color: "@color.white",
		borderColor: `@color.${color}-shade-50`,
		"&:dark": {
			borderColor: `@color.${color}-tint-50`,
		},
	},
},
```

---

### OUTLINE (transparent background, colored border and text)

**Interactive:**
```ts
{
	match: { color, variant: "outline" as const },
	css: {
		color: `@color.${color}`,
		borderColor: `@color.${color}`,
		"&:hover": {
			color: `@color.${color}-700`,
			background: `@color.${color}-150`,
		},
		"&:focus": {
			color: `@color.${color}-700`,
			background: `@color.${color}-150`,
		},
		"&:active": {
			color: `@color.${color}-700`,
			background: `@color.${color}-200`,
		},
		"&:dark:hover": {
			color: `@color.${color}-300`,
			background: `@color.${color}-800`,
		},
		"&:dark:focus": {
			color: `@color.${color}-300`,
			background: `@color.${color}-800`,
		},
		"&:dark:active": {
			color: `@color.${color}-300`,
			background: `@color.${color}-750`,
		},
	},
},
```

**Static:**
```ts
{
	match: { color, variant: "outline" as const },
	css: {
		color: `@color.${color}`,
		borderColor: `@color.${color}`,
	},
},
```

---

### SOFT (light background, dark text, no visible border)

**Interactive:**
```ts
{
	match: { color, variant: "soft" as const },
	css: {
		background: `@color.${color}-100`,
		color: `@color.${color}-700`,
		"&:hover": {
			background: `@color.${color}-150`,
		},
		"&:focus": {
			background: `@color.${color}-150`,
		},
		"&:active": {
			background: `@color.${color}-200`,
		},
		"&:dark": {
			background: `@color.${color}-800`,
			color: `@color.${color}-400`,
		},
		"&:dark:hover": {
			background: `@color.${color}-750`,
		},
		"&:dark:focus": {
			background: `@color.${color}-750`,
		},
		"&:dark:active": {
			background: `@color.${color}-700`,
		},
	},
},
```

**Static:**
```ts
{
	match: { color, variant: "soft" as const },
	css: {
		background: `@color.${color}-100`,
		color: `@color.${color}-700`,
		"&:dark": {
			background: `@color.${color}-800`,
			color: `@color.${color}-400`,
		},
	},
},
```

---

### SUBTLE (light background, dark text, WITH colored border)

**Interactive:**
```ts
{
	match: { color, variant: "subtle" as const },
	css: {
		background: `@color.${color}-100`,
		color: `@color.${color}-700`,
		borderColor: `@color.${color}-300`,
		"&:hover": {
			background: `@color.${color}-150`,
		},
		"&:focus": {
			background: `@color.${color}-150`,
		},
		"&:active": {
			background: `@color.${color}-200`,
		},
		"&:dark": {
			background: `@color.${color}-800`,
			color: `@color.${color}-400`,
			borderColor: `@color.${color}-600`,
		},
		"&:dark:hover": {
			background: `@color.${color}-750`,
		},
		"&:dark:focus": {
			background: `@color.${color}-750`,
		},
		"&:dark:active": {
			background: `@color.${color}-700`,
		},
	},
},
```

**Static:**
```ts
{
	match: { color, variant: "subtle" as const },
	css: {
		background: `@color.${color}-100`,
		color: `@color.${color}-700`,
		borderColor: `@color.${color}-300`,
		"&:dark": {
			background: `@color.${color}-800`,
			color: `@color.${color}-400`,
			borderColor: `@color.${color}-600`,
		},
	},
},
```

---

### GHOST (transparent, text only, hover reveals background) -- Interactive Only

```ts
{
	match: { color, variant: "ghost" as const },
	css: {
		color: `@color.${color}`,
		"&:hover": {
			color: `@color.${color}-700`,
			background: `@color.${color}-100`,
		},
		"&:focus": {
			color: `@color.${color}-700`,
			background: `@color.${color}-100`,
		},
		"&:active": {
			background: `@color.${color}-200`,
		},
		"&:dark:hover": {
			color: `@color.${color}-400`,
			background: `@color.${color}-750`,
		},
		"&:dark:focus": {
			color: `@color.${color}-400`,
			background: `@color.${color}-750`,
		},
		"&:dark:active": {
			background: `@color.${color}-700`,
		},
	},
},
```

---

### LINK (transparent, underline on hover) -- Interactive Only

```ts
{
	match: { color, variant: "link" as const },
	css: {
		color: `@color.${color}`,
		"&:hover": {
			color: `@color.${color}-shade-50`,
			textDecoration: "underline",
			textUnderlineOffset: "4px",
		},
		"&:focus": {
			color: `@color.${color}-shade-50`,
			textDecoration: "underline",
			textUnderlineOffset: "4px",
		},
		"&:active": {
			color: `@color.${color}-shade-50`,
			textDecoration: "underline",
			textUnderlineOffset: "4px",
		},
	},
},
```

---

## Pseudo-Selector Reference

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

**CRITICAL:** Always use the `"&:dark"` syntax with the `&:` prefix. Never use bare `dark:` as a key.

---

## Multi-Recipe Components

Complex components may require multiple recipes. Each is a separate `createUseRecipe` call in the same file.

### When to Use a Recipe vs a Plain Selector

- **Use a recipe** when a sub-part needs **variant axes** (e.g., size-responsive padding, color variants). Examples: card header/body/footer (need `size`), dropdown item (needs `color` + `variant`).
- **Use a plain CSS selector** (in the styleframe file) when a sub-part has **fixed styling with no variants**. Examples: card title/description (just typography), dropdown divider (just a border line).
- **Use a plain Vue wrapper** (no recipe, no selector) when a sub-part is purely structural with minimal/no styling. Examples: callout content wrapper.

### Examples

**Example: Dropdown** (interactive sub-items)
```
useDropdownRecipe         - Container/popover wrapper (color, variant, size)
useDropdownItemRecipe     - Individual menu items (color, variant, size — interactive states)
useDropdownDividerRecipe  - Separator line (minimal — no variant axes)
```

**Example: Card** (sectioned container, non-semantic colors only)
```
useCardRecipe             - Main container (color: light/dark/neutral, variant, size)
useCardHeaderRecipe       - Header section (color, variant, size — controls padding + separator border color)
useCardBodyRecipe         - Body section (color, variant, size — controls padding; color/variant for prop forwarding, no compound variants)
useCardFooterRecipe       - Footer section (color, variant, size — controls padding + separator border color)
CardTitle                 - Plain selector (.card-title) — fixed typography, no variants
CardDescription           - Plain selector (.card-description) — fixed typography, no variants
```

### Rules

1. All recipes in a single file share the same `colors` array (when semantic colors are used).
2. Each recipe has its own `base`, `variants`, `compoundVariants`, `defaultVariants`.
3. Sub-component recipes may have fewer variant axes (e.g., a body might only need a size variant).
4. Sub-component recipes should include `color` and `variant` axes when their visual styling (e.g., separator border colors) varies by the parent's color/variant combination. Even sub-parts without compound variants may include `color`/`variant` axes to enable prop forwarding from the parent Vue component.
5. Name each recipe with the full sub-component path: `"card-header"`, `"card-footer"`, `"dropdown-item"`.
6. Export each recipe individually.

### Example: Dropdown Multi-Recipe File

```ts
import { createUseRecipe } from "../utils/createUseRecipe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
] as const;

/**
 * Dropdown container recipe.
 */
export const useDropdownRecipe = createUseRecipe("dropdown", {
	base: { /* container styles */ },
	variants: { /* ... */ },
	compoundVariants: [ /* ... */ ],
	defaultVariants: { /* ... */ },
});

/**
 * Dropdown item recipe with interactive states.
 */
export const useDropdownItemRecipe = createUseRecipe("dropdown-item", {
	base: { /* item styles with hover/focus/disabled */ },
	variants: { /* ... */ },
	compoundVariants: colors.flatMap((color) => [ /* ... */ ]),
	defaultVariants: { /* ... */ },
});

/**
 * Dropdown divider recipe.
 */
export const useDropdownDividerRecipe = createUseRecipe("dropdown-divider", {
	base: {
		borderTopWidth: "@border-width.thin",
		borderTopStyle: "@border-style.solid",
		borderTopColor: "@color.gray-200",
		marginTop: "@0.25",
		marginBottom: "@0.25",
		"&:dark": {
			borderTopColor: "@color.gray-700",
		},
	},
	variants: {},
	defaultVariants: {},
});
```

### Example: Card Multi-Recipe File (Non-Semantic Colors Only)

```ts
import { createUseRecipe } from "../utils/createUseRecipe";

// No `colors` array — card only uses non-semantic colors (light, dark, neutral).
// All compound variants are written manually.

/**
 * Card container recipe.
 */
export const useCardRecipe = createUseRecipe("card", {
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
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: { borderRadius: "@border-radius.sm" },
			md: { borderRadius: "@border-radius.md" },
			lg: { borderRadius: "@border-radius.lg" },
		},
	},
	compoundVariants: [
		// All 12 compound variants (3 colors × 4 variants) written manually.
		// Follow the non-semantic color patterns from the Non-Semantic Colors section.
		// ...
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});

/**
 * Card header recipe with bottom separator.
 * Accepts color/variant to control separator border color per color/variant combination.
 */
export const useCardHeaderRecipe = createUseRecipe("card-header", {
	base: {
		display: "flex",
		alignItems: "center",
		gap: "@0.75",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		borderBottomWidth: "@border-width.thin",
		borderBottomStyle: "@border-style.solid",
		borderBottomColor: "transparent",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		},
	},
	compoundVariants: [
		// Light — fixed across themes
		{ match: { color: "light" as const, variant: "solid" as const }, css: { borderBottomColor: "@color.gray-200", "&:dark": { borderBottomColor: "@color.gray-200" } } },
		{ match: { color: "light" as const, variant: "outline" as const }, css: { borderBottomColor: "@color.gray-200", "&:dark": { borderBottomColor: "@color.gray-200" } } },
		{ match: { color: "light" as const, variant: "soft" as const }, css: { borderBottomColor: "transparent", "&:dark": { borderBottomColor: "transparent" } } },
		{ match: { color: "light" as const, variant: "subtle" as const }, css: { borderBottomColor: "@color.gray-200", "&:dark": { borderBottomColor: "@color.gray-200" } } },

		// Dark — fixed across themes
		{ match: { color: "dark" as const, variant: "solid" as const }, css: { borderBottomColor: "@color.gray-800", "&:dark": { borderBottomColor: "@color.gray-800" } } },
		{ match: { color: "dark" as const, variant: "outline" as const }, css: { borderBottomColor: "@color.gray-800", "&:dark": { borderBottomColor: "@color.gray-800" } } },
		{ match: { color: "dark" as const, variant: "soft" as const }, css: { borderBottomColor: "transparent", "&:dark": { borderBottomColor: "transparent" } } },
		{ match: { color: "dark" as const, variant: "subtle" as const }, css: { borderBottomColor: "@color.gray-600", "&:dark": { borderBottomColor: "@color.gray-600" } } },

		// Neutral — adaptive (different light/dark values)
		{ match: { color: "neutral" as const, variant: "solid" as const }, css: { borderBottomColor: "@color.gray-200", "&:dark": { borderBottomColor: "@color.gray-800" } } },
		{ match: { color: "neutral" as const, variant: "outline" as const }, css: { borderBottomColor: "@color.gray-200", "&:dark": { borderBottomColor: "@color.gray-800" } } },
		{ match: { color: "neutral" as const, variant: "soft" as const }, css: { borderBottomColor: "transparent", "&:dark": { borderBottomColor: "transparent" } } },
		{ match: { color: "neutral" as const, variant: "subtle" as const }, css: { borderBottomColor: "@color.gray-300", "&:dark": { borderBottomColor: "@color.gray-600" } } },
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});

/**
 * Card body recipe for main content area.
 * Includes color/variant axes for prop forwarding from parent, but no compound variants.
 */
export const useCardBodyRecipe = createUseRecipe("card-body", {
	base: {
		display: "flex",
		flexDirection: "column",
		gap: "@0.5",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@0.75",
			},
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});

/**
 * Card footer recipe with top separator.
 * Accepts color/variant to control separator border color per color/variant combination.
 */
export const useCardFooterRecipe = createUseRecipe("card-footer", {
	base: {
		display: "flex",
		alignItems: "center",
		gap: "@0.75",
		paddingTop: "@0.75",
		paddingBottom: "@0.75",
		paddingLeft: "@1",
		paddingRight: "@1",
		borderTopWidth: "@border-width.thin",
		borderTopStyle: "@border-style.solid",
		borderTopColor: "transparent",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		},
	},
	compoundVariants: [
		// Light — fixed across themes
		{ match: { color: "light" as const, variant: "solid" as const }, css: { borderTopColor: "@color.gray-200", "&:dark": { borderTopColor: "@color.gray-200" } } },
		{ match: { color: "light" as const, variant: "outline" as const }, css: { borderTopColor: "@color.gray-300", "&:dark": { borderTopColor: "@color.gray-300" } } },
		{ match: { color: "light" as const, variant: "soft" as const }, css: { borderTopColor: "transparent", "&:dark": { borderTopColor: "transparent" } } },
		{ match: { color: "light" as const, variant: "subtle" as const }, css: { borderTopColor: "@color.gray-300", "&:dark": { borderTopColor: "@color.gray-300" } } },

		// Dark — fixed across themes
		{ match: { color: "dark" as const, variant: "solid" as const }, css: { borderTopColor: "@color.gray-800", "&:dark": { borderTopColor: "@color.gray-800" } } },
		{ match: { color: "dark" as const, variant: "outline" as const }, css: { borderTopColor: "@color.gray-600", "&:dark": { borderTopColor: "@color.gray-600" } } },
		{ match: { color: "dark" as const, variant: "soft" as const }, css: { borderTopColor: "transparent", "&:dark": { borderTopColor: "transparent" } } },
		{ match: { color: "dark" as const, variant: "subtle" as const }, css: { borderTopColor: "@color.gray-600", "&:dark": { borderTopColor: "@color.gray-600" } } },

		// Neutral — adaptive (different light/dark values)
		{ match: { color: "neutral" as const, variant: "solid" as const }, css: { borderTopColor: "@color.gray-200", "&:dark": { borderTopColor: "@color.gray-800" } } },
		{ match: { color: "neutral" as const, variant: "outline" as const }, css: { borderTopColor: "@color.gray-200", "&:dark": { borderTopColor: "@color.gray-800" } } },
		{ match: { color: "neutral" as const, variant: "soft" as const }, css: { borderTopColor: "@color.gray-200", "&:dark": { borderTopColor: "@color.gray-700" } } },
		{ match: { color: "neutral" as const, variant: "subtle" as const }, css: { borderTopColor: "@color.gray-300", "&:dark": { borderTopColor: "@color.gray-600" } } },
	],
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
```

---

## Registration

After creating the recipe file, add it to the barrel export.

**File:** `theme/src/recipes/index.ts`

Add:
```ts
export * from "./use<ComponentName>Recipe";
```

This file uses only `export *` re-exports, never named exports.

---

## Runtime Overrides & Filtering

The function returned by `createUseRecipe` accepts an optional second argument for runtime customization:

```ts
const recipe = use<ComponentName>Recipe(s, options?);
```

### Config Overrides

Any part of the recipe config can be overridden via deep merge (using `defu`):

```ts
const callout = useCalloutRecipe(s, {
	base: { display: "inline-flex" },
});
// Result: base.display is "inline-flex", all other base properties preserved
```

### Filtering

The `filter` option restricts which variant values are available. Filtered-out values are removed from `variants`, compound variants are automatically pruned, and default variants are cleared if their value was filtered out.

```ts
const callout = useCalloutRecipe(s, {
	filter: {
		color: ["primary", "info"],
		variant: ["solid", "soft"],
	},
});
// Result: only primary/info colors and solid/soft variants remain
// Compound variants for other combinations are pruned
// If defaultVariants.color was "neutral", it becomes undefined
```

---

## Writing Tests

**File:** `theme/src/recipes/use<ComponentName>Recipe.test.ts`

### Test Setup

Create a `createInstance()` helper that registers minimal utility stubs for every CSS property used in the recipe, plus the dark modifier:

```ts
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../modifiers/useMediaPreferenceModifiers";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "background", "color", /* ... all CSS properties used */]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}
```

### Key Assertions

1. **Metadata**: `recipe.type === "recipe"` and `recipe.name` matches kebab-case name
2. **Base styles**: `toEqual` against the full base object
3. **Variant axis keys**: `Object.keys(recipe.variants!.<axis>)` contains expected values
4. **Default variants**: `toEqual` against the full `defaultVariants` object
5. **Compound variant count**: `(semantic colors × variant styles) + (non-semantic colors × variant styles)`
6. **Compound variant correctness**: Find by `match` and assert `css` for representative entries (at least one per variant style + one per non-semantic color)
7. **Config overrides**: Verify overridden base property changes while others are preserved
8. **Filter**: Verify variant pruning, compound variant pruning, and default variant adjustment when filtered out

---

## Styleframe File

After creating the recipe and registering it in the barrel export, create a styleframe file that initializes the recipe and defines layout selectors for story previews.

**File:** `apps/storybook/stories/components/<component-name>.styleframe.ts`

```ts
import { use<ComponentName>Recipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

export const <componentName> = use<ComponentName>Recipe(s);

// Layout selectors for story grid previews
selector(".<component-name>-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
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

For container components that align items at the top, use `alignItems: "flex-start"` instead of `"center"` in the grid/row selectors.

---

## Storybook Stories

**File:** `apps/storybook/stories/components/<component-name>.stories.ts`

### Structure

```ts
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import <ComponentName> from "../../src/components/components/<component-name>/<ComponentName>.vue";
import <ComponentName>Grid from "../../src/components/components/<component-name>/preview/<ComponentName>Grid.vue";
import <ComponentName>SizeGrid from "../../src/components/components/<component-name>/preview/<ComponentName>SizeGrid.vue";

const colors = [/* matching recipe color values */] as const;
const variants = [/* matching recipe variant values */] as const;
const sizes = [/* matching recipe size values */] as const;

const meta = {
	title: "Theme/Recipes/<ComponentName>",
	component: <ComponentName>,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: { control: "select", options: colors, description: "The color variant" },
		variant: { control: "select", options: variants, description: "The visual style variant" },
		size: { control: "select", options: sizes, description: "The size" },
		// Add argTypes for any custom variant axes (orientation, etc.)
	},
} satisfies Meta<typeof <ComponentName>>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Required Stories

- **`Default`**: Single instance with default args
- **`AllVariants`**: Grid showing all color × variant combinations
- **`AllSizes`**: Grid showing all sizes
- **Per-color stories**: One exported story per color (Primary, Secondary, Success, Info, Warning, Error, and any non-semantic colors)
- **Per-variant stories**: One per variant style (Solid, Outline, Soft, Subtle, Ghost, Link)
- **Per-size stories**: One per size (ExtraSmall, Small, Medium, Large, ExtraLarge)
- **Custom axis stories**: When applicable (e.g., `AllOrientations`, `Horizontal`, `Vertical`)
- **Feature stories**: When applicable (e.g., `Disabled` for interactive components)

---

## Vue Component

**File:** `apps/storybook/src/components/components/<component-name>/<ComponentName>.vue`

```vue
<script setup lang="ts">
import { <componentName> } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "primary" | "secondary" | /* ... union of recipe color values */;
		variant?: "solid" | "outline" | /* ... union of recipe variant values */;
		size?: "sm" | "md" | "lg" | /* ... union of recipe size values */;
		// Add props for custom variant axes and component-specific features
	}>(),
	{},
);
</script>

<template>
	<div :class="<componentName>({ color: props.color, variant: props.variant, size: props.size })">
		<slot />
	</div>
</template>
```

For complex components, extract sub-components (e.g., `<ComponentName>Title.vue`, `<ComponentName>Content.vue`) into the same directory.

Grid preview components go in a `preview/` subdirectory (e.g., `<ComponentName>Grid.vue`, `<ComponentName>SizeGrid.vue`).

---

## Validation Checklist

Before considering a recipe complete, verify every item:

### Structure
- [ ] File imports `createUseRecipe` from `"../utils/createUseRecipe"`
- [ ] `colors` array contains exactly: `"primary"`, `"secondary"`, `"success"`, `"info"`, `"warning"`, `"error"` (omit entirely for non-semantic-only components)
- [ ] `colors` array has `as const` assertion (when present)
- [ ] Recipe is exported as `export const use<ComponentName>Recipe`
- [ ] Recipe name (first arg) is kebab-case matching the component
- [ ] File uses tabs for indentation
- [ ] File uses double quotes for strings
- [ ] Container component base includes `flexBasis: "100%"`
- [ ] Sectioned containers (card-like) include `overflow: "hidden"` and omit padding from the main base

### Variants
- [ ] `color` variant has empty objects `{}` for all colors (semantic, non-semantic, or non-semantic-only)
- [ ] `variant` has appropriate styles for the component type
- [ ] `size` has appropriate sizes for the component (3-5 sizes; containers may use sm/md/lg only)
- [ ] `defaultVariants` specifies color, variant, size, and any custom variant axes
- [ ] Default values match the component's primary use case (see Default Variant Guidance)

### Custom Variant Axes (when applicable)
- [ ] Custom axes (orientation, shape, etc.) have all options defined with appropriate CSS
- [ ] Controlled CSS property is omitted from `base` (e.g., no `flexDirection` when `orientation` exists)
- [ ] Custom axes are included in `defaultVariants`

### Compound Variants
- [ ] Every `match` object has `as const` on the variant style value
- [ ] Every color x variant-style combination has a compound variant entry
- [ ] `colors.flatMap()` is used to generate compound variants for semantic colors (skip for non-semantic-only components)
- [ ] Compound variants use template literals: `` `@color.${color}` `` (for semantic colors)

### Non-Semantic Colors (when applicable)
- [ ] `light`, `dark`, `neutral` have manually written compound variants (not in `colors.flatMap()`)
- [ ] Non-semantic colors use gray tokens (`@color.gray-*`, `@color.white`, `@color.text`)
- [ ] `light` and `dark` repeat same values in `"&:dark"` to stay fixed across themes
- [ ] `neutral` has genuinely different `"&:dark"` values (adaptive)
- [ ] Solid border colors use subtle shades/tints: `gray-150` (light bg), `gray-950`/`gray-850` (dark bg)

### Multi-Recipe Sub-Parts (when applicable)
- [ ] Sub-parts needing variant axes (e.g., size-responsive padding) are separate recipes
- [ ] Sub-parts with fixed styling are plain CSS selectors in the styleframe file
- [ ] Sub-recipe names use full path: `"card-header"`, `"card-body"`, `"card-footer"`
- [ ] Sub-parts whose visual styling varies by color/variant (e.g., separator border colors) include `color` and `variant` axes with compound variants
- [ ] Sub-parts that need color/variant for prop forwarding (but have no visual variation) include `color`/`variant` axes with empty objects and no compound variants
- [ ] Header/footer separator compound variants follow light (fixed) / dark (fixed) / neutral (adaptive) pattern

### Interactive States (interactive components only)
- [ ] Every compound variant with `"&:hover"` also has matching `"&:focus"` (accessibility)
- [ ] `"&:active"` is included for pressed states
- [ ] Base includes `"&:focus-visible"` with outline styling
- [ ] Base includes `"&:disabled"` with `cursor: "not-allowed"`, `opacity: "0.75"`, `pointerEvents: "none"`

### Dark Mode
- [ ] All compound variants with colored backgrounds or text include `"&:dark"` overrides
- [ ] Dark interactive states use compound selectors: `"&:dark:hover"`, `"&:dark:focus"`, `"&:dark:active"`
- [ ] The `"&:dark"` key always uses the `&:` prefix (never bare `dark:`)

### Color Token Correctness
- [ ] Solid: background = base color, text = white, border = shade-50
- [ ] Outline: text and border = base color
- [ ] Soft: background = -100 level, text = -700 level
- [ ] Subtle: same as soft PLUS borderColor = -300 level
- [ ] Ghost: text = base color, hover background = -100
- [ ] Link: text = base color, hover = shade-50

### Dark Mode Token Correctness
- [ ] Solid dark: borderColor switches from shade-50 to tint-50
- [ ] Outline dark hover: color -300, background -800
- [ ] Outline dark active: background -750
- [ ] Soft dark: background -800, color -400
- [ ] Soft dark hover/focus: background -750; dark active: -700
- [ ] Subtle dark: background -800, color -400, borderColor -600
- [ ] Ghost dark hover/focus: color -400, background -750; dark active: -700

### Runtime API
- [ ] Recipe supports runtime config overrides via second argument
- [ ] Recipe supports filtering via `filter` option

### Tests
- [ ] Test file exists at `theme/src/recipes/use<ComponentName>Recipe.test.ts`
- [ ] Tests cover: metadata, base styles, variant keys, defaults, compound variant count, individual compound correctness
- [ ] Tests cover config overrides and filter behavior
- [ ] Test setup uses minimal utility stubs and dark modifier

### Styleframe File
- [ ] File exists at `apps/storybook/stories/components/<component-name>.styleframe.ts`
- [ ] Recipe is initialized and exported as `<componentName>`
- [ ] Layout selectors defined for grid/section/row/label

### Storybook Stories
- [ ] Story file exists at `apps/storybook/stories/components/<component-name>.stories.ts`
- [ ] Meta uses `title: "Theme/Recipes/<ComponentName>"` and `tags: ["autodocs"]`
- [ ] Stories include: Default, AllVariants grid, AllSizes grid, per-color, per-variant, per-size
- [ ] Custom axis stories included when applicable

### Vue Component
- [ ] Component exists at `apps/storybook/src/components/components/<component-name>/<ComponentName>.vue`
- [ ] Props typed with union literals matching recipe variant values
- [ ] Recipe class binding uses `<componentName>({ color, variant, size })`
- [ ] Grid preview components in `preview/` subdirectory
