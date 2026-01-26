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
	DTCGExtensions,
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
	const { includeSchema = true, schemaUrl = DTCG_SCHEMA_URL } = options;

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

	// Build the token tree
	for (const variable of data.variables) {
		const token = variableToToken(variable, data.modes);
		setNestedToken(doc, variable.name, token);
	}

	return doc;
}

/**
 * Convert a single Figma variable to a DTCG token
 */
function variableToToken(
	variable: FigmaExportVariable,
	modes: string[],
): DTCGToken {
	const defaultMode = modes[0] || "Default";
	const defaultValue = variable.values[defaultMode];
	const dtcgType = figmaTypeToDTCG(variable.type);

	// Handle alias
	if (variable.aliasTo) {
		const token: DTCGToken = {
			$value: createAlias(variable.aliasTo),
			$type: dtcgType,
		};

		if (variable.description) {
			token.$description = variable.description;
		}

		return token;
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
				modeValues[mode] = convertValueToDTCG(modeValue, variable.type);
				hasModeOverrides = true;
			}
		}

		if (hasModeOverrides) {
			token.$extensions = {
				"dev.styleframe": {
					modes: modeValues,
				},
			};
		}
	}

	return token;
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
