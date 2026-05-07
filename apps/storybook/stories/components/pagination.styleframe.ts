import {
	usePaginationRecipe,
	usePaginationItemRecipe,
	usePaginationEllipsisRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

export const pagination = usePaginationRecipe(s);
export const paginationItem = usePaginationItemRecipe(s);
export const paginationEllipsis = usePaginationEllipsisRecipe(s);

// Layout selectors for story grid previews
selector(".pagination-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".pagination-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".pagination-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".pagination-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
