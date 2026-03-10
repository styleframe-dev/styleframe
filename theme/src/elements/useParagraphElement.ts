import type { Styleframe } from "@styleframe/core";

export function useParagraphElement(s: Styleframe): void {
	s.selector("p", {
		marginTop: "0",
		marginBottom: "@spacing",
	});
}
