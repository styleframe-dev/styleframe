import type { Root } from "../types";
import { generateRandomId } from "../utils";

export function createRoot(): Root {
	const root: Root = {
		type: "root",
		id: generateRandomId("rt-"),
		declarations: {},
		utilities: [],
		modifiers: [],
		recipes: [],
		variables: [],
		children: [],
		themes: [],
		_registry: new Map(),
	};

	root._registry.set(root.id, root);

	return root;
}
