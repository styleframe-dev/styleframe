import type { Styleframe } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { loadConfig, watchConfig } from "c12";
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
