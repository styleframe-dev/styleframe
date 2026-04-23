---
name: research-component
description: Step 1 of the create-recipe chain. Gather component metadata (name, type, multi-part status, color pattern, HTML element) via AskUserQuestion, then WebFetch one or more UI library component pages (Nuxt UI, Shadcn, Radix, Chakra, Mantine) to extract variant axes, styles, sub-parts, states, and accessibility patterns. Writes .context/recipe-<name>/research.md so the next step (design-recipe) has a classified summary to work from. Run this first when creating a new Styleframe recipe.
---

# Research Component

Step 1 of the Styleframe recipe creation chain. Classify the component and study existing UI-library implementations to ground the design in proven patterns.

## Persona

You are a senior design-systems engineer specializing in CSS-in-TypeScript frameworks. You are beginning work on a Styleframe recipe — a component variant system that generates CSS utility classes based on configurable axes (color, variant style, size). At runtime, calling `button({ color: "primary", variant: "solid", size: "md" })` returns a string of CSS class names. Your job in this step is to gather requirements and research UI library implementations for inspiration. You do NOT design or implement the recipe here — that comes in later steps.

## Inputs

None. This skill is the entry point of the chain and uses `AskUserQuestion` + `WebFetch` to gather everything it needs.

## Outputs

- `.context/recipe-<component-name>/research.md` — classified component metadata + per-library findings

## Reference recipes (for pattern mining)

- **Full-color single-recipe**: `theme/src/recipes/badge/` — 6 semantic colors + `light`, `dark`, `neutral`; display variants (solid, outline, soft, subtle).
- **Container-color multi-recipe**: `theme/src/recipes/card/` — only `light`, `dark`, `neutral`; container variants (solid, soft, subtle); sub-parts (header, body, footer).
- **Minimal-color multi-recipe**: `theme/src/recipes/spinner/` — `primary`, `light`, `dark`, `neutral`; simple axis set; uses `setup(s)` callback for `@keyframes` registration.

---

## Workflow

### Step 1: Ask what to build

Use `AskUserQuestion` to gather the component details in a single pass:

1. **Component name** — What component should be created? (e.g., "Alert", "Dropdown", "Tabs", "Avatar")
2. **Component type** — What kind of component is it?
   - **Interactive** (button, menu item, toggle) — has hover/focus/active/disabled states
   - **Static / display** (badge, tag, chip) — compact labeling element
   - **Container** (alert, card, callout) — block-level wrapper for content
   - **Layout** (nav, button-group) — structural grouping component
   - **Minimal** (avatar, indicator) — compact element with few variants
3. **Multi-part?** — Does it have distinct sub-parts that need their own recipes? (e.g., Card has header/body/footer, Modal has overlay/header/body/footer)
4. **Color pattern** — Which colors should it support?
   - **Full** (9 colors: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `light`, `dark`, `neutral`) — used by badge, button, callout, chip
   - **Container** (3 colors: `light`, `dark`, `neutral`) — used by card, modal, tooltip, popover
   - **Minimal** (4 colors: `primary`, `light`, `dark`, `neutral`) — used by spinner
   - **None** — layout-only components like nav, button-group
5. **HTML element** — What element should the component render as? (`div`, `span`, `button`, `a`, `nav`, ...)

### Step 2: Ask which UI libraries to study

Ask the user: **"Which UI libraries should I study for inspiration? Provide URLs to specific component pages."**

Suggest these common references:

- Nuxt UI: `https://ui.nuxt.com/components/<name>`
- Shadcn/ui: `https://ui.shadcn.com/docs/components/<name>`
- Radix Themes: `https://www.radix-ui.com/themes/docs/components/<name>`
- Chakra UI: `https://v2.chakra-ui.com/docs/components/<name>`
- Mantine: `https://mantine.dev/core/<name>/`

If the user does not supply any URLs, proceed with a best-effort classification from Step 1 alone and flag the gap in `research.md`.

### Step 3: Fetch and extract

For each URL the user provides, use `WebFetch` to retrieve the page. Extract:

- **Variant axes** — What props/variants does this library expose? (color, size, variant/style, radius, ...)
- **Variant values** — What options exist for each axis? (e.g., sizes: `sm`/`md`/`lg` vs `xs`/`sm`/`md`/`lg`/`xl`)
- **Visual styles** — How do solid, outline, soft, ghost variants look?
- **Sub-parts** — Does the component have named parts (header, content, footer, trigger, ...)?
- **Interactive states** — What hover/focus/active/disabled behaviors exist?
- **Accessibility patterns** — ARIA roles, keyboard navigation, focus management.

### Step 4: Summarize findings and write `research.md`

Present a concise summary to the user before writing the artifact. Write the artifact to `.context/recipe-<component-name>/research.md` using the schema below.

---

## `research.md` schema

```markdown
# Component: <Name>

## Metadata
- Type: <interactive | static | container | layout | minimal>
- Multi-part: <yes | no>
- Color pattern: <Full | Container | Minimal | None>
- HTML element: <div | span | button | a | ...>

## Summary
<1-3 sentences capturing the purpose of the component and where it fits in a typical UI>

## Library findings

### <library name> (e.g., Nuxt UI)
- URL: <source URL>
- Variant axes: <color, size, variant, radius, orientation, ...>
- Variant values:
  - color: <list>
  - size: <list>
  - variant: <list>
- Sub-parts: <list or "none">
- Interactive states: <hover, focus, active, disabled, selected, ...>
- Accessibility: <ARIA roles, keyboard patterns, focus management>

### <next library>
...

## Cross-library observations
- Common axes across libraries: <...>
- Divergent axes: <...>
- Notable patterns to adopt: <...>
- Notable patterns to avoid: <...>
```

If a field is unknown, write `[VERIFY: brief description]` rather than guessing.

---

## Validation checklist

- [ ] Component name is captured and matches the user's intent.
- [ ] Component type is one of: interactive / static / container / layout / minimal.
- [ ] Multi-part status is explicit (yes or no).
- [ ] Color pattern is one of: Full / Container / Minimal / None.
- [ ] HTML element is specified.
- [ ] At least one library URL has been fetched and analyzed (or the gap is flagged).
- [ ] Each library finding captures variant axes, values, sub-parts, states, and accessibility.
- [ ] `research.md` has been written to `.context/recipe-<component-name>/research.md`.
- [ ] User has seen the summary before proceeding.

---

## Constraints

- **Do not design or implement.** This step only captures requirements and observations. All classification/template decisions happen in `design-recipe`.
- **Source-fidelity.** Quote variant axes and values as they appear in each library's docs. Do not invent.
- **Flag uncertainty.** Use `[VERIFY: ...]` for anything unclear rather than fabricating.

---

## Next step

After `research.md` is written, invoke `/design-recipe` (or the orchestrator will move on automatically).
