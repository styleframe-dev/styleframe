import { styleframe } from "styleframe";
import { borderWidth } from "../tokens.styleframe";

const s = styleframe();

export const borderWidthPreview = s.recipe({
	name: "border-width-preview",
	base: {
		borderStyle: "solid",
	},
	variants: {
		borderWidth: {
			none: {
				borderWidth: s.ref(borderWidth.borderWidthNone),
			},
			thin: {
				borderWidth: s.ref(borderWidth.borderWidthThin),
			},
			medium: {
				borderWidth: s.ref(borderWidth.borderWidthMedium),
			},
			thick: {
				borderWidth: s.ref(borderWidth.borderWidthThick),
			},
		},
	},
	defaultVariants: {
		borderWidth: "thin",
	},
});

export default s;
