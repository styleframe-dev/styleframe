import {
	useCardBodyRecipe,
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

const { selector } = s;

selector(".stage", {
	display: "flex",
	minHeight: "100vh",
	alignItems: "center",
	justifyContent: "center",
	padding: "@2",
	background: "@color.background",
});

selector(".stack", {
	display: "flex",
	flexDirection: "column",
	gap: "@1",
	maxWidth: "32rem",
	width: "100%",
});

export default s;
