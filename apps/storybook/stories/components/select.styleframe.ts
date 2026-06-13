import {
	useSelectArrowRecipe,
	useSelectChipRecipe,
	useSelectLabelRecipe,
	useSelectOptionRecipe,
	useSelectPanelRecipe,
	useSelectRecipe,
	useSelectSeparatorRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize select recipes
export const select = useSelectRecipe(s);
export const selectPanel = useSelectPanelRecipe(s);
export const selectOption = useSelectOptionRecipe(s);
export const selectChip = useSelectChipRecipe(s);
export const selectArrow = useSelectArrowRecipe(s);
export const selectLabel = useSelectLabelRecipe(s);
export const selectSeparator = useSelectSeparatorRecipe(s);

// Container styles for story layout
selector(".select-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".select-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".select-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	alignItems: "flex-start",
});

selector(".select-caption", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.sm",
});

// Stacks the trigger above its panel for static showcase layout
selector(".select-wrapper", {
	display: "inline-flex",
	flexDirection: "column",
	gap: "@spacing.sm",
	minWidth: "calc(@spacing * 12)",
});

export default s;
