import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

selector(".story-grid", {
	padding: "@spacing",
});

selector(".story-grid--grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.lg",
});

selector(".story-grid--list", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.xs",
});

export default s;
