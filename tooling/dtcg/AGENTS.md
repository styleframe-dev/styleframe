# @styleframe/dtcg

Spec-conformant parser, validator, and serializer for the W3C Design Tokens Community Group format.

## When to use

- Importing `.tokens.json` documents from third-party tools (Tokens Studio, Style Dictionary v4+, Specify, Figma plugins)
- Exporting Styleframe tokens to a portable, spec-conformant format
- Resolving multi-mode token bundles using the Resolver Module's `sets`/`modifiers`/`resolutionOrder`
- Validating DTCG JSON before consuming it

## Architecture

The package is organised by spec concern, not by direction. Each module handles one slice of the spec:

```
src/
  types/         — type definitions for the entire DTCG schema
  guards/        — runtime type guards for tokens, groups, values
  parse/         — JSON → typed AST + iteration helpers
  alias/         — {a.b} parsing, transitive resolution, cycle detection
  inheritance/   — propagate $type and $deprecated through groups
  color/         — 14 color spaces + parse/format/convert via culori
  dimension/     — {value, unit} ↔ "16px"
  duration/      — {value, unit} ↔ "100ms"
  composite/     — border, strokeStyle, transition, shadow, gradient, typography
  extensions/    — reverse-DNS namespace validation
  resolver/      — Resolver Module: parse, validate, resolve
  validate/      — full document validation
```

Bridging into a Styleframe AST is the consumer's responsibility (see `@styleframe/figma`).

## Public API

### Document parsing

```ts
import { parse, parseResolver } from "@styleframe/dtcg";

const tokenDoc = parse(jsonString);            // throws ParseError on invalid JSON / shape
const resolverDoc = parseResolver(jsonString); // for .resolver.json files
```

### Validation

```ts
import { validate, validateResolver } from "@styleframe/dtcg";

const errors = validate(tokenDoc); // ValidationError[]
```

### Aliases

```ts
import { isAlias, parseAlias, formatAlias, resolveAliases } from "@styleframe/dtcg";

isAlias("{color.primary}");        // → true
parseAlias("{color.primary}");     // → "color.primary"
formatAlias("color.primary");      // → "{color.primary}"

// Transitive — A → B → C all flattened. Throws CircularReferenceError on cycles.
const resolved = resolveAliases(tokenDoc);
```

### Inheritance

```ts
import { applyInheritance } from "@styleframe/dtcg";

// Returns a new document where every token has its effective $type and $deprecated.
const inherited = applyInheritance(tokenDoc);
```

### Resolver Module

```ts
import { resolveResolver } from "@styleframe/dtcg";

const resolved = await resolveResolver(resolverDoc, { theme: "dark" }, async (ref) => {
  // user-supplied loader: ref → JSON
  return JSON.parse(await fs.readFile(ref, "utf8"));
});
```

### Per-type helpers

```ts
import { color, dimension, duration, composite } from "@styleframe/dtcg";

color.parse("#ff0000");                              // → DTCGColor
color.format({ colorSpace: "srgb", components: [1, 0, 0] }); // → "#ff0000"
color.convert(myColor, "oklch");

dimension.parse("16px");                             // → { value: 16, unit: "px" }
dimension.format({ value: 16, unit: "px" });        // → "16px"

duration.parse("100ms");
composite.border.parse(...);
```

### Classification (value + path → DTCG type)

```ts
import { classifyValue, easingKeywordToBezier, parseCubicBezier } from "@styleframe/dtcg";

classifyValue("#ff0000");
// → { type: "color", value: { colorSpace: "srgb", components: [1, 0, 0] } }

classifyValue(200, { path: "duration.fast" });
// → { type: "duration", value: 200 }   // path tiebreaker decides

classifyValue("ease-in", { path: "easing.ease-in" });
// → { type: "cubicBezier", value: [0.42, 0, 1, 1] }

classifyValue("Inter", { path: "font-family.body" });
// → { type: "fontFamily", value: "Inter" }

classifyValue("frosted");                      // → undefined (caller decides)
classifyValue("{color.primary}");              // → undefined (alias has no inherent type)
```

`classifyValue` is the single source of truth for "what DTCG type does this value have?" used by both the Styleframe CLI and the Figma plugin's export path. Value detection runs first; the optional `path` hint disambiguates ambiguous cases (e.g. a numeric `700` could be a fontWeight, a unitless number, or a duration in ms — only the path can decide).

## Round-trip lossiness contract

DTCG sits between richer source models (Styleframe AST) and simpler consumer models (Figma's flat variable system). Conversions in either direction lose information at well-defined points. Tools should make these losses explicit to users.

| Direction | Survives | Lost or transformed |
|---|---|---|
| **Styleframe → DTCG** (via `@styleframe/cli`) | Primitives, `ref()` calls (as DTCG aliases), pure-arithmetic computed expressions (resolved to concrete values), themes (as resolver modifier contexts) | Computed expressions involving CSS-only constructs (`clamp()`, `vw`, `calc()` with non-numeric refs) emit a `dev.styleframe.expression` extension instead of a typed token; booleans skipped (DTCG has no boolean) |
| **DTCG → Figma** (via `@styleframe/figma` plugin import) | color, dimension, duration (FLOAT), cubicBezier (STRING), fontFamily (STRING), fontWeight (FLOAT), strokeStyle (STRING), aliases | Composite types (border, shadow, gradient, typography) skipped — Figma has no native equivalent; wide-gamut colors converted to sRGB |
| **Figma → DTCG** (via plugin export) | Path-disambiguated types: `duration/*` → duration, `font-weight/*` → fontWeight, `easing/*` → cubicBezier, `font-family/*` → fontFamily, `border-style/*` → strokeStyle | Booleans skipped; STRING values whose name gives no hint are emitted with a `dev.styleframe.unknownType` extension and no `$type` |
| **Round-trip** Styleframe → Figma → Styleframe | color, dimension, duration, fontFamily, fontWeight, strokeStyle | Computed expressions are pre-evaluated and become primitives (one-way); composite types vanish on the Figma leg |

## Errors

All errors are typed:

- `ParseError` — invalid JSON or shape
- `ValidationError` — spec violation (carries `path`, `message`, `expected`/`received`)
- `CircularReferenceError` — alias cycle (carries `cycle: string[]`)
- `UnknownReferenceError` — alias points at non-existent token (carries `path`, `target`)

## What this package does NOT do

- It does not bridge to or from any framework AST. Styleframe-specific bridging lives in `@styleframe/figma` and (future) `@styleframe/cli`.
- It does not read files. The Resolver Module's `resolve` takes a `fileLoader` callback so the package stays runtime-agnostic.
- It does not perform CSS color gamut mapping unless explicitly requested via `color.convert`.

## Spec references

- Format Module 2025.10 — file structure, token types, aliases, inheritance, extensions
- Color Module 2025.10 — `colorSpace`, `components`, `alpha`, `hex`, `none` keyword
- Resolver Module 2025.10 — sets, modifiers, resolution algorithm
