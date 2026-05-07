/**
 * DTCG token, group, and document shapes. Format Module §2–§3.
 */

import type { DTCGExtensions } from "./extensions";
import type { DTCGTokenType, DTCGTokenValue, DTCGTokenValueOf } from "./values";

/**
 * `$deprecated` accepts a boolean (true = deprecated, no message) or a
 * string (deprecated with the given migration message).
 */
export type DTCGDeprecated = boolean | string;

/**
 * Reserved keys recognised on tokens, groups, and documents.
 */
export type DTCGMetadataKey =
	| "$value"
	| "$type"
	| "$description"
	| "$deprecated"
	| "$extensions"
	| "$schema"
	| "$modifiers"
	| "$root"
	| "$extends";

/**
 * A leaf token. Distinguished from a group by the presence of `$value`.
 */
export interface DTCGToken<T extends DTCGTokenType = DTCGTokenType> {
	$value: DTCGTokenValueOf<T>;
	$type?: T;
	$description?: string;
	$deprecated?: DTCGDeprecated;
	$extensions?: DTCGExtensions;
}

/**
 * Loose token shape used when the `$type` is not known at compile time
 * (i.e. when reading raw JSON).
 */
export interface DTCGAnyToken {
	$value: DTCGTokenValue;
	$type?: DTCGTokenType;
	$description?: string;
	$deprecated?: DTCGDeprecated;
	$extensions?: DTCGExtensions;
}

/**
 * A group is any object that does not have `$value`. Group-level metadata
 * propagates to descendants per the inheritance rules.
 */
export interface DTCGGroup {
	$type?: DTCGTokenType;
	$description?: string;
	$deprecated?: DTCGDeprecated;
	$extensions?: DTCGExtensions;
	[key: string]:
		| DTCGAnyToken
		| DTCGGroup
		| DTCGTokenType
		| string
		| boolean
		| DTCGExtensions
		| undefined;
}

/**
 * A complete `.tokens.json` document. The root is functionally a group.
 */
export interface DTCGDocument {
	$schema?: string;
	$description?: string;
	$extensions?: DTCGExtensions;
	[key: string]: DTCGAnyToken | DTCGGroup | string | DTCGExtensions | undefined;
}
