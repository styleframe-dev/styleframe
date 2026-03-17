import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultPreConfig = {
	fontFamily: "@font-family.mono",
	fontSize: "0.875em",
	marginBottom: "@spacing",
} as const;

export interface PreElementConfig {
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
	marginBottom?: TokenValue;
}

export interface PreElementResult {
	preFontFamily: Variable<"pre.font-family">;
	preFontSize: Variable<"pre.font-size">;
	preMarginBottom: Variable<"pre.margin-bottom">;
}

export function usePreDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: PreElementConfig = {},
): Partial<PreElementResult> {
	const result: Partial<PreElementResult> = {};

	if (config.fontFamily !== undefined)
		result.preFontFamily = ctx.variable("pre.font-family", config.fontFamily);
	if (config.fontSize !== undefined)
		result.preFontSize = ctx.variable("pre.font-size", config.fontSize);
	if (config.marginBottom !== undefined)
		result.preMarginBottom = ctx.variable(
			"pre.margin-bottom",
			config.marginBottom,
		);

	return result;
}

export function usePreSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<PreElementConfig>,
): PreElementResult {
	const result = usePreDesignTokens(ctx, config) as PreElementResult;

	ctx.selector("pre", {
		fontFamily: ctx.ref(result.preFontFamily),
		fontSize: ctx.ref(result.preFontSize),
		display: "block",
		overflowX: "auto",
		marginTop: "0",
		marginBottom: ctx.ref(result.preMarginBottom),
		"& > code": {
			background: "transparent",
			color: "inherit",
			fontSize: "inherit",
		},
	});

	return result;
}

export function usePreElement(
	s: Styleframe,
	config: PreElementConfig = {},
): PreElementResult {
	return usePreSelectors(s, {
		fontFamily: config.fontFamily ?? defaultPreConfig.fontFamily,
		fontSize: config.fontSize ?? defaultPreConfig.fontSize,
		marginBottom: config.marginBottom ?? defaultPreConfig.marginBottom,
	});
}
