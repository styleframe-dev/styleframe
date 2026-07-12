---
"@styleframe/core": minor
---

Add a first-class `property()` factory for typed custom properties. It composes `variable()` (the value declaration) with an `@property` at-rule (the registration) and returns the same `Variable` — one custom property in the graph, distinct at authoring:

```ts
property("space", "0px", { syntax: "<length>", inherits: false });
// --space: 0px;
// @property --space { syntax: "<length>"; inherits: false; initial-value: 0px; }
```

`initialValue` defaults to the value; the `@property` block is registered once per name. Purely additive — the raw `atRule('property', …)` hatch is unchanged, and output is byte-identical when `property()` is unused. The `syntax`→TS-type narrowing is a separate follow-up.
