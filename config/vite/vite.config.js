import { copyFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
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
			// Roll all declarations up into a single .d.ts per entry via
			// @microsoft/api-extractor. `unplugin-dts` only forwards a
			// tsconfig's own compilerOptions to api-extractor and drops
			// `extends`-inherited ones, so the inherited `lib` is lost and
			// the rollup can't resolve globals like `Map`. Re-supply a
			// superset `lib` so every modern global resolves.
			dts({
				entryRoot: resolve(cwd, "src"),
				bundleTypes: {
					extractorConfig: {
						compiler: {
							overrideTsconfig: {
								compilerOptions: {
									lib: ["ESNext", "DOM", "DOM.Iterable"],
								},
							},
						},
					},
				},
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
