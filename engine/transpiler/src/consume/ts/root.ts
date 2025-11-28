import type { Root, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";

export function createRootConsumer(consume: ConsumeFunction) {
	return function consumeRoot(instance: Root, options: StyleframeOptions) {
		return instance.recipes.length > 0
			? `import { createRecipe } from '@styleframe/runtime';
import type { Recipe } from '@styleframe/runtime';

${consume(instance.recipes, options)}`
			: "";
	};
}
