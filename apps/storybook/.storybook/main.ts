import type { StorybookConfig } from "@storybook/vue3-vite";
import styleframe from "@styleframe/plugin/vite";

import { dirname } from "node:path";

import { fileURLToPath } from "node:url";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-vitest"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-onboarding"),
	],
	framework: getAbsolutePath("@storybook/vue3-vite"),
	async viteFinal(config) {
		const { mergeConfig } = await import("vite");
		return mergeConfig(config, {
			plugins: [styleframe()],
		});
	},
};
export default config;
