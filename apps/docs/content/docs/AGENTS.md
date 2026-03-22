# Styleframe Documentation Site

This directory contains the source content for the Styleframe documentation site. It uses Nuxt Content with Markdown files organized into numbered sections. An AI agent working here should understand the site structure, formatting conventions, and content patterns to write or modify documentation pages that are indistinguishable from existing ones.

## Directory Structure

```
content/docs/
├── 01.getting-started/     # Installation, introduction, licensing, CLI
├── 02.api/                 # Core API reference (variables, selectors, utilities, recipes, etc.)
├── 03.tooling/             # Scanner, Figma plugin
├── 04.resources/           # Guides, comparisons with other tools
├── 05.components/          # Component recipes (Badge, etc.)
├── 05.design-tokens/       # Color, spacing, typography, scale, breakpoint tokens
├── 06.utilities/           # 16 utility categories (spacing, layout, typography, etc.)
└── 07.modifiers/           # Pseudo-state, form-state, aria, structural, etc.
```

**Numbering convention:** Directories and files use `NN.` prefixes for ordering (e.g., `01.introduction.md`, `06.colors.md`). Index files use `00.index.md`. Subdirectories follow the same pattern.

---

## Frontmatter Format

Every page starts with YAML frontmatter:

```yaml
---
title: Page Title
description: A brief description of the page content.
navigation:
    icon: i-lucide-icon-name
---
```

- `title` — Page title (required). Do NOT use H1 headings in the body; the title is rendered from frontmatter.
- `description` — Brief description (required). Used for SEO and page previews.
- `navigation.icon` — Lucide icon identifier (optional). Format: `i-lucide-<icon-name>`.

---

## Page Structure Convention

Most documentation pages follow this consistent section order:

1. **Overview** (`## Overview`) — 1-3 sentences explaining what the feature is.
2. **Why use [feature]?** (`## Why Use [Feature]?` or `## Why use [feature]?`) — Bulleted list of benefits, each with a bold lead phrase.
3. **Feature content** — The main documentation. Structure varies by section type (see below).
4. **Examples** (`## Examples`) — Real-world usage examples with tabbed code blocks.
5. **Best Practices** (`## Best Practices`) — Bulleted list of do's and don'ts.
6. **FAQ** (`## FAQ`) — Accordion-style Q&A section.

Not every page has all sections. Simpler pages may omit Examples or FAQ.

---

## Heading Hierarchy

- **H1 (`#`)** — NEVER used in page body. Title comes from frontmatter.
- **H2 (`##`)** — Main sections: `Overview`, `Why Use X?`, function names (`` ## `useColorDesignTokens` ``), `Examples`, `Best Practices`, `FAQ`.
- **H3 (`###`)** — Subsections within H2: `Naming Convention`, `Default Values`, `Creating Custom X`.
- **H4 (`####`)** — Rare. Used inside `::steps{level="4"}` blocks.

---

## Code Examples

### Tabbed Code Blocks

The primary pattern for code examples uses tabs with Code, Output, and optionally Usage:

```markdown
::tabs
:::tabs-item{icon="i-lucide-code" label="Code"}

\`\`\`ts [styleframe.config.ts]
import { styleframe } from "styleframe";
// code here
export default s;
\`\`\`

:::
:::tabs-item{icon="i-lucide-file-input" label="Output"}

\`\`\`css [styleframe/index.css]
:root {
    --color--primary: #006cff;
}
\`\`\`

:::
:::tabs-item{icon="i-lucide-layout" label="Usage"}

\`\`\`html
<div class="_background-color:primary">Content</div>
\`\`\`

:::
::
```

**Key rules:**
- Code blocks include file path labels in square brackets: `` ```ts [styleframe.config.ts] ```, `` ```css [styleframe/index.css] ```.
- The Code tab shows TypeScript (the Styleframe config). The Output tab shows the generated CSS. The Usage tab shows HTML with utility classes.
- Use `"styleframe"` for core imports and `"@styleframe/theme"` for theme composables.
- Always end config files with `export default s;`.
- Use 4-space indentation inside CSS output blocks.

### Inline Code

- Use backticks for: variable names (`` `colorPrimary` ``), CSS properties (`` `--color--primary` ``), function names (`` `useColorDesignTokens()` ``), class names (`` `_margin:md` ``), values (`` `'1rem'` ``).

---

## Special Components

### Tips

```markdown
::tip
**Pro tip:** Description of helpful advice here.
::
```

### Notes

```markdown
::note
**Good to know:** Informational content here.
::
```

### Steps

```markdown
::steps{level="4"}

#### Step Title
Step content here.

#### Another Step
More content.

::
```

### Story Previews (Component demos)

```markdown
::story-preview
---
story: theme-recipes-badge--default
panel: true
---
::
```

### Accordion (FAQ)

```markdown
::accordion

:::accordion-item{label="Question text here?" icon="i-lucide-circle-help"}
Answer text here.
:::

:::accordion-item{label="Another question?" icon="i-lucide-circle-help"}
Another answer.
:::

::
```

---

## Content Patterns by Section Type

### API Pages (`02.api/`)

Document core Styleframe methods. Each method gets an H2 heading with the function signature. Show tabbed Code/Output examples for each. Include a "Naming Convention" or similar subsection when the method has naming rules. End with Best Practices and FAQ.

### Design Token Pages (`05.design-tokens/`)

Document `@styleframe/theme` composables. Each composable (e.g., `useColorDesignTokens`, `useColorLightnessDesignTokens`) gets its own H2 section. Show:
1. Default usage with tabbed Code/Output
2. Custom values variant
3. Extending defaults variant

Include default value tables and tips about `as const` usage. End with Best Practices and FAQ.

### Utility Pages (`06.utilities/`)

Document utility composables. Show:
1. Basic usage with the utility creator function
2. Directional variants (for spacing, border, etc.) in a reference table
3. Modifier integration (hover, focus, etc.)
4. HTML Usage tab with class name examples

Class name format: `_property-name:value` (e.g., `_margin:sm`), with modifier prefix: `_hover:margin:sm`.

### Modifier Pages (`07.modifiers/`)

Document modifier composables. Each modifier gets its own H2 with tabbed Code/Output/Usage. Include:
1. Individual modifier functions (e.g., `useHoverModifier`)
2. Batch function (e.g., `usePseudoStateModifiers`)
3. CSS selector mapping table
4. Combined modifier examples

### Component Pages (`05.components/`)

Document pre-built recipes. Include:
1. Registration with `useButtonRecipe(s)` etc.
2. Story preview component for visual demo
3. Variant tables (colors, sizes, styles)
4. Framework-specific usage tabs (React, Vue)
5. Accessibility section with WCAG guidelines
6. Customization and filtering options

---

## Cross-References

Use relative paths starting with `/docs/`:

```markdown
[Learn more about variables →](/docs/api/variables)
[See the recipes API](/docs/api/recipes)
```

Do NOT invent cross-references. Only link to pages that exist in the directory structure.

---

## Voice and Tone

- **Second person** — "You define a variable using..." not "One defines..."
- **Imperative for instructions** — "Create a spacing variable" not "A spacing variable should be created"
- **Direct and concise** — No filler words ("simply", "just", "obviously", "it should be noted that")
- **Bold lead phrases** in bulleted lists — `**Create consistent spacing**: Reference design tokens for...`
- **Moderate formality** — Technical but approachable. Not overly casual.

---

## Best Practices for Writing Documentation

1. **Match existing patterns exactly.** Read 2-3 similar pages before writing a new one.
2. **Every code example must be syntactically correct** and use real Styleframe APIs.
3. **Show Code AND Output** — Always pair TypeScript config with generated CSS.
4. **Use `as const`** on value objects in all composable examples.
5. **Include the full import chain** — Show all necessary imports at the top of each code block.
6. **Document edge cases** in FAQ sections, not inline.
7. **Keep descriptions grounded in source code** — Do not invent behaviors, parameters, or return values.
8. **Use semantic color/token names** in examples — `primary`, `secondary`, not `blue`, `gray`.
9. **Preserve `export default s;`** at the end of every `styleframe.config.ts` example.
10. **Use 4-space indentation** in CSS output blocks to match existing convention.
