import { useBorderRadius, useDefaultUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const {
	borderRadiusNone,
	borderRadiusSm,
	borderRadiusMd,
	borderRadiusLg,
	borderRadiusXl,
	borderRadiusFull,
} = useBorderRadius(s, {
	none: "0",
	sm: "0.125rem",
	md: "0.25rem",
	lg: "0.5rem",
	xl: "1rem",
	full: "9999px",
});

// Register all utilities and generate utility classes
const { createBorderRadiusUtility } = useDefaultUtilitiesPreset(s);

createBorderRadiusUtility({
	none: s.ref(borderRadiusNone),
	sm: s.ref(borderRadiusSm),
	md: s.ref(borderRadiusMd),
	lg: s.ref(borderRadiusLg),
	xl: s.ref(borderRadiusXl),
	full: s.ref(borderRadiusFull),
});

export const borderRadiusPreview = s.recipe({
	name: "border-radius-preview",
	base: {
		width: "100px",
		height: "100px",
		background: "#e0e7ff",
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: "#1E3A8A",
	},
	variants: {
		borderRadius: {
			none: {
				borderRadius: s.ref(borderRadiusNone),
			},
			sm: {
				borderRadius: s.ref(borderRadiusSm),
			},
			md: {
				borderRadius: s.ref(borderRadiusMd),
			},
			lg: {
				borderRadius: s.ref(borderRadiusLg),
			},
			xl: {
				borderRadius: s.ref(borderRadiusXl),
			},
			full: {
				borderRadius: s.ref(borderRadiusFull),
			},
		},
	},
	defaultVariants: {
		borderRadius: "md",
	},
});

export default s;
