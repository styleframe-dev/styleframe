/** biome-ignore-all lint/suspicious/noConfusingVoidType: Returning declarations in callback is optional */
import { isTokenValue } from "../typeGuards";
import type { Container, DeclarationsBlock, Root } from "../types";
import { createAtRuleFunction, createMediaFunction } from "./atRule";
import { createCssFunction } from "./css";
import { createKeyframesFunction } from "./keyframes";
import { createSelectorFunction } from "./selector";
import { createVariableFunction } from "./variable";

export type DeclarationsCallbackContext = {
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	keyframes: ReturnType<typeof createKeyframesFunction>;
	atRule: ReturnType<typeof createAtRuleFunction>;
	media: ReturnType<typeof createMediaFunction>;
	css: ReturnType<typeof createCssFunction>;
};

export type DeclarationsCallback = (
	context: DeclarationsCallbackContext,
) => DeclarationsBlock | void;

export function createDeclarationsCallbackContext(
	parent: Container,
	root: Root,
): DeclarationsCallbackContext {
	const variable = createVariableFunction(parent, root);
	const selector = createSelectorFunction(parent, root);
	const keyframes = createKeyframesFunction(parent, root);
	const atRule = createAtRuleFunction(parent, root);
	const media = createMediaFunction(parent, root);
	const css = createCssFunction(root, root);

	return {
		variable,
		selector,
		keyframes,
		atRule,
		media,
		css,
	};
}

export function parseDeclarationsBlock(
	declarations: DeclarationsBlock,
	context: DeclarationsCallbackContext,
) {
	for (const key in declarations) {
		// If the key represents a selector or media query, remove it and add it as a separate declaration
		if (key.startsWith("@")) {
			const atRuleDeclarations = declarations[key];
			if (
				typeof atRuleDeclarations === "object" &&
				atRuleDeclarations !== null &&
				!isTokenValue(atRuleDeclarations)
			) {
				const identifier = key.replace(/^@(\w+).*/, "$1");
				const rule = key.replace(`@${identifier}`, "").trim();
				context.atRule(identifier, rule, atRuleDeclarations);
				delete declarations[key];
			}
		} else if (/^[.&:]/.test(key)) {
			// If the key starts with a special character, treat it as a nested selector
			const nested = declarations[key] as DeclarationsBlock;
			if (typeof nested === "object") {
				context.selector(key, nested);
				delete declarations[key];
			}
		}
	}

	return declarations;
}
