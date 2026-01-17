import { useBreakpoint, useUtilities } from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

const { breakpointXs, breakpointSm, breakpointMd, breakpointLg, breakpointXl } =
	useBreakpoint(s);

// Register all utilities
useUtilities(s);

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

s.selector(".breakpoint-name", {
	fontWeight: "600",
	fontSize: "14px",
	color: "#1E3A8A",
	minWidth: "40px",
});

s.selector(".breakpoint-value", {
	fontSize: "14px",
	color: "#64748b",
});

s.selector(".breakpoint-bar", {
	height: "8px",
	borderRadius: "4px",
	background: "#1E3A8A",
	transition: "width 0.3s ease",
});

s.selector(".breakpoint-swatch", {
	display: "flex",
	flexDirection: "column",
	gap: "8px",
	width: "100%",
});

s.selector(".breakpoint-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	padding: "16px",
	width: "100%",
	maxWidth: "600px",
});

export default s;
