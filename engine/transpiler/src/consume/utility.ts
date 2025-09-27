import {
	combineKeys,
	type StyleframeOptions,
	type Utility,
} from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { createContainerConsumer } from "./container";

/**
 * Consumes a utility instance, equivalent to setting a utility CSS selector
 */
export function createUtilityConsumer(consume: ConsumeFunction) {
	const consumeContainer = createContainerConsumer(consume);

	return function consumeUtility(
		instance: Utility,
		options: StyleframeOptions,
	): string {
		const result: string[] = [];

		const utilitySelectorPart =
			instance.value === "default"
				? instance.name
				: `${instance.name}:${instance.value}`;

		// Create base utility selector
		result.push(
			consumeContainer(`._${utilitySelectorPart}`, instance, options),
		);

		return result.join("\n\n");
	};
}
