import type { Styleframe } from "@styleframe/core";

export function useAddressElement(s: Styleframe): void {
	s.selector("address", {
		marginBottom: "@spacing",
		fontStyle: "normal",
		lineHeight: "inherit",
	});
}
