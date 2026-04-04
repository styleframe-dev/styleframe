import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Button group recipe for grouping buttons with joined borders and shared layout.
 * Supports orientation (horizontal/vertical) and block mode.
 */
export const useButtonGroupRecipe = createUseRecipe(
	"button-group",
	{
		base: {
			display: "inline-flex",
			verticalAlign: "middle",
			position: "relative",
		},
		variants: {
			orientation: {
				horizontal: {
					flexDirection: "row",
				},
				vertical: {
					flexDirection: "column",
				},
			},
			block: {
				true: {
					display: "flex",
					width: "100%",
				},
				false: {},
			},
		},
		compoundVariants: [
			{
				match: { orientation: "horizontal" as const },
				className: "-horizontal",
			},
			{
				match: { orientation: "vertical" as const },
				className: "-vertical",
			},
			{
				match: { block: "true" as const },
				className: "-block",
			},
		],
		defaultVariants: {
			orientation: "horizontal",
			block: "false",
		},
	},
	(s) => {
		const { selector } = s;

		// Horizontal: join buttons side-by-side
		selector(".button-group.-horizontal", {
			"& > .button:not(:last-child)": {
				borderTopRightRadius: "0",
				borderBottomRightRadius: "0",
				borderRightWidth: "0",
			},
			"& > .button:not(:first-child)": {
				borderTopLeftRadius: "0",
				borderBottomLeftRadius: "0",
			},
		});

		// Vertical: join buttons top-to-bottom
		selector(".button-group.-vertical", {
			"& > .button:not(:last-child)": {
				borderBottomLeftRadius: "0",
				borderBottomRightRadius: "0",
				borderBottomWidth: "0",
			},
			"& > .button:not(:first-child)": {
				borderTopLeftRadius: "0",
				borderTopRightRadius: "0",
			},
		});

		// Block: children fill equally
		selector(".button-group.-block", {
			"& > .button": {
				flexBasis: "0",
				flexGrow: "1",
			},
		});
	},
);
