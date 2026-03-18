import { isContainer } from "../typeGuards";
import type {
	Container,
	DeclarationsBlock,
	DeclarationsCallback,
	Root,
	Selector,
} from "../types";
import { generateRandomId } from "../utils";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createSelectorFunction(parent: Container, root: Root) {
	return function selector(
		query: string,
		declarationsOrCallback:
			| DeclarationsBlock
			| Container
			| DeclarationsCallback,
	): Selector {
		const instance: Selector = {
			type: "selector",
			id: generateRandomId("sel-"),
			parentId: parent.id,
			query,
			declarations: {},
			variables: [],
			children: [],
		};

		root._registry.set(instance.id, instance);

		const callbackContext = createDeclarationsCallbackContext(instance, root);
		if (typeof declarationsOrCallback === "function") {
			instance.declarations = declarationsOrCallback(callbackContext) ?? {};
		} else if (isContainer(declarationsOrCallback)) {
			instance.variables = declarationsOrCallback.variables;
			instance.declarations = declarationsOrCallback.declarations;
			instance.children = declarationsOrCallback.children;
		} else {
			instance.declarations = declarationsOrCallback;
		}

		parseDeclarationsBlock(
			instance.declarations,
			callbackContext,
			instance,
			root,
		);

		parent.children.push(instance);

		return instance;
	};
}
