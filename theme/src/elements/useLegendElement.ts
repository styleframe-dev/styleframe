import type { DeclarationsCallbackContext, Styleframe } from "@styleframe/core";

export function useLegendSelectors(ctx: DeclarationsCallbackContext): void {
	ctx.selector("legend", {
		float: "left",
		width: "100%",
		padding: "0",
		"& + *": {
			clear: "left",
		},
	});
}

export function useLegendElement(s: Styleframe): void {
	useLegendSelectors(s);
}
