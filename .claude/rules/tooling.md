# Tooling Rules

**Scope:** `tooling/**/*`

- The plugin (`tooling/plugin`) is built on unplugin; every bundler adapter (9 of them,
  including Bun) is a thin entry over the shared factory. New plugin behavior must work
  across all adapters, and the virtual-module contract (`virtual:styleframe`,
  `virtual:styleframe.css`) is public API — changing it breaks every consumer.
- Plugin changes touching resolution, HMR, or output need the Playwright e2e suite in
  `testing/integration/` (`pnpm test:integration` — builds and drives a real Vite consumer
  app) on top of the unit tests in `tooling/plugin/test/`.
- CLI (`tooling/cli`) errors must tell the user how to recover, not just what failed.
- Figma sync (`tooling/figma`) and `tooling/dtcg` speak DTCG (Design Token Community
  Group) JSON; keep import/export round-trip safe — a token exported then imported must
  survive unchanged.
- Tests: `tooling/plugin` and `tooling/dtcg` use a `test/` directory; `tooling/cli` and
  `tooling/figma` colocate `<file>.test.ts` next to source.

Layout and how-tos: see the `AGENTS.md` in each tooling package.
