import { isRef, isTokenValue } from "../typeGuards";
import type { Container, DeclarationsBlock, Root } from "../types";
import { createKeyframesFunction } from "./keyframes";
import { createMediaFunction } from "./media";
import { createSelectorFunction } from "./selector";
import { createVariableFunction } from "./variable";

export type DeclarationsCallbackContext = {
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	keyframes: ReturnType<typeof createKeyframesFunction>;
	media: ReturnType<typeof createMediaFunction>;
};

export type DeclarationsCallback = (
	context: DeclarationsCallbackContext,
) => void;

export function createDeclarationsCallbackContext(
	parent: Container,
	root: Root,
): DeclarationsCallbackContext {
	const variable = createVariableFunction(parent, root);
	const selector = createSelectorFunction(parent, root);
	const keyframes = createKeyframesFunction(parent, root);
	const media = createMediaFunction(parent, root);

	return {
		variable,
		selector,
		keyframes,
		media,
	};
}

export function parseDeclarationsBlock(
	declarations: DeclarationsBlock,
	context: DeclarationsCallbackContext,
) {
	for (const key in declarations) {
		// If the key represents a selector or media query, remove it and add it as a separate declaration
		if (key.startsWith("@media")) {
			const mediaQuery = declarations[key];
			if (
				typeof mediaQuery === "object" &&
				mediaQuery !== null &&
				!isTokenValue(mediaQuery)
			) {
				context.media(key, mediaQuery);
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
