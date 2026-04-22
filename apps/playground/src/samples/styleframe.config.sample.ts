import {
	useCardBodyRecipe,
	useCardFooterRecipe,
	useCardHeaderRecipe,
	useCardRecipe,
	useDesignTokensPreset,
	useGlobalPreset,
	useModifiersPreset,
	useSanitizePreset,
	useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

useDesignTokensPreset(s);
useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

export const card = useCardRecipe(s);
export const cardHeader = useCardHeaderRecipe(s);
export const cardBody = useCardBodyRecipe(s);
export const cardFooter = useCardFooterRecipe(s);

const { selector } = s;

selector(".stage", {
	display: "flex",
	minHeight: "100vh",
	alignItems: "center",
	justifyContent: "center",
	padding: "calc(@spacing * 2)",
	background: "@color.background",
});

selector(".stack", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing",
	maxWidth: "32rem",
	width: "100%",
});

export default s;
