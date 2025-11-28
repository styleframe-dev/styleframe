import type { StyleframeOptions } from "@styleframe/core";
import { isRecipe, isRoot } from "@styleframe/core";
import { createRecipeConsumer } from "./recipe";
import { createRootConsumer } from "./root";

/**
 * Consumes any token instance and returns the TS string representation
 */
export function consume(instance: unknown, options: StyleframeOptions): string {
	const consumeRoot = createRootConsumer(consume);
	const consumeRecipe = createRecipeConsumer(consume);

	switch (true) {
		case Array.isArray(instance):
			return instance.map((item) => consume(item, options)).join("\n");
		case isRoot(instance):
			return consumeRoot(instance, options);
		case isRecipe(instance):
			return consumeRecipe(instance, options);
		default:
			return "";
	}
}
