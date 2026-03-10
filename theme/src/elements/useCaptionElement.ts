import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultCaptionValues = {
	color: "@color.gray-500",
	paddingBlock: "@spacing.xs",
	paddingInline: "@spacing.sm",
	textAlign: "left",
} as const;

export interface CaptionElementConfig {
	color?: TokenValue;
	paddingBlock?: TokenValue;
	paddingInline?: TokenValue;
	textAlign?: TokenValue;
}

export interface CaptionElementResult {
	captionColor: Variable<"caption.color">;
}

export function useCaptionElement(
	s: Styleframe,
	config: CaptionElementConfig = {},
): CaptionElementResult {
	const color = config.color ?? defaultCaptionValues.color;
	const captionColor = s.variable("caption.color", color);

	s.selector("caption", {
		color: s.ref(captionColor),
		paddingBlock: config.paddingBlock ?? defaultCaptionValues.paddingBlock,
		paddingInline: config.paddingInline ?? defaultCaptionValues.paddingInline,
		textAlign: config.textAlign ?? defaultCaptionValues.textAlign,
	});

	return { captionColor };
}
