import { createSelectorFunction, createVariableFunction } from "./tokens";
import type { Root } from "./types";

export interface Styleframe {
	root: Root;
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	// 	utility: UtilityFunction;
	// 	recipe: RecipeFunction;
	// 	theme: ThemeFunction;
	// 	keyframes: KeyframesFunction;
	// 	media: MediaFunction;
	// 	ref: RefFunction;
	// 	css: CssFunction;
}

export interface StyleframeConfig {
	// Configuration options
}

export function styleframe(config?: StyleframeConfig): Styleframe {
	const root: Root = {
		type: "root",
		declarations: [],
	};

	const variable = createVariableFunction(root);
	const selector = createSelectorFunction(root);
	// const utility = createUtilityFunction(utilities);
	// const recipe = createRecipeFunction(recipes);
	// const theme = createThemeFunction(themes);
	// const keyframes = createKeyframesFunction(keyframes);
	// const media = createMediaFunction(mediaQueries);
	// const ref = createRefFunction();
	// const css = createCssFunction();

	return {
		root,
		variable,
		selector,
		// utility,
		// recipe,
		// theme,
		// keyframes,
		// media,
		// ref,
		// css,
	};
}
