import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultKbdValues = {
	background: "#1e293b",
	color: "#ffffff",
	fontFamily: "@font-family.mono",
	fontSize: "0.875em",
	borderRadius: "@border-radius.sm",
	paddingBlock: "0.1875rem",
	paddingInline: "0.375rem",
} as const;

export interface KbdElementConfig {
	background?: TokenValue;
	color?: string;
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
	borderRadius?: TokenValue;
	paddingBlock?: TokenValue;
	paddingInline?: TokenValue;
}

export interface KbdElementResult {
	kbdBackground: Variable<"kbd.background">;
	kbdColor: Variable<"kbd.color">;
	kbdFontFamily: Variable<"kbd.font-family">;
	kbdFontSize: Variable<"kbd.font-size">;
	kbdBorderRadius: Variable<"kbd.border-radius">;
	kbdPaddingBlock: Variable<"kbd.padding-block">;
	kbdPaddingInline: Variable<"kbd.padding-inline">;
}

export function useKbdElement(
	s: Styleframe,
	config: KbdElementConfig = {},
): KbdElementResult {
	const background = config.background ?? defaultKbdValues.background;
	const color = config.color ?? defaultKbdValues.color;
	const fontFamily = config.fontFamily ?? defaultKbdValues.fontFamily;
	const fontSize = config.fontSize ?? defaultKbdValues.fontSize;
	const borderRadius = config.borderRadius ?? defaultKbdValues.borderRadius;
	const paddingBlock = config.paddingBlock ?? defaultKbdValues.paddingBlock;
	const paddingInline = config.paddingInline ?? defaultKbdValues.paddingInline;

	const kbdBackground = s.variable("kbd.background", background);
	const kbdColor = s.variable("kbd.color", color);
	const kbdFontFamily = s.variable("kbd.font-family", fontFamily);
	const kbdFontSize = s.variable("kbd.font-size", fontSize);
	const kbdBorderRadius = s.variable("kbd.border-radius", borderRadius);
	const kbdPaddingBlock = s.variable("kbd.padding-block", paddingBlock);
	const kbdPaddingInline = s.variable("kbd.padding-inline", paddingInline);

	s.selector("kbd", {
		background: s.ref(kbdBackground),
		color: s.ref(kbdColor),
		fontFamily: s.ref(kbdFontFamily),
		fontSize: s.ref(kbdFontSize),
		borderRadius: s.ref(kbdBorderRadius),
		paddingBlock: s.ref(kbdPaddingBlock),
		paddingInline: s.ref(kbdPaddingInline),
		display: "inline-block",
		"& > kbd": {
			paddingBlock: "0",
			paddingInline: "0",
			fontSize: "1em",
		},
	});

	return {
		kbdBackground,
		kbdColor,
		kbdFontFamily,
		kbdFontSize,
		kbdBorderRadius,
		kbdPaddingBlock,
		kbdPaddingInline,
	};
}
