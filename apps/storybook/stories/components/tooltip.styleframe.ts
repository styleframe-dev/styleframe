import { useTooltipRecipe, useTooltipArrowRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize tooltip recipes
export const tooltip = useTooltipRecipe(s);
export const tooltipArrow = useTooltipArrowRecipe(s);

// Container styles for story layout
selector(".tooltip-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
});

selector(".tooltip-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".tooltip-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".tooltip-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

selector(".tooltip-wrapper", {
	position: "relative",
	display: "inline-flex",
	flexDirection: "column",
	alignItems: "center",
});

selector(".tooltip-arrow-position", {
	bottom: "calc(@tooltip.arrow.size * -1)",
	left: "calc(50% - 5px)",
});

export default s;
