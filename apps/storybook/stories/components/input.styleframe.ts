import {
	useInputRecipe,
	useInputGroupRecipe,
	useInputPrefixRecipe,
	useInputSuffixRecipe,
	useInputPrependRecipe,
	useInputAppendRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize input recipes
export const input = useInputRecipe(s);
export const inputGroup = useInputGroupRecipe(s);
export const inputPrefix = useInputPrefixRecipe(s);
export const inputSuffix = useInputSuffixRecipe(s);
export const inputPrepend = useInputPrependRecipe(s);
export const inputAppend = useInputAppendRecipe(s);

// Container styles for story layout
selector(".input-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".input-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".input-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.sm",
	alignItems: "center",
});

selector(".input-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	minWidth: "80px",
});

export default s;
