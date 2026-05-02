import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Page hero container recipe.
 * Supports color (light, dark, neutral), size, orientation, and alignment axes.
 */
export const usePageHeroRecipe = createUseRecipe("page-hero", {
	base: {
		position: "relative",
		display: "flex",
		flexBasis: "100%",
		width: "100%",
		overflow: "hidden",
		lineHeight: "@line-height.normal",
		paddingTop: "@3",
		paddingBottom: "@3",
		paddingLeft: "@1.5",
		paddingRight: "@1.5",
		gap: "@1.5",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		size: {
			sm: {
				paddingTop: "@2",
				paddingBottom: "@2",
				gap: "@1",
			},
			md: {
				paddingTop: "@3",
				paddingBottom: "@3",
				gap: "@1.5",
			},
			lg: {
				paddingTop: "@4",
				paddingBottom: "@4",
				gap: "@2",
			},
		},
		orientation: {
			vertical: {
				flexDirection: "column",
			},
			horizontal: {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
			},
		},
		alignment: {
			start: {},
			center: {},
		},
	},
	compoundVariants: [
		// Color compounds — Container pattern (light/dark/neutral)
		{
			match: { color: "light" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				"&:dark": {
					background: "@color.white",
					color: "@color.text-inverted",
				},
			},
		},
		{
			match: { color: "dark" as const },
			css: {
				background: "@color.gray-900",
				color: "@color.text-inverted",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.text",
				},
			},
		},
		{
			match: { color: "neutral" as const },
			css: {
				background: "@color.white",
				color: "@color.text",
				"&:dark": {
					background: "@color.gray-900",
					color: "@color.white",
				},
			},
		},

		// Orientation × alignment compounds — resolve align-items + text-align cleanly
		{
			match: { orientation: "vertical" as const, alignment: "start" as const },
			css: {
				alignItems: "flex-start",
				textAlign: "left",
			},
		},
		{
			match: { orientation: "vertical" as const, alignment: "center" as const },
			css: {
				alignItems: "center",
				textAlign: "center",
			},
		},
		{
			match: {
				orientation: "horizontal" as const,
				alignment: "start" as const,
			},
			css: {
				alignItems: "center",
				justifyItems: "start",
				textAlign: "left",
			},
		},
		{
			match: {
				orientation: "horizontal" as const,
				alignment: "center" as const,
			},
			css: {
				alignItems: "center",
				justifyItems: "center",
				textAlign: "center",
			},
		},
	],
	defaultVariants: {
		color: "neutral",
		size: "md",
		orientation: "vertical",
		alignment: "center",
	},
});
