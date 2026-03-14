import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultDlValues = {
	marginBottom: "@spacing",
} as const;

export interface DlElementConfig {
	marginBottom?: TokenValue;
}

export interface DlElementResult {
	dlMarginBottom: Variable<"dl.margin-bottom">;
}

export function useDlElement(
	s: Styleframe,
	config: DlElementConfig = {},
): DlElementResult {
	const marginBottom = config.marginBottom ?? defaultDlValues.marginBottom;

	const dlMarginBottom = s.variable("dl.margin-bottom", marginBottom);

	s.selector("dl", {
		marginBottom: s.ref(dlMarginBottom),
	});

	return { dlMarginBottom };
}
