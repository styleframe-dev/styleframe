import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { configDefaults as vitestConfig } from "vitest/config";

/**
 * @typedef {import('vite').UserConfig} UserConfig
 */
export const createViteConfig = (name, cwd, options = {}) =>
	defineConfig({
		...options,
		plugins: [dts({ rollupTypes: true }), ...(options.plugins ?? [])],
		build: {
			...options.build,
			lib: {
				entry: resolve(cwd, "src/index.ts"),
				name,
				fileName: name,
				...options.build?.lib,
			},
		},
		test: {
			globals: true,
			include: [resolve(cwd, "src/**/*.test.{ts,tsx}")],
			exclude: vitestConfig.exclude,
			reporters: ["verbose"],
			coverage: {
				provider: "v8",
			},
		},
	});
