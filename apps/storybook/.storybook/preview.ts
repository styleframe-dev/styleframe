import type { Preview } from "@storybook/vue3-vite";

import "virtual:styleframe.css";
import { Decorator } from "@storybook/vue3-vite";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { light, dark } from "./theme";
import { ref } from "vue";

// export const withInklineTheme = ({
// 	themes,
// 	defaultTheme,
// }: {
// 	themes: Record<string, string>;
// 	defaultTheme: string;
// }) => {
// 	const currentTheme = ref(defaultTheme);
// 	const { initializeThemeState, pluckThemeFromContext, useThemeParameters } =
// 		DecoratorHelpers;

// 	initializeThemeState(Object.keys(themes), defaultTheme);

// 	const decorator: Decorator = (story, context) => {
// 		const selectedTheme = pluckThemeFromContext(context);
// 		const { themeOverride } = useThemeParameters();

// 		currentTheme.value = themeOverride || selectedTheme || defaultTheme;

// 		return {
// 			components: { story },
// 			setup() {
// 				return {};
// 			},
// 			template: `
//                 <story />`,
// 		};
// 	};

// 	return decorator;
// };

const preview: Preview = {
	// decorators: [
	// 	withInklineTheme({
	// 		themes: {
	// 			light: "light-theme",
	// 			dark: "dark-theme",
	// 		},
	// 		defaultTheme: "light",
	// 	}),
	// ],
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
			darkClass: "dark-theme",
			lightClass: "default-theme",
			dark,
			light,
		},

		docs: {
			source: {
				type: "code",
			},
		},
	},
};

export default preview;
