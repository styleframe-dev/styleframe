import type { DeclarationsCallbackContext, Styleframe } from "@styleframe/core";

export function useSummarySelectors(ctx: DeclarationsCallbackContext): void {
	ctx.selector("summary", {
		cursor: "pointer",
	});
}

export function useSummaryElement(s: Styleframe): void {
	useSummarySelectors(s);
}
