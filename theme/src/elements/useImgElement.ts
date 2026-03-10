import type { Styleframe } from "@styleframe/core";

export function useImgElement(s: Styleframe): void {
	s.selector("img, svg", {
		verticalAlign: "middle",
	});
}
