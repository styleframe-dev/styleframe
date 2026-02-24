import {
	useButtonRecipe,
	useUtilitiesPreset,
	useDesignTokensPreset,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize design tokens preset
useDesignTokensPreset(s);

// Initialize utilities preset
useUtilitiesPreset(s);

// Initialize button recipe
export const button = useButtonRecipe(s);

// Container styles for story layout
selector(".button-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
});

selector(".button-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".button-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".button-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	color: "@color.dark",
	minWidth: "80px",
});

export default s;
