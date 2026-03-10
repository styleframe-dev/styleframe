import type { Styleframe } from "@styleframe/core";

export function useOutputElement(s: Styleframe): void {
	s.selector("output", {
		display: "inline-block",
	});
}
