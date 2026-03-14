import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultCodeValues = {
	fontFamily: "@font-family.mono",
	fontSize: "0.875em",
} as const;

export interface CodeElementConfig {
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
}

export interface CodeElementResult {
	codeFontFamily: Variable<"code.font-family">;
	codeFontSize: Variable<"code.font-size">;
}

export function useCodeElement(
	s: Styleframe,
	config: CodeElementConfig = {},
): CodeElementResult {
	const fontFamily = config.fontFamily ?? defaultCodeValues.fontFamily;
	const fontSize = config.fontSize ?? defaultCodeValues.fontSize;

	const codeFontFamily = s.variable("code.font-family", fontFamily);
	const codeFontSize = s.variable("code.font-size", fontSize);

	s.selector("code, samp", {
		fontFamily: s.ref(codeFontFamily),
		fontSize: s.ref(codeFontSize),
	});

	return { codeFontFamily, codeFontSize };
}
