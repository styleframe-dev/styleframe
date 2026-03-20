import type { Styleframe } from "@styleframe/core";

/**
 * Applies sanitize.css typography rules.
 *
 * Implements https://github.com/csstools/sanitize.css/blob/main/typography.css
 * Sets the default system font stacks for UI and monospace text.
 *
 * @param s - The Styleframe instance to register selectors with
 */
export function useSanitizeTypographySelectors(s: Styleframe): void {
	const { selector } = s;

	/**
	 * Use the default user interface font in all browsers (opinionated).
	 */
	selector("html", {
		fontFamily: [
			"system-ui",
			"-apple-system",
			'"Segoe UI"',
			'"Roboto"',
			'"Ubuntu"',
			'"Cantarell"',
			'"Noto Sans"',
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
			'"Noto Color Emoji"',
		].join(", "),
	});

	/**
	 * Use the default monospace user interface font in all browsers (opinionated).
	 */
	selector("code, kbd, samp, pre", {
		fontFamily: [
			"ui-monospace",
			'"Menlo"',
			'"Consolas"',
			'"Roboto Mono"',
			'"Ubuntu Monospace"',
			'"Noto Mono"',
			'"Oxygen Mono"',
			'"Liberation Mono"',
			"monospace",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
			'"Noto Color Emoji"',
		].join(", "),
	});
}
