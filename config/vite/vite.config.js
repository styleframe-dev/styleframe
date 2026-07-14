import { copyFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";
import { configDefaults as vitestConfig } from "vitest/config";

/**
 * @typedef {import('vite').UserConfig} UserConfig
 */

/**
 * Emit `.d.mts` and `.d.cts` copies of every rolled-up `.d.ts` so that
 * `import` (ESM) and `require` (CJS) consumers each resolve a correctly
 * flavored declaration instead of a single `.d.ts` that — under
 * `"type": "module"` — masquerades as ESM for CJS consumers (attw "FalseESM").
 * The api-extractor rollup is self-contained, so the three flavors are
 * byte-identical and a copy is safe.
 *
 * @returns {import('vite').Plugin}
 */
function dualDeclarations() {
	let outDir;
	return {
		name: "styleframe:dual-declarations",
		apply: "build",
		configResolved(config) {
			outDir = resolve(config.root, config.build.outDir);
		},
		async closeBundle() {
			const entries = await readdir(outDir, {
				recursive: true,
				withFileTypes: true,
			});
			await Promise.all(
				entries
					.filter((entry) => entry.isFile() && entry.name.endsWith(".d.ts"))
					.map((entry) => {
						const dtsPath = resolve(entry.parentPath ?? entry.path, entry.name);
						return Promise.all([
							copyFile(dtsPath, dtsPath.replace(/\.d\.ts$/, ".d.mts")),
							copyFile(dtsPath, dtsPath.replace(/\.d\.ts$/, ".d.cts")),
						]);
					}),
			);
		},
	};
}
export const createViteConfig = (name, cwd, options = {}) =>
	defineConfig({
		...options,
		plugins: [
			// Emit per-file `.d.ts` via unplugin-dts (Volar-based). We do NOT
			// roll declarations up through @microsoft/api-extractor: its
			// rollup relies on the TypeScript JavaScript Compiler API, which
			// TypeScript 7 (the native compiler) no longer ships, so the
			// extractor throws "Unable to follow symbol". Per-file emission
			// keeps the entry `index.d.ts` re-exporting its siblings and
			// resolves `extends`-inherited `lib` correctly from the tsconfig.
			dts({
				entryRoot: resolve(cwd, "src"),
			}),
			dualDeclarations(),
			...(options.plugins ?? []),
		],
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
				exclude: [
					...vitestConfig.coverage.exclude,
					"**/*.styleframe.ts",
					"**/styleframe.config.ts",
				],
			},
		},
	});
