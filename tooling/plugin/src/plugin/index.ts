import path from "node:path";
import { consola } from "consola";
import { transform as esbuildTransform } from "esbuild";
import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import {
	DEFAULT_ENTRY,
	DEFAULT_OPTIONS,
	PLUGIN_NAME,
	RESOLVED_VIRTUAL_CSS_MODULE_ID,
	RESOLVED_VIRTUAL_TS_MODULE_ID,
	RESOLVED_VIRTUAL_EXTENSION_ID,
	RESOLVED_VIRTUAL_CONSUMER_ID,
	VIRTUAL_CSS_MODULE_ID,
	VIRTUAL_TS_MODULE_ID,
} from "./constants";
import type { Options } from "./types";
export type { Options } from "./types";
import { createPluginState } from "./state";
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

function isStyleframeSourceFile(id: string): boolean {
	return STYLEFRAME_SOURCE_REGEX.test(id);
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

			return null;
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

			return null;
		},

		vite: {
			async transform(code, id) {
				// Transform TypeScript virtual modules since Vite's esbuild doesn't process them
				const isVirtualTsModule =
					id === RESOLVED_VIRTUAL_TS_MODULE_ID ||
					id === RESOLVED_VIRTUAL_EXTENSION_ID ||
					id === RESOLVED_VIRTUAL_CONSUMER_ID;

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
				server.watcher.on("unlink", async (file) => {
					if (state.files.has(file)) {
						if (!options.silent) {
							consola.info(
								`[styleframe] File removed: ${path.relative(cwd, file)}`,
							);
						}

						try {
							// Collect remaining files (excluding deleted one), sorted by load order
							const remainingFiles = [...state.files.entries()]
								.filter(([filePath]) => filePath !== file)
								.sort(([, a], [, b]) => a.loadOrder - b.loadOrder)
								.map(([filePath]) => filePath);

							// Reload everything to rebuild the global instance without the deleted file's contributions
							await reloadAll(state, remainingFiles);

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
								`[styleframe] Failed to reload after file removal: ${file}`,
								error,
							);
						}
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

				// Styleframe file change → reload all to rebuild global instance
				if (state.files.has(ctx.file)) {
					if (!options.silent) {
						consola.info(
							`[styleframe] File changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					try {
						// Must reload all files because the global instance accumulates
						// state (variables, selectors, recipes, etc.) and there's no way
						// to undo a single file's contributions. Without a full reload,
						// removed declarations would persist on the global instance.
						const files = [...state.files.keys()];
						await reloadAll(state, files);

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

						if (modulesToInvalidate.length > 0) {
							return modulesToInvalidate as typeof ctx.modules;
						}
					} catch (error) {
						consola.error(`[styleframe] Failed to reload: ${ctx.file}`, error);
					}

					return ctx.modules;
				}

				return ctx.modules;
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
