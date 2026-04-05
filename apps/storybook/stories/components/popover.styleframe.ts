import {
	usePopoverRecipe,
	usePopoverHeaderRecipe,
	usePopoverBodyRecipe,
	usePopoverFooterRecipe,
	usePopoverArrowRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize popover recipes
export const popover = usePopoverRecipe(s);
export const popoverHeader = usePopoverHeaderRecipe(s);
export const popoverBody = usePopoverBodyRecipe(s);
export const popoverFooter = usePopoverFooterRecipe(s);
export const popoverArrow = usePopoverArrowRecipe(s);

// Container styles for story layout
selector(".popover-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".popover-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".popover-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".popover-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
