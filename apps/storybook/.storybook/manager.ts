import { addons } from "storybook/manager-api";
import { UPDATE_DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode";
import { installDocsEmbedManagerBridge } from "@uxfront/layer-docs/storybook";
import { light, dark } from "./theme";

const STORAGE_KEY = "sb-addon-themes-3";
const channel = addons.getChannel();

installDocsEmbedManagerBridge({
	// The docs site still speaks `styleframe:*` until it deploys the layer
	// embed. Drop this once both sides are on the neutral names.
	legacyNamespace: "styleframe",
	onTheme: (theme) => {
		// Update the addon's localStorage store so renderTheme() won't revert
		const storedItem = window.localStorage.getItem(STORAGE_KEY);
		if (storedItem) {
			try {
				const stored = JSON.parse(storedItem);
				stored.current = theme;
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
			} catch {
				// Corrupted localStorage entry — skip update
			}
		}

		// Update manager UI theme directly
		addons.setConfig({ theme: theme === "dark" ? dark : light });

		// Also emit to the addon (for DarkMode component state + preview sync)
		channel.emit(UPDATE_DARK_MODE_EVENT_NAME, theme);
	},
});
