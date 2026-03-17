import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultSampConfig = {
	fontFamily: "@font-family.mono",
} as const;

export interface SampElementConfig {
	fontFamily?: TokenValue;
}

export interface SampElementResult {
	sampFontFamily: Variable<"samp.font-family">;
}

export function useSampDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: SampElementConfig = {},
): Partial<SampElementResult> {
	const result: Partial<SampElementResult> = {};

	if (config.fontFamily !== undefined)
		result.sampFontFamily = ctx.variable("samp.font-family", config.fontFamily);

	return result;
}

export function useSampSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<SampElementConfig>,
): SampElementResult {
	const result = useSampDesignTokens(ctx, config) as SampElementResult;

	ctx.selector("samp", {
		fontFamily: ctx.ref(result.sampFontFamily),
	});

	return result;
}

export function useSampElement(
	s: Styleframe,
	config: SampElementConfig = {},
): SampElementResult {
	return useSampSelectors(s, {
		fontFamily: config.fontFamily ?? defaultSampConfig.fontFamily,
	});
}
