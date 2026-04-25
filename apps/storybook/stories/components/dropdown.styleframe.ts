import {
	useDropdownArrowRecipe,
	useDropdownItemRecipe,
	useDropdownLabelRecipe,
	useDropdownRecipe,
	useDropdownSeparatorRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize dropdown recipes
export const dropdown = useDropdownRecipe(s);
export const dropdownItem = useDropdownItemRecipe(s);
export const dropdownSeparator = useDropdownSeparatorRecipe(s);
export const dropdownLabel = useDropdownLabelRecipe(s);
export const dropdownArrow = useDropdownArrowRecipe(s);

// Container styles for story layout
selector(".dropdown-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".dropdown-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".dropdown-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".dropdown-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

selector(".dropdown-wrapper", {
	position: "relative",
	display: "inline-flex",
	flexDirection: "column",
	alignItems: "center",
});

selector(".dropdown-arrow-position", {
	top: "calc(@dropdown.arrow.size * -1)",
	left: "calc(50% - @dropdown.arrow.size)",
});

export default s;
