# @styleframe/transpiler

Code generation engine that converts a `Styleframe` instance (from `@styleframe/core`) into compiled output files: CSS stylesheets, TypeScript runtime code, and TypeScript declaration files. It transforms the token-based AST into consumable string output using three independent consumer pipelines.

## When to Use This Package

- Transpile a `Styleframe` instance into CSS, TypeScript, and/or `.d.ts` output
- Generate CSS from variables, selectors, utilities, themes, at-rules, and keyframes
- Generate TypeScript runtime code for recipes and exported selectors
- Generate TypeScript declaration files for virtual module type support
- Customize output with custom consumer functions or naming conventions

## Installation

```ts
import {
  transpile,
  createFile,
  consumeCSS,
  consumeTS,
  DEFAULT_INDENT,
  STATEMENT_AT_RULES,
  STATEMENT_OR_BLOCK_AT_RULES,
  defaultThemeSelectorFn,
  defaultVariableNameFn,
  defaultUtilitySelectorFn,
} from "@styleframe/transpiler";
```

**Peer dependencies:** `@styleframe/core`, `@styleframe/license`
**Dependencies:** `scule` (case conversion utilities)

## Architecture

### Three Output Pipelines

The transpiler uses a **consumer pattern** with three independent pipelines:

| Pipeline | Output File | Purpose |
|----------|-------------|---------|
| **CSS** | `index.css` | Full stylesheet with variables, selectors, utilities, themes, at-rules |
| **TS** | `index.ts` | Runtime recipe functions and exported selector constants |
| **DTS** | `index.d.ts` | Type declarations for virtual modules (`virtual:styleframe`) |

### Consumer Pipeline Flow

Each pipeline uses factory functions that create consumers for specific AST token types:

1. **Root consumer** — Entry point, dispatches to child consumers
2. **Token consumers** — Handle specific types (Variable, Selector, Utility, Theme, AtRule, Recipe)
3. **Generator functions** — Construct raw CSS/TS syntax strings

### CSS Generation Flow

```
Styleframe root
  → Root consumer (variables, selectors, utilities, themes, at-rules)
    → :root { variables }
    → selector rules
    → utility classes
    → @keyframes, @media, @supports blocks
    → [data-theme="name"] { overrides }
```

### TS Generation Flow

```
Styleframe root
  → Root consumer (recipes, selectors)
    → import { createRecipe } from '@styleframe/runtime'
    → const recipeRuntime = { base, variants, ... } as const satisfies RecipeRuntime
    → export const recipe = createRecipe("name", recipeRuntime)
    → export const selectorName = ".query"
```

### DTS Generation Flow

```
Styleframe root
  → Root consumer (module declarations)
    → declare module "virtual:styleframe" { ... }
    → Recipe function types with variant props
    → Selector string types
    → declare module "virtual:styleframe.css" { ... }
```

## API Reference

### `transpile(instance, options?)`

Main transpilation function. Converts a `Styleframe` instance into output files.

```ts
import { transpile } from '@styleframe/transpiler';

const output = await transpile(instance);
// output.files: [{ name: "index.css", content: "..." }, { name: "index.ts", content: "..." }, { name: "index.d.ts", content: "..." }]

// Generate only CSS
const cssOnly = await transpile(instance, { type: 'css' });

// Custom consumers
const custom = await transpile(instance, {
  consumers: { css: customCSSConsumer, ts: customTSConsumer, dts: customDTSConsumer },
});
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `instance` | `Styleframe` | Compiled Styleframe instance with root AST |
| `options.type` | `"css" \| "ts" \| "dts" \| "all"` | Output type (default: `"all"`) |
| `options.consumers` | `{ css, ts, dts }` | Override default consumer functions |

**Returns:** `Promise<Output>` — `{ files: OutputFile[] }` where each file has `name` and `content` strings.

**License validation:** Checks if the instance requires a license. If invalid, injects a watermark pseudo-element into the CSS output.

---

### `createFile(name, content?)`

Factory for creating output file objects.

```ts
const file = createFile('index.css', 'body { margin: 0; }');
// { name: "index.css", content: "body { margin: 0; }" }

const empty = createFile('index.css');
// { name: "index.css", content: "" }
```

---

### `consumeCSS(instance, options)`

CSS consumer function. Converts a Styleframe instance into a CSS string.

```ts
import { consumeCSS } from '@styleframe/transpiler';

const css = consumeCSS(instance, instance.options);
```

Handles all token types: variables (as CSS custom properties in `:root`), selectors, utilities, themes (scoped to `[data-theme="name"]`), at-rules, and keyframes.

---

### `consumeTS(instance, options)`

TypeScript consumer function. Generates runtime code for recipes and exported selectors.

```ts
import { consumeTS } from '@styleframe/transpiler';

const ts = consumeTS(instance, instance.options);
```

Only processes tokens with `_exportName` metadata (set by `@styleframe/loader`'s `trackExports`).

---

### Generator Functions

Low-level CSS syntax generation helpers used by the consumers.

| Function | Purpose | Example Output |
|----------|---------|----------------|
| `genSafeVariableName(name)` | Sanitize variable names for CSS | `--color-primary` |
| `genSafePropertyName(name)` | Convert camelCase to kebab-case | `border-width` |
| `genReferenceVariable(name, fallback?)` | Create CSS variable reference | `var(--color-primary, fallback)` |
| `genDeclareVariable(name, value)` | Declare a CSS variable | `--color-primary: value;` |
| `genDeclaration(property, value)` | Create a CSS declaration | `padding: 1rem;` |
| `genDeclarationsBlock(declarations)` | Wrap declarations in `{ ... }` | `{\n\tdeclaration;\n}` |
| `genSelector(query, declarations)` | Create a CSS rule | `.class { ... }` |
| `genAtRuleQuery(identifier, rule)` | Create at-rule prefix | `@media (min-width: 768px)` |
| `genInlineAtRule(identifier, rule)` | Create statement at-rule | `@charset "utf-8";` |

---

### Utility Functions

| Function | Description |
|----------|-------------|
| `addIndentToLine(line)` | Add default indent (tab) to a line |
| `indentLines(lines)` | Indent each line in an array |
| `toCamelCase(str)` | Convert string to camelCase (via `scule`) |
| `toKebabCase(str)` | Convert string to kebab-case (via `scule`) |
| `isUppercase(char)` | Check if a character is uppercase |

---

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `DEFAULT_INDENT` | `"\t"` | Default indentation character |
| `STATEMENT_AT_RULES` | `["charset", "import", "namespace"]` | At-rules that output as statements (no block) |
| `STATEMENT_OR_BLOCK_AT_RULES` | `["layer"]` | At-rules that can be statement or block |

---

### Default Functions

| Function | Description |
|----------|-------------|
| `defaultThemeSelectorFn` | Returns `[data-theme="name"]` for a given theme name |
| `defaultVariableNameFn` | Converts dot-notation to double-dash: `color.primary` → `color--primary` |
| `defaultUtilitySelectorFn` | Re-exported from `@styleframe/core` |

## Types

```ts
type OutputFile = { name: string; content: string };
type Output = { files: OutputFile[] };
type ConsumeFunction = (instance: unknown, options: StyleframeOptions) => string;
type TranspileOptions = {
  type?: "css" | "ts" | "dts" | "all";
  consumers?: {
    css: ConsumeFunction;
    ts: ConsumeFunction;
    dts: ConsumeFunction;
  };
};
```

## At-Rule Handling

The CSS consumer categorizes at-rules into two groups:

- **Statement at-rules** (`@charset`, `@import`, `@namespace`) — Output as `@rule value;` with no block
- **Block at-rules** (`@media`, `@supports`, `@layer`, `@container`, `@font-face`, `@keyframes`, `@property`) — Output as `@rule { children }` with nested declarations

`@layer` can be either statement or block depending on whether it has children.

## Edge Cases

- **Empty instance:** Produces minimal output with empty `:root {}` or empty files
- **License watermark:** Invalid license injects a fixed-position pseudo-element via `html:nth-of-type(random)::after` displaying a development mode notice
- **Recipes in CSS:** Recipes are not output in CSS — they only generate TS and DTS output
- **Export metadata:** Only tokens with `_exportName` metadata (set by `@styleframe/loader`) appear in TS/DTS output
- **Nested selectors:** The CSS consumer handles `&:hover`, `.child`, nested `@media`, and nested `@supports` via declaration object keys

## Best Practices

1. **Use `transpile()` as the primary entry point** — It handles license validation, file creation, and consumer dispatch. Use individual consumers only for custom pipelines.

2. **Use `type` option to generate only what you need** — Pass `"css"` for stylesheet-only builds. Generating all three types when you only need CSS wastes computation.

3. **Custom consumers must return strings** — If overriding consumers via options, each must accept `(instance, options)` and return a CSS/TS/DTS string.

4. **Generator functions are composable** — Use `genSelector`, `genDeclaration`, etc. to build custom CSS output if extending the consumer pipeline.

5. **The transpiler is pure string generation** — No file I/O, no caching. The `@styleframe/loader` package handles persistence to disk via its `build()` function.

6. **Default indent is tab** — All generated output uses `\t` indentation. Override via instance options if needed.

## Source Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all public API |
| `src/transpile.ts` | Main `transpile()` function |
| `src/types.ts` | Output and consumer types |
| `src/constants.ts` | At-rule categorization constants |
| `src/defaults.ts` | Default naming functions |
| `src/utils.ts` | String manipulation helpers |
| `src/license.ts` | License watermark injection |
| `src/generator/*.ts` | CSS syntax generation (9 files) |
| `src/consume/css/*.ts` | CSS output consumers (13 files) |
| `src/consume/ts/*.ts` | TypeScript output consumers (4 files) |
| `src/consume/dts/*.ts` | TypeScript declaration consumers (4 files) |
