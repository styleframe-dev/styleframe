import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultParagraphConfig = {
	marginTop: "0",
	marginBottom: "@spacing",
} as const;

export interface ParagraphElementConfig {
	marginTop?: TokenValue;
	marginBottom?: TokenValue;
}

export interface ParagraphElementResult {
	paragraphMarginTop: Variable<"paragraph.margin-top">;
	paragraphMarginBottom: Variable<"paragraph.margin-bottom">;
}

export function useParagraphDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: ParagraphElementConfig = {},
): Partial<ParagraphElementResult> {
	const result: Partial<ParagraphElementResult> = {};

	if (config.marginTop !== undefined)
		result.paragraphMarginTop = ctx.variable(
			"paragraph.margin-top",
			config.marginTop,
		);
	if (config.marginBottom !== undefined)
		result.paragraphMarginBottom = ctx.variable(
			"paragraph.margin-bottom",
			config.marginBottom,
		);

	return result;
}

export function useParagraphSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<ParagraphElementConfig>,
): ParagraphElementResult {
	const result = useParagraphDesignTokens(
		ctx,
		config,
	) as ParagraphElementResult;

	ctx.selector("p", {
		marginTop: ctx.ref(result.paragraphMarginTop),
		marginBottom: ctx.ref(result.paragraphMarginBottom),
	});

	return result;
}

export function useParagraphElement(
	s: Styleframe,
	config: ParagraphElementConfig = {},
): ParagraphElementResult {
	return useParagraphSelectors(s, {
		marginTop: config.marginTop ?? defaultParagraphConfig.marginTop,
		marginBottom: config.marginBottom ?? defaultParagraphConfig.marginBottom,
	});
}
