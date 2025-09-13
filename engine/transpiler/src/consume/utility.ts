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

		for (const [key, utilityValue] of Object.entries(instance.values)) {
			const { value, modifiers } = utilityValue;
			const utilitySelectorPart =
				value === true || !value ? instance.name : `${instance.name}:${key}`;

			const baseDeclarations = instance.declarations(value);

			// Create base utility selector
			result.push(
				consumeContainer(
					`._${utilitySelectorPart}`,
					{
						declarations: baseDeclarations,
					},
					options,
				),
			);

			// Create modified variants for this specific value
			if (modifiers.length > 0) {
				const modifierKeys = modifiers.map((modifier) => modifier.key);
				const modifierCombinations = combineKeys(modifierKeys);

				modifierCombinations.forEach((combination) => {
					const modifierSelectorPart = combination.join(":");
					const modifiedDeclarations = combination.reduce(
						(acc, modifierKey) => {
							const modifier = modifiers.find((modifier) =>
								modifier.key.includes(modifierKey),
							);
							return modifier
								? modifier.transform({
										key: modifierKey,
										declarations: acc,
									})
								: acc;
						},
						instance.declarations(value),
					);

					result.push(
						consumeContainer(
							`._${modifierSelectorPart}:${utilitySelectorPart}`,
							{
								declarations: modifiedDeclarations,
							},
							options,
						),
					);
				});
			}
		}

		return result.join("\n\n");
	};
}
