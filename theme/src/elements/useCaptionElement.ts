import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultCaptionValues = {
	color: "@text.weak",
	paddingTop: "@spacing.xs",
	paddingRight: "@spacing.sm",
	paddingBottom: "@spacing.xs",
	paddingLeft: "@spacing.sm",
	textAlign: "left",
} as const;

export interface CaptionElementConfig {
	color?: TokenValue;
	paddingTop?: TokenValue;
	paddingRight?: TokenValue;
	paddingBottom?: TokenValue;
	paddingLeft?: TokenValue;
	textAlign?: TokenValue;
}

export interface CaptionElementResult {
	captionColor: Variable<"caption.color">;
	captionPaddingTop: Variable<"caption.padding-top">;
	captionPaddingRight: Variable<"caption.padding-right">;
	captionPaddingBottom: Variable<"caption.padding-bottom">;
	captionPaddingLeft: Variable<"caption.padding-left">;
	captionTextAlign: Variable<"caption.text-align">;
}

export function useCaptionElement(
	s: Styleframe,
	config: CaptionElementConfig = {},
): CaptionElementResult {
	const color = config.color ?? defaultCaptionValues.color;
	const paddingTop = config.paddingTop ?? defaultCaptionValues.paddingTop;
	const paddingRight = config.paddingRight ?? defaultCaptionValues.paddingRight;
	const paddingBottom =
		config.paddingBottom ?? defaultCaptionValues.paddingBottom;
	const paddingLeft = config.paddingLeft ?? defaultCaptionValues.paddingLeft;
	const textAlign = config.textAlign ?? defaultCaptionValues.textAlign;

	const captionColor = s.variable("caption.color", color);
	const captionPaddingTop = s.variable("caption.padding-top", paddingTop);
	const captionPaddingRight = s.variable("caption.padding-right", paddingRight);
	const captionPaddingBottom = s.variable(
		"caption.padding-bottom",
		paddingBottom,
	);
	const captionPaddingLeft = s.variable("caption.padding-left", paddingLeft);
	const captionTextAlign = s.variable("caption.text-align", textAlign);

	s.selector("caption", {
		color: s.ref(captionColor),
		paddingTop: s.ref(captionPaddingTop),
		paddingRight: s.ref(captionPaddingRight),
		paddingBottom: s.ref(captionPaddingBottom),
		paddingLeft: s.ref(captionPaddingLeft),
		textAlign: s.ref(captionTextAlign),
	});

	return {
		captionColor,
		captionPaddingTop,
		captionPaddingRight,
		captionPaddingBottom,
		captionPaddingLeft,
		captionTextAlign,
	};
}
