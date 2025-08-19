import {
	createCssFunction,
	createKeyframesFunction,
	createMediaFunction,
	createModifierFunction,
	createRecipeFunction,
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createThemeFunction,
	createUtilityFunction,
	createVariableFunction,
} from "./tokens";
import type { Root, StyleframeOptions } from "./types";

export interface Styleframe {
	root: Root;
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	utility: ReturnType<typeof createUtilityFunction>;
	modifier: ReturnType<typeof createModifierFunction>;
	recipe: ReturnType<typeof createRecipeFunction>;
	theme: ReturnType<typeof createThemeFunction>;
	keyframes: ReturnType<typeof createKeyframesFunction>;
	media: ReturnType<typeof createMediaFunction>;
	ref: ReturnType<typeof createRefFunction>;
	css: ReturnType<typeof createCssFunction>;
	options: StyleframeOptions;
}

export function styleframe(userOptions?: StyleframeOptions): Styleframe {
	const root = createRoot();

	const options = { ...userOptions };

	const variable = createVariableFunction(root, root);
	const selector = createSelectorFunction(root, root);
	const utility = createUtilityFunction(root, root);
	const modifier = createModifierFunction(root, root);
	const recipe = createRecipeFunction(root, root);
	const theme = createThemeFunction(root, root);
	const keyframes = createKeyframesFunction(root, root);
	const media = createMediaFunction(root, root);
	const ref = createRefFunction(root, root);
	const css = createCssFunction(root, root);

	return {
		root,
		variable,
		selector,
		utility,
		modifier,
		recipe,
		theme,
		keyframes,
		media,
		ref,
		css,
		options,
	};
}
