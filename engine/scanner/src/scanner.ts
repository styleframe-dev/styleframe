import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import type { Root } from "@styleframe/core";
import type {
	Extractor,
	FileScanResult,
	ParsedUtility,
	Scanner,
	ScannerConfig,
	ScanResult,
	UtilityMatch,
} from "./types";
import { createCache, hashContent } from "./cache";
import { DEFAULT_IGNORE_PATTERNS } from "./constants";
import { extractClasses } from "./extractor";
import { matchUtilities } from "./matcher";
import { parseUtilityClass } from "./parser";
import { createChangeHandler } from "./watcher";

/**
 * Create a scanner instance for detecting utility classes in content files.
 *
 * @param config Scanner configuration
 * @returns Scanner instance
 *
 * @example
 * ```ts
 * const scanner = createScanner({
 *   content: ['./src/** /*.{html,vue,jsx,tsx}'],
 * });
 *
 * const result = await scanner.scan();
 * const matches = scanner.match(result.allParsed, root);
 * ```
 */
export function createScanner(config: ScannerConfig): Scanner {
	const cache = createCache();
	const cwd = config.cwd ?? process.cwd();
	const customExtractors = config.extractors;

	/**
	 * Get all file paths matching the content patterns.
	 */
	async function getFilePaths(): Promise<string[]> {
		return fg(config.content, {
			cwd,
			absolute: true,
			ignore: DEFAULT_IGNORE_PATTERNS,
		});
	}

	/**
	 * Scan a single file for utility classes.
	 */
	async function scanFile(filePath: string): Promise<FileScanResult> {
		const content = await readFile(filePath, "utf-8");
		const contentHash = hashContent(content);

		// Check cache
		if (cache.isValid(filePath, contentHash)) {
			const cached = cache.get(filePath);
			if (cached) {
				return cached;
			}
		}

		// Extract and parse classes
		const classNames = extractClasses(content, filePath, customExtractors);
		const parsed = classNames
			.map(parseUtilityClass)
			.filter((p): p is ParsedUtility => p !== null);

		const result: FileScanResult = {
			path: filePath,
			classes: new Set(classNames),
			parsed,
			lastScanned: Date.now(),
		};

		// Update cache
		cache.set(filePath, result, contentHash);

		return result;
	}

	/**
	 * Scan content string directly without file I/O.
	 */
	function scanContent(content: string, filePath = "inline"): ParsedUtility[] {
		const classNames = extractClasses(content, filePath, customExtractors);
		return classNames
			.map(parseUtilityClass)
			.filter((p): p is ParsedUtility => p !== null);
	}

	/**
	 * Scan all content files.
	 */
	async function scan(): Promise<ScanResult> {
		const filePaths = await getFilePaths();
		const files = new Map<string, FileScanResult>();
		const allClasses = new Set<string>();
		const allParsed: ParsedUtility[] = [];

		// Scan files in parallel
		const results = await Promise.all(
			filePaths.map(async (filePath) => {
				try {
					return await scanFile(filePath);
				} catch (error) {
					// Log error but continue scanning other files
					console.warn(
						`[styleframe/scanner] Failed to scan ${filePath}:`,
						error,
					);
					return null;
				}
			}),
		);

		// Aggregate results
		for (const result of results) {
			if (result) {
				files.set(result.path, result);
				for (const className of result.classes) {
					allClasses.add(className);
				}
				allParsed.push(...result.parsed);
			}
		}

		return {
			files,
			allClasses,
			allParsed,
		};
	}

	/**
	 * Match parsed utilities against a root instance.
	 */
	function match(parsed: ParsedUtility[], root: Root): UtilityMatch[] {
		return matchUtilities(parsed, root);
	}

	/**
	 * Set up file watching with a callback.
	 *
	 * Note: This returns a change handler that should be integrated
	 * with an external file watcher (e.g., Vite's HMR or chokidar).
	 */
	function watch(callback: (result: ScanResult) => void): () => void {
		const { onChange, flush } = createChangeHandler(async (changedFiles) => {
			// Invalidate changed files in cache
			for (const filePath of changedFiles) {
				cache.invalidate(filePath);
			}

			// Re-scan all files and notify
			const result = await scan();
			callback(result);
		});

		// Return cleanup function
		// Note: The actual file watcher setup should be done externally
		return () => {
			flush();
		};
	}

	/**
	 * Invalidate cache for a file or all files.
	 */
	function invalidate(filePath?: string): void {
		if (filePath) {
			cache.invalidate(filePath);
		} else {
			cache.clear();
		}
	}

	return {
		scan,
		scanFile,
		scanContent,
		match,
		watch,
		invalidate,
	};
}

/**
 * Quick utility to scan content and get parsed utilities.
 *
 * @param content Content string to scan
 * @param filePath Optional file path hint for extractor selection
 * @returns Array of parsed utilities
 */
export function quickScan(
	content: string,
	filePath = "inline.html",
): ParsedUtility[] {
	const classNames = extractClasses(content, filePath);
	return classNames
		.map(parseUtilityClass)
		.filter((p): p is ParsedUtility => p !== null);
}

/**
 * Create a scanner that only scans specific content.
 *
 * Useful for testing or one-off scans.
 */
export function createContentScanner(
	customExtractors?: Extractor[],
): (content: string, filePath?: string) => ParsedUtility[] {
	return (content: string, filePath = "inline"): ParsedUtility[] => {
		const classNames = extractClasses(content, filePath, customExtractors);
		return classNames
			.map(parseUtilityClass)
			.filter((p): p is ParsedUtility => p !== null);
	};
}
