import type { FigmaVariableType } from "../../types";
import type { DTCGTokenType } from "./types";

/**
 * Map Figma variable types to DTCG types
 */
export function figmaTypeToDTCG(figmaType: FigmaVariableType): DTCGTokenType {
	switch (figmaType) {
		case "COLOR":
			return "color";
		case "FLOAT":
			return "dimension";
		case "STRING":
			return "string";
		case "BOOLEAN":
			return "string"; // DTCG has no boolean type
		default:
			return "string";
	}
}

/**
 * Map DTCG types to Figma variable types
 */
export function dtcgTypeToFigma(dtcgType: DTCGTokenType): FigmaVariableType {
	switch (dtcgType) {
		case "color":
			return "COLOR";
		case "dimension":
		case "number":
		case "fontWeight":
		case "duration":
			return "FLOAT";
		case "fontFamily":
		case "string":
			return "STRING";
		case "cubicBezier":
			return "STRING"; // Serialize as string
		default:
			return "STRING";
	}
}

/**
 * Detect DTCG type from a value
 */
export function detectDTCGType(value: unknown): DTCGTokenType {
	if (typeof value === "number") return "number";

	if (typeof value === "string") {
		// Check for color formats
		if (
			value.startsWith("#") ||
			value.startsWith("rgb") ||
			value.startsWith("hsl") ||
			value.startsWith("oklch") ||
			value.startsWith("oklab")
		) {
			return "color";
		}

		// Check for dimension formats
		if (/^-?\d*\.?\d+(px|rem|em|%|vh|vw|vmin|vmax|ch)$/.test(value)) {
			return "dimension";
		}

		// Check for duration formats
		if (/^\d*\.?\d+(ms|s)$/.test(value)) {
			return "duration";
		}
	}

	if (Array.isArray(value) && value.length === 4) {
		// Could be cubic bezier
		if (value.every((v) => typeof v === "number")) {
			return "cubicBezier";
		}
	}

	return "string";
}
