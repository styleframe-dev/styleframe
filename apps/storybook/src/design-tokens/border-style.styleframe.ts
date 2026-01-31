import { useBorderStyle, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	borderStyleNone,
	borderStyleSolid,
	borderStyleDashed,
	borderStyleDotted,
	borderStyleDouble,
	borderStyleGroove,
	borderStyleInset,
	borderStyleOutset,
} = useBorderStyle(s);

// Register all utilities and generate utility classes
const { createBorderStyleUtility } = useUtilitiesPreset(s);

createBorderStyleUtility({
	none: s.ref(borderStyleNone),
	solid: s.ref(borderStyleSolid),
	dashed: s.ref(borderStyleDashed),
	dotted: s.ref(borderStyleDotted),
	double: s.ref(borderStyleDouble),
	groove: s.ref(borderStyleGroove),
	inset: s.ref(borderStyleInset),
	outset: s.ref(borderStyleOutset),
});

export const borderStylePreview = s.recipe({
	name: "border-style-preview",
	base: {
		width: "100px",
		height: "100px",
		borderRadius: "8px",
		borderWidth: "3px",
		borderColor: "#1E3A8A",
		background: "#f8fafc",
	},
	variants: {
		borderStyle: {
			none: {
				borderStyle: s.ref(borderStyleNone),
			},
			solid: {
				borderStyle: s.ref(borderStyleSolid),
			},
			dashed: {
				borderStyle: s.ref(borderStyleDashed),
			},
			dotted: {
				borderStyle: s.ref(borderStyleDotted),
			},
			double: {
				borderStyle: s.ref(borderStyleDouble),
			},
			groove: {
				borderStyle: s.ref(borderStyleGroove),
			},
			inset: {
				borderStyle: s.ref(borderStyleInset),
			},
			outset: {
				borderStyle: s.ref(borderStyleOutset),
			},
		},
	},
	defaultVariants: {
		borderStyle: "solid",
	},
});

s.selector(".border-style-swatch", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "8px",
});

s.selector(".border-style-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "24px",
	padding: "16px",
});

export default s;
