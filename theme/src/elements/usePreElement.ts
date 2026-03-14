import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultPreValues = {
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

export function usePreElement(
	s: Styleframe,
	config: PreElementConfig = {},
): PreElementResult {
	const fontFamily = config.fontFamily ?? defaultPreValues.fontFamily;
	const fontSize = config.fontSize ?? defaultPreValues.fontSize;
	const marginBottom = config.marginBottom ?? defaultPreValues.marginBottom;

	const preFontFamily = s.variable("pre.font-family", fontFamily);
	const preFontSize = s.variable("pre.font-size", fontSize);
	const preMarginBottom = s.variable("pre.margin-bottom", marginBottom);

	s.selector("pre", {
		fontFamily: s.ref(preFontFamily),
		fontSize: s.ref(preFontSize),
		display: "block",
		overflowX: "auto",
		marginTop: "0",
		marginBottom: s.ref(preMarginBottom),
		"& > code": {
			background: "transparent",
			color: "inherit",
			fontSize: "inherit",
		},
	});

	return { preFontFamily, preFontSize, preMarginBottom };
}
