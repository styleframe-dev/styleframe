---
"@styleframe/plugin": minor
"styleframe": minor
---

Implement importree-based HMR with selective cache invalidation

- Replace full-reload HMR with importree-powered dependency graph for selective Jiti cache invalidation
- Use persistent shared Jiti instance with `moduleCache: true` so unchanged dependencies stay cached across reloads
- Add `dependency-graph` module that builds merged forward/reverse import trees for cross-entry dependency tracking
- Export `createSharedJiti`, `clearJitiCache`, and `clearAllJitiCache` from `@styleframe/loader`
- Remove `resolve.alias` option in favor of automatic dependency detection via importree
