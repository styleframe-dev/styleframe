import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Input wrapper recipe. The `.input` class sits on a wrapper element that
 * contains an inline `#prefix` slot, a nested `<input class="input-field">`,
 * and an inline `#suffix` slot. The wrapper owns the visual field (border,
 * background, padding, focus ring via `:focus-within`); the nested input is
 * transparent and inherits typography.
 *
 * Supports color (light, dark, neutral), variant (default, soft, ghost),
 * size, and three boolean axes — `invalid`, `disabled`, `readonly` — that
 * map to the equivalent native `<input>` attributes from the consumer.
 */
export const useInputRecipe = createUseRecipe(
	"input",
	{
		base: {
			display: "inline-flex",
			alignItems: "center",
			fontFamily: "inherit",
			fontSize: "@font-size.sm",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			paddingTop: "@0.5",
			paddingBottom: "@0.5",
			paddingLeft: "@0.75",
			paddingRight: "@0.75",
			background: "transparent",
			color: "@color.text",
			outline: "none",
			transitionProperty: "color, background-color, border-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:focus-within": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
		},
		variants: {
			color: {
				light: {},
				dark: {},
				neutral: {},
			},
			variant: {
				default: {},
				soft: {},
				ghost: {},
			},
			size: {
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.625",
					paddingBottom: "@0.625",
					paddingLeft: "@0.875",
					paddingRight: "@0.875",
					borderRadius: "@border-radius.md",
				},
			},
			invalid: {
				true: {},
				false: {},
			},
			disabled: {
				true: {},
				false: {},
			},
			readonly: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Light color (fixed across themes)
			{
				match: { color: "light" as const, variant: "default" as const },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-200",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-300",
					},
					"&:dark": {
						background: "@color.white",
						borderColor: "@color.gray-200",
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-300",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					borderColor: "@color.gray-200",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-300",
					},
					"&:dark": {
						background: "@color.gray-100",
						borderColor: "@color.gray-200",
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-300",
					},
				},
			},
			{
				match: { color: "light" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					color: "@color.text",
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						color: "@color.text-inverted",
					},
				},
			},

			// Dark color (fixed across themes)
			{
				match: { color: "dark" as const, variant: "default" as const },
				css: {
					background: "@color.gray-900",
					borderColor: "@color.gray-700",
					color: "@color.white",
					"&:hover": {
						borderColor: "@color.gray-600",
					},
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-700",
						color: "@color.white",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-800",
					borderColor: "@color.gray-700",
					color: "@color.gray-300",
					"&:hover": {
						borderColor: "@color.gray-600",
					},
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-700",
						color: "@color.gray-300",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "dark" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					color: "@color.gray-300",
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						color: "@color.gray-300",
					},
				},
			},

			// Neutral color (adaptive: light in light mode, dark in dark mode)
			{
				match: { color: "neutral" as const, variant: "default" as const },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-200",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-300",
					},
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-700",
						color: "@color.white",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "soft" as const },
				css: {
					background: "@color.gray-100",
					borderColor: "@color.gray-200",
					color: "@color.text",
					"&:hover": {
						borderColor: "@color.gray-300",
					},
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-700",
						color: "@color.gray-300",
					},
					"&:dark:hover": {
						borderColor: "@color.gray-600",
					},
				},
			},
			{
				match: { color: "neutral" as const, variant: "ghost" as const },
				css: {
					background: "transparent",
					borderColor: "transparent",
					color: "@color.text",
					"&:dark": {
						background: "transparent",
						borderColor: "transparent",
						color: "@color.white",
					},
				},
			},

			// Invalid state — overrides border and focus ring to error color.
			// Placed before disabled/readonly so its rules win over color/variant
			// but can be further dimmed by a disabled state.
			{
				match: { invalid: "true" as const },
				css: {
					borderColor: "@color.error",
					"&:hover": {
						borderColor: "@color.error",
					},
					"&:focus-within": {
						outlineColor: "@color.error",
					},
					"&:dark": {
						borderColor: "@color.error",
					},
					"&:dark:hover": {
						borderColor: "@color.error",
					},
				},
			},

			// Read-only state — subtle background shift, default cursor.
			{
				match: { readonly: "true" as const },
				css: {
					background: "@color.gray-50",
					cursor: "default",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			},

			// Disabled state — dim, not-allowed cursor, block interaction.
			{
				match: { disabled: "true" as const },
				css: {
					opacity: "0.5",
					cursor: "not-allowed",
					pointerEvents: "none",
				},
			},
		],
		defaultVariants: {
			color: "neutral",
			variant: "default",
			size: "md",
			invalid: "false",
			disabled: "false",
			readonly: "false",
		},
	},
	(s) => {
		const { selector } = s;

		selector(".input-field", {
			flexGrow: "1",
			minWidth: "0",
			width: "100%",
			background: "transparent",
			border: "none",
			outline: "none",
			padding: "0",
			color: "inherit",
			fontFamily: "inherit",
			fontSize: "inherit",
			fontWeight: "inherit",
			lineHeight: "inherit",
			"&::placeholder": {
				color: "@color.text-weakest",
			},
		});
	},
);
