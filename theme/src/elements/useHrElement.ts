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
	hrBorderWidth: Variable<"hr.border-width">;
	hrBorderStyle: Variable<"hr.border-style">;
	hrMargin: Variable<"hr.margin">;
}

export function useHrElement(
	s: Styleframe,
	config: HrElementConfig = {},
): HrElementResult {
	const borderColor = config.borderColor ?? defaultHrValues.borderColor;
	const borderWidth = config.borderWidth ?? defaultHrValues.borderWidth;
	const borderStyle = config.borderStyle ?? defaultHrValues.borderStyle;
	const margin = config.margin ?? defaultHrValues.margin;

	const hrBorderColor = s.variable("hr.border-color", borderColor);
	const hrBorderWidth = s.variable("hr.border-width", borderWidth);
	const hrBorderStyle = s.variable("hr.border-style", borderStyle);
	const hrMargin = s.variable("hr.margin", margin);

	s.selector("hr", {
		borderTopWidth: s.ref(hrBorderWidth),
		borderTopStyle: s.ref(hrBorderStyle),
		borderTopColor: s.ref(hrBorderColor),
		borderRightWidth: "0",
		borderBottomWidth: "0",
		borderLeftWidth: "0",
		marginTop: s.ref(hrMargin),
		marginBottom: s.ref(hrMargin),
		marginLeft: "0",
		marginRight: "0",
	});

	return { hrBorderColor, hrBorderWidth, hrBorderStyle, hrMargin };
}
