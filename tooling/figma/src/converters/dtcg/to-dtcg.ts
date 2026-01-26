import type {
	FigmaExportFormat,
	FigmaExportVariable,
	FigmaRGBA,
} from "../../types";
import type {
	DTCGDocument,
	DTCGToken,
	DTCGGroup,
	ToDTCGOptions,
	DTCGTokenValue,
	DTCGModifierContext,
} from "./types";
import { figmaTypeToDTCG } from "./type-mapping";
import { createAlias, figmaPathToDTCG, getPathSegments } from "./alias-parsing";
import { figmaColorToCss } from "../value-parsing";

const DTCG_SCHEMA_URL =
	"https://design-tokens.github.io/community-group/format/";

/**
 * Convert FigmaExportFormat to DTCG format
 */
export function toDTCG(
	data: FigmaExportFormat,
	options: ToDTCGOptions = {},
): DTCGDocument {
	const {
		includeSchema = true,
		schemaUrl = DTCG_SCHEMA_URL,
		useModifiers = true,
		themeNames,
	} = options;

	const doc: DTCGDocument = {};

	if (includeSchema) {
		doc.$schema = schemaUrl;
	}

	// Store collection and modes in extensions
	doc.$extensions = {
		"dev.styleframe": {
			collection: data.collection,
			modes: data.modes,
		},
	};

	const defaultMode = data.modes[0] || "Default";

	// Determine which modes are themes
	// If themeNames is provided, only use those modes as themes
	// Otherwise, all non-default modes are treated as themes
	const themeModes = themeNames
		? data.modes.filter((m) => themeNames.includes(m) && m !== defaultMode)
		: data.modes.slice(1);

	// Track mode overrides for modifiers: Map<modeName, Map<tokenPath, value>>
	const modeOverrides = new Map<string, Map<string, DTCGTokenValue>>();
	for (const mode of themeModes) {
		modeOverrides.set(mode, new Map());
	}

	// Build the token tree
	for (const variable of data.variables) {
		const { token, overrides } = variableToTokenWithOverrides(
			variable,
			data.modes,
			useModifiers,
			themeModes,
		);
		setNestedToken(doc, variable.name, token);

		// Collect overrides for each theme mode (only when using modifiers)
		if (useModifiers) {
			for (const [modeName, value] of overrides) {
				const modeMap = modeOverrides.get(modeName);
				if (modeMap) {
					const tokenPath = figmaPathToDTCG(variable.name);
					modeMap.set(tokenPath, value);
				}
			}
		}
	}

	// Generate $modifiers section if there are theme modes with overrides
	if (useModifiers && themeModes.length > 0 && hasAnyOverrides(modeOverrides)) {
		doc.$modifiers = {
			theme: {
				$type: "modifier",
				contexts: buildModifierContexts(modeOverrides),
			},
		};
	}

	return doc;
}

/**
 * Convert a single Figma variable to a DTCG token, returning overrides separately
 */
function variableToTokenWithOverrides(
	variable: FigmaExportVariable,
	modes: string[],
	useModifiers: boolean,
	themeModes: string[],
): { token: DTCGToken; overrides: Map<string, DTCGTokenValue> } {
	const defaultMode = modes[0] || "Default";
	const defaultValue = variable.values[defaultMode];
	const dtcgType = figmaTypeToDTCG(variable.type);
	const overrides = new Map<string, DTCGTokenValue>();

	// Handle alias
	if (variable.aliasTo) {
		const token: DTCGToken = {
			$value: createAlias(variable.aliasTo),
			$type: dtcgType,
		};

		if (variable.description) {
			token.$description = variable.description;
		}

		return { token, overrides };
	}

	// Convert the default value
	const $value = convertValueToDTCG(defaultValue, variable.type);

	const token: DTCGToken = {
		$value,
		$type: dtcgType,
	};

	if (variable.description) {
		token.$description = variable.description;
	}

	// Handle multi-mode values
	if (modes.length > 1) {
		const modeValues: Record<string, DTCGTokenValue> = {};
		let hasModeOverrides = false;

		for (const mode of modes) {
			if (mode === defaultMode) continue;

			const modeValue = variable.values[mode];
			if (modeValue !== undefined) {
				const convertedValue = convertValueToDTCG(modeValue, variable.type);

				// Only include if value differs from default
				if (convertedValue !== $value) {
					// Check if this mode is a theme mode
					const isThemeMode = themeModes.includes(mode);

					if (useModifiers && isThemeMode) {
						// Store in overrides map for $modifiers section
						overrides.set(mode, convertedValue);
					} else if (!useModifiers || !isThemeMode) {
						// Legacy: store in token extensions for non-theme modes
						// or when not using modifiers
						modeValues[mode] = convertedValue;
						hasModeOverrides = true;
					}
				}
			}
		}

		// Only add extensions if there are non-theme mode overrides
		if (hasModeOverrides) {
			token.$extensions = {
				"dev.styleframe": {
					modes: modeValues,
				},
			};
		}
	}

	return { token, overrides };
}

/**
 * Convert a Figma value to DTCG format
 */
function convertValueToDTCG(value: unknown, type: string): DTCGTokenValue {
	// Handle color values (FigmaRGBA)
	if (
		type === "COLOR" &&
		typeof value === "object" &&
		value !== null &&
		"r" in value
	) {
		return figmaColorToCss(value as FigmaRGBA);
	}

	// Handle FLOAT values - convert to dimension string
	if (type === "FLOAT" && typeof value === "number") {
		return `${value}px`;
	}

	// Handle boolean values - convert to string
	if (typeof value === "boolean") {
		return value.toString();
	}

	// Default: return as string
	return String(value);
}

/**
 * Set a token at a nested path in the document
 * @example "color/primary" creates { color: { primary: token } }
 */
function setNestedToken(
	doc: DTCGDocument,
	path: string,
	token: DTCGToken,
): void {
	const segments = getPathSegments(path);

	// Navigate to the parent group, creating groups as needed
	let current: DTCGGroup = doc as DTCGGroup;

	for (let i = 0; i < segments.length - 1; i++) {
		const segment = segments[i]!;

		// Skip reserved $ prefixed keys when checking
		if (!current[segment] || typeof current[segment] !== "object") {
			current[segment] = {} as DTCGGroup;
		}

		current = current[segment] as DTCGGroup;
	}

	// Set the token at the leaf
	const leafKey = segments[segments.length - 1]!;
	current[leafKey] = token;
}

/**
 * Check if any mode has overrides
 */
function hasAnyOverrides(
	modeOverrides: Map<string, Map<string, DTCGTokenValue>>,
): boolean {
	for (const overrides of modeOverrides.values()) {
		if (overrides.size > 0) return true;
	}
	return false;
}

/**
 * Build modifier contexts from collected overrides
 */
function buildModifierContexts(
	modeOverrides: Map<string, Map<string, DTCGTokenValue>>,
): Record<string, DTCGModifierContext> {
	const contexts: Record<string, DTCGModifierContext> = {};

	for (const [modeName, tokenOverrides] of modeOverrides) {
		if (tokenOverrides.size === 0) continue;

		const context: DTCGModifierContext = {};
		for (const [tokenPath, value] of tokenOverrides) {
			// Set nested path in context (e.g., "color.background" -> { color: { background: { $value } } })
			setNestedValue(context, tokenPath, { $value: value });
		}
		contexts[modeName] = context;
	}

	return contexts;
}

/**
 * Set a value at a nested path using dot notation
 */
function setNestedValue(
	obj: DTCGModifierContext,
	path: string,
	value: { $value: DTCGTokenValue },
): void {
	const segments = path.split(".");
	let current = obj;

	for (let i = 0; i < segments.length - 1; i++) {
		const segment = segments[i]!;
		if (
			!current[segment] ||
			typeof current[segment] !== "object" ||
			"$value" in current[segment]
		) {
			current[segment] = {};
		}
		current = current[segment] as DTCGModifierContext;
	}

	current[segments[segments.length - 1]!] = value;
}
