---
"@styleframe/figma": patch
---

Fix dimension and duration tokens importing as `0` in Figma.

The Figma plugin's DTCG → Figma converter previously dropped dimension/duration tokens whose unit it couldn't represent as a Figma FLOAT (e.g. `vw`, `vh`), and silently failed to update existing variables whose `resolvedType` no longer matched the incoming token type. Both paths left the affected Figma variable at its default `0`.

The plugin now:

- Preserves the original CSS literal as a STRING fallback (e.g. `"100vw"`) instead of dropping the token, so the source value always survives.
- Detects existing variables whose `resolvedType` differs from the incoming token's type and recreates them so values can be stored. (Figma variables can't change type once created — a previously-imported STRING `spacing/md` would otherwise reject any new FLOAT value.)
- Emits a console warning when `convertToFigmaValue` cannot store a value, instead of silently leaving the variable at `0`.

`dtcgValueToFigma` now returns a discriminated union (`{ kind: "value" | "alias" | "fallback" }`) so callers can distinguish a true failure from a legitimate `0`.
