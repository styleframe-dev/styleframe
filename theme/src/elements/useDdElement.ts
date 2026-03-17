import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultDdConfig = {
	marginBottom: "@spacing.xs",
	marginLeft: "0",
} as const;

export interface DdElementConfig {
	marginBottom?: TokenValue;
	marginLeft?: TokenValue;
}

export interface DdElementResult {
	ddMarginBottom: Variable<"dd.margin-bottom">;
	ddMarginLeft: Variable<"dd.margin-left">;
}

export function useDdDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: DdElementConfig = {},
): Partial<DdElementResult> {
	const result: Partial<DdElementResult> = {};

	if (config.marginBottom !== undefined)
		result.ddMarginBottom = ctx.variable(
			"dd.margin-bottom",
			config.marginBottom,
		);
	if (config.marginLeft !== undefined)
		result.ddMarginLeft = ctx.variable("dd.margin-left", config.marginLeft);

	return result;
}

export function useDdSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<DdElementConfig>,
): DdElementResult {
	const result = useDdDesignTokens(ctx, config) as DdElementResult;

	ctx.selector("dd", {
		marginBottom: ctx.ref(result.ddMarginBottom),
		marginLeft: ctx.ref(result.ddMarginLeft),
	});

	return result;
}

export function useDdElement(
	s: Styleframe,
	config: DdElementConfig = {},
): DdElementResult {
	return useDdSelectors(s, {
		marginBottom: config.marginBottom ?? defaultDdConfig.marginBottom,
		marginLeft: config.marginLeft ?? defaultDdConfig.marginLeft,
	});
}
