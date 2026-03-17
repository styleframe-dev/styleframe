import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultDlConfig = {
	marginBottom: "@spacing",
} as const;

export interface DlElementConfig {
	marginBottom?: TokenValue;
}

export interface DlElementResult {
	dlMarginBottom: Variable<"dl.margin-bottom">;
}

export function useDlDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: DlElementConfig = {},
): Partial<DlElementResult> {
	const result: Partial<DlElementResult> = {};

	if (config.marginBottom !== undefined)
		result.dlMarginBottom = ctx.variable(
			"dl.margin-bottom",
			config.marginBottom,
		);

	return result;
}

export function useDlSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<DlElementConfig>,
): DlElementResult {
	const result = useDlDesignTokens(ctx, config) as DlElementResult;

	ctx.selector("dl", {
		marginBottom: ctx.ref(result.dlMarginBottom),
	});

	return result;
}

export function useDlElement(
	s: Styleframe,
	config: DlElementConfig = {},
): DlElementResult {
	return useDlSelectors(s, {
		marginBottom: config.marginBottom ?? defaultDlConfig.marginBottom,
	});
}
