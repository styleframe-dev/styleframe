import type { Styleframe } from "@styleframe/core";
import { isRecipe, isSelector, styleframe } from "@styleframe/core";
import { loadConfig, watchConfig } from "c12";
import { createJiti } from "jiti";
import path from "node:path";

export async function loadConfiguration({
	cwd = process.cwd(),
	configFile = "styleframe.config",
}: {
	cwd?: string;
	configFile?: string;
} = {}) {
	const { config } = await loadConfig<Styleframe>({
		cwd,
		configFile,
		defaults: styleframe(),
	});

	return config;
}

export async function loadConfigurationFromPath(entry: string) {
	const entryPath = path.resolve(entry);
	const cwd = path.dirname(entryPath);
	const configFile = path.basename(entryPath).replace(/(\.ts)?$/, "");

	return await loadConfiguration({ cwd, configFile });
}

/**
 * Loads configuration from a path and captures named exports.
 * Sets `_exportName` on Recipe and Selector tokens that are exported.
 */
export async function loadConfigurationWithExports(entry: string) {
	const entryPath = path.resolve(entry);
	const jiti = createJiti(path.dirname(entryPath));

	// Import module - returns all exports when default option is not set
	const module = (await jiti.import(entryPath)) as Record<string, unknown>;

	// Get the default export (Styleframe instance)
	if (!module.default) {
		throw new Error(
			`Missing default export in ${entryPath}. Expected a Styleframe instance.`,
		);
	}
	const instance = module.default as Styleframe;

	// Map named exports to tokens by setting _exportName
	for (const [exportName, exportValue] of Object.entries(module)) {
		if (exportName === "default") continue;

		if (isRecipe(exportValue)) {
			exportValue._exportName = exportName;
		} else if (isSelector(exportValue)) {
			exportValue._exportName = exportName;
		}
	}

	return instance;
}

export async function watchConfiguration({
	cwd = process.cwd(),
}: {
	cwd?: string;
} = {}) {
	return await watchConfig<Styleframe>({
		cwd,
		name: "styleframe",
		acceptHMR({ getDiff }) {
			const diff = getDiff();
			if (diff.length === 0) {
				return true; // No changes!
			}
		},
	});
}
