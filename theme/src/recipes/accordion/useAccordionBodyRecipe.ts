import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Accordion body recipe — the padded inner content of a panel.
 *
 * This is the grid child of `useAccordionContentRecipe`. `overflow: hidden`
 * plus `min-height: 0` let it collapse to zero height while the content wrapper
 * animates `grid-template-rows`, so padding never causes a jump.
 *
 * Text color is inherited from the accordion surface; only padding and
 * typography scale with the size axis.
 */
export const useAccordionBodyRecipe = createUseRecipe("accordion-body", {
	base: {
		overflow: "hidden",
		minHeight: "0",
	},
	variants: {
		color: {
			light: {},
			dark: {},
			neutral: {},
		},
		variant: {
			solid: {},
			ghost: {},
		},
		size: {
			sm: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.25",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
			},
			md: {
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
			},
			lg: {
				fontSize: "@font-size.md",
				paddingTop: "@0.75",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
			},
		},
	},
	defaultVariants: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
});
