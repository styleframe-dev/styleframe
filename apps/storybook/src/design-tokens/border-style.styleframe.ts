import { styleframe } from "styleframe";
import { borderStyle } from "../tokens.styleframe";

const s = styleframe();

export const borderStylePreview = s.recipe({
	name: "border-style-preview",
	base: {
		borderWidth: "3px",
	},
	variants: {
		borderStyle: {
			none: {
				borderStyle: s.ref(borderStyle.borderStyleNone),
			},
			solid: {
				borderStyle: s.ref(borderStyle.borderStyleSolid),
			},
			dashed: {
				borderStyle: s.ref(borderStyle.borderStyleDashed),
			},
			dotted: {
				borderStyle: s.ref(borderStyle.borderStyleDotted),
			},
			double: {
				borderStyle: s.ref(borderStyle.borderStyleDouble),
			},
			groove: {
				borderStyle: s.ref(borderStyle.borderStyleGroove),
			},
			inset: {
				borderStyle: s.ref(borderStyle.borderStyleInset),
			},
			outset: {
				borderStyle: s.ref(borderStyle.borderStyleOutset),
			},
		},
	},
	defaultVariants: {
		borderStyle: "solid",
	},
});

export default s;
