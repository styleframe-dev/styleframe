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
