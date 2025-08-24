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
	): Selector {
		const instance: Selector = {
			type: "selector",
			query,
			declarations: {},
			variables: [],
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);
		if (typeof declarationsOrCallback === "function") {
			instance.declarations = declarationsOrCallback(callbackContext) ?? {};
		} else {
			instance.declarations = declarationsOrCallback;
		}

		parseDeclarationsBlock(instance.declarations, callbackContext);

		parent.children.push(instance);

		return instance;
	};
}
