import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/**
 * @typedef {import('vite').UserConfig['build']['lib']} UserConfig
 */
export const createViteConfig = (options = {}) =>
	defineConfig({
		plugins: [dts({ rollupTypes: true })],
		build: {
			lib: {
				entry: resolve(process.cwd(), "src/index.ts"),
				name: "styleframe",
				fileName: "styleframe",
				...options,
			},
		},
	});
