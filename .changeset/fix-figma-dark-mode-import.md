---
"@styleframe/cli": patch
"@styleframe/figma": patch
---

Fix dark mode round-trip from Styleframe → DTCG → Figma.

Previously, `styleframe dtcg export` emitted a `tokens.resolver.json` that the Figma plugin had no way to consume — the plugin UI accepted only one file and its import handler always called the single-mode `fromDTCG()`. As a result, dark mode values never reached Figma. The exported resolver was also malformed: `default` referenced a non-existent context, and the resolver lacked a `set` linking to the base `tokens.json`, so any spec-conformant consumer would have failed too.

**`@styleframe/cli`** — `buildDTCG` now emits a self-contained resolver: `resolutionOrder` begins with a `set` referencing the base tokens file (controllable via `tokensSourceRef`), every theme contributes a capitalized context (`dark` → `Dark`), and a `Default` context (with no overrides) covers the unthemed mode. `default` correctly points at `Default`. Override tokens also carry `$type` so the `mergeDocuments` token-level replacement preserves typing — without this, dark color values lost their `color` type and downstream consumers (e.g. Figma) couldn't convert them, falling back to default white.

**`@styleframe/figma`** — the plugin UI exposes a second drop slot for `tokens.resolver.json`. When a resolver is provided, `code.ts` routes through `fromDTCGResolver` with an in-memory file loader so each declared context becomes a Figma mode populated with the correct per-mode values.
