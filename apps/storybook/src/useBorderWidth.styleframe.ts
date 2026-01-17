import { useBorderWidth } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	borderWidthNone,
	borderWidthThin,
	borderWidthMedium,
	borderWidthThick,
} = useBorderWidth(s);

// Create border-width utility and generate utility classes
const createBorderWidth = s.utility("border-width", ({ value }) => ({
	borderWidth: value,
}));

createBorderWidth({
	none: s.ref(borderWidthNone),
	thin: s.ref(borderWidthThin),
	medium: s.ref(borderWidthMedium),
	thick: s.ref(borderWidthThick),
});

export const borderWidthPreview = s.recipe({
	name: "border-width-preview",
	base: {
		width: "100px",
		height: "100px",
		borderRadius: "8px",
		borderStyle: "solid",
		borderColor: "#1E3A8A",
		background: "#f8fafc",
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

s.selector(".border-width-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".border-width-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "24px",
	padding: "16px",
});

export default s;
