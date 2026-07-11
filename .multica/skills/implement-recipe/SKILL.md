---
name: implement-recipe
description: Step 3 of the create-recipe chain. Writes the recipe TypeScript file(s) at theme/src/recipes/<name>/, the per-recipe barrel index, the root barrel update, and Vitest tests. Uses the approved design.md to decide color/variant-style patterns, compound-variant strategy (flatMap or map-per-style), and whether the recipe needs a setup callback (e.g., for @keyframes). Tests are required by default. Writes .context/recipe-<name>/implementation.md.
---

# Implement Recipe

Step 3 of the Styleframe recipe creation chain. Turn the approved design into working TypeScript: recipe file(s), barrel index, tests, and a root barrel update.

## Persona

You are a senior design-systems engineer specializing in CSS-in-TypeScript frameworks. You write Styleframe recipes that mirror the existing catalog exactly — same imports, same formatting, same compound-variant patterns, same test style. You do not invent new conventions.

## Inputs

- `.context/recipe-<component-name>/design.md` (required). If missing, stop and direct the user to `/design-recipe`.
- Existing reference recipes to mirror (see below).

## Outputs

- `theme/src/recipes/<name>/use<Name>Recipe.ts`
- `theme/src/recipes/<name>/use<Name>Recipe.test.ts` (required by default)
- `theme/src/recipes/<name>/index.ts` (barrel)
- For multi-part recipes, one pair per sub-part: `use<Name><Part>Recipe.ts` + `.test.ts`
- Root barrel update: `theme/src/recipes/index.ts` — one `export * from "./<name>";` line in alphabetical order
- `.context/recipe-<component-name>/implementation.md` — summary of files created

## Reference recipes

- **Full color + Display (flatMap)**: `theme/src/recipes/badge/useBadgeRecipe.ts`
- **Full color + Interactive (map-per-style)**: `theme/src/recipes/button/useButtonRecipe.ts`
- **Container color + multi-recipe**: `theme/src/recipes/card/` (4 files: `useCardRecipe.ts`, `useCardHeaderRecipe.ts`, `useCardBodyRecipe.ts`, `useCardFooterRecipe.ts`, plus tests)
- **Minimal color + setup callback**: `theme/src/recipes/spinner/useSpinnerRecipe.ts`
- **Test style**: `theme/src/recipes/card/useCardRecipe.test.ts` — the canonical test shape (metadata + base + variants + defaults + compound variants + config overrides + filter).

The `createUseRecipe` factory lives at `theme/src/utils/createUseRecipe.ts`. Its signature:

```ts
createUseRecipe<Name extends string, const Config extends RecipeConfig>(
  name: Name,
  defaults: Config,
  setup?: (s: Styleframe) => void,
)
```

The optional `setup(s)` callback runs before the recipe is registered. Use it when the recipe depends on other Styleframe primitives — e.g., spinner registers `@keyframes` via `setup`.

---

## Workflow

### Step 1: Read `design.md` and decide

Load the approved design. From it you already know:

- Color pattern (Full / Container / Minimal / None)
- Variant-style pattern (Interactive / Display / Container / custom)
- Base template (interactive / display / container / sectioned container)
- Variant axes + values
- Compound-variant strategy (flatMap / map-per-style / manual / mixed)
- Defaults
- Sub-recipes (if multi-part)
- Whether a `setup(s)` callback is needed

### Step 2: Implement Deliverable 1 — recipe TypeScript file

Create `theme/src/recipes/<name>/use<Name>Recipe.ts`. Follow the file template below, substituting the values from `design.md`.

#### File template

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
		// Base styles from the design's base template
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
			// Variant styles from design.md (e.g., solid/outline/soft/subtle/ghost/link)
		},
		size: {
			// Sizes from design.md
		},
	},
	compoundVariants: colors.flatMap((color) => [
		// One entry per variant style per color — use the semantic templates below
	]),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
	},
});
```

#### Formatting rules

- **Tabs** for indentation (not spaces).
- **Double quotes** for all string values.
- Add `as const` on the `colors` array.
- Add `as const` on every `variant` value inside `match` objects: `variant: "solid" as const`.
- The recipe name (first argument) is **kebab-case** matching the component.
- The exported constant follows the pattern `use<ComponentName>Recipe`.
- `colors.flatMap()` is used to generate compound variants dynamically for semantic colors. For non-semantic-only components, write all compound variants manually.
- Non-semantic-only components (`Container` color pattern) omit the `colors` array.

#### Compound-variant generation — two valid patterns

Both patterns are used in the existing codebase. Pick whichever the design calls for.

**Pattern A — `colors.flatMap(c => [...])`** (badge, card — compact when styles share a template):

```ts
compoundVariants: colors.flatMap((color) => [
	{ match: { color, variant: "solid" as const }, css: { /* ... */ } },
	{ match: { color, variant: "outline" as const }, css: { /* ... */ } },
	{ match: { color, variant: "soft" as const }, css: { /* ... */ } },
	{ match: { color, variant: "subtle" as const }, css: { /* ... */ } },
]),
```

**Pattern B — `...colors.map(c => ...)` per variant style** (button — preferred when styles diverge significantly):

```ts
compoundVariants: [
	...colors.map((color) => ({
		match: { color, variant: "solid" as const },
		css: { /* solid-specific CSS */ },
	})),
	...colors.map((color) => ({
		match: { color, variant: "outline" as const },
		css: { /* outline-specific CSS */ },
	})),
	// repeat per variant style
	// then append manual light/dark/neutral entries
	{ match: { color: "light" as const, variant: "solid" as const }, css: { /* ... */ } },
	// ...
],
```

**Pattern C — Mixed** (Full pattern — 6 semantic generated, `light`/`dark`/`neutral` manual):

```ts
compoundVariants: [
	...colors.flatMap((color) => [
		{ match: { color, variant: "solid" as const }, css: { /* ... */ } },
		// ...
	]),
	// Manual non-semantic entries:
	{ match: { color: "light" as const, variant: "solid" as const }, css: { /* ... */ } },
	{ match: { color: "dark" as const, variant: "solid" as const }, css: { /* ... */ } },
	{ match: { color: "neutral" as const, variant: "solid" as const }, css: { /* ... */ } },
	// ... for each variant style
],
```

**Pattern D — Manual** (Container color pattern — no `colors` array):

Write every `light`/`dark`/`neutral` × variant-style combination by hand.

### Step 3: Color variants must be empty objects

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

### Step 4: Variant styles

Choose variant styles from the design. Typical values:

| Component type | Variant styles |
|----------------|----------------|
| Interactive (button, link, menu item) | `solid`, `outline`, `soft`, `subtle`, `ghost`, `link` |
| Static display (badge, tag, chip) | `solid`, `outline`, `soft`, `subtle` |
| Container (card, modal, popover) | `solid`, `soft`, `subtle` |
| Minimal (avatar, indicator) | `solid`, `soft` |

Variant style base definitions (most have empty objects — compound variants do the styling):

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

### Step 5: Size variants

**Interactive component sizes** (button-like):

```ts
size: {
	xs: { fontSize: "@font-size.xs", paddingTop: "@0.25", paddingBottom: "@0.25", paddingLeft: "@0.5", paddingRight: "@0.5", gap: "@0.25", borderRadius: "@border-radius.md" },
	sm: { fontSize: "@font-size.sm", paddingTop: "@0.375", paddingBottom: "@0.375", paddingLeft: "@0.625", paddingRight: "@0.625", gap: "@0.375", borderRadius: "@border-radius.md" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.375", borderRadius: "@border-radius.md" },
	lg: { fontSize: "@font-size.md", paddingTop: "@0.625", paddingBottom: "@0.625", paddingLeft: "@0.875", paddingRight: "@0.875", gap: "@0.5", borderRadius: "@border-radius.md" },
	xl: { fontSize: "@font-size.lg", paddingTop: "@0.75", paddingBottom: "@0.75", paddingLeft: "@1", paddingRight: "@1", gap: "@0.5", borderRadius: "@border-radius.lg" },
},
```

**Display component sizes** (badge-like):

```ts
size: {
	xs: { fontSize: "@font-size.2xs", lineHeight: "@line-height.normal", paddingTop: "@0.125", paddingBottom: "@0.125", paddingLeft: "@0.25", paddingRight: "@0.25", gap: "@0.125", borderRadius: "@border-radius.sm" },
	sm: { fontSize: "@font-size.xs", lineHeight: "@line-height.tight", paddingTop: "@0.25", paddingBottom: "@0.25", paddingLeft: "@0.375", paddingRight: "@0.375", gap: "@0.25", borderRadius: "@border-radius.md" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.375", paddingBottom: "@0.375", paddingLeft: "@0.5", paddingRight: "@0.5", gap: "@0.375", borderRadius: "@border-radius.md" },
	lg: { fontSize: "@font-size.md", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.625", paddingRight: "@0.625", gap: "@0.5", borderRadius: "@border-radius.md" },
	xl: { fontSize: "@font-size.lg", paddingTop: "@0.625", paddingBottom: "@0.625", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.625", borderRadius: "@border-radius.lg" },
},
```

**Container component sizes** (alert, card sub-parts):

```ts
size: {
	sm: { fontSize: "@font-size.xs", paddingTop: "@0.5", paddingBottom: "@0.5", paddingLeft: "@0.75", paddingRight: "@0.75", gap: "@0.5" },
	md: { fontSize: "@font-size.sm", paddingTop: "@0.75", paddingBottom: "@0.75", paddingLeft: "@1", paddingRight: "@1", gap: "@0.75" },
	lg: { fontSize: "@font-size.md", paddingTop: "@1", paddingBottom: "@1", paddingLeft: "@1.25", paddingRight: "@1.25", gap: "@1" },
},
```

### Step 6: Custom variant axes

**Orientation**:

```ts
orientation: {
	horizontal: { flexDirection: "row" },
	vertical: { flexDirection: "column" },
},
```

When using orientation, omit `flexDirection` from `base` and include the axis in `defaultVariants`.

**Boolean state axes** (active, disabled, block):

```ts
active: {
	true: { fontWeight: "@font-weight.semibold" },
	false: {},
},
```

Default to `"false"` in `defaultVariants`. **NEVER** use `selector()` with class-based modifiers for states that apply to the element itself.

**Cascade order for multiple standalone boolean-state compounds.** When a recipe has more than one standalone boolean-state compound (no `color` field — e.g., `{ match: { invalid: "true" }, css: { ... } }`), later entries in the `compoundVariants` array win on CSS conflicts. For `invalid` / `readonly` / `disabled`, order them **invalid → readonly → disabled** so:

- `invalid`'s error border renders first and stays visible even when the input is further dimmed.
- `readonly`'s subtle background is overridden only if `disabled` is also set.
- `disabled`'s `opacity` + `pointer-events: none` wins last, correctly suppressing interaction regardless of the other two.


### Step 7: Compound variant CSS — semantic color templates

These are the canonical templates for the 6 semantic colors. `color` is the iteration variable from `flatMap`/`map`.

#### SOLID (filled background, white text)

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

#### OUTLINE (transparent background, colored border and text)

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

#### SOFT (light background, dark text, no visible border)

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

#### SUBTLE (light background, dark text, WITH colored border)

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

#### GHOST (interactive only — transparent, hover reveals background)

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

#### LINK (interactive only — transparent, underline on hover)

```ts
{ match: { color, variant: "link" as const }, css: {
	color: `@color.${color}`,
	"&:hover": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
	"&:focus": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
	"&:active": { color: `@color.${color}-shade-50`, textDecoration: "underline", textUnderlineOffset: "4px" },
}},
```

### Step 8: Non-semantic colors — `light` / `dark` / `neutral`

| Color | Behavior |
|-------|----------|
| `light` | Always light, ignores dark mode. Uses `@color.white`, `@color.gray-*`, `@color.text`. Repeats all values in `"&:dark"` to stay fixed. |
| `dark` | Always dark, ignores dark mode. Uses `@color.gray-900`, `@color.white`. Repeats all values in `"&:dark"` to stay fixed. |
| `neutral` | Adaptive — light in light mode, dark in dark mode. Has genuinely different `"&:dark"` values. |

**Light compound variants:**

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

**Dark compound variants:**

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

**Neutral compound variants (adaptive):**

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

### Step 9: Pseudo-selector reference

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

### Step 10: Multi-recipe components

- **Use a recipe** when a sub-part needs **variant axes** (size-responsive padding, color variants).
- **Use a plain CSS selector** when a sub-part has **fixed styling with no variants**.
- **Use a plain Vue wrapper** when a sub-part is purely structural.

Rules:

1. All recipes in a single directory share the same `colors` array (when semantic colors are used).
2. Each recipe has its own `base`, `variants`, `compoundVariants`, `defaultVariants`.
3. Sub-component recipes may have fewer variant axes.
4. Sub-recipes include `color` and `variant` axes when visual styling varies by parent's color/variant.
5. Name each recipe with the full sub-component path in kebab-case: `card-header`, `card-footer`.
6. Export each recipe individually from its own file and from `index.ts`.

### Step 11: Default variant guidance

- Interactive: `color: "primary"`, `variant: "solid"`, `size: "md"`
- Container / feedback: `color: "neutral"`, `variant: "subtle"`, `size: "md"`
- Display (badge): `color: "neutral"`, `variant: "solid"`, `size: "sm"`
- Non-semantic containers (card, modal): `color: "neutral"`, `variant: "solid"`, `size: "md"`

Every axis in `variants` must have a matching entry in `defaultVariants`.

### Step 12: `setup(s)` callback (optional)

If the design calls for a `setup(s)` callback (e.g., spinner registers `@keyframes`), pass it as the third argument:

```ts
export const useSpinnerRecipe = createUseRecipe(
	"spinner",
	{ /* config */ },
	(s) => {
		s.keyframes("spin", { /* ... */ });
	},
);
```

---

### Deliverable 2: Barrel index

**Path:** `theme/src/recipes/<component-name>/index.ts`

```ts
export * from "./use<ComponentName>Recipe";
// For multi-recipe, add one export per sub-recipe.
```

Also update `theme/src/recipes/index.ts` — add `export * from "./<component-name>";` in alphabetical order (match the existing ordering).

---

### Deliverable 3: Tests

**Path:** `theme/src/recipes/<component-name>/use<ComponentName>Recipe.test.ts`

Tests are **required by default**. 13 of 15 existing recipes have tests; opt out only for trivial recipes with the user's explicit approval.

#### Test setup

```ts
import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"background",
		"color",
		// ... enumerate every CSS property used in base, variants, and compound variants
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}
```

Enumerate **every** CSS property used in the recipe's base, variants, and compound variants.

#### Required test cases

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
				(v) => v.match.color === "<color>" && v.match.variant === "<variant>",
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

For multi-recipe components, create one test file per sub-recipe with the same structure.

---

## `implementation.md` schema

```markdown
# Implementation: <Name>

## Files created
- theme/src/recipes/<name>/use<Name>Recipe.ts
- theme/src/recipes/<name>/use<Name>Recipe.test.ts
- theme/src/recipes/<name>/index.ts
<!-- Multi-part: list every sub-recipe file + test file -->

## Root barrel updated
theme/src/recipes/index.ts — added `export * from "./<name>";`

## Recipe shape summary
- Colors: <list>
- Variants: <list>
- Sizes: <list>
- Custom axes: <list or none>
- Compound variants: <count>
- Defaults: color=..., variant=..., size=...
- Setup callback: <yes/no — describe if yes>

## Sub-recipes (if multi-part)
- <sub-name>: axes=[...], compound variants=<count>

## Known issues or follow-ups
- <anything the user should be aware of before running verify-recipe>
```

---

## Validation checklist

### Structure
- [ ] File imports `createUseRecipe` from `"../../utils/createUseRecipe"`.
- [ ] `colors` array contains exactly `"primary"`, `"secondary"`, `"success"`, `"info"`, `"warning"`, `"error"` (omit entirely for non-semantic-only components).
- [ ] `colors` array has `as const` (when present).
- [ ] Recipe is exported as `export const use<ComponentName>Recipe`.
- [ ] Recipe name (first arg) is kebab-case matching the component.
- [ ] File uses tabs and double quotes.
- [ ] Container component base includes `flexBasis: "100%"`.
- [ ] Sectioned containers include `overflow: "hidden"` and omit padding.

### Variants
- [ ] `color` variant has empty objects `{}` for all colors.
- [ ] `variant` has appropriate styles for the component type.
- [ ] `size` has 3–5 entries.
- [ ] `defaultVariants` specifies every axis.

### Compound variants
- [ ] Every `match` object has `as const` on the variant style value.
- [ ] Every color × variant-style combination has a compound variant entry.
- [ ] Compound variants use template literals: `` `@color.${color}` ``.

### Non-semantic colors (when applicable)
- [ ] `light`, `dark`, `neutral` compound variants are manually written.
- [ ] Non-semantic colors use gray tokens.
- [ ] `light` and `dark` repeat the same values in `"&:dark"` to stay fixed.
- [ ] `neutral` has genuinely different `"&:dark"` values.

### Interactive states (when applicable)
- [ ] Every `"&:hover"` is paired with `"&:focus"`.
- [ ] `"&:active"` is included for pressed states.
- [ ] Base includes `"&:focus-visible"` with outline styling.
- [ ] Base includes `"&:disabled"` with cursor/opacity/pointerEvents.

### Dark mode
- [ ] All compound variants with colored backgrounds include `"&:dark"` overrides.
- [ ] Dark interactive states use `"&:dark:hover"`, `"&:dark:focus"`, `"&:dark:active"`.
- [ ] `"&:dark"` always uses the `&:` prefix.

### Color token correctness
- [ ] Solid: background = base color, text = white, border = shade-50.
- [ ] Outline: text and border = base color.
- [ ] Soft: background = -100 level, text = -700 level.
- [ ] Subtle: same as soft PLUS borderColor = -300 level.
- [ ] Ghost: text = base color, hover background = -100.
- [ ] Link: text = base color, hover = shade-50.

### Dark mode token correctness
- [ ] Solid dark: borderColor switches from shade-50 to tint-50.
- [ ] Soft dark: background -800, color -400.
- [ ] Soft dark hover/focus: -750; dark active: -700.
- [ ] Subtle dark: background -800, color -400, borderColor -600.
- [ ] Ghost dark hover/focus: color -400, background -750; dark active: -700.

### Files
- [ ] Recipe TS file(s) at `theme/src/recipes/<name>/`.
- [ ] Barrel index at `theme/src/recipes/<name>/index.ts`.
- [ ] Root barrel at `theme/src/recipes/index.ts` updated (alphabetical order).
- [ ] Tests at `theme/src/recipes/<name>/use<Name>Recipe.test.ts` (unless user opted out).
- [ ] `implementation.md` written.

---

## Next step

After `implementation.md` is written, invoke `/showcase-recipe`.
