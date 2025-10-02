import type {
	Container,
	Modifier,
	Root,
	TokenValue,
	Utility,
	UtilityCallbackFn,
	UtilityCreatorFn,
} from "../types";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";
import { applyModifiers, combineKeys } from "./modifier";

export function createModifiedUtilityInstances(
	baseInstance: Utility,
	availableModifiers: Modifier[],
	root: Root,
): Utility[] {
	const modifierKeys = availableModifiers.map((modifier) => modifier.key);
	const modifierKeyCombinations = combineKeys(modifierKeys);

	return modifierKeyCombinations.map((combination) => {
		const modifiers = new Map<string, Modifier>();

		for (const modifierKey of combination) {
			const modifier = availableModifiers.find((modifier) =>
				modifier.key.includes(modifierKey),
			);
			if (modifier) modifiers.set(modifierKey, modifier);
		}

		return applyModifiers(baseInstance, root, modifiers);
	});
}

export function createUtilityFunction(parent: Container, root: Root) {
	return function utility<Name extends string>(
		name: Name,
		factory: UtilityCallbackFn,
	): UtilityCreatorFn {
		return (
			entries: Record<string, TokenValue>,
			modifiers: Modifier[] = [],
		) => {
			for (const [key, value] of Object.entries(entries)) {
				const instance: Utility<Name> = {
					type: "utility",
					name,
					value: key,
					declarations: {},
					variables: [],
					children: [],
					modifiers: [],
				};

				const callbackContext = createDeclarationsCallbackContext(
					instance,
					root,
				);

				instance.declarations =
					factory({
						...callbackContext,
						value,
					}) ?? {};

				parseDeclarationsBlock(instance.declarations, callbackContext);

				// Store the utility value on the instance
				parent.children.push(instance);

				// Create modified variants for this specific value
				if (modifiers.length > 0) {
					parent.children.push(
						...createModifiedUtilityInstances(instance, modifiers, root),
					);
				}
			}
		};
	};
}
