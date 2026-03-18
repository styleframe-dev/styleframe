import type { DeclarationsCallbackContext, Styleframe } from "@styleframe/core";

export function useIframeSelectors(ctx: DeclarationsCallbackContext): void {
	ctx.selector("iframe", {
		border: "0",
	});
}

export function useIframeElement(s: Styleframe): void {
	useIframeSelectors(s);
}
