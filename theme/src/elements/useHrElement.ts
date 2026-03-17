import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultHrConfig = {
	borderWidth: "@border-width",
	borderStyle: "solid",
	borderColor: "@color.gray-200",
	margin: "@spacing.lg",
} as const;

export interface HrElementConfig {
	borderWidth?: TokenValue;
	borderStyle?: TokenValue;
	borderColor?: TokenValue;
	margin?: TokenValue;
}

export interface HrElementResult {
	hrBorderColor: Variable<"hr.border-color">;
	hrBorderWidth: Variable<"hr.border-width">;
	hrBorderStyle: Variable<"hr.border-style">;
	hrMargin: Variable<"hr.margin">;
}

export function useHrDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: HrElementConfig = {},
): Partial<HrElementResult> {
	const result: Partial<HrElementResult> = {};

	if (config.borderColor !== undefined)
		result.hrBorderColor = ctx.variable("hr.border-color", config.borderColor);
	if (config.borderWidth !== undefined)
		result.hrBorderWidth = ctx.variable("hr.border-width", config.borderWidth);
	if (config.borderStyle !== undefined)
		result.hrBorderStyle = ctx.variable("hr.border-style", config.borderStyle);
	if (config.margin !== undefined)
		result.hrMargin = ctx.variable("hr.margin", config.margin);

	return result;
}

export function useHrSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<HrElementConfig>,
): HrElementResult {
	const result = useHrDesignTokens(ctx, config) as HrElementResult;

	ctx.selector("hr", {
		borderTopWidth: ctx.ref(result.hrBorderWidth),
		borderTopStyle: ctx.ref(result.hrBorderStyle),
		borderTopColor: ctx.ref(result.hrBorderColor),
		borderRightWidth: "0",
		borderBottomWidth: "0",
		borderLeftWidth: "0",
		marginTop: ctx.ref(result.hrMargin),
		marginBottom: ctx.ref(result.hrMargin),
		marginLeft: "0",
		marginRight: "0",
	});

	return result;
}

export function useHrElement(
	s: Styleframe,
	config: HrElementConfig = {},
): HrElementResult {
	return useHrSelectors(s, {
		borderWidth: config.borderWidth ?? defaultHrConfig.borderWidth,
		borderStyle: config.borderStyle ?? defaultHrConfig.borderStyle,
		borderColor: config.borderColor ?? defaultHrConfig.borderColor,
		margin: config.margin ?? defaultHrConfig.margin,
	});
}
