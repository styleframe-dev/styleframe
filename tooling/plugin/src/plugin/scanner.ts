import {
	createScanner,
	type ParsedUtility,
	type Scanner,
	type UtilityMatch,
} from "@styleframe/scanner";
import type { ModifierFactory, UtilityFactory } from "@styleframe/core";
import { consola } from "consola";
import type { PluginGlobalState } from "./state";

/**
 * Scanner state managed by the plugin
 */
export interface PluginScannerState {
	/** The scanner instance */
	scanner: Scanner;
	/** Set of absolute file paths from the last scan (used for HMR matching) */
	scannedFiles: Set<string>;
}

/**
 * Create a plugin scanner instance.
 *
 * @param contentPatterns Glob patterns for content files to scan
 * @param cwd Working directory for glob resolution
 * @returns Plugin scanner state
 */
export function createPluginScanner(
	contentPatterns: string[],
	cwd: string,
): PluginScannerState {
	const scanner = createScanner({
		content: contentPatterns,
		cwd,
	});

	return {
		scanner,
		scannedFiles: new Set(),
	};
}

/**
 * Full scan: scan all content files and register detected utilities.
 *
 * Used at build start and after reloadAll.
 *
 * @param pluginState The plugin global state
 * @param scannerState The scanner state
 * @param options Options for logging
 * @returns Number of newly registered utility values
 */
export async function scanAndRegister(
	pluginState: PluginGlobalState,
	scannerState: PluginScannerState,
	options?: { silent?: boolean },
): Promise<number> {
	if (!pluginState.globalInstance) {
		return 0;
	}

	const result = await scannerState.scanner.scan();

	// Update tracked files
	scannerState.scannedFiles.clear();
	for (const filePath of result.files.keys()) {
		scannerState.scannedFiles.add(filePath);
	}

	const matches = scannerState.scanner.match(
		result.allParsed,
		pluginState.globalInstance.root,
	);

	const registered = registerMatchedUtilities(pluginState, matches);

	if (!options?.silent) {
		const unmatched = matches.filter((m) => m.factory === null);
		if (unmatched.length > 0) {
			const names = [...new Set(unmatched.map((m) => m.parsed.raw))];
			consola.warn(
				`[styleframe] Scanner found ${unmatched.length} utility class(es) without a matching factory: ${names.join(", ")}`,
			);
		}

		if (registered > 0) {
			consola.info(
				`[styleframe] Scanner registered ${registered} utility value(s) from ${result.files.size} content file(s).`,
			);
		}
	}

	return registered;
}

/**
 * Incremental scan: scan a single file and register any new utilities.
 *
 * Used for HMR when a content file changes.
 *
 * @param pluginState The plugin global state
 * @param scannerState The scanner state
 * @param filePath The changed file path
 * @returns true if new values were registered (CSS needs invalidation)
 */
export async function scanFileAndRegister(
	pluginState: PluginGlobalState,
	scannerState: PluginScannerState,
	filePath: string,
): Promise<boolean> {
	if (!pluginState.globalInstance) {
		return false;
	}

	// Invalidate cache for this file and re-scan it
	scannerState.scanner.invalidate(filePath);
	const fileResult = await scannerState.scanner.scanFile(filePath);

	const matches = scannerState.scanner.match(
		fileResult.parsed,
		pluginState.globalInstance.root,
	);

	const registered = registerMatchedUtilities(pluginState, matches);

	return registered > 0;
}

/**
 * Check if a file is a tracked content file.
 */
export function isContentFile(
	scannerState: PluginScannerState | null,
	filePath: string,
): boolean {
	return scannerState?.scannedFiles.has(filePath) ?? false;
}

interface RegistrationEntry {
	factory: UtilityFactory;
	parsed: ParsedUtility;
	modifiers: ModifierFactory[];
}

/**
 * Register utility values detected by the scanner that don't yet exist on the root.
 *
 * For non-arbitrary values, uses the factory's autogenerate function (treating the
 * value key as a token reference). For arbitrary values, registers with the literal
 * CSS value directly.
 *
 * @param pluginState The plugin global state
 * @param matches Scanner match results
 * @returns Number of newly registered values
 */
export function registerMatchedUtilities(
	pluginState: PluginGlobalState,
	matches: UtilityMatch[],
): number {
	// Filter to unregistered matches with a valid factory
	const unregistered = matches.filter((m) => m.factory !== null && !m.exists);

	if (unregistered.length === 0) {
		return 0;
	}

	// Group by (factory name, value) to deduplicate and merge modifier sets
	const groups = new Map<string, RegistrationEntry>();

	for (const match of unregistered) {
		const factory = match.factory!;
		const key = `${factory.name}:${match.parsed.value}`;
		const existing = groups.get(key);

		if (!existing) {
			groups.set(key, {
				factory,
				parsed: match.parsed,
				modifiers: [...match.modifierFactories],
			});
		} else {
			// Merge modifiers from this match
			for (const mod of match.modifierFactories) {
				const modKey = mod.key.join(",");
				if (!existing.modifiers.some((m) => m.key.join(",") === modKey)) {
					existing.modifiers.push(mod);
				}
			}
		}
	}

	let count = 0;

	for (const { factory, parsed, modifiers } of groups.values()) {
		const modifierArgs = modifiers.length > 0 ? modifiers : undefined;

		if (parsed.isArbitrary && parsed.arbitraryValue !== undefined) {
			// Arbitrary value: register with the literal CSS value
			factory.create({ [parsed.value]: parsed.arbitraryValue }, modifierArgs);
		} else {
			// Non-arbitrary: use autogenerate with token reference syntax
			const autoGenerated = factory.autogenerate(`@${parsed.value}`);
			factory.create(autoGenerated, modifierArgs);
		}

		count++;
	}

	return count;
}
