import type { Container, ModifierFactory, Root } from "../types";
import { deepClone } from "../utils";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function combineKeys(groups: string[][]): string[][] {
	const result: string[][] = [];

	// Generate all combinations using recursive approach
	function generateCombinations(groupIndex: number, current: string[]) {
		// Add current combination if not empty
		if (current.length > 0) {
			result.push([...current].sort());
		}

		// Try adding elements from remaining groups
		for (let i = groupIndex; i < groups.length; i++) {
			const group = groups[i];

			if (group) {
				if (group.length === 1 && !!group[0]) {
					// Single element (originally a string) - can always add
					generateCombinations(i + 1, [...current, group[0]]);
				} else {
					// Array group - add at most one element
					for (const element of group) {
						generateCombinations(i + 1, [...current, element]);
					}
				}
			}
		}
	}

	generateCombinations(0, []);

	// Sort result: first by length, then alphabetically
	return result.sort((a, b) => {
		if (a.length !== b.length) return a.length - b.length;
		return a.join(",").localeCompare(b.join(","));
	});
}

export function applyModifiers<InstanceType extends Container>(
	baseInstance: InstanceType,
	root: Root,
	modifiers: Map<string, ModifierFactory>,
): InstanceType {
	const instance: InstanceType = {
		...baseInstance,
		modifiers: [...modifiers.keys()],
	};

	const callbackContext = createDeclarationsCallbackContext(instance, root);

	for (const modifier of modifiers.values()) {
		modifier.factory({
			...callbackContext,
			declarations: deepClone(instance.declarations),
			variables: deepClone(instance.variables),
			children: deepClone(instance.children),
		});

		parseDeclarationsBlock(instance.declarations, callbackContext);
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
