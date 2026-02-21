import {
	useBadgeRecipe,
	useUtilitiesPreset,
	useDesignTokensPreset,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();

// Initialize design tokens preset
useDesignTokensPreset(s);

// Initialize utilities preset
useUtilitiesPreset(s);

// Initialize badge recipe
export const badge = useBadgeRecipe(s);

// Container styles for story layout
s.selector(".badge-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
});

s.selector(".badge-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

s.selector(".badge-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

s.selector(".badge-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	color: "@color.dark",
	minWidth: "80px",
});

export default s;
