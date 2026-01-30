/**
 * DTCG (Design Tokens Community Group) format types
 * Based on W3C Draft: https://www.designtokens.org/tr/drafts/format/
 */

/**
 * DTCG token types as defined in W3C Draft
 */
export type DTCGTokenType =
	| "color"
	| "dimension"
	| "fontFamily"
	| "fontWeight"
	| "duration"
	| "cubicBezier"
	| "number"
	| "string";

/**
 * DTCG alias reference (e.g., "{color.primary}")
 */
export type DTCGAliasValue = `{${string}}`;

/**
 * Check if a value is a DTCG alias
 */
export function isDTCGAlias(value: unknown): value is DTCGAliasValue {
	return (
		typeof value === "string" && value.startsWith("{") && value.endsWith("}")
	);
}

/**
 * DTCG cubic bezier value
 */
export type DTCGCubicBezierValue = [number, number, number, number];

/**
 * DTCG token value types
 */
export type DTCGTokenValue =
	| string
	| number
	| boolean
	| DTCGCubicBezierValue
	| DTCGAliasValue;

/**
 * DTCG Modifier context - contains token overrides for a specific context
 * Token paths use dot notation (e.g., "color.background")
 */
export interface DTCGModifierContext {
	[tokenPath: string]: { $value: DTCGTokenValue } | DTCGModifierContext;
}

/**
 * DTCG Modifier definition
 * @see https://www.designtokens.org/tr/2025.10/
 */
export interface DTCGModifier {
	$type: "modifier";
	/** The default context name (optional) */
	$default?: string;
	/** Context definitions with token overrides */
	contexts: Record<string, DTCGModifierContext>;
}

/**
 * DTCG Modifiers section at document root
 */
export interface DTCGModifiers {
	theme?: DTCGModifier;
	[key: string]: DTCGModifier | undefined;
}

/**
 * Styleframe-specific extensions for DTCG format
 */
export interface DTCGStyleframeExtensions {
	/** Multi-mode values (key: mode name, value: token value) */
	modes?: Record<string, DTCGTokenValue>;
	/** Original Styleframe variable name */
	styleframeName?: string;
}

/**
 * Generic extensions object
 */
export interface DTCGExtensions {
	"dev.styleframe"?: DTCGStyleframeExtensions;
	[key: string]: unknown;
}

/**
 * Document-level Styleframe extensions
 */
export interface DTCGDocumentStyleframeExtensions {
	/** Collection name */
	collection?: string;
	/** Mode names (first is default) */
	modes?: string[];
}

/**
 * Document-level extensions
 */
export interface DTCGDocumentExtensions {
	"dev.styleframe"?: DTCGDocumentStyleframeExtensions;
	[key: string]: unknown;
}

/**
 * Base DTCG token interface
 */
export interface DTCGToken {
	$value: DTCGTokenValue;
	$type?: DTCGTokenType;
	$description?: string;
	$deprecated?: boolean | string;
	$extensions?: DTCGExtensions;
}

/**
 * DTCG group node (can contain tokens or nested groups)
 */
export interface DTCGGroup {
	$type?: DTCGTokenType;
	$description?: string;
	$extensions?: DTCGExtensions;
	[key: string]:
		| DTCGToken
		| DTCGGroup
		| DTCGTokenType
		| string
		| boolean
		| DTCGExtensions
		| undefined;
}

/**
 * Root DTCG document structure
 */
export interface DTCGDocument {
	$schema?: string;
	$description?: string;
	$extensions?: DTCGDocumentExtensions;
	$modifiers?: DTCGModifiers;
	[key: string]:
		| DTCGToken
		| DTCGGroup
		| DTCGModifiers
		| string
		| DTCGDocumentExtensions
		| undefined;
}

/**
 * Options for DTCG export
 */
export interface ToDTCGOptions {
	/** Include $schema field */
	includeSchema?: boolean;
	/** DTCG schema URL */
	schemaUrl?: string;
	/** Use DTCG modifier format for multi-mode values (default: true) */
	useModifiers?: boolean;
	/**
	 * Theme names from Styleframe configuration.
	 * When provided, only these modes will be used to generate $modifiers.theme.
	 * If not provided, all non-default modes are treated as themes.
	 */
	themeNames?: string[];
}

/**
 * Options for DTCG import
 */
export interface FromDTCGOptions {
	/** Default mode name when no modes extension is present */
	defaultModeName?: string;
	/** Collection name override */
	collectionName?: string;
	/** Preferred modifier to use for modes if multiple exist (default: "theme") */
	preferredModifier?: string;
}

/**
 * Type guard to check if a value is a DTCGToken (has $value property)
 */
export function isDTCGToken(value: unknown): value is DTCGToken {
	return typeof value === "object" && value !== null && "$value" in value;
}

/**
 * Type guard to check if a value is a DTCGGroup (object without $value)
 */
export function isDTCGGroup(value: unknown): value is DTCGGroup {
	return (
		typeof value === "object" &&
		value !== null &&
		!("$value" in value) &&
		!Array.isArray(value)
	);
}
