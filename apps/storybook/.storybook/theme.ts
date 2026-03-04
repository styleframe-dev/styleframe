import { create } from "storybook/theming/create";
import { themes } from "storybook/theming";

const commonConfig = {
	brandTitle: "Styleframe",
	brandUrl: "https://styleframe.dev",
};

export const light = create({
	...themes.normal,
	base: "light",
	// brandImage: "/images/storybook-logo-light.png",
	...commonConfig,
});

export const dark = create({
	...themes.dark,
	base: "dark",
	// brandImage: "/images/storybook-logo-dark.png",
	...commonConfig,
});
