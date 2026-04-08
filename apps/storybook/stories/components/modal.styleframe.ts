import {
	useModalRecipe,
	useModalHeaderRecipe,
	useModalBodyRecipe,
	useModalFooterRecipe,
	useModalOverlayRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize modal recipes
export const modal = useModalRecipe(s);
export const modalHeader = useModalHeaderRecipe(s);
export const modalBody = useModalBodyRecipe(s);
export const modalFooter = useModalFooterRecipe(s);
export const modalOverlay = useModalOverlayRecipe(s);

// Container styles for story layout
selector(".modal-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".modal-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".modal-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".modal-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
