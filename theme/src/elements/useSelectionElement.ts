import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultSelectionValues = {
	background: "@color.primary",
	color: "#ffffff",
} as const;

export interface SelectionElementConfig {
	background?: TokenValue;
	color?: string;
}

export interface SelectionElementResult {
	selectionBackground: Variable<"selection.background">;
	selectionColor: Variable<"selection.color">;
}

export function useSelectionElement(
	s: Styleframe,
	config: SelectionElementConfig = {},
): SelectionElementResult {
	const background = config.background ?? defaultSelectionValues.background;
	const color = config.color ?? defaultSelectionValues.color;

	const selectionBackground = s.variable("selection.background", background);
	const selectionColor = s.variable("selection.color", color);

	s.selector("::selection", {
		background: s.ref(selectionBackground),
		color: s.ref(selectionColor),
	});

	return { selectionBackground, selectionColor };
}
