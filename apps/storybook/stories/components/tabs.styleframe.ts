import {
	useTabsContentRecipe,
	useTabsListRecipe,
	useTabsRecipe,
	useTabsTriggerRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize tabs recipes
export const tabs = useTabsRecipe(s);
export const tabsList = useTabsListRecipe(s);
export const tabsTrigger = useTabsTriggerRecipe(s);
export const tabsContent = useTabsContentRecipe(s);

// Container styles for story layout
selector(".tabs-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".tabs-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.sm",
	textTransform: "capitalize",
});

selector(".tabs-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	alignItems: "flex-start",
});

// Demo surface — gives each example padding and a backdrop. The `-dark`
// modifier paints a dark surface so `dark`-color tabs (light text, no fill)
// stay legible against the light Storybook canvas.
selector(".tabs-demo", {
	padding: "@spacing.md",
	borderRadius: "@border-radius.lg",
	background: "@color.white",
	borderWidth: "@border-width.thin",
	borderStyle: "@border-style.solid",
	borderColor: "@color.gray-200",
	minWidth: "280px",
	maxWidth: "520px",
});

selector(".tabs-demo.-dark", {
	background: "@color.gray-900",
	borderColor: "@color.gray-800",
});

export default s;
