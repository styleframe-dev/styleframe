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
		paddingTop: "@spacing.xs",
		paddingBottom: "@spacing.xs",
		paddingLeft: "@spacing.sm",
		paddingRight: "@spacing.sm",
		borderRadius: "@border-radius.md",
	},
});

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
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
		compounds.push(
			{
				match: { color, variant: "solid" },
				css: { background: `@color.${color}`, color: "@color.light" },
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
			danger: {},
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
				paddingTop: "calc(var(--spacing--2xs) * 0.5)",
				paddingBottom: "calc(var(--spacing--2xs) * 0.5)",
				paddingLeft: "@spacing.2xs",
				paddingRight: "@spacing.2xs",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.sm",
			},
			sm: {
				fontSize: "10px",
				lineHeight: "12px",
				paddingTop: "@spacing.2xs",
				paddingBottom: "@spacing.2xs",
				paddingLeft: "@spacing.xs",
				paddingRight: "@spacing.xs",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.sm",
			},
			md: {
				fontSize: "@font-size.xs",
				paddingTop: "@spacing.xs",
				paddingBottom: "@spacing.xs",
				paddingLeft: "@spacing.sm",
				paddingRight: "@spacing.sm",
				gap: "@spacing.2xs",
				borderRadius: "@border-radius.md",
			},
			lg: {
				fontSize: "@font-size.sm",
				paddingTop: "@spacing.xs",
				paddingBottom: "@spacing.xs",
				paddingLeft: "@spacing.md",
				paddingRight: "@spacing.md",
				gap: "@spacing.xs",
				borderRadius: "@border-radius.md",
			},
			xl: {
				fontSize: "@font-size.md",
				paddingTop: "@spacing.sm",
				paddingBottom: "@spacing.sm",
				paddingLeft: "@spacing.lg",
				paddingRight: "@spacing.lg",
				gap: "@spacing.xs",
				borderRadius: "@border-radius.md",
			},
		},
	},
	compoundVariants: createColorVariantCompounds(),
	defaultVariants: {
		color: "primary",
		variant: "solid",
		size: "sm",
	},
});
