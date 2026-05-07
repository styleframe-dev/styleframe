---
"@styleframe/cli": minor
---

**BREAKING**: rename `styleframe figma import` → `styleframe dtcg import`.

The CLI command now lives under the `dtcg` subcommand alongside `dtcg export`. The command takes a generic spec-conformant DTCG JSON file (whether produced by the `@styleframe/figma` plugin or any other DTCG-compatible tool) and generates Styleframe TypeScript code — there is nothing Figma-specific about it. The top-level `figma` subcommand has been removed; the namespace is reserved for future commands that genuinely interact with the Figma API.

All flags are unchanged (`--input`/`-i`, `--output`/`-o`, `--composables`, `--rem`, `--baseFontSize`, `--instanceName`).

Migration:

```diff
- styleframe figma import -i tokens.json
+ styleframe dtcg import -i tokens.json
```

Any CI scripts referring to the old command must be updated.
