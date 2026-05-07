---
"@styleframe/dtcg": minor
"@styleframe/figma": major
---

Add a new `@styleframe/dtcg` package: a spec-conformant parser, validator, and serializer for the W3C DTCG Format, Color, and Resolver Modules (2025.10).

The package implements every primitive and composite token type, all 14 color spaces, transitive alias resolution with cycle detection, `$type`/`$deprecated` inheritance, and the full Resolver Module algorithm (sets, modifiers, resolution order, `$ref`-based loading via a consumer-supplied file loader).

`@styleframe/figma` is rewritten on top of the new package. **Breaking changes:**

- All token values are now spec-conformant objects: colors are `{colorSpace, components, alpha?, hex?}`, dimensions are `{value, unit}`, durations are `{value, unit}`. CSS strings (`"#006cff"`, `"16px"`) are no longer accepted as `$value`.
- The legacy `$extensions["dev.styleframe"].modes` and inline `$modifiers` formats are no longer recognised. Multi-mode collections now serialise as a separate `.resolver.json` document; `toDTCG` returns `{ tokens, resolver? }`.
- Composite token types (`border`, `shadow`, `gradient`, `typography`, etc.) are accepted on import but not represented as native Figma variables.
- Figma `BOOLEAN` variables are skipped on export (DTCG has no boolean type).
