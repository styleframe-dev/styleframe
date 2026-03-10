import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultHrValues = {
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
}

export function useHrElement(
	s: Styleframe,
	config: HrElementConfig = {},
): HrElementResult {
	const borderColor = config.borderColor ?? defaultHrValues.borderColor;
	const hrBorderColor = s.variable("hr.border-color", borderColor);

	s.selector("hr", {
		borderWidth: "0",
		borderTopWidth: config.borderWidth ?? defaultHrValues.borderWidth,
		borderTopStyle: config.borderStyle ?? defaultHrValues.borderStyle,
		borderTopColor: s.ref(hrBorderColor),
		marginTop: config.margin ?? defaultHrValues.margin,
		marginBottom: config.margin ?? defaultHrValues.margin,
		marginLeft: "0",
		marginRight: "0",
	});

	return { hrBorderColor };
}
