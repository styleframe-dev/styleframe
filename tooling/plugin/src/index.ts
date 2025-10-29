import { loadConfigurationFromPath } from "@styleframe/loader";
import type { TranspileOptions } from "@styleframe/transpiler";
import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";
import path from "node:path";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import {
	DEFAULT_ENTRY,
	DEFAULT_OPTIONS,
	PLUGIN_NAME,
	RESOLVED_VIRTUAL_CSS_MODULE_ID,
	RESOLVED_VIRTUAL_TS_MODULE_ID,
	VIRTUAL_CSS_MODULE_ID,
	VIRTUAL_TS_MODULE_ID,
} from "./constants";
import type { Options } from "./types";

async function loadAndBuildEntry(entry: string, options: TranspileOptions) {
	const instance = await loadConfigurationFromPath(entry);

	return transpile(instance, options);
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options = DEFAULT_OPTIONS,
) => {
	const rawEntry = options.entry ?? DEFAULT_ENTRY;
	const entries: string[] = (
		typeof rawEntry === "string" ? [rawEntry] : rawEntry
	).map((p) => (path.isAbsolute(p) ? p : path.resolve(process.cwd(), p)));

	return {
		name: PLUGIN_NAME,
		enforce: "pre",
		resolveId(id) {
			if (id === VIRTUAL_CSS_MODULE_ID) {
				return RESOLVED_VIRTUAL_CSS_MODULE_ID;
			} else if (id === VIRTUAL_TS_MODULE_ID) {
				return RESOLVED_VIRTUAL_TS_MODULE_ID;
			}
		},
		async load(id) {
			if (
				id === RESOLVED_VIRTUAL_CSS_MODULE_ID ||
				id === RESOLVED_VIRTUAL_TS_MODULE_ID
			) {
				let hasError = false;
				const type = id.endsWith(".css") ? "css" : "ts";

				if (!options.silent && type === "css") {
					console.log("");
					consola.info(`[styleframe] Building...`);
				}

				const results = [];
				for (const entry of entries) {
					this.addWatchFile(entry);

					try {
						results.push(await loadAndBuildEntry(entry, { type }));
					} catch (error) {
						hasError = true;
						consola.error(`[styleframe] Failed to build: ${entry}`, error);
					}
				}

				const code = results.reduce(
					(acc, result) =>
						acc +
						"\n" +
						result.files.reduce(
							(fileAcc, file) => `${fileAcc}\n${file.content}`,
							"",
						),
					"",
				);

				if (!options.silent && type === "css" && !hasError) {
					consola.success(`[styleframe] Built successfully.`);
					console.log("");
				}

				return { code };
			}
		},
		vite: {
			async handleHotUpdate(ctx) {
				const getModuleById = async (id: string) => {
					const mod = ctx.server?.moduleGraph.getModuleById(id);
					return mod ?? (await ctx.server?.moduleGraph.getModuleByUrl(id));
				};

				// If a tracked entry changed, rebuild it and invalidate the virtual css module
				if (entries.includes(ctx.file)) {
					// Invalidate the virtual module so HMR pushes the updated css
					const cssModule =
						(await getModuleById(RESOLVED_VIRTUAL_CSS_MODULE_ID)) ??
						(await getModuleById(VIRTUAL_CSS_MODULE_ID));

					// Invalidate the virtual module so HMR pushes the updated typescript module
					const tsModule =
						(await getModuleById(RESOLVED_VIRTUAL_TS_MODULE_ID)) ??
						(await getModuleById(VIRTUAL_TS_MODULE_ID));

					if (cssModule || tsModule) {
						// Tell Vite that this module is affected
						return [
							...(cssModule ? [cssModule] : []),
							...(tsModule ? [tsModule] : []),
						];
					}
					// Fall back to a full reload if for some reason we didn’t find the module
					ctx.server?.ws.send({ type: "full-reload" });
				}

				return ctx.modules;
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
