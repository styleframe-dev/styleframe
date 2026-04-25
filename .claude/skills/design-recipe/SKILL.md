---
name: design-recipe
description: Step 2 of the create-recipe chain. Classifies the component (color pattern Full/Container/Minimal, variant-style pattern Interactive/Display/Container), picks a base-style template, defines variant axes, chooses a compound-variant strategy, sets defaults, and lists sub-recipes for multi-part components. Requires user approval before writing .context/recipe-<name>/design.md. Run after research-component.
---

# Design Recipe

Step 2 of the Styleframe recipe creation chain. Turn research into a concrete, user-approved recipe design that the implement/showcase/document steps can follow.

## Persona

You are a senior design-systems engineer specializing in CSS-in-TypeScript frameworks. You classify components along two axes (color pattern + variant-style pattern), pick base styles from a catalog of proven templates, and produce a design that matches the shape of existing Styleframe recipes. You do not write TypeScript in this step — only the design artifact.

## Inputs

- `.context/recipe-<component-name>/research.md` (required).
  - If missing, stop and ask the user to run `/research-component` first, or re-gather the metadata via `AskUserQuestion` as a fallback.

## Outputs

- `.context/recipe-<component-name>/design.md` — the approved design (only written after user approves).

## Reference recipes (for pattern mining)

- `theme/src/recipes/badge/` — Full color pattern + Display variants. Good reference for single-recipe display components.
- `theme/src/recipes/button/` — Full color pattern + Interactive variants. Uses `...colors.map()` per variant-style for compound variants.
- `theme/src/recipes/card/` — Container color pattern + Container variants + multi-recipe (header/body/footer).
- `theme/src/recipes/spinner/` — Minimal color pattern + animated (uses `setup(s)` for `@keyframes`).
- `theme/src/recipes/tooltip/` — Container color pattern, single recipe.

---

## Workflow

### Step 1: Read research and classify

Load `.context/recipe-<component-name>/research.md`. Using its metadata and library findings, classify the recipe across the following dimensions.

#### Color pattern

| Pattern | Colors in `variants.color` | Example recipes |
|---------|----------------------------|-----------------|
| **Full** | 6 semantic (`primary`, `secondary`, `success`, `info`, `warning`, `error`) + `light`, `dark`, `neutral` (9 total) | badge, button, callout, chip |
| **Container** | `light`, `dark`, `neutral` only (3 total) | card, modal, tooltip, popover |
| **Minimal** | `primary`, `light`, `dark`, `neutral` (4 total) | spinner |
| **None** | No `color` axis (layout-only) | nav, button-group |

#### Variant-style pattern

| Pattern | Variant styles | Used by |
|---------|----------------|---------|
| **Interactive** | `solid`, `outline`, `soft`, `subtle`, `ghost`, `link` | button |
| **Display** | `solid`, `outline`, `soft`, `subtle` | badge, chip, callout |
| **Container** | `solid`, `soft`, `subtle` (no `outline`) | card, modal, popover |
| **Minimal / custom** | whatever the component needs | spinner (2-axis: color+size only) |

#### Base-style template

Pick one of:

- **Interactive component base** — button, menu item, toggle. Has hover/focus/active/disabled, transitions, outline focus ring.
- **Static / display component base** — badge, tag, chip. Compact, inline-flex, no interactive states.
- **Container component base** — alert, callout. Flex, block-level, gap between children.
- **Sectioned container base** — card, modal. Flex-column, `overflow: hidden`, no padding (sub-parts manage their own padding), `box-shadow: @box-shadow.sm`.

(See the "Base-style templates" catalog below for full CSS.)

### Step 2: Decide variant axes

Document every axis the recipe will expose:

1. **`color`** — values from the chosen color pattern, or omit the axis entirely.
2. **`variant`** — values from the chosen variant-style pattern.
3. **`size`** — 3–5 sizes (`xs`/`sm`/`md`/`lg`/`xl` or a subset). Container recipes typically expose `sm`/`md`/`lg` only.
4. **Custom axes** — orientation (`horizontal`/`vertical`), boolean states (`active`, `disabled`, `block`), shape (`square`/`rounded`/`circle`), density — only when the research shows they exist across libraries.

### Step 3: Pick a compound-variant strategy

Choose one (both are valid patterns in the existing codebase):

- **`colors.flatMap(c => [...])`** — one top-level `flatMap` that emits every color × style pair. Preferred when all styles follow a common template (badge, card).
- **`...colors.map(c => ...)` per style** — one `...map()` spread per variant style. Preferred when the styles diverge significantly or when styles have sub-templates that don't share a common shape (button).
- **Manual** — non-semantic-only components (`Container` pattern) write every `light` / `dark` / `neutral` combination by hand.
- **Mixed** — `Full` pattern components use `colors.flatMap()` for the 6 semantic colors, then append `light`/`dark`/`neutral` manually.

### Step 4: Set defaults

Default matrix (derive from the research; adjust only with a reason):

| Component type | Default color | Default variant | Default size |
|----------------|---------------|-----------------|--------------|
| Interactive | `primary` | `solid` | `md` |
| Container / feedback | `neutral` | `solid` | `md` |
| Display (badge) | `neutral` | `solid` | `sm` |
| Non-semantic containers (card, modal) | `neutral` | `solid` | `md` |

Every axis in `variants` must have a corresponding entry in `defaultVariants`.

### Step 5: Enumerate sub-recipes (multi-part only)

For each sub-part (e.g., Card → `cardHeader`, `cardBody`, `cardFooter`):

- Decide if it needs its own recipe (has variant axes) or a plain CSS selector (fixed styling).
- List its variant axes (it can have fewer axes than the parent).
- Name each recipe with the full sub-component path in kebab-case: `card-header`, `card-footer`.

If the parent has a `color` or `variant` axis that changes the sub-part's look, the sub-recipe usually re-exposes those axes.

### Step 6: Form-field wrapper pattern (only for native form elements)

Skip this step unless the component styles a native form element (`<input>`, `<select>`, `<textarea>`). For every other component — badges, buttons, cards, layouts — move to Step 7.

#### When to use this pattern

Use the wrapper pattern if **any** of the following is true:

- The consumer needs inline addons **inside** the field (icons, currency symbols, inline reveal/clear buttons).
- The focus ring must extend to include the inline addons, not just the native element's box.
- The native element's browser-imposed styling blocks customization (`<select>` chevron, `<input type=number>` spinners).

Otherwise, use the single-element pattern: the recipe class goes directly on the native element and no wrapper exists.

#### Architecture

```html
<span class="input input--neutral input--default input--md">
  <span class="input-prefix input-prefix--md">$</span>   <!-- optional -->
  <input class="input-field" />
  <span class="input-suffix input-suffix--md">USD</span> <!-- optional -->
</span>
```

- The wrapper `<span>` carries the main recipe class. It owns the border, background, padding, and `:focus-within` ring.
- The nested `<input class="input-field">` is transparent and inherits typography from the wrapper. It is styled via a setup callback on the wrapper recipe, not via its own recipe.
- Focus is detected on the wrapper with `:focus-within`, **not** `:focus-visible` on the inner element, so the ring encloses the addons too.

#### Setup callback template

The wrapper recipe's `setup(s)` callback registers the inner-field selector:

```ts
(s) => {
  const { selector } = s;
  selector(".<name>-field", {
    flexGrow: "1",
    minWidth: "0",
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "0",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    "&::placeholder": { color: "@color.text-weakest" },
  });
}
```

#### Four-slot addon taxonomy (only when addons are needed)

| Slot | Position | Recipe | Has its own background/border? | Typical use |
|------|----------|--------|-------------------------------|-------------|
| `#prefix` | INSIDE the field, inline with text | `<name>-prefix` | No — shares the wrapper's field | Icon, currency symbol, leading indicator |
| `#suffix` | INSIDE the field, inline with text | `<name>-suffix` | No — shares the wrapper's field | Unit label, reveal toggle, inline clear |
| `#prepend` | OUTSIDE the field, joined on the left | `<name>-prepend` + `<name>-group` | Yes — stands as its own block | Protocol selector, country code |
| `#append` | OUTSIDE the field, joined on the right | `<name>-append` + `<name>-group` | Yes — stands as its own block | Currency code, domain suffix |

**Naming rule**: **prefix/suffix = inline (inside the field); prepend/append = block (outside the field)**. This mirrors the Inkline convention — do not conflate them.

#### Vue integration notes

- Expose the inside addons (`#prefix`, `#suffix`) as **named slots on the main component**, not as standalone components. Consumers drop in arbitrary content.
- Mirror boolean props (`disabled`, `readonly`, `invalid`) to **both** the recipe axis on the wrapper **and** the native attribute on the nested `<input>`. Dropping the native attribute breaks form semantics, accessibility, and IME behavior.

### Step 7: Pick the HTML element

Confirm the HTML element from the research (`div`, `span`, `button`, `a`, `nav`, ...). Interactive components default to `button`, display components to `span`, containers to `div`. Form-field wrappers (from Step 6) default to `span`.

### Step 8: Present design and get approval

Show the design summary to the user using this shape:

```
Component: <Name>
Type: <interactive | static | container | layout | minimal>
HTML element: <...>
Color pattern: <Full | Container | Minimal | None>
Variant-style pattern: <Interactive | Display | Container | custom>
Base template: <interactive | display | container | sectioned container>
Colors: <list>
Variants: <list>
Sizes: <list>
Custom axes: <list or "none">
Compound-variant strategy: <flatMap | map-per-style | manual | mixed>
Sub-recipes: <list or "none">
Default: color=<x>, variant=<y>, size=<z>
```

Wait for explicit user approval before writing `design.md`. If the user requests changes, iterate and re-present.

### Step 9: Write `design.md`

Only after approval. Use the schema below.

---

## Base-style templates

### Interactive component base (button, menu item, toggle)

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

### Static / display component base (badge, tag, chip)

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

### Container component base (alert, card, callout)

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

### Sectioned container base (card, modal — has header/body/footer sub-parts)

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

### Adapting the base

- **Non-interactive**: Remove `cursor`, `"&:focus-visible"`, `"&:disabled"`, transition properties, `userSelect`, `outline`.
- **Block-level**: Use `display: "flex"` instead of `"inline-flex"`.
- **No borders**: Remove `borderWidth`, `borderStyle`, `borderColor`.
- **Sectioned containers**: Include `overflow: "hidden"`, omit padding. Add `boxShadow: "@box-shadow.sm"` for elevation. Add `flexDirection: "column"` directly in base.
- When using an `orientation` variant axis, omit `flexDirection` from base (put it in the orientation variant).

---

## Token reference

All values prefixed with `@` are design token references resolved at compile time.

| Syntax | Resolves to | Example |
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

### Available token values

- **Colors**: `primary`, `secondary`, `success`, `info`, `warning`, `error`, `gray`, `white`, `black`, `background`, `surface`, `text`, `text-inverted`, `text-weak`, `text-weaker`, `text-weakest`
- **Color levels**: `50`, `100`, `150`, `200`, `250`, `300`, `350`, `400`, `450`, `500`, `550`, `600`, `650`, `700`, `750`, `800`, `850`, `900`, `950`
- **Color shades** (darker, relative): `shade-50`, `shade-100`, `shade-150`, `shade-200`
- **Color tints** (lighter, relative): `tint-50`, `tint-100`, `tint-150`, `tint-200`
- **Font sizes**: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- **Font weights**: `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `black`
- **Line heights**: `tight` (1.2), `snug` (1.35), `normal` (1.5), `relaxed` (1.65), `loose` (1.9)
- **Border radius**: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`
- **Border width**: `none`, `thin`, `medium`, `thick`
- **Border style**: `none`, `solid`, `dashed`, `dotted`, `double`, `groove`, `inset`, `outset`
- **Spacing multipliers**: `@0.125`, `@0.25`, `@0.375`, `@0.5`, `@0.625`, `@0.75`, `@0.875`, `@1`, `@1.25`, `@1.5`, `@2`, `@2.5`, `@3`, `@4`
- **Box shadow**: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`, `ring`
- **Z-index**: `hide`, `base`, `dropdown`, `sticky`, `overlay`, `modal`, `popover`, `toast`, `max`, `auto`
- **Easing**: `ease-in-out`, `ease-out`, `ease-in`, `spring`, `bounce`
- **Duration**: `instant`, `fastest`, `faster`, `fast`, `normal`, `slow`, `slower`, `slowest`

### Mode-relative vs. absolute color tokens (watch out for `&:dark`)

> ⚠️ **Footgun**: `@color.text`, `@color.text-inverted`, `@color.text-weak`, `@color.text-weaker`, and `@color.text-weakest` are **mode-relative** — they resolve to different RGB values in light vs. dark mode. When a `&:dark` block is meant to **fix** a variant's appearance across themes (e.g., the `light` color variant must keep a white background and dark text in both light and dark mode), a mode-relative token inside `&:dark` flips the meaning and produces the wrong colour.
>
> **Rules**:
> - **Outer block**: `@color.text` resolves to dark text — correct for light-appearance variants.
> - **Inside `&:dark` pinning a light-appearance variant** (e.g. `light` + `default`): use `@color.text-inverted` (which, in dark mode, resolves to the light-mode value) OR absolute tokens like `@color.gray-900`.
> - **Inside `&:dark` pinning a dark-appearance variant** (e.g. `dark` + `default`): use absolute `@color.white`. Do **not** use `@color.text-inverted` — in dark mode it resolves to dark, producing dark-on-dark.
> - `@color.white`, `@color.black`, and the entire `@color.gray-50..950` scale are absolute and safe inside both blocks.
>
> Quick check: `@color.text*` tokens are only ever safe to copy into a `&:dark` block when the intent is "adapt to dark mode" (as for `neutral`); they are unsafe when the intent is "stay the same across modes" (as for `light`/`dark`).


---

## `design.md` schema

```markdown
# Design: <Name>

## Classification
- Component type: <interactive | static | container | layout | minimal>
- HTML element: <...>
- Color pattern: <Full | Container | Minimal | None>
- Variant-style pattern: <Interactive | Display | Container | custom>
- Base template: <interactive | display | container | sectioned container>

## Variant axes
### color
<list of color values>
### variant
<list of variant styles>
### size
<list of sizes>
### <custom axis name>
<values>

## Compound-variant strategy
<flatMap | map-per-style | manual | mixed> — <one-sentence reason>

## Default variants
color=<x>, variant=<y>, size=<z>, <customAxis=v>

## Sub-recipes (if multi-part)
- <sub-name>: axes=[color, variant, size], role=<e.g., header>
- <sub-name>: axes=[size], role=<e.g., body>

## Setup callback (if needed)
<e.g., register @keyframes for spinner; register :focus-visible selectors>

## Notes for implement/showcase/document
- <anything design-level that isn't obvious from the list above — e.g., "neutral color must adapt to dark mode", "orientation defaults to horizontal">

## Approved by user: yes
```

---

## Validation checklist

- [ ] `research.md` exists and was read (or the user was prompted to supply metadata directly).
- [ ] Component type is one of: interactive / static / container / layout / minimal.
- [ ] Color pattern is explicit: Full / Container / Minimal / None.
- [ ] Variant-style pattern is explicit.
- [ ] Base template is one of: interactive / display / container / sectioned container.
- [ ] Every `variants` axis has an entry in `defaultVariants`.
- [ ] Compound-variant strategy is picked and justified in one sentence.
- [ ] Sub-recipes are listed with axes (multi-part only).
- [ ] HTML element is specified.
- [ ] User has explicitly approved the design.
- [ ] `design.md` is written to `.context/recipe-<component-name>/design.md`.

---

## Constraints

- **Do not implement.** No TypeScript is produced in this step — only the design artifact.
- **No axis invention.** If an axis isn't in `research.md` and the user didn't ask for it, don't add it.
- **Defaults must be valid.** Every value in `defaultVariants` must exist in the corresponding `variants.<axis>`.

---

## Next step

After `design.md` is approved and written, invoke `/implement-recipe`.
