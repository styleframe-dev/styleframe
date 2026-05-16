---
"styleframe": minor
"@styleframe/core": minor
"@styleframe/transpiler": minor
"@styleframe/runtime": minor
"@styleframe/scanner": patch
"@styleframe/plugin": minor
---

Add build-time utility class name shortening for production builds.

Generates shortening maps at transpile time with collision-safe abbreviation and built-in defaults for common CSS properties. Hashes long arbitrary values for stable compact names. Supports underscore-as-space in arbitrary values (`_padding:[10px_20px]`). Exposes `minify` plugin option with user-overridable defaults.
