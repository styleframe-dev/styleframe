import type { Styleframe } from "styleframe";

export function useTokens(s: Styleframe) {
	const colorPrimary = s.variable("color--primary", "blue");
	const colorSecondary = s.variable("color--secondary", "pink");

	return { colorPrimary, colorSecondary };
}
