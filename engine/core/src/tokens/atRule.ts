import type { AtRule, Container, DeclarationsBlock, Root } from "../types";
import type { DeclarationsCallback } from "./declarations";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";

export function createAtRuleFunction(parent: Container, root: Root) {
	return function atRule(
		identifier: string,
		rule: string,
		declarationsOrCallback?: DeclarationsBlock | DeclarationsCallback,
	): AtRule {
		const instance: AtRule = {
			type: "at-rule",
			identifier,
			rule,
			declarations: {},
			variables: [],
			children: [],
		};

		const callbackContext = createDeclarationsCallbackContext(instance, root);

		// Handle overloaded parameters
		if (typeof declarationsOrCallback === "function") {
			// atRule(query, callback)
			instance.declarations = declarationsOrCallback(callbackContext) ?? {};
		} else if (declarationsOrCallback) {
			// atRule(query, declarations)
			instance.declarations = declarationsOrCallback;
		}

		parseDeclarationsBlock(instance.declarations, callbackContext);

		parent.children.push(instance);

		return instance;
	};
}

export function createMediaFunction(parent: Container, root: Root) {
	const atRule = createAtRuleFunction(parent, root);

	return function media(
		query: string,
		declarationsOrCallback?: DeclarationsBlock | DeclarationsCallback,
	): AtRule {
		return atRule("media", query, declarationsOrCallback);
	};
}

export function createKeyframesFunction(parent: Container, root: Root) {
	const atRule = createAtRuleFunction(parent, root);

	return function keyframes(
		name: string,
		declarations: Record<string, DeclarationsBlock>,
	): AtRule {
		return atRule("keyframes", name, declarations);
	};
}
