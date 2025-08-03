import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { configDefaults as vitestConfig } from "vitest/config";

/**
 * @typedef {import('vite').UserConfig['build']['lib']} UserConfig
 */
export const createViteConfig = (cwd, options = {}) =>
	defineConfig({
		plugins: [dts({ rollupTypes: true })],
		build: {
			lib: {
				entry: resolve(cwd, "src/index.ts"),
				name: "styleframe",
				fileName: "styleframe",
				...options,
			},
		},
		test: {
			globals: true,
			include: ["src/**/*.spec.{ts,tsx}"],
			exclude: vitestConfig.exclude,
		},
	});
