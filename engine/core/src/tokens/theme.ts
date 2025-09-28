import type { Container, DeclarationsCallback, Root, Theme } from "../types";
import { createDeclarationsCallbackContext } from "./declarations";

export function createThemeFunction(_parent: Container, root: Root) {
	return function theme(name: string, callback: DeclarationsCallback): Theme {
		const existingTheme = root.themes.find((t) => t.name === name);
		const instance: Theme = existingTheme ?? {
			type: "theme",
			name,
			declarations: {},
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
