import type { Container, DeclarationsCallback, Root, Theme } from "../types";
import { generateRandomId } from "../utils";
import { createDeclarationsCallbackContext } from "./declarations";

export function createThemeFunction(parent: Container, root: Root) {
	return function theme(name: string, callback: DeclarationsCallback): Theme {
		const existingTheme = root.themes.find((t) => t.name === name);
		const instance: Theme = existingTheme ?? {
			type: "theme",
			id: generateRandomId("th-"),
			parentId: root.id,
			name,
			declarations: {},
			variables: [],
			children: [],
		};

		if (!existingTheme) {
			root._registry.set(instance.id, instance);
			root.themes.push(instance);
		}

		const callbackContext = createDeclarationsCallbackContext(instance, root);
		if (callback) {
			callback(callbackContext);
		}

		return instance;
	};
}
