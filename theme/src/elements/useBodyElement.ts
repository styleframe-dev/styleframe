import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultBodyValues = {
	color: "#1e293b",
	background: "#ffffff",
	fontFamily: "@font-family",
	fontSize: "@font-size",
	lineHeight: "@line-height",
} as const;

export interface BodyElementConfig {
	color?: string;
	background?: string;
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
	lineHeight?: TokenValue;
}

export interface BodyElementResult {
	bodyColor: Variable<"body.color">;
	bodyBackground: Variable<"body.background">;
	bodyFontFamily: Variable<"body.font-family">;
	bodyFontSize: Variable<"body.font-size">;
	bodyLineHeight: Variable<"body.line-height">;
}

export function useBodyElement(
	s: Styleframe,
	config: BodyElementConfig = {},
): BodyElementResult {
	const color = config.color ?? defaultBodyValues.color;
	const background = config.background ?? defaultBodyValues.background;
	const fontFamily = config.fontFamily ?? defaultBodyValues.fontFamily;
	const fontSize = config.fontSize ?? defaultBodyValues.fontSize;
	const lineHeight = config.lineHeight ?? defaultBodyValues.lineHeight;

	const bodyColor = s.variable("body.color", color);
	const bodyBackground = s.variable("body.background", background);
	const bodyFontFamily = s.variable("body.font-family", fontFamily);
	const bodyFontSize = s.variable("body.font-size", fontSize);
	const bodyLineHeight = s.variable("body.line-height", lineHeight);

	s.selector("body", {
		fontFamily: s.ref(bodyFontFamily),
		fontSize: s.ref(bodyFontSize),
		lineHeight: s.ref(bodyLineHeight),
		color: s.ref(bodyColor),
		background: s.ref(bodyBackground),
		"-webkit-font-smoothing": "antialiased",
		"-moz-osx-font-smoothing": "grayscale",
	});

	return {
		bodyColor,
		bodyBackground,
		bodyFontFamily,
		bodyFontSize,
		bodyLineHeight,
	};
}
