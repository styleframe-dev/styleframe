---
"@styleframe/runtime": minor
"@styleframe/transpiler": minor
"styleframe": minor
---

Add boolean support for recipe variant props

- When a variant defines both `true` and `false` keys, the runtime now accepts boolean `true`/`false` values in addition to string `"true"`/`"false"`
- Generated `.d.ts` type declarations include `| boolean` in the type union for boolean variants
