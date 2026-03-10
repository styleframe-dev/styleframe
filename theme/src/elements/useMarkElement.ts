import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultMarkValues = {
	background: "#fef08a",
	color: "inherit",
	paddingBlock: "0.1875rem",
	paddingInline: "0.375rem",
} as const;

export interface MarkElementConfig {
	background?: TokenValue;
	color?: string;
	paddingBlock?: TokenValue;
	paddingInline?: TokenValue;
}

export interface MarkElementResult {
	markBackground: Variable<"mark.background">;
	markColor: Variable<"mark.color">;
}

export function useMarkElement(
	s: Styleframe,
	config: MarkElementConfig = {},
): MarkElementResult {
	const background = config.background ?? defaultMarkValues.background;
	const color = config.color ?? defaultMarkValues.color;

	const markBackground = s.variable("mark.background", background);
	const markColor = s.variable("mark.color", color);

	s.selector("mark", {
		background: s.ref(markBackground),
		color: s.ref(markColor),
		paddingBlock: config.paddingBlock ?? defaultMarkValues.paddingBlock,
		paddingInline: config.paddingInline ?? defaultMarkValues.paddingInline,
	});

	return { markBackground, markColor };
}
