import { useBreakpoint, useUtilitiesPreset } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

// Exported for use in stories to display values
export const breakpointValues = {
	xs: "0px",
	sm: "576px",
	md: "992px",
	lg: "1200px",
	xl: "1440px",
} as const;

// Exported for use in stories for bar width calculations
export const breakpointWidths = {
	xs: 0,
	sm: 576,
	md: 992,
	lg: 1200,
	xl: 1440,
} as const;

// Register breakpoint variables (used by the theme)
useBreakpoint(s);

// Register all utilities
useUtilitiesPreset(s);

export const breakpointPreview = s.recipe({
	name: "breakpoint-preview",
	base: {
		display: "flex",
		alignItems: "center",
		gap: "16px",
		padding: "16px",
		borderRadius: "8px",
		background: "#f8fafc",
		borderLeftWidth: "4px",
		borderLeftStyle: "solid",
		borderLeftColor: "#1E3A8A",
	},
	variants: {
		breakpoint: {
			xs: {},
			sm: {},
			md: {},
			lg: {},
			xl: {},
		},
	},
	defaultVariants: {
		breakpoint: "md",
	},
});

// Styles for breakpoint visualization bar (used by renderPreview in stories)
s.selector(".breakpoint-bar", {
	height: "8px",
	borderRadius: "4px",
	background: "#1E3A8A",
	transition: "width 0.3s ease",
});

export default s;
