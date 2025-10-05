import type { Styleframe } from "../styleframe";
import type { Root } from "../types";

export function mergeRoots(a: Root, b: Root): Root {
	return {
		...a,
		...b,
		declarations: {
			...a.declarations,
			...b.declarations,
		},
		utilities: a.utilities.concat(b.utilities),
		modifiers: a.modifiers.concat(b.modifiers),
		recipes: a.recipes.concat(b.recipes),
		variables: a.variables.concat(b.variables),
		children: a.children.concat(b.children),
		themes: a.themes.concat(b.themes),
	};
}

export function merge(base: Styleframe, ...instances: Styleframe[]) {
	return instances.reduce((prev, curr) => {
		return {
			...prev,
			root: mergeRoots(prev.root, curr.root),
		};
	}, base);
}
