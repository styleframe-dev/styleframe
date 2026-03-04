import { useColor } from "@styleframe/theme";
import type { Styleframe } from "styleframe";

export function useGlobalStyles(s: Styleframe) {
	const { colorText, colorBackground } = useColor(s, {
		text: "#1e293b",
		background: "#ffffff",
	});

	// Global body styles
	s.selector("body", {
		fontFamily: "@font-family.base",
		fontSize: "@font-size.md",
		lineHeight: "@line-height.normal",
		color: s.ref(colorText),
		background: s.ref(colorBackground),
		margin: 0,
		padding: 0,
		WebkitFontSmoothing: "antialiased",
		MozOsxFontSmoothing: "grayscale",
	});

	// Reset box-sizing
	s.selector("*, *::before, *::after", {
		boxSizing: "border-box",
	});
}
