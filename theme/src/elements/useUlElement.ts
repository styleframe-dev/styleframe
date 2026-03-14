import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultUlValues = {
	marginBottom: "@spacing",
	paddingLeft: "@spacing.lg",
} as const;

export interface UlElementConfig {
	marginBottom?: TokenValue;
	paddingLeft?: TokenValue;
}

export interface UlElementResult {
	ulMarginBottom: Variable<"ul.margin-bottom">;
	ulPaddingLeft: Variable<"ul.padding-left">;
}

export function useUlElement(
	s: Styleframe,
	config: UlElementConfig = {},
): UlElementResult {
	const marginBottom = config.marginBottom ?? defaultUlValues.marginBottom;
	const paddingLeft = config.paddingLeft ?? defaultUlValues.paddingLeft;

	const ulMarginBottom = s.variable("ul.margin-bottom", marginBottom);
	const ulPaddingLeft = s.variable("ul.padding-left", paddingLeft);

	s.selector("ul", {
		marginBottom: s.ref(ulMarginBottom),
		paddingLeft: s.ref(ulPaddingLeft),
		"& ol, & ul": {
			marginBottom: "0",
		},
	});

	return { ulMarginBottom, ulPaddingLeft };
}
