import type { Recipe, StyleframeOptions } from "@styleframe/core";
import { capitalizeFirst } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";
import { isUppercase, toCamelCase } from "../../utils";

/**
 * Consumes a recipe instance and generates TypeScript code for it.
 * Outputs the _runtime field which contains resolved keys for efficient class name lookups.
 */
export function createRecipeConsumer(_consume: ConsumeFunction) {
	return function consumeRecipe(
		instance: Recipe,
		_options: StyleframeOptions,
	): string {
		let exportConstant = toCamelCase(instance.name);

		// Handle PascalCase names
		if (instance.name[0] && isUppercase(instance.name[0])) {
			exportConstant = capitalizeFirst(exportConstant);
		}

		const recipeConstant = `${exportConstant}Recipe`;
		const runtime = instance._runtime ?? {};

		return `const ${recipeConstant} = ${JSON.stringify(
			runtime,
			null,
			4,
		)} as const satisfies RecipeRuntime;

export const ${exportConstant} = createRecipe("${instance.name}", ${recipeConstant});
`;
	};
}
