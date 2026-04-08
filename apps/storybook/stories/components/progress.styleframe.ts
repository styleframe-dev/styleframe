import { useProgressBarRecipe, useProgressRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize progress recipes
export const progress = useProgressRecipe(s);
export const progressBar = useProgressBarRecipe(s);

// Container styles for story layout
selector(".progress-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".progress-row", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.sm",
});

selector(".progress-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
