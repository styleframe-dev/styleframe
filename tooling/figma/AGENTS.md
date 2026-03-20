# @styleframe/figma

Figma plugin and converter library for syncing Styleframe design tokens with Figma variables. Provides bidirectional conversion between Styleframe's CSS-in-TypeScript token format, Figma's variable system, and the W3C Design Tokens Community Group (DTCG) standard format.

## When to Use This Package

- Import design tokens from JSON (DTCG or legacy format) into Figma as variables
- Export Figma variable collections to DTCG-compliant JSON
- Convert between Figma variable formats and Styleframe code
- Generate Styleframe TypeScript code from Figma-exported token data
- Convert between naming conventions (dot notation, slash notation, CSS custom properties)
- Parse and convert color, dimension, and type values between Figma and CSS formats

## Installation

```ts
import {
  // Converters
  generateStyleframeCode,
  // Name mapping
  styleframeToFigmaName,
  figmaToStyleframeName,
  extractCategory,
  extractKey,
  toVariableIdentifier,
  cssVariableToStyleframeName,
  styleframeToCssVariable,
  // Value parsing
  cssColorToFigma,
  figmaColorToCss,
  parseDimension,
  dimensionToPixels,
  pixelsToDimension,
  isColorValue,
  isDimensionValue,
  detectFigmaType,
  styleframeValueToFigma,
  figmaValueToStyleframe,
  // DTCG format
  toDTCG,
  fromDTCG,
  figmaTypeToDTCG,
  dtcgTypeToFigma,
  detectDTCGType,
  parseAlias,
  createAlias,
  figmaPathToDTCG,
  dtcgPathToFigma,
  resolveAliasForFigma,
  getPathSegments,
  joinPath,
} from "@styleframe/figma";
```

**Dependencies:** `@styleframe/core`, `culori` (color parsing/formatting)

## Architecture

The package has two parts:

1. **Converter library** (`src/converters/`) — Exported functions for converting between Styleframe, Figma, DTCG, and CSS formats. This is the public npm API.
2. **Figma plugin** (`src/plugin/`) — A Figma plugin UI that uses the converters to import/export variables. Not part of the npm exports.

### Data Flow

```
Styleframe Code → FigmaExportFormat → Figma Variables (import)
Figma Variables → FigmaExportFormat → DTCG JSON (export)
DTCG JSON → FigmaExportFormat → Figma Variables (import)
FigmaExportFormat → Styleframe TypeScript Code (codegen)
```

### Intermediate Format: FigmaExportFormat

All conversions pass through `FigmaExportFormat`, the internal interchange format:

```ts
interface FigmaExportFormat {
  collection: string;      // Collection name (e.g., "Design Tokens")
  modes: string[];         // Mode names, first is default (e.g., ["Default", "Dark"])
  variables: FigmaExportVariable[];
}

interface FigmaExportVariable {
  name: string;            // Figma name, slash notation (e.g., "color/primary")
  styleframeName?: string; // Dot notation (e.g., "color.primary")
  type: FigmaVariableType; // "COLOR" | "FLOAT" | "STRING" | "BOOLEAN"
  values: Record<string, FigmaVariableValue>; // Values by mode name
  aliasTo?: string;        // Target variable name if alias
  description?: string;
}
```

---

## API Reference

### Name Mapping

Convert between naming conventions used by Styleframe, Figma, and CSS.

| Function | Conversion | Example |
|----------|-----------|---------|
| `styleframeToFigmaName(name)` | Dot → slash | `"color.primary"` → `"color/primary"` |
| `figmaToStyleframeName(name)` | Slash → dot | `"color/primary"` → `"color.primary"` |
| `extractCategory(name)` | First segment | `"color.primary.500"` → `"color"` |
| `extractKey(name)` | Last segment | `"color.primary.500"` → `"500"` |
| `toVariableIdentifier(name)` | To camelCase | `"color.primary"` → `"colorPrimary"` |
| `cssVariableToStyleframeName(name)` | CSS var → dot | `"--color--primary"` → `"color.primary"` |
| `styleframeToCssVariable(name)` | Dot → CSS var | `"color.primary"` → `"--color--primary"` |

---

### Value Parsing

Convert values between CSS, Figma RGBA (0-1 range), and Styleframe formats. Uses `culori` for color parsing.

#### `cssColorToFigma(value)`

Convert a CSS color string to Figma RGBA format. Supports hex, rgb(), rgba(), hsl(), hsla(), named colors, oklch, oklab.

```ts
cssColorToFigma("#006cff");
// { r: 0, g: 0.424, b: 1, a: 1 }
```

Returns `null` if the value cannot be parsed.

#### `figmaColorToCss(rgba)`

Convert Figma RGBA (0-1 range) to CSS hex color. Uses hex8 when alpha < 1.

```ts
figmaColorToCss({ r: 0, g: 0.424, b: 1, a: 1 });
// "#006cff"
```

#### `dimensionToPixels(value, baseFontSize?)`

Convert a CSS dimension string to pixel number. Default `baseFontSize` is 16.

```ts
dimensionToPixels("1.5rem");   // 24
dimensionToPixels("16px");     // 16
dimensionToPixels("2em", 20);  // 40
```

Returns `null` for unsupported units (vh, vw, etc.).

#### `pixelsToDimension(pixels, unit?, baseFontSize?)`

Convert a pixel number to a CSS dimension string.

```ts
pixelsToDimension(24, "rem");  // "1.5rem"
pixelsToDimension(16, "px");   // "16px"
```

#### `detectFigmaType(value)`

Detect the Figma variable type from a value.

```ts
detectFigmaType("#ff0000");  // "COLOR"
detectFigmaType("16px");     // "FLOAT"
detectFigmaType(true);       // "BOOLEAN"
detectFigmaType("hello");    // "STRING"
```

#### `styleframeValueToFigma(value, type, baseFontSize?)`

Convert a Styleframe token value to Figma-compatible value. Colors become `FigmaRGBA`, dimensions become pixel numbers.

#### `figmaValueToStyleframe(value, type, useRem?, baseFontSize?)`

Convert a Figma variable value to a CSS string. Colors become hex, floats become `"Npx"` or `"Nrem"`.

---

### DTCG Format Conversion

Convert between the W3C Design Tokens Community Group (DTCG) standard and the internal `FigmaExportFormat`.

#### `toDTCG(data, options?)`

Convert `FigmaExportFormat` to a DTCG document. Multi-mode values are stored in `$modifiers.theme.contexts` by default.

```ts
const dtcg = toDTCG(figmaData, {
  includeSchema: true,    // Add $schema field (default: true)
  useModifiers: true,     // Use $modifiers for multi-mode values (default: true)
  themeNames: ["Dark"],   // Only these modes become modifier contexts
});
```

**Output structure:**
- Tokens nested by path: `color/primary` → `{ color: { primary: { $value, $type } } }`
- Collection and modes stored in `$extensions["dev.styleframe"]`
- Theme overrides in `$modifiers.theme.contexts`
- Colors converted to CSS hex, floats to `"Npx"` dimension strings

#### `fromDTCG(doc, options?)`

Convert a DTCG document to `FigmaExportFormat`. Reads modifier contexts and legacy extension formats.

```ts
const figmaData = fromDTCG(dtcgDocument, {
  defaultModeName: "Default",   // Default mode name (default: "Default")
  collectionName: "My Tokens",  // Override collection name
  preferredModifier: "theme",   // Which modifier to read for modes (default: "theme")
});
```

**Mode detection priority:**
1. `$modifiers[preferredModifier].contexts` keys
2. `$extensions["dev.styleframe"].modes`
3. Falls back to `[defaultModeName]`

#### Type Mapping

| Figma Type | DTCG Type |
|-----------|-----------|
| `COLOR` | `color` |
| `FLOAT` | `dimension` |
| `STRING` | `string` |
| `BOOLEAN` | `string` (DTCG has no boolean type) |

Reverse mapping also handles `number`, `fontWeight`, `duration` → `FLOAT` and `fontFamily` → `STRING`.

#### Alias Handling

| Function | Purpose | Example |
|----------|---------|---------|
| `parseAlias(alias)` | Extract path from DTCG alias | `"{color.primary}"` → `"color.primary"` |
| `createAlias(path)` | Create DTCG alias string | `"color.primary"` → `"{color.primary}"` |
| `figmaPathToDTCG(path)` | Slash to dot notation | `"color/primary"` → `"color.primary"` |
| `dtcgPathToFigma(path)` | Dot to slash notation | `"color.primary"` → `"color/primary"` |
| `resolveAliasForFigma(value)` | Check if alias and resolve | Returns `{ isAlias, target? }` |

---

### Code Generation

#### `generateStyleframeCode(data, options?)`

Generate Styleframe TypeScript code from `FigmaExportFormat`. Groups variables by category, uses theme composables when available, and generates theme blocks for non-default modes.

```ts
const result = generateStyleframeCode(figmaData, {
  useComposables: true,        // Use useColor, useSpacing, etc. (default: true)
  useRem: false,               // Convert dimensions to rem (default: false)
  baseFontSize: 16,            // Base font size for rem conversion (default: 16)
  instanceName: "s",           // Styleframe instance name (default: "s")
  defaultModeName: "Default",  // Which mode is the base (default: first mode)
});
```

**Returns `CodegenResult`:**

```ts
interface CodegenResult {
  code: string;              // Generated TypeScript code
  variables: ParsedVariable[];
  themes: ParsedTheme[];
  imports: string[];         // Required import paths
}
```

**Composable mapping:** When `useComposables: true`, variables are grouped by category and generated using theme composables:

| Category | Composable |
|----------|-----------|
| `color` | `useColor` |
| `spacing` | `useSpacing` |
| `fontSize` | `useFontSize` |
| `fontWeight` | `useFontWeight` |
| `fontFamily` | `useFontFamily` |
| `lineHeight` | `useLineHeight` |
| `letterSpacing` | `useLetterSpacing` |
| `borderWidth` | `useBorderWidth` |
| `borderRadius` | `useBorderRadius` |
| `boxShadow` | `useBoxShadow` |

Variables that don't match a composable category, or that are alias references, are generated as standalone `variable()` calls.

---

## Figma Plugin

The plugin (`src/plugin/`) is a Figma plugin with an import/export UI. It is built separately via Vite and is not part of the npm package exports.

### Plugin Commands

- **Import:** Accepts JSON (DTCG or legacy `FigmaExportFormat`), creates/updates a Figma variable collection with modes and values. Handles aliases in two passes (non-alias first, then alias variables).
- **Export:** Reads a Figma variable collection, converts to `FigmaExportFormat`, then to DTCG JSON. Supports selecting which collection to export.

### Plugin Message Types

| Message | Direction | Purpose |
|---------|-----------|---------|
| `import` | UI → Plugin | Import JSON data as Figma variables |
| `export` | UI → Plugin | Export a collection to JSON |
| `get-collections` | UI → Plugin | List available variable collections |
| `close` | UI → Plugin | Close the plugin |
| `set-mode` | Plugin → UI | Switch to import or export tab |
| `collections` | Plugin → UI | Send collection list |
| `import-complete` | Plugin → UI | Import succeeded with count |
| `export-complete` | Plugin → UI | Export data ready |
| `error` | Plugin → UI | Error message |

---

## Types

### Core Types

```ts
type FigmaVariableType = "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";

interface FigmaRGBA {
  r: number;  // 0-1 range
  g: number;
  b: number;
  a?: number; // defaults to 1
}

type FigmaVariableValue = FigmaRGBA | number | string | boolean | FigmaVariableAlias;

interface FigmaVariableAlias {
  type: "VARIABLE_ALIAS";
  id: string;
}
```

### Conversion Options

```ts
interface StyleframeToFigmaOptions {
  collectionName?: string;   // Default: "Design Tokens"
  defaultModeName?: string;  // Default: "Default"
  baseFontSize?: number;     // Default: 16
}

interface FigmaToStyleframeOptions {
  useComposables?: boolean;  // Default: true
  useRem?: boolean;          // Default: false
  baseFontSize?: number;     // Default: 16
  instanceName?: string;     // Default: "s"
  defaultModeName?: string;  // Default: first mode
}
```

### DTCG Types

```ts
type DTCGTokenType = "color" | "dimension" | "fontFamily" | "fontWeight"
  | "duration" | "cubicBezier" | "number" | "string";

interface DTCGToken {
  $value: DTCGTokenValue;
  $type?: DTCGTokenType;
  $description?: string;
  $deprecated?: boolean | string;
  $extensions?: DTCGExtensions;
}

interface DTCGDocument {
  $schema?: string;
  $description?: string;
  $extensions?: DTCGDocumentExtensions;
  $modifiers?: DTCGModifiers;
  [key: string]: DTCGToken | DTCGGroup | ...;
}
```

Type guards: `isDTCGToken(value)`, `isDTCGGroup(value)`, `isDTCGAlias(value)`.

---

## Build Scripts

| Script | Purpose |
|--------|---------|
| `pnpm build` | Build library (tsdown) + plugin (Vite) |
| `pnpm build:lib` | Build only the npm library |
| `pnpm build:plugin` | Build only the Figma plugin |
| `pnpm dev` | Watch mode for library |
| `pnpm test` | Run tests |
| `pnpm typecheck` | TypeScript type checking |

---

## Source Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Barrel re-exports (types + converters) |
| `src/types.ts` | Core TypeScript interfaces |
| `src/converters/index.ts` | Re-exports all converter modules |
| `src/converters/name-mapping.ts` | Name format conversions (dot/slash/camelCase/CSS) |
| `src/converters/value-parsing.ts` | Color, dimension, and type value conversions |
| `src/converters/codegen.ts` | Styleframe TypeScript code generation |
| `src/converters/dtcg/index.ts` | DTCG module re-exports |
| `src/converters/dtcg/types.ts` | DTCG format type definitions and type guards |
| `src/converters/dtcg/to-dtcg.ts` | FigmaExportFormat → DTCG conversion |
| `src/converters/dtcg/from-dtcg.ts` | DTCG → FigmaExportFormat conversion |
| `src/converters/dtcg/type-mapping.ts` | Figma ↔ DTCG type mapping |
| `src/converters/dtcg/alias-parsing.ts` | DTCG alias string parsing and creation |
| `src/plugin/code.ts` | Figma plugin backend (variable CRUD) |
| `src/plugin/shared.ts` | Shared utilities (format detection, preview extraction) |
| `src/plugin/ui/main.ts` | Plugin UI logic (import/export tabs) |

---

## Best Practices

1. **Use `FigmaExportFormat` as the interchange format** — All conversions route through this type. Convert to it first, then to your target format.

2. **Use DTCG format for external interchange** — The DTCG format is the W3C standard. Use `toDTCG()` and `fromDTCG()` for import/export rather than the legacy format.

3. **Use `useModifiers: true` for theme modes** — DTCG modifiers (`$modifiers.theme.contexts`) are the standard way to represent multi-mode values. The legacy `$extensions` mode format is a fallback.

4. **Handle aliases in two passes** — When importing to Figma, create non-alias variables first, then alias variables. Aliases need their targets to already exist.

5. **Use `figmaToStyleframeName()` for name conversion** — Figma uses slash notation (`color/primary`), Styleframe uses dot notation (`color.primary`). Always convert when crossing boundaries.

6. **Use `useComposables: true` for code generation** — This generates idiomatic Styleframe code using `@styleframe/theme` composables like `useColor()` and `useSpacing()` instead of raw `variable()` calls.

7. **Set `useRem: true` for accessible output** — When generating Styleframe code, `useRem` converts pixel dimensions to rem units, which respect user font size preferences.
