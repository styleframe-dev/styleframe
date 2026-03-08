import type { Root } from "../types";
import { generateRandomId } from "../utils";

export function createRoot(): Root {
	return {
		type: "root",
		id: generateRandomId("rt-"),
		declarations: {},
		utilities: [],
		modifiers: [],
		recipes: [],
		variables: [],
		children: [],
		themes: [],
	};
}
