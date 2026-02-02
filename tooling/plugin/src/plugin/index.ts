import path from "node:path";
import {
	getLicenseKeyFromEnv,
	validateInstanceLicense,
} from "@styleframe/license";
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
	RESOLVED_VIRTUAL_EXTENSION_ID,
	RESOLVED_VIRTUAL_CONSUMER_ID,
	ROLLUP_V_PREFIX,
	VIRTUAL_CSS_MODULE_ID,
	VIRTUAL_TS_MODULE_ID,
} from "./constants";
import type { Options } from "./types";
export type { Options } from "./types";
import { createPluginState, type PluginGlobalState } from "./state";
import { discoverStyleframeFiles, sortByLoadOrder } from "./discovery";
import {
	loadConfigFile,
	loadStyleframeFile,
	loadAllStyleframeFiles,
	reloadAll,
} from "./global-loader";
import {
	generateExtensionModule,
	generateConsumerModule,
	generateGlobalCSS,
	generateTypeDeclarations,
} from "./generate";

// Matches the source file: ./button.styleframe.ts
const STYLEFRAME_SOURCE_REGEX = /\.styleframe\.ts$/;

// Virtual module prefixes for styleframe files
const STYLEFRAME_CSS_VIRTUAL_PREFIX = `${ROLLUP_V_PREFIX}styleframe.css:`;
const STYLEFRAME_TS_VIRTUAL_PREFIX = `${ROLLUP_V_PREFIX}styleframe.ts:`;

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

/**
 * Build entries for per-file virtual modules (legacy support)
 */
async function buildEntry(
	ctx: UnpluginBuildContext,
	entry: string,
	type: "css" | "ts",
	options: Options,
	isBuildCommand: boolean,
	state: PluginGlobalState,
) {
	ctx.addWatchFile(entry);

	// For per-file modules, use the global instance if available
	const instance = state.globalInstance;
	if (!instance) {
		throw new Error("[styleframe] Global instance not initialized");
	}

	await validateInstanceLicense(instance, {
		licenseKey: getLicenseKeyFromEnv() || "",
		environment: process.env.NODE_ENV || "development",
		isBuild: isBuildCommand,
	});

	const result = await transpile(instance, { type });
	const code = result.files.map((f) => f.content).join("\n");

	return { code };
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options = DEFAULT_OPTIONS,
) => {
	const cwd = process.cwd();
	const entry = options.entry ?? DEFAULT_ENTRY;
	const configPath = path.isAbsolute(entry) ? entry : path.resolve(cwd, entry);

	// Create plugin state
	const state = createPluginState(configPath);

	let isBuildCommand = false;

	// Track styleframe source files and their virtual module mappings
	const sourceToVirtualModules = new Map<string, Set<string>>();

	// Debounce timeout for type generation
	let typeGenTimeout: ReturnType<typeof setTimeout> | null = null;

	// Schedule type generation with debounce
	const scheduleTypeGeneration = () => {
		if (options.dts?.enabled === false) return;
		if (typeGenTimeout) clearTimeout(typeGenTimeout);
		typeGenTimeout = setTimeout(async () => {
			try {
				await generateTypeDeclarations(state, cwd, options.dts, options.silent);
			} catch (error) {
				consola.error(`[styleframe] Type generation failed:`, error);
			}
		}, 100);
	};

	return {
		name: PLUGIN_NAME,
		enforce: "pre",

		async buildStart() {
			isBuildCommand = process.argv.includes("build");

			if (!options.silent) {
				console.log("");
				consola.info(`[styleframe] Initializing...`);
			}

			try {
				// 1. Load config file
				await loadConfigFile(state);

				// 2. Discover all *.styleframe.ts files
				const files = await discoverStyleframeFiles({
					cwd,
					include: options.include ?? [],
					exclude: options.exclude ?? [],
				});

				// Filter out the config file itself
				const styleframeFiles = files.filter((f) => f !== configPath);

				// 3. Sort by load order
				const sortedFiles = sortByLoadOrder(
					styleframeFiles,
					options.loadOrder ?? "alphabetical",
				);

				// 4. Load all styleframe files
				await loadAllStyleframeFiles(state, sortedFiles);

				// 5. Add watch files
				this.addWatchFile(configPath);
				for (const file of sortedFiles) {
					this.addWatchFile(file);
				}

				state.initialized = true;

				// 6. Generate type declarations
				if (options.dts?.enabled !== false) {
					await generateTypeDeclarations(
						state,
						cwd,
						options.dts,
						options.silent,
					);
				}

				if (!options.silent) {
					consola.success(
						`[styleframe] Initialized with ${sortedFiles.length} styleframe file(s).`,
					);
					console.log("");
				}
			} catch (error) {
				consola.error(`[styleframe] Initialization failed:`, error);
				throw error;
			}
		},

		resolveId(id, importer) {
			// Handle virtual:styleframe with two faces
			if (id === VIRTUAL_TS_MODULE_ID) {
				if (importer && isStyleframeSourceFile(importer)) {
					// Extension face: *.styleframe.ts files get the global instance factory
					return RESOLVED_VIRTUAL_EXTENSION_ID;
				}
				// Consumer face: app code gets aggregated exports
				return RESOLVED_VIRTUAL_CONSUMER_ID;
			}

			// Handle virtual:styleframe.css
			if (id === VIRTUAL_CSS_MODULE_ID) {
				return RESOLVED_VIRTUAL_CSS_MODULE_ID;
			}

			// Parse query parameters
			const [pathPart, queryPart] = id.split("?");

			// Handle HMR refetch requests for .styleframe.css files
			// These come in as "SwatchCard.styleframe.css?t=123456"
			if (pathPart?.endsWith(".styleframe.css")) {
				const sourceFile = pathPart.replace(/\.css$/, ".ts");
				const resolvedSourcePath = resolveSourcePath(sourceFile, importer);
				return getResolvedVirtualId(resolvedSourcePath, "css");
			}

			// Only handle .styleframe files with specific queries
			// .styleframe or .styleframe.ts
			if (!pathPart || !/\.styleframe(\.ts)?$/.test(pathPart)) {
				return null;
			}

			const isCss = queryPart === "css";
			const isTs = queryPart === "ts";

			if (!isCss && !isTs) {
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

		async load(id) {
			// Extension face: return factory that gives global instance
			if (id === RESOLVED_VIRTUAL_EXTENSION_ID) {
				return { code: generateExtensionModule(configPath) };
			}

			// Consumer face: return aggregated exports
			if (id === RESOLVED_VIRTUAL_CONSUMER_ID) {
				return { code: await generateConsumerModule(state) };
			}

			// Global CSS: all styles from global instance
			if (id === RESOLVED_VIRTUAL_CSS_MODULE_ID) {
				return generateGlobalCSS(state, isBuildCommand, options);
			}

			// Handle .styleframe virtual modules (per-file CSS/TS)
			const parsed = parseVirtualId(id);
			if (parsed) {
				const { type, filePath } = parsed;
				const relativePath = path.relative(cwd, filePath);

				if (!options.silent) {
					const consolePath =
						type === "css" ? relativePath.replace(".ts", ".css") : relativePath;
					consola.info(`[styleframe] Building ${consolePath}...`);
				}

				return buildEntry(this, filePath, type, options, isBuildCommand, state);
			}

			return null;
		},

		vite: {
			async transform(code, id) {
				// Transform TypeScript virtual modules since Vite's esbuild doesn't process them
				const isVirtualTsModule =
					id === RESOLVED_VIRTUAL_TS_MODULE_ID ||
					id === RESOLVED_VIRTUAL_EXTENSION_ID ||
					id === RESOLVED_VIRTUAL_CONSUMER_ID ||
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

			configureServer(server) {
				// Watch for new *.styleframe.ts files
				server.watcher.on("add", async (file) => {
					if (
						isStyleframeSourceFile(file) &&
						file !== configPath &&
						!state.files.has(file)
					) {
						try {
							const loadOrder = state.files.size;
							await loadStyleframeFile(state, file, loadOrder);

							if (!options.silent) {
								consola.info(
									`[styleframe] Discovered new file: ${path.relative(cwd, file)}`,
								);
							}

							// Invalidate consumer and CSS modules
							const consumerMod = server.moduleGraph.getModuleById(
								RESOLVED_VIRTUAL_CONSUMER_ID,
							);
							const cssMod = server.moduleGraph.getModuleById(
								RESOLVED_VIRTUAL_CSS_MODULE_ID,
							);

							if (consumerMod) {
								server.moduleGraph.invalidateModule(consumerMod);
							}
							if (cssMod) {
								server.moduleGraph.invalidateModule(cssMod);
							}

							// Regenerate types
							scheduleTypeGeneration();

							server.ws.send({ type: "full-reload" });
						} catch (error) {
							consola.error(
								`[styleframe] Failed to load new file: ${file}`,
								error,
							);
						}
					}
				});

				// Watch for deleted *.styleframe.ts files
				server.watcher.on("unlink", (file) => {
					if (state.files.has(file)) {
						state.files.delete(file);
						sourceToVirtualModules.delete(file);

						if (!options.silent) {
							consola.info(
								`[styleframe] File removed: ${path.relative(cwd, file)}`,
							);
						}

						// Invalidate consumer and CSS modules
						const consumerMod = server.moduleGraph.getModuleById(
							RESOLVED_VIRTUAL_CONSUMER_ID,
						);
						const cssMod = server.moduleGraph.getModuleById(
							RESOLVED_VIRTUAL_CSS_MODULE_ID,
						);

						if (consumerMod) {
							server.moduleGraph.invalidateModule(consumerMod);
						}
						if (cssMod) {
							server.moduleGraph.invalidateModule(cssMod);
						}

						// Regenerate types
						scheduleTypeGeneration();

						server.ws.send({ type: "full-reload" });
					}
				});
			},

			async handleHotUpdate(ctx) {
				const getModuleById = async (id: string) => {
					const mod = ctx.server?.moduleGraph.getModuleById(id);
					return mod ?? (await ctx.server?.moduleGraph.getModuleByUrl(id));
				};

				// Config change → reload everything
				if (ctx.file === configPath) {
					if (!options.silent) {
						consola.info(`[styleframe] Config changed, reloading...`);
					}

					try {
						const files = [...state.files.keys()];
						await reloadAll(state, files);

						// Invalidate all virtual modules
						const cssModule = await getModuleById(
							RESOLVED_VIRTUAL_CSS_MODULE_ID,
						);
						const extensionModule = await getModuleById(
							RESOLVED_VIRTUAL_EXTENSION_ID,
						);
						const consumerModule = await getModuleById(
							RESOLVED_VIRTUAL_CONSUMER_ID,
						);

						const modulesToInvalidate = [
							cssModule,
							extensionModule,
							consumerModule,
						].filter(Boolean);

						// Regenerate types
						scheduleTypeGeneration();

						if (modulesToInvalidate.length > 0) {
							return modulesToInvalidate as typeof ctx.modules;
						}
					} catch (error) {
						consola.error(`[styleframe] Reload failed:`, error);
					}

					return ctx.modules;
				}

				// Styleframe file change → reload that file and invalidate
				if (state.files.has(ctx.file)) {
					if (!options.silent) {
						consola.info(
							`[styleframe] File changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					try {
						const fileInfo = state.files.get(ctx.file);
						if (fileInfo) {
							await loadStyleframeFile(state, ctx.file, fileInfo.loadOrder);
						}

						// Invalidate CSS and consumer modules
						const cssModule = await getModuleById(
							RESOLVED_VIRTUAL_CSS_MODULE_ID,
						);
						const consumerModule = await getModuleById(
							RESOLVED_VIRTUAL_CONSUMER_ID,
						);

						const modulesToInvalidate = [cssModule, consumerModule].filter(
							Boolean,
						);

						// Regenerate types
						scheduleTypeGeneration();

						// Also invalidate per-file virtual modules
						const virtualModuleIds = sourceToVirtualModules.get(ctx.file);
						if (virtualModuleIds) {
							for (const virtualId of virtualModuleIds) {
								const virtualModule = await getModuleById(virtualId);
								if (virtualModule) {
									modulesToInvalidate.push(virtualModule);
								}
							}
						}

						if (modulesToInvalidate.length > 0) {
							return modulesToInvalidate as typeof ctx.modules;
						}
					} catch (error) {
						consola.error(`[styleframe] Failed to reload: ${ctx.file}`, error);
					}

					return ctx.modules;
				}

				// Handle HMR for other .styleframe.ts source files (not yet tracked)
				if (isStyleframeSourceFile(ctx.file)) {
					// Normalize path to match keys in sourceToVirtualModules
					const normalizedFile = path.resolve(ctx.file);
					const virtualModuleIds = sourceToVirtualModules.get(normalizedFile);

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
