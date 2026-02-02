import type { Options } from "./types";

export const DEFAULT_ENTRY = "./styleframe.config.ts";

export const DEFAULT_OPTIONS: Options = {
	entry: DEFAULT_ENTRY,
	silent: false,
};

export const PLUGIN_NAME = "styleframe";
export const IMPORT_V_PREFIX = "virtual:"; // Vite "virtual" module id prefix
export const ROLLUP_V_PREFIX = "\0"; // Rollup "virtual" id prefix

export const VIRTUAL_CSS_MODULE_ID = `${IMPORT_V_PREFIX}${PLUGIN_NAME}.css`;
export const RESOLVED_VIRTUAL_CSS_MODULE_ID = `${ROLLUP_V_PREFIX}${VIRTUAL_CSS_MODULE_ID}`;
export const VIRTUAL_TS_MODULE_ID = `${IMPORT_V_PREFIX}${PLUGIN_NAME}`;
export const RESOLVED_VIRTUAL_TS_MODULE_ID = `${ROLLUP_V_PREFIX}${VIRTUAL_TS_MODULE_ID}`;

// Two-faced virtual module resolution targets
export const RESOLVED_VIRTUAL_PROVIDER_ID = `${ROLLUP_V_PREFIX}${IMPORT_V_PREFIX}${PLUGIN_NAME}:provider`;
export const RESOLVED_VIRTUAL_CONSUMER_ID = `${ROLLUP_V_PREFIX}${IMPORT_V_PREFIX}${PLUGIN_NAME}:consumer`;

// Default ignore patterns for file discovery
export const DEFAULT_IGNORE_PATTERNS = [
	"**/node_modules/**",
	"**/.git/**",
	"**/dist/**",
	"**/build/**",
	"**/.next/**",
	"**/.nuxt/**",
	"**/coverage/**",
];
