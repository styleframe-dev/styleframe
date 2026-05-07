# Tooling Packages Rules

**Scope:** `tooling/**/*`

## Build Plugin (`tooling/plugin/`)

- Entry: `tooling/plugin/src/index.ts`
- Virtual module resolution: `tooling/plugin/src/virtual-modules.ts`
- Plugin factory: `tooling/plugin/src/plugin.ts`
- Bundler adapters: `tooling/plugin/src/vite.ts`, `tooling/plugin/src/webpack.ts`, etc.
- Use unplugin for cross-bundler compatibility
- Virtual modules: `virtual:styleframe` and `virtual:styleframe.css`
- HMR must preserve component state when possible
- Tests: `testing/integration/` (integration tests with real bundlers)
- See `tooling/plugin/AGENTS.md` for plugin API

## CLI (`tooling/cli/`)

- Use commander for CLI interface
- Commands: `init`, `build`, `dtcg export`, `dtcg import`
- Always provide helpful error messages with recovery suggestions
- See `tooling/cli/AGENTS.md` for CLI architecture

## Figma Plugin (`tooling/figma/`)

- DTCG format for variable sync (Design Token Community Group)
- Bidirectional sync: Figma ↔ Styleframe
- Preserve token relationships during sync
- See `tooling/figma/AGENTS.md` for sync flow

## Testing

- Integration tests for build output verification
- Test across multiple bundlers (Vite, Webpack, Nuxt, Astro)
- Verify virtual module resolution works correctly
