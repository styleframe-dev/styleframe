import type { Styleframe, TokenValue } from "@styleframe/core";

export const defaultCodeValues = {
	fontFamily: "@font-family.mono",
	fontSize: "0.875em",
} as const;

export interface CodeElementConfig {
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
}

export function useCodeElement(
	s: Styleframe,
	config: CodeElementConfig = {},
): void {
	const fontFamily = config.fontFamily ?? defaultCodeValues.fontFamily;
	const fontSize = config.fontSize ?? defaultCodeValues.fontSize;

	s.selector("code, samp", {
		fontFamily,
		fontSize,
	});
}
