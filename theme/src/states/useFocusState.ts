import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultFocusValues = {
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

export function useFocusState(
	s: Styleframe,
	config: FocusStateConfig = {},
): FocusStateResult {
	const outlineColor = config.outlineColor ?? defaultFocusValues.outlineColor;
	const outlineWidth = config.outlineWidth ?? defaultFocusValues.outlineWidth;
	const outlineStyle = config.outlineStyle ?? defaultFocusValues.outlineStyle;
	const outlineOffset =
		config.outlineOffset ?? defaultFocusValues.outlineOffset;

	const focusOutlineColor = s.variable("focus.outline-color", outlineColor);
	const focusOutlineWidth = s.variable("focus.outline-width", outlineWidth);
	const focusOutlineStyle = s.variable("focus.outline-style", outlineStyle);
	const focusOutlineOffset = s.variable("focus.outline-offset", outlineOffset);

	s.selector(":focus-visible", {
		outlineColor: s.ref(focusOutlineColor),
		outlineWidth: s.ref(focusOutlineWidth),
		outlineStyle: s.ref(focusOutlineStyle),
		outlineOffset: s.ref(focusOutlineOffset),
	});

	return {
		focusOutlineColor,
		focusOutlineWidth,
		focusOutlineStyle,
		focusOutlineOffset,
	};
}
