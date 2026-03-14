import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultMarkValues = {
	background: "#fef08a",
	color: "inherit",
	paddingTop: "0.1875rem",
	paddingRight: "0.375rem",
	paddingBottom: "0.1875rem",
	paddingLeft: "0.375rem",
} as const;

export interface MarkElementConfig {
	background?: TokenValue;
	color?: string;
	paddingTop?: TokenValue;
	paddingRight?: TokenValue;
	paddingBottom?: TokenValue;
	paddingLeft?: TokenValue;
}

export interface MarkElementResult {
	markBackground: Variable<"mark.background">;
	markColor: Variable<"mark.color">;
	markPaddingTop: Variable<"mark.padding-top">;
	markPaddingRight: Variable<"mark.padding-right">;
	markPaddingBottom: Variable<"mark.padding-bottom">;
	markPaddingLeft: Variable<"mark.padding-left">;
}

export function useMarkElement(
	s: Styleframe,
	config: MarkElementConfig = {},
): MarkElementResult {
	const background = config.background ?? defaultMarkValues.background;
	const color = config.color ?? defaultMarkValues.color;
	const paddingTop = config.paddingTop ?? defaultMarkValues.paddingTop;
	const paddingRight = config.paddingRight ?? defaultMarkValues.paddingRight;
	const paddingBottom = config.paddingBottom ?? defaultMarkValues.paddingBottom;
	const paddingLeft = config.paddingLeft ?? defaultMarkValues.paddingLeft;

	const markBackground = s.variable("mark.background", background);
	const markColor = s.variable("mark.color", color);
	const markPaddingTop = s.variable("mark.padding-top", paddingTop);
	const markPaddingRight = s.variable("mark.padding-right", paddingRight);
	const markPaddingBottom = s.variable("mark.padding-bottom", paddingBottom);
	const markPaddingLeft = s.variable("mark.padding-left", paddingLeft);

	s.selector("mark", {
		background: s.ref(markBackground),
		color: s.ref(markColor),
		paddingTop: s.ref(markPaddingTop),
		paddingRight: s.ref(markPaddingRight),
		paddingBottom: s.ref(markPaddingBottom),
		paddingLeft: s.ref(markPaddingLeft),
	});

	return {
		markBackground,
		markColor,
		markPaddingTop,
		markPaddingRight,
		markPaddingBottom,
		markPaddingLeft,
	};
}
