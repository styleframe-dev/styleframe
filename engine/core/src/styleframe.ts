import type {
	createAtRuleFunction,
	createCssFunction,
	createKeyframesFunction,
	createMediaFunction,
	createRefFunction,
	createSelectorFunction,
	createVariableFunction,
} from "./tokens";
import {
	createDeclarationsCallbackContext,
	createModifierFunction,
	createRecipeFunction,
	createRoot,
	createThemeFunction,
	createUtilityFunction,
} from "./tokens";
import type { Root, StyleframeOptions } from "./types";
import { generateRandomId } from "./utils";

export interface Styleframe {
	id: string;
	root: Root;
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	utility: ReturnType<typeof createUtilityFunction>;
	modifier: ReturnType<typeof createModifierFunction>;
	recipe: ReturnType<typeof createRecipeFunction>;
	theme: ReturnType<typeof createThemeFunction>;
	atRule: ReturnType<typeof createAtRuleFunction>;
	keyframes: ReturnType<typeof createKeyframesFunction>;
	media: ReturnType<typeof createMediaFunction>;
	ref: ReturnType<typeof createRefFunction>;
	css: ReturnType<typeof createCssFunction>;
	options: StyleframeOptions;
}

export function styleframe(userOptions?: StyleframeOptions): Styleframe {
	const id = generateRandomId("sf-");
	const root = createRoot();

	const options = { ...userOptions };

	const utility = createUtilityFunction(root, root);
	const modifier = createModifierFunction(root, root);
	const recipe = createRecipeFunction(root, root);
	const theme = createThemeFunction(root, root);

	const { variable, selector, atRule, keyframes, media, ref, css } =
		createDeclarationsCallbackContext(root, root);

	return {
		id,
		root,
		variable,
		selector,
		utility,
		modifier,
		recipe,
		theme,
		atRule,
		keyframes,
		media,
		ref,
		css,
		options,
	};
}
