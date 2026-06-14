import {
	useSidebarRecipe,
	useSidebarHeaderRecipe,
	useSidebarContentRecipe,
	useSidebarFooterRecipe,
	useSidebarGroupRecipe,
	useSidebarGroupLabelRecipe,
	useSidebarGroupActionRecipe,
	useSidebarMenuRecipe,
	useSidebarMenuButtonRecipe,
	useSidebarMenuActionRecipe,
	useSidebarMenuBadgeRecipe,
	useSidebarMenuSubRecipe,
	useSidebarMenuSubButtonRecipe,
	useSidebarSeparatorRecipe,
	useSidebarInsetRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize sidebar recipes
export const sidebar = useSidebarRecipe(s);
export const sidebarHeader = useSidebarHeaderRecipe(s);
export const sidebarContent = useSidebarContentRecipe(s);
export const sidebarFooter = useSidebarFooterRecipe(s);
export const sidebarGroup = useSidebarGroupRecipe(s);
export const sidebarGroupLabel = useSidebarGroupLabelRecipe(s);
export const sidebarGroupAction = useSidebarGroupActionRecipe(s);
export const sidebarMenu = useSidebarMenuRecipe(s);
export const sidebarMenuButton = useSidebarMenuButtonRecipe(s);
export const sidebarMenuAction = useSidebarMenuActionRecipe(s);
export const sidebarMenuBadge = useSidebarMenuBadgeRecipe(s);
export const sidebarMenuSub = useSidebarMenuSubRecipe(s);
export const sidebarMenuSubButton = useSidebarMenuSubButtonRecipe(s);
export const sidebarSeparator = useSidebarSeparatorRecipe(s);
export const sidebarInset = useSidebarInsetRecipe(s);

// --- Story-layout helpers (demo composition only, not part of the recipe) ---

// App-shell layout: sidebar next to a main inset. Fills the canvas height so the full
// panel is visible without the content region scrolling.
selector(".sidebar-shell", {
	display: "flex",
	width: "100%",
	height: "100vh",
	overflow: "hidden",
});

// Leading icon inside a menu button — kept square so the collapsed rail centers it.
selector(".sidebar-menu-button-icon", {
	display: "inline-flex",
	flexShrink: "0",
	alignItems: "center",
	justifyContent: "center",
	width: "1.25em",
	height: "1.25em",
});

// Menu item: the relative context the menu button's badge/action absolutely anchor to.
selector(".sidebar-menu-item", {
	position: "relative",
	display: "flex",
	flexDirection: "column",
});

// Group header: the relative context the group action absolutely anchors to.
selector(".sidebar-group-header", {
	position: "relative",
	display: "flex",
	alignItems: "center",
});

// Preview grid containers.
selector(".sidebar-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.lg",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".sidebar-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".sidebar-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.lg",
	alignItems: "flex-start",
});

selector(".sidebar-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
