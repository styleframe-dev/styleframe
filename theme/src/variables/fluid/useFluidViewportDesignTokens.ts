import type { Styleframe, TokenValue } from "@styleframe/core";

export function useFluidViewportDesignTokens(
	s: Styleframe,
	{
		minWidth = 320,
		maxWidth = 1440,
	}: {
		minWidth?: TokenValue;
		maxWidth?: TokenValue;
	} = {},
) {
	const { variable, css, ref } = s;

	const fluidMinWidth = variable("fluid.min-width", minWidth, {
		default: true,
	});
	const fluidMaxWidth = variable("fluid.max-width", maxWidth, {
		default: true,
	});
	const fluidScreen = variable("fluid.screen", "100vw", { default: true });
	const fluidBreakpoint = variable(
		"fluid.breakpoint",
		css`calc((${ref(fluidScreen)} - ${ref(fluidMinWidth)} / 16 * 1rem) / (${ref(fluidMaxWidth)} - ${ref(fluidMinWidth)}))`,
		{ default: true },
	);

	return {
		fluidMinWidth,
		fluidMaxWidth,
		fluidScreen,
		fluidBreakpoint,
	};
}
