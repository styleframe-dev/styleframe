# @styleframe/dtcg

## 1.1.0

### Minor Changes

- [#211](https://github.com/styleframe-dev/styleframe/pull/211) [`8826eda`](https://github.com/styleframe-dev/styleframe/commit/8826edad3fcb2e969024a586a20c2059229d958f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Add a new `@styleframe/dtcg` package: a spec-conformant parser, validator, and serializer for the W3C DTCG Format, Color, and Resolver Modules (2025.10).

  The package implements every primitive and composite token type, all 14 color spaces, transitive alias resolution with cycle detection, `$type`/`$deprecated` inheritance, and the full Resolver Module algorithm (sets, modifiers, resolution order, `$ref`-based loading via a consumer-supplied file loader).

  `@styleframe/figma` is rewritten on top of the new package. **Breaking changes:**
  - All token values are now spec-conformant objects: colors are `{colorSpace, components, alpha?, hex?}`, dimensions are `{value, unit}`, durations are `{value, unit}`. CSS strings (`"#006cff"`, `"16px"`) are no longer accepted as `$value`.
  - The legacy `$extensions["dev.styleframe"].modes` and inline `$modifiers` formats are no longer recognised. Multi-mode collections now serialise as a separate `.resolver.json` document; `toDTCG` returns `{ tokens, resolver? }`.
  - Composite token types (`border`, `shadow`, `gradient`, `typography`, etc.) are accepted on import but not represented as native Figma variables.
  - Figma `BOOLEAN` variables are skipped on export (DTCG has no boolean type).

- [#211](https://github.com/styleframe-dev/styleframe/pull/211) [`8826eda`](https://github.com/styleframe-dev/styleframe/commit/8826edad3fcb2e969024a586a20c2059229d958f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Fix DTCG export from `@styleframe/cli`: variables now get the correct `$type` and references are preserved as aliases.

  The previous CLI flow piped Styleframe AST through a lossy `FigmaExportFormat` intermediate, then through `figmaTypeToDtcg("STRING") → "fontFamily"` — so most variables ended up tagged as `fontFamily` in the resulting JSON. References were silently replaced with empty strings, and CSS template expressions like `${ref(a)} * ${ref(b)}` were joined into garbage like `" * "`.

  **`@styleframe/dtcg`** gains a new `classifyValue(value, {path?})` helper plus `parseCubicBezier` and `easingKeywordToBezier`. The classifier combines value-content detection with optional path heuristics so callers get a single canonical `{type, value}` pair without per-package guessing.

  **`@styleframe/cli`** now builds the DTCG document directly from the Styleframe `Root`. A small evaluator pre-resolves `Reference` chains and pure-arithmetic CSS templates so computed variables (e.g. `scale.min-powers.*`) emit concrete numbers instead of being skipped or corrupted. Unevaluable expressions (involving `clamp()`, `vw`, etc.) are preserved with a `dev.styleframe.expression` extension, surfaced in a diagnostics summary at the end of the run.

  **`@styleframe/figma`** uses the same classifier with the Figma variable name as a path hint. `figmaTypeToDtcg("STRING")` no longer claims everything is a `fontFamily`; instead callers should use the new `classifyFigmaVariable(variable, value)` which correctly identifies durations under `duration/*`, easings under `easing/*`, stroke styles, and font weights. STRING values whose name gives no usable hint are emitted with a `dev.styleframe.unknownType` extension rather than silently mistyped.

  Round-trip lossiness across Styleframe ↔ DTCG ↔ Figma is now documented in `tooling/dtcg/AGENTS.md`.

### Patch Changes

- [#211](https://github.com/styleframe-dev/styleframe/pull/211) [`8826eda`](https://github.com/styleframe-dev/styleframe/commit/8826edad3fcb2e969024a586a20c2059229d958f) Thanks [@alexgrozav](https://github.com/alexgrozav)! - Fix two regressions in DTCG export uncovered by dogfooding the storybook config:

  **Keyword-classification ambiguity.** The previous classifier matched `FONT_WEIGHT_KEYWORDS` and `STROKE_STYLE_KEYWORDS` on value content alone — but `"normal"` is a perfectly valid value for `letter-spacing`, `font-style`, and `line-height`, not just `font-weight`. Same for `"thin"`/`"medium"`/`"thick"` which are CSS border-width shorthand keywords. The result was that `border-width`, `font-style`, `letter-spacing`, and similar tokens were misclassified as `fontWeight` whenever their alias chain bottomed out at one of these CSS keywords.

  The fix: keyword-based detectors now only fire when the path also indicates the corresponding category (`font-weight` segment for fontWeight, `border-style`/`outline-style`/`stroke` for strokeStyle, `font-family` for fontFamily). Callers that don't supply a path still get the keyword-based behaviour for back-compat. Tokens with no resolvable type emit a `dev.styleframe.unknownType` extension instead of a wrong `$type`.

  **Parent/child path collisions wiped out children.** Styleframe configs commonly define both a parent variable (e.g. `border-width` aliased to `border-width.thin`) AND its child variants (`border-width.thin`, `border-width.medium`, `border-width.thick`). The previous `setNestedToken` logic unconditionally overwrote the slot, so depending on processing order either the parent or all the children were silently lost.

  The fix: `setNestedToken` now uses the spec's reserved `$root` slot for parent tokens that coexist with siblings — a pattern explicitly defined in the Format Module 2025.10 for "group with a base value plus variants". Children survive alongside the parent, and the walker / validator / Figma plugin import all recognise `$root` as the parent's effective leaf.

  The CLI also gains a one-line tip in its diagnostic output explaining that "untyped" tokens are usually CSS keywords with no DTCG equivalent.

  **Numeric-string misclassification as colour.** `classifyValue("100")` and similar 3-character numeric strings were incorrectly classified as `$type: "color"` because culori's `parse()` interprets them as shorthand CSS hex (`"100"` → `#100`). Z-index tokens like `z-index.dropdown = "100"` consequently appeared as sRGB color variables in the exported JSON.

  The fix: `classifyValue` now only forwards strings to culori that structurally look like CSS colors — those starting with `#`, containing `(` (function notation), or beginning with an ASCII letter (named color). Plain numeric strings are excluded before reaching the parser.

  **Plugin import crash on viewport-relative units.** Importing a `tokens.json` that contained any `{value: 100, unit: "vw"}` dimension token caused the entire Figma plugin import to throw `Cannot convert "100vw" to a Figma FLOAT`. The exception propagated through the entire import, leaving all variables (including colors) at their default `#FFFFFF`.

  The fix: `dtcgDimensionToFloat` now returns `undefined` for unsupported units (vw, vh, dvw, svw, etc.) instead of throwing, and `fromDTCG` silently skips variables whose value cannot be converted rather than crashing the whole batch. Colors and other tokens now import correctly even when the document contains fluid/viewport tokens.

  **Out-of-gamut sRGB clamping.** Converting oklch colours to Figma's sRGB RGBA could produce slightly negative channel values (e.g. `r = -4.21e-15`) due to floating-point rounding in the matrix multiplication. The fix clamps `r`, `g`, and `b` to `[0, 1]` in `dtcgColorToFigmaRgba`.
