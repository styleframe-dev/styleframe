import type { Styleframe } from "@styleframe/core";

export function useSummaryElement(s: Styleframe): void {
	s.selector("summary", {
		cursor: "pointer",
	});
}
