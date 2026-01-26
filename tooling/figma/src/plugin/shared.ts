import type { DTCGDocument, DTCGToken } from "../converters/dtcg/types";

/**
 * Check if data is in DTCG format (has tokens with $value properties or $modifiers)
 */
export function isDTCGFormat(data: unknown): data is DTCGDocument {
	if (typeof data !== "object" || data === null) return false;
	// DTCG format does NOT have collection/modes/variables at top level
	// It has nested groups with $value tokens
	const obj = data as Record<string, unknown>;
	if ("collection" in obj && "modes" in obj && "variables" in obj) {
		return false; // This is the old Figma format
	}
	// Check for $modifiers (DTCG modifier format indicator)
	if ("$modifiers" in obj) return true;
	// Check if it has any tokens with $value
	for (const [key, value] of Object.entries(obj)) {
		if (key.startsWith("$")) continue;
		if (typeof value === "object" && value !== null) {
			if ("$value" in value) return true;
			// Check nested groups
			for (const [, nested] of Object.entries(
				value as Record<string, unknown>,
			)) {
				if (
					typeof nested === "object" &&
					nested !== null &&
					"$value" in nested
				) {
					return true;
				}
			}
		}
	}
	return false;
}

export interface PreviewVariable {
	name: string;
	type: string;
}

/**
 * Extract preview variables from DTCG format
 */
export function extractDTCGVariables(
	doc: DTCGDocument,
	path = "",
	inheritedType?: string,
): PreviewVariable[] {
	const variables: PreviewVariable[] = [];
	const currentType = (doc.$type as string) || inheritedType;

	for (const [key, value] of Object.entries(doc)) {
		if (key.startsWith("$")) continue;
		if (typeof value !== "object" || value === null) continue;

		const currentPath = path ? `${path}/${key}` : key;

		if ("$value" in value) {
			// It's a token
			const token = value as DTCGToken;
			const type = token.$type || currentType || "string";
			variables.push({
				name: currentPath,
				type: type.toUpperCase(),
			});
		} else {
			// It's a group, recurse
			variables.push(
				...extractDTCGVariables(
					value as DTCGDocument,
					currentPath,
					currentType,
				),
			);
		}
	}

	return variables;
}
