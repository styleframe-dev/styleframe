import { useBorderWidth, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	borderWidthNone,
	borderWidthThin,
	borderWidthMedium,
	borderWidthThick,
} = useBorderWidth(s);

// Register all utilities and generate utility classes
const { createBorderWidthUtility } = useUtilitiesPreset(s);

createBorderWidthUtility({
	none: s.ref(borderWidthNone),
	thin: s.ref(borderWidthThin),
	medium: s.ref(borderWidthMedium),
	thick: s.ref(borderWidthThick),
});

export const borderWidthPreview = s.recipe({
	name: "border-width-preview",
	base: {
		borderStyle: "solid",
	},
	variants: {
		borderWidth: {
			none: {
				borderWidth: s.ref(borderWidthNone),
			},
			thin: {
				borderWidth: s.ref(borderWidthThin),
			},
			medium: {
				borderWidth: s.ref(borderWidthMedium),
			},
			thick: {
				borderWidth: s.ref(borderWidthThick),
			},
		},
	},
	defaultVariants: {
		borderWidth: "thin",
	},
});

export default s;
