import type { Styleframe } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { loadConfig, watchConfig } from "c12";
import path from "node:path";

export async function loadConfiguration({
	cwd = process.cwd(),
	name = "styleframe",
}: {
	cwd?: string;
	name?: string;
} = {}) {
	const { config } = await loadConfig<Styleframe>({
		cwd,
		name,
		defaults: styleframe(),
	});

	return config;
}

export async function loadConfigurationFromPath(entry: string) {
	const entryPath = path.resolve(entry);
	const cwd = path.dirname(entryPath);
	const name = path.basename(entryPath).replace(/(\.config)?(\.ts)?$/, "");

	return await loadConfiguration({ cwd, name });
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
