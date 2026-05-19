---
"@styleframe/figma": minor
"@styleframe/cli": minor
---

**Fix:** Resolve critical token loss bug in Figma plugin export where 121 of 464 variables were dropped due to `setNestedToken` overwriting group subtrees instead of promoting parent tokens to `$root`.

**Feature:** Add mode selector dropdown to Figma plugin Export tab for filtering variables by specific theme/mode before export.

**Feature:** Add CLI commands for Figma-compatible DTCG sync: `figma export` and `figma import` enable bidirectional token synchronization between Figma collections and design token files.

**Improvement:** Embed collection metadata in DTCG output via `$extensions.dev.styleframe.collection` for better round-trip awareness.

**Improvement:** Restore BOOLEAN variable support by converting to string type with `dev.styleframe.boolean: true` extension metadata.

**Fix:** Correct UI variable count display to read from `msg.result.tokens` instead of wrapper object, ensuring accurate exported variable count and collection name extraction.
