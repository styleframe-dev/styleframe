import type { DeclarationsCallbackContext, Styleframe } from "@styleframe/core";

export function useOutputSelectors(ctx: DeclarationsCallbackContext): void {
	ctx.selector("output", {
		display: "inline-block",
	});
}

export function useOutputElement(s: Styleframe): void {
	useOutputSelectors(s);
}
