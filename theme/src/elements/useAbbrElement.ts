import type { Styleframe } from "@styleframe/core";

export function useAbbrElement(s: Styleframe): void {
	s.selector("abbr[title]", {
		cursor: "help",
		textDecorationSkipInk: "none",
		textDecoration: "underline dotted",
	});
}
