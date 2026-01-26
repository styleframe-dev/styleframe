import type { CacheEntry, FileScanResult, ScannerCache } from "./types";

/**
 * Create a simple hash from content for change detection.
 * Uses a hash * 31 algorithm (similar to Java's String.hashCode),
 * combined with content length to reduce collision probability.
 */
export function hashContent(content: string): string {
	let hash = 0;
	for (let i = 0; i < content.length; i++) {
		const char = content.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	// Include content length to reduce collision probability
	// Two strings must have same hash AND same length to collide
	return `${hash.toString(16)}-${content.length}`;
}

/**
 * Create a scanner cache instance.
 *
 * The cache stores scan results keyed by file path and validates
 * entries using content hashing.
 */
export function createCache(): ScannerCache {
	const entries = new Map<string, CacheEntry>();

	return {
		get(filePath: string): FileScanResult | null {
			const entry = entries.get(filePath);
			return entry?.result ?? null;
		},

		set(filePath: string, result: FileScanResult, contentHash: string): void {
			entries.set(filePath, {
				hash: contentHash,
				result,
				timestamp: Date.now(),
			});
		},

		isValid(filePath: string, contentHash: string): boolean {
			const entry = entries.get(filePath);
			return entry !== undefined && entry.hash === contentHash;
		},

		invalidate(filePath: string): void {
			entries.delete(filePath);
		},

		clear(): void {
			entries.clear();
		},
	};
}
