import type { Styleframe } from "@styleframe/core";

export function useSampElement(s: Styleframe): void {
	s.selector("samp", {
		fontFamily: "@font-family.mono",
	});
}
