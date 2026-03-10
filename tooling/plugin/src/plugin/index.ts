import path from "node:path";
import { consola } from "consola";
import { transform as esbuildTransform } from "esbuild";
import type { Jiti } from "jiti";
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
	createPersistentJiti,
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
import {
	type DependencyGraph,
	createDependencyGraph,
	buildDependencyGraph,
	getFilesToInvalidate,
	isTrackedDependency,
} from "./dependency-graph";

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

	// Resolve alias paths to absolute paths relative to cwd
	const resolvedAliases = options.resolve?.alias
		? Object.fromEntries(
				Object.entries(options.resolve.alias).map(([key, value]) => [
					key,
					path.isAbsolute(value) ? value : path.resolve(cwd, value),
				]),
			)
		: undefined;

	const state = createPluginState(configPath);

	let isBuildCommand = false;

	// Persistent shared Jiti instance with module caching enabled.
	// Created once in buildStart, reused across all HMR reloads.
	let persistentJiti: Jiti | null = null;

	// Dependency graph built by importree for selective cache invalidation
	let depGraph: DependencyGraph = createDependencyGraph();

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

	// Reload all styleframe files with selective cache invalidation,
	// re-scan content, and rebuild the dependency graph.
	const reloadAndRescan = async (
		files: string[],
		filesToInvalidate?: string[],
	) => {
		await reloadAll(
			state,
			files,
			persistentJiti ?? undefined,
			filesToInvalidate,
		);

		if (scannerState) {
			await scanAndRegister(state, scannerState, {
				silent: options.silent,
			});
		}

		// Rebuild dependency graph after reload to capture any changed imports
		depGraph = await buildDependencyGraph(configPath, files, resolvedAliases);
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

	// Full reload for handleHotUpdate: reload files with selective invalidation,
	// resolve virtual modules, schedule type gen.
	// Returns the modules to invalidate, or null if reload failed.
	const handleReload = async (
		resolveModule: (id: string) => Promise<unknown>,
		moduleIds: string[],
		errorMessage: string,
		filesToInvalidate?: string[],
	) => {
		try {
			await reloadAndRescan([...state.files.keys()], filesToInvalidate);

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
				// 1. Create persistent shared Jiti instance
				persistentJiti = createPersistentJiti(resolvedAliases);

				// 2. Load config file
				await loadConfigFile(state, persistentJiti);

				// 3. Discover all *.styleframe.ts files
				const files = await discoverStyleframeFiles({
					cwd,
					include: options.include ?? [],
					exclude: options.exclude ?? [],
				});

				// Filter out the config file itself
				const styleframeFiles = files.filter((f) => f !== configPath);

				// 4. Sort by load order
				const sortedFiles = sortByLoadOrder(
					styleframeFiles,
					options.loadOrder ?? "alphabetical",
				);

				// 5. Load all styleframe files
				await loadAllStyleframeFiles(state, sortedFiles, persistentJiti);

				// 6. Build dependency graph for selective cache invalidation
				depGraph = await buildDependencyGraph(
					configPath,
					sortedFiles,
					resolvedAliases,
				);

				// 7. Scan content files and auto-register utilities
				if (options.scanner?.content?.length) {
					scannerState = createPluginScanner(
						options.scanner.content,
						cwd,
						options.scanner.extractors,
						options.scanner.utilities,
					);
					await scanAndRegister(state, scannerState, {
						silent: options.silent,
					});
				}

				// 8. Add watch files (entry points + all tracked dependencies)
				this.addWatchFile(configPath);
				for (const file of sortedFiles) {
					this.addWatchFile(file);
				}
				for (const trackedFile of depGraph.trackedFiles) {
					if (trackedFile !== configPath && !state.files.has(trackedFile)) {
						this.addWatchFile(trackedFile);
					}
				}
				if (scannerState) {
					for (const file of scannerState.scannedFiles) {
						this.addWatchFile(file);
					}
				}

				state.initialized = true;

				// 9. Generate type declarations
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
						`[styleframe] Initialized with ${sortedFiles.length} styleframe file(s) (tracking ${depGraph.trackedFiles.size} dependencies).`,
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
							await loadStyleframeFile(
								state,
								file,
								loadOrder,
								persistentJiti ?? undefined,
							);

							if (!options.silent) {
								consola.info(
									`[styleframe] Discovered new file: ${path.relative(cwd, file)}`,
								);
							}

							// Rebuild dependency graph to include the new file
							depGraph = await buildDependencyGraph(
								configPath,
								[...state.files.keys()],
								resolvedAliases,
							);

							// Watch new dependencies discovered by importree
							for (const trackedFile of depGraph.trackedFiles) {
								server.watcher.add(trackedFile);
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
			},

			async handleHotUpdate(ctx) {
				const resolveModule = async (id: string) => {
					const mod = ctx.server?.moduleGraph.getModuleById(id);
					return mod ?? (await ctx.server?.moduleGraph.getModuleByUrl(id));
				};

				// Config change → reload everything with selective invalidation
				if (ctx.file === configPath) {
					if (!options.silent) {
						consola.info(`[styleframe] Config changed, reloading...`);
					}

					const affected = getFilesToInvalidate(depGraph, ctx.file);

					const result = await handleReload(
						resolveModule,
						ALL_VIRTUAL_MODULE_IDS,
						`[styleframe] Reload failed:`,
						affected,
					);
					return (result as typeof ctx.modules) ?? ctx.modules;
				}

				// Styleframe file change → reload all with selective invalidation
				if (state.files.has(ctx.file)) {
					if (!options.silent) {
						consola.info(
							`[styleframe] File changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					const affected = getFilesToInvalidate(depGraph, ctx.file);

					const result = await handleReload(
						resolveModule,
						CSS_AND_CONSUMER_MODULE_IDS,
						`[styleframe] Failed to reload: ${ctx.file}`,
						affected,
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

				// Deep dependency change (tracked by importree but not a config/styleframe file)
				// e.g., shared theme composable, token utility, etc.
				if (isTrackedDependency(depGraph, ctx.file, configPath, state.files)) {
					if (!options.silent) {
						consola.info(
							`[styleframe] Dependency changed: ${path.relative(cwd, ctx.file)}`,
						);
					}

					const affected = getFilesToInvalidate(depGraph, ctx.file);

					const result = await handleReload(
						resolveModule,
						ALL_VIRTUAL_MODULE_IDS,
						`[styleframe] Reload after dependency change failed:`,
						affected,
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
