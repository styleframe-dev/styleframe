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
}

export function useKbdElement(
	s: Styleframe,
	config: KbdElementConfig = {},
): KbdElementResult {
	const background = config.background ?? defaultKbdValues.background;
	const color = config.color ?? defaultKbdValues.color;

	const kbdBackground = s.variable("kbd.background", background);
	const kbdColor = s.variable("kbd.color", color);

	s.selector("kbd", {
		background: s.ref(kbdBackground),
		color: s.ref(kbdColor),
		fontFamily: config.fontFamily ?? defaultKbdValues.fontFamily,
		fontSize: config.fontSize ?? defaultKbdValues.fontSize,
		borderRadius: config.borderRadius ?? defaultKbdValues.borderRadius,
		paddingBlock: config.paddingBlock ?? defaultKbdValues.paddingBlock,
		paddingInline: config.paddingInline ?? defaultKbdValues.paddingInline,
		display: "inline-block",
		"& > kbd": {
			paddingBlock: "0",
			paddingInline: "0",
			fontSize: "1em",
		},
	});

	return { kbdBackground, kbdColor };
}
