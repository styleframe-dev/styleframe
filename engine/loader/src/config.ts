import type { Styleframe } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { loadConfig, watchConfig } from "c12";

export async function loadConfiguration({
	cwd = process.cwd(),
}: {
	cwd?: string;
} = {}) {
	const { config } = await loadConfig<Styleframe>({
		cwd,
		name: "styleframe",
		defaults: styleframe(),
	});

	return config;
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
