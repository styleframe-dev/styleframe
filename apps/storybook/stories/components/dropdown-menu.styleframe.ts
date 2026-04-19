import {
	useDropdownMenuRecipe,
	useDropdownItemRecipe,
	useDropdownDividerRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize dropdown menu recipes
export const dropdownMenu = useDropdownMenuRecipe(s);
export const dropdownItem = useDropdownItemRecipe(s);
export const dropdownDivider = useDropdownDividerRecipe(s);

// Container styles for story layout
selector(".dropdown-menu-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".dropdown-menu-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".dropdown-menu-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".dropdown-menu-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
