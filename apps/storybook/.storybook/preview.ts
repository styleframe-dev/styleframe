import type { Preview } from "@storybook/vue3-vite";
import React from "react";

import "virtual:styleframe.css";
import "./docs.css";
import { light, dark } from "./theme";
import { addons } from "storybook/preview-api";
import {
	DARK_MODE_EVENT_NAME,
	useDarkMode,
} from "@vueless/storybook-dark-mode";
import { DocsContainer } from "@storybook/addon-docs/blocks";

const channel = addons.getChannel();

channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
	if (isDark) {
		document.body.dataset.theme = "dark";
	} else {
		delete document.body.dataset.theme;
	}
});

const ThemedDocsContainer: typeof DocsContainer = (props) => {
	const isDark = useDarkMode();
	return React.createElement(DocsContainer, {
		...props,
		theme: isDark ? dark : light,
	});
};

const preview: Preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},

		actions: {},

		darkMode: {
			stylePreview: true,
			current: "light",
			dark,
			light,
		},

		docs: {
			source: {
				type: "code",
			},
			container: ThemedDocsContainer,
		},
	},
};

export default preview;
