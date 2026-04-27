import {
	useButtonRecipe,
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

useDesignTokensPreset(s, {
	colors: {
		primary: "#3b82f6",
		secondary: "#64748b",
	},
	spacing: {
		default: "1rem",
	},
	borderRadius: {
		md: "0.5rem",
	},
	meta: { merge: true },
});
useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

export const card = useCardRecipe(s);
export const cardHeader = useCardHeaderRecipe(s);
export const cardBody = useCardBodyRecipe(s);
export const cardFooter = useCardFooterRecipe(s);
export const button = useButtonRecipe(s);

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
