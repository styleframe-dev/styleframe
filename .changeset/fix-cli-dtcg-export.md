---
"@styleframe/dtcg": minor
"@styleframe/cli": patch
"@styleframe/figma": patch
---

Fix DTCG export from `@styleframe/cli`: variables now get the correct `$type` and references are preserved as aliases.

The previous CLI flow piped Styleframe AST through a lossy `FigmaExportFormat` intermediate, then through `figmaTypeToDtcg("STRING") → "fontFamily"` — so most variables ended up tagged as `fontFamily` in the resulting JSON. References were silently replaced with empty strings, and CSS template expressions like `${ref(a)} * ${ref(b)}` were joined into garbage like `" * "`.

**`@styleframe/dtcg`** gains a new `classifyValue(value, {path?})` helper plus `parseCubicBezier` and `easingKeywordToBezier`. The classifier combines value-content detection with optional path heuristics so callers get a single canonical `{type, value}` pair without per-package guessing.

**`@styleframe/cli`** now builds the DTCG document directly from the Styleframe `Root`. A small evaluator pre-resolves `Reference` chains and pure-arithmetic CSS templates so computed variables (e.g. `scale.min-powers.*`) emit concrete numbers instead of being skipped or corrupted. Unevaluable expressions (involving `clamp()`, `vw`, etc.) are preserved with a `dev.styleframe.expression` extension, surfaced in a diagnostics summary at the end of the run.

**`@styleframe/figma`** uses the same classifier with the Figma variable name as a path hint. `figmaTypeToDtcg("STRING")` no longer claims everything is a `fontFamily`; instead callers should use the new `classifyFigmaVariable(variable, value)` which correctly identifies durations under `duration/*`, easings under `easing/*`, stroke styles, and font weights. STRING values whose name gives no usable hint are emitted with a `dev.styleframe.unknownType` extension rather than silently mistyped.

Round-trip lossiness across Styleframe ↔ DTCG ↔ Figma is now documented in `tooling/dtcg/AGENTS.md`.
