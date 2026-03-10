import type { Styleframe, TokenValue } from "@styleframe/core";

export const defaultPreValues = {
	fontFamily: "@font-family.mono",
	fontSize: "0.875em",
	marginBottom: "@spacing",
} as const;

export interface PreElementConfig {
	fontFamily?: TokenValue;
	fontSize?: TokenValue;
	marginBottom?: TokenValue;
}

export function usePreElement(
	s: Styleframe,
	config: PreElementConfig = {},
): void {
	s.selector("pre", {
		fontFamily: config.fontFamily ?? defaultPreValues.fontFamily,
		fontSize: config.fontSize ?? defaultPreValues.fontSize,
		display: "block",
		overflowX: "auto",
		marginTop: "0",
		marginBottom: config.marginBottom ?? defaultPreValues.marginBottom,
		"& > code": {
			background: "transparent",
			color: "inherit",
			fontSize: "inherit",
		},
	});
}
