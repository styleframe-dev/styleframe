---
"@styleframe/core": patch
"styleframe": patch
---

Validate variable references inside compound `@`-shorthand values. `resolvePropertyValue` already threw `Variable "X" is not defined` for a single exact ref (`padding: "@0.5"`), but the embedded/compound path (`padding: "@0.25 @0.5"`, `border: "1px solid @undefined"`) only recorded usage and skipped `validateReference`, so a compound ref to an undefined variable silently emitted a dead `var(--…)`. The embedded branch now calls `validateReference` for each ref part, matching the single-ref path. Compound refs whose variables are all defined are unchanged (byte-for-byte identical output); only compound refs to undefined variables change — from a silent dead `var(--…)` to a thrown error.
