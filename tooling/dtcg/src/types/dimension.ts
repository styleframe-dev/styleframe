/**
 * DTCG dimension types. Format Module §6.2.
 */

/**
 * Known dimension units. Arbitrary strings remain valid per the spec — the
 * `(string & {})` pattern preserves autocomplete for known units while still
 * accepting unknowns.
 */
export type DTCGDimensionUnit =
	| "px"
	| "rem"
	| "em"
	| "%"
	| "vh"
	| "vw"
	| "vmin"
	| "vmax"
	| "ch"
	| "ex"
	| "pt"
	| "pc"
	| "in"
	| "cm"
	| "mm"
	| "Q"
	| (string & {});

/**
 * Canonical DTCG dimension value.
 */
export interface DTCGDimension {
	value: number;
	unit: DTCGDimensionUnit;
}
