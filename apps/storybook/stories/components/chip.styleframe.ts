import { useChipRecipe, useChipIndicatorRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize chip recipes
export const chip = useChipRecipe(s);
export const chipIndicator = useChipIndicatorRecipe(s);

// Container styles for story layout
selector(".chip-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
});

selector(".chip-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".chip-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".chip-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

// Placeholder target for chip wrapping (avatar-sized box)
selector(".chip-target", {
	width: "40px",
	height: "40px",
	borderRadius: "@border-radius.lg",
	background: "@color.gray-200",
	"&:dark": {
		background: "@color.gray-700",
	},
});

export default s;
