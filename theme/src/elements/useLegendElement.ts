import type { Styleframe } from "@styleframe/core";

export function useLegendElement(s: Styleframe): void {
	s.selector("legend", {
		float: "left",
		width: "100%",
		padding: "0",
		"& + *": {
			clear: "left",
		},
	});
}
