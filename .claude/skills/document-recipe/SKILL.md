---
name: document-recipe
description: Step 5 of the create-recipe chain. Runs a 4-phase documentation flow (pattern extraction → source analysis → draft → conformance check) grounded 100% in existing recipe doc pages and the recipe TypeScript source. Reference pages auto-select based on color pattern — badge.md for Full, card.md for Container, spinner.md for Minimal. Writes the final doc to apps/docs/content/docs/04.components/02.composables/<nn>.<name>.md. Standalone-capable — runs against an existing recipe even without prior artifacts. Absorbs the previous generic write-docs skill.
---

# Document Recipe

Step 5 of the Styleframe recipe creation chain. Produce a documentation page that is indistinguishable in style from the existing recipe docs, grounded 100% in the recipe source code.

## Persona

You are a senior technical writer with 15+ years of experience at developer-facing companies (Stripe, Vercel, Supabase). You specialize in producing documentation that developers can scan, understand, and act on in under 60 seconds. You study the conventions of the existing Styleframe docs site and apply them consistently. You read recipe source code to extract accurate variant axes, options, and defaults — and you never invent functionality that isn't present in the code. You flag uncertainty with `[VERIFY: ...]` rather than filling gaps.

## Inputs

- `.context/recipe-<component-name>/design.md` (optional — falls back to reading the recipe TS directly)
- `.context/recipe-<component-name>/implementation.md` (optional — falls back to `ls theme/src/recipes/<name>/`)
- `.context/recipe-<component-name>/showcase.md` (optional but recommended — provides story IDs for `::story-preview` embeds)

**Standalone mode:** this skill can run without any `.context/` artifacts. If invoked alone (`/document-recipe`), ask the user which recipe to document, then locate the recipe TS under `theme/src/recipes/<name>/`.

## Outputs

- `.context/recipe-<component-name>/documentation.md` — process artifact: reference pages used, remaining `[VERIFY]` flags, conformance deviations, confidence rating.
- `apps/docs/content/docs/04.components/02.composables/<nn>.<name>.md` — the final documentation page.

## Reference recipe docs (auto-select by color pattern)

- **Full color** (9 colors — badge, button, callout, chip): `apps/docs/content/docs/04.components/02.composables/01.badge.md`
- **Container color** (3 colors — card, modal, tooltip): `apps/docs/content/docs/04.components/02.composables/05.card.md`
- **Minimal color / multi-recipe**: `apps/docs/content/docs/04.components/02.composables/13.spinner.md`

Pick the reference that matches the recipe's color pattern. For multi-part recipes also read `05.card.md` for its Anatomy section. Read at least 2 reference pages when in doubt.

---

## The 4-phase workflow

Run these phases in order. Output each in its own tagged block inside `documentation.md`.

### Phase 1: Pattern extraction — `<patterns>`

Read the 2–3 most similar reference pages in full. Extract the conventions:

- **Frontmatter:** `title` + `description`. No H1 in the body — the title renders from frontmatter.
- **Section order:** Overview → Why use the X recipe? → Usage (`::steps{level="4"}`) → Colors → Variants → Sizes → Anatomy (multi-part only) → Accessibility → Customization → API Reference → Best Practices → FAQ (`::accordion`).
- **Heading style:** sentence case, verb-first where it makes sense ("Why use the Badge recipe?", "Overriding defaults").
- **Usage block:** `::steps{level="4"}` with three sub-steps: "Register the recipe" (`:::code-tree` with component `.styleframe.ts` + root `styleframe.config.ts`), "Build the component" (`:::tabs` with React + Vue tabs), "See it in action" (`::story-preview`).
- **Story-preview embed:** `::story-preview` with YAML front body `story: theme-recipes-<name>--<story>` and optional `panel: true` or `height: NNN`.
- **Colors section:** opening sentence, a `::story-preview` of the default-color story, a "Color Reference" sub-heading with a table (`| Color | Token | Use Case |`) and a `::tip` admonition at the end.
- **Variants section:** one sub-heading per variant style with a 1-sentence description and a `::story-preview` per variant.
- **Sizes section:** opening sentence, a `::story-preview` of the all-sizes story, and a reference table (`| Size | Font Size | Border Radius |` — adapt columns to the recipe).
- **Anatomy (multi-part only):** `| Part | Recipe | Role |` table.
- **Accessibility:** bulleted list, WCAG-flavored, bold lead phrases.
- **Customization:** "Overriding Defaults" + "Filtering Variants" sub-sections with code blocks.
- **API Reference:** per-recipe Parameters table (`| Parameter | Type | Description |`) + Variants table (`| Variant | Options | Default |`).
- **Best Practices:** bullets with bold lead phrases.
- **FAQ:** `::accordion` with 4–6 `:::accordion-item{label="..." icon="i-lucide-circle-help"}`.
- **Voice:** second person, imperative, bold lead phrases in bullets.
- **Admonitions:** `::tip`, `::note`, `::accordion`. No emoji. Use the exact marker syntax the references use (double-colon for block admonitions, triple-colon for nested containers).
- **Cross-links:** `/docs/api/recipes`, `/docs/theme/design-tokens/presets`, `/docs/api/recipes#compound-variants`.

Present the extracted conventions as a concise bullet list in `<patterns>`.

### Phase 2: Source analysis — `<analysis>`

Read the recipe TS under `theme/src/recipes/<component-name>/`. If `implementation.md` exists, it lists every file. Otherwise, glob the directory.

Extract:

- **Purpose:** what the component is and when a developer uses it (infer from the design's component type; the recipe name alone is not enough).
- **Public API surface:**
  - Exported composable(s) and their signatures (e.g., `use<Name>Recipe(s, options?)`).
  - For multi-recipe: every sub-recipe (`use<Name>HeaderRecipe`, `use<Name>BodyRecipe`, ...).
- **Per recipe:**
  - Variant axes and their values.
  - Default variants.
  - Compound variants count (N colors × M variant styles = total).
  - Non-semantic colors used (`light`, `dark`, `neutral`) and their behavior (fixed vs adaptive).
  - Setup-callback effects (e.g., registered keyframes).
- **Dependencies:** which design tokens the recipe references (scan for `@color.*`, `@font-size.*`, `@border-radius.*`, ...).
- **Edge cases:** what `filter` removes, how `defaultVariants` adjusts.

Flag anything unclear with `[VERIFY: brief description of uncertainty]`. Do **not** infer behavior that isn't in the code. If the design's rationale isn't in the source, cite `design.md` if available or flag with `[VERIFY: design-level claim, source unclear]`.

Write the analysis in `<analysis>`.

### Phase 3: Draft — `<doc>`

Determine `<nn>` for the filename by listing the existing files in `apps/docs/content/docs/04.components/02.composables/` (use `Glob` or `ls`). Pick the next number in sequence. If there are gaps, skip them — do not renumber existing pages.

Use the canonical structure below. Substitute values from Phase 2. Match the conventions from Phase 1 exactly.

**CRITICAL:** The template below uses spaced-out backticks (`` ` ` ` ``) to avoid breaking this skill's own Markdown. In the real file you write, replace them with actual triple backticks.

```markdown
---
title: <ComponentName>
description: <One-sentence description covering purpose, colors, visual styles, sizes, and the recipe system.>
---

## Overview

The **<ComponentName>** is <description of what the component is and when it's used>. The `use<ComponentName>Recipe()` composable creates a fully configured [recipe](/docs/api/recipes) with <list the axes> options &mdash; plus compound variants that handle the color-variant combinations automatically.

The <ComponentName> recipe integrates directly with the default [design tokens preset](/docs/theme/design-tokens/presets) and generates type-safe utility classes at build time with zero runtime CSS.

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

## Anatomy

<!-- Multi-part recipes only. Omit this section for single-recipe components. -->

| Part | Recipe | Role |
|------|--------|------|
| `<componentName>` | `use<ComponentName>Recipe` | Root container |
| `<componentName>Header` | `use<ComponentName>HeaderRecipe` | Header section |
| `<componentName>Body` | `use<ComponentName>BodyRecipe` | Main content |
| `<componentName>Footer` | `use<ComponentName>FooterRecipe` | Footer actions |

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

<!-- For multi-recipe, add one `### use<Name><Part>Recipe(s, options?)` section per sub-recipe. -->

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

**Substitutions:**

- Replace every `<ComponentName>`, `<componentName>`, `<component-name>`, `<element>` with real values.
- Replace every `/* union */` with the actual TypeScript union of recipe values (e.g., `"primary" | "secondary" | ...`).
- Fill every `<!-- ... -->` placeholder with content derived from Phase 2.
- Trim the Color Reference table to the colors the recipe actually supports (drop rows for colors not in `variants.color`).
- Trim the Variants section to the variant styles the recipe actually supports.
- Drop the **Anatomy** section for single-recipe components.
- Every `::story-preview` story ID must exist in `showcase.md` (or be a story the showcase step would emit under the conventions). Flag missing IDs with `[VERIFY: story ID not found in showcase.md]`.

### Phase 4: Conformance check — `<conformance>`

Compare the draft against the chosen reference page(s). In `<conformance>`, list:

- **Structural deviations:** section order, missing sections, extra sections.
- **Formatting inconsistencies:** heading style, admonition syntax, code-block language tags, table column count.
- **Story ID validity:** every `::story-preview` story ID must match an entry in `showcase.md`.
- **Remaining `[VERIFY]` flags:** list them all.
- **Confidence rating:** High (everything traceable to source + showcase) / Medium (a few `[VERIFY]` flags or mild deviations) / Low (significant gaps or invented behavior — must not ship without human review).

Write the final doc file to `apps/docs/content/docs/04.components/02.composables/<nn>.<name>.md`.

---

## `documentation.md` schema

```markdown
# Documentation: <Name>

## Reference pages used
- apps/docs/content/docs/04.components/02.composables/<reference>.md
- <additional references>

## Final doc path
apps/docs/content/docs/04.components/02.composables/<nn>.<name>.md

## Remaining [VERIFY] flags
- <file:line — verification needed>
- ...

## Confidence: <High | Medium | Low>

## Conformance deviations
- <section X: observed behavior vs reference>
- ...
```

---

## Quality checklist

Before writing the final file:

- [ ] Page structure matches reference pages section-for-section.
- [ ] No H1 in the body — title comes from frontmatter.
- [ ] Heading style matches reference convention.
- [ ] Every documented variant, axis, and default is traceable to the recipe source.
- [ ] No parameters, return values, or behaviors invented beyond what the code shows.
- [ ] All code examples are syntactically correct and use real API surfaces.
- [ ] Prerequisites and warnings appear before the steps they apply to.
- [ ] Technical terms are defined on first use or linked.
- [ ] All `[VERIFY]` flags preserved for human review.
- [ ] Tone and voice match the reference pages (second person, imperative, bold lead phrases).
- [ ] Every `::story-preview` story ID matches `showcase.md`.
- [ ] Cross-links use the correct prefixes: `/docs/api/recipes`, `/docs/theme/design-tokens/presets`.
- [ ] Anatomy section is present for multi-part recipes and absent for single-recipe.
- [ ] File written to `apps/docs/content/docs/04.components/02.composables/<nn>.<name>.md`.
- [ ] `documentation.md` written to `.context/recipe-<name>/`.

---

## Constraints

- **Source code is the single source of truth.** Do not infer, assume, or invent any behavior, parameter, return value, or error not present in the recipe TS or the approved design.
- **Reference pages define the form.** Do not introduce structural or stylistic patterns not present in the reference pages.
- **Flag uncertainty, don't fill gaps.** Use `[VERIFY: ...]` for anything ambiguous.
- **Maintain the same markdown flavor** as the reference pages (Nuxt Content — `::block`, `:::container`, `::::nested` syntax).
- **Do not hallucinate cross-references.** Only link to pages/sections that exist in the references or are explicitly referenced in the recipe.
- **Remove filler words.** No "simply," "just," "obviously," "it should be noted that," "as you can see."

---

## Next step

After `documentation.md` and the final doc file are written, invoke `/verify-recipe`.
