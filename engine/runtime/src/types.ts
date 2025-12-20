import type { RuntimeVariantDeclarationsBlock } from "@styleframe/core";
export type {
	PrimitiveTokenValue,
	TokenValue,
	RecipeRuntime,
	RuntimeModifierDeclarationsBlock,
	RuntimeVariantDeclarationsBlock,
	RuntimeVariantDeclarationsValue,
} from "@styleframe/core";

/**
 * Represents a mapping of variant option names to their runtime declarations.
 * Used for cleaner type assertions when iterating over variant options.
 */
export type RuntimeVariantOptions = Record<
	string,
	RuntimeVariantDeclarationsBlock | undefined
>;
