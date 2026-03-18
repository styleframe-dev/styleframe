import type { DeclarationsCallbackContext, Styleframe } from "@styleframe/core";

export function useImgSelectors(ctx: DeclarationsCallbackContext): void {
	ctx.selector("img, svg", {
		verticalAlign: "middle",
	});
}

export function useImgElement(s: Styleframe): void {
	useImgSelectors(s);
}
