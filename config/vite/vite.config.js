import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { configDefaults as vitestConfig } from "vitest/config";

/**
 * @typedef {import('vite').UserConfig['build']['lib']} UserConfig
 */
export const createViteConfig = (name, cwd, options = {}) =>
	defineConfig({
		plugins: [dts({ rollupTypes: true })],
		build: {
			lib: {
				entry: resolve(cwd, "src/index.ts"),
				name,
				fileName: name,
				...options,
			},
		},
		test: {
			globals: true,
			include: [resolve(cwd, "src/**/*.test.{ts,tsx}")],
			exclude: vitestConfig.exclude,
			reporters: ["verbose"],
		},
	});
