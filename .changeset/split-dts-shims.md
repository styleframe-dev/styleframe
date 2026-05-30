---
"styleframe": patch
"@styleframe/transpiler": patch
"@styleframe/plugin": patch
---

Split generated DTS output into standalone `styleframe.d.ts` (top-level exports) and `shims.d.ts` (`declare module` wrappers for virtual modules). The transpiler now produces clean, reusable type declarations without module wrapping, which is handled by the plugin layer.
