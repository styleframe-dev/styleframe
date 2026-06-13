import { useToggleRecipe, useToggleGroupRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize toggle recipes
export const toggle = useToggleRecipe(s);
export const toggleGroup = useToggleGroupRecipe(s);

// Container styles for story layout
selector(".toggle-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "center",
});

selector(".toggle-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".toggle-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".toggle-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "120px",
});

// Custom example — font-weight segmented picker (the "Aa" + label cell)
selector(".toggle-weight", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "@spacing.sm",
	minWidth: "48px",
});

selector(".toggle-weight-glyph", {
	fontSize: "@font-size.xl",
	lineHeight: "1",
});

selector(".toggle-weight-glyph.-light", { fontWeight: "@font-weight.light" });
selector(".toggle-weight-glyph.-normal", { fontWeight: "@font-weight.normal" });
selector(".toggle-weight-glyph.-medium", { fontWeight: "@font-weight.medium" });
selector(".toggle-weight-glyph.-bold", { fontWeight: "@font-weight.bold" });

selector(".toggle-weight-label", {
	fontSize: "@font-size.2xs",
	color: "@color.text-weak",
});

export default s;
