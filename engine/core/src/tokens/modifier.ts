import type { Container, ModifierFactory, Root } from "../types";
import { deepClone, generateRandomId } from "../utils";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function applyModifiers<InstanceType extends Container>(
	baseInstance: InstanceType,
	root: Root,
	modifiers: Map<string, ModifierFactory>,
): InstanceType {
	const instance: InstanceType = {
		...baseInstance,
		id: generateRandomId("ut-"),
		parentId: baseInstance.parentId,
		declarations: { ...baseInstance.declarations },
		variables: [...baseInstance.variables],
		children: [...baseInstance.children],
		modifiers: [...modifiers.keys()],
	};

	root._registry.set(instance.id, instance);

	const callbackContext = createDeclarationsCallbackContext(instance, root);

	if (modifiers.size > 0) {
		const originalDeclarations = deepClone(baseInstance.declarations);
		let hasResult = false;

		for (const modifier of modifiers.values()) {
			const result = modifier.factory({
				...callbackContext,
				declarations: deepClone(originalDeclarations),
				variables: deepClone(instance.variables),
				children: deepClone(instance.children),
			});

			if (result) {
				if (!hasResult) {
					instance.declarations = {};
					hasResult = true;
				}

				// Merge the modifier's output into instance declarations,
				// then parse selector/at-rule keys into children
				Object.assign(instance.declarations, result);
				parseDeclarationsBlock(
					instance.declarations,
					callbackContext,
					instance,
					root,
				);
			}
		}
	}

	return instance;
}

export function createModifierFunction(_parent: Container, root: Root) {
	return function modifier<Key extends string>(
		key: Key | Key[],
		factory: ModifierFactory["factory"],
	): ModifierFactory {
		const modifierInstance: ModifierFactory = {
			type: "modifier",
			key: Array.isArray(key) ? key : [key],
			factory,
		};

		root.modifiers.push(modifierInstance);

		return modifierInstance;
	};
}
