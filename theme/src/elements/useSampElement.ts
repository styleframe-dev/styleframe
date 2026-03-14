import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultSampValues = {
	fontFamily: "@font-family.mono",
} as const;

export interface SampElementConfig {
	fontFamily?: TokenValue;
}

export interface SampElementResult {
	sampFontFamily: Variable<"samp.font-family">;
}

export function useSampElement(
	s: Styleframe,
	config: SampElementConfig = {},
): SampElementResult {
	const fontFamily = config.fontFamily ?? defaultSampValues.fontFamily;

	const sampFontFamily = s.variable("samp.font-family", fontFamily);

	s.selector("samp", {
		fontFamily: s.ref(sampFontFamily),
	});

	return { sampFontFamily };
}
