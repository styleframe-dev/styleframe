import { addons } from "storybook/manager-api";
import { UPDATE_DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode";
import { light, dark } from "./theme";

const STORAGE_KEY = "sb-addon-themes-3";
const channel = addons.getChannel();

window.addEventListener("message", (event: MessageEvent) => {
	if (event.data?.type === "styleframe:theme") {
		const mode = event.data.theme === "dark" ? "dark" : "light";

		// Update the addon's localStorage store so renderTheme() won't revert
		const storedItem = window.localStorage.getItem(STORAGE_KEY);
		if (storedItem) {
			try {
				const stored = JSON.parse(storedItem);
				stored.current = mode;
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
			} catch {
				// Corrupted localStorage entry — skip update
			}
		}

		// Update manager UI theme directly
		addons.setConfig({ theme: mode === "dark" ? dark : light });

		// Also emit to the addon (for DarkMode component state + preview sync)
		channel.emit(UPDATE_DARK_MODE_EVENT_NAME, mode);

		// Trigger the theme change window message for the preview iframe
		const iframe = document.getElementById(
			"storybook-preview-iframe",
		) as HTMLIFrameElement | null;

		iframe?.contentWindow?.postMessage(
			{
				type: "styleframe:theme",
				theme: mode,
			},
			window.location.origin,
		);
	}
});
