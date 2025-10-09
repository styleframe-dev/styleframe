import type { Root } from "../types";

export function createRoot(): Root {
	return {
		type: "root",
		declarations: {},
		utilities: [],
		modifiers: [],
		recipes: [],
		variables: [],
		children: [],
		themes: [],
	};
}
