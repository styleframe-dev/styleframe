import {
	useTextareaRecipe,
	useTextareaGroupRecipe,
	useTextareaPrefixRecipe,
	useTextareaSuffixRecipe,
	useTextareaPrependRecipe,
	useTextareaAppendRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize textarea recipes
export const textarea = useTextareaRecipe(s);
export const textareaGroup = useTextareaGroupRecipe(s);
export const textareaPrefix = useTextareaPrefixRecipe(s);
export const textareaSuffix = useTextareaSuffixRecipe(s);
export const textareaPrepend = useTextareaPrependRecipe(s);
export const textareaAppend = useTextareaAppendRecipe(s);

// Container styles for story layout
selector(".textarea-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".textarea-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".textarea-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "flex-start",
});

selector(".textarea-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
