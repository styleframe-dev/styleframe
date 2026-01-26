import type { ScanResult } from "./types";

/**
 * Callback type for file change events
 */
export type WatchCallback = (result: ScanResult) => void;

/**
 * Options for creating a watcher
 */
export interface WatcherOptions {
	/** Debounce time in milliseconds (default: 100) */
	debounce?: number;
}

/**
 * Simple debounce utility
 */
export function debounce<T extends (...args: unknown[]) => void>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
			timeoutId = null;
		}, delay);
	};
}

/**
 * Create a file change handler with debouncing.
 *
 * This is a utility for integrating with external file watchers.
 * The actual file watching should be done at the plugin level
 * using Vite's HMR or chokidar.
 *
 * @param callback Function to call when files change
 * @param options Watcher options
 * @returns A debounced change handler
 */
export function createChangeHandler(
	callback: (changedFiles: string[]) => void,
	options: WatcherOptions = {},
): {
	onChange: (filePath: string) => void;
	flush: () => void;
} {
	const { debounce: debounceMs = 100 } = options;
	const changedFiles = new Set<string>();
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const flush = () => {
		if (changedFiles.size > 0) {
			const files = [...changedFiles];
			changedFiles.clear();
			callback(files);
		}
	};

	const onChange = (filePath: string) => {
		changedFiles.add(filePath);

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			flush();
			timeoutId = null;
		}, debounceMs);
	};

	return { onChange, flush };
}

/**
 * Escape special regex characters in a string.
 * Escapes: . + ^ $ { } ( ) | [ ] \
 */
function escapeRegexChars(str: string): string {
	return str.replace(/[.+^${}()|[\]\\]/g, "\\$&");
}

/**
 * Convert a glob pattern to a regex string.
 * Handles **, *, and ? wildcards.
 */
function globToRegex(pattern: string): string {
	// Replace glob wildcards with placeholders, escape regex chars, then restore as regex equivalents
	return pattern
		.replace(/\*\*/g, "<<<GLOBSTAR>>>")
		.replace(/\*/g, "<<<STAR>>>")
		.replace(/\?/g, "<<<QUESTION>>>")
		.split("<<<GLOBSTAR>>>")
		.map(escapeRegexChars)
		.join(".*")
		.replace(/<<<STAR>>>/g, "[^/]*")
		.replace(/<<<QUESTION>>>/g, ".");
}

/**
 * Check if a file path matches any of the given glob patterns.
 *
 * This is a simple check that looks for common pattern matches.
 * For full glob support, use a library like micromatch.
 */
export function matchesPatterns(filePath: string, patterns: string[]): boolean {
	const normalizedPath = filePath.replace(/\\/g, "/");

	for (const pattern of patterns) {
		const normalizedPattern = pattern.replace(/\\/g, "/");

		// Simple glob matching:
		// - ** matches any path segments
		// - * matches any characters within a segment
		// - Exact match

		if (
			normalizedPattern.includes("**") ||
			normalizedPattern.includes("*") ||
			normalizedPattern.includes("?")
		) {
			const regexStr = globToRegex(normalizedPattern);
			const regex = new RegExp(`^${regexStr}$`);
			if (regex.test(normalizedPath)) {
				return true;
			}
		} else if (normalizedPath === normalizedPattern) {
			return true;
		}
	}

	return false;
}
