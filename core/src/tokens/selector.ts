import type { DeclarationsBlock, Root, Selector } from "../types";
import { createVariableFunction } from "./variable";

export type SelectorCallbackContext = {
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
};

export type SelectorCallback = (context: SelectorCallbackContext) => void;

export function parseDeclarationsBlock(
	declarations: DeclarationsBlock,
	context: SelectorCallbackContext,
) {
	for (const key in declarations) {
		// If the key represents a selector or media query, remove it and add it as a separate declaration
		if (key.startsWith("@media")) {
			// const mediaQuery = declarations[key];
			// if (typeof mediaQuery === "object") {
			// 	store.push(media(key, mediaQuery));
			// 	delete declarations[key];
			// }
		} else if (/^[.&:]/.test(key)) {
			// If the key starts with a special character, treat it as a nested selector
			const nested = declarations[key] as DeclarationsBlock;
			if (typeof nested === "object") {
				context.selector(key, nested);
				delete declarations[key];
			}
		}
	}
}

export function createSelectorFunction(root: Root | Selector) {
	return function selector(
		query: string,
		declarations: DeclarationsBlock,
		callback?: SelectorCallback,
	): Selector {
		const instance: Selector = {
			type: "selector",
			query,
			declarations: [declarations],
		};

		const variable = createVariableFunction(instance);
		const selector = createSelectorFunction(instance);
		const callbackContext: SelectorCallbackContext = { variable, selector };

		parseDeclarationsBlock(declarations, callbackContext);

		if (callback) {
			callback(callbackContext);
		}

		root.declarations.push(instance);

		return instance;
	};
}
