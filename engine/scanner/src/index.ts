// Core scanner
export { createScanner, quickScan, createContentScanner } from "./scanner";

// Parser
export {
	parseUtilityClass,
	extractUtilityClasses,
	generateUtilityClassName,
} from "./parser";

// Extractor
export {
	extractClasses,
	extractFromHTML,
	extractFromJSX,
	extractFromVue,
	extractFromSvelte,
	extractFromAstro,
	extractFromMDX,
	extractFromStringLiterals,
} from "./extractor";

// Matcher
export {
	matchUtilities,
	generateUtilitySelector,
	classNameFromUtilityOptions,
	createUtilityFilter,
	filterUtilities,
	getUsedClassNames,
	getValidMatches,
	getExistingMatches,
	getArbitraryMatches,
} from "./matcher";

// Cache
export { createCache, hashContent } from "./cache";

// Watcher utilities
export { createChangeHandler, debounce, matchesPatterns } from "./watcher";

// Constants
export {
	UTILITY_CLASS_PATTERN,
	ARBITRARY_VALUE_PATTERN,
	DEFAULT_EXTENSIONS,
	DEFAULT_IGNORE_PATTERNS,
} from "./constants";

// Types
export type {
	Scanner,
	ScannerConfig,
	ScanResult,
	FileScanResult,
	ParsedUtility,
	UtilityMatch,
	Extractor,
	ScannerCache,
	CacheEntry,
	UtilitySelectorOptions,
	UtilityFilterFn,
} from "./types";

export type { WatchCallback, WatcherOptions } from "./watcher";
