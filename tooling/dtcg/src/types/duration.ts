/**
 * DTCG duration types. Format Module §6.5.
 */

export type DTCGDurationUnit = "ms" | "s";

export interface DTCGDuration {
	value: number;
	unit: DTCGDurationUnit;
}
