import { createUseRecipe } from "../../utils/createUseRecipe";

/**
 * Field group recipe for joining bordered controls (button, input, select,
 * badge) into a single visual unit, the way Nuxt UI's FieldGroup does. The
 * group's direct children are merged at the seams — adjacent border radii and
 * the inner border width are flattened so neighbours read as one control.
 *
 * Supports orientation (horizontal/vertical) and a block mode that makes the
 * group fill its container. Children are targeted generically (`& > *`): every
 * intended child carries border + radius tokens, and zeroing a border on a
 * borderless child is a visual no-op.
 *
 * Children must be visible controls rendered as *direct* children. Conditional
 * children should be removed from the DOM (e.g. `v-if`), not hidden, since the
 * seam rules rely on `:first-child` / `:last-child` position.
 */
export const useFieldGroupRecipe = createUseRecipe(
	"field-group",
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

		const inputSelectors = [".input", ".select", ".textarea"] as const;

		// Horizontal: join controls side-by-side and let fields take the slack.
		selector(".field-group.-horizontal", {
			"& > *:not(:last-child)": {
				borderTopRightRadius: "0",
				borderBottomRightRadius: "0",
				borderRightWidth: "0",
			},
			"& > *:not(:first-child)": {
				borderTopLeftRadius: "0",
				borderBottomLeftRadius: "0",
			},
			[`& > ${inputSelectors.join(", & > ")}`]: {
				flexGrow: "1",
				minWidth: "0",
			},
		});

		// Vertical: join controls top-to-bottom.
		selector(".field-group.-vertical", {
			"& > *:not(:last-child)": {
				borderBottomLeftRadius: "0",
				borderBottomRightRadius: "0",
				borderBottomWidth: "0",
			},
			"& > *:not(:first-child)": {
				borderTopLeftRadius: "0",
				borderTopRightRadius: "0",
			},
		});

		// Block: buttons share the row equally; fields already flex-grow above.
		selector(".field-group.-block", {
			"& > .button": {
				flexBasis: "0",
				flexGrow: "1",
			},
		});
	},
);
