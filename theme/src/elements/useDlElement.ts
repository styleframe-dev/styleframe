import type { Styleframe } from "@styleframe/core";

export function useDlElement(s: Styleframe): void {
	s.selector("dl", {
		marginBottom: "@spacing",
	});

	s.selector("dt", {
		fontWeight: "@font-weight.bold",
	});

	s.selector("dd", {
		marginBottom: "@spacing.xs",
		marginLeft: "0",
	});
}
