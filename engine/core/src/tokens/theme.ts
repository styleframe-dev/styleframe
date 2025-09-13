import type { Container, Root, Theme } from "../types";
import type { DeclarationsCallback } from "./declarations";
import { createDeclarationsCallbackContext } from "./declarations";

export function createThemeFunction(_parent: Container, root: Root) {
	return function theme(name: string, callback: DeclarationsCallback): Theme {
		const existingTheme = root.themes.find((t) => t.name === name);
		const instance: Theme = existingTheme ?? {
			type: "theme",
			name,
			variables: [],
			children: [],
		};

		if (!existingTheme) {
			root.themes.push(instance);
		}

		const callbackContext = createDeclarationsCallbackContext(instance, root);
		if (callback) {
			callback(callbackContext);
		}

		return instance;
	};
}
