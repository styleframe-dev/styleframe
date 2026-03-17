import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultSelectionConfig = {
	background: "@color.primary",
	color: "#ffffff",
} as const;

export interface SelectionStateConfig {
	background?: TokenValue;
	color?: string;
}

export interface SelectionStateResult {
	selectionBackground: Variable<"selection.background">;
	selectionColor: Variable<"selection.color">;
}

export function useSelectionDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: SelectionStateConfig = {},
): Partial<SelectionStateResult> {
	const result: Partial<SelectionStateResult> = {};

	if (config.background !== undefined)
		result.selectionBackground = ctx.variable(
			"selection.background",
			config.background,
		);
	if (config.color !== undefined)
		result.selectionColor = ctx.variable("selection.color", config.color);

	return result;
}

export function useSelectionSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<SelectionStateConfig>,
): SelectionStateResult {
	const result = useSelectionDesignTokens(ctx, config) as SelectionStateResult;

	ctx.selector("::selection", {
		background: ctx.ref(result.selectionBackground),
		color: ctx.ref(result.selectionColor),
	});

	return result;
}

export function useSelectionState(
	s: Styleframe,
	config: SelectionStateConfig = {},
): SelectionStateResult {
	return useSelectionSelectors(s, {
		background: config.background ?? defaultSelectionConfig.background,
		color: config.color ?? defaultSelectionConfig.color,
	});
}
