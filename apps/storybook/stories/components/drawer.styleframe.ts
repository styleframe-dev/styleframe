import {
	useDrawerRecipe,
	useDrawerHeaderRecipe,
	useDrawerBodyRecipe,
	useDrawerFooterRecipe,
	useDrawerOverlayRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize drawer recipes
export const drawer = useDrawerRecipe(s);
export const drawerHeader = useDrawerHeaderRecipe(s);
export const drawerBody = useDrawerBodyRecipe(s);
export const drawerFooter = useDrawerFooterRecipe(s);
export const drawerOverlay = useDrawerOverlayRecipe(s);

// Layout helpers for the stories
selector(".drawer-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".drawer-grid", {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
	gap: "@spacing.lg",
});

selector(".drawer-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
});

/**
 * A preview "stage" that contains the drawer's `position: fixed` panel. The
 * `transform` establishes a containing block, so the fixed drawer (and its
 * overlay) anchor to this box instead of the viewport — letting several drawers
 * render side by side in a grid.
 */
selector(".drawer-stage", {
	position: "relative",
	overflow: "hidden",
	transform: "translateZ(0)",
	width: "100%",
	height: "360px",
	borderRadius: "@border-radius.lg",
});

export default s;
