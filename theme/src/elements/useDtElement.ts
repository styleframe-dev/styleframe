import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultDtValues = {
	fontWeight: "@font-weight.bold",
} as const;

export interface DtElementConfig {
	fontWeight?: TokenValue;
}

export interface DtElementResult {
	dtFontWeight: Variable<"dt.font-weight">;
}

export function useDtElement(
	s: Styleframe,
	config: DtElementConfig = {},
): DtElementResult {
	const fontWeight = config.fontWeight ?? defaultDtValues.fontWeight;

	const dtFontWeight = s.variable("dt.font-weight", fontWeight);

	s.selector("dt", {
		fontWeight: s.ref(dtFontWeight),
	});

	return { dtFontWeight };
}
