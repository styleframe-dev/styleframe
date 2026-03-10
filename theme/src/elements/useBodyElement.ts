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
}

export function useBodyElement(
	s: Styleframe,
	config: BodyElementConfig = {},
): BodyElementResult {
	const color = config.color ?? defaultBodyValues.color;
	const background = config.background ?? defaultBodyValues.background;

	const bodyColor = s.variable("body.color", color);
	const bodyBackground = s.variable("body.background", background);

	s.selector("body", {
		fontFamily: config.fontFamily ?? defaultBodyValues.fontFamily,
		fontSize: config.fontSize ?? defaultBodyValues.fontSize,
		lineHeight: config.lineHeight ?? defaultBodyValues.lineHeight,
		color: s.ref(bodyColor),
		background: s.ref(bodyBackground),
		"-webkit-font-smoothing": "antialiased",
		"-moz-osx-font-smoothing": "grayscale",
	});

	return { bodyColor, bodyBackground };
}
