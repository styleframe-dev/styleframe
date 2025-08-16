import type { Root } from "../types";

export function createRoot(): Root {
	return {
		type: "root",
		utilities: [],
		modifiers: [],
		recipes: [],
		children: [],
		themes: [],
	};
}
