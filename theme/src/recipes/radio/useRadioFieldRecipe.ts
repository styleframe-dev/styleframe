import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Radio field recipe — sits on the native `<input type="radio">`.
 *
 * Renders a custom circle with no extra markup. The native element drives every
 * state: `:checked` fills the circle with `@color.primary` and paints a white
 * dot as a `background-image` SVG, `:focus-visible` shows a focus ring, and
 * `:disabled` dims it. Radios have no `:indeterminate` state, so — unlike
 * `checkbox-field` — there is no dash mark.
 *
 * The dot is an inline SVG `background-image` (the same technique the sanitize
 * layer uses for the `<select>` arrow) rather than a filled `::before` — it
 * stays crisp and centered at every size via `background-size: contain`.
 *
 * The `color` axis only controls the *unchecked* surface (background + border)
 * and its dark-mode adaptation, mirroring the `input` recipe's
 * `light` / `dark` / `neutral` colors. The adaptive `neutral` color re-asserts
 * the checked fill under `&:dark` so it keeps winning against the
 * attribute-based dark surface (`[data-theme="dark"]`), which would otherwise
 * out-specify the base `&:checked` rule.
 */
const dotImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E\")";

export const useRadioFieldRecipe = createUseRecipe("radio-field", {
	base: {
		appearance: "none",
		WebkitAppearance: "none",
		boxSizing: "border-box",
		display: "inline-block",
		flexShrink: "0",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		cursor: "pointer",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "contain",
		transitionProperty: "color, background-color, border-color",
		transitionDuration: "150ms",
		transitionTimingFunction: "@easing.ease-in-out",
		"&:checked": {
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
			backgroundImage: dotImage,
		},
		"&:focus-visible": {
			outlineWidth: "2px",
			outlineStyle: "solid",
			outlineColor: "@color.primary",
			outlineOffset: "2px",
		},
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed",
		},
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				width: "14px",
				height: "14px",
				borderRadius: "@border-radius.full",
			},
			md: {
				width: "16px",
				height: "16px",
				borderRadius: "@border-radius.full",
			},
			lg: {
				width: "20px",
				height: "20px",
				borderRadius: "@border-radius.full",
			},
		},
	},
	compoundVariants: [
		// Light surface — fixed across themes. The base `&:checked` fill
		// out-specifies this unchecked rule in every mode, so no dark override.
		{
			match: { color: "light" as const },
			css: {
				backgroundColor: "@color.white",
				borderColor: "@color.gray-300",
			},
		},
		// Dark surface — fixed across themes.
		{
			match: { color: "dark" as const },
			css: {
				backgroundColor: "@color.gray-900",
				borderColor: "@color.gray-600",
			},
		},
		// Neutral surface — adaptive. The `&:dark` unchecked rule gains
		// attribute-selector specificity, so the checked fill is re-asserted
		// under `&:dark:checked` to keep winning.
		{
			match: { color: "neutral" as const },
			css: {
				backgroundColor: "@color.white",
				borderColor: "@color.gray-300",
				"&:dark": {
					backgroundColor: "@color.gray-900",
					borderColor: "@color.gray-600",
				},
				"&:dark:checked": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
	},
});
