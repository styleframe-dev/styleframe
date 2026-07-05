import {
	useCalloutContentRecipe,
	useCalloutDismissRecipe,
	useCalloutIconRecipe,
	useCalloutRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize callout recipes
export const callout = useCalloutRecipe(s);
export const calloutIcon = useCalloutIconRecipe(s);
export const calloutContent = useCalloutContentRecipe(s);
export const calloutDismiss = useCalloutDismissRecipe(s);

// Container styles for story layout
selector(".callout-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".callout-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".callout-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".callout-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
