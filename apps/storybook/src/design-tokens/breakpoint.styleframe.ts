import { breakpointValues as defaultBreakpointValues } from "@styleframe/theme";
import { styleframe } from "styleframe";
import { colors } from "../tokens.styleframe";

const s = styleframe();

// Re-export default values for display in stories
export const breakpointValues = Object.fromEntries(
	Object.entries(defaultBreakpointValues).map(([key, value]) => [
		key,
		`${value}px`,
	]),
) as Record<keyof typeof defaultBreakpointValues, string>;

// Exported for use in stories for bar width calculations
export const breakpointWidths = defaultBreakpointValues;

// Styles for breakpoint visualization bar (used by renderPreview in stories)
s.selector(".breakpoint-bar", {
	height: "8px",
	borderRadius: "4px",
	background: s.ref(colors.colorPrimary),
	transition: "width 0.3s ease",
});

export default s;
