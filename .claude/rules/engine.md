# Engine Packages Rules

**Scope:** `engine/**/*`

## Core Principles

- All exports must be typed with explicit TypeScript types
- Never use `any` - use `unknown` with type guards instead
- Factory functions must return typed tokens (Variable, Selector, AtRule, etc.)
- All AST nodes extend `BaseToken` interface

## Testing

- Every exported function needs a unit test in the same package
- Use Vitest for unit tests: `test/` directory
- Test fixtures should be minimal and focused

## Code Style

- Use functional programming patterns - avoid classes except for core AST types
- Prefer immutable data structures
- Use type predicates for type guards: `function isVariable(token: Token): token is Variable`

## Package-Specific Guides

- **core** (`engine/core/src/`): Token AST definitions in `engine/core/src/types.ts`, factory methods in `engine/core/src/factory.ts`. Entry: `engine/core/src/index.ts`. Tests: `engine/core/test/`. See `engine/core/AGENTS.md`
- **loader** (`engine/loader/src/`): Config loading in `engine/loader/src/config.ts`, HMR in `engine/loader/src/hmr.ts`. Entry: `engine/loader/src/index.ts`. See `engine/loader/AGENTS.md`
- **transpiler** (`engine/transpiler/src/`): CSS generation in `engine/transpiler/src/css.ts`, TypeScript in `engine/transpiler/src/typescript.ts`, DTS in `engine/transpiler/src/dts.ts`. Entry: `engine/transpiler/src/index.ts`. Tests: `engine/transpiler/test/`. See `engine/transpiler/AGENTS.md`
- **runtime** (`engine/runtime/src/`): Browser recipe runtime (~1.4KB) in `engine/runtime/src/index.ts`. See `engine/runtime/AGENTS.md`
- **scanner** (`engine/scanner/src/`): Content scanning in `engine/scanner/src/scanner.ts`. Entry: `engine/scanner/src/index.ts`. See `engine/scanner/AGENTS.md`
