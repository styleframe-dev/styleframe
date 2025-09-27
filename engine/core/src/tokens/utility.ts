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
import { combineKeys } from "./modifier";

export function createModifiedUtilityFunction(_parent: Container, root: Root) {
	return function modifiedUtility<Name extends string>(
		baseInstance: Utility<Name>,
		modifiers: Modifier[],
		combination: string[],
	): Utility<Name> {
		const instance: Utility<Name> = {
			...baseInstance,
			modifiers: combination,
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		for (const modifier of modifiers) {
			modifier.factory({
				...callbackContext,
				declarations: instance.declarations,
				variables: instance.variables,
				children: instance.children,
			});

			parseDeclarationsBlock(instance.declarations, callbackContext);
		}

		return instance;
	};
}

export function createModifiedUtilityInstances(
	baseInstance: Utility,
	availableModifiers: Modifier[],
	root: Root,
): Utility[] {
	const modifiedUtility = createModifiedUtilityFunction(baseInstance, root);

	const modifierKeys = availableModifiers.map((modifier) => modifier.key);
	const modifierKeyCombinations = combineKeys(modifierKeys);

	return modifierKeyCombinations.map((combination) => {
		const modifiers = combination
			.map((modifierKey) =>
				availableModifiers.find((modifier) =>
					modifier.key.includes(modifierKey),
				),
			)
			.filter((m) => !!m);

		return modifiedUtility(baseInstance, modifiers, combination);
	});
}

export function createUtilityFunction(_parent: Container, root: Root) {
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
				root.utilities.push(instance);

				// Create modified variants for this specific value
				if (modifiers.length > 0) {
					root.utilities.push(
						...createModifiedUtilityInstances(instance, modifiers, root),
					);
				}
			}
		};
	};
}
