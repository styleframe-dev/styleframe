import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultDtConfig = {
	fontWeight: "@font-weight.bold",
} as const;

export interface DtElementConfig {
	fontWeight?: TokenValue;
}

export interface DtElementResult {
	dtFontWeight: Variable<"dt.font-weight">;
}

export function useDtDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: DtElementConfig = {},
): Partial<DtElementResult> {
	const result: Partial<DtElementResult> = {};

	if (config.fontWeight !== undefined)
		result.dtFontWeight = ctx.variable("dt.font-weight", config.fontWeight);

	return result;
}

export function useDtSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<DtElementConfig>,
): DtElementResult {
	const result = useDtDesignTokens(ctx, config) as DtElementResult;

	ctx.selector("dt", {
		fontWeight: ctx.ref(result.dtFontWeight),
	});

	return result;
}

export function useDtElement(
	s: Styleframe,
	config: DtElementConfig = {},
): DtElementResult {
	return useDtSelectors(s, {
		fontWeight: config.fontWeight ?? defaultDtConfig.fontWeight,
	});
}
