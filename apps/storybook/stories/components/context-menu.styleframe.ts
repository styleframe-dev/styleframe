import {
	useContextMenuItemRecipe,
	useContextMenuLabelRecipe,
	useContextMenuRecipe,
	useContextMenuSeparatorRecipe,
	useContextMenuShortcutRecipe,
	useContextMenuSubTriggerRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize context menu recipes
export const contextMenu = useContextMenuRecipe(s);
export const contextMenuItem = useContextMenuItemRecipe(s);
export const contextMenuLabel = useContextMenuLabelRecipe(s);
export const contextMenuSeparator = useContextMenuSeparatorRecipe(s);
export const contextMenuShortcut = useContextMenuShortcutRecipe(s);
export const contextMenuSubTrigger = useContextMenuSubTriggerRecipe(s);

// Container styles for story layout
selector(".context-menu-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".context-menu-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".context-menu-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	alignItems: "flex-start",
});

selector(".context-menu-demo-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
