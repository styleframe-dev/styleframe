import type { Styleframe } from "@styleframe/core";

export function useIframeElement(s: Styleframe): void {
	s.selector("iframe", {
		border: "0",
	});
}
