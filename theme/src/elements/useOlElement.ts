import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultOlValues = {
	marginBottom: "@spacing",
	paddingLeft: "@spacing.lg",
} as const;

export interface OlElementConfig {
	marginBottom?: TokenValue;
	paddingLeft?: TokenValue;
}

export interface OlElementResult {
	olMarginBottom: Variable<"ol.margin-bottom">;
	olPaddingLeft: Variable<"ol.padding-left">;
}

export function useOlElement(
	s: Styleframe,
	config: OlElementConfig = {},
): OlElementResult {
	const marginBottom = config.marginBottom ?? defaultOlValues.marginBottom;
	const paddingLeft = config.paddingLeft ?? defaultOlValues.paddingLeft;

	const olMarginBottom = s.variable("ol.margin-bottom", marginBottom);
	const olPaddingLeft = s.variable("ol.padding-left", paddingLeft);

	s.selector("ol", {
		marginBottom: s.ref(olMarginBottom),
		paddingLeft: s.ref(olPaddingLeft),
		"& ol, & ul": {
			marginBottom: "0",
		},
	});

	return { olMarginBottom, olPaddingLeft };
}
