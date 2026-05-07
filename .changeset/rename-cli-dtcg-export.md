---
"@styleframe/cli": major
---

**BREAKING**: rename `styleframe figma export` → `styleframe dtcg export`.

The CLI command now lives under a top-level `dtcg` subcommand to reflect that it produces a generic spec-conformant DTCG document, not a Figma-specific format. The DTCG → Figma value conversion (rem→px, ms passthrough, etc.) lives in the `@styleframe/figma` plugin, which consumes the JSON.

`styleframe figma import` is unchanged — it generates Styleframe TypeScript code from a Figma-flavoured DTCG export.

Migration:

```diff
- styleframe figma export -o tokens.json
+ styleframe dtcg export -o tokens.json
```

The `--baseFontSize` flag has been removed from the export — base font size is applied by the Figma plugin during import (default 16). Any CI scripts referring to the old command must be updated.
