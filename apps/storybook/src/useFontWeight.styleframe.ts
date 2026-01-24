import { useFontWeight, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const fontWeightValues = {
	extralight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	black: "900",
} as const;

const {
	fontWeightExtralight,
	fontWeightLight,
	fontWeightNormal,
	fontWeightMedium,
	fontWeightSemibold,
	fontWeightBold,
	fontWeightBlack,
} = useFontWeight(s);

// Register all utilities and generate utility classes
const { createFontWeightUtility } = useUtilitiesPreset(s);

createFontWeightUtility({
	extralight: s.ref(fontWeightExtralight),
	light: s.ref(fontWeightLight),
	normal: s.ref(fontWeightNormal),
	medium: s.ref(fontWeightMedium),
	semibold: s.ref(fontWeightSemibold),
	bold: s.ref(fontWeightBold),
	black: s.ref(fontWeightBlack),
});

export const fontWeightPreview = s.recipe({
	name: "font-weight-preview",
	base: {
		fontSize: "18px",
		color: "#1e293b",
	},
	variants: {
		fontWeight: {
			extralight: {
				fontWeight: s.ref(fontWeightExtralight),
			},
			light: {
				fontWeight: s.ref(fontWeightLight),
			},
			normal: {
				fontWeight: s.ref(fontWeightNormal),
			},
			medium: {
				fontWeight: s.ref(fontWeightMedium),
			},
			semibold: {
				fontWeight: s.ref(fontWeightSemibold),
			},
			bold: {
				fontWeight: s.ref(fontWeightBold),
			},
			black: {
				fontWeight: s.ref(fontWeightBlack),
			},
		},
	},
	defaultVariants: {
		fontWeight: "normal",
	},
});

export default s;
