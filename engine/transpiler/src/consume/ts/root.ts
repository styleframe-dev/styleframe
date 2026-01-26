import type {
	ContainerChild,
	Root,
	Selector,
	StyleframeOptions,
} from "@styleframe/core";
import { isSelector } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";

/**
 * Collects selectors with _exportName from children.
 * Exported selectors are always direct children of root since
 * _exportName is only set on module-level exports.
 */
function collectExportedSelectors(children: ContainerChild[]): Selector[] {
	return children.filter(
		(child): child is Selector => isSelector(child) && !!child._exportName,
	);
}

export function createRootConsumer(consume: ConsumeFunction) {
	return function consumeRoot(instance: Root, options: StyleframeOptions) {
		const exportedSelectors = collectExportedSelectors(instance.children);
		const hasRecipes = instance.recipes.length > 0;
		const hasSelectors = exportedSelectors.length > 0;

		if (!hasRecipes && !hasSelectors) {
			return "";
		}

		const parts: string[] = [];

		// Add imports and generate recipe exports
		if (hasRecipes) {
			parts.push(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';
`);
			parts.push(consume(instance.recipes, options));
		}

		// Generate selector exports
		if (hasSelectors) {
			parts.push(consume(exportedSelectors, options));
		}

		return parts.join("\n");
	};
}
