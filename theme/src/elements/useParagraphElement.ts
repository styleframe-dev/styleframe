import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultParagraphValues = {
	marginTop: "0",
	marginBottom: "@spacing",
} as const;

export interface ParagraphElementConfig {
	marginTop?: TokenValue;
	marginBottom?: TokenValue;
}

export interface ParagraphElementResult {
	paragraphMarginTop: Variable<"paragraph.margin-top">;
	paragraphMarginBottom: Variable<"paragraph.margin-bottom">;
}

export function useParagraphElement(
	s: Styleframe,
	config: ParagraphElementConfig = {},
): ParagraphElementResult {
	const marginTop = config.marginTop ?? defaultParagraphValues.marginTop;
	const marginBottom =
		config.marginBottom ?? defaultParagraphValues.marginBottom;

	const paragraphMarginTop = s.variable("paragraph.margin-top", marginTop);
	const paragraphMarginBottom = s.variable(
		"paragraph.margin-bottom",
		marginBottom,
	);

	s.selector("p", {
		marginTop: s.ref(paragraphMarginTop),
		marginBottom: s.ref(paragraphMarginBottom),
	});

	return { paragraphMarginTop, paragraphMarginBottom };
}
