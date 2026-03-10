import type { Styleframe } from "@styleframe/core";

export function useUlElement(s: Styleframe): void {
	s.selector("ul", {
		marginBottom: "@spacing",
		paddingLeft: "@spacing.lg",
		"& ol, & ul": {
			marginBottom: "0",
		},
	});
}
