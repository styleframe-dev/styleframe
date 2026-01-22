import type {
	ContainerChild,
	Root,
	Selector,
	StyleframeOptions,
} from "@styleframe/core";
import { isSelector } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";

/**
 * Recursively collects selectors with _exportName from children
 */
function collectExportedSelectors(children: ContainerChild[]): Selector[] {
	const selectors: Selector[] = [];

	for (const child of children) {
		if (isSelector(child) && child._exportName) {
			selectors.push(child);
		}

		// Recurse into nested containers (selectors can have children)
		if ("children" in child && Array.isArray(child.children)) {
			selectors.push(...collectExportedSelectors(child.children));
		}
	}

	return selectors;
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

		// Add imports only if we have recipes
		if (hasRecipes) {
			parts.push(`import { createRecipe } from '@styleframe/runtime';
import type { RecipeRuntime } from '@styleframe/runtime';
`);
		}

		// Generate recipe exports
		if (hasRecipes) {
			parts.push(consume(instance.recipes, options));
		}

		// Generate selector exports
		if (hasSelectors) {
			parts.push(consume(exportedSelectors, options));
		}

		return parts.join("\n");
	};
}
