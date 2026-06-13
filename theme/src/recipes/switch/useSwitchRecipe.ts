import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Switch wrapper recipe — sits on the `<label>` that wraps a
 * `<input class="switch-field">` and its text. Owns the inline layout
 * (gap, alignment), label typography, and dims the label when the nested
 * field is disabled. The visual switch lives on `switch-field`.
 *
 * The disabled-label dimming uses `:has()`, which is a raw CSS selector rather
 * than a registered modifier, so it is declared via the `setup` callback.
 */
export const useSwitchRecipe = createUseRecipe(
	"switch",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
			lineHeight: "@line-height.normal",
		},
		variants: {
			size: {
				sm: {
					gap: "@0.375",
					fontSize: "@font-size.xs",
				},
				md: {
					gap: "@0.5",
					fontSize: "@font-size.sm",
				},
				lg: {
					gap: "@0.625",
					fontSize: "@font-size.md",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		const { selector } = s;

		// Dim the label when the nested field is disabled.
		selector(".switch:has(.switch-field:disabled)", {
			opacity: "0.5",
			cursor: "not-allowed",
		});
	},
);
