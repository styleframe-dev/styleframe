import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultBodyConfig = {
	color: "#1e293b",
	background: "#ffffff",
	fontFamily: "@font-family",
	fontSize: "@font-size",
	lineHeight: "@line-height",
} as const;

export interface BodyElementConfig {
	color?: string;
	background?: string;
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
	lineHeight?: TokenValue;
}

export interface BodyElementResult {
	bodyColor: Variable<"body.color">;
	bodyBackground: Variable<"body.background">;
	bodyFontFamily: Variable<"body.font-family">;
	bodyFontSize: Variable<"body.font-size">;
	bodyLineHeight: Variable<"body.line-height">;
}

export function useBodyDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: BodyElementConfig = {},
): Partial<BodyElementResult> {
	const result: Partial<BodyElementResult> = {};

	if (config.color !== undefined)
		result.bodyColor = ctx.variable("body.color", config.color);
	if (config.background !== undefined)
		result.bodyBackground = ctx.variable("body.background", config.background);
	if (config.fontFamily !== undefined)
		result.bodyFontFamily = ctx.variable("body.font-family", config.fontFamily);
	if (config.fontSize !== undefined)
		result.bodyFontSize = ctx.variable("body.font-size", config.fontSize);
	if (config.lineHeight !== undefined)
		result.bodyLineHeight = ctx.variable("body.line-height", config.lineHeight);

	return result;
}

export function useBodySelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<BodyElementConfig>,
): BodyElementResult {
	const result = useBodyDesignTokens(ctx, config) as BodyElementResult;

	ctx.selector("body", {
		fontFamily: ctx.ref(result.bodyFontFamily),
		fontSize: ctx.ref(result.bodyFontSize),
		lineHeight: ctx.ref(result.bodyLineHeight),
		color: ctx.ref(result.bodyColor),
		background: ctx.ref(result.bodyBackground),
		"-webkit-font-smoothing": "antialiased",
		"-moz-osx-font-smoothing": "grayscale",
	});

	return result;
}

export function useBodyElement(
	s: Styleframe,
	config: BodyElementConfig = {},
): BodyElementResult {
	return useBodySelectors(s, {
		color: config.color ?? defaultBodyConfig.color,
		background: config.background ?? defaultBodyConfig.background,
		fontFamily: config.fontFamily ?? defaultBodyConfig.fontFamily,
		fontSize: config.fontSize ?? defaultBodyConfig.fontSize,
		lineHeight: config.lineHeight ?? defaultBodyConfig.lineHeight,
	});
}
