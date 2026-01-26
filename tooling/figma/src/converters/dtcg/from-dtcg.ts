import type {
	FigmaExportFormat,
	FigmaExportVariable,
	FigmaVariableType,
	FigmaRGBA,
} from "../../types";
import type {
	DTCGDocument,
	DTCGToken,
	DTCGGroup,
	FromDTCGOptions,
	DTCGTokenType,
	DTCGTokenValue,
	DTCGAliasValue,
	DTCGModifierContext,
} from "./types";
import { isDTCGToken, isDTCGGroup, isDTCGAlias } from "./types";
import { dtcgTypeToFigma } from "./type-mapping";
import { parseAlias, dtcgPathToFigma } from "./alias-parsing";
import { cssColorToFigma, dimensionToPixels } from "../value-parsing";

/**
 * Convert DTCG format to FigmaExportFormat
 */
export function fromDTCG(
	doc: DTCGDocument,
	options: FromDTCGOptions = {},
): FigmaExportFormat {
	const {
		defaultModeName = "Default",
		collectionName,
		preferredModifier = "theme",
	} = options;

	// Detect format and extract modes
	const { modes } = extractModes(doc, defaultModeName, preferredModifier);

	const sfExtension = doc.$extensions?.["dev.styleframe"];
	const collection =
		collectionName || sfExtension?.collection || "Design Tokens";

	const variables: FigmaExportVariable[] = [];

	// Extract modifier overrides if present
	const modifierOverrides = extractModifierOverrides(doc, preferredModifier);

	// Walk the token tree
	walkTokens(
		doc,
		"",
		modes[0] || defaultModeName,
		(path, token, inheritedType) => {
			const variable = tokenToVariableWithModifiers(
				path,
				token,
				inheritedType,
				modes,
				modes[0] || defaultModeName,
				modifierOverrides,
			);
			if (variable) {
				variables.push(variable);
			}
		},
	);

	return {
		collection,
		modes,
		variables,
	};
}

/**
 * Walk all tokens in a DTCG document
 */
function walkTokens(
	node: DTCGGroup | DTCGDocument,
	parentPath: string,
	defaultModeName: string,
	callback: (
		path: string,
		token: DTCGToken,
		inheritedType?: DTCGTokenType,
	) => void,
	inheritedType?: DTCGTokenType,
): void {
	const currentType = (node.$type as DTCGTokenType) || inheritedType;

	for (const [key, value] of Object.entries(node)) {
		// Skip DTCG metadata properties
		if (key.startsWith("$")) continue;

		const path = parentPath ? `${parentPath}/${key}` : key;

		if (isDTCGToken(value)) {
			callback(path, value, currentType);
		} else if (isDTCGGroup(value)) {
			// It's a group, recurse
			walkTokens(value, path, defaultModeName, callback, currentType);
		}
	}
}

/**
 * Extract modes from document, preferring modifiers over legacy format
 */
function extractModes(
	doc: DTCGDocument,
	defaultModeName: string,
	preferredModifier: string,
): { modes: string[]; modeSource: "modifier" | "extension" | "default" } {
	// Check for modifier contexts first
	const modifier = doc.$modifiers?.[preferredModifier];
	if (modifier && modifier.contexts) {
		const contextNames = Object.keys(modifier.contexts);
		if (contextNames.length > 0) {
			// Get default mode from extension or use provided default
			const sfExtension = doc.$extensions?.["dev.styleframe"];
			const defaultMode =
				modifier.$default || sfExtension?.modes?.[0] || defaultModeName;
			// Combine default mode with context names (avoiding duplicates)
			const allModes = [
				defaultMode,
				...contextNames.filter((n) => n !== defaultMode),
			];
			return { modes: allModes, modeSource: "modifier" };
		}
	}

	// Fall back to legacy extension format
	const sfExtension = doc.$extensions?.["dev.styleframe"];
	if (sfExtension?.modes && sfExtension.modes.length > 0) {
		return { modes: sfExtension.modes, modeSource: "extension" };
	}

	return { modes: [defaultModeName], modeSource: "default" };
}

/**
 * Extract all modifier overrides into a lookup map
 * Returns: Map<tokenPath, Map<contextName, value>>
 */
function extractModifierOverrides(
	doc: DTCGDocument,
	preferredModifier: string,
): Map<string, Map<string, DTCGTokenValue>> {
	const overrides = new Map<string, Map<string, DTCGTokenValue>>();

	const modifier = doc.$modifiers?.[preferredModifier];
	if (!modifier?.contexts) return overrides;

	for (const [contextName, context] of Object.entries(modifier.contexts)) {
		walkModifierContext(context, "", (tokenPath, value) => {
			if (!overrides.has(tokenPath)) {
				overrides.set(tokenPath, new Map());
			}
			overrides.get(tokenPath)!.set(contextName, value);
		});
	}

	return overrides;
}

/**
 * Walk a modifier context to extract token overrides
 */
function walkModifierContext(
	context: DTCGModifierContext,
	parentPath: string,
	callback: (tokenPath: string, value: DTCGTokenValue) => void,
): void {
	for (const [key, value] of Object.entries(context)) {
		const path = parentPath ? `${parentPath}.${key}` : key;

		if (value && typeof value === "object" && "$value" in value) {
			// It's a token override
			callback(path, value.$value as DTCGTokenValue);
		} else if (value && typeof value === "object") {
			// It's a nested group, recurse
			walkModifierContext(value as DTCGModifierContext, path, callback);
		}
	}
}

/**
 * Convert a DTCG token to FigmaExportVariable, applying modifier overrides
 */
function tokenToVariableWithModifiers(
	path: string,
	token: DTCGToken,
	inheritedType: DTCGTokenType | undefined,
	modes: string[],
	defaultModeName: string,
	modifierOverrides: Map<string, Map<string, DTCGTokenValue>>,
): FigmaExportVariable | null {
	const type = token.$type || inheritedType || "string";
	const figmaType = dtcgTypeToFigma(type);

	// Check for alias
	const isAlias = isDTCGAlias(token.$value);
	let aliasTo: string | undefined;

	const values: Record<string, unknown> = {};

	if (isAlias) {
		// For aliases, store the resolved alias path
		aliasTo = parseAlias(token.$value as DTCGAliasValue);
		// Still need to provide a placeholder value for the default mode
		values[defaultModeName] = {
			type: "VARIABLE_ALIAS",
			id: dtcgPathToFigma(aliasTo),
		};
	} else {
		// Convert the default value
		const defaultValue = convertValueToFigma(token.$value, figmaType);
		values[defaultModeName] = defaultValue;

		// Apply modifier overrides (preferred)
		const tokenPath = path.replace(/\//g, ".");
		const pathOverrides = modifierOverrides.get(tokenPath);
		if (pathOverrides) {
			for (const [modeName, modeValue] of pathOverrides) {
				if (isDTCGAlias(modeValue)) {
					values[modeName] = {
						type: "VARIABLE_ALIAS",
						id: dtcgPathToFigma(parseAlias(modeValue as DTCGAliasValue)),
					};
				} else {
					values[modeName] = convertValueToFigma(modeValue, figmaType);
				}
			}
		}

		// Fall back to legacy extension format if no modifier overrides
		if (!pathOverrides || pathOverrides.size === 0) {
			const legacyModeOverrides = token.$extensions?.["dev.styleframe"]?.modes;
			if (legacyModeOverrides) {
				for (const [modeName, modeValue] of Object.entries(
					legacyModeOverrides,
				)) {
					if (isDTCGAlias(modeValue)) {
						values[modeName] = {
							type: "VARIABLE_ALIAS",
							id: dtcgPathToFigma(parseAlias(modeValue as DTCGAliasValue)),
						};
					} else {
						values[modeName] = convertValueToFigma(modeValue, figmaType);
					}
				}
			}
		}
	}

	// Convert path from slash to dot notation for styleframeName
	const styleframeName = path.replace(/\//g, ".");

	return {
		name: path, // Keep slash notation for Figma
		styleframeName,
		type: figmaType,
		values: values as FigmaExportVariable["values"],
		aliasTo,
		description: token.$description,
	};
}

/**
 * Convert a DTCG value to Figma format
 */
function convertValueToFigma(
	value: DTCGTokenValue,
	figmaType: FigmaVariableType,
): FigmaRGBA | number | string | boolean {
	// Handle color values
	if (figmaType === "COLOR" && typeof value === "string") {
		const rgba = cssColorToFigma(value);
		if (rgba) return rgba;
	}

	// Handle FLOAT values (dimensions)
	if (figmaType === "FLOAT") {
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			const pixels = dimensionToPixels(value);
			if (pixels !== null) return pixels;
			// Try parsing as a number
			const num = Number.parseFloat(value);
			if (!Number.isNaN(num)) return num;
		}
	}

	// Handle boolean values
	if (figmaType === "BOOLEAN") {
		if (typeof value === "boolean") return value;
		if (value === "true") return true;
		if (value === "false") return false;
	}

	// Default: return as string
	return String(value);
}
