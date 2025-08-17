import type { Container, DeclarationsBlock, Root, Selector } from "../types";
import type { DeclarationsCallback } from "./declarations";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createSelectorFunction(parent: Container, root: Root) {
	return function selector(
		query: string,
		declarationsOrCallback: DeclarationsBlock | DeclarationsCallback,
		callback?: DeclarationsCallback,
	): Selector {
		const declarationsArgumentIsCallback =
			typeof declarationsOrCallback === "function";
		const declarations = declarationsArgumentIsCallback
			? {}
			: declarationsOrCallback;

		const instance: Selector = {
			type: "selector",
			query,
			declarations,
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		if (!declarationsArgumentIsCallback) {
			parseDeclarationsBlock(declarations, callbackContext);
		}

		if (callback) {
			callback(callbackContext);
		}

		parent.children.push(instance);

		return instance;
	};
}
