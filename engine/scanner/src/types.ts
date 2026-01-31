import type {
	ModifierFactory,
	Root,
	Utility,
	UtilityFactory,
} from "@styleframe/core";

/**
 * Configuration for the content scanner
 */
export interface ScannerConfig {
	/** Glob patterns for files to scan */
	content: string[];
	/** Custom extraction functions */
	extractors?: Extractor[];
	/** Base directory for glob resolution (defaults to process.cwd()) */
	cwd?: string;
}

/**
 * Parsed utility class structure
 */
export interface ParsedUtility {
	/** Original class name as found in content (e.g., "_margin:sm") */
	raw: string;
	/** Utility name (e.g., "margin", "background") */
	name: string;
	/** Value key (e.g., "sm", "primary", "[16px]") */
	value: string;
	/** Applied modifiers in order (e.g., ["hover", "dark"]) */
	modifiers: string[];
	/** Whether this uses arbitrary value syntax [value] */
	isArbitrary: boolean;
	/** The arbitrary value if isArbitrary is true (e.g., "16px") */
	arbitraryValue?: string;
}

/**
 * Match result between a parsed class and a utility factory
 */
export interface UtilityMatch {
	/** The parsed utility class */
	parsed: ParsedUtility;
	/** The matched utility factory, or null if not found */
	factory: UtilityFactory | null;
	/** Matched modifier factories */
	modifierFactories: ModifierFactory[];
	/** Whether the utility value exists in the factory */
	exists: boolean;
}

/**
 * Scan result for a single file
 */
export interface FileScanResult {
	/** Absolute file path */
	path: string;
	/** Set of raw class names found */
	classes: Set<string>;
	/** Parsed utility classes */
	parsed: ParsedUtility[];
	/** Timestamp of last scan */
	lastScanned: number;
}

/**
 * Complete scan result across all files
 */
export interface ScanResult {
	/** Map of file path to scan result */
	files: Map<string, FileScanResult>;
	/** All unique class names found */
	allClasses: Set<string>;
	/** All parsed utilities */
	allParsed: ParsedUtility[];
}

/**
 * Custom extractor function type
 */
export type Extractor = (content: string, filePath: string) => string[];

/**
 * Cache entry for a scanned file
 */
export interface CacheEntry {
	/** Content hash for change detection */
	hash: string;
	/** Cached scan result */
	result: FileScanResult;
	/** Cache timestamp */
	timestamp: number;
}

/**
 * Scanner cache interface
 */
export interface ScannerCache {
	/** Get cached result for a file */
	get(filePath: string): FileScanResult | null;
	/** Cache a scan result */
	set(filePath: string, result: FileScanResult, contentHash: string): void;
	/** Check if a file has valid cache */
	isValid(filePath: string, contentHash: string): boolean;
	/** Get cached result if valid, null otherwise (single lookup) */
	getIfValid(filePath: string, contentHash: string): FileScanResult | null;
	/** Invalidate cache for a file */
	invalidate(filePath: string): void;
	/** Clear all cache entries */
	clear(): void;
}

/**
 * Scanner instance interface
 */
export interface Scanner {
	/** Scan all content files */
	scan(): Promise<ScanResult>;
	/** Scan a single file */
	scanFile(filePath: string): Promise<FileScanResult>;
	/** Scan content string directly */
	scanContent(content: string, filePath?: string): ParsedUtility[];
	/** Match parsed utilities against a root instance */
	match(parsed: ParsedUtility[], root: Root): UtilityMatch[];
	/** Start watching content files for changes */
	watch(callback: (result: ScanResult) => void): () => void;
	/** Invalidate cache for a file or all files */
	invalidate(filePath?: string): void;
}

/**
 * Utility selector generation options
 */
export interface UtilitySelectorOptions {
	name: string;
	value: string;
	modifiers: string[];
}

/**
 * Filter function for utilities
 */
export type UtilityFilterFn = (utility: Utility) => boolean;
