import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultFocusConfig = {
	outlineColor: "@color.primary",
	outlineWidth: "2px",
	outlineStyle: "solid",
	outlineOffset: "2px",
} as const;

export interface FocusStateConfig {
	outlineColor?: TokenValue;
	outlineWidth?: TokenValue;
	outlineStyle?: TokenValue;
	outlineOffset?: TokenValue;
}

export interface FocusStateResult {
	focusOutlineColor: Variable<"focus.outline-color">;
	focusOutlineWidth: Variable<"focus.outline-width">;
	focusOutlineStyle: Variable<"focus.outline-style">;
	focusOutlineOffset: Variable<"focus.outline-offset">;
}

export function useFocusDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: FocusStateConfig = {},
): Partial<FocusStateResult> {
	const result: Partial<FocusStateResult> = {};

	if (config.outlineColor !== undefined)
		result.focusOutlineColor = ctx.variable(
			"focus.outline-color",
			config.outlineColor,
		);
	if (config.outlineWidth !== undefined)
		result.focusOutlineWidth = ctx.variable(
			"focus.outline-width",
			config.outlineWidth,
		);
	if (config.outlineStyle !== undefined)
		result.focusOutlineStyle = ctx.variable(
			"focus.outline-style",
			config.outlineStyle,
		);
	if (config.outlineOffset !== undefined)
		result.focusOutlineOffset = ctx.variable(
			"focus.outline-offset",
			config.outlineOffset,
		);

	return result;
}

export function useFocusSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<FocusStateConfig>,
): FocusStateResult {
	const result = useFocusDesignTokens(ctx, config) as FocusStateResult;

	ctx.selector(":focus-visible", {
		outlineColor: ctx.ref(result.focusOutlineColor),
		outlineWidth: ctx.ref(result.focusOutlineWidth),
		outlineStyle: ctx.ref(result.focusOutlineStyle),
		outlineOffset: ctx.ref(result.focusOutlineOffset),
	});

	return result;
}

export function useFocusState(
	s: Styleframe,
	config: FocusStateConfig = {},
): FocusStateResult {
	return useFocusSelectors(s, {
		outlineColor: config.outlineColor ?? defaultFocusConfig.outlineColor,
		outlineWidth: config.outlineWidth ?? defaultFocusConfig.outlineWidth,
		outlineStyle: config.outlineStyle ?? defaultFocusConfig.outlineStyle,
		outlineOffset: config.outlineOffset ?? defaultFocusConfig.outlineOffset,
	});
}
