import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Spinner circle recipe.
 * Styles the SVG spinner element with rotation animation and size variants.
 */
export const useSpinnerCircleRecipe = createUseRecipe(
	"spinner-circle",
	{
		base: {
			animationName: "spinner-rotate",
			animationDuration: "1.2s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
			transformOrigin: "center center",
		},
		variants: {
			size: {
				auto: {
					width: "100%",
					height: "100%",
				},
				sm: {
					width: "@2",
					height: "@2",
				},
				md: {
					width: "@3",
					height: "@3",
				},
				lg: {
					width: "@4",
					height: "@4",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
	(s) => {
		s.keyframes("spinner-rotate", {
			"100%": {
				transform: "rotate(360deg)",
			},
		});

		s.keyframes("spinner-dash", {
			"0%": {
				strokeDasharray: "1, 200",
				strokeDashoffset: "0",
			},
			"50%": {
				strokeDasharray: "89, 200",
				strokeDashoffset: "-35px",
			},
			"100%": {
				strokeDasharray: "89, 200",
				strokeDashoffset: "-124px",
			},
		});

		s.selector(".spinner-circle circle", {
			stroke: "currentColor",
			fill: "none",
			strokeWidth: "4",
			strokeDasharray: "89, 200",
			strokeDashoffset: "-35px",
			animationName: "spinner-dash",
			animationDuration: "1.2s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
			strokeLinecap: "round",
		});
	},
);
