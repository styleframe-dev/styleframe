import type { Styleframe } from "@styleframe/core";

/**
 * Applies sanitize.css form normalization rules.
 *
 * Implements https://github.com/csstools/sanitize.css/blob/main/forms.css
 * Provides consistent form element styling across browsers.
 *
 * @param s - The Styleframe instance to register selectors with
 */
export function useSanitizeFormsSelectors(s: Styleframe): void {
	const { selector } = s;

	/**
	 * 1. Change the inconsistent appearance in all browsers (opinionated).
	 * 2. Add typography inheritance in all browsers (opinionated).
	 */
	selector(":where(button, input, select, textarea)", {
		backgroundColor: "transparent",
		border: "1px solid WindowFrame",
		color: "inherit",
		font: "inherit",
		letterSpacing: "inherit",
		padding: "0.25em 0.375em",
	});

	/**
	 * Change the inconsistent appearance in all browsers (opinionated).
	 */
	selector(":where(select)", {
		WebkitAppearance: "none",
		appearance: "none",
		background:
			"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4'%3E%3Cpath d='M4 0h6L7 4'/%3E%3C/svg%3E\") no-repeat right center / 1em",
		borderRadius: 0,
		paddingRight: "1em",
	});

	/**
	 * Don't show the arrow for multiple choice selects.
	 */
	selector(":where(select[multiple])", {
		backgroundImage: "none",
	});

	/**
	 * Remove the border and padding in all browsers (opinionated).
	 */
	selector(':where([type="color" i], [type="range" i])', {
		borderWidth: 0,
		padding: 0,
	});
}
