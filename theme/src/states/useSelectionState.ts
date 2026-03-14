import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultSelectionValues = {
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

export function useSelectionState(
	s: Styleframe,
	config: SelectionStateConfig = {},
): SelectionStateResult {
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
