import path from "node:path";
import {
	getLicenseKeyFromEnv,
	validateInstanceLicense,
} from "@styleframe/license";
import { loadConfigurationFromPath } from "@styleframe/loader";
import type { TranspileOptions } from "@styleframe/transpiler";
import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";
import { transform as esbuildTransform } from "esbuild";
import type { UnpluginBuildContext, UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import {
	DEFAULT_ENTRY,
	DEFAULT_OPTIONS,
	PLUGIN_NAME,
	RESOLVED_VIRTUAL_CSS_MODULE_ID,
	RESOLVED_VIRTUAL_TS_MODULE_ID,
	ROLLUP_V_PREFIX,
	VIRTUAL_CSS_MODULE_ID,
	VIRTUAL_TS_MODULE_ID,
} from "./constants";
import type { Options } from "./types";

// Matches the source file: ./button.styleframe.ts
const STYLEFRAME_SOURCE_REGEX = /\.styleframe\.ts$/;

// Virtual module prefixes for styleframe files
const STYLEFRAME_CSS_VIRTUAL_PREFIX = `${ROLLUP_V_PREFIX}styleframe.css:`;
const STYLEFRAME_TS_VIRTUAL_PREFIX = `${ROLLUP_V_PREFIX}styleframe.ts:`;

async function loadAndBuildEntry(
	entry: string,
	options: TranspileOptions,
	isBuild: boolean,
) {
	const instance = await loadConfigurationFromPath(entry);

	await validateInstanceLicense(instance, {
		licenseKey: getLicenseKeyFromEnv() || "",
		environment: process.env.NODE_ENV || "development",
		isBuild,
	});

	return transpile(instance, options);
}

function isStyleframeSourceFile(id: string): boolean {
	return STYLEFRAME_SOURCE_REGEX.test(id);
}

function getResolvedVirtualId(filePath: string, type: "css" | "ts"): string {
	const prefix =
		type === "css"
			? STYLEFRAME_CSS_VIRTUAL_PREFIX
			: STYLEFRAME_TS_VIRTUAL_PREFIX;
	// Change extension based on output type for proper handling by Vite/Rollup
	// CSS virtual modules end in .css, TS virtual modules end in .ts
	const outputPath =
		type === "css" ? filePath.replace(/\.ts$/, ".css") : filePath;
	return `${prefix}${outputPath}`;
}

function parseVirtualId(
	id: string,
): { type: "css" | "ts"; filePath: string } | null {
	if (id.startsWith(STYLEFRAME_CSS_VIRTUAL_PREFIX)) {
		return {
			type: "css",
			// Convert back to source .ts path
			filePath: id
				.slice(STYLEFRAME_CSS_VIRTUAL_PREFIX.length)
				.replace(/\.css$/, ".ts"),
		};
	}
	if (id.startsWith(STYLEFRAME_TS_VIRTUAL_PREFIX)) {
		return {
			type: "ts",
			filePath: id.slice(STYLEFRAME_TS_VIRTUAL_PREFIX.length),
		};
	}
	return null;
}

function resolveSourcePath(file: string, importer?: string): string {
	if (path.isAbsolute(file)) {
		return file;
	}
	if (importer) {
		return path.resolve(path.dirname(importer), file);
	}
	return path.resolve(process.cwd(), file);
}

async function buildEntries(
	ctx: UnpluginBuildContext,
	entries: string[],
	type: "css" | "ts",
	outputName: string,
	options: Options,
	isBuildCommand: boolean,
) {
	let hasError = false;
	const isGlobalConfig = outputName.startsWith("styleframe.config");

	if (!options.silent) {
		if (isGlobalConfig) {
			console.log("");
		}
		consola.info(`[styleframe] Building ${outputName}...`);
	}

	const results = [];
	for (const entry of entries) {
		ctx.addWatchFile(entry);

		try {
			results.push(await loadAndBuildEntry(entry, { type }, isBuildCommand));
		} catch (error) {
			hasError = true;
			consola.error(`[styleframe] Failed to build: ${entry}`, error);
			if (!isGlobalConfig) {
				throw error;
			}
		}
	}

	const code = results.reduce(
		(acc, result) =>
			acc +
			"\n" +
			result.files.reduce((fileAcc, file) => `${fileAcc}\n${file.content}`, ""),
		"",
	);

	if (!options.silent && !hasError) {
		consola.success(`[styleframe] Built ${outputName} successfully.`);
		if (isGlobalConfig) {
			console.log("");
		}
	}

	return { code };
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options = DEFAULT_OPTIONS,
) => {
	const rawEntry = options.entry ?? DEFAULT_ENTRY;
	const entries: string[] = (
		typeof rawEntry === "string" ? [rawEntry] : rawEntry
	).map((p) => (path.isAbsolute(p) ? p : path.resolve(process.cwd(), p)));

	let isBuildCommand = false;

	// Track styleframe source files and their virtual module mappings
	const sourceToVirtualModules = new Map<string, Set<string>>();

	return {
		name: PLUGIN_NAME,
		enforce: "pre",
		resolveId(id, importer) {
			// Handle existing virtual modules
			if (id === VIRTUAL_CSS_MODULE_ID) {
				return RESOLVED_VIRTUAL_CSS_MODULE_ID;
			} else if (id === VIRTUAL_TS_MODULE_ID) {
				return RESOLVED_VIRTUAL_TS_MODULE_ID;
			}

			// Parse query parameters
			const [pathPart, queryPart] = id.split("?");

			// Only handle .styleframe files with specific queries
			// .styleframe or .styleframe.ts
			if (!pathPart || !/\.styleframe(\.ts)?$/.test(pathPart)) {
				return null;
			}

			const isCss = queryPart === "css";
			const isRecipe = queryPart === "recipe";

			if (!isCss && !isRecipe) {
				// Pass through for default resolution (e.g. importing the instance itself)
				return null;
			}

			// Resolve the source file path
			let sourceFile = pathPart;
			if (!sourceFile.endsWith(".ts")) {
				sourceFile += ".ts";
			}

			const resolvedSourcePath = resolveSourcePath(sourceFile, importer);
			const type = isCss ? "css" : "ts";
			const virtualId = getResolvedVirtualId(resolvedSourcePath, type);

			// Track the mapping for HMR
			let modules = sourceToVirtualModules.get(resolvedSourcePath);
			if (!modules) {
				modules = new Set();
				sourceToVirtualModules.set(resolvedSourcePath, modules);
			}
			modules.add(virtualId);

			return virtualId;
		},
		buildStart() {
			isBuildCommand = process.argv.includes("build");
		},
		async load(id) {
			// Handle existing virtual CSS/TS modules
			if (
				id === RESOLVED_VIRTUAL_CSS_MODULE_ID ||
				id === RESOLVED_VIRTUAL_TS_MODULE_ID
			) {
				const type = id.endsWith(".css") ? "css" : "ts";
				return buildEntries(
					this,
					entries,
					type,
					`styleframe.config.${type}`,
					options,
					isBuildCommand,
				);
			}

			// Handle .styleframe virtual modules
			const parsed = parseVirtualId(id);
			if (parsed) {
				const { type, filePath } = parsed;
				const relativePath = path.relative(process.cwd(), filePath);
				const consolePath =
					type === "css" ? relativePath.replace(".ts", ".css") : relativePath;

				return buildEntries(
					this,
					[filePath],
					type,
					consolePath,
					options,
					isBuildCommand,
				);
			}

			return null;
		},
		vite: {
			async transform(code, id) {
				// Transform TypeScript virtual modules since Vite's esbuild doesn't process them
				const isVirtualTsModule =
					id === RESOLVED_VIRTUAL_TS_MODULE_ID ||
					id.startsWith(STYLEFRAME_TS_VIRTUAL_PREFIX);

				if (isVirtualTsModule) {
					const result = await esbuildTransform(code, {
						loader: "ts",
						format: "esm",
						target: "esnext",
					});
					return {
						code: result.code,
						map: result.map || null,
					};
				}

				return null;
			},
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
					// Fall back to a full reload if for some reason we didn't find the module
					ctx.server?.ws.send({ type: "full-reload" });
				}

				// Handle HMR for .styleframe.ts source files
				if (isStyleframeSourceFile(ctx.file)) {
					const virtualModuleIds = sourceToVirtualModules.get(ctx.file);

					if (virtualModuleIds && virtualModuleIds.size > 0) {
						const modulesToInvalidate = [];

						for (const virtualId of virtualModuleIds) {
							const virtualModule = await getModuleById(virtualId);
							if (virtualModule) {
								modulesToInvalidate.push(virtualModule);
							}
						}

						if (modulesToInvalidate.length > 0) {
							return modulesToInvalidate;
						}
					}
				}

				return ctx.modules;
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
