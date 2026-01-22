import type { Styleframe } from "@styleframe/core";
import { isRecipe, isSelector, styleframe } from "@styleframe/core";
import { watch } from "chokidar";
import { createJiti } from "jiti";
import { existsSync } from "node:fs";
import path from "node:path";

const SUPPORTED_EXTENSIONS = [".ts", ".mts", ".cts", ".js", ".mjs", ".cjs"];

function hasKnownExtension(filePath: string): boolean {
	return SUPPORTED_EXTENSIONS.some((ext) => filePath.endsWith(ext));
}

function resolveConfigFile(cwd: string, entry: string): string | undefined {
	const basePath = path.isAbsolute(entry) ? entry : path.join(cwd, entry);

	if (hasKnownExtension(basePath)) {
		return existsSync(basePath) ? basePath : undefined;
	}

	for (const ext of SUPPORTED_EXTENSIONS) {
		const filePath = `${basePath}${ext}`;
		if (existsSync(filePath)) {
			return filePath;
		}
	}

	return undefined;
}

function trackNamedExports(module: Record<string, unknown>) {
	for (const [exportName, exportValue] of Object.entries(module)) {
		if (exportName === "default") continue;
		if (isRecipe(exportValue)) {
			exportValue._exportName = exportName;
		} else if (isSelector(exportValue)) {
			exportValue._exportName = exportName;
		}
	}
}

export async function loadConfiguration({
	cwd = process.cwd(),
	entry = "styleframe.config",
}: {
	cwd?: string;
	entry?: string;
} = {}) {
	const resolvedPath = resolveConfigFile(cwd, entry);

	if (!resolvedPath) {
		// Return default instance if no config found
		return styleframe();
	}

	const jiti = createJiti(path.dirname(resolvedPath), { cache: false });
	const module = (await jiti.import(resolvedPath)) as Record<string, unknown>;

	if (!module.default) {
		throw new Error(
			`Missing default export in ${resolvedPath}. Expected a Styleframe instance.`,
		);
	}

	trackNamedExports(module);

	return module.default as Styleframe;
}

export async function watchConfiguration({
	cwd = process.cwd(),
	entry = "styleframe.config",
	onUpdate,
	onError,
}: {
	cwd?: string;
	entry?: string;
	onUpdate?: (config: Styleframe) => void;
	onError?: (error: Error) => void;
} = {}) {
	const resolvedPath = resolveConfigFile(cwd, entry);
	if (!resolvedPath) {
		throw new Error(`Config file not found: ${entry}`);
	}

	const watcher = watch(resolvedPath, { ignoreInitial: true });

	watcher.on("change", async () => {
		try {
			const config = await loadConfiguration({ entry: resolvedPath });
			onUpdate?.(config);
		} catch (error) {
			onError?.(error instanceof Error ? error : new Error(String(error)));
		}
	});

	watcher.on("unlink", () => {
		onError?.(new Error(`Config file was deleted: ${resolvedPath}`));
	});

	return {
		config: await loadConfiguration({ entry: resolvedPath }),
		configFile: resolvedPath,
		unwatch: () => watcher.close(),
	};
}
