import fs from "node:fs";
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
import {
	createPluginScanner,
	scanAndRegister,
	scanFileAndRegister,
	isContentFile,
	type PluginScannerState,
} from "./scanner";

// Matches the source file: ./button.styleframe.ts
const STYLEFRAME_SOURCE_REGEX = /\.styleframe\.ts$/;

function isStyleframeSourceFile(id: string): boolean {
	return STYLEFRAME_SOURCE_REGEX.test(id);
}

// Virtual module ID groups for invalidation
const ALL_VIRTUAL_MODULE_IDS = [
	RESOLVED_VIRTUAL_CSS_MODULE_ID,
	RESOLVED_VIRTUAL_EXTENSION_ID,
	RESOLVED_VIRTUAL_CONSUMER_ID,
];

const CSS_AND_CONSUMER_MODULE_IDS = [
	RESOLVED_VIRTUAL_CSS_MODULE_ID,
	RESOLVED_VIRTUAL_CONSUMER_ID,
];

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
	options = DEFAULT_OPTIONS,
) => {
	const cwd = process.cwd();
	const entry = options.entry ?? DEFAULT_ENTRY;
	const configPath = path.isAbsolute(entry) ? entry : path.resolve(cwd, entry);

	// Create plugin state
	const state = createPluginState(configPath);

	let isBuildCommand = false;

	// Resolved alias directories for file watching
	const aliasDirectories: string[] = [];

	// Scanner state (created if content option is provided)
	let scannerState: PluginScannerState | null = null;

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

	// Reload all styleframe files and re-scan content
	const reloadAndRescan = async (files: string[]) => {
		await reloadAll(state, files);
		if (scannerState) {
			await scanAndRegister(state, scannerState, {
				silent: options.silent,
			});
		}
	};

	// Invalidate virtual modules on the dev server and trigger a full page reload
	const invalidateServerModules = (server: {
		moduleGraph: {
			getModuleById(id: string): unknown;
			invalidateModule(mod: unknown): void;
		};
		ws: { send(data: { type: string }): void };
	}) => {
		for (const id of CSS_AND_CONSUMER_MODULE_IDS) {
			const mod = server.moduleGraph.getModuleById(id);
			if (mod) server.moduleGraph.invalidateModule(mod);
		}
		scheduleTypeGeneration();
		server.ws.send({ type: "full-reload" });
	};

	// Full reload for handleHotUpdate: reload files, resolve virtual modules, schedule type gen.
	// Returns the modules to invalidate, or null if reload failed.
	const handleReload = async (
		resolveModule: (id: string) => Promise<unknown>,
		moduleIds: string[],
		errorMessage: string,
	) => {
		try {
			await reloadAndRescan([...state.files.keys()]);

			const modulesToInvalidate = (
				await Promise.all(moduleIds.map(resolveModule))
			).filter(Boolean);

			scheduleTypeGeneration();

			return modulesToInvalidate.length > 0 ? modulesToInvalidate : null;
		} catch (error) {
			consola.error(errorMessage, error);
			return null;
		}
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

				// 5. Scan content files and auto-register utilities
				if (options.content?.length) {
					scannerState = createPluginScanner(options.content, cwd);
					await scanAndRegister(state, scannerState, {
						silent: options.silent,
					});
				}

				// 6. Add watch files
				this.addWatchFile(configPath);
				for (const file of sortedFiles) {
					this.addWatchFile(file);
				}
				if (scannerState) {
					for (const file of scannerState.scannedFiles) {
						this.addWatchFile(file);
					}
				}

				state.initialized = true;

				// 7. Generate type declarations
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
			configResolved(config) {
				// Pick up Vite's resolve.alias and pass it to Jiti for module resolution.
				// Vite normalizes resolve.alias to Alias[] ({ find, replacement }).
				// We only use entries where `find` is a string since Jiti doesn't support RegExp keys.
				if (config.resolve?.alias) {
					const viteAliases = Array.isArray(config.resolve.alias)
						? config.resolve.alias
						: Object.entries(
								config.resolve.alias as Record<string, string>,
							).map(([find, replacement]) => ({ find, replacement }));

					for (const entry of viteAliases) {
						if (typeof entry.find === "string") {
							state.alias[entry.find] = entry.replacement;
						}
					}
				}
			},

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

							// Re-scan content after new styleframe file
							if (scannerState) {
								await scanAndRegister(state, scannerState, {
									silent: options.silent,
								});
							}

							invalidateServerModules(server);
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

							await reloadAndRescan(remainingFiles);
							invalidateServerModules(server);
						} catch (error) {
							consola.error(
								`[styleframe] Failed to reload after file removal: ${file}`,
								error,
							);
						}
					}
				});

				// Watch aliased source directories for changes
				for (const aliasPath of Object.values(state.alias)) {
					const resolved = path.isAbsolute(aliasPath)
						? aliasPath
						: path.resolve(cwd, aliasPath);

					try {
						const stat = fs.statSync(resolved);
						const dir = stat.isDirectory() ? resolved : path.dirname(resolved);
						aliasDirectories.push(dir);
						server.watcher.add(dir);
					} catch {
						// Path doesn't exist yet, skip
					}
				}
			},

			async handleHotUpdate(ctx) {
				const resolveModule = async (id: string) => {
					const mod = ctx.server?.moduleGraph.getModuleById(id);
					return mod ?? (await ctx.server?.moduleGraph.getModuleByUrl(id));
				};

				// Config change → reload everything
				if (ctx.file === configPath) {
					if (!options.silent) {
						consola.info(`[styleframe] Config changed, reloading...`);
					}

					const result = await handleReload(
						resolveModule,
						ALL_VIRTUAL_MODULE_IDS,
						`[styleframe] Reload failed:`,
					);
					return (result as typeof ctx.modules) ?? ctx.modules;
				}

				// Styleframe file change → reload all to rebuild global instance
				if (state.files.has(ctx.file)) {
					if (!options.silent) {
						consola.info(
							`[styleframe] File changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					const result = await handleReload(
						resolveModule,
						CSS_AND_CONSUMER_MODULE_IDS,
						`[styleframe] Failed to reload: ${ctx.file}`,
					);
					return (result as typeof ctx.modules) ?? ctx.modules;
				}

				// Content file change → incremental scan and register new utilities
				if (isContentFile(scannerState, ctx.file)) {
					try {
						const hasNewValues = await scanFileAndRegister(
							state,
							scannerState!,
							ctx.file,
						);

						if (hasNewValues) {
							const cssModule = await resolveModule(
								RESOLVED_VIRTUAL_CSS_MODULE_ID,
							);

							if (cssModule) {
								return [cssModule, ...ctx.modules];
							}
						}
					} catch (error) {
						consola.error(
							`[styleframe] Failed to scan content file: ${ctx.file}`,
							error,
						);
					}

					return ctx.modules;
				}

				// Aliased dependency change → reload everything
				const isAliasedFile = aliasDirectories.some(
					(dir) => ctx.file.startsWith(dir + path.sep) || ctx.file === dir,
				);

				if (isAliasedFile) {
					if (!options.silent) {
						consola.info(
							`[styleframe] Aliased dependency changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					const result = await handleReload(
						resolveModule,
						ALL_VIRTUAL_MODULE_IDS,
						`[styleframe] Reload after alias change failed:`,
					);
					return (result as typeof ctx.modules) ?? ctx.modules;
				}

				return ctx.modules;
			},
		},
	};
};

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;
