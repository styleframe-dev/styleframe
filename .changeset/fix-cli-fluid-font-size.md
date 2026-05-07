---
"@styleframe/cli": patch
---

Fix `dtcg export`: fluid font-size tokens (and any other tokens whose value reduces to a `calc()` mixing `100vw`, `rem`, and `px` literals) are now normalised to a concrete pixel value using the project's `fluid.max-width` (default 1440) instead of being emitted as opaque `calc(...)` expressions with a `dev.styleframe.unknownType` extension.

Previously every `font-size.*` token in a config that used `useFluidFontSizeDesignTokens` shipped to Figma as a useless `STRING` variable holding the raw `calc(...)` formula. They now ship as spec-conformant `dimension` tokens (`{value, unit: "px"}`) that the Figma plugin renders as real numeric variables (`font-size/md = 18`, `font-size/lg = 22.5`, etc.).

The substitution runs only as a fallback after the standard arithmetic check fails, so well-formed numeric expressions are unaffected. Affected tokens carry a `dev.styleframe.fluidBound: "max"` extension so the derivation is auditable. The export run reports `Normalised <n> fluid token(s) using max viewport (<n>px).`
