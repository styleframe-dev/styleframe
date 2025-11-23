import type { Recipe, StyleframeOptions } from "@styleframe/core";
import { capitalizeFirst } from "@styleframe/core";
import type { ConsumeFunction } from "../../types";
import { isUppercase, toCamelCase } from "../../utils";

/**
 * Consumes a recipe instance and generates TypeScript code for it.
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

		return `const ${recipeConstant}: Recipe = ${JSON.stringify(
			instance,
			null,
			4,
		)};

export const ${exportConstant} = createRecipe(${recipeConstant});
`;
	};
}
