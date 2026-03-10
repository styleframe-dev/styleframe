import type { Styleframe } from "@styleframe/core";

export function useOlElement(s: Styleframe): void {
	s.selector("ol", {
		marginBottom: "@spacing",
		paddingLeft: "@spacing.lg",
		"& ol, & ul": {
			marginBottom: "0",
		},
	});
}
