import type { Container, DeclarationsBlock, Root, Selector } from "../types";
import type { DeclarationsCallback } from "./declarations";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createSelectorFunction(parent: Container, root: Root) {
	return function selector(
		query: string,
		declarations: DeclarationsBlock,
		callback?: DeclarationsCallback,
	): Selector {
		const instance: Selector = {
			type: "selector",
			query,
			declarations,
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		parseDeclarationsBlock(declarations, callbackContext);
		if (callback) {
			callback(callbackContext);
		}

		parent.children.push(instance);

		return instance;
	};
}
