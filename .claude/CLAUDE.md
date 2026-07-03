@AGENTS.md

# Claude-specific guidance

## Deep-reference guides

Read these before writing Styleframe code — they are verified against source:

- `.claude/styleframe-api.md` — full authoring API reference
- `.claude/styleframe-patterns.md` — config/extension/consumption patterns
- `.claude/styleframe-recipes.md` — the recipe system end-to-end
- `.claude/styleframe-tokens.md` — design-token composable catalog

## Skills

Creating a new theme recipe? Use the `/create-recipe` skill chain (research → design →
implement → showcase → document → verify). Each step is also invocable standalone to
resume or redo one phase.

## Code navigation

LSP tools are enabled. Prefer `goToDefinition` / `findReferences` / `workspaceSymbol` over
Grep for navigating code, and check LSP diagnostics after editing. Before renaming or
changing a function signature, run `findReferences` on it first. Use Grep for text/pattern
searches only.
