import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultFocusValues = {
	outlineColor: "@color.primary",
	outlineWidth: "2px",
	outlineStyle: "solid",
	outlineOffset: "2px",
} as const;

export interface FocusElementConfig {
	outlineColor?: TokenValue;
	outlineWidth?: TokenValue;
	outlineStyle?: TokenValue;
	outlineOffset?: TokenValue;
}

export interface FocusElementResult {
	focusOutlineColor: Variable<"focus.outline-color">;
}

export function useFocusElement(
	s: Styleframe,
	config: FocusElementConfig = {},
): FocusElementResult {
	const outlineColor = config.outlineColor ?? defaultFocusValues.outlineColor;

	const focusOutlineColor = s.variable("focus.outline-color", outlineColor);

	s.selector(":focus-visible", {
		outlineColor: s.ref(focusOutlineColor),
		outlineWidth: config.outlineWidth ?? defaultFocusValues.outlineWidth,
		outlineStyle: config.outlineStyle ?? defaultFocusValues.outlineStyle,
		outlineOffset: config.outlineOffset ?? defaultFocusValues.outlineOffset,
	});

	return { focusOutlineColor };
}
