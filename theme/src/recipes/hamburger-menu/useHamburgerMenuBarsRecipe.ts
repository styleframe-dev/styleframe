import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Hamburger menu bars recipe.
 * Styles the three horizontal bars (middle bar + ::before/::after pseudo-elements)
 * with animation transforms for close, arrow, plus, and minus states.
 */
export const useHamburgerMenuBarsRecipe = createUseRecipe(
	"hamburger-menu-bars",
	{
		base: {
			display: "block",
			position: "relative",
			background: "currentColor",
			borderRadius: "1px",
			transitionProperty: "transform, opacity",
			transitionDuration: "300ms",
			transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
		},
		variants: {
			size: {
				sm: {
					width: "16px",
					height: "2px",
				},
				md: {
					width: "20px",
					height: "2px",
				},
				lg: {
					width: "24px",
					height: "2px",
				},
			},
			animation: {
				close: {},
				"arrow-left": {},
				"arrow-right": {},
				"arrow-up": {},
				"arrow-down": {},
				plus: {},
				minus: {},
			},
			active: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			{
				match: { size: "sm" as const },
				css: {
					"&:before": { top: "-5px" },
					"&:after": { bottom: "-5px" },
				},
			},
			{
				match: { size: "md" as const },
				css: {
					"&:before": { top: "-6px" },
					"&:after": { bottom: "-6px" },
				},
			},
			{
				match: { size: "lg" as const },
				css: {
					"&:before": { top: "-8px" },
					"&:after": { bottom: "-8px" },
				},
			},
			{
				match: {
					animation: "close" as const,
					active: "true" as const,
				},
				css: {
					opacity: "0",
					transform: "rotate(180deg)",
					"&:before": {
						top: "0",
						transform: "rotate(45deg)",
					},
					"&:after": {
						bottom: "0",
						transform: "rotate(-45deg)",
					},
				},
			},
			{
				match: {
					animation: "arrow-left" as const,
					active: "true" as const,
				},
				css: {
					"&:before": {
						top: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(-45deg)",
						transformOrigin: "left center",
					},
					"&:after": {
						bottom: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(45deg)",
						transformOrigin: "left center",
					},
				},
			},
			{
				match: {
					animation: "arrow-right" as const,
					active: "true" as const,
				},
				css: {
					"&:before": {
						top: "0",
						width: "50%",
						transform: "translateX(calc(100% + 1px)) rotate(45deg)",
						transformOrigin: "right center",
					},
					"&:after": {
						bottom: "0",
						width: "50%",
						transform: "translateX(calc(100% + 1px)) rotate(-45deg)",
						transformOrigin: "right center",
					},
				},
			},
			{
				match: {
					animation: "arrow-up" as const,
					active: "true" as const,
				},
				css: {
					transform: "rotate(90deg)",
					"&:before": {
						top: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(-45deg)",
						transformOrigin: "left center",
					},
					"&:after": {
						bottom: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(45deg)",
						transformOrigin: "left center",
					},
				},
			},
			{
				match: {
					animation: "arrow-down" as const,
					active: "true" as const,
				},
				css: {
					transform: "rotate(-90deg)",
					"&:before": {
						top: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(-45deg)",
						transformOrigin: "left center",
					},
					"&:after": {
						bottom: "0",
						width: "50%",
						transform: "translateX(-1px) rotate(45deg)",
						transformOrigin: "left center",
					},
				},
			},
			{
				match: {
					animation: "plus" as const,
					active: "true" as const,
				},
				css: {
					"&:before": {
						top: "0",
						transform: "rotate(90deg)",
					},
					"&:after": {
						bottom: "0",
						transform: "rotate(0deg)",
					},
				},
			},
			{
				match: {
					animation: "minus" as const,
					active: "true" as const,
				},
				css: {
					"&:before": {
						top: "0",
						transform: "rotate(0deg)",
					},
					"&:after": {
						bottom: "0",
						transform: "rotate(0deg)",
					},
				},
			},
		],
		defaultVariants: {
			size: "md",
			animation: "close",
			active: "false",
		},
	},
	(s) => {
		s.selector(".hamburger-menu-bars::before, .hamburger-menu-bars::after", {
			content: "''",
			display: "block",
			position: "absolute",
			left: "0",
			width: "100%",
			height: "100%",
			background: "currentColor",
			borderRadius: "inherit",
			transitionProperty: "transform, opacity, width, top, bottom",
			transitionDuration: "300ms",
			transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
		});

		s.selector(".hamburger-menu-bars::before", {
			top: "-6px",
		});

		s.selector(".hamburger-menu-bars::after", {
			bottom: "-6px",
		});
	},
);
