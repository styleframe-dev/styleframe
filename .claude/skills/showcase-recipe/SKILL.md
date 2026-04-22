---
name: showcase-recipe
description: Step 4 of the create-recipe chain. Creates the Storybook showcase — the styleframe.ts registration file, the stories.ts meta + per-variant stories, the main Vue component, and the <Name>Grid.vue and <Name>SizeGrid.vue preview components. For multi-part recipes, also creates sub-part Vue components (e.g., CardHeader.vue, CardBody.vue, CardFooter.vue). Reads design.md and implementation.md. Writes .context/recipe-<name>/showcase.md with story IDs for document-recipe to reference.
---

# Showcase Recipe

Step 4 of the Styleframe recipe creation chain. Build a Storybook showcase that demonstrates every variant, color, and size of the recipe, plus a main Vue component that consumers can adopt directly.

## Persona

You are a senior design-systems engineer comfortable with Vue 3, TypeScript, and Storybook. You mirror the existing storybook structure exactly — same file layout, same argTypes, same preview grids, same story IDs.

## Inputs

- `.context/recipe-<component-name>/design.md` (required)
- `.context/recipe-<component-name>/implementation.md` (required)
- The recipe TS at `theme/src/recipes/<name>/` (for exact variant values)

If `design.md` or `implementation.md` is missing, stop and direct the user to `/design-recipe` or `/implement-recipe` respectively.

## Outputs

- `apps/storybook/stories/components/<name>.styleframe.ts`
- `apps/storybook/stories/components/<name>.stories.ts`
- `apps/storybook/src/components/components/<name>/<Name>.vue`
- `apps/storybook/src/components/components/<name>/preview/<Name>Grid.vue`
- `apps/storybook/src/components/components/<name>/preview/<Name>SizeGrid.vue`
- For multi-part recipes: one Vue file per sub-part (e.g., `CardHeader.vue`, `CardBody.vue`, `CardFooter.vue`, `CardTitle.vue`, `CardDescription.vue`) following the Card pattern.
- `.context/recipe-<component-name>/showcase.md` — documents created files and the story IDs (needed by document-recipe).

## Reference files

- **Single recipe**: `apps/storybook/stories/components/badge.{styleframe,stories}.ts` and `apps/storybook/src/components/components/badge/Badge.vue` + `preview/BadgeGrid.vue` + `preview/BadgeSizeGrid.vue`.
- **Multi-recipe**: `apps/storybook/stories/components/card.{styleframe,stories}.ts` — `card.stories.ts` uses a custom `render` function that stitches the sub-parts together.
- **Minimal recipe**: `apps/storybook/stories/components/spinner.{styleframe,stories}.ts`.

---

## Workflow

### Step 1: Read `design.md` and `implementation.md`

Extract:

- Component name (PascalCase for Vue, kebab-case for files, camelCase for runtime function)
- HTML element
- Variant axes + values
- Defaults
- Sub-recipes (for multi-part)
- Any additional semantic props (label, title, description, disabled, ...) the Vue component should expose

### Step 2: Deliverable 4 — Storybook styleframe

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

### Step 3: Deliverable 5 — Storybook stories

**Path:** `apps/storybook/stories/components/<component-name>.stories.ts`

```ts
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import <ComponentName> from "../../src/components/components/<component-name>/<ComponentName>.vue";
import <ComponentName>Grid from "../../src/components/components/<component-name>/preview/<ComponentName>Grid.vue";
import <ComponentName>SizeGrid from "../../src/components/components/<component-name>/preview/<ComponentName>SizeGrid.vue";

const colors = [/* recipe color values from implementation.md */] as const;
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
		// Add argTypes for custom variant axes and component-specific props (label, title, disabled, ...).
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

// Per-color stories — one per color value in the recipe.
export const Primary: Story = { args: { color: "primary", label: "Primary" } };
export const Secondary: Story = { args: { color: "secondary", label: "Secondary" } };
export const Success: Story = { args: { color: "success", label: "Success" } };
export const Info: Story = { args: { color: "info", label: "Info" } };
export const Warning: Story = { args: { color: "warning", label: "Warning" } };
export const Error: Story = { args: { color: "error", label: "Error" } };
// Add Light, Dark, Neutral if the recipe uses non-semantic colors.

// Per-variant stories — one per variant style.
export const Solid: Story = { args: { variant: "solid", label: "Solid" } };
export const Outline: Story = { args: { variant: "outline", label: "Outline" } };
export const Soft: Story = { args: { variant: "soft", label: "Soft" } };
export const Subtle: Story = { args: { variant: "subtle", label: "Subtle" } };
// Add Ghost, Link if interactive.

// Per-size stories — one per size.
export const ExtraSmall: Story = { args: { size: "xs", label: "Extra Small" } };
export const Small: Story = { args: { size: "sm", label: "Small" } };
export const Medium: Story = { args: { size: "md", label: "Medium" } };
export const Large: Story = { args: { size: "lg", label: "Large" } };
export const ExtraLarge: Story = { args: { size: "xl", label: "Extra Large" } };

// Feature stories (if applicable).
export const Disabled: Story = { args: { disabled: true, label: "Disabled" } };
```

#### Multi-recipe stories use a custom `render`

For multi-part components (e.g., Card), use a custom `render` function to assemble the sub-parts:

```ts
export const Default: Story = {
	render: (args) => ({
		components: { Card, CardHeader, CardBody, CardFooter },
		setup: () => ({ args }),
		template: `
			<Card v-bind="args">
				<CardHeader><h3>Header</h3></CardHeader>
				<CardBody>Body content</CardBody>
				<CardFooter>Footer actions</CardFooter>
			</Card>
		`,
	}),
};
```

#### Story IDs (track these — document-recipe reads them)

The generated story IDs follow: `theme-recipes-<component-name>--<story-name>` (story name is kebab-case).

Examples:
- `theme-recipes-<name>--default`
- `theme-recipes-<name>--all-variants`
- `theme-recipes-<name>--all-sizes`
- `theme-recipes-<name>--primary`, `--secondary`, etc.
- `theme-recipes-<name>--solid`, `--outline`, etc.
- `theme-recipes-<name>--extra-small`, `--small`, etc.

Record every story ID in `showcase.md` so `document-recipe` can embed them in the docs page.

### Step 4: Deliverable 6 — Vue components

#### Main component

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
	<<htmlElement> :class="classes">
		{{ props.label }}
		<slot />
	</<htmlElement>>
</template>
```

#### Preview Grid — `<ComponentName>Grid.vue`

**Path:** `apps/storybook/src/components/components/<component-name>/preview/<ComponentName>Grid.vue`

Renders every color × variant combination.

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

#### Preview Size Grid — `<ComponentName>SizeGrid.vue`

**Path:** `apps/storybook/src/components/components/<component-name>/preview/<ComponentName>SizeGrid.vue`

Renders every size.

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

#### Multi-part sub-components

For multi-part recipes, create one Vue file per sub-part, mirroring the Card pattern:

- `<ComponentName>Header.vue`
- `<ComponentName>Body.vue`
- `<ComponentName>Footer.vue`
- Additional semantic sub-parts: `<ComponentName>Title.vue`, `<ComponentName>Description.vue` (if the parent exposes them)

Each sub-part follows the same `<script setup>` + `computed classes` + `template` shape as the main component, but uses its own recipe runtime function (e.g., `<componentName>Header`).

---

## `showcase.md` schema

```markdown
# Showcase: <Name>

## Files created
- apps/storybook/stories/components/<name>.styleframe.ts
- apps/storybook/stories/components/<name>.stories.ts
- apps/storybook/src/components/components/<name>/<Name>.vue
- apps/storybook/src/components/components/<name>/preview/<Name>Grid.vue
- apps/storybook/src/components/components/<name>/preview/<Name>SizeGrid.vue
<!-- Multi-part: list every sub-part Vue file -->

## Story IDs (used by document-recipe for ::story-preview embeds)
- theme-recipes-<name>--default
- theme-recipes-<name>--all-variants
- theme-recipes-<name>--all-sizes
- theme-recipes-<name>--<color> × N   (one line per color)
- theme-recipes-<name>--<variant> × M (one line per variant)
- theme-recipes-<name>--<size> × K    (one line per size)

## Vue component props
- color: <union type>
- variant: <union type>
- size: <union type>
- <component-specific props>

## Notes for document-recipe
- Default story args: color=..., variant=..., size=..., label=...
- Multi-part render pattern: <yes/no — describe if yes>
```

---

## Validation checklist

- [ ] Storybook styleframe created at `apps/storybook/stories/components/<name>.styleframe.ts`.
- [ ] Storybook stories created at `apps/storybook/stories/components/<name>.stories.ts`.
- [ ] Main Vue component at `apps/storybook/src/components/components/<name>/<Name>.vue`.
- [ ] Preview grid at `apps/storybook/src/components/components/<name>/preview/<Name>Grid.vue`.
- [ ] Preview size grid at `apps/storybook/src/components/components/<name>/preview/<Name>SizeGrid.vue`.
- [ ] (Multi-part) Sub-part Vue files created.
- [ ] `argTypes` enumerate every variant axis + custom props.
- [ ] One story per color value, variant style, and size.
- [ ] `Default` story uses the recipe's default variant values.
- [ ] Every story ID recorded in `showcase.md`.
- [ ] Main component uses `:class="classes"` (not inline style).

---

## Constraints

- **Do not hardcode Vue component HTML elements.** Use the `htmlElement` from `design.md`.
- **Do not duplicate the recipe's styling in CSS.** The only styling in `styleframe.ts` is for the preview grid containers.
- **Sub-parts must be real Styleframe recipes**, not ad-hoc Vue components with inline styles — multi-part recipes already have the sub-recipes from `implement-recipe`.

---

## Next step

After `showcase.md` is written, invoke `/document-recipe`.
