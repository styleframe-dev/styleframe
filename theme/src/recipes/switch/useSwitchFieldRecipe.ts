import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Switch field recipe — sits on the native `<input type="checkbox" role="switch">`.
 *
 * Renders a sliding pill switch with no extra markup. The native element drives
 * every state: the track is a full-radius pill, the knob is a white circle
 * painted as a `background-image` SVG (the same technique `checkbox-field` uses
 * for its checkmark — `::before` / `::after` are unreliable on form controls).
 * `:checked` recolours the track to `@color.primary` and slides the knob from
 * the left to the right via `background-position`. The travel is expressed as
 * `calc(100% - 2px)` so it stays a uniform 2px inset at every size without
 * per-size positions. `:focus-visible` shows a focus ring and `:disabled` dims it.
 *
 * The `color` axis only controls the *unchecked* track surface and its dark-mode
 * adaptation, mirroring the `checkbox` recipe's `light` / `dark` / `neutral`
 * colors (the knob stays white, the on-track stays `@color.primary`). The
 * adaptive `neutral` color re-asserts the checked fill under `&:dark` so it keeps
 * winning against the attribute-based dark surface (`[data-theme="dark"]`), which
 * would otherwise out-specify the base `&:checked` rule.
 */
const knobImage =
	"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='white'/%3E%3C/svg%3E\")";

export const useSwitchFieldRecipe = createUseRecipe("switch-field", {
	base: {
		appearance: "none",
		WebkitAppearance: "none",
		boxSizing: "border-box",
		display: "inline-block",
		flexShrink: "0",
		cursor: "pointer",
		borderWidth: "@border-width.thin",
		borderStyle: "@border-style.solid",
		borderRadius: "@border-radius.full",
		backgroundImage: knobImage,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "2px center",
		transitionProperty: "background-color, background-position, border-color",
		transitionDuration: "150ms",
		transitionTimingFunction: "@easing.ease-in-out",
		"&:checked": {
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
			backgroundPosition: "calc(100% - 2px) center",
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
				width: "32px",
				height: "18px",
				backgroundSize: "14px 14px",
			},
			md: {
				width: "36px",
				height: "20px",
				backgroundSize: "16px 16px",
			},
			lg: {
				width: "44px",
				height: "24px",
				backgroundSize: "20px 20px",
			},
		},
	},
	compoundVariants: [
		// Light track — fixed across themes. The base `&:checked` primary fill
		// out-specifies this unchecked rule in every mode, so no dark override.
		{
			match: { color: "light" as const },
			css: {
				backgroundColor: "@color.gray-300",
				borderColor: "@color.gray-300",
			},
		},
		// Dark track — fixed across themes.
		{
			match: { color: "dark" as const },
			css: {
				backgroundColor: "@color.gray-700",
				borderColor: "@color.gray-700",
			},
		},
		// Neutral track — adaptive. The `&:dark` unchecked rule gains
		// attribute-selector specificity, so the checked fill is re-asserted
		// under `&:dark:checked` to keep winning.
		{
			match: { color: "neutral" as const },
			css: {
				backgroundColor: "@color.gray-300",
				borderColor: "@color.gray-300",
				"&:dark": {
					backgroundColor: "@color.gray-700",
					borderColor: "@color.gray-700",
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
