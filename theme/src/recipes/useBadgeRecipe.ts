import { createUseRecipe } from "../utils/createUseRecipe";

/**
 * Base badge styling - core appearance without variants.
 * Use this when you want to define your own custom variants.
 */
export const useBadgeRecipeBase = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
		fontSize: "@font-size.xs",
		lineHeight: "1",
		paddingTop: "@spacing.1",
		paddingBottom: "@spacing.1",
		paddingLeft: "@spacing.2",
		paddingRight: "@spacing.2",
		borderRadius: "@border-radius.md",
	},
});

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"neutral",
] as const;
type Color = (typeof colors)[number];

const variants = ["solid", "outline", "soft", "subtle"] as const;
type Variant = (typeof variants)[number];

type CompoundVariant = {
	match: { color: Color; variant: Variant };
	css: Record<string, string>;
};

function createColorVariantCompounds(): CompoundVariant[] {
	const compounds: CompoundVariant[] = [];

	for (const color of colors) {
		if (color === "neutral") {
			compounds.push(
				{
					match: { color: "neutral", variant: "solid" },
					css: { color: "@color.inverted", background: "@color.inverted" },
				},
				{
					match: { color: "neutral", variant: "outline" },
					css: {
						boxShadow: "inset 0 0 0 1px var(--color--accented)",
						color: "@color.default",
						background: "@color.default",
					},
				},
				{
					match: { color: "neutral", variant: "soft" },
					css: { color: "@color.default", background: "@color.elevated" },
				},
				{
					match: { color: "neutral", variant: "subtle" },
					css: {
						boxShadow: "inset 0 0 0 1px var(--color--accented)",
						color: "@color.default",
						background: "@color.elevated",
					},
				},
			);
		} else {
			compounds.push(
				{
					match: { color, variant: "solid" },
					css: { background: `@color.${color}`, color: "@color.inverted" },
				},
				{
					match: { color, variant: "outline" },
					css: {
						color: `@color.${color}`,
						boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(--color--${color}) 50%, transparent)`,
					},
				},
				{
					match: { color, variant: "soft" },
					css: {
						background: `color-mix(in oklch, var(--color--${color}) 10%, transparent)`,
						color: `@color.${color}`,
					},
				},
				{
					match: { color, variant: "subtle" },
					css: {
						background: `color-mix(in oklch, var(--color--${color}) 10%, transparent)`,
						color: `@color.${color}`,
						boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(--color--${color}) 25%, transparent)`,
					},
				},
			);
		}
	}

	return compounds;
}

/**
 * Full badge recipe with color, variant, and size variants.
 * Includes all Nuxt UI-inspired styling options.
 */
export const useBadgeRecipe = createUseRecipe("badge", {
	base: {
		display: "inline-flex",
		alignItems: "center",
		fontWeight: "@font-weight.medium",
	},
	variants: {
		color: {
			primary: {},
			secondary: {},
			success: {},
			info: {},
			warning: {},
			error: {},
			neutral: {},
		},
		variant: {
			solid: {},
			outline: {},
			soft: {},
			subtle: {},
		},
		size: {
			xs: {
				fontSize: "8px",
				lineHeight: "12px",
				paddingTop: "@spacing.0-5",
				paddingBottom: "@spacing.0-5",
				paddingLeft: "@spacing.1",
				paddingRight: "@spacing.1",
				gap: "@spacing.1",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				fontSize: "10px",
				lineHeight: "12px",
				paddingTop: "@spacing.1",
				paddingBottom: "@spacing.1",
				paddingLeft: "@spacing.1-5",
				paddingRight: "@spacing.1-5",
				gap: "@spacing.1",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.xs",
				paddingTop: "@spacing.1",
				paddingBottom: "@spacing.1",
				paddingLeft: "@spacing.2",
				paddingRight: "@spacing.2",
				gap: "@spacing.1",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.sm",
				paddingTop: "@spacing.1",
				paddingBottom: "@spacing.1",
				paddingLeft: "@spacing.2",
				paddingRight: "@spacing.2",
				gap: "@spacing.1-5",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.base",
				paddingTop: "@spacing.1",
				paddingBottom: "@spacing.1",
				paddingLeft: "@spacing.2-5",
				paddingRight: "@spacing.2-5",
				gap: "@spacing.1-5",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: createColorVariantCompounds(),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "md",
	},
});
