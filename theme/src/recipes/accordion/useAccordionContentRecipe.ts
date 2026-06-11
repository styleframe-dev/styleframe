import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Accordion content recipe — the height animator.
 *
 * Uses the pure-CSS grid-rows trick: the wrapper animates
 * `grid-template-rows` from `0fr` (collapsed) to `1fr` (expanded) when it
 * carries `data-state="open"`. No JS height measurement required. The padded
 * inner element is `useAccordionBodyRecipe`, which clips overflow during the
 * transition.
 *
 * Color/variant/size axes are present for parity with the other parts but only
 * structural styles are applied here.
 */
export const useAccordionContentRecipe = createUseRecipe(
	"accordion-content",
	{
		base: {
			display: "grid",
			gridTemplateRows: "0fr",
			transitionProperty: "grid-template-rows",
			transitionTimingFunction: "@easing.ease-out-cubic",
			transitionDuration: "@duration.normal",
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
				sm: {},
				md: {},
				lg: {},
			},
		},
		defaultVariants: {
			color: "neutral",
			variant: "solid",
			size: "md",
		},
	},
	(s) => {
		s.selector('.accordion-content[data-state="open"]', {
			gridTemplateRows: "1fr",
		});
	},
);
