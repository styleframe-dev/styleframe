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
	const { defaultModeName = "Default", collectionName } = options;

	// Extract modes from extensions or use default
	const sfExtension = doc.$extensions?.["dev.styleframe"];
	const modes = sfExtension?.modes || [defaultModeName];
	const collection =
		collectionName || sfExtension?.collection || "Design Tokens";

	const variables: FigmaExportVariable[] = [];

	// Walk the token tree
	walkTokens(
		doc,
		"",
		modes[0] || defaultModeName,
		(path, token, inheritedType) => {
			const variable = tokenToVariable(
				path,
				token,
				inheritedType,
				modes,
				modes[0] || defaultModeName,
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
 * Convert a DTCG token to FigmaExportVariable
 */
function tokenToVariable(
	path: string,
	token: DTCGToken,
	inheritedType: DTCGTokenType | undefined,
	modes: string[],
	defaultModeName: string,
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
		values[defaultModeName] = convertValueToFigma(token.$value, figmaType);
	}

	// Handle mode overrides from extensions
	const modeOverrides = token.$extensions?.["dev.styleframe"]?.modes;
	if (modeOverrides) {
		for (const [modeName, modeValue] of Object.entries(modeOverrides)) {
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
