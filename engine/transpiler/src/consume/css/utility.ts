import type { StyleframeOptions, Utility } from "@styleframe/core";
import { defaultUtilitySelectorFn } from "../../defaults";
import type { ConsumeFunction } from "../../types";
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

		const utilitySelectorFn =
			options.utilities?.selector ?? defaultUtilitySelectorFn;
		const utilitySelector = utilitySelectorFn({
			name: instance.name,
			value: instance.value,
			modifiers: instance.modifiers,
		});

		// Create base utility selector
		result.push(consumeContainer(utilitySelector, instance, options));

		return result.join("\n\n");
	};
}
