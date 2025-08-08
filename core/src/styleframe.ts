import {
	createCssFunction,
	createMediaFunction,
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createVariableFunction,
} from "./tokens";
import type { Root } from "./types";

export interface Styleframe {
	root: Root;
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	// 	utility: UtilityFunction;
	// 	recipe: RecipeFunction;
	// 	theme: ThemeFunction;
	// 	keyframes: KeyframesFunction;
	media: ReturnType<typeof createMediaFunction>;
	ref: ReturnType<typeof createRefFunction>;
	css: ReturnType<typeof createCssFunction>;
}

export interface StyleframeConfig {
	// Configuration options
}

export function styleframe(config?: StyleframeConfig): Styleframe {
	const root = createRoot();

	const variable = createVariableFunction(root, root);
	const selector = createSelectorFunction(root, root);
	// const utility = createUtilityFunction(utilities);
	// const recipe = createRecipeFunction(recipes);
	// const theme = createThemeFunction(themes);
	// const keyframes = createKeyframesFunction(keyframes);
	const media = createMediaFunction(root, root);
	const ref = createRefFunction(root, root);
	const css = createCssFunction(root, root);

	return {
		root,
		variable,
		selector,
		// utility,
		// recipe,
		// theme,
		// keyframes,
		media,
		ref,
		css,
	};
}
