import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultDdValues = {
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

export function useDdElement(
	s: Styleframe,
	config: DdElementConfig = {},
): DdElementResult {
	const marginBottom = config.marginBottom ?? defaultDdValues.marginBottom;
	const marginLeft = config.marginLeft ?? defaultDdValues.marginLeft;

	const ddMarginBottom = s.variable("dd.margin-bottom", marginBottom);
	const ddMarginLeft = s.variable("dd.margin-left", marginLeft);

	s.selector("dd", {
		marginBottom: s.ref(ddMarginBottom),
		marginLeft: s.ref(ddMarginLeft),
	});

	return { ddMarginLeft, ddMarginBottom };
}
